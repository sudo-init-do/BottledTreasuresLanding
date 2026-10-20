export const TAGS = [
  { id: "new", label: "New Arrivals" },
  { id: "best", label: "Best Sellers" },
  { id: "him", label: "For Him" },
  { id: "her", label: "For Her" },
  { id: "woody", label: "Woody" },
  { id: "floral", label: "Floral" },
  { id: "spicy", label: "Spicy" },
  { id: "noir", label: "Noir Collection" },
  { id: "velvet", label: "Velvet Collection" },
  { id: "bonny", label: "Bonny Collection" },
  { id: "home", label: "Home Fragrance" },
] as const;

export type Tag = (typeof TAGS)[number]["id"];

export type Product = {
  id: string;
  slug: string;
  name: string;
  notes: string[];
  description: string;
  price: number;
  compareAt?: number;
  /** Price for signed-in wholesale customers. Only sent to their browsers, never to guests or retail customers. */
  wholesalePrice?: number;
  size: string;
  badge?: string;
  image: string;
  tags: Tag[];
  /** Bottles on hand. 0 shows as sold out in the shop. */
  stock: number;
  createdAt: string;
};

export const DELIVERY = {
  pickup: { label: "Pickup from our Bonny Island studio", fee: 0 },
  island: { label: "Delivery on Bonny Island", fee: 3000 },
  nationwide: { label: "Delivery to the rest of Nigeria", fee: 6000 },
} as const;
export type DeliveryMethod = keyof typeof DELIVERY;

/** A sale the owner records by hand in the dashboard after a customer has paid (orders arrive on WhatsApp). */
export type Sale = {
  id: string;
  /** Day of the sale, YYYY-MM-DD. */
  date: string;
  /** Empty when the product has since been deleted or the sale was for something not in the shop. */
  productId: string;
  name: string;
  qty: number;
  /** Price per bottle, in Naira. */
  price: number;
  total: number;
  customer: string;
  note: string;
  /** True when recording the sale took the bottles off the stock count. */
  tookStock: boolean;
  createdAt: string;
};

export type Tier = "retail" | "wholesale";
export const TIERS: { id: Tier; label: string }[] = [
  { id: "wholesale", label: "Wholesale" },
  { id: "retail", label: "Retail" },
];

/** A customer account. The owner creates these in the dashboard; there is no public sign-up. */
export type Customer = {
  id: string;
  name: string;
  email: string;
  /** scrypt$salt$hash */
  passwordHash: string;
  tier: Tier;
  active: boolean;
  /** Bumped when the password changes or the account is disabled, which signs the customer out everywhere. */
  sessionVersion: number;
  createdAt: string;
};

/**
 * A product as the shop pages see it, priced for the current visitor.
 * `retailPrice` is only set when `price` is the wholesale price.
 */
export type ShopProduct = Omit<Product, "wholesalePrice"> & { retailPrice?: number };

export type Settings = {
  /** Checkout sends customers here with their order. */
  whatsapp: string;
};

export type Database = { products: Product[]; sales: Sale[]; customers: Customer[]; settings: Settings };

export type StockLevel = "low" | "medium" | "healthy";

/** Under 5 is low, 5–19 is medium, 20 or more is healthy. */
export const stockLevel = (n: number): StockLevel => (n < 5 ? "low" : n < 20 ? "medium" : "healthy");

/** A wa.me link for a number typed any way (0803…, +234 803…), with an optional prefilled message. */
export const whatsappLink = (number: string, text?: string) =>
  `https://wa.me/${number.replace(/\D/g, "").replace(/^0/, "234")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
