"use client";

import Placeholder from "./Placeholder";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useCart } from "./CartContext";
import { ArrowIcon, PlusIcon } from "./Icons";
import Link from "next/link";
import { formatNaira, type Product } from "@/lib/types";

export default function HomeFragrance({ items }: { items: Product[] }) {
  const { addItem } = useCart();
  return (
    <section id="home-fragrance" className="border-y border-gold/10 bg-ink-800 py-24 sm:py-28">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Home Fragrance"
            title={
              <>
                Scent Your <em className="text-gold">Space</em>
              </>
            }
            copy="Diffusers, candles and room sprays in our signature accords, so your home smells as good as you do."
          />
          <Reveal>
            <a
              href="/shop?f=home"
              className="link-luxe inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-wider2 text-gold"
            >
              View All <ArrowIcon width={16} height={16} />
            </a>
          </Reveal>
        </div>

        <ul className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
          {items.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={i * 90} className="w-[68%] shrink-0 snap-start min-[480px]:w-[42%] sm:w-[34%] lg:w-auto">
              <div className="group">
                <Link href={`/shop/${item.slug}`} className="block">
                  <Placeholder
                    className="aspect-square border border-gold/15 transition-colors duration-500 group-hover:border-gold/50"
                    image={item.image}
                    alt={item.name}
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 34vw, 68vw"
                  />
                </Link>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl leading-snug text-cream">
                      <Link href={`/shop/${item.slug}`} className="transition-colors hover:text-gold">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-cream/45">{item.size}</p>
                    <p className="mt-2 font-serif text-lg text-gold">{formatNaira(item.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem({ slug: item.slug, name: item.name, price: item.price, image: item.image })}
                    disabled={!item.inStock}
                    aria-label={`Add ${item.name} to cart`}
                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-gold/40 text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
                  >
                    <PlusIcon width={16} height={16} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
