"use client";

import { useState, useTransition } from "react";
import { crearCategoria, renombrarCategoria, eliminarCategoria } from "@/app/admin/categorias/actions";

type Categoria = { id: string; nombre: string; slug: string; orden: number };

export function CategoriesTable({
  initialCategories,
  productCounts,
}: {
  initialCategories: Categoria[];
  productCounts: Record<string, number>;
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [draftName, setDraftName] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Categoria | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [, startTransition] = useTransition();

  const filtered = categories
    .filter((c) => c.nombre.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.orden - b.orden);

  function renameCategory(id: string, nombre: string) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, nombre } : c)));
  }

  function commitRename(id: string, nombre: string) {
    startTransition(() => {
      renombrarCategoria(id, nombre);
    });
  }

  async function confirmRemoveCategory() {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    setDeleteError(null);
    setIsDeleting(true);
    try {
      await eliminarCategoria(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setPendingDelete(null);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "No se pudo eliminar la categoría.");
    } finally {
      setIsDeleting(false);
    }
  }

  function addCategory() {
    const nombre = draftName.trim();
    if (!nombre) return;
    setDraftName("");
    startTransition(async () => {
      const nueva = await crearCategoria(nombre);
      setCategories((prev) => [...prev, nueva]);
    });
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
                        value={cat.nombre}
                        onChange={(e) => renameCategory(cat.id, e.target.value)}
                        onBlur={(e) => commitRename(cat.id, e.target.value)}
                        className="bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-primary rounded px-1 -mx-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-3 text-on-surface-variant">{cat.slug}</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface text-on-surface border border-outline-variant">
                        {productCounts[cat.id] ?? 0}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => {
                          setDeleteError(null);
                          setPendingDelete(cat);
                        }}
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

      {pendingDelete && (
        <>
          <div className="fixed inset-0 bg-inverse-surface/30 backdrop-blur-[1px] z-40" onClick={() => setPendingDelete(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant max-w-sm w-full p-6 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-error-container/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-error text-2xl">warning</span>
              </div>
              <h3 className="font-admin-title text-lg text-on-surface">¿Eliminar &quot;{pendingDelete.nombre}&quot;?</h3>
              {productCounts[pendingDelete.id] ? (
                <p className="text-sm text-error">
                  No se puede eliminar todavía: tiene {productCounts[pendingDelete.id]} producto(s) asignados. Cámbialos de categoría primero desde Productos.
                </p>
              ) : (
                <p className="text-sm text-on-surface-variant">Esta acción no se puede deshacer.</p>
              )}
              {deleteError && <p className="text-sm text-error">{deleteError}</p>}
              <div className="flex items-center gap-3 mt-3 w-full">
                <button
                  onClick={() => setPendingDelete(null)}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container transition-colors"
                >
                  {productCounts[pendingDelete.id] ? "Entendido" : "Cancelar"}
                </button>
                {!productCounts[pendingDelete.id] && (
                  <button
                    onClick={confirmRemoveCategory}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 text-sm font-semibold text-on-error bg-error rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
