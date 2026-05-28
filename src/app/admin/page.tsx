"use client";

import { useState, useMemo } from "react";
import { products, seasons, categoryMeta } from "@/lib/data";

// ── Simulated analytics ───────────────────────────────────────
function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5;
    return (s >>> 0) / 0xffffffff;
  };
}

function genDaily(days: number, base: number, variance: number) {
  const rng = seededRng(days * 7919 + base);
  const now = new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (days - 1 - i));
    const label = `${d.getDate()}/${d.getMonth() + 1}`;
    return {
      label,
      visits:    Math.round(base + rng() * variance),
      whatsapp:  Math.round(base * 0.18 + rng() * (variance * 0.1)),
      instagram: Math.round(base * 0.35 + rng() * (variance * 0.15)),
      facebook:  Math.round(base * 0.12 + rng() * (variance * 0.06)),
      tiktok:    Math.round(base * 0.08 + rng() * (variance * 0.05)),
    };
  });
}

const RANGES = [
  { label: "7 días",  days: 7  },
  { label: "30 días", days: 30 },
  { label: "90 días", days: 90 },
];

// ── Mini sparkline SVG ────────────────────────────────────────
function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values, 1);
  const w = 80, h = 28;
  const step = w / (values.length - 1 || 1);
  const pts = values.map((v, i) => `${i * step},${h - (v / max) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Area chart ────────────────────────────────────────────────
function AreaChart({ data }: { data: ReturnType<typeof genDaily> }) {
  const values = data.map((d) => d.visits);
  const max = Math.max(...values, 1);
  const W = 600, H = 140;
  const step = W / (values.length - 1 || 1);
  const pts = values.map((v, i) => `${i * step},${H - (v / max) * (H - 12) - 6}`).join(" ");
  const area = `0,${H} ${pts} ${W},${H}`;
  const ticks = data.filter((_, i) => i % Math.ceil(data.length / 7) === 0);

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg viewBox={`0 0 ${W} ${H + 24}`} style={{ width: "100%", minWidth: 300 }}>
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5C3A8C" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#5C3A8C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#ag)" />
        <polyline points={pts} fill="none" stroke="#5C3A8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {ticks.map((d, i) => {
          const idx = data.indexOf(d);
          return (
            <text key={i} x={idx * step} y={H + 18} textAnchor="middle" fontSize="9" fill="rgba(30,15,60,.4)">
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// ── KPI card ──────────────────────────────────────────────────
function KpiCard({
  label, value, delta, color, sparkValues,
}: {
  label: string; value: number; delta: number; color: string; sparkValues: number[];
}) {
  const up = delta >= 0;
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: "20px 22px",
        border: "1px solid #ECE4F4",
        boxShadow: "0 1px 4px rgba(92,58,140,.06)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(30,15,60,.45)", letterSpacing: ".04em", textTransform: "uppercase" }}>
          {label}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: up ? "#14532D" : "#7F1D1D",
            background: up ? "#DCFCE7" : "#FECACA",
            padding: "3px 8px",
            borderRadius: 999,
          }}
        >
          {up ? "▲" : "▼"} {Math.abs(delta)}%
        </span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#1E0F3C", lineHeight: 1 }} suppressHydrationWarning>
        {value.toLocaleString("es-MX")}
      </div>
      <Sparkline values={sparkValues} color={color} />
    </div>
  );
}

// ── Social row ────────────────────────────────────────────────
function SocialBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 600, width: 80, color: "rgba(30,15,60,.55)", flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, background: "#F0EBF8", borderRadius: 999, height: 8 }}>
        <div style={{ width: `${pct}%`, background: color, borderRadius: 999, height: "100%", transition: "width .4s" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#1E0F3C", width: 40, textAlign: "right" }} suppressHydrationWarning>{value.toLocaleString("es-MX")}</span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function AdminDashboard() {
  const [rangeIdx, setRangeIdx] = useState(1);
  const { days } = RANGES[rangeIdx];

  const data = useMemo(() => genDaily(days, 120, 80), [days]);

  const totalVisits  = data.reduce((s, d) => s + d.visits,    0);
  const totalWa      = data.reduce((s, d) => s + d.whatsapp,  0);
  const totalIg      = data.reduce((s, d) => s + d.instagram, 0);
  const totalFb      = data.reduce((s, d) => s + d.facebook,  0);
  const totalTt      = data.reduce((s, d) => s + d.tiktok,    0);

  const maxSocial = Math.max(totalWa, totalIg, totalFb, totalTt, 1);

  const upcoming = seasons.slice(0, 4);

  const topPages = [
    { page: "/catalogo",           visits: Math.round(totalVisits * 0.38) },
    { page: "/",                   visits: Math.round(totalVisits * 0.28) },
    { page: "/proceso",            visits: Math.round(totalVisits * 0.14) },
    { page: "/catalogo/playeras",  visits: Math.round(totalVisits * 0.12) },
    { page: "/catalogo/tazas",     visits: Math.round(totalVisits * 0.08) },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1E0F3C" }}>Dashboard</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(30,15,60,.45)" }}>Resumen de actividad del sitio</p>
        </div>
        {/* Range selector */}
        <div style={{ display: "flex", gap: 4, background: "white", border: "1px solid #ECE4F4", borderRadius: 12, padding: 4 }}>
          {RANGES.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setRangeIdx(i)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                background: rangeIdx === i ? "#5C3A8C" : "transparent",
                color: rangeIdx === i ? "white" : "rgba(30,15,60,.5)",
                border: "none",
                cursor: "pointer",
                transition: "background .12s",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="kpi-grid">
        <KpiCard label="Visitas"   value={totalVisits} delta={12} color="#5C3A8C" sparkValues={data.map((d) => d.visits)} />
        <KpiCard label="WhatsApp"  value={totalWa}     delta={8}  color="#25D366" sparkValues={data.map((d) => d.whatsapp)} />
        <KpiCard label="Instagram" value={totalIg}     delta={-3} color="#E1306C" sparkValues={data.map((d) => d.instagram)} />
        <KpiCard label="Productos" value={products.length} delta={0} color="#FFD84D" sparkValues={[products.length]} />
      </div>

      {/* Chart + Social */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }} className="chart-social">
        {/* Area chart */}
        <div style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid #ECE4F4", boxShadow: "0 1px 4px rgba(92,58,140,.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1E0F3C" }}>Visitas diarias</span>
            <span style={{ fontSize: 12, color: "rgba(30,15,60,.4)" }}>Últimos {days} días</span>
          </div>
          <AreaChart data={data} />
        </div>

        {/* Social breakdown */}
        <div style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid #ECE4F4", boxShadow: "0 1px 4px rgba(92,58,140,.06)" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#1E0F3C", display: "block", marginBottom: 20 }}>Canales</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SocialBar label="WhatsApp"  value={totalWa}  max={maxSocial} color="#25D366" />
            <SocialBar label="Instagram" value={totalIg}  max={maxSocial} color="#E1306C" />
            <SocialBar label="Facebook"  value={totalFb}  max={maxSocial} color="#1877F2" />
            <SocialBar label="TikTok"    value={totalTt}  max={maxSocial} color="#000000" />
          </div>
        </div>
      </div>

      {/* Top pages + Upcoming seasons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }} className="bottom-grid">
        {/* Top pages */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #ECE4F4", boxShadow: "0 1px 4px rgba(92,58,140,.06)", overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #F0EBF8" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1E0F3C" }}>Páginas más visitadas</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAFA" }}>
                <th style={{ padding: "10px 24px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "rgba(30,15,60,.4)", letterSpacing: ".06em", textTransform: "uppercase" }}>Página</th>
                <th style={{ padding: "10px 24px", textAlign: "right", fontSize: 11, fontWeight: 700, color: "rgba(30,15,60,.4)", letterSpacing: ".06em", textTransform: "uppercase" }}>Visitas</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((p, i) => (
                <tr key={p.page} style={{ borderTop: i > 0 ? "1px solid #F0EBF8" : "none" }}>
                  <td style={{ padding: "13px 24px", fontSize: 13, color: "#1E0F3C", fontFamily: "monospace" }}>{p.page}</td>
                  <td style={{ padding: "13px 24px", textAlign: "right", fontSize: 13, fontWeight: 700, color: "#5C3A8C" }}>{p.visits.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upcoming seasons */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #ECE4F4", boxShadow: "0 1px 4px rgba(92,58,140,.06)", overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #F0EBF8" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1E0F3C" }}>Próximas temporadas</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {upcoming.map((s, i) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 20px",
                  borderTop: i > 0 ? "1px solid #F0EBF8" : "none",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: s.tint,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  {s.emoji}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1E0F3C" }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "rgba(30,15,60,.45)", marginTop: 2 }}>{s.month}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary chips */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Productos",   count: products.length,    color: "#5C3A8C" },
          { label: "Categorías",  count: categoryMeta.length, color: "#9D6BAA" },
          { label: "Temporadas",  count: seasons.length,     color: "#CAB0EC" },
        ].map((c) => (
          <div
            key={c.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              background: "white",
              borderRadius: 12,
              border: "1px solid #ECE4F4",
              fontSize: 13,
            }}
          >
            <span
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: c.color, flexShrink: 0,
              }}
            />
            <span style={{ fontWeight: 600, color: "#1E0F3C" }}>{c.count}</span>
            <span style={{ color: "rgba(30,15,60,.5)" }}>{c.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .kpi-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .chart-social, .bottom-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
