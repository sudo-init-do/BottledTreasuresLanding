"use client";

import { useFormState } from "react-dom";
import { saveSettings, type FormState } from "@/app/admin/actions";
import type { Settings } from "@/lib/types";
import SubmitButton from "./SubmitButton";

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [state, action] = useFormState<FormState, FormData>(saveSettings, {});
  return (
    <form action={action} className="max-w-xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-cream" htmlFor="s-wa">WhatsApp number</label>
        <p id="s-wa-hint" className="mb-2 mt-0.5 text-sm text-cream/60">The number customers&apos; orders are sent to, with the country code.</p>
        <input id="s-wa" name="whatsapp" type="tel" defaultValue={settings.whatsapp} required placeholder="+234 803 123 4567" aria-describedby="s-wa-hint" className="field" />
      </div>
      {state.error && <p role="alert" className="text-sm font-medium text-cream">{state.error}</p>}
      {state.ok && <p role="status" className="text-sm text-cream">✓ {state.ok}</p>}
      <SubmitButton className="rounded-md bg-gold px-6 py-3 text-sm font-medium text-ink-800 hover:opacity-85">Save</SubmitButton>
    </form>
  );
}
