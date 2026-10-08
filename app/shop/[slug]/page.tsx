import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import Placeholder from "@/components/Placeholder";
import ProductCard from "@/components/ProductCard";
import SiteChrome from "@/components/SiteChrome";
import { getProduct, getProducts } from "@/lib/shop";
import { DELIVERY, formatNaira } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProduct(params.slug);
  return { title: p ? `${p.name} — Bottled Treasures` : "Not found — Bottled Treasures" };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();
  const related = (await getProducts()).filter((p) => p.slug !== product.slug && p.tags.some((t) => product.tags.includes(t))).slice(0, 4);

  return (
    <SiteChrome>
      <div className="container-site py-10 sm:py-16">
        <nav className="text-xs uppercase tracking-wider2 text-cream/50">
          <Link href="/shop" className="hover:text-gold">Shop</Link> <span className="px-2">/</span> <span className="text-cream/80">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:gap-16">
          <Placeholder
            className="aspect-[4/5] border border-gold/20"
            image={product.image}
            alt={product.name}
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
          <div>
            {product.badge && <span className="bg-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider2 text-ink">{product.badge}</span>}
            <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">{product.notes.join(" · ")}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-cream sm:text-5xl">{product.name}</h1>
            <p className="mt-2 text-sm text-cream/50">{product.size}</p>
            <p className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-4xl text-cream">{formatNaira(product.price)}</span>
              {product.compareAt && <span className="text-cream/40 line-through">{formatNaira(product.compareAt)}</span>}
            </p>
            <p className="mt-6 max-w-lg leading-relaxed text-cream/70">{product.description}</p>

            <AddToCart product={product} />

            <ul className="mt-10 space-y-2 border-t border-gold/15 pt-6 text-sm text-cream/60">
              <li>✓ 100% authentic, sealed</li>
              <li>✓ Pay by bank transfer, then upload your receipt</li>
              <li>
                ✓ {DELIVERY.pickup.label} (free), Lagos delivery {formatNaira(DELIVERY.lagos.fee)}, nationwide {formatNaira(DELIVERY.nationwide.fee)}
              </li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-3xl text-cream">You may also like</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteChrome>
  );
}
