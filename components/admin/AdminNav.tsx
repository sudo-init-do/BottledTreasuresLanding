"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="flex gap-0.5 sm:gap-1">
      {links.map((l) => {
        const active = l.href === "/admin" ? path === "/admin" || path.startsWith("/admin/orders") : path.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${active ? "bg-gold text-ink-800" : "text-cream/60 hover:bg-ink hover:text-cream"}`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
