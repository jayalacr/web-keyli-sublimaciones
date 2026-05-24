"use client";

import { Suspense, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkle, Search, XClose, WhatsAppGlyph } from "@/components/ui/Icons";
import { Shirt, Mug, Bottle, Key, Tag } from "@/components/ui/ProductIcon";
import { SeasonsBanner } from "@/components/catalogo/SeasonsBanner";
import { CategoryCard } from "@/components/catalogo/CategoryCard";
import { CategoryDetailPanel } from "@/components/catalogo/CategoryDetailPanel";
import { categoryMeta, products, seasons } from "@/lib/data";
import { waLink } from "@/lib/constants";
import type { CategoryMeta, Product } from "@/types";

interface CategoryEntry {
  meta: CategoryMeta;
  items: Product[];
  count: number;
  priceFrom: number | null;
}

function catIcon(icon: string) {
  if (icon === "shirt")  return <Shirt  size={18} />;
  if (icon === "mug")    return <Mug    size={18} />;
  if (icon === "bottle") return <Bottle size={18} />;
  if (icon === "key")    return <Key    size={18} />;
  if (icon === "tag")    return <Tag    size={18} />;
  return <Sparkle size={14} />;
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={null}>
      <CatalogoContent />
    </Suspense>
  );
}

function CatalogoContent() {
  const searchParams = useSearchParams();
  const initialSeason = searchParams.get("season") ?? "";
  const initialFilter = searchParams.get("filter") ?? "";

  const [season, setSeason] = useState(initialSeason);
  const [catFilter, setCatFilter] = useState(initialFilter);
  const [search, setSearch] = useState("");
  const [openCatId, setOpenCatId] = useState<string>("");

  const categoryEntries = useMemo((): CategoryEntry[] => {
    return categoryMeta.map((meta) => {
      let items = products.filter((p) => p.category === meta.label);
      if (season) items = items.filter((p) => p.seasons.includes(season));
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(
          (p) => p.name.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q)
        );
      }
      const prices = items.map((p) => p.priceFrom);
      return {
        meta,
        items,
        count: items.length,
        priceFrom: prices.length ? Math.min(...prices) : null,
      };
    });
  }, [season, search]);

  const activeSeason = seasons.find((s) => s.id === season);
  const activeCatMeta = categoryMeta.find((c) => c.id === catFilter);
  const hasAnyFilter = season || search || catFilter;

  let visibleCategories = season
    ? categoryEntries.filter((e) => e.count > 0)
    : categoryEntries;
  if (catFilter) {
    visibleCategories = visibleCategories.filter((e) => e.meta.id === catFilter);
  }

  const activeEntry = useMemo(() => {
    if (!openCatId) return null;
    const entry = categoryEntries.find((e) => e.meta.id === openCatId);
    if (entry) return entry;
    const meta = categoryMeta.find((m) => m.id === openCatId);
    if (!meta) return null;
    return {
      meta,
      items: products.filter((p) => p.category === meta.label),
      count: 0,
      priceFrom: null,
    };
  }, [openCatId, categoryEntries]);

  const closePanel = useCallback(() => setOpenCatId(""), []);

  return (
    <main>
      {/* Catalog header */}
      <section
        style={{
          background: activeSeason
            ? `linear-gradient(180deg, ${activeSeason.tint} 0%, #ffffff 100%)`
            : "linear-gradient(180deg, var(--color-lilac-50) 0%, #ffffff 100%)",
          paddingBlock: "48px 24px",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}>
          {/* Breadcrumbs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12, fontSize: 13, color: "var(--color-ink-soft)" }}>
            <Link href="/" style={{ color: "var(--color-lilac-700)" }}>Inicio</Link>
            <span>/</span>
            <span>Catálogo</span>
            {activeSeason && (
              <>
                <span>/</span>
                <span style={{ color: "var(--color-lilac-700)", fontWeight: 600 }}>{activeSeason.label}</span>
              </>
            )}
            {activeCatMeta && (
              <>
                <span>/</span>
                <span style={{ color: "var(--color-lilac-700)", fontWeight: 600 }}>{activeCatMeta.label}</span>
              </>
            )}
          </div>

          {activeSeason ? (
            <>
              <h1 style={{ marginBottom: 8, color: "var(--color-ink)" }}>{activeSeason.label}</h1>
              <p style={{ fontSize: 17, color: "var(--color-ink-soft)", maxWidth: 600 }}>
                Edición especial · {activeSeason.month}. Mira qué categorías personalizamos para esta temporada.
              </p>
            </>
          ) : (
            <>
              <h1 style={{ marginBottom: 8, color: "var(--color-ink)" }}>
                Catálogo{" "}
                <span style={{ fontFamily: "var(--font-display)", color: "var(--color-lilac-700)", fontSize: "1.1em" }}>
                  completo
                </span>
              </h1>
              <p style={{ fontSize: 17, color: "var(--color-ink-soft)", maxWidth: 600 }}>
                Elige una categoría para ver ejemplos e inspiración. Todo es{" "}
                <strong style={{ color: "var(--color-lilac-700)" }}>100% personalizable</strong>.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Body: sidebar + main */}
      <section style={{ paddingBlock: 36 }}>
        <div style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}>
          <div className="catalog-layout">
            {/* Sidebar */}
            <aside className="catalog-sidebar">
              {/* Categories */}
              <div className="filter-group">
                <h5 className="filter-label">Categorías</h5>
                <button
                  className={"filter-item" + (catFilter === "" ? " is-active" : "")}
                  onClick={() => setCatFilter("")}
                >
                  <span className="filter-item-ico"><Sparkle size={14} /></span>
                  <span>Todas las categorías</span>
                </button>
                {categoryMeta.map((c) => {
                  const isActive = catFilter === c.id;
                  return (
                    <button
                      key={c.id}
                      className={"filter-item filter-item--cat" + (isActive ? " is-active" : "")}
                      onClick={() => setCatFilter(isActive ? "" : c.id)}
                    >
                      <span
                        className="filter-item-ico filter-cat-glyph"
                        style={{
                          background: isActive
                            ? "rgba(255,255,255,.18)"
                            : `linear-gradient(135deg, ${c.gradient[0]} 0%, ${c.gradient[1]} 100%)`,
                          color: isActive ? "white" : "var(--color-lilac-900)",
                        }}
                      >
                        {catIcon(c.icon)}
                      </span>
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Seasons */}
              <div className="filter-group">
                <h5 className="filter-label">Temporadas</h5>
                <button
                  className={"filter-item" + (season === "" ? " is-active" : "")}
                  onClick={() => setSeason("")}
                >
                  <span className="filter-item-ico"><Sparkle size={14} /></span>
                  <span>Todas las temporadas</span>
                </button>
                {seasons.map((s) => (
                  <button
                    key={s.id}
                    className={"filter-item" + (season === s.id ? " is-active" : "")}
                    onClick={() => setSeason(season === s.id ? "" : s.id)}
                  >
                    <span
                      className="filter-item-ico"
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: s.tint,
                        display: "inline-block",
                      }}
                    />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="filter-group">
                <h5 className="filter-label">Buscar</h5>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-ink-faint)" }}>
                    <Search size={14} />
                  </span>
                  <input
                    placeholder="Buscar inspiración…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 34px",
                      borderRadius: 12,
                      border: "1.5px solid var(--color-line)",
                      fontSize: 13,
                      background: "white",
                      color: "var(--color-ink)",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {hasAnyFilter && (
                <button
                  onClick={() => { setSeason(""); setSearch(""); setCatFilter(""); }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 12px",
                    fontSize: 12.5,
                    color: "var(--color-ink-soft)",
                    alignSelf: "flex-start",
                    borderRadius: 10,
                    background: "var(--color-lilac-50)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <XClose size={12} /> Limpiar filtros
                </button>
              )}

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  padding: 12,
                  background: "var(--color-lilac-50)",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "var(--color-ink-soft)",
                  lineHeight: 1.45,
                }}
              >
                <Sparkle size={12} color="var(--color-yellow-400)" />
                <span>Todo lo que ves se personaliza. Diseñamos contigo desde cero.</span>
              </div>
            </aside>

            {/* Main */}
            <div className="catalog-main">
              {!season && !catFilter && <SeasonsBanner />}

              {/* Section heading */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "16px 0",
                  borderTop: "1px solid var(--color-line)",
                  marginBottom: 22,
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "var(--color-lilac-600)",
                    }}
                  >
                    Categorías
                  </span>
                  <h2 style={{ fontSize: 24, marginTop: 4, marginBottom: 0, color: "var(--color-ink)" }}>
                    {activeCatMeta
                      ? activeCatMeta.label
                      : activeSeason
                      ? `Para ${activeSeason.label.toLowerCase()}`
                      : "Lo que personalizamos"}
                  </h2>
                </div>
                <span style={{ fontSize: 13, color: "var(--color-ink-faint)" }}>
                  {visibleCategories.length}{" "}
                  {visibleCategories.length === 1 ? "categoría" : "categorías"}
                </span>
              </div>

              {visibleCategories.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    background: "var(--color-lilac-50)",
                    borderRadius: 20,
                    border: "1px solid var(--color-lilac-100)",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: "white",
                      border: "1px solid var(--color-lilac-200)",
                      display: "grid",
                      placeItems: "center",
                      margin: "0 auto 16px",
                      color: "var(--color-lilac-500)",
                    }}
                  >
                    <Search size={22} />
                  </div>
                  <h3 style={{ marginBottom: 8, color: "var(--color-ink)" }}>Nada por aquí todavía</h3>
                  <p style={{ marginBottom: 20, color: "var(--color-ink-soft)" }}>
                    Quita un filtro o pídenos un diseño a la medida.
                  </p>
                  <a
                    href={waLink("Hola Keyli, busco algo que no veo en el catálogo.")}
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
                    }}
                  >
                    <WhatsAppGlyph size={16} /> Pedir a la medida
                  </a>
                </div>
              ) : (
                <div className="category-grid">
                  {visibleCategories.map((entry) => (
                    <CategoryCard
                      key={entry.meta.id}
                      entry={entry}
                      onOpen={() => setOpenCatId(entry.meta.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category detail panel */}
      <CategoryDetailPanel
        entry={activeEntry}
        open={!!openCatId}
        onClose={closePanel}
        season={season}
      />

      {/* Custom order banner */}
      <section style={{ padding: "32px 0 80px" }}>
        <div style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}>
          <div
            className="custom-banner"
            style={{
              background: "linear-gradient(135deg, var(--color-lilac-100) 0%, var(--color-yellow-200) 100%)",
              borderRadius: 24,
              padding: "40px 48px",
              display: "grid",
              gridTemplateColumns: "1.4fr auto",
              gap: 32,
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--color-lilac-700)",
                  marginBottom: 8,
                }}
              >
                <Sparkle size={10} /> ¿No ves lo que buscas?
              </span>
              <h3 style={{ marginTop: 0, marginBottom: 8, color: "var(--color-ink)" }}>
                Lo hacemos a la medida.
              </h3>
              <p style={{ maxWidth: 460, color: "var(--color-ink-soft)", fontSize: 15, lineHeight: 1.55, margin: 0 }}>
                Si tienes un diseño, una idea o un evento específico, escríbenos. Cotizamos cualquier producto personalizado.
              </p>
            </div>
            <a
              href={waLink("Hola Keyli, quiero un producto a la medida.")}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "15px 24px",
                borderRadius: 999,
                background: "#25D366",
                color: "white",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 18px -4px rgba(37,211,102,.5)",
              }}
            >
              <WhatsAppGlyph size={18} /> Cotizar a medida
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .catalog-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 36px;
          align-items: start;
        }
        .catalog-sidebar {
          position: sticky;
          top: 96px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .catalog-main { min-width: 0; }

        .filter-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--color-ink-faint);
          margin: 0 0 10px 4px;
        }
        .filter-group { display: flex; flex-direction: column; }

        .filter-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-ink-soft);
          text-align: left;
          background: transparent;
          border: none;
          margin-bottom: 2px;
          transition: background .15s, color .15s;
          cursor: pointer;
          width: 100%;
        }
        .filter-item:hover { background: var(--color-lilac-50); color: var(--color-lilac-700); }
        .filter-item.is-active {
          background: var(--color-lilac-700);
          color: white;
          font-weight: 600;
        }
        .filter-item-ico {
          display: grid;
          place-items: center;
          width: 22px;
          flex-shrink: 0;
        }
        .filter-cat-glyph {
          width: 30px !important;
          height: 30px;
          border-radius: 9px;
          display: grid !important;
          place-items: center;
          transition: background .15s;
        }
        .filter-item--cat { padding-left: 8px; padding-right: 10px; }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        @media (max-width: 1100px) {
          .category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 900px) {
          .catalog-layout { grid-template-columns: 1fr; }
          .catalog-sidebar {
            position: static;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 16px;
          }
          .filter-group { flex: 1 1 240px; min-width: 200px; }
        }
        @media (max-width: 560px) {
          .category-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
          .custom-banner { grid-template-columns: 1fr !important; padding: 32px 24px !important; }
        }
      `}</style>
    </main>
  );
}
