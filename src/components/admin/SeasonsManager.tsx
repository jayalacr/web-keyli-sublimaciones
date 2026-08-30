"use client";

import { useState } from "react";
import Image from "next/image";
import type { AdminSeason } from "@/lib/adminSeasons";
import type { AdminProduct } from "@/lib/adminProducts";

export function SeasonsManager({ initialSeasons, allProducts }: { initialSeasons: AdminSeason[]; allProducts: AdminProduct[] }) {
  const [seasons, setSeasons] = useState(initialSeasons);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<AdminSeason | null>(null);
  const [productSearch, setProductSearch] = useState("");

  const sorted = [...seasons].sort((a, b) => a.order - b.order);

  function toggleActive(id: string) {
    setSeasons((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  }

  function openEditor(season: AdminSeason) {
    setEditingId(season.id);
    setDraft({ ...season });
    setProductSearch("");
  }

  function closeEditor() {
    setEditingId(null);
    setDraft(null);
  }

  function saveEditor() {
    if (!draft) return;
    setSeasons((prev) => prev.map((s) => (s.id === draft.id ? draft : s)));
    closeEditor();
  }

  function updateDraft<K extends keyof AdminSeason>(key: K, value: AdminSeason[K]) {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
  }

  function removeProductFromDraft(productId: string) {
    if (!draft) return;
    updateDraft("productIds", draft.productIds.filter((id) => id !== productId));
  }

  function addProductToDraft(productId: string) {
    if (!draft || draft.productIds.includes(productId)) return;
    updateDraft("productIds", [...draft.productIds, productId]);
  }

  const draftProducts = draft ? allProducts.filter((p) => draft.productIds.includes(p.id)) : [];
  const searchResults =
    draft && productSearch
      ? allProducts.filter((p) => !draft.productIds.includes(p.id) && p.name.toLowerCase().includes(productSearch.toLowerCase()))
      : [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-element-gap">
        {sorted.map((season) => (
          <div
            key={season.id}
            className={`bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden flex flex-col transition-shadow ${
              season.active ? "" : "opacity-60"
            }`}
          >
            <div className="relative h-32 w-full bg-surface-container-high">
              {season.coverSrc ? (
                <Image src={season.coverSrc} alt={season.coverAlt} fill sizes="360px" className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-on-surface-variant/60">
                  <span className="material-symbols-outlined text-2xl">hide_image</span>
                  <span className="text-xs">Sin imagen</span>
                </div>
              )}
              <div
                className={`absolute top-2 right-2 rounded px-2 py-1 flex items-center gap-1 shadow-sm ${
                  season.active ? "bg-surface-container-lowest" : "bg-surface-variant"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${season.active ? "bg-success" : "bg-outline"}`} />
                <span className="font-admin-label-caps text-[10px] uppercase text-on-surface">{season.active ? "Activo" : "Inactivo"}</span>
              </div>
              {!season.coverSrc && (
                <div className="absolute top-2 left-2 bg-error-container rounded px-2 py-1 flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px] text-on-error-container">warning</span>
                  <span className="font-admin-label-caps text-[10px] text-on-error-container uppercase">Falta portada</span>
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-admin-section-header text-on-surface">{season.name}</h3>
                  <span className="font-admin-data text-on-surface-variant">{season.productIds.length} productos</span>
                </div>
                <button
                  role="switch"
                  aria-checked={season.active}
                  onClick={() => toggleActive(season.id)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${season.active ? "bg-primary" : "bg-surface-variant"}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${season.active ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="pt-2 border-t border-outline-variant/50">
                <button onClick={() => openEditor(season)} className="text-primary hover:text-on-primary-fixed-variant font-admin-label-caps uppercase transition-colors">
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {draft && (
        <>
          <div className="fixed inset-0 bg-inverse-surface/20 backdrop-blur-[1px] z-40" onClick={closeEditor} />
          <div className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-surface-container-lowest shadow-2xl border-l border-outline-variant z-50 flex flex-col">
            <div className="h-16 border-b border-outline-variant px-6 flex items-center justify-between shrink-0">
              <h2 className="font-admin-title text-base text-on-surface">Editar Temporada: {seasons.find((s) => s.id === editingId)?.name}</h2>
              <button onClick={closeEditor} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-admin-label-caps text-on-surface-variant uppercase">Nombre</label>
                  <input
                    type="text"
                    value={draft.name}
                    onChange={(e) => updateDraft("name", e.target.value)}
                    className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded font-admin-body text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="font-admin-label-caps text-on-surface-variant uppercase">Slug</label>
                    <input
                      type="text"
                      value={draft.slug}
                      readOnly
                      className="w-full h-10 px-3 bg-surface-variant/30 border border-outline-variant rounded font-admin-body text-on-surface-variant focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-24">
                    <label className="font-admin-label-caps text-on-surface-variant uppercase">Orden</label>
                    <input
                      type="number"
                      value={draft.order}
                      onChange={(e) => updateDraft("order", Number(e.target.value))}
                      className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded font-admin-body text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-admin-label-caps text-on-surface-variant uppercase">Descripción</label>
                  <textarea
                    rows={3}
                    value={draft.description}
                    onChange={(e) => updateDraft("description", e.target.value)}
                    className="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded font-admin-body text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-surface rounded border border-outline-variant">
                  <div className="flex flex-col">
                    <span className="font-admin-section-header text-sm text-on-surface">Visibilidad</span>
                    <span className="font-admin-body text-xs text-on-surface-variant">Mostrar temporada en el sitio público</span>
                  </div>
                  <button
                    role="switch"
                    aria-checked={draft.active}
                    onClick={() => updateDraft("active", !draft.active)}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${draft.active ? "bg-primary" : "bg-surface-variant"}`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${draft.active ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-admin-label-caps text-on-surface-variant uppercase">Imagen de portada</label>
                <div className="relative w-full h-40 rounded-lg border-2 border-dashed border-outline-variant overflow-hidden bg-surface-container">
                  {draft.coverSrc ? (
                    <Image src={draft.coverSrc} alt={draft.coverAlt} fill sizes="480px" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/60 text-sm">
                      Sin imagen — subir desde &quot;Nueva temporada&quot; (próximamente)
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant">
                <div className="flex flex-col gap-1">
                  <h3 className="font-admin-section-header text-on-surface">Productos en esta temporada</h3>
                  <p className="font-admin-body text-xs text-on-surface-variant">Agrega o elimina productos de la colección &apos;{draft.name}&apos;.</p>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-on-surface-variant">search</span>
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Buscar y agregar producto..."
                    className="w-full h-10 pl-10 pr-3 bg-surface-container-low border border-outline-variant rounded font-admin-body text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:border-primary transition-colors"
                  />
                  {searchResults.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-surface-container-lowest border border-outline-variant rounded shadow-md max-h-48 overflow-y-auto">
                      {searchResults.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            addProductToDraft(p.id);
                            setProductSearch("");
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-surface-container-low transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px] text-primary">add</span>
                          {p.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col border border-outline-variant rounded overflow-hidden">
                  {draftProducts.length === 0 ? (
                    <p className="p-3 text-sm text-on-surface-variant italic bg-surface-container-lowest">Sin productos todavía.</p>
                  ) : (
                    draftProducts.map((p, i) => (
                      <div
                        key={p.id}
                        className={`flex items-center justify-between p-2 hover:bg-surface-container-low transition-colors group bg-surface-container-lowest ${
                          i < draftProducts.length - 1 ? "border-b border-outline-variant/50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-surface-variant relative overflow-hidden shrink-0">
                            {p.imageSrc && <Image src={p.imageSrc} alt={p.imageAlt} fill sizes="32px" className="object-cover" />}
                          </div>
                          <span className="font-admin-data text-on-surface truncate w-48">{p.name}</span>
                        </div>
                        <button onClick={() => removeProductFromDraft(p.id)} className="w-6 h-6 flex items-center justify-center text-outline hover:text-error transition-colors">
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="h-16 border-t border-outline-variant px-6 flex items-center justify-end gap-3 shrink-0">
              <button onClick={closeEditor} className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface-variant font-admin-label-caps uppercase hover:bg-surface-container transition-colors">
                Cancelar
              </button>
              <button onClick={saveEditor} className="px-4 py-2 bg-primary rounded text-on-primary font-admin-label-caps uppercase hover:bg-on-primary-fixed-variant transition-colors shadow-sm">
                Guardar cambios
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
