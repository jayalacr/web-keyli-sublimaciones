import Link from "next/link";
import Image from "next/image";
import { waLink } from "@/lib/constants";
import { getTemporadasActivas } from "@/lib/db";

// ponytail: variantes de tamaño/posición del mosaico, cíclicas por índice — es presentación, no dato de la temporada.
const LAYOUT_VARIANTS = [
  { wrap: "md:col-span-5 h-[600px] md:h-[700px]", title2xl: false, padLg: false },
  { wrap: "md:col-span-7 h-[450px] md:h-[550px] md:mt-24", title2xl: false, padLg: false },
  { wrap: "md:col-span-6 h-[500px] md:h-[600px]", title2xl: false, padLg: false },
  { wrap: "md:col-span-5 md:col-start-8 h-[550px] md:h-[650px] md:-mt-16", title2xl: false, padLg: false },
  { wrap: "md:col-span-4 h-[600px]", title2xl: true, padLg: false },
  { wrap: "md:col-span-8 h-[500px] md:h-[600px] md:mt-32", title2xl: false, padLg: true },
];

export default async function TemporadasPage() {
  const temporadas = await getTemporadasActivas();

  return (
    <div className="flex flex-col w-full bg-surface">
      <section className="w-full px-container-margin pt-section-gap-desktop pb-stack-lg max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 md:w-8/12 lg:w-6/12">
          <span className="font-label-caps text-on-surface-variant uppercase tracking-widest text-[11px] opacity-70">
            Catálogo
          </span>
          <h1 className="font-display-lg text-on-surface leading-none -ml-1">Temporadas</h1>
          <p className="font-body-main text-on-surface-variant max-w-md mt-4 opacity-80 leading-relaxed text-[17px]">
            Cada temporada reúne las piezas diseñadas especialmente para ese momento del año.
            Ediciones limitadas que cuentan una historia.
          </p>
        </div>
      </section>

      <section className="w-full px-container-margin pb-section-gap-mobile max-w-7xl mx-auto">
        <div className="flex items-center gap-8 border-b border-outline-variant/30 w-full relative">
          <Link href="/articulos" className="font-body-main text-on-surface-variant pb-4 hover:text-on-surface transition-colors">
            Artículos
          </Link>
          <span className="font-body-main text-on-surface pb-4 relative">
            Temporadas
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-on-surface" />
          </span>
        </div>
      </section>

      <section className="w-full px-container-margin pb-section-gap-desktop max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-8 md:gap-x-12">
          {temporadas.map((temporada, i) => {
            const layout = LAYOUT_VARIANTS[i % LAYOUT_VARIANTS.length];
            return (
              <Link
                key={temporada.slug}
                href={`/temporadas/${temporada.slug}`}
                className={`group relative bg-surface-container rounded-[20px] overflow-hidden cursor-pointer ${layout.wrap}`}
              >
                {temporada.portada_url && (
                  <Image
                    src={temporada.portada_url}
                    alt={temporada.portada_alt ?? temporada.nombre}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className={`absolute inset-0 flex flex-col justify-end text-white ${layout.padLg ? "p-8 md:p-12" : "p-8"}`}>
                  <span className="font-label-caps opacity-80 mb-3 tracking-wider">{temporada.piezas} piezas</span>
                  <h2
                    className={`leading-tight mb-2 transition-transform duration-500 ease-out group-hover:-translate-y-2 ${
                      layout.title2xl ? "font-display-sm-mobile" : "font-display-md"
                    }`}
                  >
                    {temporada.nombre}
                  </h2>
                  <p className="font-body-main opacity-90 transition-transform duration-500 ease-out group-hover:-translate-y-2 delay-75">
                    {temporada.eslogan}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="w-full px-container-margin pb-section-gap-desktop max-w-7xl mx-auto">
        <div className="bg-surface-container rounded-[24px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-64 h-64 border border-outline-variant/30 rounded-full opacity-50 pointer-events-none" />
          <div className="absolute right-12 -bottom-12 w-32 h-32 border border-outline-variant/20 rounded-full opacity-50 pointer-events-none" />
          <div className="flex flex-col gap-4 max-w-xl z-10">
            <h3 className="font-display-md text-on-surface leading-tight text-3xl md:text-4xl">
              ¿Preparas algo para una fecha especial?
            </h3>
            <p className="font-body-main text-on-surface-variant text-lg">
              Creamos colecciones exclusivas para eventos, marcas y celebraciones únicas. Cuéntanos
              tu idea y diseñaremos algo irrepetible.
            </p>
          </div>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 shrink-0 inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-full font-label-caps tracking-widest hover:bg-on-surface transition-colors duration-300"
          >
            <span className="material-symbols-outlined mr-2 text-[18px]">chat</span>
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
