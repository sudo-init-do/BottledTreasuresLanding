/** A short, plain explanation at the top of a dashboard page: what it's for and how to use it. */
export default function HelpBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-lg border border-gold/15 bg-ink-800 px-5 py-4 text-sm leading-relaxed text-cream/70">
      <p className="flex items-center gap-2 font-medium text-cream">
        <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full border border-cream/40 text-[11px] font-semibold">
          i
        </span>
        {title}
      </p>
      <div className="mt-2 space-y-1.5">{children}</div>
    </aside>
  );
}
