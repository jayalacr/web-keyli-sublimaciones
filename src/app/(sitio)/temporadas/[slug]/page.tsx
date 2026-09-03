import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { waLink } from "@/lib/constants";
import { getTemporadaConProductos, getTemporadasActivas } from "@/lib/db";
import { SeasonProductGrid, type SeasonProduct } from "./SeasonProductGrid";

export default async function SeasonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getTemporadaConProductos(slug);
  if (!result) notFound();
  const { temporada, productos } = result;

  const seasonProducts: SeasonProduct[] = productos.map((p) => ({
    title: p.nombre,
    category: p.categoria?.nombre ?? "",
    src: p.imagen_url ?? "",
    alt: p.imagen_alt ?? p.nombre,
  }));

  const otherSeasons = (await getTemporadasActivas()).filter((s) => s.slug !== temporada.slug).slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-surface">
      <section
        className="relative w-full h-[60vh] min-h-[500px] flex flex-col justify-end px-container-margin py-section-gap-mobile"
      >
        {temporada.portada_url && (
          <Image
            src={temporada.portada_url}
            alt={temporada.portada_alt ?? temporada.nombre}
            fill
            priority
            sizes="100vw"
            className="object-cover -z-10"
          />
        )}
        <div className="absolute inset-0 bg-on-tertiary-fixed-variant/60 mix-blend-multiply" />
        <div className="relative z-10 max-w-4xl">
          <nav className="flex items-center gap-2 mb-stack-md font-label-caps text-on-primary opacity-80 uppercase tracking-widest">
            <span>Catálogo</span>
            <span className="w-4 border-t border-on-primary/50" />
            <Link href="/temporadas">Temporadas</Link>
            <span className="w-4 border-t border-on-primary/50" />
            <span className="font-bold">{temporada.nombre}</span>
          </nav>
          <h1 className="font-display-lg text-on-primary mb-stack-sm drop-shadow-md">{temporada.nombre}</h1>
          <p className="font-body-main text-on-primary/90 max-w-2xl text-lg">
            {temporada.eslogan}. Piezas únicas que capturan el espíritu de la temporada.
          </p>
        </div>
      </section>

      <div className="px-container-margin py-stack-md border-b border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-stack-sm sticky top-20 bg-surface/90 backdrop-blur-md z-40">
        <Link
          href="/temporadas"
          className="flex items-center gap-2 font-label-caps text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver a temporadas
        </Link>
      </div>

      {seasonProducts.length > 0 ? (
        <SeasonProductGrid products={seasonProducts} />
      ) : (
        <section className="px-container-margin py-section-gap-desktop bg-surface text-center">
          <p className="font-body-main text-on-surface-variant max-w-lg mx-auto">
            Estamos preparando las piezas de esta colección. Escríbenos si ya tienes una idea en
            mente para {temporada.nombre.toLowerCase()}.
          </p>
        </section>
      )}

      <section className="w-full py-section-gap-mobile bg-secondary-fixed">
        <div className="max-w-3xl mx-auto px-container-margin text-center flex flex-col items-center">
          <h2 className="font-display-md text-on-secondary-fixed mb-stack-sm">Pide con tiempo</h2>
          <p className="font-body-main text-on-secondary-fixed-variant mb-stack-lg max-w-lg">
            La temporada alta requiere mayor tiempo de producción. Asegura tus piezas personalizadas
            con anticipación para garantizar la entrega a tiempo.
          </p>
          <a
            href={waLink(`Hola, quiero cotizar algo de la colección ${temporada.nombre}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full bg-on-secondary-fixed text-secondary-fixed font-label-caps hover:bg-on-secondary-fixed-variant transition-colors shadow-md"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      <section className="px-container-margin py-section-gap-mobile bg-surface-container-low">
        <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg">
          <h2 className="font-display-sm-mobile text-on-surface">Explora otras temporadas</h2>
          <Link
            href="/temporadas"
            className="font-label-caps text-primary hover:text-primary-container transition-colors hidden md:block"
          >
            Ver todas las colecciones →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
          {otherSeasons.map((s) => (
            <Link
              key={s.slug}
              href={`/temporadas/${s.slug}`}
              className="group block relative overflow-hidden rounded-2xl aspect-[4/3] bg-surface-container border border-outline-variant/20"
            >
              {s.portada_url && (
                <Image
                  src={s.portada_url}
                  alt={s.portada_alt ?? s.nombre}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h4 className="font-display-sm-mobile text-white text-2xl">{s.nombre}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
