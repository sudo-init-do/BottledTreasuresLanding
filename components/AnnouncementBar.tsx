const PHRASE = "BOTTLED TREASURES · BONNY ISLAND, RIVERS STATE · AS LONG AS IT SMELLS GREAT ·";

export default function AnnouncementBar() {
  // Two identical halves so the -50% translate loops seamlessly.
  const half = Array.from({ length: 4 }, () => PHRASE);
  return (
    <div
      className="relative h-9 overflow-hidden border-b border-gold/15 bg-ink"
      role="region"
      aria-label="Announcement"
    >
      <p className="sr-only">{PHRASE}</p>
      <div
        aria-hidden
        className="flex h-full w-max animate-marquee items-center hover:[animation-play-state:paused]"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {half.map((text, i) => (
              <span
                key={i}
                className="px-6 text-[10.5px] font-medium tracking-luxe text-gold"
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
