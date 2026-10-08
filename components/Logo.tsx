export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-3 ${className}`} aria-label="Bottled Treasures — home">
      <span className="relative flex h-10 w-10 items-center justify-center border border-gold/60 transition-colors duration-500 group-hover:border-gold">
        <span className="absolute inset-1 border border-gold/20" />
        <span className="font-serif text-lg italic leading-none text-gold">BT</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl tracking-[0.12em] text-cream sm:text-[22px]">
          BOTTLED
        </span>
        <span className="mt-1 text-[9px] font-medium tracking-[0.55em] text-gold">
          TREASURES
        </span>
      </span>
    </a>
  );
}
