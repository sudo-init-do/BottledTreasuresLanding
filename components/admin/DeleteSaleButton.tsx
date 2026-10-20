"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteSale } from "@/app/admin/actions";

/** Delete a sale recorded by mistake, with a confirm step. Its bottles go back into stock. */
export default function DeleteSaleButton({ id, label }: { id: string; label: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const remove = () =>
    startTransition(async () => {
      const result = await deleteSale(id).catch(() => ({ error: "Couldn't delete. Check your connection and try again." }));
      if (result.error) {
        setError(result.error);
        setConfirming(false);
        router.refresh();
      }
    });

  if (!confirming) {
    return (
      <span className="inline-flex flex-col items-end gap-1">
        <button type="button" onClick={() => (setError(""), setConfirming(true))} aria-label={`Delete sale: ${label}`} className="text-sm text-cream/60 underline underline-offset-2 hover:text-cream">
          Delete
        </button>
        {error && <span role="alert" className="text-xs font-medium text-cream">{error}</span>}
      </span>
    );
  }

  return (
    <span role="alertdialog" aria-label="Delete this sale?" className="inline-flex flex-wrap items-center justify-end gap-3">
      <span className="text-sm text-cream/80">Delete this sale?</span>
      <button type="button" autoFocus onClick={() => setConfirming(false)} disabled={pending} className="text-sm text-cream/60 underline underline-offset-2 hover:text-cream">
        Cancel
      </button>
      <button type="button" onClick={remove} disabled={pending} className="rounded-md bg-cream px-3 py-1.5 text-sm font-medium text-ink-800 hover:opacity-85 disabled:opacity-60">
        {pending ? "Deleting…" : "Yes, delete"}
      </button>
    </span>
  );
}
