import Image from "next/image";
import Link from "next/link";
import { DEFAULT_PHONE, tiktokProfileUrl, waLink } from "@/lib/constants";
import { getContacto, getOpinionesAprobadas, getProductosActivos, getTemporadasActivas, getTextosInicio, type Producto } from "@/lib/db";
import { SeasonCard } from "@/components/SeasonCard";
import { TestimonialForm } from "@/components/TestimonialForm";
import { TikTokEmbed } from "@/components/TikTokEmbed";
import { SOCIAL_ICONS } from "@/components/SocialIcons";

const TEXTOS_INICIO_FALLBACK = {
  hero_titulo: "Lo personalizado se siente distinto",
  hero_subtitulo: "Creamos piezas únicas a través de la sublimación. Cada artículo cuenta una historia pensada exclusivamente para ti.",
  hero_cta: "Ver artículos",
  hero_imagen_url:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBAPGKwmkRk1c-SeY9RxFxWCn9T0FRlX0Ia85So39yAv2fKWVlkHkPfAWLlBemvLR4mn-bdbYmb1O7G8H9AjjO_XtFcdtZNU_QR70VqQwdGzxJedmJf5k640Eum6hOl6a5lj1Uh91CQNoGvUQqXMmMBgQHj6OQypfREa9Nl8MWDZr6L5uUCW4S5yS4Yw674FxBaM0zFqXDg3CfC8elUN1_tmEqu57qjHaiepQ7SwUh7N6EEDq5z8gsD",
  hero_imagen_alt: "Termo y playera personalizados sobre una superficie de concreto, iluminación editorial.",
  historia_titulo: "Todo empezó con Keyli",
  historia_texto: "Keyli no es solo un nombre, es la inspiración detrás de nuestra dedicación. Al igual que la lealtad y el carácter único de un husky, cada pieza que creamos está hecha con un propósito y atención inquebrantable.",
  historia_imagen_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoQpbkM9y29c7H5i7QhXN0ox7NTur9mEEez8oZ_2dLy1TsMyctEz4c3CuF-5vs60LzGZCxrR0EmdVsKYzsm-xzAqCggKygAy6L7mNOdSZdGADGhRJXIfgqBsWe0_QP2kwtSzgORvkvH7vsV5RVk-5eCbAyiDCLTS0uwYdRM9BG3VZ7Gxgt2alF9RmxeKLvyEjUVOGopwDhtF-6aWkP958I3u_QcskaXNS7k6XlxGSl-U4c0LTvmpjX",
  historia_imagen_alt: "Retrato de un husky en un estudio minimalista, luz cálida y natural.",
  nosotros_imagen_url:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAsZ-QLNPxoNzXdvc7V-6N-J60XgVNdBxMDaHclP4GuWwim8Gyo4EZPPJH9lnzFGBRDymymad_xpDHpnsriE7NqBij59W4Q6XhMnUUhmNBK_iLvILYI-kQlDRx4InIuabdQ6O3nYQ6VT31G56Gifhga_oWo5CtpcprILgDZo04yeu1n2aaLquMkN629vT37d7T_2YhJ6aXuHAgT7_5lxi9p9EuE_sDCV3mULmiAynIvTmJ0xE5RRHg7",
  nosotros_imagen_alt: "Retrato editorial de una husky siberiana en un estudio, luz suave y natural.",
  insignias_confianza: ["Envíos a todo México", "Entrega en 3 a 5 días", "Diseño incluido sin costo", "Más de 500 pedidos entregados"] as [string, string, string, string],
};

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
  const instagramUrl = contacto?.instagram_url ?? "https://instagram.com/keylisublimaciones";
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
      {/* Hero */}
      <section className="relative w-full pt-20 pb-section-gap-mobile md:pt-28 md:min-h-screen md:flex md:items-center md:pb-0">
        <div className="px-container-margin grid grid-cols-1 md:grid-cols-12 gap-grid-gutter items-center w-full">
          <div className="col-span-1 md:col-span-5 flex flex-col items-start space-y-stack-md z-10">
            <span className="font-label-caps text-on-surface-variant text-[11px] tracking-[0.2em] uppercase">
              Monterrey, México
            </span>
            <h1 className="font-display-lg text-on-surface leading-[0.9] -ml-1">
              {textos.hero_titulo}
            </h1>
            <p className="font-body-main text-on-surface-variant max-w-[400px]">
              {textos.hero_subtitulo}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <Link
                href="/articulos"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-on-primary font-label-caps rounded-full transition-transform hover:-translate-y-1"
              >
                {textos.hero_cta}
              </Link>
              <a href={waLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 group font-label-caps text-on-surface">
                <span>Escríbenos por WhatsApp</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
          <div className="col-span-1 md:col-span-7 mt-stack-md md:mt-0 relative h-[320px] sm:h-[440px] w-[calc(100%+var(--spacing-container-margin))] -mr-container-margin md:h-[60vh] rounded-l-2xl overflow-hidden md:rounded-none">
            <Image
              src={textos.hero_imagen_url}
              alt={textos.hero_imagen_alt}
              fill
              priority
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trust Row */}
      <section className="w-full bg-surface-container-low py-stack-lg">
        <div className="px-container-margin grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
          {textos.insignias_confianza.map((item, i) => {
            const icon = ["local_shipping", "schedule", "palette", "verified"][i];
            return (
              <div key={item} className="flex items-center gap-3">
                <span className="shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined leading-none text-[20px]">{icon}</span>
                </span>
                <span className="font-label-caps text-on-surface text-[12px] leading-tight">{item}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lo Más Pedido — administrado desde /admin/productos: toggle "Destacado en Inicio" de cada producto */}
      {destacados.length > 0 && (
        <section className="w-full py-section-gap-desktop">
          <div className="px-container-margin">
            <div className="flex flex-col gap-2 mb-stack-lg">
              <span className="font-label-caps text-on-surface-variant tracking-[0.2em]">Selección</span>
              <h2 className="font-display-md text-on-surface tracking-tight">Lo más pedido</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-6 md:h-[700px]">
              <FeaturedTile
                producto={destacados[0]}
                className="col-span-1 md:col-span-6 md:row-span-2"
                titleClass="font-display-sm-mobile text-on-surface"
              />
              {destacados[1] && (
                <FeaturedTile
                  producto={destacados[1]}
                  className="col-span-1 md:col-span-6 md:row-span-1"
                  titleClass="font-body-main font-semibold text-on-surface text-xl"
                />
              )}
              {destacados.length > 2 && (
                <div className="col-span-1 md:col-span-6 md:row-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {destacados.slice(2).map((p) => (
                    <FeaturedTile key={p.id} producto={p} titleClass="font-body-main font-semibold text-on-surface text-lg" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Seasons Teaser */}
      <section className="w-full py-section-gap-mobile">
        <div className="px-container-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-stack-lg">
            <h2 className="font-display-md text-on-surface tracking-tight">Colecciones por temporada</h2>
            <Link
              href="/temporadas"
              className="inline-flex items-center gap-2 group font-label-caps text-on-surface-variant hover:text-on-surface transition-colors pb-2 border-b border-outline-variant/30 hover:border-on-surface"
            >
              <span>Ver todas las temporadas</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
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

      {/* Brand Story */}
      <section className="w-full bg-secondary-fixed/30 py-section-gap-mobile md:py-[140px] mt-section-gap-desktop">
        <div className="px-container-margin grid grid-cols-1 md:grid-cols-12 gap-grid-gutter items-center">
          <div className="col-span-1 md:col-span-5 relative -mt-[100px] md:-mt-[240px] z-10 aspect-[3/4]">
            <Image
              src={textos.historia_imagen_url}
              alt={textos.historia_imagen_alt}
              fill
              className="object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="col-span-1 md:col-span-6 md:col-start-7 flex flex-col items-start space-y-6 pt-12 md:pt-0">
            <span className="font-label-caps text-on-surface-variant tracking-[0.2em]">Nuestra historia</span>
            <h2 className="font-display-md text-on-surface leading-[1.1]">{textos.historia_titulo}</h2>
            <div className="space-y-4 font-body-main text-on-surface-variant max-w-[480px]">
              <p>{textos.historia_texto}</p>
            </div>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 mt-4 font-label-caps text-primary border-b border-primary pb-1 hover:text-on-surface hover:border-on-surface transition-colors"
            >
              Conocer la historia completa
            </Link>
          </div>
        </div>
      </section>

      {/* Redes sociales: Instagram (widget embed) + TikTok (embed nativo) en dos columnas */}
      <section className="w-full pt-section-gap-desktop overflow-hidden">
        <div className="px-container-margin mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <span className="font-display-md text-on-surface text-2xl tracking-tight">Síguenos en redes</span>
          <div className="flex flex-wrap gap-6">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 group font-label-caps text-on-surface-variant hover:text-on-surface transition-colors pb-2 border-b border-outline-variant/30 hover:border-on-surface"
            >
              {SOCIAL_ICONS.instagram}
              <span>Instagram</span>
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 group font-label-caps text-on-surface-variant hover:text-on-surface transition-colors pb-2 border-b border-outline-variant/30 hover:border-on-surface"
            >
              {SOCIAL_ICONS.facebook}
              <span>Facebook</span>
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </a>
            {tiktokUrls.length > 0 && (
              <a
                href={tiktokProfileUrl(tiktokUrls)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group font-label-caps text-on-surface-variant hover:text-on-surface transition-colors pb-2 border-b border-outline-variant/30 hover:border-on-surface"
              >
                {SOCIAL_ICONS.tiktok}
                <span>TikTok</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            )}
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

      {/* Testimonials */}
      <section className="w-full py-section-gap-desktop bg-surface-container-low">
        <div className="px-container-margin">
          <div className="text-center max-w-xl mx-auto mb-stack-lg">
            <h2 className="font-display-md text-on-surface tracking-tight">Lo que dicen nuestros clientes</h2>
            <p className="font-body-main text-on-surface-variant mt-3">
              Historias reales de quienes ya personalizaron su pieza con nosotros.
            </p>
          </div>
          {opinionesDestacadas.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-8 mb-stack-lg">
              {opinionesDestacadas.map((o) => (
                <div key={o.id} className="w-full md:w-[calc(33.333%-1.5rem)] bg-surface p-8 rounded-2xl border border-outline-variant/20">
                  <p className="font-body-main text-on-surface italic mb-6">&ldquo;{o.texto}&rdquo;</p>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-on-surface">{o.nombre}</span>
                    {o.detalle && <span className="font-body-secondary text-on-surface-variant text-sm">{o.detalle}</span>}
                  </div>
                </div>
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

      {/* Contact Band */}
      <section className="w-full bg-on-secondary-fixed-variant text-white py-section-gap-mobile md:py-[100px]">
        <div className="px-container-margin flex flex-col items-center text-center max-w-4xl mx-auto space-y-stack-lg">
          <h2 className="font-display-md text-white tracking-tight leading-tight">Cuéntanos qué tienes en mente</h2>
          <p className="font-body-main text-white/80 max-w-lg">
            Estamos listos para materializar tus ideas. Contáctanos por tu medio preferido para
            iniciar el proceso de diseño y cotización.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={waLink(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-on-secondary-fixed-variant font-label-caps rounded-full hover:scale-105 transition-transform"
            >
              {SOCIAL_ICONS.whatsapp}
              WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-label-caps rounded-full hover:bg-white/10 transition-colors"
            >
              {SOCIAL_ICONS.instagram}
              Instagram
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-label-caps rounded-full hover:bg-white/10 transition-colors"
            >
              {SOCIAL_ICONS.facebook}
              Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeaturedTile({
  producto,
  className = "",
  titleClass,
}: {
  producto: Producto;
  className?: string;
  titleClass: string;
}) {
  return (
    <Link
      href={`/articulos?categoria=${encodeURIComponent(producto.categoria?.nombre ?? "")}`}
      className={`group relative block overflow-hidden bg-surface-container rounded-2xl min-h-[240px] md:min-h-[300px] ${className}`}
    >
      <Image
        src={producto.imagen_url!}
        alt={producto.imagen_alt ?? producto.nombre}
        fill
        sizes="50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col items-start gap-3">
        {producto.categoria?.nombre && (
          <span className="px-3 py-1 bg-surface/90 backdrop-blur-sm rounded-full font-label-caps text-on-surface text-[10px] tracking-widest">
            {producto.categoria.nombre}
          </span>
        )}
        <h3 className={titleClass}>{producto.nombre}</h3>
      </div>
    </Link>
  );
}
