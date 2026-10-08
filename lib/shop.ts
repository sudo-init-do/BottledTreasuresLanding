import "server-only";
import { readDb } from "./db";
import type { Product } from "./types";

export const FILTERS: { id: string; label: string; test: (p: Product) => boolean }[] = [
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
  { id: "lagos", label: "Lagos", test: (p) => p.tags.includes("lagos") },
  { id: "home", label: "Home Fragrance", test: (p) => p.tags.includes("home") },
];

const newestFirst = (a: Product, b: Product) => b.createdAt.localeCompare(a.createdAt);

export async function getProducts() {
  return (await readDb()).products.slice().sort(newestFirst);
}

export async function getProduct(slug: string) {
  return (await readDb()).products.find((p) => p.slug === slug);
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
