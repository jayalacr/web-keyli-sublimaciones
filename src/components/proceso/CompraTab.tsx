import { Sparkle, Clock } from "@/components/ui/Icons";
import { CTAClose } from "@/components/home/CTAClose";
import { buyingSteps } from "@/lib/data";

const stepColors = [
  "linear-gradient(135deg, #FFD84D 0%, #E6AF14 100%)",
  "linear-gradient(135deg, #CAB0EC 0%, #9D6BAA 100%)",
  "linear-gradient(135deg, #B991E5 0%, #7C4F8C 100%)",
  "linear-gradient(135deg, #9D6BAA 0%, #5E3E80 100%)",
  "linear-gradient(135deg, #7C4F8C 0%, #3D2756 100%)",
];
const stepTextColors = ["var(--color-lilac-900)", "white", "white", "white", "white"];

const StepIllustration = ({ kind }: { kind?: string }) => {
  const inner: Record<string, React.ReactNode> = {
    chat: (
      <g>
        <rect x="14" y="20" width="60" height="36" rx="8" fill="#5C3A8C" />
        <circle cx="28" cy="38" r="3" fill="white" />
        <circle cx="40" cy="38" r="3" fill="white" />
        <circle cx="52" cy="38" r="3" fill="white" />
        <path d="M30 56 L26 64 L40 56 Z" fill="#5C3A8C" />
      </g>
    ),
    preview: (
      <g>
        <rect x="16" y="18" width="56" height="44" rx="6" fill="white" stroke="#5C3A8C" strokeWidth="2.5" />
        <circle cx="34" cy="38" r="10" fill="#FFD84D" />
        <rect x="22" y="54" width="20" height="3" fill="#5C3A8C" />
        <rect x="46" y="54" width="14" height="3" fill="#CAB0EC" />
      </g>
    ),
    wallet: (
      <g>
        <rect x="14" y="24" width="60" height="40" rx="6" fill="#5C3A8C" />
        <rect x="14" y="32" width="60" height="6" fill="#3E2566" />
        <circle cx="60" cy="50" r="6" fill="#FFD84D" />
      </g>
    ),
    factory: (
      <g>
        <rect x="18" y="34" width="14" height="30" fill="#5C3A8C" />
        <rect x="36" y="20" width="14" height="44" fill="#5C3A8C" />
        <rect x="54" y="28" width="14" height="36" fill="#5C3A8C" />
        <circle cx="25" cy="14" r="5" fill="#FFD84D" />
      </g>
    ),
    truck: (
      <g>
        <rect x="10" y="32" width="36" height="22" rx="2" fill="#5C3A8C" />
        <path d="M46 38 L62 38 L72 48 L72 54 L46 54 Z" fill="#CAB0EC" />
        <circle cx="22" cy="58" r="5" fill="#3E2566" />
        <circle cx="60" cy="58" r="5" fill="#3E2566" />
        <rect x="50" y="42" width="14" height="8" fill="#FFD84D" />
      </g>
    ),
  };
  return (
    <svg width="88" height="72" viewBox="0 0 88 80" aria-hidden="true">
      {inner[kind ?? ""] ?? null}
    </svg>
  );
};

export function CompraTab() {
  const total = buyingSteps.length;

  return (
    <>
      {/* Steps horizontal flow */}
      <section style={{ paddingBlock: "56px 48px" }}>
        <div style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}>
          <div
            className="hflow"
            style={{ "--cols": total } as React.CSSProperties}
          >
            {/* Dotted connector line */}
            <div className="hflow-track" aria-hidden="true">
              <div className="hflow-track-line" />
            </div>

            {buyingSteps.map((step, i) => (
              <div key={step.step} className="hflow-step">
                <div
                  className="hflow-bubble"
                  style={{ background: stepColors[i] ?? stepColors[4], color: stepTextColors[i] ?? "white" }}
                >
                  <StepIllustration kind={step.icon} />
                </div>

                <h3 className="hflow-title">{step.title}</h3>

                {step.time && (
                  <span className="hflow-time">
                    <Clock size={11} /> {step.time}
                  </span>
                )}

                <p className="hflow-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .hflow {
            position: relative;
            display: grid;
            grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
            gap: 14px;
            padding-top: 12px;
          }
          .hflow-track {
            position: absolute;
            top: 12px;
            left: 0;
            right: 0;
            height: 100px;
            pointer-events: none;
          }
          .hflow-track-line {
            position: absolute;
            top: 50px;
            left: calc((100% / var(--cols)) / 2);
            right: calc((100% / var(--cols)) / 2);
            height: 0;
            border-top: 2px dashed var(--color-lilac-300);
          }
          .hflow-step {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            min-width: 0;
          }
          .hflow-bubble {
            position: relative;
            z-index: 1;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            box-shadow: 0 14px 26px -12px rgba(92,58,140,.35);
            border: 4px solid #ffffff;
          }
          .hflow-title {
            margin: 16px 0 8px;
            font-size: 15.5px;
            line-height: 1.25;
            color: var(--color-ink);
          }
          .hflow-time {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 9px;
            border-radius: 999px;
            background: var(--color-yellow-100);
            color: var(--color-lilac-800);
            margin-bottom: 10px;
          }
          .hflow-desc {
            font-size: 13px;
            color: var(--color-ink-soft);
            line-height: 1.5;
            margin: 0;
          }

          @media (max-width: 720px) {
            .hflow {
              grid-template-columns: 1fr;
              gap: 28px;
              padding-top: 8px;
            }
            .hflow-track { display: none; }
            .hflow-step {
              display: grid;
              grid-template-columns: auto 1fr;
              grid-template-areas:
                "bubble title"
                "bubble time"
                "bubble desc";
              column-gap: 16px;
              row-gap: 4px;
              align-items: center;
              text-align: left;
            }
            .hflow-bubble { grid-area: bubble; align-self: start; width: 80px; height: 80px; }
            .hflow-title  { grid-area: title; margin: 0; }
            .hflow-time   { grid-area: time; justify-self: start; margin: 4px 0; }
            .hflow-desc   { grid-area: desc; }
          }
        `}</style>
      </section>

      {/* Payment methods */}
      <section style={{ paddingBlock: "48px 56px", background: "var(--color-lilac-50)" }}>
        <div style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--color-lilac-600)",
              }}
            >
              <Sparkle size={10} /> Pago
            </span>
            <h2 style={{ marginTop: 12, marginBottom: 0, color: "var(--color-ink)" }}>Métodos de pago aceptados</h2>
            <p
              style={{
                maxWidth: 520,
                marginInline: "auto",
                marginTop: 8,
                fontSize: 16,
                color: "var(--color-ink-soft)",
              }}
            >
              50% al apartar · 50% al entregar. Confirmas el pago enviándonos foto del comprobante por WhatsApp.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
            className="payment-grid"
          >
            {[
              { t: "Transferencia",         d: "BBVA, Banamex, Santander · Cuenta proporcionada por WhatsApp", icon: "🏦" },
              { t: "Depósito en efectivo",  d: "OXXO, BBVA, sucursales bancarias",                             icon: "💵" },
              { t: "Efectivo a la entrega", d: "Solo para entregas en persona dentro de CDMX",                  icon: "💳" },
            ].map((m) => (
              <div
                key={m.t}
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding: 28,
                  textAlign: "center",
                  border: "1px solid var(--color-line)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>{m.icon}</div>
                <h4 style={{ marginBottom: 6, color: "var(--color-ink)" }}>{m.t}</h4>
                <p style={{ fontSize: 14, color: "var(--color-ink-soft)", margin: 0 }}>{m.d}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .payment-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <CTAClose />
    </>
  );
}
