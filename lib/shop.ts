import "server-only";
import { currentTier } from "./customers";
import { readDb } from "./db";
import type { Product, ShopProduct, Tier } from "./types";

export const FILTERS: { id: string; label: string; test: (p: ShopProduct) => boolean }[] = [
  { id: "all", label: "All", test: (p) => !p.tags.includes("home") },
  { id: "new", label: "New Arrivals", test: (p) => p.tags.includes("new") },
  { id: "best", label: "Best Sellers", test: (p) => p.tags.includes("best") },
  { id: "under-50k", label: "Under ₦50,000", test: (p) => p.price < 50000 && !p.tags.includes("home") },
  { id: "him", label: "For Him", test: (p) => p.tags.includes("him") },
  { id: "her", label: "For Her", test: (p) => p.tags.includes("her") },
  { id: "woody", label: "Woody", test: (p) => p.tags.includes("woody") },
  { id: "floral", label: "Floral", test: (p) => p.tags.includes("floral") },
  { id: "spicy", label: "Spicy", test: (p) => p.tags.includes("spicy") },
  { id: "noir", label: "Noir", test: (p) => p.tags.includes("noir") },
  { id: "velvet", label: "Velvet", test: (p) => p.tags.includes("velvet") },
  { id: "bonny", label: "Bonny", test: (p) => p.tags.includes("bonny") },
  { id: "home", label: "Home Fragrance", test: (p) => p.tags.includes("home") },
];

const newestFirst = (a: Product, b: Product) => b.createdAt.localeCompare(a.createdAt);

/**
 * Prices a product for a tier. Shop pages pass products to client components, so the wholesale
 * price is always dropped from the object and only ever appears as `price` for wholesale customers.
 */
export function priceFor({ wholesalePrice, ...p }: Product, tier: Tier): ShopProduct {
  if (tier === "wholesale" && wholesalePrice) return { ...p, price: wholesalePrice, compareAt: undefined, retailPrice: p.price };
  return p;
}

/** Every product with all fields, for the dashboard. */
export async function getInventory() {
  return (await readDb()).products.slice().sort(newestFirst);
}

/** Products priced for the current visitor. */
export async function getProducts() {
  const [products, tier] = await Promise.all([getInventory(), currentTier()]);
  return products.map((p) => priceFor(p, tier));
}

export async function getProduct(slug: string) {
  const [{ products }, tier] = await Promise.all([readDb(), currentTier()]);
  const p = products.find((x) => x.slug === slug);
  return p && priceFor(p, tier);
}

/** Current price of every product for this visitor, keyed by slug. The cart and checkout use it instead of prices saved in the browser. */
export async function getPriceList(): Promise<Record<string, number>> {
  return Object.fromEntries((await getProducts()).map((p) => [p.slug, p.price]));
}

export async function searchProducts(filter = "all", q = "") {
  const f = FILTERS.find((x) => x.id === filter) ?? FILTERS[0];
  const needle = q.trim().toLowerCase();
  return (await getProducts()).filter(
    (p) =>
      (needle ? true : f.test(p)) &&
      (!needle || [p.name, ...p.notes, p.size].join(" ").toLowerCase().includes(needle)),
  );
}

/** Tabs for the homepage "Most WANTED" section. */
export async function homeCollections() {
  const products = await getProducts();
  return ["new", "best", "under-50k", "him", "her"].map((id) => {
    const f = FILTERS.find((x) => x.id === id)!;
    return { id, label: id === "him" ? "Gifts for Him" : id === "her" ? "Gifts for Her" : f.label, products: products.filter(f.test).slice(0, 8) };
  });
}

export async function homeFragrances() {
  return (await getProducts()).filter((p) => p.tags.includes("home")).slice(0, 5);
}
