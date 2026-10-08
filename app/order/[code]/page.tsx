import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClearCart from "@/components/ClearCart";
import OrderSummary from "@/components/OrderSummary";
import SiteChrome, { PageHeader } from "@/components/SiteChrome";
import { readDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your Order — Bottled Treasures", robots: { index: false } };

export default async function OrderPage({ params, searchParams }: { params: { code: string }; searchParams: { placed?: string } }) {
  const { orders, settings } = await readDb();
  const order = orders.find((o) => o.code === params.code.toUpperCase());
  if (!order) notFound();
  const placed = searchParams.placed === "1";

  return (
    <SiteChrome>
      {placed && <ClearCart />}
      <PageHeader eyebrow={placed ? "Thank you" : "Your order"} title={placed ? <>Order <em className="text-gold">received</em></> : <>Order <em className="text-gold">{order.code}</em></>}>
        {placed && (
          <p className="mt-5 max-w-xl text-cream/70">
            We&apos;re checking your payment now and will confirm on WhatsApp. Keep your order number <strong className="text-gold">{order.code}</strong> to track it.
          </p>
        )}
      </PageHeader>
      <div className="container-site max-w-3xl py-12 sm:py-16">
        <OrderSummary order={order} />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop" className="btn-outline">Continue Shopping</Link>
          <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, I just placed order ${order.code}`)}`} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </SiteChrome>
  );
}
