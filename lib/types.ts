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
  { id: "lagos", label: "Lagos Collection" },
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
  size: string;
  badge?: string;
  image: string;
  tags: Tag[];
  inStock: boolean;
  createdAt: string;
};

export type OrderItem = { slug: string; name: string; price: number; qty: number; image: string };

export const DELIVERY = {
  pickup: { label: "Pickup from our Lekki studio", fee: 0 },
  lagos: { label: "Delivery within Lagos", fee: 3000 },
  nationwide: { label: "Delivery outside Lagos", fee: 6000 },
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
};

export type Settings = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  whatsapp: string;
};

export type Database = { products: Product[]; orders: Order[]; settings: Settings };

export const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
