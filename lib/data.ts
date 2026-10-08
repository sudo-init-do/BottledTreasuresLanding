export const SHOP_URL = "https://shop.bottledtreasures.ng";

export const shopLink = (path = "") => `${SHOP_URL}${path}`;

export const formatNaira = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

export type BottleShape = "classic" | "tall" | "round" | "square";

export type Product = {
  id: string;
  name: string;
  notes: string[];
  price: number;
  compareAt?: number;
  size: string;
  badge?: string;
  shape: BottleShape;
  tone: "ink" | "burgundy";
  slug: string;
  image: string;
  for?: "him" | "her" | "unisex";
};

const product = (p: Omit<Product, "image">): Product => ({ ...p, image: `/images/products/${p.slug}.jpg` });

const products = {
  oudNoir: product({ id: "oud-noir", name: "Oud Noir Royale", notes: ["Oud", "Saffron", "Leather"], price: 85000, size: "100ml Eau de Parfum", badge: "New", shape: "square", tone: "ink", slug: "oud-noir-royale", for: "him" }),
  velvetRose: product({ id: "velvet-rose", name: "Velvet Rose Ember", notes: ["Damask Rose", "Amber", "Musk"], price: 62000, size: "75ml Eau de Parfum", badge: "New", shape: "round", tone: "burgundy", slug: "velvet-rose-ember", for: "her" }),
  lagosNights: product({ id: "lagos-nights", name: "Lagos Nights", notes: ["Tobacco", "Vanilla", "Cardamom"], price: 48500, compareAt: 55000, size: "100ml Eau de Parfum", badge: "Bestseller", shape: "tall", tone: "ink", slug: "lagos-nights", for: "him" }),
  goldenSandal: product({ id: "golden-sandal", name: "Golden Sandalwood", notes: ["Sandalwood", "Cedar", "Vetiver"], price: 72000, size: "100ml Eau de Parfum", shape: "classic", tone: "burgundy", slug: "golden-sandalwood", for: "unisex" }),
  amberSultan: product({ id: "amber-sultan", name: "Amber Sultan", notes: ["Amber", "Benzoin", "Patchouli"], price: 95000, size: "100ml Extrait de Parfum", badge: "Bestseller", shape: "square", tone: "burgundy", slug: "amber-sultan", for: "him" }),
  midnightJasmine: product({ id: "midnight-jasmine", name: "Midnight Jasmine", notes: ["Jasmine", "Tuberose", "Neroli"], price: 44000, size: "50ml Eau de Parfum", shape: "round", tone: "ink", slug: "midnight-jasmine", for: "her" }),
  spicedTreasure: product({ id: "spiced-treasure", name: "Spiced Treasure", notes: ["Pink Pepper", "Clove", "Oud"], price: 58000, size: "100ml Eau de Parfum", badge: "Bestseller", shape: "tall", tone: "ink", slug: "spiced-treasure", for: "him" }),
  saharaMusk: product({ id: "sahara-musk", name: "Sahara White Musk", notes: ["White Musk", "Iris", "Cashmere"], price: 38000, compareAt: 42000, size: "50ml Eau de Parfum", shape: "classic", tone: "burgundy", slug: "sahara-white-musk", for: "her" }),
  citrusCrown: product({ id: "citrus-crown", name: "Citrus Crown", notes: ["Bergamot", "Neroli", "Vetiver"], price: 32500, size: "50ml Eau de Toilette", badge: "Value", shape: "tall", tone: "ink", slug: "citrus-crown", for: "unisex" }),
  cocoaOud: product({ id: "cocoa-oud", name: "Cocoa & Oud", notes: ["Cacao", "Oud", "Tonka"], price: 49000, size: "75ml Eau de Parfum", shape: "square", tone: "burgundy", slug: "cocoa-and-oud", for: "him" }),
  rubyOud: product({ id: "ruby-oud", name: "Ruby Oud", notes: ["Raspberry", "Oud", "Rose"], price: 110000, size: "100ml Extrait de Parfum", badge: "Limited", shape: "square", tone: "burgundy", slug: "ruby-oud", for: "her" }),
  ivoryIris: product({ id: "ivory-iris", name: "Ivory Iris", notes: ["Iris", "Violet", "Suede"], price: 67000, size: "100ml Eau de Parfum", shape: "classic", tone: "ink", slug: "ivory-iris", for: "her" }),
};

const all = Object.values(products);

export type CollectionTab = {
  id: string;
  label: string;
  products: Product[];
};

export const collections: CollectionTab[] = [
  {
    id: "new",
    label: "New Arrivals",
    products: [products.oudNoir, products.velvetRose, products.rubyOud, products.ivoryIris, products.goldenSandal, products.midnightJasmine, products.cocoaOud, products.citrusCrown],
  },
  {
    id: "best",
    label: "Best Sellers",
    products: [products.lagosNights, products.amberSultan, products.spicedTreasure, products.velvetRose, products.oudNoir, products.saharaMusk, products.goldenSandal, products.midnightJasmine],
  },
  {
    id: "under-50k",
    label: "Under ₦50,000",
    products: all.filter((p) => p.price < 50000),
  },
  {
    id: "him",
    label: "Gifts for Him",
    products: all.filter((p) => p.for === "him" || p.for === "unisex").slice(0, 8),
  },
  {
    id: "her",
    label: "Gifts for Her",
    products: all.filter((p) => p.for === "her" || p.for === "unisex").slice(0, 8),
  },
];

export const signatureCollections = [
  {
    eyebrow: "Signature Collection",
    name: "The Noir Collection",
    copy: "Our darkest, most decadent fragrances. Smoked oud, leather and cacao, built for evenings that run late. Each one opens bold and settles into something you can't stop leaning in for.",
    image: "/images/collections/noir.jpg",
    href: shopLink("/collections/noir"),
  },
  {
    eyebrow: "Signature Collection",
    name: "The Velvet Collection",
    copy: "Rose, jasmine and tuberose with a dark heart. Romantic florals given weight with amber and musk, so they last from the first meeting to the last dance.",
    image: "/images/collections/velvet.jpg",
    href: shopLink("/collections/velvet"),
  },
  {
    eyebrow: "Signature Collection",
    name: "The Lagos Collection",
    copy: "Inspired by the city that raised us. Warm tobacco, golden citrus and sandalwood. Bright by day, smouldering by night, and made to survive the heat.",
    image: "/images/collections/lagos.jpg",
    href: shopLink("/collections/lagos"),
  },
];

export const homeFragrances = [
  { name: "Oud Ember Reed Diffuser", size: "200ml", price: 28000, image: "/images/home/reed-diffuser.jpg", slug: "oud-ember-reed-diffuser" },
  { name: "Velvet Rose Candle", size: "220g", price: 22500, image: "/images/home/candle.jpg", slug: "velvet-rose-candle" },
  { name: "Golden Hour Tealight Set", size: "12 tealights", price: 15000, image: "/images/home/tealight-set.jpg", slug: "golden-hour-tealight-set" },
  { name: "Aroma Mist Diffuser", size: "300ml", price: 35000, image: "/images/home/mist-diffuser.jpg", slug: "aroma-mist-diffuser" },
  { name: "Signature Diffuser Trio", size: "3 × 100ml", price: 42000, image: "/images/home/diffuser-set.jpg", slug: "signature-diffuser-trio" },
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
    image: "/images/families/woody.jpg",
    shape: "square" as BottleShape,
    tone: "ink" as const,
    count: 24,
  },
  {
    name: "Floral",
    tagline: "Rose · Jasmine · Tuberose",
    copy: "Lush petals with a dark heart. Romantic, opulent, unforgettable.",
    href: shopLink("/collections/floral"),
    image: "/images/families/floral.jpg",
    shape: "round" as BottleShape,
    tone: "burgundy" as const,
    count: 18,
  },
  {
    name: "Spicy",
    tagline: "Saffron · Clove · Pink Pepper",
    copy: "Heat and intrigue. Fragrances that announce you before you speak.",
    href: shopLink("/collections/spicy"),
    image: "/images/families/spicy.jpg",
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
    image: "/images/journal/perfume-last.jpg",
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
    image: "/images/journal/oud.jpg",
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
    image: "/images/journal/gifting.jpg",
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
    a: "Browse the shop at shop.bottledtreasures.ng, add items to your cart and check out. Pay via bank transfer to the account shown, then upload your proof of payment. You'll receive a confirmation on WhatsApp or email once verified.",
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
