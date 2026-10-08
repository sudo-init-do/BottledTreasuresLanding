import type { Metadata } from "next";
import CartView from "@/components/CartView";
import SiteChrome, { PageHeader } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Your Cart — Bottled Treasures" };

export default function CartPage() {
  return (
    <SiteChrome>
      <PageHeader eyebrow="Your Cart" title={<>Ready to <em className="text-gold">Checkout?</em></>} />
      <div className="container-site py-12 sm:py-16">
        <CartView />
      </div>
    </SiteChrome>
  );
}
