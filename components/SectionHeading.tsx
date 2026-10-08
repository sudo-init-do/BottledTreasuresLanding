import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeading({ eyebrow, title, copy, align = "center", className = "" }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p className={`eyebrow flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gold/70" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-gold/70" />}
      </p>
      <h2 className="section-title mt-5">{title}</h2>
      {copy && (
        <p className={`mt-5 text-base leading-relaxed text-cream/65 ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}>
          {copy}
        </p>
      )}
    </Reveal>
  );
}
