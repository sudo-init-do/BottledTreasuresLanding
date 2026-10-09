// Signed session cookies for the shop owner and for customers. Uses Web Crypto so it works in middleware and on the server.
export const SESSION_COOKIE = "bt_admin";
export const CUSTOMER_COOKIE = "bt_customer";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const CUSTOMER_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Customer tokens are signed over "customer:" + payload, so one can never pass as an owner token (signed over the payload alone).
const CUSTOMER_PURPOSE = "customer:";

/** In production a real SESSION_SECRET is required; without one nobody can sign in (and no cookie is trusted). */
const secret = () =>
  process.env.SESSION_SECRET || (process.env.NODE_ENV === "production" ? null : "dev-only-change-me");

const enc = new TextEncoder();
const b64url = (bytes: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

async function sign(data: string, purpose = "") {
  const key_ = secret();
  if (!key_) throw new Error("SESSION_SECRET is not set");
  const key = await crypto.subtle.importKey("raw", enc.encode(key_), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(purpose + data)));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function createToken(data: object, maxAge: number, purpose = "") {
  const payload = b64url(enc.encode(JSON.stringify({ ...data, exp: Date.now() + maxAge * 1000 })));
  return { token: `${payload}.${await sign(payload, purpose)}`, maxAge };
}

/** Returns the token's payload if it is signed for this purpose and not expired. */
async function readToken(token: string | undefined, purpose = ""): Promise<Record<string, unknown> | null> {
  if (!token || !secret()) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !safeEqual(await sign(payload, purpose), sig)) return null;
  try {
    const data = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

export async function createSessionToken(email: string) {
  return createToken({ email }, MAX_AGE);
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  return (await readToken(token)) !== null;
}

export async function createCustomerToken(id: string, version: number) {
  return createToken({ cid: id, v: version }, CUSTOMER_MAX_AGE, CUSTOMER_PURPOSE);
}

/** The customer id and session version in a valid customer token. The account itself still has to be checked. */
export async function readCustomerToken(token: string | undefined): Promise<{ id: string; version: number } | null> {
  const data = await readToken(token, CUSTOMER_PURPOSE);
  return data && typeof data.cid === "string" && typeof data.v === "number" ? { id: data.cid, version: data.v } : null;
}
