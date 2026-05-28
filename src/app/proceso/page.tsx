"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkle } from "@/components/ui/Icons";
import { CompraTab } from "@/components/proceso/CompraTab";
import { CancelacionTab } from "@/components/proceso/CancelacionTab";
import { FaqTab } from "@/components/proceso/FaqTab";

const TABS = [
  { id: "compra",      label: "Proceso de compra" },
  { id: "cancelacion", label: "Cancelaciones" },
  { id: "faq",         label: "Preguntas frecuentes" },
] as const;

type TabId = typeof TABS[number]["id"];

export default function ProcesoPage() {
  return (
    <Suspense fallback={null}>
      <ProcesoContent />
    </Suspense>
  );
}

function ProcesoContent() {
  const searchParams = useSearchParams();
  const initial = (searchParams.get("tab") ?? "compra") as TabId;
  const [tab, setTab] = useState<TabId>(
    TABS.some((t) => t.id === initial) ? initial : "compra"
  );

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, var(--color-lilac-100) 0%, #ffffff 100%)",
          paddingBlock: "80px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative sparkles */}
        <div
          className="sparkle-anim"
          style={{
            position: "absolute",
            top: "15%",
            right: "6%",
            color: "var(--color-yellow-400)",
            pointerEvents: "none",
          }}
        >
          <Sparkle size={48} />
        </div>
        <div
          className="sparkle-anim"
          style={{
            position: "absolute",
            bottom: "20%",
            left: "4%",
            color: "var(--color-yellow-400)",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        >
          <Sparkle size={28} />
        </div>

        <div
          style={{
            width: "min(720px, 100% - 32px)",
            marginInline: "auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--color-lilac-600)",
            }}
          >
            <Sparkle size={10} /> Cómo trabajamos contigo
          </span>
          <h1 style={{ marginTop: 12, marginBottom: 16, color: "var(--color-ink)" }}>
            Tu pedido{" "}
            <span
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-lilac-700)",
                fontSize: "1.1em",
              }}
            >
              paso a paso
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--color-ink-soft)", margin: 0 }}>
            Para que todo salga perfecto, así es como producimos tu pedido personalizado.
          </p>
        </div>
      </section>

      {/* Sticky tabs */}
      <section
        style={{
          borderBottom: "1px solid var(--color-line)",
          background: "white",
          position: "sticky",
          top: 73,
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: "min(1240px, 100% - 32px)",
            marginInline: "auto",
            display: "flex",
            gap: 4,
            overflowX: "auto",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "16px 24px",
                fontWeight: 700,
                fontSize: 14,
                color: tab === t.id ? "var(--color-lilac-700)" : "var(--color-ink-soft)",
                marginBottom: -1,
                background: "none",
                border: "none",
                borderBottomWidth: 3,
                borderBottomStyle: "solid",
                borderBottomColor: tab === t.id ? "var(--color-lilac-700)" : "transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color .15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {tab === "compra"      && <CompraTab />}
      {tab === "cancelacion" && <CancelacionTab />}
      {tab === "faq"         && <FaqTab />}

      <style>{`
        @keyframes sparkle-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(15deg); }
        }
        .sparkle-anim { animation: sparkle-float 4s ease-in-out infinite; }
      `}</style>
    </main>
  );
}
