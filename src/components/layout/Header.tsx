"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Menu, XClose, FacebookGlyph, InstagramGlyph, TikTokGlyph } from "@/components/ui/Icons";
import { SocialRow } from "@/components/ui/SocialRow";

const NAV_ITEMS = [
  { id: "home",    label: "Inicio",       href: "/" },
  { id: "catalog", label: "Catálogo",     href: "/catalogo" },
  { id: "process", label: "Cómo comprar", href: "/proceso" },
];

const SOCIAL_LINKS = [
  { id: "facebook",  label: "Facebook",  href: "https://facebook.com/keylisublimaciones",  Glyph: FacebookGlyph },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/keylisublimaciones", Glyph: InstagramGlyph },
  { id: "tiktok",    label: "TikTok",    href: "https://tiktok.com/@keylisublimaciones",   Glyph: TikTokGlyph },
];

function activeId(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/catalogo")) return "catalog";
  if (pathname.startsWith("/proceso")) return "process";
  return "";
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = activeId(pathname);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header
        className="sticky top-0 z-30"
        style={{
          background: "var(--color-lilac-400)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(94,62,128,.12)",
          boxShadow: "0 4px 18px -8px rgba(94,62,128,.25)",
        }}
      >
        <div
          className="flex items-center justify-between py-4"
          style={{ width: "min(1440px, 100% - 32px)", marginInline: "auto" }}
        >
          {/* Logo */}
          <div style={{ filter: "drop-shadow(0 0 0 2px rgba(255,255,255,.35)) drop-shadow(0 4px 12px rgba(0,0,0,.18))" }}>
            <Logo />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-sm font-semibold px-[14px] py-2 rounded-full transition-colors"
                style={{
                  color: active === item.id ? "white" : "var(--color-lilac-800)",
                  background: active === item.id ? "var(--color-lilac-800)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (active !== item.id) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.55)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-lilac-900)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== item.id) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-lilac-800)";
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop social */}
          <div className="hidden md:flex items-center">
            <SocialRow size={36} iconSize={15} />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center rounded-xl bg-white"
            style={{ padding: 10, border: "1px solid var(--color-line)" }}
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(39,21,66,.4)" }}
            onClick={() => setOpen(false)}
          />
          <aside
            className="fixed top-0 right-0 z-[41] flex flex-col gap-3 bg-white"
            style={{
              width: "min(86vw, 340px)",
              height: "100vh",
              padding: 24,
              boxShadow: "0 40px 100px -30px rgba(92,58,140,.40)",
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg transition-colors hover:bg-[var(--color-lilac-50)]"
                aria-label="Cerrar menú"
              >
                <XClose size={22} />
              </button>
            </div>

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold px-4 py-[14px] rounded-full transition-colors"
                style={{
                  color: active === item.id ? "white" : "var(--color-ink-soft)",
                  background: active === item.id ? "var(--color-lilac-800)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}

            <div
              className="mt-4 pt-4 flex gap-2"
              style={{ borderTop: "1px solid var(--color-line)" }}
            >
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid place-items-center rounded-full"
                  style={{
                    width: 40,
                    height: 40,
                    background: "var(--color-lilac-50)",
                    color: "var(--color-lilac-700)",
                    border: "1px solid var(--color-lilac-200)",
                  }}
                >
                  <s.Glyph size={16} />
                </a>
              ))}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
