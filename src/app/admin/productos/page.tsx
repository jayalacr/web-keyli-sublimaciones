"use client";

import { useState } from "react";
import { products as seedProducts } from "@/lib/data";
import type { Product } from "@/types";

const ICON_MAP: Record<string, string> = {
  shirt: "👕", mug: "☕", bottle: "🫙", key: "🗝️", tag: "🏷️",
};

function ProductRow({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr style={{ borderTop: "1px solid #F0EBF8" }}>
      <td style={{ padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
              display: "grid", placeItems: "center", fontSize: 18, flexShrink: 0,
            }}
          >
            {ICON_MAP[product.icon] ?? "📦"}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1E0F3C" }}>{product.name}</div>
            <div style={{ fontSize: 11, color: "rgba(30,15,60,.45)", marginTop: 2 }}>{product.blurb.slice(0, 50)}…</div>
          </div>
        </div>
      </td>
      <td style={{ padding: "14px 20px", fontSize: 12, color: "rgba(30,15,60,.55)" }}>{product.category}</td>
      <td style={{ padding: "14px 20px", fontSize: 12, color: "rgba(30,15,60,.55)" }}>{product.technique}</td>
      <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 700, color: "#5C3A8C" }}>
        ${product.priceFrom.toLocaleString("es-MX")}
      </td>
      <td style={{ padding: "14px 20px" }}>
        {product.featured && (
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "#FFF3CD", color: "#78350F", border: "1px solid #FCD34D" }}>
            Destacado
          </span>
        )}
      </td>
      <td style={{ padding: "14px 20px" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onEdit(product)}
            style={{ padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "#F0EBF8", color: "#5C3A8C", border: "none", cursor: "pointer" }}
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(product.id)}
            style={{ padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "#FEE2E2", color: "#B91C1C", border: "none", cursor: "pointer" }}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

function ProductModal({
  product,
  onSave,
  onClose,
}: {
  product: Partial<Product> | null;
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Product>>(product ?? {});
  const set = (k: keyof Product, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  if (!product && product !== null) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id:        form.id        ?? `prod-${Date.now()}`,
      name:      form.name      ?? "",
      technique: form.technique ?? "dtf",
      seasons:   form.seasons   ?? [],
      category:  form.category  ?? "",
      priceFrom: form.priceFrom ?? 0,
      blurb:     form.blurb     ?? "",
      colors:    form.colors    ?? [],
      sizes:     form.sizes     ?? [],
      gradient:  form.gradient  ?? ["#CAB0EC", "#5C3A8C"],
      icon:      form.icon      ?? "tag",
    } as Product);
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(30,15,60,.45)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white", borderRadius: 20, padding: 28,
          width: "min(560px, 100%)", boxShadow: "0 20px 60px -12px rgba(92,58,140,.35)",
          display: "flex", flexDirection: "column", gap: 18,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#1E0F3C" }}>
            {form.id ? "Editar producto" : "Nuevo producto"}
          </h3>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "rgba(30,15,60,.4)", lineHeight: 1 }}>×</button>
        </div>

        {[
          { label: "Nombre",     key: "name"      as const, type: "text"   },
          { label: "Categoría",  key: "category"  as const, type: "text"   },
          { label: "Técnica",    key: "technique" as const, type: "text"   },
          { label: "Precio desde (MXN)", key: "priceFrom" as const, type: "number" },
        ].map(({ label, key, type }) => (
          <label key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(30,15,60,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>{label}</span>
            <input
              type={type}
              value={(form[key] as string | number) ?? ""}
              onChange={(e) => set(key, type === "number" ? Number(e.target.value) : e.target.value)}
              required
              style={{
                padding: "9px 14px", borderRadius: 10, border: "1px solid #ECE4F4",
                fontSize: 13, color: "#1E0F3C", outline: "none",
                background: "#FAFAFA",
              }}
            />
          </label>
        ))}

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(30,15,60,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>Descripción corta</span>
          <textarea
            value={form.blurb ?? ""}
            onChange={(e) => set("blurb", e.target.value)}
            rows={2}
            style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid #ECE4F4", fontSize: 13, color: "#1E0F3C", resize: "vertical", background: "#FAFAFA" }}
          />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={form.featured ?? false}
            onChange={(e) => set("featured", e.target.checked)}
            style={{ width: 16, height: 16, accentColor: "#5C3A8C" }}
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#1E0F3C" }}>Destacado en inicio</span>
        </label>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
          <button type="button" onClick={onClose} style={{ padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, background: "#F0EBF8", color: "#5C3A8C", border: "none", cursor: "pointer" }}>
            Cancelar
          </button>
          <button type="submit" style={{ padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 700, background: "#5C3A8C", color: "white", border: "none", cursor: "pointer" }}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ProductosAdmin() {
  const [items, setItems] = useState<Product[]>(seedProducts);
  const [search, setSearch] = useState("");
  const [cat, setCat]   = useState("todas");
  const [editing, setEditing] = useState<Partial<Product> | null | undefined>(undefined);

  const cats = ["todas", ...Array.from(new Set(seedProducts.map((p) => p.category)))];

  const visible = items.filter((p) => {
    const matchCat  = cat === "todas" || p.category === cat;
    const matchText = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchText;
  });

  const handleSave = (p: Product) => {
    setItems((prev) =>
      prev.some((x) => x.id === p.id) ? prev.map((x) => (x.id === p.id ? p : x)) : [p, ...prev]
    );
    setEditing(undefined);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar este producto?")) setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1E0F3C" }}>Productos</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(30,15,60,.45)" }}>{items.length} productos en el catálogo</p>
        </div>
        <button
          onClick={() => setEditing({})}
          style={{ padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700, background: "#5C3A8C", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
        >
          + Nuevo producto
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          placeholder="Buscar por nombre…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid #ECE4F4", fontSize: 13, color: "#1E0F3C", background: "white", outline: "none", width: 220 }}
        />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "1px solid #ECE4F4",
                background: cat === c ? "#5C3A8C" : "white",
                color: cat === c ? "white" : "rgba(30,15,60,.6)",
                cursor: "pointer", textTransform: "capitalize",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: 16, border: "1px solid #ECE4F4", overflow: "hidden", boxShadow: "0 1px 4px rgba(92,58,140,.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#FAFAFA" }}>
              {["Producto", "Categoría", "Técnica", "Precio", "", "Acciones"].map((h) => (
                <th key={h} style={{ padding: "11px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "rgba(30,15,60,.4)", letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 40, textAlign: "center", fontSize: 13, color: "rgba(30,15,60,.35)" }}>
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              visible.map((p) => (
                <ProductRow key={p.id} product={p} onEdit={(p) => setEditing(p)} onDelete={handleDelete} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing !== undefined && (
        <ProductModal product={editing ?? null} onSave={handleSave} onClose={() => setEditing(undefined)} />
      )}
    </div>
  );
}
