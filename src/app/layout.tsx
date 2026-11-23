import type { Metadata } from "next";
import { Hanken_Grotesk, Lilita_One } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

// Títulos: gruesos y redondeados, como el "KEYLI" del logo.
const lilita = Lilita_One({
  variable: "--font-lilita",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Keyli Studio — Diseño & Personalización",
  description: "Diseño y personalización en Monterrey: sublimación, vinil, DTF y papelería creativa para regalos, eventos y negocios.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${hanken.variable} ${lilita.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        {children}
      </body>
    </html>
  );
}
