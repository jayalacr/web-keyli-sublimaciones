"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type SeasonProduct = { slug: string; title: string; category: string; src: string; alt: string };

// ponytail: inclinación de cada sticker, cíclica por índice — es presentación, no dato del producto.
const GIROS = ["-1.2deg", "1deg", "-0.6deg", "1.4deg", "-1.5deg", "0.8deg"];

export function SeasonProductGrid({ products }: { products: SeasonProduct[] }) {
  const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? products : products.filter((p) => p.category === active);

  return (
    <section className="px-container-margin pt-10 md:pt-14 pb-section-gap-mobile max-w-[1440px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        {categories.length > 2 ? (
          <div
            role="group"
            aria-label="Filtrar por categoría"
            className="flex gap-2.5 overflow-x-auto sm:flex-wrap -mx-container-margin px-container-margin sm:mx-0 sm:px-0 pb-2 [scrollbar-width:none]"
          >
            {categories.map((cat) => {
              const activa = cat === active;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={activa}
                  onClick={() => setActive(cat)}
                  className={`shrink-0 min-h-11 px-5 rounded-full font-label-caps text-[12px] transition-colors ${
                    activa
                      ? "boton-sticker bg-primary text-on-primary"
                      : "bg-surface-container-lowest border-2 border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        ) : (
          <span />
        )}
        <span className="font-label-caps text-on-surface-variant text-[11px]" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "pieza" : "piezas"}
        </span>
      </div>

      <div key={active} className="aparece grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-x-8 md:gap-y-14">
        {filtered.map((product, i) => (
          <Link
            key={product.slug}
            href={`/articulos?producto=${encodeURIComponent(product.slug)}`}
            className="revela group flex flex-col rounded-[24px]"
          >
            <div className="sticker relative w-full aspect-[4/5] rounded-[20px] sm:rounded-[24px]" style={{ "--giro": GIROS[i % GIROS.length] } as React.CSSProperties}>
              <div className="absolute inset-0 rounded-[14px] sm:rounded-[18px] overflow-hidden bg-surface-container">
                {product.src && (
                  <Image
                    src={product.src}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              {product.category && (
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2.5 sm:px-3 py-1 rounded-full bg-accent text-primary-strong font-label-caps text-[9px] sm:text-[10px] max-w-[85%] truncate">
                  {product.category}
                </span>
              )}
            </div>
            <h3 className="mt-4 sm:mt-5 px-1 font-display-sm-mobile text-[18px] sm:text-[22px] leading-tight text-on-surface group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <span className="mt-1.5 px-1 inline-flex items-center gap-1.5 font-body-secondary text-on-surface-variant">
              Ver y cotizar
              <span className="material-symbols-outlined text-[16px] text-primary transition-transform group-hover:translate-x-1" aria-hidden="true">
                arrow_forward
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
