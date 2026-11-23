import Link from "next/link";
import Image from "next/image";
import { DEFAULT_PHONE, waLink } from "@/lib/constants";
import { getContacto, getTemporadasActivas } from "@/lib/db";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { Destellos } from "@/components/Marca";

export const metadata = {
  title: "Temporadas — Keyli Studio",
  description: "Colecciones personalizadas para San Valentín, Día de las Madres, Navidad y cada fecha del año, hechas en Monterrey.",
};

// ponytail: inclinación de cada sticker, cíclica por índice — es presentación, no dato de la temporada.
const GIROS = ["-1.2deg", "1deg", "-0.6deg", "1.4deg", "-1.5deg", "0.8deg"];

export default async function TemporadasPage() {
  const [temporadas, contacto] = await Promise.all([getTemporadasActivas(), getContacto()]);
  const whatsapp = contacto?.whatsapp ?? DEFAULT_PHONE;

  return (
    <div className="flex flex-col w-full bg-surface">
      <section className="tapete w-full pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="px-container-margin max-w-[1440px] mx-auto flex flex-col gap-6">
          <span className="entrada font-label-caps text-primary" style={{ "--i": 0 } as React.CSSProperties}>
            Para cada fecha
          </span>
          <h1 className="entrada font-display-lg text-on-surface leading-[0.95]" style={{ "--i": 1 } as React.CSSProperties}>
            Colecciones por <span className="marca">temporada</span>
            <Destellos className="inline-block w-[0.55em] h-[0.5em] ml-2 align-top" />
          </h1>
          <p className="entrada font-body-main text-on-surface-variant max-w-2xl" style={{ "--i": 2 } as React.CSSProperties}>
            Piezas pensadas para cada momento del año: para regalar, para tu evento o para tu negocio.
            Elige una colección y la personalizamos contigo.
          </p>
        </div>
      </section>

      <section className="w-full px-container-margin pt-12 md:pt-16 pb-section-gap-mobile max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {temporadas.map((temporada, i) => (
            <Link
              key={temporada.slug}
              href={`/temporadas/${temporada.slug}`}
              className="revela group block rounded-[28px]"
              style={{ "--season": `var(--color-season-${temporada.slug}, var(--color-primary))` } as React.CSSProperties}
            >
              <div className="sticker relative aspect-[4/5] rounded-[28px]" style={{ "--giro": GIROS[i % GIROS.length] } as React.CSSProperties}>
                <div className="absolute inset-0 rounded-[22px] overflow-hidden bg-surface-container">
                  {temporada.portada_url && (
                    <Image
                      src={temporada.portada_url}
                      alt={temporada.portada_alt ?? temporada.nombre}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-(--season) via-(--season)/25 to-transparent opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 flex flex-col items-start gap-2 text-white">
                    <h2 className="font-display-md text-[34px] md:text-[40px] leading-[1] drop-shadow-sm">{temporada.nombre}</h2>
                    {temporada.eslogan && <p className="font-body-secondary text-white/90">{temporada.eslogan}</p>}
                  </div>
                </div>
                {temporada.piezas > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-primary-strong font-label-caps text-[10px]">
                    {temporada.piezas} {temporada.piezas === 1 ? "pieza" : "piezas"}
                  </span>
                )}
              </div>
              <span className="mt-5 px-1 inline-flex items-center gap-2 font-label-caps text-primary">
                Explorar colección
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full px-container-margin pb-section-gap-mobile max-w-[1440px] mx-auto">
        <div className="tapete-oscuro relative overflow-hidden rounded-[36px] bg-primary-strong text-white px-6 py-16 md:px-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <Destellos className="absolute top-8 right-8 w-12 h-12 md:w-16 md:h-16" />
          <div className="revela relative flex flex-col gap-4 max-w-xl">
            <h2 className="font-display-md text-white leading-tight">¿Preparas algo para una fecha especial?</h2>
            <p className="font-body-main text-white/85">
              Diseñamos colecciones para eventos, marcas y celebraciones. Cuéntanos tu idea y la hacemos
              con tiempo.
            </p>
          </div>
          <a
            href={waLink(whatsapp, "¡Hola! Estoy preparando algo para una fecha especial y me gustaría cotizar.")}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-sticker relative shrink-0 inline-flex items-center justify-center gap-2 min-h-12 px-8 py-4 rounded-full bg-accent text-primary-strong font-label-caps"
          >
            {SOCIAL_ICONS.whatsapp}
            Escríbenos
          </a>
        </div>
      </section>
    </div>
  );
}
