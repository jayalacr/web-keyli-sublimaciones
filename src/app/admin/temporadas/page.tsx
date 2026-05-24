"use client";

import { useState } from "react";
import { seasons as seedSeasons } from "@/lib/data";
import type { Season } from "@/types";

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function SeasonModal({
  item,
  onSave,
  onClose,
}: {
  item: Partial<Season> | null;
  onSave: (s: Season) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Season>>(item ?? {});
  const set = (k: keyof Season, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id:    form.id    ?? `season-${Date.now()}`,
      label: form.label ?? "",
      emoji: form.emoji ?? "🎉",
      month: form.month ?? "Enero",
      tint:  form.tint  ?? "#F5D8E8",
    } as Season);
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(30,15,60,.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={handleSubmit}
        style={{ background: "white", borderRadius: 20, padding: 28, width: "min(440px, 100%)", boxShadow: "0 20px 60px -12px rgba(92,58,140,.35)", display: "flex", flexDirection: "column", gap: 18 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#1E0F3C" }}>
            {form.id ? "Editar temporada" : "Nueva temporada"}
          </h3>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "rgba(30,15,60,.4)", lineHeight: 1 }}>×</button>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(30,15,60,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>Nombre</span>
          <input
            type="text"
            value={form.label ?? ""}
            onChange={(e) => set("label", e.target.value)}
            required
            style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid #ECE4F4", fontSize: 13, color: "#1E0F3C", outline: "none", background: "#FAFAFA" }}
          />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(30,15,60,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>Emoji</span>
            <input
              type="text"
              value={form.emoji ?? ""}
              onChange={(e) => set("emoji", e.target.value)}
              maxLength={4}
              style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid #ECE4F4", fontSize: 22, textAlign: "center", outline: "none", background: "#FAFAFA" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(30,15,60,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>Color tint</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="color"
                value={form.tint ?? "#F5D8E8"}
                onChange={(e) => set("tint", e.target.value)}
                style={{ width: 42, height: 42, borderRadius: 8, border: "1px solid #ECE4F4", cursor: "pointer", padding: 2 }}
              />
              <input
                type="text"
                value={form.tint ?? "#F5D8E8"}
                onChange={(e) => set("tint", e.target.value)}
                style={{ flex: 1, padding: "9px 10px", borderRadius: 10, border: "1px solid #ECE4F4", fontSize: 12, color: "#1E0F3C", outline: "none", background: "#FAFAFA", fontFamily: "monospace" }}
              />
            </div>
          </label>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(30,15,60,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>Mes</span>
          <select
            value={form.month ?? "Enero"}
            onChange={(e) => set("month", e.target.value)}
            style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid #ECE4F4", fontSize: 13, color: "#1E0F3C", background: "#FAFAFA" }}
          >
            {MONTHS.map((m) => <option key={m}>{m}</option>)}
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

export default function TemporadasAdmin() {
  const [items, setItems]   = useState<Season[]>(seedSeasons);
  const [editing, setEditing] = useState<Partial<Season> | null | undefined>(undefined);

  const handleSave = (s: Season) => {
    setItems((prev) =>
      prev.some((x) => x.id === s.id) ? prev.map((x) => (x.id === s.id ? s : x)) : [...prev, s]
    );
    setEditing(undefined);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar esta temporada?")) setItems((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1E0F3C" }}>Temporadas</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(30,15,60,.45)" }}>{items.length} temporadas configuradas</p>
        </div>
        <button
          onClick={() => setEditing({})}
          style={{ padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700, background: "#5C3A8C", color: "white", border: "none", cursor: "pointer" }}
        >
          + Nueva temporada
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
        {items.map((s) => (
          <div
            key={s.id}
            style={{ background: "white", borderRadius: 16, border: "1px solid #ECE4F4", overflow: "hidden", boxShadow: "0 1px 4px rgba(92,58,140,.06)" }}
          >
            <div
              style={{ height: 64, background: s.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}
            >
              {s.emoji}
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1E0F3C", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "rgba(30,15,60,.45)", marginBottom: 14 }}>{s.month}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setEditing(s)}
                  style={{ flex: 1, padding: "6px 0", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "#F0EBF8", color: "#5C3A8C", border: "none", cursor: "pointer" }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  style={{ flex: 1, padding: "6px 0", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "#FEE2E2", color: "#B91C1C", border: "none", cursor: "pointer" }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing !== undefined && (
        <SeasonModal item={editing} onSave={handleSave} onClose={() => setEditing(undefined)} />
      )}
    </div>
  );
}
