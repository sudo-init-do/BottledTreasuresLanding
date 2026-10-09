"use client";

import { useFormState } from "react-dom";
import { saveCustomer, type FormState } from "@/app/admin/actions";
import { TIERS, type Customer } from "@/lib/types";
import SubmitButton from "./SubmitButton";

/** The password hash never comes to the browser: pass the customer without it. */
export default function CustomerForm({ customer }: { customer?: Omit<Customer, "passwordHash"> }) {
  const [state, action] = useFormState<FormState, FormData>(saveCustomer, {});

  return (
    <form action={action} className="max-w-xl space-y-5">
      {customer && <input type="hidden" name="id" value={customer.id} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="cf-name">Name *</label>
          <input id="cf-name" name="name" required defaultValue={customer?.name} placeholder="Business or person" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="cf-email">Email *</label>
          <input id="cf-email" name="email" type="email" required autoComplete="off" defaultValue={customer?.email} className="field" />
        </div>
      </div>
      <fieldset>
        <legend className="label">Account type</legend>
        <div className="flex flex-wrap gap-2">
          {TIERS.map((t) => (
            <label key={t.id} className="flex cursor-pointer items-center gap-2 border border-gold/25 px-4 py-2.5 text-sm text-cream/80 has-[:checked]:border-gold has-[:checked]:text-gold">
              <input type="radio" name="tier" value={t.id} defaultChecked={(customer?.tier ?? "wholesale") === t.id} className="accent-[#C9A84C]" />
              {t.label}
            </label>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-cream/50">Wholesale customers see each product&rsquo;s wholesale price (where it has one) when signed in.</p>
      </fieldset>
      <div>
        <label className="label" htmlFor="cf-pass">{customer ? "New password" : "Password *"}</label>
        <input id="cf-pass" name="password" type="password" autoComplete="new-password" minLength={8} required={!customer} className="field" aria-describedby="cf-pass-hint" />
        <p id="cf-pass-hint" className="mt-1.5 text-xs text-cream/50">
          {customer ? "Leave empty to keep their current password. Setting a new one signs them out." : "At least 8 characters. Send it to the customer privately."}
        </p>
      </div>
      {customer && (
        <label className="flex cursor-pointer items-start gap-3 border border-gold/25 px-4 py-3 text-sm text-cream/80">
          <input type="checkbox" name="active" defaultChecked={customer.active} className="mt-0.5 accent-[#C9A84C]" />
          <span>
            Account is on
            <span className="block text-xs text-cream/50">Untick to switch it off. They&rsquo;re signed out straight away and see retail prices.</span>
          </span>
        </label>
      )}
      {state.error && <p role="alert" className="border border-gold/50 px-4 py-3 text-sm text-gold-light">{state.error}</p>}
      <SubmitButton>{customer ? "Save Changes" : "Add Customer"}</SubmitButton>
    </form>
  );
}
