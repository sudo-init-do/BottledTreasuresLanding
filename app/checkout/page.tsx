import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import SiteChrome, { PageHeader } from "@/components/SiteChrome";
import { currentTier } from "@/lib/customers";
import { readDb } from "@/lib/db";
import { getPriceList } from "@/lib/shop";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Checkout — Bottled Treasures" };

export default async function CheckoutPage() {
  const [{ settings }, prices, tier] = await Promise.all([readDb(), getPriceList(), currentTier()]);
  return (
    <SiteChrome>
      <PageHeader eyebrow="Checkout" title={<>Almost <em className="text-gold">Yours</em></>} />
      <div className="container-site py-12 sm:py-16">
        <CheckoutForm settings={settings} prices={prices} wholesale={tier === "wholesale"} />
      </div>
    </SiteChrome>
  );
}
