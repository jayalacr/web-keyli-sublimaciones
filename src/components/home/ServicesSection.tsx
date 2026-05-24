import { Sparkle } from "@/components/ui/Icons";
import { techniques } from "@/lib/data";

const CARD_STYLES = [
  { bg: "linear-gradient(140deg, #F3EAFE 0%, #E6D3FB 100%)", border: "#E6CCEB",  dot: "#9D6BAA" },
  { bg: "linear-gradient(140deg, #FFF1B0 0%, #FFE066 100%)", border: "#F5D966",  dot: "#B8860B" },
  { bg: "linear-gradient(140deg, #FFFFFF 0%, #F3EAFE 100%)", border: "#E6CCEB",  dot: "#7C4F8C" },
];

export function ServicesSection() {
  return (
    <section style={{ paddingBlock: "clamp(56px,8vw,112px)" }}>
      <div style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}>
        {/* Header */}
        <div className="text-center mb-14" style={{ maxWidth: 640, marginInline: "auto" }}>
          <span
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.14em]"
            style={{ color: "var(--color-lilac-600)" }}
          >
            <Sparkle size={10} /> Nuestros servicios
          </span>
          <h2 className="mt-3 mb-[14px]" style={{ color: "var(--color-ink)" }}>
            Tres formas de imprimir tu idea
          </h2>
          <p style={{ fontSize: 16, color: "var(--color-ink-soft)" }}>
            Cada técnica está pensada para distintos materiales y volúmenes.
            Te recomendamos la mejor según lo que necesites.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 services-grid">
          {techniques.map((t, i) => {
            const s = CARD_STYLES[i] ?? CARD_STYLES[0];
            return (
              <div
                key={t.id}
                className="relative flex flex-col gap-4 overflow-hidden"
                style={{
                  padding: 32,
                  background: s.bg,
                  border: `1.5px solid ${s.border}`,
                  borderRadius: 24,
                  minHeight: 360,
                }}
              >
                {/* Decorative sparkle */}
                <div className="absolute top-5 right-5" style={{ color: s.dot, opacity: .5 }}>
                  <Sparkle size={20} />
                </div>

                {/* Big numeral */}
                <div
                  className="font-display font-bold leading-none"
                  style={{ fontSize: 64, color: s.dot, opacity: .9 }}
                >
                  0{i + 1}
                </div>

                <div>
                  <h3 className="mb-1" style={{ color: "var(--color-ink)" }}>{t.label}</h3>
                  <span className="text-[13px] font-semibold italic" style={{ color: s.dot }}>
                    {t.tagline}
                  </span>
                </div>

                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--color-ink-soft)" }}>
                  {t.desc}
                </p>

                {/* Includes pills */}
                <div className="flex flex-wrap gap-[6px] mt-auto">
                  {t.includes.map((it) => (
                    <span
                      key={it}
                      className="text-[11.5px] font-semibold px-[10px] py-[5px] rounded-full"
                      style={{
                        background: "rgba(255,255,255,.6)",
                        color: "var(--color-ink)",
                        border: "1px solid rgba(0,0,0,.04)",
                      }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
