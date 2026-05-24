"use client";

import { ProductIcon } from "@/components/ui/ProductIcon";
import { Sparkle, ArrowRight } from "@/components/ui/Icons";
import { techniques } from "@/lib/data";
import type { CategoryMeta, Product } from "@/types";

interface CategoryEntry {
  meta: CategoryMeta;
  items: Product[];
  count: number;
  priceFrom: number | null;
}

interface CategoryCardProps {
  entry: CategoryEntry;
  onOpen: () => void;
}

export function CategoryCard({ entry, onOpen }: CategoryCardProps) {
  const { meta, items, count, priceFrom } = entry;
  const examples = items.length ? items.slice(0, 3) : [];
  const techniqueLabels = meta.techniques
    .map((t) => techniques.find((x) => x.id === t)?.label)
    .filter(Boolean) as string[];

  return (
    <article
      className="category-card"
      onClick={onOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); }
      }}
      style={{ cursor: "pointer", outline: "none" }}
    >
      {/* Hero */}
      <div
        className="category-card-hero"
        style={{
          background: `linear-gradient(140deg, ${meta.gradient[0]} 0%, ${meta.gradient[1]} 100%)`,
          position: "relative",
          aspectRatio: "16/9",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ProductIcon kind={meta.icon} gradient={meta.gradient} />
        <span
          className="category-card-tag"
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            fontWeight: 700,
            padding: "5px 10px",
            borderRadius: 999,
            background: "rgba(255,255,255,.88)",
            color: "var(--color-lilac-900)",
          }}
        >
          <Sparkle size={11} color="var(--color-yellow-400)" />
          Personalizable
        </span>
      </div>

      {/* Inspiration mosaic */}
      {examples.length > 0 && (
        <div
          className="category-card-mosaic"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 4,
            padding: "4px 4px 0",
          }}
        >
          {examples.map((p) => (
            <div
              key={p.id}
              style={{
                aspectRatio: "1/1",
                borderRadius: 8,
                overflow: "hidden",
                background: `linear-gradient(135deg, ${p.gradient[0]} 0%, ${p.gradient[1]} 100%)`,
                position: "relative",
              }}
            >
              <ProductIcon kind={p.icon} gradient={p.gradient} size={60} />
            </div>
          ))}
        </div>
      )}

      {/* Body */}
      <div style={{ padding: "14px 16px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--color-ink)" }}>
          {meta.label}
        </h3>
        <p style={{ margin: 0, fontSize: 12.5, color: "var(--color-lilac-700)", fontStyle: "italic", fontWeight: 600 }}>
          {meta.tagline}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 2 }}>
          {techniqueLabels.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 9px",
                borderRadius: 999,
                background: "var(--color-lilac-50)",
                color: "var(--color-lilac-700)",
                border: "1px solid var(--color-lilac-200)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 16px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--color-line)",
          marginTop: "auto",
        }}
      >
        <div style={{ fontSize: 12.5, color: "var(--color-ink-soft)" }}>
          {priceFrom != null && (
            <span>
              Desde <strong style={{ color: "var(--color-ink)" }}>${priceFrom}</strong> MXN
            </span>
          )}
          {count > 0 && (
            <span style={{ color: "var(--color-ink-faint)", marginLeft: 6 }}>
              · {count} {count === 1 ? "estilo" : "estilos"}
            </span>
          )}
          {count === 0 && <span style={{ color: "var(--color-ink-faint)" }}>A la medida</span>}
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12.5,
            fontWeight: 700,
            color: "var(--color-lilac-700)",
          }}
        >
          Ver ejemplos
          <ArrowRight size={14} />
        </span>
      </div>

      <style>{`
        .category-card {
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 20px;
          border: 1px solid var(--color-line);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px -16px rgba(92,58,140,.28), 0 6px 16px -8px rgba(92,58,140,.10);
          border-color: var(--color-lilac-300);
        }
        .category-card:focus-visible {
          outline: 2px solid var(--color-lilac-500);
          outline-offset: 2px;
        }
      `}</style>
    </article>
  );
}
