"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BrandMark from "./BrandMark";
import { ArrowIcon, CloseIcon } from "./Icons";

const STORAGE_KEY = "bt-deals-popup-dismissed";
const DELAY_MS = 6000;

/** "Want access to exclusive deals?" sign-up modal, shown once per visitor. */
export default function DealsPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* storage unavailable: still show once */
    }
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus("error");
    setStatus("done");
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center p-4 transition-opacity duration-500 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={close} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="deals-title"
        className={`relative grid w-full max-w-3xl overflow-hidden border border-gold/40 bg-ink shadow-2xl shadow-black transition-transform duration-700 ease-luxe sm:grid-cols-2 ${
          open ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.97]"
        }`}
      >
        <div className="relative hidden aspect-[4/5] sm:block">
          <Image src="/photos/popup.jpg" alt="" fill sizes="384px" className="object-cover" />
          <div aria-hidden className="absolute inset-3 border border-gold/25" />
        </div>
        <div className="relative flex flex-col justify-center px-7 py-12 sm:px-10">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            tabIndex={open ? 0 : -1}
            className="absolute right-3 top-3 p-2 text-cream/70 transition-colors hover:text-gold"
          >
            <CloseIcon />
          </button>
          <BrandMark className="mb-6 h-12 w-auto self-start text-gold" />
          <p className="eyebrow">The Inner Circle</p>
          <h2 id="deals-title" className="mt-4 font-serif text-4xl leading-[1.05] text-cream">
            Want access to <em className="text-gold">exclusive</em> deals?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/65">
            Sign up for early access to new arrivals, private offers and insider fragrance stories. Plus 10% off your
            first order.
          </p>
          {status === "done" ? (
            <p role="status" className="mt-8 border border-gold/40 px-5 py-4 text-sm text-gold">
              You&apos;re in. Check your inbox for your 10% code.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-3">
              <label htmlFor="popup-email" className="sr-only">
                Email address
              </label>
              <input
                ref={input}
                id="popup-email"
                type="email"
                autoComplete="email"
                value={email}
                tabIndex={open ? 0 : -1}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                placeholder="Your email address"
                aria-invalid={status === "error"}
                className="h-12 w-full border border-gold/40 bg-ink-800 px-4 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
              />
              {status === "error" && <p className="text-xs text-gold-light">Please enter a valid email address.</p>}
              <button type="submit" tabIndex={open ? 0 : -1} className="btn-gold w-full">
                Yes, I Want Discounts <ArrowIcon width={16} height={16} />
              </button>
            </form>
          )}
          <button
            type="button"
            onClick={close}
            tabIndex={open ? 0 : -1}
            className="mt-5 self-center text-[11px] uppercase tracking-wider2 text-cream/45 transition-colors hover:text-cream"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
