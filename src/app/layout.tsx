import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Suspense } from "react";
import FacebookPixel from "@/components/FacebookPixel";
import PixelDebug from "@/components/PixelDebug";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: `${siteConfig.name} | Achadinhos conferidos no WhatsApp`,
  description: siteConfig.description,
  keywords: ["ofertas", "promoções", "achadinhos", "descontos", "grupo whatsapp ofertas", "cupons", "economia", "compras online"],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} | Achadinhos conferidos no WhatsApp`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <FacebookPixel />
          <PixelDebug />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
