"use client";

import { useState } from "react";
import type { AdminCategory } from "@/lib/adminCategories";

export function CategoriesTable({
  initialCategories,
  productCounts,
}: {
  initialCategories: AdminCategory[];
  productCounts: Record<string, number>;
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [draftName, setDraftName] = useState("");

  const filtered = categories
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.order - b.order);

  function renameCategory(id: string, name: string) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  }

  function removeCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  function addCategory() {
    const name = draftName.trim();
    if (!name) return;
    const id = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (!id || categories.some((c) => c.id === id)) return;
    const maxOrder = categories.reduce((max, c) => Math.max(max, c.order), 0);
    setCategories((prev) => [...prev, { id, name, slug: id, order: maxOrder + 10 }]);
    setDraftName("");
  }

  return (
    <>
      <div className="bg-surface-container-lowest rounded-xl p-4 mb-stack-md shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="flex-1 max-w-md relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar categoría"
            className="w-full pl-10 pr-4 py-2 bg-surface text-on-surface text-sm border-0 shadow-inner rounded-lg focus:ring-1 focus:ring-primary focus:outline-none transition-shadow placeholder:text-outline-variant"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
            placeholder="Nueva categoría"
            className="px-3 py-2 bg-surface text-on-surface text-sm border border-outline-variant border-dashed rounded-lg focus:outline-none focus:border-primary"
          />
          <button
            onClick={addCategory}
            className="flex items-center gap-1 px-4 py-2 bg-primary text-on-primary rounded-lg font-admin-section-header text-sm hover:bg-on-primary-fixed-variant transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Agregar
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant border-dashed">
          <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-outline text-[32px]">category</span>
          </div>
          <p className="text-on-surface font-medium">No hay categorías que coincidan con la búsqueda</p>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant border-b border-surface-variant">
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider">Nombre</th>
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider">Slug</th>
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider">Productos</th>
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider text-right w-[80px]">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-sm font-admin-body text-on-surface">
                {filtered.map((cat, i) => (
                  <tr
                    key={cat.id}
                    className={`group hover:bg-surface-container-lowest/50 transition-colors h-row-height-dense ${
                      i < filtered.length - 1 ? "border-b border-surface-variant" : ""
                    }`}
                  >
                    <td className="py-2 px-3 font-medium">
                      <input
                        type="text"
                        value={cat.name}
                        onChange={(e) => renameCategory(cat.id, e.target.value)}
                        className="bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-primary rounded px-1 -mx-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-3 text-on-surface-variant">{cat.slug}</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface text-on-surface border border-outline-variant">
                        {productCounts[cat.name] ?? 0}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => removeCategory(cat.id)}
                        className="p-1.5 text-outline hover:text-error transition-colors rounded hover:bg-error-container/20 opacity-0 group-hover:opacity-100"
                        title="Eliminar"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
