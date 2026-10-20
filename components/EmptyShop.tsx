import Reveal from "./Reveal";
import { whatsappLink } from "@/lib/types";

/** Shown on the homepage in place of the product tabs while there are no products in the shop. */
export default function EmptyShop({ whatsapp }: { whatsapp: string }) {
  return (
    <section id="collections" className="relative scroll-mt-20 bg-ink py-24 sm:py-32">
      <Reveal className="container-site mx-auto max-w-2xl text-center">
        <p className="eyebrow flex items-center justify-center gap-4">
          <span className="h-px w-8 bg-gold/70" />
          The Shop
          <span className="h-px w-8 bg-gold/70" />
        </p>
        <h2 className="section-title mt-5">
          New Fragrances Are <em className="text-gold">On the Way</em>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-cream/70">
          Our shelves are being restocked right now. Check back soon, or message us on WhatsApp and we&apos;ll tell you what&apos;s coming.
        </p>
        <a href={whatsappLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-gold mt-10">
          Message us on WhatsApp
        </a>
      </Reveal>
    </section>
  );
}
