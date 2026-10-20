import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SiteChrome, { PageHeader } from "@/components/SiteChrome";
import { readDb } from "@/lib/db";
import { FILTERS, getProducts, searchProducts } from "@/lib/shop";
import { whatsappLink } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Shop — Bottled Treasures" };

export default async function ShopPage({ searchParams }: { searchParams: { f?: string; q?: string } }) {
  const filter = FILTERS.some((f) => f.id === searchParams.f) ? searchParams.f! : "all";
  const q = searchParams.q?.slice(0, 60) ?? "";
  const products = await searchProducts(filter, q);
  const current = FILTERS.find((f) => f.id === filter)!;
  // nothing in the shop at all (not just nothing matching a filter or search)
  const empty = !products.length && (await getProducts()).length === 0;
  const whatsapp = empty ? whatsappLink((await readDb()).settings.whatsapp) : "";

  return (
    <SiteChrome>
      <PageHeader eyebrow="The Shop" title={q ? <>Results for &ldquo;<em className="text-gold">{q}</em>&rdquo;</> : current.id === "all" ? <>All <em className="text-gold">Fragrances</em></> : current.label}>
        <form action="/shop" className="mt-8 flex max-w-md">
          <label htmlFor="shop-q" className="sr-only">Search</label>
          <input id="shop-q" name="q" defaultValue={q} placeholder="Search oud, rose, amber…" className="field" />
          <button className="btn-gold shrink-0 !px-6">Search</button>
        </form>
      </PageHeader>

      <div className="container-site py-12 sm:py-16">
        <nav aria-label="Filter" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
          {FILTERS.map((f) => {
            const active = !q && f.id === filter;
            return (
              <Link
                key={f.id}
                href={f.id === "all" ? "/shop" : `/shop?f=${f.id}`}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap border px-4 py-2 text-[11px] uppercase tracking-wider2 transition-colors ${
                  active ? "border-gold bg-gold text-ink" : "border-gold/25 text-cream/70 hover:border-gold hover:text-gold"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </nav>

        {empty ? null : (
          <p className="mt-8 text-sm text-cream/50">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        )}

        {empty ? (
          <div className="mt-8 border border-gold/15 px-6 py-16 text-center">
            <p className="font-serif text-3xl text-cream">New fragrances are on the way.</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/60">
              Our shelves are being restocked right now. Check back soon, or message us on WhatsApp and we&apos;ll tell you what&apos;s coming.
            </p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8">Message us on WhatsApp</a>
          </div>
        ) : products.length ? (
          <div className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-6 border border-gold/15 px-6 py-16 text-center">
            <p className="font-serif text-2xl text-cream">Nothing here yet.</p>
            <p className="mt-2 text-sm text-cream/60">Try another search or browse all fragrances.</p>
            <Link href="/shop" className="btn-outline mt-6">See all fragrances</Link>
          </div>
        )}
      </div>
    </SiteChrome>
  );
}
