import Placeholder from "./Placeholder";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowIcon } from "./Icons";
import { posts, shopLink } from "@/lib/data";

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

export default function Blog() {
  return (
    <section id="journal" className="bg-ink py-24 sm:py-32">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="The Journal"
            title={
              <>
                Latest from <em className="text-gold">Bottled Treasures</em>
              </>
            }
          />
          <Reveal>
            <a href={shopLink("/blogs/journal")} className="link-luxe inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-wider2 text-gold">
              View All Stories <ArrowIcon width={16} height={16} />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <Reveal as="article" key={post.title} delay={i * 140}>
              <a href={post.href} className="group block">
                <div className="relative overflow-hidden border border-gold/15 transition-colors duration-500 group-hover:border-gold/50">
                  <Placeholder
                    shape={post.shape}
                    tone={post.tone}
                    className="aspect-[16/11] transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
                    image={post.image}
                    alt=""
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <span className="absolute left-5 top-5 bg-ink/80 px-3 py-1.5 text-[9px] font-medium uppercase tracking-wider2 text-gold backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <time dateTime={post.date} className="mt-6 block text-[10px] font-medium uppercase tracking-luxe text-gold/80">
                  {fmt(post.date)}
                </time>
                <h3 className="mt-3 font-serif text-2xl leading-snug text-cream transition-colors duration-300 group-hover:text-gold sm:text-[26px]">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">{post.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-wider2 text-cream/80 transition-colors group-hover:text-gold">
                  Read More
                  <span className="h-px w-6 bg-current transition-all duration-500 ease-luxe group-hover:w-12" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
