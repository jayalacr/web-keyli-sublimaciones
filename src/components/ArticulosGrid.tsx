"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { precioDesde, waLink } from "@/lib/constants";
import { Dialog } from "@/components/Dialog";
import { Destellos } from "@/components/Marca";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import type { Producto } from "@/lib/db";

// ponytail: inclinación de cada sticker, cíclica por índice — es presentación, no dato del producto.
const GIROS = ["-1.2deg", "1deg", "-0.6deg", "1.4deg", "-1.5deg", "0.8deg"];

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
  // El producto abierto vive en la URL (?producto=slug): se puede compartir y "atrás" cierra el detalle.
  const searchParams = useSearchParams();
  const selected = productos.find((p) => p.slug === searchParams.get("producto")) ?? null;
  const pushedRef = useRef(false);

  function openProducto(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("producto", slug);
    window.history.pushState(null, "", `?${params}`);
    pushedRef.current = true;
  }

  function closeProducto() {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
      return;
    }
    // Llegó por link directo: no hay entrada previa a la que volver.
    const params = new URLSearchParams(searchParams.toString());
    params.delete("producto");
    window.history.replaceState(null, "", params.size ? `?${params}` : window.location.pathname);
  }
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = category === "Todos" ? productos : productos.filter((p) => p.categoria?.nombre === category);
  const shown = filtered.slice(0, visible);

  return (
    <>
      {/* Encabezado sobre el tapete de corte */}
      <section className="tapete w-full pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="px-container-margin w-full max-w-[1440px] mx-auto flex flex-col gap-6">
          <span className="entrada font-label-caps text-primary" style={{ "--i": 0 } as React.CSSProperties}>
            Catálogo
          </span>
          <h1 className="entrada font-display-lg text-on-surface leading-[0.95]" style={{ "--i": 1 } as React.CSSProperties}>
            Nuestros <span className="marca">artículos</span>
            <Destellos className="inline-block w-[0.55em] h-[0.5em] ml-2 align-top" />
          </h1>
          <p className="entrada font-body-main text-on-surface-variant max-w-2xl" style={{ "--i": 2 } as React.CSSProperties}>
            Regalos, papelería, prendas y vinil para ti, tus eventos o tu negocio. Elige una pieza y la
            personalizamos contigo; la cotización es por WhatsApp.
          </p>

          {/* Filtros: en celular, una fila que se desliza; en escritorio, se acomodan en varias líneas */}
          <div className="entrada flex items-center justify-between gap-4 pt-4" style={{ "--i": 3 } as React.CSSProperties}>
            <div
              role="group"
              aria-label="Filtrar por categoría"
              className="flex gap-2.5 overflow-x-auto md:flex-wrap -mx-container-margin px-container-margin md:mx-0 md:px-0 pb-2 [scrollbar-width:none]"
            >
              {["Todos", ...categorias].map((cat) => {
                const activa = cat === category;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={activa}
                    onClick={() => {
                      setCategory(cat);
                      setVisible(PAGE_SIZE);
                    }}
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
          </div>
          <span className="font-label-caps text-on-surface-variant text-[11px]" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "pieza" : "piezas"}
          </span>
        </div>
      </section>

      <section className="px-container-margin pt-12 md:pt-16 pb-section-gap-mobile w-full max-w-[1440px] mx-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-4 py-12">
            <Image src="/keyli-husky.png" alt="" width={152} height={240} className="h-40 w-auto" />
            <h2 className="font-display-sm-mobile text-on-surface">Estamos preparando estas piezas</h2>
            <p className="font-body-main text-on-surface-variant max-w-md">
              Todavía no hay artículos en esta categoría, pero podemos hacerte uno a la medida.
            </p>
            <a
              href={waLink(whatsapp, `¡Hola! Me interesa algo de la categoría *${category}*.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="boton-sticker mt-2 inline-flex items-center gap-2 min-h-12 px-7 py-3 rounded-full bg-primary text-on-primary font-label-caps"
            >
              {SOCIAL_ICONS.whatsapp}
              Pregúntanos por WhatsApp
            </a>
          </div>
        ) : (
          <div key={category} className="aparece grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-x-8 md:gap-y-14">
            {shown.map((producto, i) => {
              const precio = precioDesde(producto.precio_desde_centavos);
              return (
                <button
                  key={producto.slug}
                  type="button"
                  onClick={() => openProducto(producto.slug)}
                  className="revela group flex flex-col text-left cursor-pointer rounded-[24px]"
                >
                  <div className="sticker relative w-full aspect-[4/5] rounded-[20px] sm:rounded-[24px]" style={{ "--giro": GIROS[i % GIROS.length] } as React.CSSProperties}>
                    <div className="absolute inset-0 rounded-[14px] sm:rounded-[18px] overflow-hidden bg-surface-container">
                      {producto.imagen_url && (
                        <Image
                          src={producto.imagen_url}
                          alt={producto.imagen_alt ?? producto.nombre}
                          fill
                          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    {producto.categoria?.nombre && (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2.5 sm:px-3 py-1 rounded-full bg-accent text-primary-strong font-label-caps text-[9px] sm:text-[10px] max-w-[85%] truncate">
                        {producto.categoria.nombre}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 sm:mt-5 px-1 font-display-sm-mobile text-[18px] sm:text-[22px] leading-tight text-on-surface group-hover:text-primary transition-colors">
                    {producto.nombre}
                  </h3>
                  <span className="mt-1.5 px-1 flex items-center gap-1.5 font-body-secondary text-on-surface-variant">
                    {precio ?? "Cotiza tu diseño"}
                    <span className="material-symbols-outlined text-[16px] text-primary transition-transform group-hover:translate-x-1" aria-hidden="true">
                      arrow_forward
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
        {visible < filtered.length && (
          <div className="flex justify-center mt-14">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2 min-h-12 px-8 py-3 rounded-full border-2 border-primary text-primary font-label-caps hover:bg-primary hover:text-on-primary transition-colors"
            >
              Ver más piezas
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">expand_more</span>
            </button>
          </div>
        )}
      </section>

      {selected && <ProductModal key={selected.slug} producto={selected} whatsapp={whatsapp} onClose={closeProducto} />}
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

  const precio = precioDesde(producto.precio_desde_centavos);
  const colores = producto.colores.map((c) => c.etiqueta).filter(Boolean);

  return (
    <Dialog label={producto.nombre} onClose={onClose} className="max-w-6xl rounded-[32px]">
      <div className="bg-surface w-full rounded-[32px] shadow-2xl flex flex-col lg:flex-row overflow-hidden relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-surface-container-lowest shadow-md hover:bg-surface-tint-soft transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface-variant" aria-hidden="true">close</span>
        </button>

        {/* Galería sobre el tapete de corte */}
        <div className="tapete bg-surface-tint-soft w-full lg:w-1/2 p-6 sm:p-10 flex flex-col gap-5">
          <div className="sticker relative aspect-[4/5] w-full rounded-[24px]" style={{ "--giro": "-1deg" } as React.CSSProperties}>
            <div className="absolute inset-0 rounded-[18px] overflow-hidden bg-surface-container">
              {main && <Image src={main.url} alt={main.alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />}
            </div>
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
              {images.map((img, i) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setMainIndex(i)}
                  aria-label={`Ver imagen ${i + 1} de ${images.length}`}
                  aria-current={i === mainIndex}
                  className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl relative overflow-hidden border-[3px] transition-all ${
                    i === mainIndex ? "border-primary scale-105" : "border-white opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-3 pr-12">
              {producto.categoria?.nombre && (
                <span className="px-3 py-1 rounded-full bg-accent text-primary-strong font-label-caps text-[10px]">
                  {producto.categoria.nombre}
                </span>
              )}
              <h2 className="font-display-md text-on-surface leading-[1.05]">{producto.nombre}</h2>
              {precio && <span className="font-body-main text-primary font-semibold text-lg">{precio}</span>}
            </div>
            {producto.descripcion && <p className="font-body-main text-on-surface-variant">{producto.descripcion}</p>}

            <dl className="flex flex-col gap-4">
              <Spec label="Tamaños" valores={producto.capacidades} />
              <Spec label="Colores base" valores={colores} />
              <Spec label="Técnica" valores={producto.tecnica ? [producto.tecnica] : []} />
            </dl>

            {producto.dias_produccion > 0 && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface-tint-soft">
                <span className="material-symbols-outlined text-primary" aria-hidden="true">schedule</span>
                <span className="font-body-secondary text-on-surface">
                  Producción estimada: <strong>{producto.dias_produccion} días hábiles</strong>
                </span>
              </div>
            )}
          </div>
          <a
            href={waLink(whatsapp, `¡Hola! Vi *${producto.nombre}* en su página y me gustaría cotizarlo.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-sticker w-full min-h-14 py-4 rounded-full bg-primary text-on-primary font-label-caps flex items-center justify-center gap-2"
          >
            {SOCIAL_ICONS.whatsapp}
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </Dialog>
  );
}

// Especificación como fila de chips; si no hay valores no se muestra.
function Spec({ label, valores }: { label: string; valores: string[] }) {
  if (valores.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 pb-4 border-b border-outline-variant/30">
      <dt className="font-label-caps text-on-surface-variant text-[11px]">{label}</dt>
      <dd className="flex flex-wrap gap-2">
        {valores.map((v) => (
          <span key={v} className="px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/40 font-body-secondary text-on-surface">
            {v}
          </span>
        ))}
      </dd>
    </div>
  );
}
