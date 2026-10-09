"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DUMMY_HASH, checkPassword, customerCookie } from "@/lib/customers";
import { readDb } from "@/lib/db";
import { CUSTOMER_COOKIE, createCustomerToken } from "@/lib/session";

export type LoginState = { error?: string };

export async function customerLogin(_prev: LoginState, fd: FormData): Promise<LoginState> {
  const email = String(fd.get("email") ?? "").trim().toLowerCase().slice(0, 120);
  const password = String(fd.get("password") ?? "").slice(0, 200);
  const customer = (await readDb()).customers.find((c) => c.email === email);
  // always check a hash, so a wrong email takes as long as a wrong password
  const ok = await checkPassword(password, customer?.passwordHash ?? DUMMY_HASH);
  if (!customer || !ok || !customer.active) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return { error: customer && ok ? "This account is switched off. Message us on WhatsApp if you think that's a mistake." : "Wrong email or password." };
  }
  let session;
  try {
    session = await createCustomerToken(customer.id, customer.sessionVersion);
  } catch {
    return { error: "Sign-in isn't available right now. Please try again later." };
  }
  cookies().set(CUSTOMER_COOKIE, session.token, customerCookie(session.maxAge));
  redirect("/account");
}

export async function customerLogout() {
  cookies().delete(CUSTOMER_COOKIE);
  redirect("/account/login");
}
