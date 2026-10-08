export const SHOP_URL = "/shop";

/** Turns the old storefront-style paths used around the site into this site's own pages. */
export const shopLink = (path = "") => {
  if (!path) return SHOP_URL;
  if (path.startsWith("/products/")) return `/shop/${path.slice("/products/".length)}`;
  if (path.startsWith("/collections/")) {
    const c = path.slice("/collections/".length);
    const map: Record<string, string> = { all: "", "new-arrivals": "new", "best-sellers": "best", "gift-sets": "", "home-fragrance": "home" };
    const f = c in map ? map[c] : c;
    return f ? `/shop?f=${f}` : SHOP_URL;
  }
  if (path === "/cart") return "/cart";
  if (path === "/account" || path === "/pages/track-order") return "/track";
  if (path === "/search") return "/shop";
  if (path.startsWith("/blogs")) return "/#journal";
  if (path === "/pages/about") return "/#story";
  return "/#faq";
};

export { formatNaira } from "./types";

export type BottleShape = "classic" | "tall" | "round" | "square";

export const signatureCollections = [
  {
    eyebrow: "Signature Collection",
    name: "The Noir Collection",
    copy: "Our darkest, most decadent fragrances. Smoked oud, leather and cacao, built for evenings that run late. Each one opens bold and settles into something you can't stop leaning in for.",
    image: "/photos/collections/noir.jpg",
    href: shopLink("/collections/noir"),
  },
  {
    eyebrow: "Signature Collection",
    name: "The Velvet Collection",
    copy: "Rose, jasmine and tuberose with a dark heart. Romantic florals given weight with amber and musk, so they last from the first meeting to the last dance.",
    image: "/photos/collections/velvet.jpg",
    href: shopLink("/collections/velvet"),
  },
  {
    eyebrow: "Signature Collection",
    name: "The Lagos Collection",
    copy: "Inspired by the city that raised us. Warm tobacco, golden citrus and sandalwood. Bright by day, smouldering by night, and made to survive the heat.",
    image: "/photos/collections/lagos.jpg",
    href: shopLink("/collections/lagos"),
  },
];

/** Placeholder house names — replace with the brands Bottled Treasures actually stocks. */
export const trendingHouses = ["Maison Ambre", "Atelier Noir", "Casa d'Oud", "Rose & Ivory", "Oro Parfums", "Saffron House"];

export const heroSlides = [
  {
    eyebrow: "The Noir Collection",
    title: "Bottled Treasures,",
    accent: "Worn Like Gold",
    copy: "Rare ouds, smoked amber and velvet florals — hand-picked in Lagos for those who leave a trail.",
    cta: "Shop the Collection",
    href: shopLink("/collections/all"),
  },
  {
    eyebrow: "New Season Arrivals",
    title: "Scent Is the",
    accent: "Signature",
    copy: "Discover this season's most wanted fragrances — bold, long-lasting and unmistakably yours.",
    cta: "Discover New Arrivals",
    href: shopLink("/collections/new-arrivals"),
  },
  {
    eyebrow: "As Long As It Smells Great",
    title: "Luxury That",
    accent: "Lingers",
    copy: "Gift sets, travel sizes and wholesale for resellers — delivered across Nigeria.",
    cta: "Explore Gift Sets",
    href: shopLink("/collections/gift-sets"),
  },
];

export const families = [
  {
    name: "Woody",
    tagline: "Oud · Sandalwood · Cedar",
    copy: "Deep, warm and grounded. The scent of polished wood and quiet confidence.",
    href: shopLink("/collections/woody"),
    image: "/photos/families/woody.jpg",
    shape: "square" as BottleShape,
    tone: "ink" as const,
    count: 24,
  },
  {
    name: "Floral",
    tagline: "Rose · Jasmine · Tuberose",
    copy: "Lush petals with a dark heart. Romantic, opulent, unforgettable.",
    href: shopLink("/collections/floral"),
    image: "/photos/families/floral.jpg",
    shape: "round" as BottleShape,
    tone: "burgundy" as const,
    count: 18,
  },
  {
    name: "Spicy",
    tagline: "Saffron · Clove · Pink Pepper",
    copy: "Heat and intrigue. Fragrances that announce you before you speak.",
    href: shopLink("/collections/spicy"),
    image: "/photos/families/spicy.jpg",
    shape: "tall" as BottleShape,
    tone: "ink" as const,
    count: 15,
  },
];

export const stats = [
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 120, suffix: "+", label: "Curated Fragrances" },
  { value: 36, suffix: "", label: "States Delivered" },
];

export const orderSteps = [
  {
    title: "Browse & Choose",
    copy: "Explore our collections online and add your favourite fragrances to your cart. Need help? Our scent consultants are a WhatsApp message away.",
  },
  {
    title: "Pay & Upload Proof",
    copy: "Pay via bank transfer to the account shown at checkout, then upload your proof of payment. We confirm every order within hours.",
  },
  {
    title: "Pickup or Dispatch",
    copy: "Collect from our Lagos studio or have it dispatched to your door — same-day within Lagos, 2–5 working days nationwide.",
  },
];

export const posts = [
  {
    date: "2026-09-24",
    category: "Scent Guide",
    title: "How to Make Your Perfume Last All Day in Lagos Heat",
    excerpt:
      "Pulse points, layering and the one mistake almost everyone makes — our guide to fragrance that survives the humidity.",
    href: shopLink("/blogs/journal/make-perfume-last"),
    image: "/photos/journal/perfume-last.jpg",
    shape: "classic" as BottleShape,
    tone: "burgundy" as const,
  },
  {
    date: "2026-09-10",
    category: "Behind the Bottle",
    title: "Oud: The Liquid Gold Behind Our Bestsellers",
    excerpt:
      "From agarwood forests to your wrist — the story of the world's most precious fragrance ingredient.",
    href: shopLink("/blogs/journal/oud-liquid-gold"),
    image: "/photos/journal/oud.jpg",
    shape: "square" as BottleShape,
    tone: "ink" as const,
  },
  {
    date: "2026-08-28",
    category: "Gifting",
    title: "The Art of Gifting a Signature Scent",
    excerpt:
      "Choosing a fragrance for someone else is intimate. Here's how to get it right — every single time.",
    href: shopLink("/blogs/journal/gifting-signature-scent"),
    image: "/photos/journal/gifting.jpg",
    shape: "round" as BottleShape,
    tone: "burgundy" as const,
  },
];

export const faqs = [
  {
    q: "Are your fragrances 100% authentic?",
    a: "Absolutely. Every bottle at Bottled Treasures is sourced directly from authorised distributors and trusted perfume houses. We stand behind the authenticity of everything we sell — as long as it smells great, it's on our shelves.",
  },
  {
    q: "How do I place an order?",
    a: "Tap Shop, add your favourites to the cart and check out. Pay via bank transfer to the account shown, then upload your proof of payment. You'll receive a confirmation on WhatsApp or email once verified.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders within Lagos are dispatched same-day or next-day. Nationwide deliveries arrive within 2–5 working days. You can also choose free pickup from our Lagos studio.",
  },
  {
    q: "Do you offer wholesale or reseller pricing?",
    a: "Yes. We supply boutiques, gift businesses and independent resellers across Nigeria. Minimum order quantities apply — reach out on WhatsApp or email wholesale@bottledtreasures.ng for our wholesale catalogue.",
  },
  {
    q: "Do you offer samples or testers?",
    a: "Yes. Most fragrances are available as 2ml and 10ml decants, so you can live with a scent before committing to a full bottle. You can also visit our Lekki studio to test in person.",
  },
  {
    q: "Can I buy a gift card?",
    a: "Digital gift cards are available from ₦10,000 to ₦500,000 and are delivered by email or WhatsApp. They never expire and can be used on anything in the shop.",
  },
  {
    q: "Are there any promotions or discounts?",
    a: "Join our newsletter for 10% off your first order and early access to private sales. We also run seasonal offers around Valentine's, Eid, Mother's Day and the festive season.",
  },
  {
    q: "Can I return or exchange a fragrance?",
    a: "For hygiene reasons, opened fragrances cannot be returned. Unopened items in their original seal may be exchanged within 7 days of delivery. If anything arrives damaged, contact us within 24 hours and we'll make it right.",
  },
];

export const contact = {
  phone: "+234 800 000 0000",
  email: "hello@bottledtreasures.ng",
  address: "Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  hours: "Mon – Sat · 9am – 7pm",
  socials: {
    instagram: "https://instagram.com/bottledtreasures",
    whatsapp: "https://wa.me/2348000000000",
    tiktok: "https://tiktok.com/@bottledtreasures",
  },
};
