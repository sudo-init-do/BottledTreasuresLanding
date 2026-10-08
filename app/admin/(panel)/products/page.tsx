import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/shop";
import { formatNaira } from "@/lib/types";

export default async function ProductsPage({ searchParams }: { searchParams: { saved?: string } }) {
  const products = await getProducts();
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-4xl text-cream">Products <span className="text-cream/40">({products.length})</span></h1>
        <Link href="/admin/products/new" className="btn-gold">+ Add Product</Link>
      </div>
      {searchParams.saved && <p role="status" className="border border-gold/50 px-4 py-3 text-sm text-gold">Saved. The shop is updated.</p>}

      <ul className="divide-y divide-gold/10 border border-gold/15">
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/admin/products/${p.id}`} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-ink-800">
              <span className="relative h-16 w-14 shrink-0 overflow-hidden border border-gold/15 bg-ink-800">
                <Image src={p.image} alt="" fill sizes="56px" className="object-cover" unoptimized={p.image.startsWith("/media/")} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-serif text-xl text-cream">{p.name}</span>
                <span className="block truncate text-xs text-cream/50">{p.size}</span>
              </span>
              <span className="font-serif text-lg text-cream">{formatNaira(p.price)}</span>
              <span className={`hidden w-24 text-right text-[11px] uppercase tracking-wider2 sm:block ${p.inStock ? "text-cream/50" : "text-gold"}`}>
                {p.inStock ? "In stock" : "Sold out"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
