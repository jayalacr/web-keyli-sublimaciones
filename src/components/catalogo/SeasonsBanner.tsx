"use client";

import Link from "next/link";
import { seasons } from "@/lib/data";

const treatments: Record<string, { from: string; to: string; subtitle: string }> = {
  madres:       { from: "#3A1A2E", to: "#5C3A8C", subtitle: "Tazas y cuadros sublimados" },
  padres:       { from: "#1E2A4E", to: "#3E4E7C", subtitle: "Termos y playeras DTF" },
  ninos:        { from: "#1F4F4A", to: "#2A6E8C", subtitle: "Prendas DTF y puzzles" },
  maestros:     { from: "#2F4A2A", to: "#3E6E47", subtitle: "Tazas y detalles de fin de ciclo" },
  valentin:     { from: "#4A1E2E", to: "#A14060", subtitle: "Llaveros y tazas para parejas" },
  navidad:      { from: "#2A1E3E", to: "#5C3A8C", subtitle: "Esferas y regalos especiales" },
  muertos:      { from: "#3A1A4E", to: "#7C4FB8", subtitle: "Diseños conmemorativos" },
  graduaciones: { from: "#2A1E4E", to: "#7C57BD", subtitle: "Llaveros y uniformes" },
  xv:           { from: "#3E1F5C", to: "#9D6FD4", subtitle: "Recuerdos y detalles VIP" },
  babyshower:   { from: "#4A3A2A", to: "#A18560", subtitle: "Detalles tiernos personalizados" },
};

export function SeasonsBanner() {
  return (
    <section style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 18 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "var(--color-lilac-600)",
          }}
        >
          Temporadas especiales
        </span>
        <h2 style={{ marginTop: 4, marginBottom: 0, fontSize: 26, color: "var(--color-ink)" }}>
          Momentos{" "}
          <span style={{ fontFamily: "var(--font-display)", color: "var(--color-lilac-700)", fontSize: "1.1em" }}>
            Personalizados
          </span>
        </h2>
      </div>

      <div className="seasons-banner-scroll">
        {seasons.map((s) => {
          const t = treatments[s.id] ?? { from: "#3A2A5C", to: "#5C3A8C", subtitle: "" };
          return (
            <Link
              key={s.id}
              href={`/catalogo?season=${s.id}`}
              className="season-banner-card"
            >
              <div
                className="season-banner-image"
                style={{
                  background: `linear-gradient(150deg, ${t.from} 0%, ${t.to} 100%)`,
                }}
              >
                <div className="season-banner-overlay">
                  <h3 className="season-banner-title">{s.label}</h3>
                  <p className="season-banner-sub">{t.subtitle}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        .seasons-banner-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 14px;
          margin: 0 -4px;
          padding-inline: 4px;
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
          scrollbar-color: var(--color-lilac-300) transparent;
        }
        .seasons-banner-scroll::-webkit-scrollbar { height: 8px; }
        .seasons-banner-scroll::-webkit-scrollbar-track {
          background: var(--color-lilac-50);
          border-radius: 999px;
        }
        .seasons-banner-scroll::-webkit-scrollbar-thumb {
          background: var(--color-lilac-300);
          border-radius: 999px;
        }
        .season-banner-card {
          display: block;
          flex: 0 0 280px;
          border-radius: 18px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          scroll-snap-align: start;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .season-banner-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 36px -16px rgba(92,58,140,.35);
        }
        .season-banner-image {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .season-banner-overlay {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 16px 18px;
          background: linear-gradient(0deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,.15) 70%, transparent 100%);
          color: white;
          pointer-events: none;
        }
        .season-banner-title {
          color: white;
          font-size: 20px;
          margin: 0 0 4px;
          line-height: 1.1;
        }
        .season-banner-sub {
          font-size: 12.5px;
          color: rgba(255,255,255,.85);
          margin: 0;
          line-height: 1.35;
        }
        @media (max-width: 720px) {
          .season-banner-card { flex-basis: 240px; }
        }
      `}</style>
    </section>
  );
}
