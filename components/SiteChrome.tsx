import Navbar from "./Navbar";
import Footer from "./Footer";

/** Navbar + footer wrapper for every page except the homepage. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar solid />
      <main className="min-h-[70vh] pt-[72px] lg:pt-20">{children}</main>
      <Footer />
    </>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="border-b border-gold/10 bg-burgundy-900 py-14 sm:py-20">
      <div className="container-site">
        <p className="eyebrow flex items-center gap-4">
          <span className="h-px w-8 bg-gold/70" />
          {eyebrow}
        </p>
        <h1 className="section-title mt-4">{title}</h1>
        {children}
      </div>
    </header>
  );
}
