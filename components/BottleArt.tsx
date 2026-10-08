import type { BottleShape } from "@/lib/data";

/**
 * Fine-line perfume bottle illustrations used inside the image placeholders.
 * Drawn in gold strokes on a 200×300 canvas so they scale cleanly anywhere.
 */
type Props = {
  shape: BottleShape;
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  vectorEffect: "non-scaling-stroke" as const,
};

function Shape({ shape }: { shape: BottleShape }) {
  switch (shape) {
    case "tall":
      return (
        <>
          <rect x="84" y="18" width="32" height="44" {...stroke} />
          <line x1="84" y1="30" x2="116" y2="30" {...stroke} opacity={0.5} />
          <rect x="92" y="62" width="16" height="14" {...stroke} />
          <path d="M66 76h68v196H66z" {...stroke} />
          <path d="M67 150h66v121H67z" fill="currentColor" opacity={0.1} />
          <line x1="67" y1="150" x2="133" y2="150" {...stroke} opacity={0.6} />
          <rect x="78" y="176" width="44" height="58" {...stroke} opacity={0.75} />
          <line x1="76" y1="88" x2="76" y2="258" {...stroke} opacity={0.35} />
        </>
      );
    case "round":
      return (
        <>
          <path d="M82 34h36l-4 44H86z" {...stroke} />
          <line x1="84" y1="48" x2="116" y2="48" {...stroke} opacity={0.5} />
          <rect x="92" y="78" width="16" height="22" {...stroke} />
          <circle cx="100" cy="186" r="82" {...stroke} />
          <circle cx="100" cy="186" r="64" {...stroke} opacity={0.35} />
          <path
            d="M24 206a82 82 0 0 0 152 0z"
            fill="currentColor"
            opacity={0.1}
          />
          <line x1="24" y1="206" x2="176" y2="206" {...stroke} opacity={0.6} />
          <path d="M48 140a64 64 0 0 1 30-34" {...stroke} opacity={0.5} />
        </>
      );
    case "square":
      return (
        <>
          <path d="M76 22h48l10 20-10 20H76L66 42z" {...stroke} />
          <path d="M76 22l24 20 24-20M66 42h68M76 62l24-20 24 20" {...stroke} opacity={0.35} />
          <rect x="90" y="62" width="20" height="22" {...stroke} />
          <path d="M56 84h88l20 20v148l-20 20H56l-20-20V104z" {...stroke} />
          <path d="M64 100h72l12 12v132l-12 12H64l-12-12V112z" {...stroke} opacity={0.35} />
          <path d="M37 170h126v82l-19 19H56l-19-19z" fill="currentColor" opacity={0.1} />
          <line x1="37" y1="170" x2="163" y2="170" {...stroke} opacity={0.6} />
        </>
      );
    case "classic":
    default:
      return (
        <>
          <rect x="78" y="24" width="44" height="40" {...stroke} />
          <line x1="78" y1="36" x2="122" y2="36" {...stroke} opacity={0.5} />
          <rect x="90" y="64" width="20" height="18" {...stroke} />
          <path d="M60 82h80l18 26v156H42V108z" {...stroke} />
          <path d="M43 168h114v95H43z" fill="currentColor" opacity={0.1} />
          <line x1="43" y1="168" x2="157" y2="168" {...stroke} opacity={0.6} />
          <rect x="66" y="186" width="68" height="50" {...stroke} opacity={0.75} />
          <line x1="54" y1="116" x2="54" y2="250" {...stroke} opacity={0.35} />
        </>
      );
  }
}

export default function BottleArt({ shape, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <Shape shape={shape} />
      {/* Monogram on the label */}
      <text
        x="100"
        y={shape === "round" ? 194 : shape === "square" ? 214 : 216}
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-cormorant), serif"
        fontSize="22"
        letterSpacing="2"
        opacity={0.9}
      >
        BT
      </text>
    </svg>
  );
}
