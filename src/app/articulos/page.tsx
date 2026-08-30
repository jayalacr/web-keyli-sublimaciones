"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/data";
import { waLink } from "@/lib/constants";

export default function ArticulosPage() {
  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = category === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
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
          <div className="flex gap-stack-md border-b border-outline-variant/30 pb-4 mt-8 relative">
            <span className="font-label-caps text-on-surface-variant tracking-wider relative">
              Artículos
              <span className="absolute -bottom-4 left-0 w-full h-[2px] bg-primary rounded-full" />
            </span>
            <Link href="/temporadas" className="font-label-caps text-secondary/60 tracking-wider hover:text-on-surface transition-colors">
              Temporadas
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
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
          {filtered.map((product) => (
            <button
              key={product.slug}
              onClick={() => setSelected(product)}
              className={`group cursor-pointer flex flex-col gap-4 ${product.offset} relative overflow-hidden rounded-2xl bg-surface-container-low transition-all duration-500 hover:shadow-xl hover:-translate-y-2 text-left`}
            >
              <div className={`${product.aspect} w-full bg-surface-variant relative overflow-hidden`}>
                <Image src={product.image.src} alt={product.image.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="font-label-caps text-on-surface opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    Ver detalle
                  </span>
                </div>
              </div>
              <div className="p-6 pt-2 flex flex-col gap-1">
                <span className="font-label-caps text-primary">{product.category}</span>
                <h3 className="font-body-main text-on-surface font-semibold text-lg">{product.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}

      <div className="bg-surface-container-low mt-section-gap-mobile w-full py-section-gap-desktop px-container-margin relative overflow-hidden">
        <div className="absolute -right-32 -top-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-stack-lg relative z-10">
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-display-md text-on-surface-variant">¿Traes una idea que no está aquí?</h2>
            <p className="font-body-main text-on-surface-variant/80 max-w-lg">
              Escríbenos y diseñamos algo único para ti. Nuestro taller está equipado para hacer
              realidad tus proyectos más creativos.
            </p>
          </div>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-primary text-on-primary font-label-caps hover:bg-on-primary-fixed-variant transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Iniciar conversación
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/90 backdrop-blur-sm px-4 py-12 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-surface w-full max-w-6xl rounded-[24px] shadow-2xl flex flex-col lg:flex-row overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface-variant">close</span>
        </button>
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="aspect-[4/5] w-full bg-surface-variant relative overflow-hidden">
            <Image src={product.image.src} alt={product.image.alt} fill sizes="50vw" className="object-cover" />
          </div>
          {product.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-1 mt-1 bg-surface-container p-4">
              {product.gallery.map((img) => (
                <div key={img.src} className="aspect-square bg-surface-variant rounded-lg relative overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill sizes="150px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-label-caps text-primary uppercase tracking-widest">{product.category}</span>
              <h2 className="font-display-md text-on-surface-variant leading-tight">{product.title}</h2>
            </div>
            <p className="font-body-main text-on-surface-variant/80">{product.description}</p>
            <div className="flex flex-col gap-4 mt-4">
              <Spec label="Tamaños" value={product.sizes} />
              <Spec label="Colores Base" value={product.colors} />
              <Spec label="Técnica" value={product.technique} />
            </div>
            <div className="flex items-center gap-2 mt-2 bg-surface-container-low p-4 rounded-xl">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <span className="font-body-secondary text-on-surface-variant">
                Tiempo estimado de producción: 3 a 5 días hábiles.
              </span>
            </div>
          </div>
          <a
            href={waLink(`Hola, quiero cotizar: ${product.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 w-full py-4 rounded-full bg-primary text-on-primary font-label-caps hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
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
    <div className="flex items-start justify-between border-b border-outline-variant/20 pb-4">
      <span className="font-label-caps text-secondary uppercase">{label}</span>
      <span className="font-body-main text-on-surface-variant text-right">{value}</span>
    </div>
  );
}
