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

  const small = "text-sm";

  if (!confirming) {
    return (
      <span className="inline-flex flex-col items-start gap-1">
        <button
          type="button"
          onClick={() => {
            setError("");
            setConfirming(true);
          }}
          aria-label={`Delete ${name}`}
          className={compact ? `${small} text-cream/60 underline underline-offset-2 hover:text-cream` : "rounded-md border border-cream/40 px-4 py-2 text-sm font-medium text-cream hover:bg-cream hover:text-ink-800"}
        >
          Delete{compact ? "" : " this product"}
        </button>
        {error && <span role="alert" className="text-xs font-medium text-cream">{error}</span>}
      </span>
    );
  }

  return (
    <span role="alertdialog" aria-label={`Delete ${name}?`} className="inline-flex flex-wrap items-center gap-3">
      <span className="text-sm text-cream/80">
        Delete <strong className="font-medium text-cream">{name}</strong> from the shop? This can&apos;t be undone.
      </span>
      <button type="button" autoFocus onClick={() => setConfirming(false)} disabled={pending} className={`${small} text-cream/60 underline underline-offset-2 hover:text-cream`}>
        Cancel
      </button>
      <button type="button" onClick={remove} disabled={pending} className={`${small} rounded-md bg-cream px-3 py-1.5 font-medium text-ink-800 hover:opacity-85 disabled:opacity-60`}>
        {pending ? "Deleting…" : "Yes, delete"}
      </button>
    </span>
  );
}
