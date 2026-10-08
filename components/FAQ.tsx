"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { PlusIcon, WhatsAppIcon } from "./Icons";
import { contact, faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-gold/10 bg-ink-800 py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <div>
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={
              <>
                Questions, <em className="text-gold">Answered</em>
              </>
            }
            copy="Everything you need to know about our fragrances, ordering, delivery and wholesale. Still curious? We're one message away."
          />
          <Reveal delay={200} className="mt-10">
            <a href={contact.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <WhatsAppIcon width={16} height={16} /> Chat on WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <ul className="border-t border-gold/20">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-b border-gold/20">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="text-[10px] font-medium tracking-luxe text-gold/70">0{i + 1}</span>
                        <span
                          className={`font-serif text-xl transition-colors duration-300 sm:text-2xl ${
                            isOpen ? "text-gold" : "text-cream group-hover:text-gold"
                          }`}
                        >
                          {f.q}
                        </span>
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-500 ease-luxe ${
                          isOpen ? "rotate-45 border-gold bg-gold text-ink" : "border-gold/40 text-gold"
                        }`}
                      >
                        <PlusIcon width={16} height={16} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-luxe ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pl-9 pr-14 text-[15px] leading-relaxed text-cream/65 sm:pl-11">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
