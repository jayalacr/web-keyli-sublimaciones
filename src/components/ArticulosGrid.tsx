"use client";

import { useState } from "react";
import Image from "next/image";
import { waLink } from "@/lib/constants";
import type { Producto } from "@/lib/db";

// ponytail: variantes de layout tipo mosaico, cíclicas por índice — es presentación, no dato del producto.
const LAYOUT_VARIANTS = [
  { aspect: "aspect-[4/5]", offset: "md:mt-12" },
  { aspect: "aspect-[3/4]", offset: "" },
  { aspect: "aspect-square", offset: "md:mt-4" },
  { aspect: "aspect-[4/3]", offset: "md:-mt-8" },
];

const PAGE_SIZE = 12;

export function ArticulosGrid({
  categorias,
  productos,
  initialCategory,
  whatsapp,
}: {
  categorias: string[];
  productos: Producto[];
  initialCategory?: string;
  whatsapp: string;
}) {
  const [category, setCategory] = useState(
    initialCategory && categorias.includes(initialCategory) ? initialCategory : "Todos"
  );
  const [selected, setSelected] = useState<Producto | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = category === "Todos" ? productos : productos.filter((p) => p.categoria?.nombre === category);
  const shown = filtered.slice(0, visible);

  return (
    <>
      <div className="px-container-margin pt-section-gap-desktop pb-section-gap-mobile w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-stack-lg max-w-4xl">
          <div className="flex flex-col gap-stack-sm">
            <span className="font-label-caps text-secondary tracking-widest uppercase">Catálogo</span>
            <h1 className="font-display-lg text-on-surface-variant">Artículos</h1>
            <p className="font-body-main text-on-surface-variant/80 max-w-2xl mt-4">
              Este es un catálogo informativo. Todas las piezas se personalizan y se cotizan
              directamente por WhatsApp para asegurar el mejor resultado.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="flex flex-wrap gap-3">
              {["Todos", ...categorias].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setVisible(PAGE_SIZE);
                  }}
                  className={
                    cat === category
                      ? "px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-caps transition-colors"
                      : "px-4 py-1.5 rounded-full border border-outline-variant text-on-surface-variant font-label-caps hover:bg-surface-container transition-colors"
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="font-label-caps text-secondary/70">{filtered.length} piezas</span>
          </div>
        </div>
      </div>

      <div className="px-container-margin pb-section-gap-desktop w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-gutter items-start">
          {shown.map((producto, i) => {
            const layout = LAYOUT_VARIANTS[i % LAYOUT_VARIANTS.length];
            return (
              <button
                key={producto.slug}
                onClick={() => setSelected(producto)}
                className={`group cursor-pointer flex flex-col gap-4 ${layout.offset} relative overflow-hidden rounded-2xl bg-surface-container-low transition-all duration-500 hover:shadow-xl hover:-translate-y-2 text-left`}
              >
                <div className={`${layout.aspect} w-full bg-surface-variant relative overflow-hidden`}>
                  {producto.imagen_url && (
                    <Image src={producto.imagen_url} alt={producto.imagen_alt ?? producto.nombre} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="font-label-caps text-on-surface opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                      Ver detalle
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-6 pt-2 flex flex-col gap-1">
                  <span className="font-label-caps text-primary">{producto.categoria?.nombre}</span>
                  <h3 className="font-body-main text-on-surface font-semibold text-lg">{producto.nombre}</h3>
                </div>
              </button>
            );
          })}
        </div>
        {visible < filtered.length && (
          <div className="flex justify-center mt-stack-lg">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="px-8 py-3 rounded-full border border-outline-variant font-label-caps text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Cargar más piezas
            </button>
          </div>
        )}
      </div>

      {selected && <ProductModal key={selected.slug} producto={selected} whatsapp={whatsapp} onClose={() => setSelected(null)} />}
    </>
  );
}

function ProductModal({ producto, whatsapp, onClose }: { producto: Producto; whatsapp: string; onClose: () => void }) {
  const images = [
    ...(producto.imagen_url ? [{ url: producto.imagen_url, alt: producto.imagen_alt ?? producto.nombre }] : []),
    ...producto.galeria,
  ];
  const [mainIndex, setMainIndex] = useState(0);
  const main = images[mainIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/90 backdrop-blur-sm px-4 py-6 sm:py-12 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-surface w-full max-w-6xl rounded-[24px] shadow-2xl flex flex-col lg:flex-row overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface-variant">close</span>
        </button>
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="aspect-[4/5] w-full bg-surface-variant relative overflow-hidden">
            {main && <Image src={main.url} alt={main.alt} fill sizes="50vw" className="object-cover" />}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-1 mt-1 bg-surface-container p-4">
              {images.map((img, i) => (
                <button
                  key={img.url}
                  onClick={() => setMainIndex(i)}
                  className={`aspect-square bg-surface-variant rounded-lg relative overflow-hidden ${
                    i === mainIndex ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100"
                  } transition-opacity`}
                >
                  <Image src={img.url} alt={img.alt} fill sizes="150px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-label-caps text-primary uppercase tracking-widest">{producto.categoria?.nombre}</span>
              <h2 className="font-display-md text-on-surface-variant leading-tight">{producto.nombre}</h2>
            </div>
            <p className="font-body-main text-on-surface-variant/80">{producto.descripcion}</p>
            <div className="flex flex-col gap-4 mt-4">
              <Spec label="Tamaños" value={producto.capacidades.join(", ")} />
              <Spec label="Colores Base" value={producto.colores.map((c) => c.etiqueta).join(", ")} />
              <Spec label="Técnica" value={producto.tecnica ?? ""} />
            </div>
            <div className="flex items-center gap-2 mt-2 bg-surface-container-low p-4 rounded-xl">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <span className="font-body-secondary text-on-surface-variant">
                Tiempo estimado de producción: {producto.dias_produccion} días hábiles.
              </span>
            </div>
          </div>
          <a
            href={waLink(whatsapp, `Hola, quiero cotizar: ${producto.nombre}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 lg:mt-12 w-full py-4 rounded-full bg-primary text-on-primary font-label-caps hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
          >
            Cotizar este producto por WhatsApp
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 border-b border-outline-variant/20 pb-4">
      <span className="font-label-caps text-secondary uppercase">{label}</span>
      <span className="font-body-main text-on-surface-variant sm:text-right">{value}</span>
    </div>
  );
}
