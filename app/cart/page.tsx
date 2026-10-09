import type { Metadata } from "next";
import CartView from "@/components/CartView";
import SiteChrome, { PageHeader } from "@/components/SiteChrome";
import { currentTier } from "@/lib/customers";
import { getPriceList } from "@/lib/shop";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your Cart — Bottled Treasures" };

export default async function CartPage() {
  const [prices, tier] = await Promise.all([getPriceList(), currentTier()]);
  return (
    <SiteChrome>
      <PageHeader eyebrow="Your Cart" title={<>Ready to <em className="text-gold">Checkout?</em></>} />
      <div className="container-site py-12 sm:py-16">
        <CartView prices={prices} wholesale={tier === "wholesale"} />
      </div>
    </SiteChrome>
  );
}
