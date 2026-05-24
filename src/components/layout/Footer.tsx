import Image from "next/image";
import { SocialRow } from "@/components/ui/SocialRow";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-lilac-400)",
        color: "var(--color-lilac-800)",
        padding: "40px 0 24px",
      }}
    >
      <div style={{ width: "min(1440px, 100% - 32px)", marginInline: "auto" }}>
        {/* Top row: logo + social */}
        <div className="flex items-center justify-between gap-6 flex-wrap sm:flex-nowrap">
          {/* LogoLockup inline con estilos del footer */}
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo-keyli.jpeg"
              alt="Keyli Sublimaciones"
              width={44}
              height={44}
              className="rounded-full object-cover"
              style={{ boxShadow: "0 0 0 2px rgba(255,255,255,.55)" }}
            />
            <div className="flex flex-col leading-tight">
              <span
                className="font-display font-bold leading-none"
                style={{ fontSize: 24, color: "var(--color-lilac-800)" }}
              >
                Keyli
              </span>
              <span
                className="font-sans text-[11px] tracking-widest uppercase"
                style={{ color: "rgba(94,62,128,.75)" }}
              >
                Sublimaciones
              </span>
            </div>
          </div>

          <SocialRow size={40} iconSize={16} />
        </div>

        {/* Bottom row: copyright */}
        <div
          className="mt-6 pt-[18px] flex justify-between items-center gap-3 flex-wrap text-[13px]"
          style={{
            borderTop: "1px solid rgba(94,62,128,.18)",
            color: "rgba(94,62,128,.8)",
          }}
        >
          <span>© 2026 Keyli Sublimaciones · Hecho con cariño en México</span>
          <span>CDMX · Envíos a todo el país</span>
        </div>
      </div>
    </footer>
  );
}
