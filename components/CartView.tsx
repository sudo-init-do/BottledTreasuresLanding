"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { CloseIcon } from "./Icons";
import { formatNaira } from "@/lib/types";

export default function CartView() {
  const { items, subtotal, setQty, removeItem, ready } = useCart();

  if (!ready) return <div className="h-64" />;

  if (!items.length) {
    return (
      <div className="border border-gold/15 px-6 py-16 text-center">
        <p className="font-serif text-3xl text-cream">Your cart is empty.</p>
        <p className="mt-2 text-sm text-cream/60">Find something that smells great.</p>
        <Link href="/shop" className="btn-gold mt-8">Shop Fragrances</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <ul className="divide-y divide-gold/15 border-y border-gold/15">
        {items.map((i) => (
          <li key={i.slug} className="flex gap-4 py-5 sm:gap-6">
            <Link href={`/shop/${i.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden border border-gold/20 bg-ink-800">
              <Image src={i.image} alt={i.name} fill sizes="96px" className="object-cover" unoptimized={i.image.startsWith("/media/")} />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <Link href={`/shop/${i.slug}`} className="font-serif text-xl text-cream hover:text-gold">{i.name}</Link>
                <button type="button" onClick={() => removeItem(i.slug)} aria-label={`Remove ${i.name}`} className="p-1 text-cream/50 hover:text-gold">
                  <CloseIcon width={18} height={18} />
                </button>
              </div>
              <p className="mt-1 text-sm text-cream/50">{formatNaira(i.price)} each</p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex h-10 items-center border border-gold/30">
                  <button type="button" aria-label="Less" onClick={() => setQty(i.slug, i.qty - 1)} className="h-full w-9 text-gold hover:bg-gold/10">−</button>
                  <span className="w-8 text-center text-sm">{i.qty}</span>
                  <button type="button" aria-label="More" onClick={() => setQty(i.slug, i.qty + 1)} className="h-full w-9 text-gold hover:bg-gold/10">+</button>
                </div>
                <p className="font-serif text-xl text-cream">{formatNaira(i.price * i.qty)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit border border-gold/20 bg-ink-800 p-6">
        <h2 className="font-serif text-2xl text-cream">Summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-cream/60">Subtotal</dt><dd>{formatNaira(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-cream/60">Delivery</dt><dd className="text-cream/60">Chosen at checkout</dd></div>
        </dl>
        <Link href="/checkout" className="btn-gold mt-6 w-full">Checkout</Link>
        <Link href="/shop" className="mt-4 block text-center text-xs uppercase tracking-wider2 text-cream/60 hover:text-gold">Continue shopping</Link>
      </aside>
    </div>
  );
}
