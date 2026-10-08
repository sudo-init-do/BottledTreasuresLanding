import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bottled Treasures — Luxury Fragrances, Bonny Island",
  description:
    "Bottled Treasures is a luxury perfume house based in Bonny Island, Rivers State. Rare ouds, velvet florals and spiced signatures — as long as it smells great.",
  openGraph: {
    title: "Bottled Treasures — Luxury Fragrances, Bonny Island",
    description: "As long as it smells great. Shop luxury fragrances delivered across Nigeria.",
    url: "https://bottledtreasures.ng",
    siteName: "Bottled Treasures",
    locale: "en_NG",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0404",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
