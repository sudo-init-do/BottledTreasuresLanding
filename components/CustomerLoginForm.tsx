"use client";

import { useFormState } from "react-dom";
import { customerLogin, type LoginState } from "@/app/account/actions";
import SubmitButton from "./admin/SubmitButton";

export default function CustomerLoginForm() {
  const [state, action] = useFormState<LoginState, FormData>(customerLogin, {});
  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="label" htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" required autoComplete="username" className="field" />
      </div>
      <div>
        <label className="label" htmlFor="c-pass">Password</label>
        <input id="c-pass" name="password" type="password" required autoComplete="current-password" className="field" />
      </div>
      {state.error && <p role="alert" className="text-sm text-gold-light">{state.error}</p>}
      <SubmitButton pendingText="Signing in…" className="btn-gold w-full">Sign In</SubmitButton>
    </form>
  );
}
