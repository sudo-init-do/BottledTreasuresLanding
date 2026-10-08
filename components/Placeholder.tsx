import Image from "next/image";
import BottleArt from "./BottleArt";
import type { BottleShape } from "@/lib/data";

type Props = {
  shape?: BottleShape;
  tone?: "ink" | "burgundy";
  className?: string;
  /** Size of the bottle illustration relative to the frame. */
  artClassName?: string;
  label?: string;
  /** Photo to show inside the frame. Falls back to the line-art bottle when absent. */
  image?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  /** Extra classes for the image (e.g. object position). */
  imageClassName?: string;
  /** Solid ink wash over the photo, 0–100. */
  shade?: 0 | 10 | 20 | 30 | 40 | 50;
  children?: React.ReactNode;
};

const shades = {
  0: "",
  10: "bg-ink/10",
  20: "bg-ink/20",
  30: "bg-ink/30",
  40: "bg-ink/40",
  50: "bg-ink/50",
} as const;

/**
 * Framed media block: a photo (or line-art bottle fallback) with an inset
 * hairline gold frame, corner ticks and film grain.
 */
export default function Placeholder({
  shape = "classic",
  tone = "ink",
  className = "",
  artClassName = "h-[58%]",
  label,
  image,
  alt = "",
  sizes = "(min-width: 1024px) 25vw, (min-width: 480px) 50vw, 100vw",
  priority,
  imageClassName = "",
  shade = 0,
  children,
}: Props) {
  const bg = tone === "burgundy" ? "bg-burgundy-900" : "bg-ink-800";
  return (
    <div className={`grain relative isolate overflow-hidden ${bg} ${className}`}>
      {image ? (
        <>
          <Image
            src={image}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`-z-10 object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105 ${imageClassName}`}
          />
          {shade > 0 && <div aria-hidden className={`absolute inset-0 -z-10 ${shades[shade]}`} />}
        </>
      ) : (
        <>
          <div
            aria-hidden
            className={`absolute left-1/2 top-1/2 aspect-square h-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
              tone === "burgundy" ? "bg-burgundy/70" : "bg-burgundy/40"
            }`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BottleArt
              shape={shape}
              className={`${artClassName} w-auto text-gold transition-transform duration-700 ease-luxe group-hover:scale-105`}
            />
          </div>
        </>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-3 border border-gold/20 sm:inset-4" />
      {(
        [
          "left-3 top-3 border-l border-t",
          "right-3 top-3 border-r border-t",
          "left-3 bottom-3 border-l border-b",
          "right-3 bottom-3 border-r border-b",
        ] as const
      ).map((pos) => (
        <span key={pos} aria-hidden className={`pointer-events-none absolute h-4 w-4 border-gold/70 sm:h-5 sm:w-5 ${pos}`} />
      ))}
      {label && (
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-luxe text-gold/60">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
