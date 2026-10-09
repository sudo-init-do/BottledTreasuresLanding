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
  /** Trade price for bulk buyers. Owner-only: never sent to the shop pages. */
  wholesalePrice?: number;
  size: string;
  badge?: string;
  image: string;
  tags: Tag[];
  /** Bottles on hand. 0 shows as sold out in the shop. */
  stock: number;
  createdAt: string;
};

export type OrderItem = { slug: string; name: string; price: number; qty: number; image: string };

export const DELIVERY = {
  pickup: { label: "Pickup from our Bonny Island studio", fee: 0 },
  island: { label: "Delivery on Bonny Island", fee: 3000 },
  nationwide: { label: "Delivery to the rest of Nigeria", fee: 6000 },
} as const;
export type DeliveryMethod = keyof typeof DELIVERY;

export const ORDER_STATUSES = [
  { id: "pending", label: "Checking payment" },
  { id: "paid", label: "Paid" },
  { id: "dispatched", label: "Dispatched / Ready for pickup" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number]["id"];

export type Order = {
  id: string;
  code: string;
  createdAt: string;
  status: OrderStatus;
  customer: { name: string; phone: string; email: string; address: string; city: string; note: string };
  delivery: DeliveryMethod;
  deliveryFee: number;
  items: OrderItem[];
  subtotal: number;
  total: number;
  proof: string;
  /** True once a cancelled order's bottles have been put back into stock. */
  stockReturned?: boolean;
};

export type Settings = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  whatsapp: string;
};

export type Database = { products: Product[]; orders: Order[]; settings: Settings };

export type StockLevel = "low" | "medium" | "healthy";

/** Under 5 is low, 5–19 is medium, 20 or more is healthy. */
export const stockLevel = (n: number): StockLevel => (n < 5 ? "low" : n < 20 ? "medium" : "healthy");

export const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
