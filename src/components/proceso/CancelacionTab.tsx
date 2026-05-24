import { cancellationPolicy } from "@/lib/data";

const toneStyles = {
  ok:     { bg: "#DCFCE7", text: "#14532D", border: "#86EFAC", icon: "✓" },
  warn:   { bg: "#FEF3C7", text: "#78350F", border: "#FCD34D", icon: "!" },
  danger: { bg: "#FECACA", text: "#7F1D1D", border: "#F87171", icon: "×" },
} as const;

export function CancelacionTab() {
  return (
    <section style={{ paddingBlock: "56px 72px" }}>
      <div style={{ width: "min(920px, 100% - 32px)", marginInline: "auto" }}>
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 12, color: "var(--color-ink)" }}>
            Política de cancelaciones y cambios
          </h2>
          <p style={{ fontSize: 16, color: "var(--color-ink-soft)", lineHeight: 1.6, margin: 0 }}>
            Trabajamos con producción bajo pedido: cada diseño es único. Por eso las reglas de cancelación
            dependen del momento en que solicites cancelar.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 32 }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 11,
              top: 8,
              bottom: 8,
              width: 2,
              background: "var(--color-lilac-200)",
            }}
          />

          {cancellationPolicy.map((c, i) => {
            const tone = toneStyles[c.tone ?? "warn"];
            return (
              <div key={i} style={{ position: "relative", paddingBottom: 32 }}>
                {/* Circle marker */}
                <div
                  style={{
                    position: "absolute",
                    left: -32,
                    top: 4,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: tone.bg,
                    border: `2px solid ${tone.border}`,
                    display: "grid",
                    placeItems: "center",
                    color: tone.text,
                    fontWeight: 800,
                    fontSize: 14,
                    lineHeight: 1,
                  }}
                >
                  {tone.icon}
                </div>

                {/* Card */}
                <div
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: 24,
                    border: "1px solid var(--color-line)",
                    borderLeft: `4px solid ${tone.border}`,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 16,
                      marginBottom: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <h4 style={{ margin: 0, color: "var(--color-ink)" }}>{c.title}</h4>
                    {c.status && (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "5px 12px",
                          borderRadius: 999,
                          background: tone.bg,
                          color: tone.text,
                          border: `1px solid ${tone.border}`,
                          flexShrink: 0,
                        }}
                      >
                        {c.status}
                      </span>
                    )}
                  </div>
                  <p style={{ color: "var(--color-ink-soft)", lineHeight: 1.5, margin: 0 }}>
                    {c.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
