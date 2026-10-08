import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./session";

const DEV_EMAIL = "admin@bottledtreasures.ng";
const DEV_PASSWORD = "changeme";

/** Owner login details. In production they must come from environment variables. */
export function adminCredentials() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) return { email, password };
  if (process.env.NODE_ENV !== "production") return { email: DEV_EMAIL, password: DEV_PASSWORD };
  return null;
}

export async function isAdmin() {
  return verifySessionToken(cookies().get(SESSION_COOKIE)?.value);
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
