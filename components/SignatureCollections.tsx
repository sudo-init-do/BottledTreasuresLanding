import Placeholder from "./Placeholder";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowIcon } from "./Icons";
import { signatureCollections } from "@/lib/data";

export default function SignatureCollections() {
  return (
    <section id="signature" className="bg-ink py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Featured Collections"
          title={
            <>
              Our <em className="text-gold">Signature</em> Houses
            </>
          }
          copy="Three worlds of scent, each composed around a mood. Find the one that feels like you."
        />

        <div className="mt-16 space-y-16 sm:space-y-24">
          {signatureCollections.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={c.name} className="grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20">
                <Reveal variant={flip ? "right" : "left"} className={flip ? "md:order-2" : ""}>
                  <a href={c.href} className="group relative block" aria-label={`Shop ${c.name}`}>
                    <div
                      aria-hidden
                      className={`absolute -top-3 h-full w-full border border-gold/25 transition-transform duration-700 ease-luxe group-hover:translate-x-0 group-hover:translate-y-0 sm:-top-5 ${
                        flip ? "-left-3 sm:-left-5" : "-right-3 sm:-right-5"
                      }`}
                    />
                    <Placeholder
                      className="relative aspect-[4/3]"
                      image={c.image}
                      alt={c.name}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </a>
                </Reveal>
                <Reveal variant={flip ? "left" : "right"} delay={120} className={flip ? "md:order-1" : ""}>
                  <p className="eyebrow flex items-center gap-4">
                    <span className="font-serif text-2xl italic leading-none tracking-normal text-gold/60">0{i + 1}</span>
                    <span className="h-px w-8 bg-gold/60" />
                    {c.eyebrow}
                  </p>
                  <h3 className="mt-5 font-serif text-4xl leading-tight text-cream sm:text-5xl">{c.name}</h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/70">{c.copy}</p>
                  <a href={c.href} className="btn-outline mt-9">
                    Read More <ArrowIcon width={16} height={16} />
                  </a>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
