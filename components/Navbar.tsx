"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { useCart } from "./CartContext";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from "./Icons";
import Link from "next/link";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/#story" },
  { label: "How to Order", href: "/#how-to-order" },
];

/** `solid` gives the bar a background from the start, for pages without a dark hero behind it. */
export default function Navbar({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const { count, lastAdded } = useCart();
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    if (searchOpen) searchInput.current?.focus();
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 transition-all duration-500 ease-luxe ${
          scrolled || solid
            ? "top-0 border-b border-gold/20 bg-ink/95 backdrop-blur-md"
            : "top-9 border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="container-site flex h-[72px] items-center justify-between gap-4 lg:h-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="-ml-2 p-2 text-cream lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon width={22} height={22} />
            </button>
            <Logo />
          </div>

          <ul className="hidden items-center gap-10 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="link-luxe text-[11px] font-medium uppercase tracking-wider2 text-cream/85 transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search"
              className="p-2 text-cream/85 transition-colors hover:text-gold"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </button>
            <a
              href="/track"
              aria-label="Track your order"
              className="hidden p-2 text-cream/85 transition-colors hover:text-gold sm:block"
            >
              <UserIcon />
            </a>
            <a
              href="/cart"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              className="relative p-2 text-cream/85 transition-colors hover:text-gold"
            >
              <BagIcon />
              <span
                className={`absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-gold px-1 text-[9px] font-medium text-ink transition-transform duration-300 ${
                  bump ? "scale-125" : "scale-100"
                }`}
              >
                {count}
              </span>
            </a>
            <Link href="/shop" className="btn-gold ml-2 hidden !px-6 !py-3 md:inline-flex">
              Shop Now
            </Link>
          </div>
        </nav>
      </header>

      {/* Added-to-cart toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-4 border border-gold/40 bg-ink px-6 py-4 text-sm shadow-2xl shadow-black/60 transition-all duration-500 ease-luxe ${
          lastAdded ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <BagIcon className="text-gold" />
        <span className="whitespace-nowrap">
          <span className="font-serif text-lg italic text-gold">{lastAdded}</span>{" "}
          <span className="text-cream/80">added to cart</span>
        </span>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col border-r border-gold/20 bg-ink px-7 py-6 transition-transform duration-500 ease-luxe ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              className="p-2 text-cream"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <CloseIcon />
            </button>
          </div>
          <ul className="mt-14 space-y-1">
            {links.map((l, i) => (
              <li
                key={l.label}
                className={`transition-all duration-700 ease-luxe ${
                  menuOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms" }}
              >
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  className="flex items-center justify-between border-b border-gold/15 py-5 font-serif text-3xl text-cream transition-colors hover:text-gold"
                >
                  {l.label}
                  <span className="font-sans text-[10px] tracking-luxe text-gold/70">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-4">
            <a
              href="/track"
              tabIndex={menuOpen ? 0 : -1}
              className="flex items-center gap-3 text-xs uppercase tracking-wider2 text-cream/80"
            >
              <UserIcon /> Track My Order
            </a>
            <a href="/shop" tabIndex={menuOpen ? 0 : -1} className="btn-gold w-full">
              Shop Now
            </a>
          </div>
        </aside>
      </div>

      {/* Search overlay */}
      <div
        className={`fixed inset-0 z-[60] flex items-start justify-center bg-ink/95 px-5 pt-40 backdrop-blur-sm transition-opacity duration-500 ${
          searchOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!searchOpen}
        onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
      >
        <button
          type="button"
          aria-label="Close search"
          className="absolute right-5 top-6 p-2 text-cream hover:text-gold sm:right-10"
          onClick={() => setSearchOpen(false)}
          tabIndex={searchOpen ? 0 : -1}
        >
          <CloseIcon width={26} height={26} />
        </button>
        <form action="/shop" method="get" className="w-full max-w-3xl">
          <label htmlFor="site-search" className="eyebrow">
            Search the collection
          </label>
          <div className="mt-5 flex items-center border-b border-gold/50 focus-within:border-gold">
            <input
              ref={searchInput}
              id="site-search"
              name="q"
              type="search"
              placeholder="Oud, rose, amber…"
              tabIndex={searchOpen ? 0 : -1}
              className="w-full bg-transparent py-4 font-serif text-3xl text-cream placeholder:text-cream/30 focus:outline-none sm:text-5xl"
            />
            <button type="submit" aria-label="Submit search" className="p-2 text-gold" tabIndex={searchOpen ? 0 : -1}>
              <SearchIcon width={28} height={28} />
            </button>
          </div>
          <p className="mt-6 text-xs uppercase tracking-wider2 text-cream/50">
            Popular: Oud Noir · Bonny Nights · Velvet Rose
          </p>
        </form>
      </div>
    </>
  );
}
