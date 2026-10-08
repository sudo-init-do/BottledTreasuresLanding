import Image from "next/image";
import CountUp from "./CountUp";
import Placeholder from "./Placeholder";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";
import { shopLink, stats } from "@/lib/data";

export default function BrandStory() {
  return (
    <section id="story" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 sm:py-32">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-8 top-10 select-none font-serif text-[22vw] italic leading-none text-transparent lg:text-[16vw]"
        style={{ WebkitTextStroke: "1px rgba(201,168,76,0.07)" }}
      >
        Treasure
      </span>

      <div className="container-site relative grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal variant="left">
            <p className="eyebrow flex items-center gap-4">
              <span className="h-px w-8 bg-gold/70" />
              Our Story
            </p>
            <h2 className="section-title mt-5">
              Born in Lagos.
              <br />
              <em className="text-gold">Bottled</em> for the World.
            </h2>
          </Reveal>
          <Reveal variant="left" delay={150} className="mt-8 space-y-5 text-base leading-relaxed text-cream/70 sm:text-[17px]">
            <p>
              Bottled Treasures began with a simple belief: a great fragrance is the most personal luxury you
              can own. What started as a small collection shared among friends in Lagos has grown into a house
              trusted by thousands of fragrance lovers across Nigeria.
            </p>
            <p>
              We travel the world&apos;s perfume houses so you don&apos;t have to — seeking out rare ouds, opulent
              florals and spiced signatures that last from morning meetings to midnight. Every bottle is
              authentic, every scent is tested, and every order is packed by hand.
            </p>
            <Image
              src="/brand/tagline.png"
              alt="As long as it smells great"
              width={1365}
              height={177}
              className="!mt-8 h-auto w-full max-w-sm"
            />
          </Reveal>
          <Reveal variant="left" delay={300} className="mt-10">
            <a href={shopLink("/pages/about")} className="btn-outline">
              Read Our Story <ArrowIcon width={16} height={16} />
            </a>
          </Reveal>
        </div>

        <Reveal variant="right" className="relative">
          <div className="relative mx-auto max-w-lg lg:ml-auto">
            <div aria-hidden className="absolute -right-4 -top-4 h-full w-full border border-gold/30 sm:-right-6 sm:-top-6" />
            <Placeholder
              tone="burgundy"
              className="relative aspect-[4/5]"
              image="/images/story/story.jpg"
              alt="A selection of Bottled Treasures fragrances in our Lagos studio"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute -bottom-8 -left-4 border border-gold/40 bg-ink px-6 py-5 sm:-left-10 sm:px-8 sm:py-6">
              <p className="font-serif text-4xl text-gold sm:text-5xl">100%</p>
              <p className="mt-1 text-[10px] uppercase tracking-luxe text-cream/60">Authentic Guaranteed</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-site relative mt-24 sm:mt-32">
        <div className="grid grid-cols-1 border-y border-gold/20 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 120}
              className={`px-6 py-10 text-center sm:py-12 ${i > 0 ? "border-t border-gold/20 sm:border-l sm:border-t-0" : ""}`}
            >
              <p className="font-serif text-5xl text-gold sm:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-luxe text-cream/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
