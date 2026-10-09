import Link from "next/link";
import { readDb } from "@/lib/db";

export default async function CustomersPage({ searchParams }: { searchParams: { saved?: string } }) {
  const { customers } = await readDb();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-cream">Customers</h1>
          <p className="mt-2 max-w-xl text-sm text-cream/60">
            Wholesale customers sign in at <span className="text-cream">/account/login</span> and see wholesale prices. Everyone else shops as a guest at retail prices.
          </p>
        </div>
        <Link href="/admin/customers/new" className="btn-gold">+ Add Customer</Link>
      </div>
      {searchParams.saved && <p role="status" className="border border-gold/50 px-4 py-3 text-sm text-gold">Saved.</p>}

      {customers.length === 0 ? (
        <p className="border border-gold/15 px-6 py-14 text-center text-cream/60">No customer accounts yet. Add one for each wholesale buyer.</p>
      ) : (
        <ul className="divide-y divide-gold/10 border border-gold/15">
          {customers.map((c) => (
            <li key={c.id}>
              <Link href={`/admin/customers/${c.id}`} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-ink-800/60">
                <span className="min-w-0">
                  <span className="block font-serif text-xl text-cream">{c.name}</span>
                  <span className="block truncate text-xs text-cream/50">{c.email}</span>
                </span>
                <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider2">
                  <span className={`border px-2.5 py-1 ${c.tier === "wholesale" ? "border-gold text-gold" : "border-cream/30 text-cream/60"}`}>{c.tier}</span>
                  {!c.active && <span className="border border-stock-low/60 px-2.5 py-1 text-stock-low">Off</span>}
                  <span className="pl-2 text-cream/50">Edit</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
