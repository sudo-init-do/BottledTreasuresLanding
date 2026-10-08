"use server";

import { randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { readDb, updateDb } from "@/lib/db";
import { saveUpload } from "@/lib/uploads";
import { DELIVERY, type DeliveryMethod, type Order, type OrderItem } from "@/lib/types";

export type CheckoutState = { error?: string };

const text = (fd: FormData, key: string, max = 200) => String(fd.get(key) ?? "").trim().slice(0, max);

export async function placeOrder(_prev: CheckoutState, fd: FormData): Promise<CheckoutState> {
  const name = text(fd, "name", 100);
  const phone = text(fd, "phone", 30);
  const email = text(fd, "email", 120);
  const address = text(fd, "address", 300);
  const city = text(fd, "city", 80);
  const note = text(fd, "note", 500);
  const delivery = text(fd, "delivery") as DeliveryMethod;
  const proof = fd.get("proof");

  if (!name || !phone) return { error: "Please add your name and phone number." };
  if (!(delivery in DELIVERY)) return { error: "Please choose pickup or delivery." };
  if (delivery !== "pickup" && (!address || !city)) return { error: "Please add your delivery address and city." };
  if (!(proof instanceof File) || proof.size === 0) return { error: "Please upload your payment receipt." };

  let wanted: { slug: string; qty: number }[] = [];
  try {
    wanted = JSON.parse(text(fd, "items", 10000));
  } catch {
    /* handled below */
  }
  // Prices and stock always come from the database, never from the browser.
  const { products } = await readDb();
  const items: OrderItem[] = [];
  for (const w of Array.isArray(wanted) ? wanted : []) {
    const p = products.find((x) => x.slug === w?.slug);
    const qty = Math.floor(Number(w?.qty));
    if (!p || !(qty > 0)) continue;
    if (p.stock < qty) {
      return { error: p.stock > 0 ? `Only ${p.stock} of ${p.name} left. Please reduce the quantity in your cart.` : `${p.name} just sold out. Please remove it from your cart.` };
    }
    items.push({ slug: p.slug, name: p.name, price: p.price, qty: Math.min(qty, 20), image: p.image });
  }
  if (!items.length) return { error: "Your cart is empty, or the items are no longer available." };

  const saved = await saveUpload(proof, "proofs", true);
  if ("error" in saved) return { error: saved.error };

  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const deliveryFee = DELIVERY[delivery].fee;
  const code = `BT-${randomBytes(3).toString("hex").toUpperCase()}`;
  const order: Order = {
    id: randomBytes(8).toString("hex"),
    code,
    createdAt: new Date().toISOString(),
    status: "pending",
    customer: { name, phone, email, address, city, note },
    delivery,
    deliveryFee,
    items,
    subtotal,
    total: subtotal + deliveryFee,
    proof: saved.path,
  };
  const result = await updateDb((db) => {
    // check again inside the write, in case someone else bought the last bottle meanwhile
    for (const i of items) {
      const p = db.products.find((x) => x.slug === i.slug);
      if (!p || p.stock < i.qty) return { error: `Sorry, ${i.name} just sold out. Please update your cart.` };
    }
    for (const i of items) db.products.find((x) => x.slug === i.slug)!.stock -= i.qty;
    db.orders.unshift(order);
    return {};
  });
  if (result.error) return result;
  redirect(`/order/${code}?placed=1`);
}
