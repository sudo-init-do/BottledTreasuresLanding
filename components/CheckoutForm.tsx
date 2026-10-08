"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { placeOrder, type CheckoutState } from "@/app/checkout/actions";
import { useCart } from "./CartContext";
import { DELIVERY, formatNaira, type DeliveryMethod, type Settings } from "@/lib/types";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-60">
      {pending ? "Placing order…" : "Place Order"}
    </button>
  );
}

export default function CheckoutForm({ settings }: { settings: Settings }) {
  const { items, subtotal, ready } = useCart();
  const [delivery, setDelivery] = useState<DeliveryMethod>("island");
  const [state, action] = useFormState<CheckoutState, FormData>(placeOrder, {});
  const fee = DELIVERY[delivery].fee;

  if (!ready) return <div className="h-64" />;
  if (!items.length) {
    return (
      <div className="border border-gold/15 px-6 py-16 text-center">
        <p className="font-serif text-3xl text-cream">Your cart is empty.</p>
        <Link href="/shop" className="btn-gold mt-8">Shop Fragrances</Link>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="grid gap-10 lg:grid-cols-[1fr_400px]"
    >
      <input type="hidden" name="items" value={JSON.stringify(items.map((i) => ({ slug: i.slug, qty: i.qty })))} />

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
          <div>
            <label className="label" htmlFor="co-email">Email (optional)</label>
            <input id="co-email" name="email" type="email" autoComplete="email" className="field" />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-serif text-2xl text-cream">2. Pickup or delivery</legend>
          <div className="space-y-2">
            {(Object.keys(DELIVERY) as DeliveryMethod[]).map((d) => (
              <label key={d} className={`flex cursor-pointer items-center justify-between gap-4 border px-4 py-3 text-sm transition-colors ${delivery === d ? "border-gold bg-gold/5" : "border-gold/25"}`}>
                <span className="flex items-center gap-3">
                  <input type="radio" name="delivery" value={d} checked={delivery === d} onChange={() => setDelivery(d)} className="accent-[#C9A84C]" />
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

        <fieldset className="space-y-4">
          <legend className="font-serif text-2xl text-cream">3. Pay by bank transfer</legend>
          <div className="border border-gold/40 bg-burgundy-900 p-5">
            <p className="text-sm text-cream/70">Transfer <strong className="text-gold">{formatNaira(subtotal + fee)}</strong> to:</p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
              <dt className="text-cream/50">Bank</dt><dd className="text-cream">{settings.bankName}</dd>
              <dt className="text-cream/50">Account name</dt><dd className="text-cream">{settings.accountName}</dd>
              <dt className="text-cream/50">Account number</dt><dd className="select-all font-serif text-2xl tracking-wider text-gold">{settings.accountNumber}</dd>
            </dl>
          </div>
          <div>
            <label className="label" htmlFor="co-proof">Upload your payment receipt * (screenshot or PDF, max 5MB)</label>
            <input id="co-proof" name="proof" type="file" required accept="image/jpeg,image/png,image/webp,application/pdf" className="block w-full text-sm text-cream/70 file:mr-4 file:border-0 file:bg-gold file:px-4 file:py-2.5 file:text-xs file:uppercase file:tracking-wider2 file:text-ink" />
          </div>
        </fieldset>
      </div>

      <aside className="h-fit space-y-5 border border-gold/20 bg-ink-800 p-6 lg:sticky lg:top-28">
        <h2 className="font-serif text-2xl text-cream">Your order</h2>
        <ul className="space-y-2 text-sm">
          {items.map((i) => (
            <li key={i.slug} className="flex justify-between gap-4">
              <span className="text-cream/80">{i.name} × {i.qty}</span>
              <span>{formatNaira(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-gold/15 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-cream/60">Subtotal</dt><dd>{formatNaira(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-cream/60">Delivery</dt><dd>{fee ? formatNaira(fee) : "Free"}</dd></div>
          <div className="flex justify-between font-serif text-2xl"><dt>Total</dt><dd className="text-gold">{formatNaira(subtotal + fee)}</dd></div>
        </dl>
        {state.error && <p role="alert" className="border border-gold/50 px-4 py-3 text-sm text-gold-light">{state.error}</p>}
        <Submit />
        <p className="text-xs leading-relaxed text-cream/50">We check every payment by hand and confirm on WhatsApp, usually within a few hours.</p>
      </aside>
    </form>
  );
}
