"use client";

import { useEffect, useState, useTransition } from "react";
import { adjustStock, setStock } from "@/app/admin/actions";

type Mode = "closed" | "add" | "fix";

/**
 * Shows how many bottles are in stock, with an "Add stock" button for new deliveries
 * ("how many arrived?") and a "Correct count" option to type the exact number.
 */
export default function RestockControl({ id, name, initial }: { id: string; name: string; initial: number }) {
  const [count, setCount] = useState(initial);
  const [mode, setMode] = useState<Mode>("closed");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => setCount(initial), [initial]);

  const open = (m: Mode) => {
    setMode(m);
    setValue(m === "fix" ? String(count) : "");
    setError("");
    setMessage("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Math.floor(Number(value));
    if (!value.trim() || !Number.isFinite(n) || n < 0) return setError("Type a number, e.g. 12");
    if (mode === "add" && n === 0) return setError("Type how many bottles arrived, e.g. 12");
    startTransition(async () => {
      const result = await (mode === "add" ? adjustStock(id, n) : setStock(id, n)).catch(() => null);
      if (result === null) return setError("Not saved. Check your connection and try again.");
      setMessage(mode === "add" ? `Added ${n}. Now ${result} in stock.` : `Saved. Now ${result} in stock.`);
      setCount(result);
      setMode("closed");
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-2xl font-semibold tabular-nums text-cream">{count}</span>
        <span className="text-sm text-cream/60">{count === 1 ? "bottle" : "bottles"}</span>
        {count === 0 ? (
          <span className="rounded border border-cream/40 px-1.5 text-xs font-medium text-cream">Sold out</span>
        ) : count < 5 ? (
          <span className="rounded border border-cream/40 px-1.5 text-xs font-medium text-cream">Low</span>
        ) : null}
      </div>

      {mode === "closed" ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <button type="button" onClick={() => open("add")} className="rounded-md bg-gold px-3 py-1.5 text-sm font-medium text-ink-800 hover:opacity-85">
            + Add stock
          </button>
          <button type="button" onClick={() => open("fix")} className="text-sm text-cream/60 underline underline-offset-2 hover:text-cream">
            Correct count
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-2">
          <label htmlFor={`stock-${id}`} className="block text-sm text-cream/80">
            {mode === "add" ? "How many new bottles arrived?" : `How many ${name} do you have right now?`}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id={`stock-${id}`}
              autoFocus
              type="number"
              min={0}
              inputMode="numeric"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={mode === "add" ? "e.g. 12" : ""}
              className="h-9 w-24 rounded-md border border-cream/30 bg-ink-800 px-2 text-base tabular-nums text-cream focus:border-cream focus:outline-none"
            />
            <button type="submit" disabled={pending} className="h-9 rounded-md bg-gold px-3 text-sm font-medium text-ink-800 hover:opacity-85 disabled:opacity-50">
              {pending ? "Saving…" : mode === "add" ? "Add" : "Save"}
            </button>
            <button type="button" onClick={() => setMode("closed")} disabled={pending} className="text-sm text-cream/60 hover:text-cream">
              Cancel
            </button>
          </div>
          <p className="text-xs text-cream/50">
            {mode === "add" ? `This is added to the ${count} you already have.` : "This replaces the current number."}
          </p>
        </form>
      )}

      {error && <p role="alert" className="text-sm font-medium text-cream">{error}</p>}
      {message && <p role="status" className="text-sm text-cream/70">{message}</p>}
    </div>
  );
}
