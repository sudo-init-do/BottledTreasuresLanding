import Image from "next/image";
import Logo from "./Logo";
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, TikTokIcon, WhatsAppIcon } from "./Icons";
import { contact, SHOP_URL, shopLink } from "@/lib/data";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Fragrances", href: shopLink("/collections/all") },
      { label: "New Arrivals", href: shopLink("/collections/new-arrivals") },
      { label: "Best Sellers", href: shopLink("/collections/best-sellers") },
      { label: "Gift Sets", href: shopLink("/collections/gift-sets") },
      { label: "Wholesale", href: shopLink("/pages/wholesale") },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Our Story", href: "#story" },
      { label: "How to Order", href: "#how-to-order" },
      { label: "Journal", href: "#journal" },
      { label: "FAQ", href: "#faq" },
      { label: "Track Order", href: shopLink("/pages/track-order") },
    ],
  },
];

const socials = [
  { label: "Instagram", href: contact.socials.instagram, Icon: InstagramIcon },
  { label: "WhatsApp", href: contact.socials.whatsapp, Icon: WhatsAppIcon },
  { label: "TikTok", href: contact.socials.tiktok, Icon: TikTokIcon },
];

const legal = [
  { label: "Privacy Policy", href: shopLink("/policies/privacy-policy") },
  { label: "Terms of Service", href: shopLink("/policies/terms-of-service") },
  { label: "Refund Policy", href: shopLink("/policies/refund-policy") },
  { label: "Shipping Policy", href: shopLink("/policies/shipping-policy") },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink pt-20 sm:pt-24">
      <div className="container-site">
        <div className="grid gap-14 border-b border-gold/15 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-10">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
              A Bonny Island perfume house curating rare, authentic fragrances for those who leave a lasting impression.
            </p>
            <Image
              src="/brand/tagline.png"
              alt="As long as it smells great"
              width={1365}
              height={177}
              className="mt-6 h-auto w-64"
            />
            <ul className="mt-8 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center border border-gold/30 text-gold transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <Icon width={18} height={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow">{col.title}</h3>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="link-luxe text-sm text-cream/70 transition-colors hover:text-cream">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="eyebrow">Visit &amp; Contact</h3>
            <address className="mt-6 space-y-4 text-sm not-italic text-cream/70">
              <p className="flex gap-3">
                <PinIcon width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                {contact.address}
              </p>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex gap-3 transition-colors hover:text-gold">
                <PhoneIcon width={18} height={18} className="shrink-0 text-gold" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex gap-3 transition-colors hover:text-gold">
                <MailIcon width={18} height={18} className="shrink-0 text-gold" />
                {contact.email}
              </a>
              <p className="pl-[30px] text-xs uppercase tracking-wider2 text-cream/45">{contact.hours}</p>
            </address>
            <a href={SHOP_URL} className="btn-gold mt-8">
              Visit the Shop
            </a>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden
          className="select-none overflow-hidden whitespace-nowrap py-8 text-center font-serif text-[13.5vw] leading-none text-transparent lg:text-[10.5vw]"
          style={{ WebkitTextStroke: "1px rgba(201,168,76,0.18)" }}
        >
          Bottled Treasures
        </p>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-gold/15 py-8 text-xs text-cream/50 lg:flex-row">
          <p>© {new Date().getFullYear()} Bottled Treasures. All rights reserved. Bonny Island, Rivers State, Nigeria.</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
