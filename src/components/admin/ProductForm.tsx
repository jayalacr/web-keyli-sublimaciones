"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { guardarProducto, eliminarProducto } from "@/app/admin/productos/actions";

export type ProductImage = { src: string; alt: string };

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  priceFrom: number;
  seasons: string[];
  active: boolean;
  featured: boolean;
  order: number;
  description: string;
  material: string;
  technique: string;
  capacities: string[];
  colors: { hex: string; label: string }[];
  productionDays: number;
  imageSrc: string | null;
  imageAlt: string;
  gallery: ProductImage[];
};

export function ProductForm({
  product,
  isNew,
  categories,
  seasons,
}: {
  product: AdminProduct;
  isNew: boolean;
  categories: string[];
  seasons: string[];
}) {
  const [form, setForm] = useState(product);
  const [capacityDraft, setCapacityDraft] = useState("");
  const [colorHexDraft, setColorHexDraft] = useState("#6c538b");
  const [colorLabelDraft, setColorLabelDraft] = useState("");
  const [seasonSearch, setSeasonSearch] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      await guardarProducto(form);
    });
  }

  function remove() {
    if (!form.id) return;
    startTransition(async () => {
      await eliminarProducto(form.id);
    });
  }

  function update<K extends keyof AdminProduct>(key: K, value: AdminProduct[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addCapacity() {
    const value = capacityDraft.trim();
    if (!value || form.capacities.includes(value)) return;
    update("capacities", [...form.capacities, value]);
    setCapacityDraft("");
  }

  function removeCapacity(cap: string) {
    update(
      "capacities",
      form.capacities.filter((c) => c !== cap)
    );
  }

  function addColor() {
    const hex = colorHexDraft.trim();
    const label = colorLabelDraft.trim();
    if (!hex || !label || form.colors.some((c) => c.hex === hex)) return;
    update("colors", [...form.colors, { hex, label }]);
    setColorLabelDraft("");
  }

  function removeColor(hex: string) {
    update(
      "colors",
      form.colors.filter((c) => c.hex !== hex)
    );
  }

  function toggleSeason(season: string) {
    update(
      "seasons",
      form.seasons.includes(season) ? form.seasons.filter((s) => s !== season) : [...form.seasons, season]
    );
  }

  const availableSeasons = seasons.filter(
    (s) => !form.seasons.includes(s) && s.toLowerCase().includes(seasonSearch.toLowerCase())
  );
  const priceInvalid = form.priceFrom <= 0;

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-stack-md flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant font-admin-label-caps uppercase mb-1 tracking-wider">
            <Link href="/admin/productos" className="hover:text-primary transition-colors">
              Productos
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span>{isNew ? "Nuevo producto" : "Editar producto"}</span>
          </div>
          <h1 className="font-admin-title text-3xl text-on-surface">{form.name || "Nuevo producto"}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/productos"
            className="px-5 py-2 text-sm font-semibold text-primary bg-transparent border border-outline-variant hover:bg-surface-variant transition-colors rounded-lg flex items-center shadow-sm"
          >
            Descartar cambios
          </Link>
          <button
            onClick={save}
            disabled={isPending || priceInvalid || !form.name}
            className="px-5 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg flex items-center shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined mr-2 text-[18px]">save</span>
            {isPending ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low/30 flex items-center">
              <span className="material-symbols-outlined mr-2 text-primary text-[20px]">info</span>
              <h2 className="font-admin-section-header text-lg text-on-surface">Información General</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
                <label className="font-admin-label-caps text-xs text-on-surface-variant">Nombre del Producto</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full px-3 py-2 text-sm font-admin-body text-on-surface bg-surface border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
                <label className="font-admin-label-caps text-xs text-on-surface-variant">Slug (URL)</label>
                <div className="relative flex items-center w-full">
                  <span className="absolute left-3 text-on-surface-variant/50 text-sm material-symbols-outlined text-[16px]">link</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => update("slug", e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm font-admin-body text-on-surface-variant/80 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
                <label className="font-admin-label-caps text-xs text-on-surface-variant">Categoría</label>
                <div className="relative w-full">
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    className="appearance-none w-full pl-3 pr-10 py-2 text-sm font-admin-body text-on-surface bg-surface border border-outline-variant rounded-lg cursor-pointer focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
                <label className={`font-admin-label-caps text-xs ${priceInvalid ? "text-error" : "text-on-surface-variant"}`}>
                  Precio Base (MXN)
                </label>
                <div className="relative w-full">
                  <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium ${priceInvalid ? "text-error" : "text-on-surface-variant"}`}>
                    $
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={form.priceFrom || ""}
                    onChange={(e) => update("priceFrom", Number(e.target.value))}
                    placeholder="Ej. 250.00"
                    className={`w-full pl-7 pr-10 py-2 text-sm font-admin-body rounded-lg focus:outline-none transition-all ${
                      priceInvalid
                        ? "text-error bg-error-container/10 border-error border-2 focus:ring-2 focus:ring-error/20"
                        : "text-on-surface bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {priceInvalid && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-error material-symbols-outlined text-[18px]">error</span>
                  )}
                </div>
                {priceInvalid && (
                  <span className="text-xs text-error mt-0.5 flex items-center">
                    <span className="w-1 h-1 rounded-full bg-error mr-1" />
                    Ingresa un precio válido mayor a 0
                  </span>
                )}
              </div>
              <div className="col-span-2 flex flex-col gap-1.5 mt-2">
                <label className="font-admin-label-caps text-xs text-on-surface-variant flex justify-between">
                  <span>Descripción Detallada</span>
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  className="w-full px-3 py-2 text-sm font-admin-body text-on-surface bg-surface border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low/30 flex items-center">
              <span className="material-symbols-outlined mr-2 text-primary text-[20px]">tune</span>
              <h2 className="font-admin-section-header text-lg text-on-surface">Especificaciones de Producto</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                <label className="font-admin-label-caps text-xs text-on-surface-variant">Material Base</label>
                <input
                  type="text"
                  value={form.material}
                  onChange={(e) => update("material", e.target.value)}
                  className="w-full px-3 py-2 text-sm font-admin-body text-on-surface bg-surface border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                <label className="font-admin-label-caps text-xs text-on-surface-variant">Técnica de Impresión</label>
                <input
                  type="text"
                  value={form.technique}
                  onChange={(e) => update("technique", e.target.value)}
                  className="w-full px-3 py-2 text-sm font-admin-body text-on-surface bg-surface border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <label className="font-admin-label-caps text-xs text-on-surface-variant">Capacidades / Tallas Disponibles</label>
                <div className="flex flex-wrap gap-2 items-center">
                  {form.capacities.map((cap) => (
                    <div
                      key={cap}
                      className="px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-md text-sm font-medium border border-secondary-fixed flex items-center"
                    >
                      {cap}
                      <button onClick={() => removeCapacity(cap)} className="ml-2 text-on-secondary-container/70 hover:text-on-secondary-container">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={capacityDraft}
                    onChange={(e) => setCapacityDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCapacity())}
                    placeholder="Ej. 12 oz"
                    className="w-24 px-3 py-1.5 bg-surface text-sm border border-outline-variant border-dashed rounded-md focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={addCapacity}
                    className="px-3 py-1.5 bg-surface text-on-surface-variant rounded-md text-sm font-medium border border-outline-variant border-dashed hover:bg-surface-variant transition-colors flex items-center"
                  >
                    <span className="material-symbols-outlined text-[16px] mr-1">add</span> Agregar
                  </button>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                <label className="font-admin-label-caps text-xs text-on-surface-variant">Colores de Recubrimiento</label>
                <div className="flex flex-wrap gap-2 items-center">
                  {form.colors.map((c) => (
                    <div key={c.hex} title={c.label} className="relative group/color">
                      <div className="w-6 h-6 rounded-full border border-outline-variant shadow-sm" style={{ backgroundColor: c.hex }} />
                      <button
                        onClick={() => removeColor(c.hex)}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-surface border border-outline-variant text-on-surface-variant flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity hover:text-error hover:border-error"
                        aria-label={`Quitar color ${c.label}`}
                      >
                        <span className="material-symbols-outlined text-[10px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={colorHexDraft}
                    onChange={(e) => setColorHexDraft(e.target.value)}
                    className="w-9 h-9 p-0.5 bg-surface border border-outline-variant rounded-lg cursor-pointer"
                    aria-label="Elegir color"
                  />
                  <input
                    type="text"
                    value={colorLabelDraft}
                    onChange={(e) => setColorLabelDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                    placeholder="Nombre del color"
                    className="flex-1 min-w-0 px-3 py-1.5 bg-surface text-sm border border-outline-variant border-dashed rounded-md focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={addColor}
                    disabled={!colorLabelDraft.trim()}
                    className="px-3 py-1.5 bg-surface text-on-surface-variant rounded-md text-sm font-medium border border-outline-variant border-dashed hover:bg-surface-variant transition-colors flex items-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-[16px] mr-1">add</span> Agregar
                  </button>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                <label className="font-admin-label-caps text-xs text-on-surface-variant">Tiempo de Producción Promedio</label>
                <div className="relative w-full">
                  <input
                    type="number"
                    min={1}
                    value={form.productionDays}
                    onChange={(e) => update("productionDays", Number(e.target.value))}
                    className="w-full pl-3 pr-16 py-2 text-sm font-admin-body text-on-surface bg-surface border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant pointer-events-none">días</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low/30 flex items-center justify-between">
              <div className="flex items-center">
                <span className="material-symbols-outlined mr-2 text-primary text-[20px]">image</span>
                <h2 className="font-admin-section-header text-lg text-on-surface">Galería de Imágenes</h2>
              </div>
              <span className="text-xs text-on-surface-variant">Max. 5MB por archivo (JPG, PNG)</span>
            </div>
            <div className="p-6">
              {/* ponytail: dropzone sólo visual — la subida real llega con Supabase Storage */}
              <div className="w-full border-2 border-dashed border-outline-variant/50 rounded-xl bg-surface flex flex-col items-center justify-center py-8 mb-6 opacity-70">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
                </div>
                <p className="font-admin-section-header text-sm text-on-surface mb-1">Arrastra imágenes aquí o explora (próximamente)</p>
                <p className="text-xs text-on-surface-variant">Dimensión recomendada: 1080x1080px</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {form.imageSrc && (
                  <div className="relative rounded-lg overflow-hidden border border-primary aspect-square shadow-sm">
                    <div className="absolute top-2 left-2 bg-primary text-on-primary text-[10px] font-admin-label-caps px-2 py-1 rounded-sm z-10 shadow-sm">
                      PRINCIPAL
                    </div>
                    <Image src={form.imageSrc} alt={form.imageAlt} fill sizes="200px" className="object-cover" />
                  </div>
                )}
                {form.gallery.map((img) => (
                  <div key={img.src} className="relative rounded-lg overflow-hidden border border-outline-variant aspect-square bg-surface-container shadow-sm">
                    <Image src={img.src} alt={img.alt} fill sizes="200px" className="object-cover" />
                  </div>
                ))}
                {!form.imageSrc && form.gallery.length === 0 && (
                  <div className="col-span-full text-sm text-on-surface-variant italic py-6 text-center">Sin imágenes cargadas todavía.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
            <div className="px-5 py-4 border-b border-outline-variant bg-surface-container-low/30">
              <h2 className="font-admin-section-header text-base text-on-surface">Configuración de Publicación</h2>
            </div>
            <div className="p-5 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-on-surface">Producto Activo</span>
                  <span className="text-xs text-on-surface-variant">Visible en la tienda pública</span>
                </div>
                <button
                  role="switch"
                  aria-checked={form.active}
                  onClick={() => update("active", !form.active)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${form.active ? "bg-primary" : "bg-surface-variant"}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${form.active ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="h-px w-full bg-outline-variant/50" />
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-on-surface">Destacado en Inicio</span>
                  <span className="text-xs text-on-surface-variant">Aparece en carrusel principal</span>
                </div>
                <button
                  role="switch"
                  aria-checked={form.featured}
                  onClick={() => update("featured", !form.featured)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${form.featured ? "bg-primary" : "bg-surface-variant"}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${form.featured ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="h-px w-full bg-outline-variant/50" />
              <div className="flex flex-col gap-1.5">
                <label className="font-admin-label-caps text-xs text-on-surface-variant">Orden de aparición (Prioridad)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => update("order", Number(e.target.value))}
                    className="w-24 px-3 py-1.5 text-sm font-admin-body text-on-surface bg-surface border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-center"
                  />
                  <span className="text-xs text-on-surface-variant">Menor número = Más arriba</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
            <div className="px-5 py-4 border-b border-outline-variant bg-surface-container-low/30">
              <h2 className="font-admin-section-header text-base text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-tertiary">calendar_month</span>
                Etiquetas de Temporada
              </h2>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  value={seasonSearch}
                  onChange={(e) => setSeasonSearch(e.target.value)}
                  placeholder="Buscar temporada..."
                  className="w-full pl-8 pr-3 py-2 text-sm font-admin-body text-on-surface bg-surface border border-outline-variant rounded-lg focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all"
                />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined text-[16px]">search</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.seasons.map((s) => (
                  <div key={s} className="px-3 py-1 bg-tertiary/10 text-on-tertiary-container rounded-full text-xs font-semibold border border-tertiary/20 flex items-center gap-1">
                    {s}
                    <button onClick={() => toggleSeason(s)} className="hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-[14px]">cancel</span>
                    </button>
                  </div>
                ))}
                {seasonSearch &&
                  availableSeasons.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSeason(s)}
                      className="px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full text-xs font-semibold border border-outline-variant/50 border-dashed hover:bg-surface-container-high transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span> {s}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="px-5 py-4 border-b border-outline-variant bg-surface-container-low/30 flex justify-between items-center relative z-10">
              <h2 className="font-admin-section-header text-base text-on-surface">Vista Previa</h2>
            </div>
            <div className="p-5 flex justify-center bg-surface relative z-10">
              <div className="w-full max-w-[220px] bg-white rounded-lg shadow-md border border-outline-variant/20 overflow-hidden">
                <div className="aspect-square bg-surface-container relative">
                  {form.imageSrc && <Image src={form.imageSrc} alt={form.imageAlt} fill sizes="220px" className="object-cover" />}
                </div>
                <div className="p-3">
                  <p className="text-[10px] font-admin-label-caps text-on-surface-variant mb-1 uppercase">{form.category}</p>
                  <h3 className="text-sm font-semibold text-on-surface leading-tight mb-2 truncate">{form.name || "Nombre del producto"}</h3>
                  <p className="text-sm font-bold text-primary">
                    ${form.priceFrom.toLocaleString("es-MX")} <span className="text-[10px] font-normal text-on-surface-variant">MXN</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!isNew && (
            <div className="mt-4 pt-6 border-t border-outline-variant/50 flex flex-col items-center">
              <button
                onClick={() => setConfirmingDelete(true)}
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-error border border-error/30 rounded-lg hover:bg-error-container/20 transition-colors disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Eliminar producto permanentemente
              </button>
              <p className="text-xs text-on-surface-variant mt-2 text-center">
                ¿Ya no lo vendes? Te sugerimos simplemente marcarlo como inactivo arriba para conservar el historial.
              </p>
            </div>
          )}
        </div>
      </div>

      {confirmingDelete && (
        <>
          <div className="fixed inset-0 bg-inverse-surface/30 backdrop-blur-[1px] z-40" onClick={() => setConfirmingDelete(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant max-w-sm w-full p-6 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-error-container/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-error text-2xl">warning</span>
              </div>
              <h3 className="font-admin-title text-lg text-on-surface">¿Eliminar &quot;{form.name}&quot;?</h3>
              <p className="text-sm text-on-surface-variant">
                Esta acción no se puede deshacer. El producto se borrará permanentemente del catálogo y de cualquier temporada donde aparezca.
              </p>
              <div className="flex items-center gap-3 mt-3 w-full">
                <button
                  onClick={() => setConfirmingDelete(false)}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={remove}
                  disabled={isPending}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-on-error bg-error rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {isPending ? "Eliminando..." : "Sí, eliminar"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
