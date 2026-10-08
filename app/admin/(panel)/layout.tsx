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
    <div className="min-h-screen bg-ink">
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-ink/95 backdrop-blur">
        <div className="container-site flex h-16 items-center justify-between gap-2 sm:gap-4">
          <Link href="/admin" className="flex items-center gap-3">
            <BrandMark className="h-8 w-auto text-gold" />
            <span className="hidden font-serif text-lg tracking-[0.12em] text-cream sm:inline">DASHBOARD</span>
          </Link>
          <AdminNav />
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="hidden text-[11px] uppercase tracking-wider2 text-cream/60 hover:text-gold md:inline">View shop ↗</Link>
            <form action={logout}>
              <button className="whitespace-nowrap text-[10px] uppercase tracking-wider2 text-cream/60 hover:text-gold sm:text-[11px]">Log out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-site py-10">{children}</main>
    </div>
  );
}
