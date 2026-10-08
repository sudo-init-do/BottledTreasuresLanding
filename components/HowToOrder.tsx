import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { orderSteps, SHOP_URL } from "@/lib/data";

const stepIcons = [
  // Browse
  <svg key="b" viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="8" y="10" width="32" height="28" />
    <path d="M8 18h32M14 26h8M14 31h14" />
    <circle cx="33" cy="29" r="4" />
    <path d="m36 32 4 4" />
  </svg>,
  // Pay & upload
  <svg key="p" viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="6" y="12" width="28" height="20" />
    <path d="M6 18h28M11 26h7" />
    <path d="M38 40V24M32 30l6-6 6 6" />
  </svg>,
  // Pickup / dispatch
  <svg key="d" viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M4 14h24v18H4zM28 20h9l7 7v5H28z" />
    <circle cx="12" cy="35" r="3.5" />
    <circle cx="36" cy="35" r="3.5" />
  </svg>,
];

export default function HowToOrder() {
  return (
    <section id="how-to-order" className="relative scroll-mt-20 border-y border-gold/10 bg-burgundy py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="How to Order"
          title={
            <>
              Three Steps to Your <em className="text-gold">Signature</em>
            </>
          }
          copy="Ordering from Bottled Treasures is simple, secure and personal — with a real person confirming every order."
        />

        <ol className="relative mt-16 grid gap-6 md:grid-cols-3 md:gap-0">
          {/* connecting line */}
          <span aria-hidden className="absolute left-[16.66%] right-[16.66%] top-[52px] hidden h-px bg-gold/30 md:block" />
          {orderSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 160} className="relative md:px-6 lg:px-10">
              <div className="group h-full border border-gold/20 bg-ink/40 p-8 text-center transition-colors duration-500 hover:border-gold/60 md:border-0 md:bg-transparent md:p-0">
                <div className="relative mx-auto flex h-[104px] w-[104px] items-center justify-center border border-gold/50 bg-burgundy text-gold transition-all duration-500 ease-luxe group-hover:bg-gold group-hover:text-ink">
                  {stepIcons[i]}
                  <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center bg-gold font-serif text-lg text-ink">
                    {i + 1}
                  </span>
                </div>
                <p className="mt-8 text-[10px] font-medium uppercase tracking-luxe text-gold">Step 0{i + 1}</p>
                <h3 className="mt-3 font-serif text-3xl text-cream">{step.title}</h3>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-cream/70">{step.copy}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 text-center">
          <a href={SHOP_URL} className="btn-gold">
            Start Your Order
          </a>
        </Reveal>
      </div>
    </section>
  );
}
