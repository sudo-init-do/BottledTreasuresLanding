"use client";

import { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";
import { collections, shopLink } from "@/lib/data";

export default function FeaturedCollections() {
  const [active, setActive] = useState(collections[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = collections.find((c) => c.id === active) ?? collections[0];

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + collections.length) % collections.length;
    setActive(collections[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="collections" className="relative scroll-mt-20 bg-ink py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-gold/70" />
            Curated For You
            <span className="h-px w-8 bg-gold/70" />
          </p>
          <h2 className="section-title mt-5">
            Discover Your Most <em className="text-gold">WANTED</em> Collections
          </h2>
        </Reveal>

        <Reveal delay={150} className="mt-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Collections"
            className="no-scrollbar flex max-w-full gap-6 overflow-x-auto border-b border-gold/15 sm:gap-12"
          >
            {collections.map((c, i) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${c.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`relative shrink-0 whitespace-nowrap pb-4 font-serif text-xl transition-colors duration-300 sm:text-2xl ${
                    selected ? "text-gold" : "text-cream/50 hover:text-cream"
                  }`}
                >
                  {c.label}
                  <span
                    className={`absolute -bottom-px left-0 h-px w-full origin-center bg-gold transition-transform duration-500 ease-luxe ${
                      selected ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          key={current.id}
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="mt-14 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        >
          {current.products.map((p, i) => (
            <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 90}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <a href={shopLink("/collections/all")} className="btn-outline">
            View All Fragrances <ArrowIcon width={16} height={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
