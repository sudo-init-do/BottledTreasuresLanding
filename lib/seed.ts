import type { Database, Product, Tag } from "./types";

type Seed = Omit<Product, "id" | "image" | "stock" | "createdAt" | "description"> & { image?: string; description?: string };

// Starting stock, in the same order as the products below: a mix of low, medium and healthy.
const STARTING_STOCK = [12, 24, 3, 8, 30, 15, 6, 40, 18, 4, 22, 9, 10, 25, 50, 2, 7];

const perfume = (p: Seed): Seed => p;

const seeds: Seed[] = [
  perfume({ slug: "oud-noir-royale", name: "Oud Noir Royale", notes: ["Oud", "Saffron", "Leather"], price: 85000, size: "100ml Eau de Parfum", badge: "New", tags: ["new", "him", "woody", "noir"] }),
  perfume({ slug: "velvet-rose-ember", name: "Velvet Rose Ember", notes: ["Damask Rose", "Amber", "Musk"], price: 62000, size: "75ml Eau de Parfum", badge: "New", tags: ["new", "best", "her", "floral", "velvet"] }),
  perfume({ slug: "ruby-oud", name: "Ruby Oud", notes: ["Raspberry", "Oud", "Rose"], price: 110000, size: "100ml Extrait de Parfum", badge: "Limited", tags: ["new", "her", "floral", "velvet"] }),
  perfume({ slug: "ivory-iris", name: "Ivory Iris", notes: ["Iris", "Violet", "Suede"], price: 67000, size: "100ml Eau de Parfum", tags: ["new", "her", "floral", "velvet"] }),
  perfume({ slug: "golden-sandalwood", name: "Golden Sandalwood", notes: ["Sandalwood", "Cedar", "Vetiver"], price: 72000, size: "100ml Eau de Parfum", tags: ["new", "best", "him", "her", "woody", "bonny"] }),
  perfume({ slug: "midnight-jasmine", name: "Midnight Jasmine", notes: ["Jasmine", "Tuberose", "Neroli"], price: 44000, size: "50ml Eau de Parfum", tags: ["new", "best", "her", "floral", "velvet"] }),
  perfume({ slug: "cocoa-and-oud", name: "Cocoa & Oud", notes: ["Cacao", "Oud", "Tonka"], price: 49000, size: "75ml Eau de Parfum", tags: ["new", "him", "woody", "noir"] }),
  perfume({ slug: "citrus-crown", name: "Citrus Crown", notes: ["Bergamot", "Neroli", "Vetiver"], price: 32500, size: "50ml Eau de Toilette", badge: "Value", tags: ["new", "him", "her", "bonny"] }),
  perfume({ slug: "bonny-nights", name: "Bonny Nights", notes: ["Tobacco", "Vanilla", "Cardamom"], price: 48500, compareAt: 55000, size: "100ml Eau de Parfum", badge: "Bestseller", tags: ["best", "him", "spicy", "bonny"] }),
  perfume({ slug: "amber-sultan", name: "Amber Sultan", notes: ["Amber", "Benzoin", "Patchouli"], price: 95000, size: "100ml Extrait de Parfum", badge: "Bestseller", tags: ["best", "him", "spicy", "noir"] }),
  perfume({ slug: "spiced-treasure", name: "Spiced Treasure", notes: ["Pink Pepper", "Clove", "Oud"], price: 58000, size: "100ml Eau de Parfum", badge: "Bestseller", tags: ["best", "him", "spicy", "noir"] }),
  perfume({ slug: "sahara-white-musk", name: "Sahara White Musk", notes: ["White Musk", "Iris", "Cashmere"], price: 38000, compareAt: 42000, size: "50ml Eau de Parfum", tags: ["best", "her", "floral"] }),
  { slug: "oud-ember-reed-diffuser", name: "Oud Ember Reed Diffuser", notes: ["Oud", "Amber"], price: 28000, size: "200ml", image: "/photos/home/reed-diffuser.jpg", tags: ["home"] },
  { slug: "velvet-rose-candle", name: "Velvet Rose Candle", notes: ["Rose", "Musk"], price: 22500, size: "220g", image: "/photos/home/candle.jpg", tags: ["home"] },
  { slug: "golden-hour-tealight-set", name: "Golden Hour Tealight Set", notes: ["Vanilla", "Amber"], price: 15000, size: "12 tealights", image: "/photos/home/tealight-set.jpg", tags: ["home"] },
  { slug: "aroma-mist-diffuser", name: "Aroma Mist Diffuser", notes: ["Electric", "Ultrasonic"], price: 35000, size: "300ml", image: "/photos/home/mist-diffuser.jpg", tags: ["home"] },
  { slug: "signature-diffuser-trio", name: "Signature Diffuser Trio", notes: ["Oud", "Rose", "Sandalwood"], price: 42000, size: "3 × 100ml", image: "/photos/home/diffuser-set.jpg", tags: ["home"] },
];

export function seedDatabase(): Database {
  const now = Date.now();
  return {
    products: seeds.map((s, i) => ({
      ...s,
      id: `p${i + 1}`,
      tags: s.tags as Tag[],
      image: s.image ?? `/photos/products/${s.slug}.jpg`,
      description:
        s.description ??
        `${s.name} opens with ${s.notes.map((n) => n.toLowerCase()).join(", ")}. Hand-picked on Bonny Island, 100% authentic and made to last.`,
      stock: STARTING_STOCK[i] ?? 10,
      // newest first by default
      createdAt: new Date(now - i * 60_000).toISOString(),
    })),
    orders: [],
    settings: {
      bankName: "Your Bank",
      accountName: "Bottled Treasures",
      accountNumber: "0000000000",
      whatsapp: "+234 800 000 0000",
    },
  };
}
