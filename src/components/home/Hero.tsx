import Image from "next/image";
import Link from "next/link";
import { Sparkle, WhatsAppGlyph, ArrowRight } from "@/components/ui/Icons";
import { waLink } from "@/lib/constants";

type HeroVariant = "gradient" | "yellow" | "clean" | "deep";

interface HeroProps {
  variant?: HeroVariant;
}

const BG: Record<HeroVariant, string> = {
  gradient: `
    radial-gradient(60% 60% at 80% 20%, rgba(255,216,77,.20) 0%, transparent 60%),
    radial-gradient(70% 60% at 10% 90%, rgba(178,134,230,.28) 0%, transparent 60%),
    linear-gradient(180deg, #ffffff 0%, #FAF4FB 100%)`,
  yellow: `
    radial-gradient(60% 50% at 20% 10%, rgba(202,176,236,.6) 0%, transparent 70%),
    linear-gradient(180deg, #FFF1B0 0%, #FFE066 100%)`,
  clean: "#ffffff",
  deep: `
    radial-gradient(60% 50% at 80% 20%, rgba(255,216,77,.30) 0%, transparent 60%),
    linear-gradient(160deg, #5E3E80 0%, #9D6BAA 100%)`,
};

export function Hero({ variant = "gradient" }: HeroProps) {
  const isDeep = variant === "deep";

  return (
    <section
      style={{
        background: BG[variant],
        position: "relative",
        overflow: "hidden",
        paddingBlock: "clamp(48px,7vw,96px) clamp(64px,9vw,128px)",
      }}
    >
      <div
        style={{
          width: "min(1440px, 100% - 32px)",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: "clamp(32px,5vw,80px)",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* ── Text column ── */}
        <div>
          {/* Eyebrow badge */}
          <span
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.14em] rounded-full px-[14px] py-[6px]"
            style={{
              background: isDeep ? "rgba(255,255,255,.12)" : "white",
              color: isDeep ? "#FFE066" : "var(--color-lilac-700)",
              boxShadow: isDeep ? "none" : "0 2px 8px rgba(92,58,140,.08)",
            }}
          >
            <span
              className="inline-block rounded-full shrink-0"
              style={{ width: 6, height: 6, background: "var(--color-yellow-200)" }}
            />
            Personalizamos lo que imaginas
          </span>

          {/* Headline */}
          <h1
            className="mt-[22px] mb-[18px] leading-[.95]"
            style={{
              color: isDeep ? "white" : "var(--color-ink)",
              fontSize: "clamp(44px,6.5vw,88px)",
            }}
          >
            <span
              className="block font-display font-bold leading-none mb-[6px]"
              style={{
                color: isDeep ? "#FFD84D" : "var(--color-lilac-700)",
                fontSize: "1.35em",
              }}
            >
              Creamos tu idea.
            </span>
            <span
              className="font-extrabold tracking-tight"
              style={{
                fontSize: ".48em",
                color: isDeep ? "rgba(255,255,255,.95)" : "var(--color-ink)",
              }}
            >
              Playeras, tazas, termos
              <br />y más, hechos para ti.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="mb-8"
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: isDeep ? "rgba(255,255,255,.85)" : "var(--color-ink-soft)",
              maxWidth: 480,
            }}
          >
            DTF, sublimación y trabajos digitales con el detalle que mereces.
            Diseñamos contigo y producimos en tiempo récord para regalos, eventos y temporadas especiales.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href={waLink("Hola Keyli, quiero cotizar un producto.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[10px] px-[22px] py-[14px] rounded-full font-bold text-[15px] text-white transition-transform hover:-translate-y-px"
              style={{ background: "#25D366", boxShadow: "0 6px 18px -4px rgba(37,211,102,.55)" }}
            >
              <WhatsAppGlyph size={20} /> Cotizar por WhatsApp
            </a>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-[10px] px-[22px] py-[14px] rounded-full font-bold text-[15px] transition-transform hover:-translate-y-px"
              style={
                isDeep
                  ? { background: "rgba(255,255,255,.1)", color: "white", border: "1.5px solid rgba(255,255,255,.25)" }
                  : { background: "white", color: "var(--color-lilac-700)", border: "1.5px solid var(--color-lilac-200)" }
              }
            >
              Ver catálogo <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* ── Logo column ── */}
        <HeroLogoComp isDeep={isDeep} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes sparkle-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33%       { transform: translateY(-8px) rotate(5deg); }
          66%       { transform: translateY(-4px) rotate(-3deg); }
        }
      `}</style>
    </section>
  );
}

function HeroLogoComp({ isDeep }: { isDeep: boolean }) {
  return (
    <div
      className="hero-logo-comp relative justify-self-center"
      style={{ width: "100%", maxWidth: 520, aspectRatio: "1 / 1" }}
    >
      {/* Halo */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "6%",
          background: isDeep
            ? "radial-gradient(circle, rgba(255,255,255,.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(202,176,236,.35) 0%, transparent 70%)",
        }}
      />

      {/* Dashed ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "8%",
          border: `1.5px dashed ${isDeep ? "rgba(255,216,77,.4)" : "rgba(124,79,184,.35)"}`,
          animation: "spin-slow 60s linear infinite",
        }}
      />

      {/* Logo */}
      <Image
        src="/assets/logo-keyli.jpeg"
        alt="Keyli Sublimaciones"
        fill
        className="rounded-full object-cover"
        style={{
          inset: "14%",
          width: "72%",
          height: "72%",
          position: "absolute",
          boxShadow: isDeep
            ? "0 30px 80px -20px rgba(0,0,0,.5), 0 0 0 4px rgba(255,255,255,.15)"
            : "0 30px 80px -20px rgba(92,58,140,.35), 0 0 0 4px rgba(255,255,255,.8)",
        }}
        priority
      />

      {/* Sparkles */}
      <div className="absolute top-[6%] right-[10%]" style={{ color: "var(--color-yellow-300)", animation: "sparkle-float 3s ease-in-out infinite" }}>
        <Sparkle size={28} />
      </div>
      <div className="absolute bottom-[10%] left-[6%]" style={{ color: "var(--color-yellow-300)", animation: "sparkle-float 3s ease-in-out infinite 0.8s" }}>
        <Sparkle size={22} />
      </div>
      <div className="absolute top-[42%] right-[-2%]" style={{ color: "var(--color-yellow-300)", animation: "sparkle-float 3s ease-in-out infinite 1.6s" }}>
        <Sparkle size={16} />
      </div>

      <style>{`
        @media (max-width: 600px) {
          .hero-logo-comp { max-width: 360px !important; }
        }
      `}</style>
    </div>
  );
}
