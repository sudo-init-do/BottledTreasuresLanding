"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { recordSale, type FormState } from "@/app/admin/actions";
import { formatNaira } from "@/lib/types";
import SubmitButton from "./SubmitButton";

type Option = { id: string; name: string; price: number; stock: number };

const input =
  "h-11 w-full rounded-md border border-cream/25 bg-ink-800 px-3 text-base text-cream placeholder:text-cream/35 focus:border-cream focus:outline-none";

/** "Record a sale": pick the product, how many and the price. The price fills in from the shop price and can be changed. */
export default function SaleForm({ products, today }: { products: Option[]; today: string }) {
  const [state, action] = useFormState<FormState, FormData>(recordSale, {});
  const form = useRef<HTMLFormElement>(null);
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("1");
  const chosen = products.find((p) => p.id === productId);
  const total = Math.floor(Number(qty)) * Number(price.replace(/[^\d.]/g, ""));

  useEffect(() => {
    if (!state.ok) return;
    form.current?.reset();
    setProductId("");
    setPrice("");
    setQty("1");
  }, [state]);

  return (
    <form ref={form} action={action} className="space-y-5 rounded-lg border border-cream/15 bg-ink-800 p-5 sm:p-6">
      <h2 className="text-xl font-medium text-cream">Record a sale</h2>

      <div className="grid gap-5 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <label htmlFor="sale-product" className="block text-sm font-medium text-cream">What did you sell? *</label>
          <select
            id="sale-product"
            name="productId"
            required
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
              const p = products.find((x) => x.id === e.target.value);
              if (p) setPrice(String(p.price));
            }}
            className={`${input} mt-2`}
          >
            <option value="" disabled>Choose a product…</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.stock} in stock)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sale-qty" className="block text-sm font-medium text-cream">How many? *</label>
          <input id="sale-qty" name="qty" type="number" min={1} required inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value)} className={`${input} mt-2 tabular-nums`} />
        </div>
        <div>
          <label htmlFor="sale-price" className="block text-sm font-medium text-cream">Price each (₦) *</label>
          <input id="sale-price" name="price" required inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="45000" className={`${input} mt-2 tabular-nums`} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_1fr_160px]">
        <div>
          <label htmlFor="sale-customer" className="block text-sm font-medium text-cream">Customer <span className="font-normal text-cream/60">(optional)</span></label>
          <input id="sale-customer" name="customer" placeholder="Name or phone" className={`${input} mt-2`} />
        </div>
        <div>
          <label htmlFor="sale-note" className="block text-sm font-medium text-cream">Note <span className="font-normal text-cream/60">(optional)</span></label>
          <input id="sale-note" name="note" placeholder="e.g. Paid by transfer, delivered to Finima" className={`${input} mt-2`} />
        </div>
        <div>
          <label htmlFor="sale-date" className="block text-sm font-medium text-cream">Date</label>
          <input id="sale-date" name="date" type="date" defaultValue={today} max={today} className={`${input} mt-2 [color-scheme:dark]`} />
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-cream/80">
        <input type="checkbox" name="takeStock" defaultChecked className="mt-0.5 h-4 w-4 accent-gold" />
        <span>
          Take these bottles off my stock
          <span className="block text-cream/60">
            {chosen ? `${chosen.name} goes from ${chosen.stock} to ${Math.max(0, chosen.stock - (Math.floor(Number(qty)) || 0))}.` : "Leave ticked unless you already changed the count yourself."}
          </span>
        </span>
      </label>

      {state.error && (
        <p role="alert" className="rounded-md border border-cream/40 px-4 py-3 text-sm font-medium text-cream">{state.error}</p>
      )}
      {state.ok && (
        <p role="status" className="rounded-md border border-cream/30 px-4 py-3 text-sm font-medium text-cream">✓ {state.ok}</p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton className="rounded-md bg-gold px-6 py-3 text-sm font-medium text-ink-800 hover:opacity-85">Save sale</SubmitButton>
        {total > 0 && <p className="text-sm text-cream/70">Total: <strong className="font-medium text-cream">{formatNaira(total)}</strong></p>}
      </div>
    </form>
  );
}
