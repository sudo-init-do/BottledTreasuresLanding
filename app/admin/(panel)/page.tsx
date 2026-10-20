import HelpBox from "@/components/admin/HelpBox";
import DeleteSaleButton from "@/components/admin/DeleteSaleButton";
import SaleForm from "@/components/admin/SaleForm";
import { readDb } from "@/lib/db";
import { formatNaira, type Sale } from "@/lib/types";

const day = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

const sum = (sales: Sale[]) => ({ money: sales.reduce((n, s) => n + s.total, 0), bottles: sales.reduce((n, s) => n + s.qty, 0) });

export default async function SalesPage() {
  const { sales, products } = await readDb();
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
  const month = today.slice(0, 7);
  const totals = [
    { label: "Today", ...sum(sales.filter((s) => s.date === today)) },
    { label: "This month", ...sum(sales.filter((s) => s.date.startsWith(month))) },
    { label: "All time", ...sum(sales) },
  ];
  const sorted = [...sales].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl text-cream">Sales</h1>
        <p className="mt-1 text-sm text-cream/60">Your record of everything you&apos;ve sold.</p>
      </div>

      <HelpBox title="How selling works">
        <p>1. A customer fills their cart and taps <strong className="font-medium text-cream">Order on WhatsApp</strong>. Their order arrives on your WhatsApp, with what they want and where to deliver it.</p>
        <p>2. Agree payment and delivery with them on WhatsApp, as you normally would.</p>
        <p>3. Once they&apos;ve paid, come here and <strong className="font-medium text-cream">record the sale</strong>: choose the product, how many, and the price. The bottles come off your stock count automatically.</p>
        <p>Recorded something by mistake? Tap <strong className="font-medium text-cream">Delete</strong> next to it and the bottles go back into stock.</p>
      </HelpBox>

      <div className="grid gap-4 sm:grid-cols-3">
        {totals.map((t) => (
          <div key={t.label} className="rounded-lg border border-cream/15 bg-ink-800 p-5">
            <p className="text-sm text-cream/60">{t.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-cream">{formatNaira(t.money)}</p>
            <p className="text-sm text-cream/60">{t.bottles} {t.bottles === 1 ? "bottle" : "bottles"}</p>
          </div>
        ))}
      </div>

      {products.length ? (
        <SaleForm products={products.map((p) => ({ id: p.id, name: p.name, price: p.price, stock: p.stock }))} today={today} />
      ) : (
        <p className="rounded-lg border border-cream/15 bg-ink-800 px-6 py-10 text-center text-cream/60">Add your products on the Products page first, then you can record sales here.</p>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-medium text-cream">Past sales</h2>
        {sorted.length === 0 ? (
          <p className="rounded-lg border border-cream/15 bg-ink-800 px-6 py-14 text-center text-cream/60">No sales recorded yet. Your first one will show here.</p>
        ) : (
          <ul className="divide-y divide-cream/10 overflow-hidden rounded-lg border border-cream/15 bg-ink-800">
            {sorted.map((s) => (
              <li key={s.id} className="grid gap-2 p-4 sm:grid-cols-[130px_1fr_auto_auto] sm:items-center sm:gap-6 sm:px-5">
                <span className="text-sm text-cream/60">{day(s.date)}</span>
                <div className="min-w-0">
                  <p className="font-medium text-cream">
                    {s.qty} × {s.name} <span className="font-normal text-cream/60">at {formatNaira(s.price)}</span>
                  </p>
                  {(s.customer || s.note) && <p className="truncate text-sm text-cream/60">{[s.customer, s.note].filter(Boolean).join(" · ")}</p>}
                </div>
                <span className="font-semibold tabular-nums text-cream">{formatNaira(s.total)}</span>
                <span className="sm:justify-self-end">
                  <DeleteSaleButton id={s.id} label={`${s.qty} × ${s.name}`} />
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
