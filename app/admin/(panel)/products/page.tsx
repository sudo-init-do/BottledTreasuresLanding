import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import HelpBox from "@/components/admin/HelpBox";
import RestockControl from "@/components/admin/RestockControl";
import { getInventory } from "@/lib/shop";
import { formatNaira } from "@/lib/types";

export default async function ProductsPage({ searchParams }: { searchParams: { saved?: string; view?: string } }) {
  const all = await getInventory();
  const lowOnly = searchParams.view === "low";
  const products = lowOnly ? all.filter((p) => p.stock < 5).sort((a, b) => a.stock - b.stock) : all;

  const bottles = all.reduce((n, p) => n + p.stock, 0);
  const lowCount = all.filter((p) => p.stock < 5).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-cream">Products</h1>
          <p className="mt-1 text-sm text-cream/60">
            {all.length} products · {bottles.toLocaleString("en-NG")} bottles in stock
            {lowCount > 0 && ` · ${lowCount} low or sold out`}
          </p>
        </div>
        <Link href="/admin/products/new" className="rounded-md bg-gold px-5 py-3 text-sm font-medium text-ink-800 hover:opacity-85">
          + Add new product
        </Link>
      </div>

      <HelpBox title="How this page works">
        <p>
          <strong className="font-medium text-cream">New delivery?</strong> Find the product and tap <strong className="font-medium text-cream">+ Add stock</strong>, then type how many bottles arrived. They&apos;re added to what you already have.
        </p>
        <p>
          <strong className="font-medium text-cream">Number wrong?</strong> Tap <strong className="font-medium text-cream">Correct count</strong> and type the exact number you have.
        </p>
        <p>
          <strong className="font-medium text-cream">Selling something new?</strong> Tap <strong className="font-medium text-cream">+ Add new product</strong>. To change a price, photo or name, tap <strong className="font-medium text-cream">Edit</strong>. To remove a product from the shop, tap <strong className="font-medium text-cream">Delete</strong>.
        </p>
        <p>When a customer orders, their bottles are taken off automatically. At 0 the product shows as &ldquo;Sold out&rdquo; in the shop.</p>
      </HelpBox>

      {searchParams.saved && (
        <p role="status" className="rounded-md border border-cream/30 bg-ink-800 px-4 py-3 text-sm font-medium text-cream">
          ✓ Saved. The shop now shows your changes.
        </p>
      )}

      <nav className="flex gap-2 text-sm">
        <Link href="/admin/products" aria-current={!lowOnly ? "page" : undefined} className={`rounded-full border px-4 py-1.5 ${!lowOnly ? "border-cream bg-cream text-ink-800" : "border-cream/25 text-cream/70 hover:border-cream/60"}`}>
          All products
        </Link>
        <Link href="/admin/products?view=low" aria-current={lowOnly ? "page" : undefined} className={`rounded-full border px-4 py-1.5 ${lowOnly ? "border-cream bg-cream text-ink-800" : "border-cream/25 text-cream/70 hover:border-cream/60"}`}>
          Low or sold out ({lowCount})
        </Link>
      </nav>

      {products.length === 0 ? (
        <p className="rounded-lg border border-cream/15 bg-ink-800 px-6 py-14 text-center text-cream/60">
          {lowOnly ? "Nothing is running low. Every product has 5 or more bottles." : "No products yet. Tap “+ Add new product” to add your first one."}
        </p>
      ) : (
        <ul className="divide-y divide-cream/10 overflow-hidden rounded-lg border border-cream/15 bg-ink-800">
          {products.map((p) => (
            <li key={p.id} className="grid gap-4 p-4 sm:grid-cols-[1fr_200px_auto] sm:items-center sm:gap-6 sm:p-5">
              <div className="flex min-w-0 items-center gap-4">
                <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded border border-cream/10 bg-ink">
                  <Image src={p.image} alt="" fill sizes="56px" className="object-cover" unoptimized={p.image.startsWith("/media/")} />
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-cream">{p.name}</p>
                  <p className="text-sm text-cream/60">
                    {formatNaira(p.price)}
                    {p.size && <span className="text-cream/50"> · {p.size}</span>}
                  </p>
                  {p.wholesalePrice && <p className="text-xs text-cream/50">Wholesale {formatNaira(p.wholesalePrice)}</p>}
                </div>
              </div>

              <RestockControl id={p.id} name={p.name} initial={p.stock} />

              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                <Link href={`/admin/products/${p.id}`} className="text-sm text-cream/60 underline underline-offset-2 hover:text-cream">
                  Edit
                </Link>
                <DeleteProductButton id={p.id} name={p.name} compact />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
