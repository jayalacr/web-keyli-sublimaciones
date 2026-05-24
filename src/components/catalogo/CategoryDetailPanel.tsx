"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { Sparkle, XClose, WhatsAppGlyph } from "@/components/ui/Icons";
import { products, techniques, seasons } from "@/lib/data";
import { waLink } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import type { CategoryMeta, Product } from "@/types";

interface CategoryEntry {
  meta: CategoryMeta;
  items: Product[];
}

interface CategoryDetailPanelProps {
  entry: CategoryEntry | null;
  open: boolean;
  onClose: () => void;
  season: string;
}

export function CategoryDetailPanel({ entry, open, onClose, season }: CategoryDetailPanelProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!entry) return null;

  const { meta } = entry;
  const techniqueRows = meta.techniques
    .map((tid) => techniques.find((x) => x.id === tid))
    .filter(Boolean) as typeof techniques;

  const allItems = products.filter((p) => p.category === meta.label);
  const seasonObj = season ? seasons.find((s) => s.id === season) : null;

  const allSizes = Array.from(new Set(allItems.flatMap((p) => p.sizes)));
  const allColors = Array.from(new Set(allItems.flatMap((p) => p.colors)));
  const priceFrom = allItems.length ? Math.min(...allItems.map((p) => p.priceFrom)) : null;
  const priceTo = allItems.length ? Math.max(...allItems.map((p) => p.priceFrom)) : null;

  const waText = `Hola Keyli, quiero cotizar un pedido de ${meta.label.toLowerCase()}.\n\nMi idea: [describe o adjunta imagen]\n${seasonObj ? `Para: ${seasonObj.label}\n` : ""}Cantidad estimada: [ej. 5 piezas]`;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(30,10,50,.45)",
          backdropFilter: "blur(2px)",
          zIndex: 40,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .25s ease",
        }}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={meta.label}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(480px, 100vw)",
          background: "var(--color-paper)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-12px 0 48px -8px rgba(92,58,140,.22)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .3s cubic-bezier(.32,0,.15,1)",
          overflowY: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "24px 24px 20px",
            borderBottom: "1px solid var(--color-line)",
            flexShrink: 0,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--color-lilac-600)",
              }}
            >
              Categoría
            </span>
            <h2 style={{ margin: "4px 0 0", fontSize: 22, color: "var(--color-ink)" }}>{meta.label}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--color-lilac-50)",
              border: "1px solid var(--color-line)",
              display: "grid",
              placeItems: "center",
              color: "var(--color-ink-soft)",
              flexShrink: 0,
              marginTop: 4,
            }}
          >
            <XClose size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 0 8px" }}>
          {/* Hero */}
          <div
            style={{
              background: `linear-gradient(140deg, ${meta.gradient[0]} 0%, ${meta.gradient[1]} 100%)`,
              aspectRatio: "16/7",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <ProductIcon kind={meta.icon} gradient={meta.gradient} />
            <span
              style={{
                position: "absolute",
                bottom: 14,
                left: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 700,
                padding: "5px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,.88)",
                color: "var(--color-lilac-900)",
              }}
            >
              <Sparkle size={11} color="var(--color-yellow-400)" />
              100% personalizable
            </span>
          </div>

          {/* Tagline + desc */}
          <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--color-line-soft)" }}>
            <p style={{ margin: "0 0 8px", fontStyle: "italic", fontWeight: 600, color: "var(--color-lilac-700)", fontSize: 14 }}>
              {meta.tagline}
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "var(--color-ink-soft)", lineHeight: 1.6 }}>
              {meta.desc}
            </p>
          </div>

          {/* Inspiration chips */}
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--color-line-soft)" }}>
            <h4 style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--color-ink-faint)" }}>
              Lo que más nos piden
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {meta.inspiration.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "var(--color-lilac-50)",
                    color: "var(--color-lilac-800)",
                    border: "1px solid var(--color-lilac-200)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Techniques */}
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--color-line-soft)" }}>
            <h4 style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--color-ink-faint)" }}>
              Técnicas que usamos
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {techniqueRows.map((t) => (
                <div
                  key={t.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "var(--color-lilac-50)",
                    border: "1px solid var(--color-lilac-100)",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--color-lilac-500)",
                      flexShrink: 0,
                      marginTop: 5,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 2, color: "var(--color-ink)" }}>{t.label}</div>
                    <div style={{ fontSize: 12.5, color: "var(--color-ink-soft)", lineHeight: 1.45 }}>{t.tagline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          {(allSizes.length > 0 || allColors.length > 0) && (
            <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--color-line-soft)" }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--color-ink-faint)" }}>
                Tamaños y colores
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {allSizes.length > 0 && (
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-ink-faint)", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 7 }}>
                      Tamaños / tallas
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {allSizes.slice(0, 10).map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "4px 10px",
                            borderRadius: 8,
                            background: "white",
                            color: "var(--color-ink-soft)",
                            border: "1px solid var(--color-line)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {allColors.length > 0 && (
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-ink-faint)", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 7 }}>
                      Colores disponibles
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {allColors.slice(0, 10).map((c) => (
                        <span
                          key={c}
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "4px 10px",
                            borderRadius: 8,
                            background: "white",
                            color: "var(--color-ink-soft)",
                            border: "1px solid var(--color-line)",
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Gallery */}
          {allItems.length > 0 && (
            <div style={{ padding: "16px 24px" }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--color-ink-faint)" }}>
                Inspiración de otros pedidos
                <span style={{ fontSize: 11, color: "var(--color-ink-faint)", fontWeight: 500, textTransform: "none", letterSpacing: 0, marginLeft: 8 }}>
                  {allItems.length} {allItems.length === 1 ? "ejemplo" : "ejemplos"}
                </span>
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {allItems.map((p) => (
                  <Link
                    key={p.id}
                    href={`/catalogo/${slugify(p.name)}`}
                    onClick={onClose}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "10px 12px",
                      borderRadius: 14,
                      background: "var(--color-lilac-50)",
                      border: "1px solid var(--color-lilac-100)",
                      textDecoration: "none",
                      color: "inherit",
                      transition: "background .15s",
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 12,
                        overflow: "hidden",
                        flexShrink: 0,
                        background: `linear-gradient(135deg, ${p.gradient[0]} 0%, ${p.gradient[1]} 100%)`,
                        position: "relative",
                      }}
                    >
                      <ProductIcon kind={p.icon} gradient={p.gradient} size={56} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--color-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--color-ink-soft)", marginTop: 2 }}>
                        Desde ${p.priceFrom} MXN
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 24px",
            borderTop: "1px solid var(--color-line)",
            flexShrink: 0,
            background: "var(--color-paper)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {priceFrom != null ? (
              <>
                <span style={{ fontSize: 11, color: "var(--color-ink-faint)", textTransform: "uppercase", letterSpacing: ".08em" }}>Rango</span>
                <span style={{ fontWeight: 700, color: "var(--color-ink)", fontSize: 16 }}>
                  ${priceFrom}{priceTo !== priceFrom ? ` – $${priceTo}` : ""} MXN
                </span>
              </>
            ) : (
              <span style={{ fontSize: 13, color: "var(--color-ink-soft)" }}>Cotizamos a medida</span>
            )}
          </div>
          <a
            href={waLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "13px 20px",
              borderRadius: 999,
              background: "#25D366",
              color: "white",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 4px 14px -4px rgba(37,211,102,.5)",
            }}
          >
            <WhatsAppGlyph size={18} /> Cotizar mi diseño
          </a>
        </div>
      </aside>
    </>
  );
}
