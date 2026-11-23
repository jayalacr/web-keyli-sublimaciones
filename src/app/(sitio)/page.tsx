import Image from "next/image";
import Link from "next/link";
import { DEFAULT_PHONE, tiktokProfileUrl, waLink } from "@/lib/constants";
import { getContacto, getOpinionesAprobadas, getProductosActivos, getTemporadasActivas, getTextosInicio, type Producto } from "@/lib/db";
import { SeasonCard } from "@/components/SeasonCard";
import { TestimonialForm } from "@/components/TestimonialForm";
import { TikTokEmbed } from "@/components/TikTokEmbed";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { conMarca, Destellos, Sello } from "@/components/Marca";

export const metadata = {
  title: "Keyli Studio — Diseño & Personalización",
  description: "Artículos personalizados con diseño propio, hechos en Monterrey.",
};

const TEXTOS_INICIO_FALLBACK = {
  hero_titulo: "Lo *personalizado* se siente distinto",
  hero_subtitulo: "Diseñamos y personalizamos regalos, papelería y prendas para ti, tus eventos o tu negocio.",
  hero_cta: "Ver artículos",
  hero_imagen_url:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBAPGKwmkRk1c-SeY9RxFxWCn9T0FRlX0Ia85So39yAv2fKWVlkHkPfAWLlBemvLR4mn-bdbYmb1O7G8H9AjjO_XtFcdtZNU_QR70VqQwdGzxJedmJf5k640Eum6hOl6a5lj1Uh91CQNoGvUQqXMmMBgQHj6OQypfREa9Nl8MWDZr6L5uUCW4S5yS4Yw674FxBaM0zFqXDg3CfC8elUN1_tmEqu57qjHaiepQ7SwUh7N6EEDq5z8gsD",
  hero_imagen_alt: "Termo y playera personalizados sobre una superficie de concreto, iluminación editorial.",
  historia_titulo: "Todo empezó con *Keyli*",
  historia_texto: "Keyli no es solo un nombre, es la inspiración detrás de nuestra dedicación. Al igual que la lealtad y el carácter único de un husky, cada pieza que creamos está hecha con un propósito y atención inquebrantable.",
  historia_imagen_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoQpbkM9y29c7H5i7QhXN0ox7NTur9mEEez8oZ_2dLy1TsMyctEz4c3CuF-5vs60LzGZCxrR0EmdVsKYzsm-xzAqCggKygAy6L7mNOdSZdGADGhRJXIfgqBsWe0_QP2kwtSzgORvkvH7vsV5RVk-5eCbAyiDCLTS0uwYdRM9BG3VZ7Gxgt2alF9RmxeKLvyEjUVOGopwDhtF-6aWkP958I3u_QcskaXNS7k6XlxGSl-U4c0LTvmpjX",
  historia_imagen_alt: "Retrato de un husky en un estudio minimalista, luz cálida y natural.",
  nosotros_imagen_url:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAsZ-QLNPxoNzXdvc7V-6N-J60XgVNdBxMDaHclP4GuWwim8Gyo4EZPPJH9lnzFGBRDymymad_xpDHpnsriE7NqBij59W4Q6XhMnUUhmNBK_iLvILYI-kQlDRx4InIuabdQ6O3nYQ6VT31G56Gifhga_oWo5CtpcprILgDZo04yeu1n2aaLquMkN629vT37d7T_2YhJ6aXuHAgT7_5lxi9p9EuE_sDCV3mULmiAynIvTmJ0xE5RRHg7",
  nosotros_imagen_alt: "Retrato editorial de una husky siberiana en un estudio, luz suave y natural.",
  insignias_confianza: [
    "Envíos a todo México",
    "Desde 2021",
    "Sublimación, vinil, DTF y papelería",
    "Apruebas tu diseño antes de producir",
  ] as [string, string, string, string],
};

// Íconos de las 4 insignias, por posición (el texto se edita en /admin/configuracion).
const ICONOS_INSIGNIAS = ["local_shipping", "workspace_premium", "palette", "task_alt"];
const SERVICIOS = ["Sublimación", "Vinil", "DTF", "Papelería creativa", "Regalos", "Eventos", "Negocios"];
// Inclinación de los stickers: alterna para que no se vea mecánico.
const GIROS = ["-1.5deg", "1.2deg", "-0.8deg", "1.6deg", "-1.2deg"];

const conI = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function Home() {
  const [textos, temporadas, contacto, opiniones, productos] = await Promise.all([
    getTextosInicio().then((t) => t ?? TEXTOS_INICIO_FALLBACK),
    getTemporadasActivas(),
    getContacto(),
    getOpinionesAprobadas(),
    getProductosActivos(),
  ]);
  const seasons = temporadas.filter((t) => t.portada_url).slice(0, 3);
  const destacados = productos.filter((p) => p.destacado && p.imagen_url).slice(0, 4);
  const opinionesDestacadas =
    opiniones.length > 5 ? [...opiniones].sort(() => Math.random() - 0.5).slice(0, 5) : opiniones;
  const whatsapp = contacto?.whatsapp ?? DEFAULT_PHONE;
  const instagramUrl = contacto?.instagram_url ?? "https://instagram.com/keylistudio.mx";
  const facebookUrl = contacto?.facebook_url ?? "https://facebook.com/keylisublimaciones";
  const tiktokUrls = contacto?.tiktok_urls ?? [];
  const tiktokDestacados =
    tiktokUrls.length > 3 ? [...tiktokUrls].sort(() => Math.random() - 0.5).slice(0, 3) : tiktokUrls;
  const tiktokPreviews = await Promise.all(
    tiktokDestacados.map(async (url) => {
      try {
        const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, {
          next: { revalidate: 3600 },
        });
        const data = res.ok ? await res.json() : null;
        return { url, thumbnailUrl: data?.thumbnail_url as string | undefined, title: data?.title as string | undefined };
      } catch {
        return { url, thumbnailUrl: undefined, title: undefined };
      }
    })
  );

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Hero — sobre el "tapete de corte" */}
      <section className="tapete relative w-full pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="px-container-margin grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-grid-gutter items-center w-full">
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start gap-6 z-10">
            <span className="entrada inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/40 font-label-caps text-[11px] text-on-surface-variant" style={conI(0)}>
              <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
              Monterrey, México
            </span>
            <h1 className="entrada font-display-lg text-on-surface leading-[0.92]" style={conI(1)}>
              {conMarca(textos.hero_titulo)}
              <Destellos className="inline-block w-[0.55em] h-[0.5em] ml-2 align-top" />
            </h1>
            <p className="entrada font-body-main text-on-surface-variant max-w-[420px]" style={conI(2)}>
              {textos.hero_subtitulo}
            </p>
            <div className="entrada flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2" style={conI(3)}>
              <Link
                href="/articulos"
                className="boton-sticker inline-flex items-center justify-center gap-2 min-h-12 px-8 py-3 bg-primary text-on-primary font-label-caps rounded-full"
              >
                {textos.hero_cta}
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
              </Link>
              <a
                href={waLink(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-12 font-label-caps text-primary-strong underline decoration-accent-soft decoration-[3px] underline-offset-[6px] hover:decoration-primary transition-colors"
              >
                {SOCIAL_ICONS.whatsapp}
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>

          {/* Foto principal como sticker troquelado, con su línea de corte y el sello */}
          <div className="md:col-span-6 lg:col-span-7 relative mx-2 md:mx-0">
            <div className="pega corte relative aspect-[4/5] sm:aspect-[5/4] md:aspect-[4/3.4] sticker rounded-[28px]" style={{ "--giro": "1.5deg", "--i": 2 } as React.CSSProperties}>
              <div className="absolute inset-0 rounded-[22px] overflow-hidden">
                <Image
                  src={textos.hero_imagen_url}
                  alt={textos.hero_imagen_alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <Sello className="pega absolute -left-3 -bottom-8 md:-left-10 md:-bottom-10 w-28 h-28 md:w-36 md:h-36" style={conI(5)} />
          </div>
        </div>
      </section>

      {/* Cinta de servicios — como masking tape cruzando la página */}
      <div className="relative z-10 -my-3 py-3 overflow-hidden">
        <p className="sr-only">Servicios: sublimación, vinil, DTF y papelería creativa, para regalos, eventos y negocios.</p>
        <div className="cinta bg-primary-strong text-white py-3 md:py-4 whitespace-nowrap" aria-hidden="true">
          {[0, 1].map((rep) => (
            <span key={rep} className="inline-flex items-center">
              {SERVICIOS.map((s) => (
                <span key={s} className="inline-flex items-center font-display-sm-mobile text-[22px] md:text-[28px] px-4 md:px-6">
                  {s}
                  <span className="text-accent ml-8 md:ml-12 text-[18px]">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Insignias de confianza */}
      <section className="w-full pt-14 pb-4 md:pt-20">
        <ul className="px-container-margin grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {textos.insignias_confianza.map((item, i) => (
            <li
              key={item}
              className="revela flex items-center gap-3 p-4 md:p-5 rounded-2xl bg-surface-tint-soft"
            >
              <span className="shrink-0 w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined leading-none text-[22px]" aria-hidden="true">{ICONOS_INSIGNIAS[i]}</span>
              </span>
              <span className="font-body-secondary font-semibold text-on-surface leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Lo Más Pedido — administrado desde /admin/productos: toggle "Destacado en Inicio" de cada producto */}
      {destacados.length > 0 && (
        <section className="w-full py-section-gap-mobile md:py-section-gap-desktop">
          <div className="px-container-margin">
            <EncabezadoSeccion etiqueta="Selección" titulo="Lo más *pedido*" destellos />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8">
              {destacados.map((p, i) => (
                <FeaturedTile key={p.id} producto={p} giro={GIROS[i % GIROS.length]} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                href="/articulos"
                className="inline-flex items-center gap-2 min-h-12 px-7 py-3 rounded-full border-2 border-primary text-primary font-label-caps hover:bg-primary hover:text-on-primary transition-colors"
              >
                Ver todos los artículos
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Colecciones por temporada */}
      {seasons.length > 0 && (
        <section className="w-full py-section-gap-mobile">
          <div className="px-container-margin">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-stack-lg">
              <EncabezadoSeccion etiqueta="Para cada fecha" titulo="Colecciones por *temporada*" className="mb-0" />
              <Link
                href="/temporadas"
                className="revela inline-flex items-center gap-2 min-h-11 font-label-caps text-primary underline decoration-accent-soft decoration-[3px] underline-offset-[6px] hover:decoration-primary transition-colors"
              >
                Ver todas las temporadas
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
              {seasons.map((season) => (
                <SeasonCard
                  key={season.slug}
                  href={`/temporadas/${season.slug}`}
                  title={season.nombre}
                  portadaUrl={season.portada_url!}
                  portadaAlt={season.portada_alt ?? season.nombre}
                  galeria={season.galeria}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nuestra historia — bloque lila con la foto de Keyli como polaroid */}
      <section className="w-full px-container-margin py-section-gap-mobile">
        <div className="relative rounded-[36px] bg-surface-tint-soft px-6 py-14 md:px-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-center overflow-hidden">
          <div className="md:col-span-5 relative mx-auto w-full max-w-[380px]">
            <div className="revela sticker relative aspect-[4/5] rounded-[24px]" style={{ "--giro": "-2.5deg" } as React.CSSProperties}>
              <div className="absolute inset-0 rounded-[18px] overflow-hidden">
                <Image
                  src={textos.historia_imagen_url}
                  alt={textos.historia_imagen_alt}
                  fill
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
            <span className="absolute -top-4 -right-2 md:-right-6 rotate-6 px-4 py-2 rounded-full bg-accent text-primary-strong font-display-sm-mobile text-[20px] shadow-md">
              Ella es Keyli ✦
            </span>
          </div>
          <div className="revela md:col-span-7 flex flex-col items-start gap-5">
            <span className="font-label-caps text-primary">Nuestra historia</span>
            <h2 className="font-display-md text-on-surface leading-[1.05]">{conMarca(textos.historia_titulo)}</h2>
            <p className="font-body-main text-on-surface-variant max-w-[520px]">{textos.historia_texto}</p>
            <Link
              href="/nosotros"
              className="boton-sticker inline-flex items-center gap-2 min-h-12 mt-2 px-7 py-3 rounded-full bg-primary text-on-primary font-label-caps"
            >
              Conocer la historia completa
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Redes sociales: TikTok (embed nativo) + enlaces */}
      <section className="w-full py-section-gap-mobile overflow-hidden">
        <div className="px-container-margin mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <EncabezadoSeccion etiqueta="Detrás del taller" titulo="Síguenos en *redes*" className="mb-0" />
          <div className="revela flex flex-wrap gap-3">
            {[
              { href: instagramUrl, icon: SOCIAL_ICONS.instagram, label: "Instagram" },
              { href: facebookUrl, icon: SOCIAL_ICONS.facebook, label: "Facebook" },
              ...(tiktokUrls.length > 0 ? [{ href: tiktokProfileUrl(tiktokUrls), icon: SOCIAL_ICONS.tiktok, label: "TikTok" }] : []),
            ].map((red) => (
              <a
                key={red.label}
                href={red.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-11 px-5 py-2 rounded-full bg-surface-tint-soft text-primary-strong font-label-caps hover:bg-primary hover:text-on-primary transition-colors"
              >
                {red.icon}
                {red.label}
              </a>
            ))}
          </div>
        </div>
        {tiktokPreviews.length > 0 && (
          <div className="px-container-margin flex flex-wrap justify-center gap-8">
            {tiktokPreviews.map((preview) => (
              <div key={preview.url} className="w-full max-w-[320px] sm:w-[320px]">
                <TikTokEmbed url={preview.url} thumbnailUrl={preview.thumbnailUrl} title={preview.title} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Opiniones — notas pegadas sobre el tapete */}
      <section className="tapete w-full py-section-gap-mobile md:py-section-gap-desktop">
        <div className="px-container-margin">
          <div className="revela text-center max-w-xl mx-auto mb-stack-lg flex flex-col items-center gap-3">
            <span className="font-label-caps text-primary">Opiniones</span>
            <h2 className="font-display-md text-on-surface">Lo que dicen nuestros <span className="marca">clientes</span></h2>
            <p className="font-body-main text-on-surface-variant">
              Historias reales de quienes ya personalizaron su pieza con nosotros.
            </p>
          </div>
          {opinionesDestacadas.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-8 mb-stack-lg">
              {opinionesDestacadas.map((o, i) => (
                <figure
                  key={o.id}
                  className="revela sticker w-full md:w-[calc(33.333%-1.5rem)] bg-surface-container-lowest p-7 rounded-[24px]"
                  style={{ "--giro": GIROS[i % GIROS.length] } as React.CSSProperties}
                >
                  <div className="flex gap-1 text-accent mb-4" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <span key={s} className="text-[18px]">✦</span>
                    ))}
                  </div>
                  <blockquote className="font-body-main text-on-surface mb-6">&ldquo;{o.texto}&rdquo;</blockquote>
                  <figcaption className="flex flex-col">
                    <span className="font-label-caps text-primary-strong">{o.nombre}</span>
                    {o.detalle && <span className="font-body-secondary text-on-surface-variant text-sm">{o.detalle}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="font-body-main text-on-surface-variant text-center mb-stack-lg max-w-md mx-auto">
              ¿Ya recibiste tu pedido? Nos encantaría conocer tu experiencia.
            </p>
          )}
          <TestimonialForm />
        </div>
      </section>

      {/* Banda de contacto — bloque morado redondeado con el tapete en blanco */}
      <section className="w-full px-container-margin py-section-gap-mobile">
        <div className="tapete-oscuro relative overflow-hidden rounded-[36px] bg-primary-strong text-white px-6 py-16 md:py-24">
          <Destellos className="absolute top-8 right-8 md:top-12 md:right-16 w-14 h-14 md:w-20 md:h-20" />
          <div className="revela relative flex flex-col items-center text-center max-w-3xl mx-auto gap-stack-md">
            <h2 className="font-display-md text-white leading-tight">Cuéntanos qué tienes en mente</h2>
            <p className="font-body-main text-white/85 max-w-lg">
              Tú traes la idea, nosotros la diseñamos contigo. Escríbenos y te mandamos tu cotización.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <a
                href={waLink(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="boton-sticker inline-flex items-center gap-2 min-h-12 px-8 py-4 bg-accent text-primary-strong font-label-caps rounded-full"
              >
                {SOCIAL_ICONS.whatsapp}
                WhatsApp
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-12 px-7 py-4 border-2 border-white/40 text-white font-label-caps rounded-full hover:bg-white/10 transition-colors"
              >
                {SOCIAL_ICONS.instagram}
                Instagram
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-12 px-7 py-4 border-2 border-white/40 text-white font-label-caps rounded-full hover:bg-white/10 transition-colors"
              >
                {SOCIAL_ICONS.facebook}
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EncabezadoSeccion({
  etiqueta,
  titulo,
  destellos = false,
  className = "mb-stack-lg",
}: {
  etiqueta: string;
  titulo: string;
  destellos?: boolean;
  className?: string;
}) {
  return (
    <div className={`revela flex flex-col gap-2 ${className}`}>
      <span className="font-label-caps text-primary">{etiqueta}</span>
      <h2 className="font-display-md text-on-surface">
        {conMarca(titulo)}
        {destellos && <Destellos className="inline-block w-[0.55em] h-[0.5em] ml-2 align-top" />}
      </h2>
    </div>
  );
}

// Producto como sticker troquelado: borde blanco, inclinado; se endereza al pasar el cursor.
function FeaturedTile({ producto, giro }: { producto: Producto; giro: string }) {
  return (
    <Link
      href={`/articulos?producto=${encodeURIComponent(producto.slug)}`}
      className="revela group block"
    >
      <div className="sticker relative aspect-[4/5] rounded-[24px]" style={{ "--giro": giro } as React.CSSProperties}>
        <div className="absolute inset-0 rounded-[18px] overflow-hidden bg-surface-container">
          <Image
            src={producto.imagen_url!}
            alt={producto.imagen_alt ?? producto.nombre}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {producto.categoria?.nombre && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-primary-strong font-label-caps text-[10px]">
            {producto.categoria.nombre}
          </span>
        )}
      </div>
      <h3 className="mt-5 px-1 font-display-sm-mobile text-[22px] text-on-surface group-hover:text-primary transition-colors">
        {producto.nombre}
      </h3>
    </Link>
  );
}
