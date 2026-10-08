"use client";

import { useFormState } from "react-dom";
import { saveSettings, type FormState } from "@/app/admin/actions";
import type { Settings } from "@/lib/types";
import SubmitButton from "./SubmitButton";

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [state, action] = useFormState<FormState, FormData>(saveSettings, {});
  return (
    <form action={action} className="max-w-xl space-y-5">
      <p className="text-sm text-cream/60">Customers see these bank details at checkout.</p>
      <div>
        <label className="label" htmlFor="s-bank">Bank name</label>
        <input id="s-bank" name="bankName" defaultValue={settings.bankName} required className="field" />
      </div>
      <div>
        <label className="label" htmlFor="s-name">Account name</label>
        <input id="s-name" name="accountName" defaultValue={settings.accountName} required className="field" />
      </div>
      <div>
        <label className="label" htmlFor="s-num">Account number</label>
        <input id="s-num" name="accountNumber" defaultValue={settings.accountNumber} required inputMode="numeric" maxLength={10} className="field" />
      </div>
      <div>
        <label className="label" htmlFor="s-wa">WhatsApp number</label>
        <input id="s-wa" name="whatsapp" defaultValue={settings.whatsapp} className="field" />
      </div>
      {state.error && <p role="alert" className="text-sm text-gold-light">{state.error}</p>}
      {state.ok && <p role="status" className="text-sm text-gold">{state.ok}</p>}
      <SubmitButton>Save Settings</SubmitButton>
    </form>
  );
}
