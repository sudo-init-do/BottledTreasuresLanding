"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/** What the cart remembers in the browser. Prices are not saved: they always come from the server, for the visitor's tier. */
export type CartItem = { slug: string; name: string; image: string; qty: number };
type AddInput = Omit<CartItem, "qty">;

type CartContextValue = {
  items: CartItem[];
  count: number;
  lastAdded: string | null;
  ready: boolean;
  addItem: (item: AddInput, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "bt-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      // carts saved by older versions also stored a price; keep only what's needed
      if (Array.isArray(saved)) setItems(saved.map(({ slug, name, image, qty }: CartItem) => ({ slug, name, image, qty })));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const addItem = useCallback((item: AddInput, qty = 1) => {
    setItems((cur) => {
      const found = cur.find((i) => i.slug === item.slug);
      if (found) return cur.map((i) => (i.slug === item.slug ? { ...i, qty: Math.min(i.qty + qty, 20) } : i));
      return [...cur, { ...item, qty }];
    });
    setLastAdded(item.name);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLastAdded(null), 2800);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.slug !== slug) : cur.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, 20) } : i))));
  }, []);

  const removeItem = useCallback((slug: string) => setItems((cur) => cur.filter((i) => i.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, lastAdded, ready, addItem, setQty, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
