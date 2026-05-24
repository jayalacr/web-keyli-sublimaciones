import type { Metadata } from "next";
import { Dancing_Script, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import "./globals.css";

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keyli Sublimaciones — Personaliza tu mundo",
  description:
    "Playeras, tazas, termos, llaveros y más con impresión DTF, sublimación y vinil. Envíos a toda la república.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${dancingScript.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ background: "var(--color-cream)", color: "var(--color-ink)" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
