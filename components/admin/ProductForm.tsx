"use client";

import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { saveProduct, type FormState } from "@/app/admin/actions";
import { TAGS, type Product } from "@/lib/types";
import SubmitButton from "./SubmitButton";

export default function ProductForm({ product }: { product?: Product }) {
  const [state, action] = useFormState<FormState, FormData>(saveProduct, {});
  const [preview, setPreview] = useState(product?.image ?? "");

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div>
        <label className="label" htmlFor="pf-image">Photo {product ? "" : "*"}</label>
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-dashed border-gold/40 bg-ink-800">
          {preview ? (
            <Image src={preview} alt="" fill sizes="280px" className="object-cover" unoptimized />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-cream/50">No photo yet</span>
          )}
        </div>
        <input
          id="pf-image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setPreview(URL.createObjectURL(f));
          }}
          className="mt-3 block w-full text-sm text-cream/70 file:mr-3 file:border-0 file:bg-gold file:px-3 file:py-2 file:text-xs file:uppercase file:tracking-wider2 file:text-ink"
        />
        <p className="mt-2 text-xs text-cream/50">Portrait photos look best. Max 5MB.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="pf-name">Name *</label>
          <input id="pf-name" name="name" required defaultValue={product?.name} className="field" />
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="label" htmlFor="pf-price">Price (₦) *</label>
            <input id="pf-price" name="price" required inputMode="numeric" defaultValue={product?.price} placeholder="45000" className="field" />
          </div>
          <div>
            <label className="label" htmlFor="pf-compare">Old price (₦)</label>
            <input id="pf-compare" name="compareAt" inputMode="numeric" defaultValue={product?.compareAt} placeholder="Shows as a sale" className="field" />
          </div>
          <div>
            <label className="label" htmlFor="pf-size">Size</label>
            <input id="pf-size" name="size" defaultValue={product?.size} placeholder="100ml Eau de Parfum" className="field" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
          <div>
            <label className="label" htmlFor="pf-notes">Scent notes (comma separated)</label>
            <input id="pf-notes" name="notes" defaultValue={product?.notes.join(", ")} placeholder="Oud, Saffron, Leather" className="field" />
          </div>
          <div>
            <label className="label" htmlFor="pf-badge">Badge</label>
            <input id="pf-badge" name="badge" defaultValue={product?.badge} placeholder="New, Limited…" className="field" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="pf-desc">Description</label>
          <textarea id="pf-desc" name="description" rows={4} defaultValue={product?.description} className="field" />
        </div>
        <fieldset>
          <legend className="label">Show it in</legend>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <label key={t.id} className="flex cursor-pointer items-center gap-2 border border-gold/25 px-3 py-2 text-sm text-cream/80 has-[:checked]:border-gold has-[:checked]:text-gold">
                <input type="checkbox" name={`tag-${t.id}`} defaultChecked={product?.tags.includes(t.id)} className="accent-[#C9A84C]" />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="max-w-[200px]">
          <label className="label" htmlFor="pf-stock">Bottles in stock</label>
          <input id="pf-stock" name="stock" inputMode="numeric" defaultValue={product?.stock ?? 0} className="field" />
          <p className="mt-1.5 text-xs text-cream/50">0 shows as &ldquo;Sold out&rdquo;.</p>
        </div>

        {state.error && <p role="alert" className="border border-gold/50 px-4 py-3 text-sm text-gold-light">{state.error}</p>}
        <SubmitButton>{product ? "Save Changes" : "Add Product"}</SubmitButton>
      </div>
    </form>
  );
}
