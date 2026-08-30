"use client";

import { useState } from "react";
import Image from "next/image";
import type { SeasonProduct } from "@/lib/seasons";

export function SeasonProductGrid({ products }: { products: SeasonProduct[] }) {
  const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category)))];
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? products : products.filter((p) => p.category === active);
  const columns: SeasonProduct[][] = [[], [], []];
  filtered.forEach((p, i) => columns[i % 3].push(p));

  return (
    <section className="px-container-margin py-section-gap-mobile bg-surface">
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-3 mb-stack-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={
                cat === active
                  ? "px-5 py-2 rounded-full bg-surface-container font-label-caps text-on-surface border border-outline-variant/30 transition-colors"
                  : "px-5 py-2 rounded-full bg-surface font-label-caps text-on-surface-variant hover:bg-surface-variant border border-outline-variant/30 transition-colors"
              }
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-grid-gutter">
        {columns.map((col, i) => (
          <div
            key={i}
            className={`col-span-1 md:col-span-4 flex flex-col gap-grid-gutter ${
              i === 0 ? "mt-0 md:mt-12" : i === 2 ? "mt-0 md:mt-24" : ""
            }`}
          >
            {col.map((product) => (
              <div
                key={product.title}
                className={`group relative overflow-hidden rounded-2xl bg-surface-container ${product.aspect} border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow`}
              >
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-surface-container-low/90 backdrop-blur-sm rounded-full font-label-caps text-on-surface text-[10px]">
                    {product.category}
                  </span>
                </div>
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="font-display-sm-mobile text-white text-2xl">{product.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
