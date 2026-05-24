"use client";

import { useState } from "react";
import { categoryMeta as seedCats } from "@/lib/data";
import type { CategoryMeta } from "@/types";

const ICON_MAP: Record<string, string> = {
  shirt: "👕", mug: "☕", bottle: "🫙", key: "🗝️", tag: "🏷️",
};

function CategoryModal({
  item,
  onSave,
  onClose,
}: {
  item: Partial<CategoryMeta> | null;
  onSave: (c: CategoryMeta) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<CategoryMeta>>(item ?? {});
  const set = (k: keyof CategoryMeta, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id:          form.id          ?? `cat-${Date.now()}`,
      label:       form.label       ?? "",
      tagline:     form.tagline     ?? "",
      desc:        form.desc        ?? "",
      inspiration: form.inspiration ?? [],
      icon:        form.icon        ?? "tag",
      gradient:    form.gradient    ?? ["#CAB0EC", "#5C3A8C"],
      techniques:  form.techniques  ?? [],
    } as CategoryMeta);
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(30,15,60,.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={handleSubmit}
        style={{ background: "white", borderRadius: 20, padding: 28, width: "min(500px, 100%)", boxShadow: "0 20px 60px -12px rgba(92,58,140,.35)", display: "flex", flexDirection: "column", gap: 18 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#1E0F3C" }}>
            {form.id ? "Editar categoría" : "Nueva categoría"}
          </h3>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "rgba(30,15,60,.4)", lineHeight: 1 }}>×</button>
        </div>

        {[
          { label: "Nombre",   key: "label"   as const },
          { label: "Tagline",  key: "tagline" as const },
        ].map(({ label, key }) => (
          <label key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(30,15,60,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>{label}</span>
            <input
              type="text"
              value={(form[key] as string) ?? ""}
              onChange={(e) => set(key, e.target.value)}
              required
              style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid #ECE4F4", fontSize: 13, color: "#1E0F3C", outline: "none", background: "#FAFAFA" }}
            />
          </label>
        ))}

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(30,15,60,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>Descripción</span>
          <textarea
            value={form.desc ?? ""}
            onChange={(e) => set("desc", e.target.value)}
            rows={3}
            style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid #ECE4F4", fontSize: 13, color: "#1E0F3C", resize: "vertical", background: "#FAFAFA" }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(30,15,60,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>Icono</span>
          <select
            value={form.icon ?? "tag"}
            onChange={(e) => set("icon", e.target.value)}
            style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid #ECE4F4", fontSize: 13, color: "#1E0F3C", background: "#FAFAFA" }}
          >
            {Object.entries(ICON_MAP).map(([k, v]) => (
              <option key={k} value={k}>{v} {k}</option>
            ))}
          </select>
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

export default function CategoriasAdmin() {
  const [items, setItems]   = useState<CategoryMeta[]>(seedCats);
  const [editing, setEditing] = useState<Partial<CategoryMeta> | null | undefined>(undefined);

  const handleSave = (c: CategoryMeta) => {
    setItems((prev) =>
      prev.some((x) => x.id === c.id) ? prev.map((x) => (x.id === c.id ? c : x)) : [...prev, c]
    );
    setEditing(undefined);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar esta categoría?")) setItems((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1E0F3C" }}>Categorías</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(30,15,60,.45)" }}>{items.length} categorías activas</p>
        </div>
        <button
          onClick={() => setEditing({})}
          style={{ padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700, background: "#5C3A8C", color: "white", border: "none", cursor: "pointer" }}
        >
          + Nueva categoría
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {items.map((c) => (
          <div
            key={c.id}
            style={{ background: "white", borderRadius: 16, border: "1px solid #ECE4F4", overflow: "hidden", boxShadow: "0 1px 4px rgba(92,58,140,.06)" }}
          >
            {/* Gradient hero */}
            <div
              style={{
                height: 72,
                background: `linear-gradient(135deg, ${c.gradient[0]}, ${c.gradient[1]})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
              }}
            >
              {ICON_MAP[c.icon] ?? "📦"}
            </div>

            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1E0F3C", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: "rgba(30,15,60,.5)", marginBottom: 12, lineHeight: 1.4 }}>{c.tagline}</div>

              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
                {c.techniques.map((t) => (
                  <span key={t} style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: "#F0EBF8", color: "#5C3A8C", textTransform: "uppercase", letterSpacing: ".06em" }}>{t}</span>
                ))}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setEditing(c)}
                  style={{ flex: 1, padding: "7px 0", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "#F0EBF8", color: "#5C3A8C", border: "none", cursor: "pointer" }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  style={{ flex: 1, padding: "7px 0", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "#FEE2E2", color: "#B91C1C", border: "none", cursor: "pointer" }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing !== undefined && (
        <CategoryModal item={editing} onSave={handleSave} onClose={() => setEditing(undefined)} />
      )}
    </div>
  );
}
