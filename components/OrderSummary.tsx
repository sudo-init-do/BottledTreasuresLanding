import { DELIVERY, ORDER_STATUSES, formatNaira, type Order } from "@/lib/types";

const steps = ["pending", "paid", "dispatched", "completed"] as const;

export function StatusBadge({ status }: { status: Order["status"] }) {
  const label = ORDER_STATUSES.find((s) => s.id === status)?.label ?? status;
  const tone =
    status === "pending" ? "border-gold/60 text-gold" : status === "cancelled" ? "border-cream/30 text-cream/50" : status === "completed" ? "border-cream/40 text-cream" : "border-gold bg-gold text-ink";
  return <span className={`inline-block whitespace-nowrap border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider2 ${tone}`}>{label}</span>;
}

/** Public view of an order: progress, items and totals. */
export default function OrderSummary({ order }: { order: Order }) {
  const at = steps.indexOf(order.status as (typeof steps)[number]);
  return (
    <div className="space-y-8">
      {order.status === "cancelled" ? (
        <p className="border border-gold/30 px-5 py-4 text-sm text-cream/70">This order was cancelled. Message us on WhatsApp if you have questions.</p>
      ) : (
        <ol className="grid grid-cols-4 gap-2">
          {steps.map((s, i) => (
            <li key={s} className="text-center">
              <span className={`block h-1 ${i <= at ? "bg-gold" : "bg-gold/15"}`} />
              <span className={`mt-2 block text-[10px] uppercase tracking-wider2 ${i <= at ? "text-gold" : "text-cream/40"}`}>
                {ORDER_STATUSES.find((x) => x.id === s)!.label}
              </span>
            </li>
          ))}
        </ol>
      )}

      <div className="border border-gold/20 bg-ink-800 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-serif text-2xl text-cream">Order {order.code}</p>
          <StatusBadge status={order.status} />
        </div>
        <ul className="mt-5 space-y-2 text-sm">
          {order.items.map((i) => (
            <li key={i.slug} className="flex justify-between gap-4">
              <span className="text-cream/80">{i.name} × {i.qty}</span>
              <span>{formatNaira(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1 border-t border-gold/15 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-cream/60">{DELIVERY[order.delivery].label}</dt><dd>{order.deliveryFee ? formatNaira(order.deliveryFee) : "Free"}</dd></div>
          <div className="flex justify-between font-serif text-2xl"><dt>Total</dt><dd className="text-gold">{formatNaira(order.total)}</dd></div>
        </dl>
      </div>
    </div>
  );
}
