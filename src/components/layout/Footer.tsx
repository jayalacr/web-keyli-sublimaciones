import Image from "next/image";
import Link from "next/link";
import { SocialRow } from "@/components/ui/SocialRow";
import { WhatsAppGlyph } from "@/components/ui/Icons";
import { waLink } from "@/lib/constants";

const FOOTER_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Cómo comprar", href: "/proceso" },
  { label: "Contacto", href: "/contacto" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-lilac-800)",
        color: "rgba(255,255,255,.85)",
        padding: "40px 0 24px",
      }}
    >
      <div style={{ width: "min(1440px, 100% - 32px)", marginInline: "auto" }}>
        {/* Top row: logo + social */}
        <div className="footer-row flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo-keyli.jpeg"
              alt="Keyli Sublimaciones"
              width={44}
              height={44}
              className="rounded-full object-cover shrink-0"
              style={{ boxShadow: "0 0 0 2px rgba(255,255,255,.55)" }}
            />
            <div className="flex flex-col leading-tight">
              <span
                className="font-display font-bold leading-none"
                style={{ fontSize: 24, color: "white" }}
              >
                Keyli
              </span>
              <span
                className="font-sans text-[11px] tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,.7)" }}
              >
                Sublimaciones
              </span>
            </div>
          </div>

          <SocialRow size={40} iconSize={16} />
        </div>

        {/* Nav row */}
        <nav
          className="footer-nav mt-6 flex items-center gap-6 flex-wrap"
          style={{ fontSize: 14, fontWeight: 600 }}
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:opacity-80"
              style={{ color: "rgba(255,255,255,.85)" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={waLink("Hola Keyli, quiero cotizar un producto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:opacity-80"
            style={{ color: "#7CE8A4" }}
          >
            <WhatsAppGlyph size={16} /> Escríbenos por WhatsApp
          </a>
        </nav>

        {/* Bottom row: copyright */}
        <div
          className="mt-6 pt-[18px] flex justify-between items-center gap-3 flex-wrap text-[13px]"
          style={{
            borderTop: "1px solid rgba(255,255,255,.15)",
            color: "rgba(255,255,255,.7)",
          }}
        >
          <span>© 2026 Keyli Sublimaciones · Hecho con cariño en México</span>
          <span>CDMX · Envíos a todo el país</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-row { justify-content: center; text-align: center; }
          .footer-nav { justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
