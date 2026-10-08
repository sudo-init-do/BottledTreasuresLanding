"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("done");
    setEmail("");
  };

  return (
    <section id="newsletter" className="grain relative overflow-hidden border-y border-gold/20 bg-burgundy py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-4 border border-gold/15 sm:inset-8" />
      <div className="container-site relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Inner Circle</p>
          <h2 className="section-title mt-5">
            Join for <em className="text-gold">First Access</em>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-cream/75">
            New arrivals, private sales and scent stories — delivered to your inbox. Plus 10% off your first order.
          </p>

          <form onSubmit={onSubmit} noValidate className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row sm:gap-0">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="Your email address"
              aria-invalid={status === "error"}
              aria-describedby="newsletter-status"
              className="h-14 flex-1 border border-gold/40 bg-ink/60 px-5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none sm:border-r-0"
            />
            <button type="submit" className="btn-gold h-14 !px-8">
              Subscribe <ArrowIcon width={16} height={16} />
            </button>
          </form>
          <p id="newsletter-status" role="status" className="mt-4 min-h-[20px] text-xs tracking-wide">
            {status === "error" && <span className="text-gold-light">Please enter a valid email address.</span>}
            {status === "done" && <span className="text-gold">Welcome to the circle — check your inbox for 10% off.</span>}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
