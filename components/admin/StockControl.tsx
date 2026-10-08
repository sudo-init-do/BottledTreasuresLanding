"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { adjustStock, setStock } from "@/app/admin/actions";
import { stockLevel } from "@/lib/types";

const badge = {
  low: "border-stock-low/60 bg-stock-low/15 text-stock-low",
  medium: "border-stock-medium/60 bg-stock-medium/15 text-stock-medium",
  healthy: "border-stock-healthy/60 bg-stock-healthy/15 text-stock-healthy",
} as const;

/** − [count] + control. Updates instantly, saves in the background. Tap the number to type an exact count. */
export default function StockControl({ id, name, initial }: { id: string; name: string; initial: number }) {
  const [count, setCount] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [, startTransition] = useTransition();
  const inFlight = useRef(0);

  // pick up changes saved elsewhere (e.g. an order just came in) when we're not mid-update
  useEffect(() => {
    if (inFlight.current === 0) setCount(initial);
  }, [initial]);

  const save = (request: () => Promise<number | null>, fallback: number) => {
    inFlight.current += 1;
    setError(false);
    startTransition(async () => {
      const result = await request().catch(() => null);
      inFlight.current -= 1;
      if (result === null) {
        setError(true);
        setCount(fallback);
      } else if (inFlight.current === 0) {
        setCount(result); // settle on the server's number once all taps are saved
      }
    });
  };

  const bump = (delta: number) => {
    const before = count;
    const next = Math.max(0, before + delta);
    if (next === before) return;
    setCount(next);
    save(() => adjustStock(id, next - before), before);
  };

  const commit = (raw: string) => {
    setEditing(false);
    const n = Math.floor(Number(raw));
    if (!Number.isFinite(n) || n < 0 || n === count) return;
    const before = count;
    setCount(n);
    save(() => setStock(id, n), before);
  };

  const level = stockLevel(count);
  const btn = "flex h-9 w-8 shrink-0 items-center sm:w-9 justify-center border border-gold/30 text-lg text-cream/80 transition-colors hover:border-gold hover:bg-gold hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cream/80";

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <button type="button" onClick={() => bump(-1)} disabled={count === 0} aria-label={`Remove one ${name}`} className={btn}>
        −
      </button>
      {editing ? (
        <input
          autoFocus
          type="number"
          min={0}
          defaultValue={count}
          aria-label={`Stock for ${name}`}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit((e.target as HTMLInputElement).value);
            if (e.key === "Escape") setEditing(false);
          }}
          className="h-9 w-16 border border-gold bg-ink px-2 text-center font-sans text-base text-cream tabular-nums focus:outline-none"
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          title="Tap to type an exact number"
          aria-label={`${name}: ${count} in stock. Tap to type an exact number`}
          className={`flex h-9 min-w-[56px] items-center justify-center rounded-full border px-3 font-sans text-base font-medium tabular-nums leading-none ${badge[level]}`}
        >
          {count}
        </button>
      )}
      <button type="button" onClick={() => bump(1)} aria-label={`Add one ${name}`} className={btn}>
        +
      </button>
      <span role="status" className="sr-only">{count} in stock</span>
      {error && <span className="text-xs text-stock-low">Not saved</span>}
    </div>
  );
}
