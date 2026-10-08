import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/OrderSummary";
import SubmitButton from "@/components/admin/SubmitButton";
import { readDb } from "@/lib/db";
import { DELIVERY, ORDER_STATUSES, formatNaira } from "@/lib/types";
import { setOrderStatus } from "../../../actions";

export default async function OrderDetail({ params }: { params: { id: string } }) {
  const order = (await readDb()).orders.find((o) => o.id === params.id);
  if (!order) notFound();
  const c = order.customer;
  const wa = c.phone.replace(/\D/g, "").replace(/^0/, "234");
  const isPdf = order.proof.endsWith(".pdf");

  return (
    <div className="space-y-8">
      <Link href="/admin" className="text-[11px] uppercase tracking-wider2 text-cream/60 hover:text-gold">← All orders</Link>
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="font-serif text-4xl text-cream">Order {order.code}</h1>
        <StatusBadge status={order.status} />
      </div>

      <form action={setOrderStatus} className="flex flex-wrap items-end gap-3 border border-gold/30 bg-burgundy-900 p-5">
        <input type="hidden" name="id" value={order.id} />
        <div className="min-w-[220px] flex-1">
          <label className="label" htmlFor="o-status">Update status</label>
          <select id="o-status" name="status" defaultValue={order.status} className="field">
            {ORDER_STATUSES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
        <SubmitButton className="btn-gold h-12">Save Status</SubmitButton>
      </form>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-6">
          <div className="border border-gold/20 bg-ink-800 p-5">
            <h2 className="eyebrow">Customer</h2>
            <p className="mt-3 font-serif text-2xl text-cream">{c.name}</p>
            <p className="mt-1 text-cream/80">{c.phone}{c.email && ` · ${c.email}`}</p>
            <p className="mt-3 text-sm text-cream/70">{DELIVERY[order.delivery].label}</p>
            {order.delivery !== "pickup" && <p className="text-sm text-cream/70">{c.address}, {c.city}</p>}
            {c.note && <p className="mt-3 border-l-2 border-gold/50 pl-3 text-sm italic text-cream/70">{c.note}</p>}
            <a href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hi ${c.name}, this is Bottled Treasures about your order ${order.code}.`)}`} target="_blank" rel="noopener noreferrer" className="btn-outline mt-5 !py-2.5">
              WhatsApp customer
            </a>
          </div>

          <div className="border border-gold/20 bg-ink-800 p-5">
            <h2 className="eyebrow">Items</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {order.items.map((i) => (
                <li key={i.slug} className="flex justify-between gap-4"><span>{i.name} × {i.qty}</span><span>{formatNaira(i.price * i.qty)}</span></li>
              ))}
              <li className="flex justify-between gap-4 text-cream/60"><span>Delivery</span><span>{order.deliveryFee ? formatNaira(order.deliveryFee) : "Free"}</span></li>
            </ul>
            <p className="mt-4 flex justify-between border-t border-gold/15 pt-3 font-serif text-2xl"><span>Total</span><span className="text-gold">{formatNaira(order.total)}</span></p>
          </div>
        </section>

        <section className="border border-gold/20 bg-ink-800 p-5">
          <div className="flex items-center justify-between">
            <h2 className="eyebrow">Payment receipt</h2>
            <a href={order.proof} target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-wider2 text-cream/60 hover:text-gold">Open full size ↗</a>
          </div>
          <p className="mt-2 text-sm text-cream/60">Check that <strong className="text-gold">{formatNaira(order.total)}</strong> arrived in your account before marking it paid.</p>
          {isPdf ? (
            <a href={order.proof} target="_blank" rel="noopener noreferrer" className="btn-outline mt-5">Open PDF receipt</a>
          ) : (
            <div className="relative mt-5 aspect-[3/4] w-full overflow-hidden border border-gold/15 bg-ink">
              <Image src={order.proof} alt="Payment receipt" fill unoptimized className="object-contain" />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
