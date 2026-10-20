import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dashboard — Bottled Treasures", robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="admin min-h-screen">
      <header className="sticky top-0 z-40 border-b border-gold/15 bg-ink-800">
        <div className="container-site flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 sm:h-16 sm:flex-nowrap sm:py-0">
          <Link href="/admin" className="flex items-center gap-3">
            <BrandMark className="h-8 w-auto text-gold" />
            <span className="text-sm font-medium text-cream">Bottled Treasures · Admin</span>
          </Link>
          <div className="order-last -mx-1 w-full sm:order-none sm:mx-0 sm:w-auto">
            <AdminNav />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-cream/60 hover:text-cream">View shop ↗</Link>
            <form action={logout}>
              <button className="whitespace-nowrap text-sm text-cream/60 hover:text-cream">Log out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-site max-w-5xl py-8 sm:py-10">{children}</main>
    </div>
  );
}
