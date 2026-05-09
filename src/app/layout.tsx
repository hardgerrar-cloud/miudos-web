import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Miúdos Web | Os Melhores Achadinhos e Ofertas Reais",
  description: "Participe da maior comunidade de achadinhos. Curadoria profissional de ofertas, cupons e promoções reais enviadas diretamente no seu WhatsApp. Economize com inteligência.",
  keywords: ["ofertas", "promoções", "achadinhos", "descontos", "grupo whatsapp ofertas", "cupons", "economia", "compras online"],
  authors: [{ name: "Miúdos Web" }],
  openGraph: {
    title: "Miúdos Web | Os Melhores Achadinhos e Ofertas Reais",
    description: "Curadoria profissional de ofertas e promoções reais no seu WhatsApp.",
    url: "https://miudosweb.com.br",
    siteName: "Miúdos Web",
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
        {children}
      </body>
    </html>
  );
}
