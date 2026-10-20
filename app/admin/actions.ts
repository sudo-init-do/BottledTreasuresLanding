"use server";

import { randomBytes, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCredentials, requireAdmin } from "@/lib/auth";
import { MIN_PASSWORD, hashPassword } from "@/lib/customers";
import { updateDb } from "@/lib/db";
import { SESSION_COOKIE, createSessionToken } from "@/lib/session";
import { saveUpload } from "@/lib/uploads";
import { TAGS, TIERS, formatNaira, type Customer, type Product, type Sale, type Tag, type Tier } from "@/lib/types";

export type FormState = { error?: string; ok?: string };

const text = (fd: FormData, key: string, max = 300) => String(fd.get(key) ?? "").trim().slice(0, max);
const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

// ---------- login ----------

export async function login(_prev: FormState, fd: FormData): Promise<FormState> {
  const creds = adminCredentials();
  if (!creds) return { error: "Login isn't set up yet. Add ADMIN_EMAIL, ADMIN_PASSWORD and SESSION_SECRET to the server settings." };
  const email = text(fd, "email").toLowerCase();
  const password = String(fd.get("password") ?? "");
  if (!same(email, creds.email.toLowerCase()) || !same(password, creds.password)) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return { error: "Wrong email or password." };
  }
  const { token, maxAge } = await createSessionToken(creds.email);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    // HTTPS-only in production, unless COOKIE_SECURE=false (for running on plain http://)
    secure: process.env.NODE_ENV === "production" && process.env.COOKIE_SECURE !== "false",
    path: "/",
    maxAge,
  });
  redirect("/admin");
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ---------- sales ----------

/** Today's date on Bonny Island, YYYY-MM-DD. */
const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });

/** Records a sale she made (paid on WhatsApp, in person, etc.) and, if asked, takes the bottles off the stock count. */
export async function recordSale(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const productId = text(fd, "productId");
  const qty = Math.floor(Number(text(fd, "qty")));
  const price = Math.round(Number(text(fd, "price").replace(/[^\d.]/g, "")));
  const dateRaw = text(fd, "date", 10);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(dateRaw) && dateRaw <= today() ? dateRaw : today();
  const takeStock = fd.get("takeStock") === "on";
  if (!productId) return { error: "Choose which product you sold." };
  if (!(qty > 0) || qty > 9999) return { error: "Type how many bottles you sold, e.g. 2." };
  if (!(price > 0)) return { error: "Type the price per bottle in Naira, e.g. 45000." };

  const result = await updateDb((db): FormState => {
    const p = db.products.find((x) => x.id === productId);
    if (!p) return { error: "That product no longer exists. Refresh the page and try again." };
    if (takeStock && p.stock < qty) {
      return { error: `The dashboard only shows ${p.stock} ${p.name} in stock. If you have more, fix the count on the Products page first, or untick “Take these bottles off my stock”.` };
    }
    if (takeStock) p.stock -= qty;
    const sale: Sale = {
      id: randomBytes(6).toString("hex"),
      date,
      productId: p.id,
      name: p.name,
      qty,
      price,
      total: qty * price,
      customer: text(fd, "customer", 100),
      note: text(fd, "note", 300),
      tookStock: takeStock,
      createdAt: new Date().toISOString(),
    };
    db.sales.unshift(sale);
    return { ok: `Saved: ${qty} × ${p.name} for ${formatNaira(sale.total)}.${takeStock ? ` ${p.stock} left in stock.` : ""}` };
  });
  revalidatePath("/", "layout");
  return result;
}

/** Removes a sale recorded by mistake. Bottles it took off the stock count go back on. */
export async function deleteSale(id: string): Promise<{ error?: string }> {
  await requireAdmin();
  const removed = await updateDb((db) => {
    const sale = db.sales.find((x) => x.id === id);
    if (!sale) return false;
    const p = sale.tookStock ? db.products.find((x) => x.id === sale.productId) : undefined;
    if (p) p.stock = Math.min(99999, p.stock + sale.qty);
    db.sales = db.sales.filter((x) => x.id !== id);
    return true;
  });
  revalidatePath("/", "layout");
  return removed ? {} : { error: "That sale was already deleted." };
}

// ---------- products ----------

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || `product-${Date.now()}`;

export async function saveProduct(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(fd, "id");
  const name = text(fd, "name", 100);
  const price = Math.round(Number(text(fd, "price").replace(/[^\d.]/g, "")));
  const compareRaw = text(fd, "compareAt").replace(/[^\d.]/g, "");
  const compareAt = compareRaw ? Math.round(Number(compareRaw)) : undefined;
  const wholesaleRaw = text(fd, "wholesalePrice").replace(/[^\d.]/g, "");
  const wholesalePrice = wholesaleRaw ? Math.round(Number(wholesaleRaw)) : undefined;
  if (!name) return { error: "Add a product name." };
  if (!(price > 0)) return { error: "Add a retail price in Naira, e.g. 45000." };
  if (wholesalePrice !== undefined && !(wholesalePrice > 0)) return { error: "The wholesale price should be a number in Naira, e.g. 38000, or left empty." };

  let image: string | undefined;
  const file = fd.get("image");
  if (file instanceof Blob && file.size > 0) {
    const saved = await saveUpload(file, "products");
    if ("error" in saved) return { error: saved.error };
    image = saved.path;
  }

  const fields = {
    name,
    price,
    compareAt: compareAt && compareAt > price ? compareAt : undefined,
    wholesalePrice,
    size: text(fd, "size", 60),
    badge: text(fd, "badge", 20) || undefined,
    notes: text(fd, "notes")
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean)
      .slice(0, 6),
    description: text(fd, "description", 1500),
    tags: TAGS.map((t) => t.id).filter((t) => fd.get(`tag-${t}`)) as Tag[],
    stock: Math.max(0, Math.min(99999, Math.floor(Number(text(fd, "stock").replace(/[^\d]/g, "")) || 0))),
  };

  const result = await updateDb((db) => {
    if (id) {
      const p = db.products.find((x) => x.id === id);
      if (!p) return { error: "That product no longer exists." };
      Object.assign(p, fields, image ? { image } : {});
      return { slug: p.slug };
    }
    if (!image) return { error: "Add a photo for the new product." };
    let slug = slugify(name);
    while (db.products.some((p) => p.slug === slug)) slug = `${slugify(name)}-${randomBytes(2).toString("hex")}`;
    const product: Product = { id: randomBytes(6).toString("hex"), slug, image, createdAt: new Date().toISOString(), ...fields };
    db.products.unshift(product);
    return { slug };
  });
  if ("error" in result) return { error: result.error };
  revalidatePath("/", "layout");
  redirect("/admin/products?saved=1");
}

/** Removes a product for good. Recorded sales keep their own copy of its name and price. */
export async function deleteProduct(id: string): Promise<{ error?: string }> {
  await requireAdmin();
  const removed = await updateDb((db) => {
    const before = db.products.length;
    db.products = db.products.filter((p) => p.id !== id);
    return db.products.length < before;
  });
  revalidatePath("/", "layout");
  return removed ? {} : { error: "That product was already deleted." };
}

/** Quick +/- from the products table. Returns the new stock count. */
export async function adjustStock(id: string, delta: number): Promise<number | null> {
  await requireAdmin();
  const step = Math.trunc(Number(delta));
  if (!Number.isFinite(step) || Math.abs(step) > 99999) return null;
  const next = await updateDb((db) => {
    const p = db.products.find((x) => x.id === id);
    if (!p) return null;
    p.stock = Math.max(0, Math.min(99999, p.stock + step));
    return p.stock;
  });
  revalidatePath("/", "layout");
  return next;
}

/** Sets an exact stock count (typed into the number on the products table). */
export async function setStock(id: string, value: number): Promise<number | null> {
  await requireAdmin();
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 0 || n > 99999) return null;
  const next = await updateDb((db) => {
    const p = db.products.find((x) => x.id === id);
    if (!p) return null;
    p.stock = n;
    return p.stock;
  });
  revalidatePath("/", "layout");
  return next;
}

// ---------- customers ----------

/** Creates a customer account, or updates one. A new password or switching the account off signs the customer out. */
export async function saveCustomer(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(fd, "id");
  const name = text(fd, "name", 100);
  const email = text(fd, "email", 120).toLowerCase();
  const tier = text(fd, "tier") as Tier;
  const active = id ? fd.get("active") === "on" : true;
  const password = String(fd.get("password") ?? "");
  if (!name) return { error: "Add the customer's name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Add a valid email address. The customer signs in with it." };
  if (!TIERS.some((t) => t.id === tier)) return { error: "Choose wholesale or retail." };
  if ((!id || password) && password.length < MIN_PASSWORD) {
    return { error: id ? `The new password needs at least ${MIN_PASSWORD} characters.` : `Set a password of at least ${MIN_PASSWORD} characters.` };
  }
  const passwordHash = password ? await hashPassword(password.slice(0, 200)) : undefined;

  const result = await updateDb((db): FormState => {
    if (db.customers.some((c) => c.email === email && c.id !== id)) return { error: "Another customer already uses that email." };
    if (id) {
      const c = db.customers.find((x) => x.id === id);
      if (!c) return { error: "That customer no longer exists." };
      if (passwordHash || (c.active && !active)) c.sessionVersion += 1;
      Object.assign(c, { name, email, tier, active }, passwordHash ? { passwordHash } : {});
      return {};
    }
    const customer: Customer = { id: randomBytes(6).toString("hex"), name, email, passwordHash: passwordHash!, tier, active: true, sessionVersion: 1, createdAt: new Date().toISOString() };
    db.customers.unshift(customer);
    return {};
  });
  if (result.error) return result;
  revalidatePath("/", "layout");
  redirect("/admin/customers?saved=1");
}

// ---------- settings ----------

export async function saveSettings(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const whatsapp = text(fd, "whatsapp", 30);
  const digits = whatsapp.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return { error: "Type your WhatsApp number with the country code, e.g. +234 803 123 4567." };
  await updateDb((db) => {
    db.settings = { whatsapp };
  });
  revalidatePath("/", "layout");
  return { ok: "Saved. Checkout now sends orders to this number." };
}
