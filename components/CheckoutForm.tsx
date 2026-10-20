"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import { WhatsAppIcon } from "./Icons";
import { DELIVERY, formatNaira, whatsappLink, type DeliveryMethod } from "@/lib/types";

/**
 * Collects the customer's details, then opens WhatsApp with the order written out,
 * so they can confirm and pay the owner directly there.
 * `prices` comes from the server for the visitor's tier, so the message shows the right amounts.
 */
export default function CheckoutForm({ whatsapp, prices, wholesale = false }: { whatsapp: string; prices: Record<string, number>; wholesale?: boolean }) {
  const { items: cart, ready, clear } = useCart();
  // products deleted since they were added to the cart can't be ordered
  const items = cart.filter((i) => i.slug in prices);
  const subtotal = items.reduce((n, i) => n + prices[i.slug] * i.qty, 0);
  const [delivery, setDelivery] = useState<DeliveryMethod>("island");
  const [sent, setSent] = useState("");
  const fee = DELIVERY[delivery].fee;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const lines = [
      `Hello Bottled Treasures, I'd like to order${wholesale ? " (wholesale)" : ""}:`,
      "",
      ...items.map((i) => `• ${i.name} × ${i.qty} = ${formatNaira(prices[i.slug] * i.qty)}`),
      "",
      `Subtotal: ${formatNaira(subtotal)}`,
      `${DELIVERY[delivery].label}: ${fee ? formatNaira(fee) : "Free"}`,
      `Total: ${formatNaira(subtotal + fee)}`,
      "",
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      ...(delivery !== "pickup" ? [`Address: ${get("address")}, ${get("city")}`] : []),
      ...(get("note") ? [`Note: ${get("note")}`] : []),
    ];
    const url = whatsappLink(whatsapp, lines.join("\n"));
    setSent(url);
    clear();
    window.location.href = url;
  };

  if (!ready) return <div className="h-64" />;
  if (sent) {
    return (
      <div className="border border-gold/15 px-6 py-16 text-center">
        <p className="font-serif text-3xl text-cream">Opening WhatsApp…</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/60">
          Send the message to confirm your order. We&apos;ll reply with payment details and arrange your delivery.
        </p>
        <a href={sent} className="btn-gold mt-8">
          <WhatsAppIcon width={18} height={18} /> Open WhatsApp
        </a>
      </div>
    );
  }
  if (!items.length) {
    return (
      <div className="border border-gold/15 px-6 py-16 text-center">
        <p className="font-serif text-3xl text-cream">Your cart is empty.</p>
        <Link href="/shop" className="btn-gold mt-8">Shop Fragrances</Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_400px]">
      <div className="space-y-10">
        <fieldset className="space-y-4">
          <legend className="font-serif text-2xl text-cream">1. Your details</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="co-name">Full name *</label>
              <input id="co-name" name="name" required autoComplete="name" className="field" />
            </div>
            <div>
              <label className="label" htmlFor="co-phone">Phone / WhatsApp *</label>
              <input id="co-phone" name="phone" required type="tel" autoComplete="tel" className="field" />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-serif text-2xl text-cream">2. Pickup or delivery</legend>
          <div className="space-y-2">
            {(Object.keys(DELIVERY) as DeliveryMethod[]).map((d) => (
              <label key={d} className={`flex cursor-pointer items-center justify-between gap-4 border px-4 py-3 text-sm transition-colors ${delivery === d ? "border-gold bg-gold/5" : "border-gold/25"}`}>
                <span className="flex items-center gap-3">
                  <input type="radio" name="delivery" value={d} checked={delivery === d} onChange={() => setDelivery(d)} className="accent-gold" />
                  {DELIVERY[d].label}
                </span>
                <span className="text-cream/70">{DELIVERY[d].fee ? formatNaira(DELIVERY[d].fee) : "Free"}</span>
              </label>
            ))}
          </div>
          {delivery !== "pickup" && (
            <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
              <div>
                <label className="label" htmlFor="co-address">Delivery address *</label>
                <input id="co-address" name="address" required autoComplete="street-address" className="field" />
              </div>
              <div>
                <label className="label" htmlFor="co-city">City / State *</label>
                <input id="co-city" name="city" required autoComplete="address-level2" className="field" />
              </div>
            </div>
          )}
          <div>
            <label className="label" htmlFor="co-note">Note (optional)</label>
            <textarea id="co-note" name="note" rows={2} className="field" placeholder="Gift message, landmark, best time to call…" />
          </div>
        </fieldset>
      </div>

      <aside className="h-fit space-y-5 border border-gold/20 bg-ink-800 p-6 lg:sticky lg:top-28">
        <h2 className="font-serif text-2xl text-cream">Your order</h2>
        {wholesale && <p className="-mt-3 text-xs uppercase tracking-wider2 text-gold">Wholesale prices</p>}
        <ul className="space-y-2 text-sm">
          {items.map((i) => (
            <li key={i.slug} className="flex justify-between gap-4">
              <span className="text-cream/80">{i.name} × {i.qty}</span>
              <span>{formatNaira(prices[i.slug] * i.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-gold/15 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-cream/60">Subtotal</dt><dd>{formatNaira(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-cream/60">Delivery</dt><dd>{fee ? formatNaira(fee) : "Free"}</dd></div>
          <div className="flex justify-between font-serif text-2xl"><dt>Total</dt><dd className="text-gold">{formatNaira(subtotal + fee)}</dd></div>
        </dl>
        <button type="submit" className="btn-gold w-full">
          <WhatsAppIcon width={18} height={18} /> Order on WhatsApp
        </button>
        <p className="text-xs leading-relaxed text-cream/50">
          This opens WhatsApp with your order written out. Send it, and we&apos;ll reply with how to pay and arrange your delivery.
        </p>
      </aside>
    </form>
  );
}
