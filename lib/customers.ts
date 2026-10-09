import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { readDb } from "./db";
import { CUSTOMER_COOKIE, readCustomerToken } from "./session";
import type { Customer, Tier } from "./types";

const scryptAsync = promisify(scrypt) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

export const MIN_PASSWORD = 8;

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export async function checkPassword(password: string, stored: string) {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = await scryptAsync(password, Buffer.from(salt, "hex"), expected.length);
  return timingSafeEqual(actual, expected);
}

/** Used when no account matches, so a wrong email takes as long as a wrong password. */
export const DUMMY_HASH = `scrypt$${"0".repeat(32)}$${"0".repeat(128)}`;

/**
 * The signed-in customer, checked against the database on every request:
 * a disabled account, a changed password or a deleted account signs them out straight away.
 */
export async function currentCustomer(): Promise<Customer | null> {
  const session = await readCustomerToken(cookies().get(CUSTOMER_COOKIE)?.value);
  if (!session) return null;
  const c = (await readDb()).customers.find((x) => x.id === session.id);
  return c && c.active && c.sessionVersion === session.version ? c : null;
}

/** The price tier for the current visitor. Guests are retail. */
export async function currentTier(): Promise<Tier> {
  return (await currentCustomer())?.tier ?? "retail";
}

export const customerCookie = (maxAge: number) => ({
  httpOnly: true,
  sameSite: "lax" as const,
  // HTTPS-only in production, unless COOKIE_SECURE=false (for running on plain http://)
  secure: process.env.NODE_ENV === "production" && process.env.COOKIE_SECURE !== "false",
  path: "/",
  maxAge,
});
