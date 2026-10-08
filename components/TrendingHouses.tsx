import Reveal from "./Reveal";
import { shopLink, trendingHouses } from "@/lib/data";

export default function TrendingHouses() {
  return (
    <section id="houses" className="relative overflow-hidden bg-burgundy-900 py-24 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-4 border border-gold/10 sm:inset-8" />
      <div className="container-site relative text-center">
        <Reveal className="mx-auto max-w-2xl">
          <p className="eyebrow flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-gold/70" />
            Trending Houses
            <span className="h-px w-8 bg-gold/70" />
          </p>
          <h2 className="section-title mt-5">
            The Houses <em className="text-gold">Everyone</em> Is Wearing
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-cream/70">
            Alongside our own blends, we curate the most sought-after perfume houses from around the world. Find your
            signature among the best in luxury perfumery.
          </p>
          <a href={shopLink("/pages/brands")} className="btn-gold mt-9">
            Explore Brands
          </a>
        </Reveal>

        <Reveal delay={150} className="mt-16">
          <ul className="grid grid-cols-2 border-l border-t border-gold/15 sm:grid-cols-3 lg:grid-cols-6">
            {trendingHouses.map((house) => (
              <li key={house} className="border-b border-r border-gold/15">
                <a
                  href={shopLink(`/collections/${house.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)}
                  className="group flex h-24 items-center justify-center px-4 transition-colors duration-500 hover:bg-ink/40 sm:h-28"
                >
                  <span className="whitespace-nowrap font-serif text-lg uppercase tracking-[0.14em] text-cream/55 transition-colors duration-500 group-hover:text-gold xl:text-xl">
                    {house}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
