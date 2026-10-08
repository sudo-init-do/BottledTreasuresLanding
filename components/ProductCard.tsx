"use client";

import Placeholder from "./Placeholder";
import { useCart } from "./CartContext";
import { formatNaira, shopLink, type Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const href = shopLink(`/products/${product.slug}`);

  return (
    <article className="group relative flex h-full flex-col border border-gold/15 bg-ink-800 transition-all duration-700 ease-luxe hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]">
      <a href={href} className="relative block" aria-label={product.name}>
        <Placeholder
          shape={product.shape}
          tone={product.tone}
          className="aspect-[4/5]"
          artClassName="h-[62%]"
        />
        {product.badge && (
          <span className="absolute left-5 top-5 bg-gold px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider2 text-ink sm:left-6 sm:top-6">
            {product.badge}
          </span>
        )}
        {product.compareAt && (
          <span className="absolute right-5 top-5 border border-gold/60 bg-ink/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider2 text-gold sm:right-6 sm:top-6">
            Sale
          </span>
        )}
        <span className="absolute inset-x-6 bottom-6 translate-y-2 text-center text-[10px] uppercase tracking-luxe text-gold opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
          Quick View
        </span>
      </a>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-6 text-center sm:px-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
          {product.notes.join(" · ")}
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-tight text-cream">
          <a href={href} className="transition-colors hover:text-gold">
            {product.name}
          </a>
        </h3>
        <p className="mt-1.5 text-xs text-cream/45">{product.size}</p>
        <p className="mt-4 flex items-baseline justify-center gap-3">
          <span className="font-serif text-2xl text-cream">{formatNaira(product.price)}</span>
          {product.compareAt && (
            <span className="text-sm text-cream/40 line-through">{formatNaira(product.compareAt)}</span>
          )}
        </p>
        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={() => addItem(product.name)}
            className="btn-outline w-full !py-3.5"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
