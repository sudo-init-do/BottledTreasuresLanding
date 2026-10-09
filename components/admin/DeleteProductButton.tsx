"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteProduct } from "@/app/admin/actions";

/** Delete with a confirm step: the first tap asks, the second deletes for good. */
export default function DeleteProductButton({ id, name, redirectTo, compact = false }: { id: string; name: string; redirectTo?: string; compact?: boolean }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const remove = () =>
    startTransition(async () => {
      const result = await deleteProduct(id).catch(() => ({ error: "Couldn't delete. Check your connection and try again." }));
      if (result.error) {
        setError(result.error);
        setConfirming(false);
        router.refresh();
      } else if (redirectTo) {
        router.push(redirectTo);
      }
    });

  const small = "text-[11px] uppercase tracking-wider2";

  if (!confirming) {
    return (
      <span className="inline-flex flex-col items-start gap-1 sm:items-end">
        <button
          type="button"
          onClick={() => {
            setError("");
            setConfirming(true);
          }}
          aria-label={`Delete ${name}`}
          className={compact ? `${small} text-cream/50 hover:text-stock-low` : "btn-outline"}
        >
          Delete{compact ? "" : " Product"}
        </button>
        {error && <span role="alert" className="text-xs text-stock-low">{error}</span>}
      </span>
    );
  }

  return (
    <span role="alertdialog" aria-label={`Delete ${name}?`} className="inline-flex flex-wrap items-center gap-3 sm:justify-end">
      <span className="text-sm text-cream/80">Delete {compact ? "" : <strong className="font-medium text-cream">{name}</strong>} permanently?</span>
      <button type="button" autoFocus onClick={() => setConfirming(false)} disabled={pending} className={`${small} text-cream/60 hover:text-gold`}>
        Cancel
      </button>
      <button type="button" onClick={remove} disabled={pending} className={`${small} border border-stock-low px-3 py-1.5 text-stock-low hover:bg-stock-low hover:text-cream disabled:opacity-60`}>
        {pending ? "Deleting…" : "Yes, delete"}
      </button>
    </span>
  );
}
