"use client";

import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { saveProduct, type FormState } from "@/app/admin/actions";
import { TAGS, type Product } from "@/lib/types";
import SubmitButton from "./SubmitButton";

const input =
  "h-11 w-full rounded-md border border-cream/25 bg-ink-800 px-3 text-base text-cream placeholder:text-cream/35 focus:border-cream focus:outline-none";

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-cream">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mb-2 mt-0.5 text-sm text-cream/60">
          {hint}
        </p>
      )}
      <div className={hint ? "" : "mt-2"}>{children}</div>
    </div>
  );
}

export default function ProductForm({ product }: { product?: Product }) {
  const [state, action] = useFormState<FormState, FormData>(saveProduct, {});
  const [preview, setPreview] = useState(product?.image ?? "");
  const isNew = !product;

  return (
    <form action={action} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      <section className="space-y-6 rounded-lg border border-cream/15 bg-ink-800 p-5 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-[160px_1fr]">
          <div>
            <p className="text-sm font-medium text-cream">Photo{isNew && " *"}</p>
            <p className="mb-2 mt-0.5 text-sm text-cream/60">A clear photo of the bottle.</p>
            <div className="relative aspect-[4/5] w-full max-w-[160px] overflow-hidden rounded-md border border-dashed border-cream/30 bg-ink">
              {preview ? (
                <Image src={preview} alt="" fill sizes="160px" className="object-cover" unoptimized />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-cream/50">No photo yet</span>
              )}
            </div>
            <label htmlFor="pf-image" className="mt-3 inline-block cursor-pointer rounded-md border border-cream/30 px-3 py-2 text-sm font-medium text-cream hover:border-cream">
              {preview ? "Change photo" : "Choose photo"}
            </label>
            <input
              id="pf-image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPreview(URL.createObjectURL(f));
              }}
              className="sr-only"
            />
            <p className="mt-2 text-xs text-cream/50">JPG, PNG or WebP, up to 5MB.</p>
          </div>

          <div className="space-y-5">
            <Field id="pf-name" label="Product name *" hint="What customers see in the shop, e.g. Oud Noir Royale.">
              <input id="pf-name" name="name" required defaultValue={product?.name} aria-describedby="pf-name-hint" className={input} />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="pf-price" label="Price (₦) *" hint="What customers pay. Numbers only.">
                <input id="pf-price" name="price" required inputMode="numeric" defaultValue={product?.price} placeholder="45000" aria-describedby="pf-price-hint" className={input} />
              </Field>
              <Field id="pf-stock" label="Bottles in stock *" hint="How many you have now. 0 shows “Sold out”.">
                <input id="pf-stock" name="stock" required inputMode="numeric" defaultValue={product?.stock ?? 0} aria-describedby="pf-stock-hint" className={input} />
              </Field>
            </div>

            <Field id="pf-size" label="Size" hint="Optional, e.g. 100ml Eau de Parfum.">
              <input id="pf-size" name="size" defaultValue={product?.size} placeholder="100ml Eau de Parfum" aria-describedby="pf-size-hint" className={input} />
            </Field>

            <Field id="pf-desc" label="Description" hint="Optional. A few words about how it smells.">
              <textarea id="pf-desc" name="description" rows={3} defaultValue={product?.description} aria-describedby="pf-desc-hint" className={`${input} h-auto py-2`} />
            </Field>
          </div>
        </div>
      </section>

      <details className="group rounded-lg border border-cream/15 bg-ink-800" open={Boolean(product?.wholesalePrice || product?.compareAt)}>
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium text-cream sm:px-6">
          <span>
            More options <span className="font-normal text-cream/60">(optional: wholesale price, sale price, scent notes, where it appears)</span>
          </span>
          <span aria-hidden className="text-lg text-cream/60 transition-transform group-open:rotate-45">+</span>
        </summary>
        <div className="space-y-5 border-t border-cream/10 px-5 py-5 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="pf-wholesale" label="Wholesale price (₦)" hint="Only signed-in wholesale customers see this price.">
              <input id="pf-wholesale" name="wholesalePrice" inputMode="numeric" defaultValue={product?.wholesalePrice} placeholder="38000" aria-describedby="pf-wholesale-hint" className={input} />
            </Field>
            <Field id="pf-compare" label="Old price (₦)" hint="Fill in to show a sale: the old price appears crossed out.">
              <input id="pf-compare" name="compareAt" inputMode="numeric" defaultValue={product?.compareAt} placeholder="55000" aria-describedby="pf-compare-hint" className={input} />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
            <Field id="pf-notes" label="Scent notes" hint="Separate with commas, e.g. Oud, Saffron, Leather.">
              <input id="pf-notes" name="notes" defaultValue={product?.notes.join(", ")} aria-describedby="pf-notes-hint" className={input} />
            </Field>
            <Field id="pf-badge" label="Label on the photo" hint="A short word like New or Limited.">
              <input id="pf-badge" name="badge" defaultValue={product?.badge} aria-describedby="pf-badge-hint" className={input} />
            </Field>
          </div>
          <fieldset>
            <legend className="text-sm font-medium text-cream">Where it appears</legend>
            <p className="mb-2 mt-0.5 text-sm text-cream/60">Tick the shop sections and filters this product should show up in.</p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <label key={t.id} className="flex cursor-pointer items-center gap-2 rounded-md border border-cream/20 px-3 py-2 text-sm text-cream/80 has-[:checked]:border-cream has-[:checked]:text-cream">
                  <input type="checkbox" name={`tag-${t.id}`} defaultChecked={product?.tags.includes(t.id)} className="accent-gold" />
                  {t.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </details>

      {state.error && (
        <p role="alert" className="rounded-md border border-cream/40 bg-ink-800 px-4 py-3 text-sm font-medium text-cream">
          {state.error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton className="rounded-md bg-gold px-6 py-3 text-sm font-medium text-ink-800 hover:opacity-85">
          {isNew ? "Add product to the shop" : "Save changes"}
        </SubmitButton>
        <p className="text-sm text-cream/60">{isNew ? "It shows in the shop straight away." : "Changes show in the shop straight away."}</p>
      </div>
    </form>
  );
}
