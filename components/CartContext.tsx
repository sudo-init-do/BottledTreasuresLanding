"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type CartContextValue = {
  count: number;
  lastAdded: string | null;
  addItem: (name: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const addItem = useCallback((name: string) => {
    setCount((c) => c + 1);
    setLastAdded(name);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLastAdded(null), 2800);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <CartContext.Provider value={{ count, lastAdded, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
