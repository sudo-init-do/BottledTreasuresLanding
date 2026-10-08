import Placeholder from "./Placeholder";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowIcon } from "./Icons";
import { families } from "@/lib/data";

export default function FragranceFamilies() {
  return (
    <section id="families" className="relative border-y border-gold/10 bg-burgundy-900 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Shop by Fragrance Family"
          title={
            <>
              Find the Scent <em className="text-gold">That Speaks</em> for You
            </>
          }
          copy="Every fragrance belongs to a family. Start with the mood you want to wear and let us guide you to your signature."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {families.map((f, i) => (
            <Reveal key={f.name} delay={i * 140}>
              <a
                href={f.href}
                className="group relative block h-full border border-gold/20 bg-ink transition-all duration-700 ease-luxe hover:-translate-y-3 hover:border-gold/70 hover:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.95)]"
              >
                <Placeholder
                  shape={f.shape}
                  tone={f.tone}
                  className="aspect-[4/5] md:aspect-[3/4]"
                  image={f.image}
                  alt={`${f.name} fragrance notes`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  shade={30}
                >
                  <span
                    aria-hidden
                    className="absolute left-6 top-6 font-serif text-6xl italic leading-none text-gold/25 transition-colors duration-700 group-hover:text-gold/50 sm:left-8 sm:top-8"
                  >
                    0{i + 1}
                  </span>
                  <span className="absolute right-6 top-7 text-[10px] uppercase tracking-luxe text-cream/50 sm:right-8 sm:top-9">
                    {f.count} Scents
                  </span>
                </Placeholder>
                <div className="relative border-t border-gold/20 px-6 py-7 sm:px-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold/80">{f.tagline}</p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <h3 className="font-serif text-4xl text-gold sm:text-5xl">{f.name}</h3>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40 text-gold transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <ArrowIcon width={16} height={16} className="-rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-cream/60">{f.copy}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
