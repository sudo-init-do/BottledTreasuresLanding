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
};

const products: Record<string, Product> = {
  oudNoir: {
    id: "oud-noir",
    name: "Oud Noir Royale",
    notes: ["Oud", "Saffron", "Leather"],
    price: 85000,
    size: "100ml Eau de Parfum",
    badge: "New",
    shape: "square",
    tone: "ink",
    slug: "oud-noir-royale",
  },
  velvetRose: {
    id: "velvet-rose",
    name: "Velvet Rose Ember",
    notes: ["Damask Rose", "Amber", "Musk"],
    price: 62000,
    size: "75ml Eau de Parfum",
    badge: "New",
    shape: "round",
    tone: "burgundy",
    slug: "velvet-rose-ember",
  },
  lagosNights: {
    id: "lagos-nights",
    name: "Lagos Nights",
    notes: ["Tobacco", "Vanilla", "Cardamom"],
    price: 48500,
    compareAt: 55000,
    size: "100ml Eau de Parfum",
    badge: "Bestseller",
    shape: "tall",
    tone: "ink",
    slug: "lagos-nights",
  },
  goldenSandal: {
    id: "golden-sandal",
    name: "Golden Sandalwood",
    notes: ["Sandalwood", "Cedar", "Vetiver"],
    price: 72000,
    size: "100ml Eau de Parfum",
    shape: "classic",
    tone: "burgundy",
    slug: "golden-sandalwood",
  },
  amberSultan: {
    id: "amber-sultan",
    name: "Amber Sultan",
    notes: ["Amber", "Benzoin", "Patchouli"],
    price: 95000,
    size: "100ml Extrait de Parfum",
    badge: "Bestseller",
    shape: "square",
    tone: "burgundy",
    slug: "amber-sultan",
  },
  midnightJasmine: {
    id: "midnight-jasmine",
    name: "Midnight Jasmine",
    notes: ["Jasmine", "Tuberose", "Neroli"],
    price: 44000,
    size: "50ml Eau de Parfum",
    shape: "round",
    tone: "ink",
    slug: "midnight-jasmine",
  },
  spicedTreasure: {
    id: "spiced-treasure",
    name: "Spiced Treasure",
    notes: ["Pink Pepper", "Clove", "Oud"],
    price: 58000,
    size: "100ml Eau de Parfum",
    badge: "Bestseller",
    shape: "tall",
    tone: "ink",
    slug: "spiced-treasure",
  },
  saharaMusk: {
    id: "sahara-musk",
    name: "Sahara White Musk",
    notes: ["White Musk", "Iris", "Cashmere"],
    price: 38000,
    compareAt: 42000,
    size: "50ml Eau de Parfum",
    shape: "classic",
    tone: "burgundy",
    slug: "sahara-white-musk",
  },
  citrusCrown: {
    id: "citrus-crown",
    name: "Citrus Crown",
    notes: ["Bergamot", "Neroli", "Vetiver"],
    price: 32500,
    size: "50ml Eau de Toilette",
    badge: "Value",
    shape: "tall",
    tone: "ink",
    slug: "citrus-crown",
  },
  cocoaOud: {
    id: "cocoa-oud",
    name: "Cocoa & Oud",
    notes: ["Cacao", "Oud", "Tonka"],
    price: 49000,
    size: "75ml Eau de Parfum",
    shape: "square",
    tone: "burgundy",
    slug: "cocoa-and-oud",
  },
};

export type CollectionTab = {
  id: string;
  label: string;
  products: Product[];
};

export const collections: CollectionTab[] = [
  {
    id: "new",
    label: "New Arrivals",
    products: [
      products.oudNoir,
      products.velvetRose,
      products.goldenSandal,
      products.midnightJasmine,
    ],
  },
  {
    id: "best",
    label: "Best Sellers",
    products: [
      products.lagosNights,
      products.amberSultan,
      products.spicedTreasure,
      products.velvetRose,
    ],
  },
  {
    id: "under-50k",
    label: "Under ₦50,000",
    products: [
      products.lagosNights,
      products.midnightJasmine,
      products.saharaMusk,
      products.citrusCrown,
      products.cocoaOud,
    ].filter((p) => p.price < 50000).slice(0, 4),
  },
];

export const heroSlides = [
  {
    eyebrow: "The Noir Collection",
    title: "Bottled Treasures,",
    accent: "Worn Like Gold",
    copy: "Rare ouds, smoked amber and velvet florals — hand-picked in Lagos for those who leave a trail.",
    cta: "Shop the Collection",
    href: shopLink("/collections/all"),
    shape: "square" as BottleShape,
    tone: "burgundy" as const,
  },
  {
    eyebrow: "New Season Arrivals",
    title: "Scent Is the",
    accent: "Signature",
    copy: "Discover this season's most wanted fragrances — bold, long-lasting and unmistakably yours.",
    cta: "Discover New Arrivals",
    href: shopLink("/collections/new-arrivals"),
    shape: "round" as BottleShape,
    tone: "ink" as const,
  },
  {
    eyebrow: "As Long As It Smells Great",
    title: "Luxury That",
    accent: "Lingers",
    copy: "Gift sets, travel sizes and wholesale for resellers — delivered across Nigeria.",
    cta: "Explore Gift Sets",
    href: shopLink("/collections/gift-sets"),
    shape: "tall" as BottleShape,
    tone: "burgundy" as const,
  },
];

export const families = [
  {
    name: "Woody",
    tagline: "Oud · Sandalwood · Cedar",
    copy: "Deep, warm and grounded. The scent of polished wood and quiet confidence.",
    href: shopLink("/collections/woody"),
    shape: "square" as BottleShape,
    tone: "ink" as const,
    count: 24,
  },
  {
    name: "Floral",
    tagline: "Rose · Jasmine · Tuberose",
    copy: "Lush petals with a dark heart. Romantic, opulent, unforgettable.",
    href: shopLink("/collections/floral"),
    shape: "round" as BottleShape,
    tone: "burgundy" as const,
    count: 18,
  },
  {
    name: "Spicy",
    tagline: "Saffron · Clove · Pink Pepper",
    copy: "Heat and intrigue. Fragrances that announce you before you speak.",
    href: shopLink("/collections/spicy"),
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
