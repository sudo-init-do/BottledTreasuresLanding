import Image from "next/image";
import Link from "next/link";
import StockControl from "@/components/admin/StockControl";
import { getProducts } from "@/lib/shop";
import { formatNaira, stockLevel } from "@/lib/types";

export default async function ProductsPage({ searchParams }: { searchParams: { saved?: string; view?: string } }) {
  const all = await getProducts();
  const lowOnly = searchParams.view === "low";
  const products = lowOnly ? all.filter((p) => stockLevel(p.stock) === "low").sort((a, b) => a.stock - b.stock) : all;

  const bottles = all.reduce((n, p) => n + p.stock, 0);
  const low = all.filter((p) => p.stock > 0 && p.stock < 5).length;
  const soldOut = all.filter((p) => p.stock === 0).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-4xl text-cream">Inventory</h1>
        <Link href="/admin/products/new" className="btn-gold">+ Add Product</Link>
      </div>
      {searchParams.saved && <p role="status" className="border border-gold/50 px-4 py-3 text-sm text-gold">Saved. The shop is updated.</p>}

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="border border-gold/20 bg-ink-800 p-3 sm:p-5">
          <p className="text-[10px] uppercase tracking-wider2 text-cream/60 sm:text-[11px]">Bottles on hand</p>
          <p className="mt-2 font-sans text-3xl font-light tabular-nums sm:text-4xl text-cream">{bottles.toLocaleString("en-NG")}</p>
          <p className="mt-1 hidden text-xs text-cream/50 sm:block">across {all.length} products</p>
        </div>
        <Link href="/admin/products?view=low" className="border border-stock-low/40 bg-ink-800 p-3 sm:p-5 transition-colors hover:border-stock-low">
          <p className="text-[10px] uppercase tracking-wider2 text-cream/60 sm:text-[11px]">Running low</p>
          <p className="mt-2 font-sans text-3xl font-light tabular-nums sm:text-4xl text-stock-low">{low}</p>
          <p className="mt-1 hidden text-xs text-cream/50 sm:block">under 5 left · tap to see them</p>
        </Link>
        <Link href="/admin/products?view=low" className="border border-gold/20 bg-ink-800 p-3 sm:p-5 transition-colors hover:border-gold/60">
          <p className="text-[10px] uppercase tracking-wider2 text-cream/60 sm:text-[11px]">Sold out</p>
          <p className="mt-2 font-sans text-3xl font-light tabular-nums sm:text-4xl text-cream">{soldOut}</p>
          <p className="mt-1 hidden text-xs text-cream/50 sm:block">hidden from buying until restocked</p>
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="flex gap-2 text-[11px] uppercase tracking-wider2">
          <Link href="/admin/products" className={`border px-3 py-1.5 ${!lowOnly ? "border-gold text-gold" : "border-gold/20 text-cream/60"}`}>All ({all.length})</Link>
          <Link href="/admin/products?view=low" className={`border px-3 py-1.5 ${lowOnly ? "border-gold text-gold" : "border-gold/20 text-cream/60"}`}>Low stock ({low + soldOut})</Link>
        </nav>
        <p className="flex flex-wrap items-center gap-4 text-xs text-cream/60">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-stock-low" /> under 5</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-stock-medium" /> 5–19</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-stock-healthy" /> 20+</span>
        </p>
      </div>

      {products.length === 0 ? (
        <p className="border border-gold/15 px-6 py-14 text-center text-cream/60">{lowOnly ? "Nothing is running low. Everything is well stocked." : "No products yet."}</p>
      ) : (
        <div className="relative overflow-x-auto border border-gold/15">
          <table className="w-full text-left">
            <thead className="border-b border-gold/15 text-[11px] uppercase tracking-wider2 text-cream/50">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Price</th>
                <th className="px-4 py-3 font-medium">In stock</th>
                <th className="hidden px-4 py-3 sm:table-cell"><span className="sr-only">Edit</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {products.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-ink-800/60">
                  <td className="px-3 py-3 sm:px-4">
                    <Link href={`/admin/products/${p.id}`} className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <span className="relative hidden h-14 w-12 shrink-0 min-[420px]:block overflow-hidden border border-gold/15 bg-ink-800">
                        <Image src={p.image} alt="" fill sizes="48px" className="object-cover" unoptimized={p.image.startsWith("/media/")} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-serif text-lg leading-tight text-cream hover:text-gold sm:text-xl">{p.name}</span>
                        <span className="block truncate text-xs text-cream/50">
                          <span className="sm:hidden">{formatNaira(p.price)} · </span>
                          {p.size}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-3 font-sans tabular-nums text-cream/90 sm:table-cell">{formatNaira(p.price)}</td>
                  <td className="px-3 py-3 sm:px-4">
                    <StockControl id={p.id} name={p.name} initial={p.stock} />
                  </td>
                  <td className="hidden px-4 py-3 text-right sm:table-cell">
                    <Link href={`/admin/products/${p.id}`} className="text-[11px] uppercase tracking-wider2 text-cream/50 hover:text-gold">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
