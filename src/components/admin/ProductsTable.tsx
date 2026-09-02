"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import type { AdminProduct } from "@/components/admin/ProductForm";
import { toggleProductoActivo } from "@/app/admin/productos/actions";

type StatusFilter = "Cualquier estado" | "Activo" | "Inactivo";

export function ProductsTable({
  initialProducts,
  categories,
  seasons,
}: {
  initialProducts: AdminProduct[];
  categories: string[];
  seasons: string[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas las categorías");
  const [season, setSeason] = useState("Todas las temporadas");
  const [status, setStatus] = useState<StatusFilter>("Cualquier estado");
  const [, startTransition] = useTransition();

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "Todas las categorías" && p.category !== category) return false;
    if (season !== "Todas las temporadas" && !p.seasons.includes(season)) return false;
    if (status === "Activo" && !p.active) return false;
    if (status === "Inactivo" && p.active) return false;
    return true;
  });

  function toggleActive(id: string) {
    const next = !products.find((p) => p.id === id)?.active;
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: next } : p)));
    startTransition(() => {
      toggleProductoActivo(id, next);
    });
  }

  function clearFilters() {
    setSearch("");
    setCategory("Todas las categorías");
    setSeason("Todas las temporadas");
    setStatus("Cualquier estado");
  }

  return (
    <>
      <div className="bg-surface-container-lowest rounded-xl p-4 mb-stack-md shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre"
            className="w-full pl-10 pr-4 py-2 bg-surface text-on-surface text-sm border-0 shadow-inner rounded-lg focus:ring-1 focus:ring-primary focus:outline-none transition-shadow placeholder:text-outline-variant"
          />
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 bg-surface text-on-surface text-sm border-0 shadow-inner rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
          >
            <option>Todas las categorías</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="px-3 py-2 bg-surface text-on-surface text-sm border-0 shadow-inner rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
          >
            <option>Todas las temporadas</option>
            {seasons.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
            className="px-3 py-2 bg-surface text-on-surface text-sm border-0 shadow-inner rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
          >
            <option>Cualquier estado</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant border-dashed">
          <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-outline text-[32px]">filter_list_off</span>
          </div>
          <p className="text-on-surface font-medium mb-2">No hay productos que coincidan con los filtros</p>
          <button onClick={clearFilters} className="text-primary hover:text-primary-fixed-dim text-sm font-medium transition-colors">
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant border-b border-surface-variant">
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider w-14">Img</th>
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider">Nombre</th>
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider">Categoría</th>
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider">Precio desde</th>
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider">Temporadas</th>
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider">Estado</th>
                  <th className="py-3 px-3 font-admin-label-caps uppercase tracking-wider text-right w-[140px]">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-sm font-admin-body text-on-surface">
                {filtered.map((product, i) => (
                  <tr
                    key={product.id}
                    className={`group hover:bg-surface-container-lowest/50 transition-colors h-row-height-dense ${
                      i < filtered.length - 1 ? "border-b border-surface-variant" : ""
                    } ${!product.active ? "opacity-50" : ""}`}
                  >
                    <td className="py-2 px-3">
                      <div className="relative w-10 h-10">
                        <div className="w-full h-full rounded bg-surface-variant flex items-center justify-center overflow-hidden border border-surface-dim">
                          {product.imageSrc ? (
                            <Image src={product.imageSrc} alt={product.imageAlt} width={40} height={40} className="w-full h-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-outline">image</span>
                          )}
                        </div>
                        {!product.imageSrc && (
                          <div
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#B8860B] shadow-sm border-2 border-surface-container-lowest"
                            title="Faltan imágenes"
                          />
                        )}
                      </div>
                    </td>
                    <td className={`py-2 px-3 font-medium ${!product.active ? "text-on-surface-variant" : ""}`}>{product.name}</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface text-on-surface border border-outline-variant">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-2 px-3">${product.priceFrom.toLocaleString("es-MX")}</td>
                    <td className="py-2 px-3">
                      {product.seasons.length > 0 ? (
                        <div className="flex gap-1 flex-wrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary-container text-on-secondary-container">
                            {product.seasons[0]}
                          </span>
                          {product.seasons.length > 1 && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-surface-variant text-on-surface-variant">
                              +{product.seasons.length - 1}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-outline-variant italic">Sin temporadas</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <button
                          role="switch"
                          aria-checked={product.active}
                          onClick={() => toggleActive(product.id)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                            product.active ? "bg-primary" : "bg-surface-variant border border-outline-variant"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 rounded-full shadow-sm transition-transform ${
                              product.active ? "translate-x-4 bg-on-primary" : "translate-x-0.5 bg-outline"
                            }`}
                          />
                        </button>
                        <span className={`text-xs font-medium ${product.active ? "text-success" : "text-outline"}`}>
                          {product.active ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/productos/${product.id}`} className="p-1.5 text-outline hover:text-primary transition-colors rounded hover:bg-primary/10" title="Editar">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </Link>
                        <button disabled className="p-1.5 text-outline rounded" title="Duplicar (próximamente)">
                          <span className="material-symbols-outlined text-[18px]">content_copy</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-surface-container-lowest flex items-center justify-between text-sm text-on-surface-variant border-t border-surface-variant">
            <div>
              Mostrando <span className="font-medium text-on-surface">{filtered.length}</span> de{" "}
              <span className="font-medium text-on-surface">{products.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
