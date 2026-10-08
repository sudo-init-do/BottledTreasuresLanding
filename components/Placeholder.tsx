import BottleArt from "./BottleArt";
import type { BottleShape } from "@/lib/data";

type Props = {
  shape?: BottleShape;
  tone?: "ink" | "burgundy";
  className?: string;
  /** Size of the bottle illustration relative to the frame. */
  artClassName?: string;
  label?: string;
  children?: React.ReactNode;
};

/**
 * Dark image placeholder: solid tone, inset hairline gold frame,
 * corner ticks, film grain and a gold line-art bottle.
 */
export default function Placeholder({
  shape = "classic",
  tone = "ink",
  className = "",
  artClassName = "h-[58%]",
  label,
  children,
}: Props) {
  const bg = tone === "burgundy" ? "bg-burgundy-900" : "bg-ink-800";
  return (
    <div className={`grain relative isolate overflow-hidden ${bg} ${className}`}>
      {/* soft halo behind the bottle — a solid disc, blurred */}
      <div
        aria-hidden
        className={`absolute left-1/2 top-1/2 h-[55%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
          tone === "burgundy" ? "bg-burgundy/70" : "bg-burgundy/40"
        }`}
      />
      <div aria-hidden className="absolute inset-3 border border-gold/20 sm:inset-4" />
      {(["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"] as const).map(
        (pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute h-4 w-4 border-gold/70 sm:h-5 sm:w-5 ${pos}`}
          />
        ),
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <BottleArt
          shape={shape}
          className={`${artClassName} w-auto text-gold transition-transform duration-700 ease-luxe group-hover:scale-105`}
        />
      </div>
      {label && (
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-luxe text-gold/60">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
