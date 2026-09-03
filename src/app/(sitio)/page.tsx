import Image from "next/image";
import Link from "next/link";
import { waLink } from "@/lib/constants";
import { getTemporadasActivas, getTextosInicio } from "@/lib/db";
import { SeasonCard } from "@/components/SeasonCard";

const FEATURED = [
  {
    href: "/articulos?categoria=Tazas",
    tag: "Tazas",
    title: "Tazas de Cerámica",
    size: "large" as const,
    alt: "Taza de cerámica personalizada rodeada de flores secas, luz cálida de mañana.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD2fdG3gwpLVvRHAZ_IpnFJBmX9zi0wpEnZWZafTAlElJyR0nyh7BdC4A713DlcSlZ_pOGGuuU-2LYgqLFPf_8kwKtMG3cK3so-ZULGCUxVllsqERMmEqM2nc5AnI-QC3jjtVeZU2RLdwztxJE0bU2FQVrQI7Q4JT1YiGdkzyTLJci5SvtdrcHh32qZsRHpPjIZKmkuoQF7SjOHOKv2V2kSGQhvfprAl8GnBWZqHllaf0J3cA41dx-",
  },
  {
    href: "/articulos?categoria=Playeras",
    tag: "Playeras",
    title: "Playeras Premium",
    size: "medium" as const,
    alt: "Playera premium sublimada colgada en un gancho de madera contra pared de yeso.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsFmvlh7BLf7lT-mmjOjWC7Bg-GN9iB68nERgmTSavG201_KTZ3WhAQrr0osnSOrjxgx6p1OrEALJ-gS1IEVqNASuscyGIRbUYTr0IJJ6ZuJGRPAQ3SEZDaBGAfLFytuxtK7tjfTLNkOH6TXd6rcL0SF5QtImZ54hfeGHdhpOgHhZUnkKubaIvQtveruX1NM0BtSGqxZE7pcoIkB_ETxRolPkiZGEWsl6DFSSr-hqHU7yGcJ3fuXgf",
  },
  {
    href: "/articulos?categoria=Termos",
    tag: "Termos",
    title: "Termos",
    size: "small" as const,
    alt: "Termo de acero inoxidable personalizado con gotas de condensación.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuASSX2QvjoM7ZWlXUbClJtREgHmFKRROHHmw_J73pqmFvV9XLVba-R8Fhva7AUOOr7rMfD-yLhpUX_EFwulKhKjPd9_Vbz7R4orUU3rUNvNRqY4vUqhAg4xfoNsrl-2hevwvfYqqdzffoFQbMTvzMAVqACQjaxMpJRmUrgRAZS41OrAt0Mx2_1Hqzws6DUXH6DQ7KWZCWFZuM9-ljVc7d078vi5A-ZRJffpE8i77EHnFcFbEzBsGKcF",
  },
  {
    href: "/articulos?categoria=Papelería",
    tag: "Papelería",
    title: "Accesorios",
    size: "small" as const,
    alt: "Mousepads y posavasos personalizados sobre un escritorio de roble.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5Bolqxku_HBxuhDyXm9hnu_UcuCSBuB6bAXljRqnGnICFr8oHJ-bV7B0qfF_AsuMAT9TKj97tdHNthy9Wa9bvLU4Dj9nAZSmKfOOah2ITeb8puNhCc8ldx6g0mOsH9dab4tqnjmnMir1lajglFCVj0tKvAOUpDUAo7250b_0fRksZ62gtAnwcr3g6EvWI1ca0ZgirvxIM-E_C26-6yZjt_ei2eg-wh72Iq2apsUocdkcuVNNHdF3T",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "La calidad de impresión en los termos que pedí para mi empresa es impecable. Los colores son vibrantes y el trato fue excepcional de principio a fin.",
    name: "Mariana",
    detail: "Termos corporativos",
    offset: "md:mt-0",
  },
  {
    quote:
      "Hicieron unas playeras para un evento familiar y el diseño quedó exactamente como lo imaginamos. La tela es muy cómoda y el estampado no se siente pesado.",
    name: "Roberto",
    detail: "Playeras familiares",
    offset: "md:mt-16",
  },
  {
    quote:
      "Pedí un set de tazas personalizadas para un regalo de aniversario. La nitidez de las fotografías es increíble. Llegaron súper rápido y muy bien protegidas.",
    name: "Sofia",
    detail: "Tazas conmemorativas",
    offset: "md:mt-32",
  },
];

const INSTAGRAM_STRIP = [
  { alt: "Taza sublimada sobre mesa de madera junto a un cuaderno.", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMYAl-tsYTVEIXvVJc69h_-AU1JQIIqaeN2Fmt1SZFWHeX7-dsJTbNN6kCP5acqn6gnm6NNjxwFqBejaEJqB7_6tf92SsyOfz-g6Ah1N0v-8k8vR-kJZe7Q3bV1hW0rhnp9mM683lTXyzHv7K01nvf7TIvsf3_rohBMCkrjDZV7G6supu7_mLZU6ODZwwM6dmHerGHWnfbQL4BvA-LXerwIc9ts7NWYLoDNpDdn8ImBql4hPocJy2o" },
  { alt: "Playera doblada con estampado tipográfico junto a muestras de color.", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGKFQT3_YxO4tFkxwjIBfSIncSqA8tlrB_jU8ZVmuWblJzSefQPMTEJSIoqg3k4-C2L6EzOL0EQJf8SVWPudXikMJwA54XvsDT-hTu1n_HPSYhODpfRi-io5tzuAWWx4xuYxe8GSv5Rumh0QCcVUtIerMwTErGicB_8SyOw7SHrDWDRySmrCXCF_QKCaHibQEiCvcHtFy9MCq8NRrKpqX6xicUwxcT5vG0K0rKbNo6h84d1UXuVp_Q" },
  { alt: "Termo negro personalizado sostenido contra un cielo azul.", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvvpOxZDXXyauI1hjxozPEiXKOU0JHsfFzYIM1LTQdAMUaHx0ZDB1RtglfszxZ_oY5osf5PQHUAoFM6v5qA8rnJhiRfTHegqULFiYuhbZv71DboCp63ijejtYBXC-giIcg1Zi51jSWQUqlVHjv4u69xD-h8TSB8pISObpkg5ac82oVNXFqgeuZMwHRjSgTUo0ViZt7MVWzoqmBZje9Un-j5XwtuLOFRGruWqR69SYWD-Bz4j2XF1ZS" },
  { alt: "Macro de tinta de sublimación fundida con la tela.", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA60oOIWp_X2KcyWjXlxTX0oNBuE8QIvoolXCfxStHXu0XA58R7GgCxzTgYwz9J-7p4eF1Al_Fg4mkQlAVL1-MBnjQNAgLscbzrNacHsJqKtV9EWHSzIg8eiEfYF8vuKnsrsIRDD74L_lIPi-ClGl2vyQ-whmqdQ661pMA1Kn0iFGLNngvR67dWoWEUlGzw2iTQ4shErNsknxc6R_Z-besHrCSeshsklSJB-fr-qCD2NiNXfu6ZSnz9" },
  { alt: "Posavasos recién impresos en patrones geométricos sobre mármol.", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0p8VMxLuF6fKAFMcUc6pfiSRQhEMw7Yn_ZjQW8Otr-QDG7ooWk4YhfRVLYjomssEw7Iz2l1nrzw4dbpvtaS5zH7Gxs4sJJbxdh1bh3NdTJn6AcVXoT-LMcDTc1mceHBgpw-adqx1V03MUZrEaIidtYO3fRbHhK8zhoiDi_jzpbLvP9ia66D23HcqGaRuuBCJNIn-1q1dxcFKACSba_pdOQkbWsbfCUCwj5HwZt-b4SJ3phfgS0lKL" },
  { alt: "Pedido empacado en caja kraft con listón color ciruela.", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtOXODlHkuZ0hdic1_snze43lTHEv5gYcZTCBZjpFA_sTziuwoUDyUKmNP8fjg6ba9XsdfkLe3L75H9RdIKuUVFsM1GR3v4SNyR1yewI7Js5spPVNawsmmhx74jHMM5wsFKmJtmxACsBiGEBqnIidK3vo4ssDIs7prqUrkToCjOh7wILWtyPF-9Po8yMMOMWNXQ_EXT65RBAeOVBt2HZk1NY96OdudlDJ2OcC1OxnURV8eoRWw3IUM" },
];

const TEXTOS_INICIO_FALLBACK = {
  hero_titulo: "Lo personalizado se siente distinto",
  hero_subtitulo: "Creamos piezas únicas a través de la sublimación. Cada artículo cuenta una historia pensada exclusivamente para ti.",
  hero_cta: "Ver artículos",
  historia_titulo: "Todo empezó con Keyli",
  historia_texto: "Keyli no es solo un nombre, es la inspiración detrás de nuestra dedicación. Al igual que la lealtad y el carácter único de un husky, cada pieza que creamos está hecha con un propósito y atención inquebrantable.",
  historia_imagen_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoQpbkM9y29c7H5i7QhXN0ox7NTur9mEEez8oZ_2dLy1TsMyctEz4c3CuF-5vs60LzGZCxrR0EmdVsKYzsm-xzAqCggKygAy6L7mNOdSZdGADGhRJXIfgqBsWe0_QP2kwtSzgORvkvH7vsV5RVk-5eCbAyiDCLTS0uwYdRM9BG3VZ7Gxgt2alF9RmxeKLvyEjUVOGopwDhtF-6aWkP958I3u_QcskaXNS7k6XlxGSl-U4c0LTvmpjX",
  historia_imagen_alt: "Retrato de un husky en un estudio minimalista, luz cálida y natural.",
  insignias_confianza: ["Envíos a todo México", "Entrega en 3 a 5 días", "Diseño incluido sin costo", "Más de 500 pedidos entregados"] as [string, string, string, string],
};

export default async function Home() {
  const [textos, temporadas] = await Promise.all([
    getTextosInicio().then((t) => t ?? TEXTOS_INICIO_FALLBACK),
    getTemporadasActivas(),
  ]);
  const seasons = temporadas.filter((t) => t.portada_url).slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Hero */}
      <section className="relative w-full pt-24 pb-section-gap-desktop md:pt-28 md:min-h-screen md:flex md:items-center md:pb-0">
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
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 group font-label-caps text-on-surface">
                <span>Escríbenos por WhatsApp</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
          <div className="col-span-1 md:col-span-7 mt-stack-lg md:mt-0 relative h-[600px] w-[calc(100%+64px)] -mr-container-margin md:h-[60vh]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAPGKwmkRk1c-SeY9RxFxWCn9T0FRlX0Ia85So39yAv2fKWVlkHkPfAWLlBemvLR4mn-bdbYmb1O7G8H9AjjO_XtFcdtZNU_QR70VqQwdGzxJedmJf5k640Eum6hOl6a5lj1Uh91CQNoGvUQqXMmMBgQHj6OQypfREa9Nl8MWDZr6L5uUCW4S5yS4Yw674FxBaM0zFqXDg3CfC8elUN1_tmEqu57qjHaiepQ7SwUh7N6EEDq5z8gsD"
              alt="Termo y playera personalizados sobre una superficie de concreto, iluminación editorial."
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

      {/* Lo Más Pedido */}
      <section className="w-full py-section-gap-desktop">
        <div className="px-container-margin">
          <div className="flex flex-col gap-2 mb-stack-lg">
            <span className="font-label-caps text-on-surface-variant tracking-[0.2em]">Selección</span>
            <h2 className="font-display-md text-on-surface tracking-tight">Lo más pedido</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 h-auto md:h-[700px]">
            <Link
              href={FEATURED[0].href}
              className="group col-span-1 md:col-span-6 row-span-2 relative block overflow-hidden bg-surface-container rounded-2xl min-h-[300px]"
            >
              <FeaturedImage item={FEATURED[0]} />
              <div className="absolute bottom-0 left-0 p-8 flex flex-col items-start gap-3">
                <span className="px-3 py-1 bg-surface/90 backdrop-blur-sm rounded-full font-label-caps text-on-surface text-[10px] tracking-widest">
                  {FEATURED[0].tag}
                </span>
                <h3 className="font-display-sm-mobile text-on-surface">{FEATURED[0].title}</h3>
              </div>
            </Link>
            <Link
              href={FEATURED[1].href}
              className="group col-span-1 md:col-span-6 row-span-1 relative block overflow-hidden bg-surface-container rounded-2xl min-h-[300px]"
            >
              <FeaturedImage item={FEATURED[1]} />
              <div className="absolute bottom-0 left-0 p-6 flex flex-col items-start gap-3">
                <span className="px-3 py-1 bg-surface/90 backdrop-blur-sm rounded-full font-label-caps text-on-surface text-[10px] tracking-widest">
                  {FEATURED[1].tag}
                </span>
                <h3 className="font-body-main font-semibold text-on-surface text-xl">{FEATURED[1].title}</h3>
              </div>
            </Link>
            <div className="col-span-1 md:col-span-6 row-span-1 grid grid-cols-2 gap-6">
              {FEATURED.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative block overflow-hidden bg-surface-container rounded-2xl min-h-[300px]"
                >
                  <FeaturedImage item={item} />
                  <div className="absolute bottom-0 left-0 p-6 flex flex-col items-start gap-2">
                    <span className="px-3 py-1 bg-surface/90 backdrop-blur-sm rounded-full font-label-caps text-on-surface text-[10px] tracking-widest">
                      {item.tag}
                    </span>
                    <h3 className="font-body-main font-semibold text-on-surface text-lg">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

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
      <section className="w-full bg-secondary-fixed/30 py-[140px] my-section-gap-desktop">
        <div className="px-container-margin grid grid-cols-1 md:grid-cols-12 gap-grid-gutter items-center">
          <div className="col-span-1 md:col-span-5 relative -mt-[180px] md:-mt-[240px] z-10 aspect-[3/4]">
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

      {/* Process teaser */}
      <section className="w-full py-section-gap-mobile">
        <div className="px-container-margin">
          <div className="bg-surface-container-low rounded-2xl px-8 py-16 md:py-20 flex flex-col items-center text-center gap-6">
            <span className="font-label-caps text-on-surface-variant tracking-[0.2em]">Cómo trabajamos</span>
            <h2 className="font-display-md text-on-surface leading-[1.1] max-w-xl">
              De tu idea a tu pedido, en tres pasos simples
            </h2>
            <Link
              href="/proceso"
              className="inline-flex items-center gap-2 mt-2 px-8 py-3 bg-primary text-on-primary font-label-caps rounded-full transition-transform hover:-translate-y-1"
            >
              Ver el proceso completo
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-section-gap-desktop bg-surface-container-low">
        <div className="px-container-margin">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className={`col-span-1 md:col-span-4 ${t.offset}`}>
                <div className="bg-surface p-8 rounded-2xl border border-outline-variant/20">
                  <p className="font-body-main text-on-surface italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-on-surface">{t.name}</span>
                    <span className="font-body-secondary text-on-surface-variant text-sm">{t.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Strip */}
      <section className="w-full pt-section-gap-desktop overflow-hidden">
        <div className="px-container-margin mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display-md text-on-surface text-2xl tracking-tight">@keylisublimaciones</span>
          <a
            href="https://instagram.com/keylisublimaciones"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-caps text-on-surface-variant hover:text-primary transition-colors"
          >
            Síguenos en Instagram
          </a>
        </div>
        <div className="flex w-full overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 [scrollbar-width:none]">
          <div className="flex flex-nowrap w-[200%] md:w-full">
            {INSTAGRAM_STRIP.map((img) => (
              <div key={img.src} className="w-1/3 md:w-1/6 aspect-square snap-center shrink-0 p-1">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill sizes="200px" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Band */}
      <section className="w-full bg-on-secondary-fixed-variant text-white py-[100px] mt-section-gap-desktop">
        <div className="px-container-margin flex flex-col items-center text-center max-w-4xl mx-auto space-y-stack-lg">
          <h2 className="font-display-md text-white tracking-tight leading-tight">Cuéntanos qué tienes en mente</h2>
          <p className="font-body-main text-white/80 max-w-lg">
            Estamos listos para materializar tus ideas. Contáctanos por tu medio preferido para
            iniciar el proceso de diseño y cotización.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-on-secondary-fixed-variant font-label-caps rounded-full hover:scale-105 transition-transform"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/keylisublimaciones"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/30 text-white font-label-caps rounded-full hover:bg-white/10 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/keylisublimaciones"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/30 text-white font-label-caps rounded-full hover:bg-white/10 transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeaturedImage({ item }: { item: (typeof FEATURED)[number] }) {
  return (
    <>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={item.size === "large" ? "50vw" : item.size === "medium" ? "50vw" : "25vw"}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
    </>
  );
}
