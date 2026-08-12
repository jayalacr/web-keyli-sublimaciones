"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { ProductCard } from "@/components/catalogo/ProductCard";
import { Check, Truck, WhatsAppGlyph } from "@/components/ui/Icons";
import { products, techniques, seasons } from "@/lib/data";
import { waLink } from "@/lib/constants";
import { slugify } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export default function ProductDetailClient({ params }: Props) {
  const product = products.find((p) => slugify(p.name) === params.slug);

  if (!product) return notFound();

  const technique = techniques.find((t) => t.id === product.technique);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return <ProductDetail product={product} technique={technique} relatedProducts={relatedProducts} />;
}

function ProductDetail({
  product,
  technique,
  relatedProducts,
}: {
  product: ReturnType<typeof products.find> & {};
  technique: ReturnType<typeof techniques.find>;
  relatedProducts: typeof products;
}) {
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"specs" | "technique" | "care">("specs");

  const seasonLabels = product.seasons
    .map((sid) => seasons.find((s) => s.id === sid))
    .filter(Boolean);

  const waText = `Hola Keyli, quiero cotizar:\n• Producto: ${product.name}\n• Talla/tamaño: ${size}\n• Color: ${color}\n• Cantidad: ${qty}\n\nMi diseño: [describe o adjunta imagen]`;

  const thumbnailGradients: [string, string][] = [
    product.gradient,
    ["#FAD0D8", "#FFE066"],
    ["#D5E1F5", "#B991E5"],
    ["#E7D7F7", "#CAB0EC"],
  ];

  return (
    <main>
      {/* Breadcrumbs */}
      <div
        style={{
          width: "min(1240px, 100% - 32px)",
          marginInline: "auto",
          paddingTop: 24,
          fontSize: 13,
          color: "var(--color-ink-soft)",
        }}
      >
        <Link href="/" style={{ color: "var(--color-lilac-700)" }}>Inicio</Link>
        <span> / </span>
        <Link href="/catalogo" style={{ color: "var(--color-lilac-700)" }}>Catálogo</Link>
        <span> / </span>
        <span>{product.name}</span>
      </div>

      {/* Main grid */}
      <section style={{ paddingBlock: 32 }}>
        <div style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}>
          <div className="product-detail-grid">
            {/* Gallery */}
            <div>
              <div
                style={{
                  aspectRatio: "1 / 1",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 28,
                  background: "var(--color-lilac-50)",
                  border: "1px solid var(--color-line)",
                }}
              >
                <ProductIcon kind={product.icon} gradient={product.gradient} />
                {product.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      background:
                        product.badge === "Bajo pedido"
                          ? "var(--color-ink)"
                          : "var(--color-yellow-200)",
                      color:
                        product.badge === "Bajo pedido"
                          ? "white"
                          : "var(--color-lilac-900)",
                      padding: "8px 14px",
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 999,
                    }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                  marginTop: 16,
                }}
              >
                {thumbnailGradients.map((gradient, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      borderRadius: 16,
                      cursor: "pointer",
                      border: `${i === 0 ? 2 : 1}px solid ${i === 0 ? "var(--color-lilac-500)" : "var(--color-line)"}`,
                      background: "var(--color-lilac-50)",
                      position: "relative",
                    }}
                  >
                    <ProductIcon kind={product.icon} gradient={gradient} size={60} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              {/* Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                {technique && (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "5px 12px",
                      borderRadius: 999,
                      background: "var(--color-lilac-100)",
                      color: "var(--color-lilac-800)",
                    }}
                  >
                    {technique.label}
                  </span>
                )}
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: "white",
                    color: "var(--color-ink-soft)",
                    border: "1px solid var(--color-line)",
                  }}
                >
                  {product.category}
                </span>
                {seasonLabels.map(
                  (s) =>
                    s && (
                      <span
                        key={s.id}
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "5px 12px",
                          borderRadius: 999,
                          background: "var(--color-yellow-100)",
                          color: "var(--color-lilac-800)",
                        }}
                      >
                        {s.label}
                      </span>
                    )
                )}
              </div>

              <h1
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  marginBottom: 16,
                  color: "var(--color-ink)",
                  lineHeight: 1.15,
                }}
              >
                {product.name}
              </h1>

              <p
                style={{
                  fontSize: 17,
                  color: "var(--color-ink-soft)",
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                {product.blurb}
              </p>

              {/* Price box */}
              <div
                style={{
                  background: "var(--color-lilac-50)",
                  borderRadius: 18,
                  padding: 24,
                  marginBottom: 32,
                  border: "1px solid var(--color-lilac-100)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--color-ink-soft)",
                      fontWeight: 600,
                    }}
                  >
                    Precio desde
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-lilac-700)",
                      fontSize: 44,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    ${product.priceFrom}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--color-ink-faint)",
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  El precio final varía según diseño, cantidad y tiempo de entrega. Cotizamos personalmente por WhatsApp.
                </p>
              </div>

              {/* Size selector */}
              {product.sizes.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: "var(--color-ink-soft)",
                      marginBottom: 10,
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                    }}
                  >
                    Talla / tamaño
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        style={{
                          padding: "10px 16px",
                          borderRadius: 12,
                          border: `1.5px solid ${size === s ? "var(--color-lilac-700)" : "var(--color-line)"}`,
                          background: size === s ? "var(--color-lilac-700)" : "white",
                          color: size === s ? "white" : "var(--color-ink)",
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: "pointer",
                          transition: "all .15s",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color selector */}
              {product.colors.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: "var(--color-ink-soft)",
                      marginBottom: 10,
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                    }}
                  >
                    Color
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        style={{
                          padding: "10px 16px",
                          borderRadius: 12,
                          border: `1.5px solid ${color === c ? "var(--color-lilac-700)" : "var(--color-line)"}`,
                          background: color === c ? "var(--color-lilac-50)" : "white",
                          color: color === c ? "var(--color-lilac-700)" : "var(--color-ink)",
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity stepper */}
              <div style={{ marginBottom: 28, maxWidth: 200 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: "var(--color-ink-soft)",
                    marginBottom: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                  }}
                >
                  Cantidad estimada
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1.5px solid var(--color-line)",
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "white",
                  }}
                >
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    style={{
                      padding: "12px 18px",
                      color: "var(--color-lilac-700)",
                      fontWeight: 700,
                      fontSize: 18,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) =>
                      setQty(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      border: 0,
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "var(--color-ink)",
                    }}
                  />
                  <button
                    onClick={() => setQty(qty + 1)}
                    style={{
                      padding: "12px 18px",
                      color: "var(--color-lilac-700)",
                      fontWeight: 700,
                      fontSize: 18,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* WhatsApp CTA box */}
              <div
                style={{
                  background: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
                  borderRadius: 20,
                  padding: 24,
                  border: "1px solid #86EFAC",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: "#25D366",
                      color: "white",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <WhatsAppGlyph size={24} />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: 4, color: "#14532D" }}>Pide por WhatsApp</h4>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#166534",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      Nos llega tu selección con todos los detalles. Te respondemos lo más pronto posible con tu cotización.
                    </p>
                  </div>
                </div>
                <a
                  href={waLink(waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: 999,
                    background: "#25D366",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: "none",
                    boxShadow: "0 4px 14px -4px rgba(37,211,102,.5)",
                  }}
                >
                  <WhatsAppGlyph size={18} /> Cotizar este pedido
                </a>
                <p
                  style={{
                    fontSize: 11,
                    color: "#166534",
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                >
                  No se realizan pagos ni pedidos desde el sitio · Todo se confirma por WhatsApp
                </p>
              </div>

              {/* Status */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  fontSize: 13,
                  color: "var(--color-ink-soft)",
                }}
              >
                {(product.stock ?? 0) > 0 ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#22C55E",
                        display: "inline-block",
                      }}
                    />
                    Disponible para cotizar
                  </span>
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--color-yellow-400)",
                        display: "inline-block",
                      }}
                    />
                    Bajo pedido
                  </span>
                )}
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Truck size={14} /> Envíos a todo México
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section
        style={{
          paddingBlock: "32px 48px",
          background: "var(--color-lilac-50)",
        }}
      >
        <div style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}>
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 28,
              borderBottom: "1px solid var(--color-lilac-200)",
            }}
          >
            {(
              [
                { id: "specs", label: "Especificaciones" },
                { id: "technique", label: "Sobre la técnica" },
                { id: "care", label: "Cuidado" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: 14,
                  color: tab === t.id ? "var(--color-lilac-700)" : "var(--color-ink-soft)",
                  borderBottom: `3px solid ${tab === t.id ? "var(--color-lilac-700)" : "transparent"}`,
                  marginBottom: -1,
                  background: "none",
                  border: "none",
                  borderBottomWidth: 3,
                  borderBottomStyle: "solid",
                  borderBottomColor: tab === t.id ? "var(--color-lilac-700)" : "transparent",
                  cursor: "pointer",
                  transition: "color .15s",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "specs" && (
            <div className="specs-grid">
              <SpecRow label="Técnica" value={technique?.label ?? ""} />
              <SpecRow label="Categoría" value={product.category} />
              <SpecRow label="Tallas/tamaños disponibles" value={product.sizes.join(" · ")} />
              <SpecRow label="Colores disponibles" value={product.colors.join(" · ")} />
              <SpecRow
                label="Temporadas"
                value={product.seasons
                  .map((s) => seasons.find((x) => x.id === s)?.label)
                  .filter(Boolean)
                  .join(" · ")}
              />
              <SpecRow label="Pedido mínimo" value="Confirmado al cotizar" />
              <SpecRow label="Tiempo de producción" value="Confirmado al cotizar" />
              <SpecRow label="Diseño incluido" value="Sí, ajustes ilimitados antes de aprobar" />
            </div>
          )}

          {tab === "technique" && (
            <div style={{ maxWidth: 720 }}>
              <div
                style={{
                  padding: 32,
                  background: "white",
                  borderRadius: 20,
                  border: "1px solid var(--color-line)",
                }}
              >
                <h3 style={{ marginBottom: 12, color: "var(--color-ink)" }}>{technique?.label}</h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "var(--color-ink-soft)",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  {technique?.desc}
                </p>
                <ul style={{ listStyle: "none", display: "grid", gap: 12, padding: 0, margin: 0 }}>
                  {[
                    "Tinta de alta calidad, resistente a lavado",
                    "Colores brillantes y duraderos",
                    "Ideal para diseños complejos y full color",
                    "Garantía de impresión duradera",
                  ].map((it, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "var(--color-lilac-100)",
                          color: "var(--color-lilac-700)",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <Check size={12} />
                      </span>
                      <span style={{ color: "var(--color-ink-soft)" }}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "care" && (
            <div style={{ maxWidth: 720 }}>
              <div
                style={{
                  padding: 32,
                  background: "white",
                  borderRadius: 20,
                  border: "1px solid var(--color-line)",
                }}
              >
                <h3 style={{ marginBottom: 16, color: "var(--color-ink)" }}>Cuidado y conservación</h3>
                <div style={{ display: "grid", gap: 16 }}>
                  {[
                    { t: "Lavado", d: "A mano o a máquina en programa delicado. Agua fría. Voltea la prenda al revés." },
                    { t: "Secado", d: "Al aire libre, lejos del sol directo. Evita secadora a temperatura alta." },
                    { t: "Planchado", d: "Por el revés o usando una tela protectora encima. No planches directamente sobre la impresión." },
                    { t: "Tazas", d: "Lavar a mano para conservar el estampado. Apta para microondas." },
                  ].map((it, i) => (
                    <div
                      key={i}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        gap: 20,
                        paddingBottom: 16,
                        borderBottom: i < 3 ? "1px solid var(--color-line)" : "none",
                      }}
                    >
                      <strong style={{ color: "var(--color-lilac-700)" }}>{it.t}</strong>
                      <span style={{ color: "var(--color-ink-soft)" }}>{it.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section style={{ paddingBlock: "40px 64px" }}>
          <div style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}>
            <h3 style={{ marginBottom: 24, color: "var(--color-ink)" }}>También te puede gustar</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 20,
              }}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
        }
        .specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 720px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .specs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 20,
        padding: "12px 0",
        borderBottom: "1px solid var(--color-lilac-200)",
      }}
    >
      <span
        style={{
          fontSize: 13,
          color: "var(--color-ink-soft)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: ".04em",
        }}
      >
        {label}
      </span>
      <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>{value}</span>
    </div>
  );
}
