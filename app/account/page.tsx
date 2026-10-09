import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/admin/SubmitButton";
import SiteChrome, { PageHeader } from "@/components/SiteChrome";
import { currentCustomer } from "@/lib/customers";
import { customerLogout } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your Account — Bottled Treasures", robots: { index: false } };

export default async function AccountPage() {
  const customer = await currentCustomer();
  if (!customer) redirect("/account/login");
  const wholesale = customer.tier === "wholesale";
  return (
    <SiteChrome>
      <PageHeader eyebrow="Your Account" title={<>Welcome, <em className="text-gold">{customer.name.split(" ")[0]}</em></>} />
      <div className="container-site max-w-2xl space-y-8 py-12 sm:py-16">
        <div className="border border-gold/25 bg-ink-800 p-7">
          <p className="text-[11px] uppercase tracking-wider2 text-cream/50">Signed in as</p>
          <p className="mt-1 text-cream">{customer.name} · {customer.email}</p>
          <p className="mt-5 text-[11px] uppercase tracking-wider2 text-cream/50">Account type</p>
          <p className="mt-1 font-serif text-2xl text-gold">{wholesale ? "Wholesale" : "Retail"}</p>
          <p className="mt-2 text-sm text-cream/70">
            {wholesale
              ? "You see wholesale prices on products, in your cart and at checkout while you're signed in."
              : "You see our standard prices. Message us if you'd like a wholesale account."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/shop" className="btn-gold">Shop Now</Link>
          <Link href="/track" className="btn-outline">Track an Order</Link>
          <form action={customerLogout}>
            <SubmitButton pendingText="Signing out…" className="text-[11px] uppercase tracking-wider2 text-cream/60 hover:text-gold">Sign out</SubmitButton>
          </form>
        </div>
      </div>
    </SiteChrome>
  );
}
