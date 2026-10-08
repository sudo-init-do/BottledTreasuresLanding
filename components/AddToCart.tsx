"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import type { Product } from "@/lib/types";

export default function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return <p className="mt-8 border border-gold/30 px-5 py-4 text-sm text-cream/70">Sold out for now. Message us on WhatsApp to be told when it&apos;s back.</p>;
  }

  return (
    <div className="mt-8 space-y-3">
      <div className="flex gap-3">
        <div className="flex h-12 items-center border border-gold/30">
          <button type="button" aria-label="Less" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-full w-11 text-lg text-gold hover:bg-gold/10">−</button>
          <span className="w-10 text-center" aria-live="polite">{qty}</span>
          <button type="button" aria-label="More" onClick={() => setQty((q) => Math.min(20, q + 1))} className="h-full w-11 text-lg text-gold hover:bg-gold/10">+</button>
        </div>
        <button
          type="button"
          className="btn-gold flex-1"
          onClick={() => {
            addItem({ slug: product.slug, name: product.name, price: product.price, image: product.image }, qty);
            setAdded(true);
          }}
        >
          Add to Cart
        </button>
      </div>
      {added && (
        <Link href="/cart" className="btn-outline w-full">
          Go to Cart
        </Link>
      )}
    </div>
  );
}
