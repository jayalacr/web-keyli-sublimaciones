"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/constants";
import { SOCIAL_ICONS } from "@/components/SocialIcons";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/articulos", label: "Artículos" },
  { href: "/temporadas", label: "Temporadas" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/proceso", label: "Proceso" },
];

export function Header({
  whatsapp,
  instagramUrl,
  facebookUrl,
  logoUrl = "/logoKeyli.jpeg",
}: {
  whatsapp: string;
  instagramUrl: string;
  facebookUrl: string;
  logoUrl?: string;
}) {
  const pathname = usePathname();
  // ponytail: portada de temporada es oscura y el header flotante se pierde encima — ahí forzamos fondo sólido siempre.
  const isSeasonDetail = pathname.startsWith("/temporadas/");
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) setContactOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [contactOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen || isSeasonDetail ? "bg-surface shadow-[0_1px_8px_rgba(0,0,0,0.04)]" : "bg-transparent"
      }`}
    >
      <div className="h-16 md:h-20 w-full px-container-margin flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Image
            src={logoUrl}
            alt="Keyli Sublimaciones"
            width={48}
            height={48}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shrink-0"
          />
          <span
            className="hidden sm:block text-lg md:text-xl font-bold tracking-tight text-on-surface leading-none truncate"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Keyli <span className="text-primary">Sublimaciones</span>
          </span>
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
        <div className="relative hidden lg:flex items-center" ref={contactRef}>
          <button
            type="button"
            onClick={() => setContactOpen((v) => !v)}
            aria-expanded={contactOpen}
            className="px-6 py-2 border border-on-secondary-fixed-variant rounded-full font-label-caps text-on-secondary-fixed-variant hover:bg-on-secondary-fixed-variant hover:text-white transition-all inline-flex items-center gap-1"
          >
            Contacto
            <span className="material-symbols-outlined text-[18px]">{contactOpen ? "expand_less" : "expand_more"}</span>
          </button>
          {contactOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-surface rounded-2xl border border-outline-variant/20 shadow-lg py-2 flex flex-col">
              <a
                href={waLink(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 flex items-center gap-3 font-label-caps text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
              >
                {SOCIAL_ICONS.whatsapp} WhatsApp
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 flex items-center gap-3 font-label-caps text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
              >
                {SOCIAL_ICONS.instagram} Instagram
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 flex items-center gap-3 font-label-caps text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
              >
                {SOCIAL_ICONS.facebook} Facebook
              </a>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="lg:hidden w-11 h-11 -mr-2 shrink-0 inline-flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-outline-variant/20 bg-surface px-container-margin py-4 flex flex-col max-h-[calc(100dvh-4rem)] overflow-y-auto">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`py-3 font-label-caps ${active ? "text-primary font-semibold" : "text-on-surface-variant"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-2 pt-4 border-t border-outline-variant/20 flex flex-col">
            <a href={waLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="py-3 flex items-center gap-3 font-label-caps text-on-surface-variant">
              {SOCIAL_ICONS.whatsapp} WhatsApp
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="py-3 flex items-center gap-3 font-label-caps text-on-surface-variant">
              {SOCIAL_ICONS.instagram} Instagram
            </a>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="py-3 flex items-center gap-3 font-label-caps text-on-surface-variant">
              {SOCIAL_ICONS.facebook} Facebook
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
