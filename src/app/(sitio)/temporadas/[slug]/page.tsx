import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DEFAULT_PHONE, waLink } from "@/lib/constants";
import { getContacto, getTemporadaConProductos, getTemporadasActivas } from "@/lib/db";
import { SeasonCard } from "@/components/SeasonCard";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { Destellos } from "@/components/Marca";
import { SeasonProductGrid, type SeasonProduct } from "./SeasonProductGrid";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getTemporadaConProductos(slug);
  return result ? { title: `${result.temporada.nombre} — Keyli Studio` } : {};
}

export default async function SeasonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [result, contacto, todas] = await Promise.all([getTemporadaConProductos(slug), getContacto(), getTemporadasActivas()]);
  if (!result) notFound();
  const { temporada, productos } = result;
  const whatsapp = contacto?.whatsapp ?? DEFAULT_PHONE;

  const seasonProducts: SeasonProduct[] = productos.map((p) => ({
    slug: p.slug,
    title: p.nombre,
    category: p.categoria?.nombre ?? "",
    src: p.imagen_url ?? "",
    alt: p.imagen_alt ?? p.nombre,
  }));

  const otherSeasons = todas.filter((s) => s.slug !== temporada.slug && s.portada_url).slice(0, 3);

  return (
    <div
      className="flex flex-col w-full bg-surface"
      // Acento de la temporada (docs/marca.md); si el slug no tiene color, usa el primario.
      style={{ "--season": `var(--color-season-${temporada.slug}, var(--color-primary))` } as React.CSSProperties}
    >
      {/* Portada: bloque redondeado con el color de la temporada */}
      <section className="tapete w-full px-container-margin pt-24 md:pt-28 pb-4">
        <div className="pega relative w-full min-h-[420px] md:min-h-[520px] rounded-[36px] overflow-hidden flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-[1440px] mx-auto">
          {temporada.portada_url && (
            <Image
              src={temporada.portada_url}
              alt={temporada.portada_alt ?? temporada.nombre}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-(--season) via-(--season)/55 to-(--season)/10" />
          <div className="relative z-10 max-w-3xl flex flex-col items-start gap-4 text-white">
            <nav aria-label="Ruta" className="flex flex-wrap items-center gap-2 font-label-caps text-[11px] text-white/85">
              <Link href="/temporadas" className="inline-flex items-center gap-1 min-h-11 hover:text-white underline-offset-4 hover:underline">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_back</span>
                Temporadas
              </Link>
              <span aria-hidden="true">✦</span>
              <span aria-current="page" className="text-white">{temporada.nombre}</span>
            </nav>
            <h1 className="font-display-lg text-white drop-shadow-sm">{temporada.nombre}</h1>
            {temporada.eslogan && <p className="font-body-main text-white/90 text-lg max-w-2xl">{temporada.eslogan}</p>}
          </div>
          <Destellos className="absolute top-6 right-6 md:top-10 md:right-10 w-14 h-14 md:w-20 md:h-20" />
        </div>
      </section>

      {seasonProducts.length > 0 ? (
        <SeasonProductGrid products={seasonProducts} />
      ) : (
        <section className="px-container-margin py-section-gap-mobile flex flex-col items-center text-center gap-4">
          <Image src="/keyli-husky.png" alt="" width={152} height={240} className="h-40 w-auto" />
          <h2 className="font-display-sm-mobile text-on-surface">Estamos preparando esta colección</h2>
          <p className="font-body-main text-on-surface-variant max-w-md">
            Si ya tienes una idea para {temporada.nombre.toLowerCase()}, escríbenos y la diseñamos contigo.
          </p>
        </section>
      )}

      {/* Pide con tiempo — con el color de la temporada */}
      <section className="w-full px-container-margin pb-section-gap-mobile">
        <div className="relative overflow-hidden rounded-[36px] bg-(--season)/10 border-2 border-dashed border-(--season)/35 px-6 py-14 md:py-16 max-w-[1440px] mx-auto">
          <div className="revela max-w-2xl mx-auto text-center flex flex-col items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-(--season) text-white flex items-center justify-center">
              <span className="material-symbols-outlined" aria-hidden="true">event_upcoming</span>
            </span>
            <h2 className="font-display-md text-on-surface">Pide con tiempo</h2>
            <p className="font-body-main text-on-surface-variant max-w-lg">
              En temporada alta la producción tarda más. Aparta tus piezas con anticipación para que lleguen
              cuando las necesitas.
            </p>
            <a
              href={waLink(whatsapp, `¡Hola! Quiero cotizar algo de la colección *${temporada.nombre}*.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 min-h-12 px-8 py-4 rounded-full bg-(--season) text-white font-label-caps shadow-[0_4px_0_rgb(0_0_0/0.25)] hover:-translate-y-0.5 active:translate-y-0.5 transition-transform"
            >
              {SOCIAL_ICONS.whatsapp}
              Cotizar esta colección
            </a>
          </div>
        </div>
      </section>

      {otherSeasons.length > 0 && (
        <section className="px-container-margin pb-section-gap-mobile max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-stack-lg">
            <div className="revela flex flex-col gap-2">
              <span className="font-label-caps text-primary">Sigue explorando</span>
              <h2 className="font-display-md text-on-surface">Otras <span className="marca">temporadas</span></h2>
            </div>
            <Link
              href="/temporadas"
              className="inline-flex items-center gap-2 min-h-11 font-label-caps text-primary underline decoration-accent-soft decoration-[3px] underline-offset-[6px] hover:decoration-primary transition-colors"
            >
              Ver todas
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
            {otherSeasons.map((s) => (
              <SeasonCard
                key={s.slug}
                href={`/temporadas/${s.slug}`}
                title={s.nombre}
                portadaUrl={s.portada_url!}
                portadaAlt={s.portada_alt ?? s.nombre}
                galeria={s.galeria}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
