import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { waLink } from "@/lib/constants";
import { SEASONS, getSeason } from "@/lib/seasons";
import { SeasonProductGrid } from "./SeasonProductGrid";

export function generateStaticParams() {
  return SEASONS.map((s) => ({ slug: s.slug }));
}

export default async function SeasonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const season = getSeason(slug);
  if (!season) notFound();

  const otherSeasons = SEASONS.filter((s) => s.slug !== season.slug).slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-surface">
      <section
        className="relative w-full h-[60vh] min-h-[500px] flex flex-col justify-end px-container-margin py-section-gap-mobile"
      >
        <Image
          src={season.src}
          alt={season.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-on-tertiary-fixed-variant/60 mix-blend-multiply" />
        <div className="relative z-10 max-w-4xl">
          <nav className="flex items-center gap-2 mb-stack-md font-label-caps text-on-primary opacity-80 uppercase tracking-widest">
            <span>Catálogo</span>
            <span className="w-4 border-t border-on-primary/50" />
            <Link href="/temporadas">Temporadas</Link>
            <span className="w-4 border-t border-on-primary/50" />
            <span className="font-bold">{season.title}</span>
          </nav>
          <h1 className="font-display-lg text-on-primary mb-stack-sm drop-shadow-md">{season.title}</h1>
          <p className="font-body-main text-on-primary/90 max-w-2xl text-lg">
            {season.tagline}. Piezas únicas que capturan el espíritu de la temporada.
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

      {season.products.length > 0 ? (
        <SeasonProductGrid products={season.products} />
      ) : (
        <section className="px-container-margin py-section-gap-desktop bg-surface text-center">
          <p className="font-body-main text-on-surface-variant max-w-lg mx-auto">
            Estamos preparando las piezas de esta colección. Escríbenos si ya tienes una idea en
            mente para {season.title.toLowerCase()}.
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
            href={waLink(`Hola, quiero cotizar algo de la colección ${season.title}`)}
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
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h4 className="font-display-sm-mobile text-white text-2xl">{s.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
