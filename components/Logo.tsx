import BrandMark from "./BrandMark";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`group flex items-center gap-3 ${className}`} aria-label="Bottled Treasures — home">
      <BrandMark className="h-10 w-auto text-gold transition-transform duration-500 ease-luxe group-hover:-translate-y-0.5 sm:h-11" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl tracking-[0.12em] text-cream sm:text-[22px]">BOTTLED</span>
        <span className="mt-1 text-[9px] font-medium tracking-[0.55em] text-gold">TREASURES</span>
      </span>
    </a>
  );
}
