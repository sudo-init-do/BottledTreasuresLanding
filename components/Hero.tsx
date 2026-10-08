"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BottleArt from "./BottleArt";
import { ArrowIcon, ChevronIcon } from "./Icons";
import { heroSlides } from "@/lib/data";

const INTERVAL = 7000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const total = heroSlides.length;

  const go = useCallback((i: number) => setActive((i + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(active + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, go]);

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured fragrances"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {heroSlides.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={slide.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            aria-hidden={!isActive}
            className={`grain absolute inset-0 transition-opacity duration-[1400ms] ease-luxe ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            } ${slide.tone === "burgundy" ? "bg-burgundy-900" : "bg-ink-800"}`}
          >
            {/* Placeholder "photograph": slow-zooming stage with bottle art */}
            <div
              key={isActive ? `on-${active}` : "off"}
              className={`absolute inset-0 ${isActive ? "animate-slow-zoom" : ""}`}
            >
              <div
                aria-hidden
                className={`absolute right-[-10%] top-1/2 aspect-square w-[90vw] -translate-y-1/2 rounded-full blur-[120px] sm:w-[60vw] lg:right-[2%] lg:w-[46vw] ${
                  slide.tone === "burgundy" ? "bg-burgundy" : "bg-burgundy/60"
                }`}
              />
              {/* Concentric gold rings overlay */}
              <div aria-hidden className="absolute right-[-30%] top-1/2 aspect-square w-[110vw] -translate-y-1/2 sm:right-[-8%] sm:w-[70vw] lg:right-[4%] lg:w-[44vw]">
                <div className="absolute inset-0 rounded-full border border-gold/10" />
                <div className="absolute inset-[9%] rounded-full border border-gold/15" />
                <div className="absolute inset-[18%] animate-shimmer rounded-full border border-gold/25" />
              </div>
              <div className="absolute right-[-12%] top-1/2 h-[58%] -translate-y-[46%] opacity-30 sm:right-[4%] sm:opacity-50 lg:right-[13%] lg:h-[66%] lg:opacity-100">
                <BottleArt shape={slide.shape} className="h-full w-auto animate-float text-gold" />
              </div>
            </div>

            {/* Gold frame overlay */}
            <div aria-hidden className="pointer-events-none absolute inset-4 border border-gold/15 sm:inset-8" />

            {/* Oversized slide numeral */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[-4vw] right-6 select-none font-serif text-[30vw] leading-none text-transparent sm:right-12 lg:text-[18vw]"
              style={{ WebkitTextStroke: "1px rgba(201,168,76,0.12)" }}
            >
              0{i + 1}
            </span>

            {/* Copy */}
            <div className="container-site relative flex h-full items-center pt-24">
              <div className="max-w-2xl">
                <p
                  className={`eyebrow flex items-center gap-4 ${isActive ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: "200ms" }}
                >
                  <span className="h-px w-10 bg-gold" />
                  {slide.eyebrow}
                </p>
                <h1
                  className={`mt-6 font-serif text-[13vw] font-light leading-[0.95] text-cream sm:text-7xl lg:text-[96px] ${
                    isActive ? "animate-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: "350ms" }}
                >
                  {slide.title}
                  <br />
                  <em className="font-normal text-gold">{slide.accent}</em>
                </h1>
                <p
                  className={`mt-7 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg ${
                    isActive ? "animate-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: "500ms" }}
                >
                  {slide.copy}
                </p>
                <div
                  className={`mt-10 flex flex-wrap items-center gap-4 ${isActive ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: "650ms" }}
                >
                  <a href={slide.href} className="btn-gold" tabIndex={isActive ? 0 : -1}>
                    {slide.cta} <ArrowIcon width={16} height={16} />
                  </a>
                  <a href="#collections" className="btn-outline" tabIndex={isActive ? 0 : -1}>
                    View Bestsellers
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="container-site absolute inset-x-0 bottom-8 z-20 flex items-end justify-between sm:bottom-14">
        <div className="flex items-center gap-3 sm:gap-5">
          {heroSlides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className="group flex flex-col items-start gap-2 text-left"
            >
              <span
                className={`font-sans text-[10px] tracking-luxe transition-colors ${
                  i === active ? "text-gold" : "text-cream/40 group-hover:text-cream/70"
                }`}
              >
                0{i + 1}
              </span>
              <span className="relative block h-px w-12 bg-cream/20 sm:w-20">
                {i === active && (
                  <span
                    key={`${active}-${paused}`}
                    className={`absolute inset-0 origin-left bg-gold ${paused ? "" : "animate-progress"}`}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-ink sm:h-12 sm:w-12"
          >
            <ChevronIcon className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-ink sm:h-12 sm:w-12"
          >
            <ChevronIcon />
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="text-[9px] tracking-luxe text-cream/40">SCROLL</span>
        <span className="relative h-12 w-px overflow-hidden bg-cream/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scrollcue bg-gold" />
        </span>
      </div>
    </section>
  );
}
