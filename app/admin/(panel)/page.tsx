import Link from "next/link";
import { StatusBadge } from "@/components/OrderSummary";
import { readDb } from "@/lib/db";
import { ORDER_STATUSES, formatNaira } from "@/lib/types";

const date = (iso: string) => new Date(iso).toLocaleString("en-NG", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

export default async function OrdersPage({ searchParams }: { searchParams: { s?: string } }) {
  const { orders } = await readDb();
  const filter = ORDER_STATUSES.some((s) => s.id === searchParams.s) ? searchParams.s : undefined;
  const shown = filter ? orders.filter((o) => o.status === filter) : orders;
  const toCheck = orders.filter((o) => o.status === "pending").length;
  const toSend = orders.filter((o) => o.status === "paid").length;
  const sales = orders.filter((o) => ["paid", "dispatched", "completed"].includes(o.status)).reduce((n, o) => n + o.total, 0);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Payments to check", value: String(toCheck), href: "/admin?s=pending" },
          { label: "Paid, ready to send", value: String(toSend), href: "/admin?s=paid" },
          { label: "Total sales", value: formatNaira(sales), href: "/admin" },
        ].map((s) => (
          <Link key={s.label} href={s.href} className="border border-gold/20 bg-ink-800 p-5 transition-colors hover:border-gold/60">
            <p className="text-[11px] uppercase tracking-wider2 text-cream/60">{s.label}</p>
            <p className="mt-2 font-serif text-4xl text-gold">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-serif text-4xl text-cream">Orders</h1>
        <nav className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wider2">
          <Link href="/admin" className={`border px-3 py-1.5 ${!filter ? "border-gold text-gold" : "border-gold/20 text-cream/60"}`}>All</Link>
          {ORDER_STATUSES.map((s) => (
            <Link key={s.id} href={`/admin?s=${s.id}`} className={`border px-3 py-1.5 ${filter === s.id ? "border-gold text-gold" : "border-gold/20 text-cream/60"}`}>{s.label}</Link>
          ))}
        </nav>
      </div>

      {shown.length === 0 ? (
        <p className="border border-gold/15 px-6 py-14 text-center text-cream/60">
          {orders.length ? "No orders with this status." : "No orders yet. They'll appear here as soon as a customer checks out."}
        </p>
      ) : (
        <ul className="divide-y divide-gold/10 border border-gold/15">
          {shown.map((o) => (
            <li key={o.id}>
              <Link href={`/admin/orders/${o.id}`} className="grid grid-cols-2 items-center gap-3 px-4 py-4 transition-colors hover:bg-ink-800 sm:grid-cols-[110px_1fr_auto_auto_auto] sm:gap-6">
                <span className="font-medium text-gold">{o.code}</span>
                <span className="min-w-0 truncate text-cream">{o.customer.name} <span className="text-cream/50">· {o.items.reduce((n, i) => n + i.qty, 0)} item(s)</span></span>
                <span className="text-sm text-cream/50">{date(o.createdAt)}</span>
                <span className="font-serif text-lg text-cream">{formatNaira(o.total)}</span>
                <span className="justify-self-start sm:justify-self-end"><StatusBadge status={o.status} /></span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
