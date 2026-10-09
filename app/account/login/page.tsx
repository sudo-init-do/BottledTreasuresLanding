import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import CustomerLoginForm from "@/components/CustomerLoginForm";
import SiteChrome, { PageHeader } from "@/components/SiteChrome";
import { currentCustomer } from "@/lib/customers";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Sign in — Bottled Treasures", robots: { index: false } };

export default async function CustomerLoginPage() {
  if (await currentCustomer()) redirect("/account");
  return (
    <SiteChrome>
      <PageHeader eyebrow="Trade Customers" title={<>Wholesale <em className="text-gold">Sign In</em></>} />
      <div className="container-site grid gap-10 py-12 sm:py-16 md:grid-cols-[minmax(0,400px)_1fr] md:gap-16">
        <div className="border border-gold/25 bg-ink-800 p-7">
          <CustomerLoginForm />
        </div>
        <div className="max-w-md space-y-4 text-sm leading-relaxed text-cream/70">
          <p>
            Wholesale customers see trade prices across the shop once signed in. Accounts are set up by our team: message us on
            WhatsApp or email <a href="mailto:wholesale@bottledtreasures.ng" className="text-gold hover:underline">wholesale@bottledtreasures.ng</a> to apply.
          </p>
          <p>
            Shopping for yourself? No account needed. <Link href="/shop" className="text-gold hover:underline">Go to the shop</Link> or{" "}
            <Link href="/track" className="text-gold hover:underline">track an order</Link>.
          </p>
        </div>
      </div>
    </SiteChrome>
  );
}
