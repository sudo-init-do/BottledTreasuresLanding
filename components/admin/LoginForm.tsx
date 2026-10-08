"use client";

import { useFormState } from "react-dom";
import { login, type FormState } from "@/app/admin/actions";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
  const [state, action] = useFormState<FormState, FormData>(login, {});
  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="label" htmlFor="l-email">Email</label>
        <input id="l-email" name="email" type="email" required autoComplete="username" className="field" />
      </div>
      <div>
        <label className="label" htmlFor="l-pass">Password</label>
        <input id="l-pass" name="password" type="password" required autoComplete="current-password" className="field" />
      </div>
      {state.error && <p role="alert" className="text-sm text-gold-light">{state.error}</p>}
      <SubmitButton pendingText="Signing in…" className="btn-gold w-full">Sign In</SubmitButton>
    </form>
  );
}
