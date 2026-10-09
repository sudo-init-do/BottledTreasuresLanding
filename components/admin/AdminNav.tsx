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
            className={`px-2 py-2 text-[10px] font-medium uppercase tracking-wider2 transition-colors sm:px-4 sm:text-[11px] ${active ? "bg-gold text-ink" : "text-cream/70 hover:text-gold"}`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
