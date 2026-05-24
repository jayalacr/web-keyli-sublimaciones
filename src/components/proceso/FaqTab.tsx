"use client";

import { useState } from "react";
import { ChevronDown, WhatsAppGlyph } from "@/components/ui/Icons";
import { faqs } from "@/lib/data";
import { waLink } from "@/lib/constants";

export function FaqTab() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section style={{ paddingBlock: "56px 72px" }}>
      <div style={{ width: "min(800px, 100% - 32px)", marginInline: "auto" }}>
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 12, color: "var(--color-ink)" }}>Preguntas frecuentes</h2>
          <p style={{ fontSize: 16, color: "var(--color-ink-soft)", margin: 0 }}>
            Lo que la mayoría nos pregunta. Si tu duda no aparece, pregúntanos por WhatsApp.
          </p>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid var(--color-line)",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {faqs.map((f, i) => (
            <div
              key={i}
              style={{
                borderBottom:
                  i < faqs.length - 1 ? "1px solid var(--color-lilac-100)" : "none",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-ink)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span>{f.q}</span>
                <span
                  style={{
                    transition: "transform .2s",
                    transform: open === i ? "rotate(180deg)" : "rotate(0)",
                    color: "var(--color-lilac-700)",
                    flexShrink: 0,
                  }}
                >
                  <ChevronDown size={20} />
                </span>
              </button>

              {open === i && (
                <div
                  style={{
                    padding: "0 24px 24px",
                    color: "var(--color-ink-soft)",
                    lineHeight: 1.6,
                    fontSize: 15,
                  }}
                >
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ color: "var(--color-ink-soft)", marginBottom: 16 }}>
            ¿No encontraste tu respuesta?
          </p>
          <a
            href={waLink("Hola Keyli, tengo una duda.")}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 999,
              background: "#25D366",
              color: "white",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 4px 14px -4px rgba(37,211,102,.5)",
            }}
          >
            <WhatsAppGlyph size={16} /> Pregúntanos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
