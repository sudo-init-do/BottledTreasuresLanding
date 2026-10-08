import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Sign in — Bottled Treasures", robots: { index: false } };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <BrandMark className="mx-auto h-16 w-auto text-gold" />
          <h1 className="mt-6 font-serif text-4xl text-cream">Owner Sign In</h1>
          <p className="mt-2 text-sm text-cream/60">Manage orders and products.</p>
        </div>
        <div className="mt-10 border border-gold/25 bg-ink-800 p-7">
          <LoginForm />
        </div>
        <Link href="/" className="mt-6 block text-center text-xs uppercase tracking-wider2 text-cream/50 hover:text-gold">← Back to the shop</Link>
      </div>
    </main>
  );
}
