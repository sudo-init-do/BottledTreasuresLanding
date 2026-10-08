import type { Metadata } from "next";
import OrderSummary from "@/components/OrderSummary";
import SiteChrome, { PageHeader } from "@/components/SiteChrome";
import { readDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Track Your Order — Bottled Treasures" };

const digits = (s: string) => s.replace(/\D/g, "").slice(-10);

export default async function TrackPage({ searchParams }: { searchParams: { code?: string; phone?: string } }) {
  const code = (searchParams.code ?? "").trim().toUpperCase().slice(0, 12);
  const phone = (searchParams.phone ?? "").trim().slice(0, 30);
  const searched = Boolean(code && phone);
  const order = searched
    ? (await readDb()).orders.find((o) => o.code === code && digits(o.customer.phone) === digits(phone))
    : undefined;

  return (
    <SiteChrome>
      <PageHeader eyebrow="Track" title={<>Where&apos;s my <em className="text-gold">order?</em></>} />
      <div className="container-site max-w-3xl py-12 sm:py-16">
        <form action="/track" className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label className="label" htmlFor="t-code">Order number</label>
            <input id="t-code" name="code" defaultValue={code} placeholder="BT-1A2B3C" required className="field uppercase" />
          </div>
          <div>
            <label className="label" htmlFor="t-phone">Phone number used</label>
            <input id="t-phone" name="phone" defaultValue={phone} type="tel" required className="field" />
          </div>
          <button className="btn-gold h-12">Track</button>
        </form>

        <div className="mt-10">
          {order ? (
            <OrderSummary order={order} />
          ) : searched ? (
            <p className="border border-gold/30 px-5 py-4 text-sm text-cream/70">We couldn&apos;t find that order. Check the order number and phone number, or message us on WhatsApp.</p>
          ) : null}
        </div>
      </div>
    </SiteChrome>
  );
}
