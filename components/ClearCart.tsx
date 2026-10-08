"use client";

import { useEffect } from "react";
import { useCart } from "./CartContext";

/** Empties the cart once an order has been placed. */
export default function ClearCart() {
  const { clear, ready } = useCart();
  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);
  return null;
}
