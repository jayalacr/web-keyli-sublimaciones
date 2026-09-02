"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/articulos", label: "Artículos" },
  { href: "/temporadas", label: "Temporadas" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-surface shadow-[0_1px_8px_rgba(0,0,0,0.04)]" : "bg-transparent"
      }`}
    >
      <div className="h-20 w-full px-container-margin flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logoKeyli.jpeg"
            alt="Keyli Sublimaciones"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-stack-lg">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "relative font-label-caps transition-colors text-primary font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                    : "relative font-label-caps text-on-surface-variant hover:text-on-surface transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-transparent"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center">
          <Link
            href="/contacto"
            className="px-6 py-2 border border-on-secondary-fixed-variant rounded-full font-label-caps text-on-secondary-fixed-variant hover:bg-on-secondary-fixed-variant hover:text-white transition-all"
          >
            Cotizar
          </Link>
        </div>
      </div>
    </header>
  );
}
