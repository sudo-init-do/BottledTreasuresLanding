// Signed session cookie for the shop owner. Uses Web Crypto so it works in middleware and on the server.
export const SESSION_COOKIE = "bt_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/** In production a real SESSION_SECRET is required; without one nobody can sign in (and no cookie is trusted). */
const secret = () =>
  process.env.SESSION_SECRET || (process.env.NODE_ENV === "production" ? null : "dev-only-change-me");

const enc = new TextEncoder();
const b64url = (bytes: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

async function sign(data: string) {
  const key_ = secret();
  if (!key_) throw new Error("SESSION_SECRET is not set");
  const key = await crypto.subtle.importKey("raw", enc.encode(key_), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(email: string) {
  const payload = b64url(enc.encode(JSON.stringify({ email, exp: Date.now() + MAX_AGE * 1000 })));
  return { token: `${payload}.${await sign(payload)}`, maxAge: MAX_AGE };
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token || !secret()) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !safeEqual(await sign(payload), sig)) return false;
  try {
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json).exp > Date.now();
  } catch {
    return false;
  }
}
