"use server";

import { randomBytes, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCredentials, requireAdmin } from "@/lib/auth";
import { updateDb } from "@/lib/db";
import { SESSION_COOKIE, createSessionToken } from "@/lib/session";
import { saveUpload } from "@/lib/uploads";
import { ORDER_STATUSES, TAGS, type OrderStatus, type Product, type Tag } from "@/lib/types";

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

// ---------- orders ----------

export async function setOrderStatus(fd: FormData) {
  await requireAdmin();
  const id = text(fd, "id");
  const status = text(fd, "status") as OrderStatus;
  if (!ORDER_STATUSES.some((s) => s.id === status)) return;
  await updateDb((db) => {
    const o = db.orders.find((x) => x.id === id);
    if (!o) return;
    o.status = status;
    // Cancelling puts the bottles back on the shelf; un-cancelling takes them out again.
    const back = status === "cancelled" && !o.stockReturned;
    const out = status !== "cancelled" && o.stockReturned;
    if (back || out) {
      for (const i of o.items) {
        const p = db.products.find((x) => x.slug === i.slug);
        if (p) p.stock = Math.max(0, p.stock + (back ? i.qty : -i.qty));
      }
      o.stockReturned = back;
    }
  });
  revalidatePath("/admin", "layout");
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

/** Removes a product for good. Past orders keep their own copy of its name, price and photo. */
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
  if (!Number.isFinite(step) || Math.abs(step) > 1000) return null;
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

// ---------- settings ----------

export async function saveSettings(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const settings = {
    bankName: text(fd, "bankName", 80),
    accountName: text(fd, "accountName", 120),
    accountNumber: text(fd, "accountNumber", 20).replace(/\s/g, ""),
    whatsapp: text(fd, "whatsapp", 30),
  };
  if (!settings.bankName || !settings.accountName || !/^\d{10}$/.test(settings.accountNumber)) {
    return { error: "Fill in the bank, account name and a 10-digit account number." };
  }
  await updateDb((db) => {
    db.settings = settings;
  });
  revalidatePath("/", "layout");
  return { ok: "Saved." };
}
