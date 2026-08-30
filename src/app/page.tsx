import Image from "next/image";
import Link from "next/link";
import { waLink } from "@/lib/constants";

const TRUST_ITEMS = [
  "Envíos a todo México",
  "Entrega en 3 a 5 días",
  "Diseño incluido sin costo",
  "Más de 500 pedidos entregados",
];

const FEATURED = [
  {
    href: "/articulos/tazas",
    tag: "Hogar",
    title: "Tazas de Cerámica",
    size: "large" as const,
    alt: "Taza de cerámica personalizada rodeada de flores secas, luz cálida de mañana.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD2fdG3gwpLVvRHAZ_IpnFJBmX9zi0wpEnZWZafTAlElJyR0nyh7BdC4A713DlcSlZ_pOGGuuU-2LYgqLFPf_8kwKtMG3cK3so-ZULGCUxVllsqERMmEqM2nc5AnI-QC3jjtVeZU2RLdwztxJE0bU2FQVrQI7Q4JT1YiGdkzyTLJci5SvtdrcHh32qZsRHpPjIZKmkuoQF7SjOHOKv2V2kSGQhvfprAl8GnBWZqHllaf0J3cA41dx-",
  },
  {
    href: "/articulos/playeras",
    tag: "Vestimenta",
    title: "Playeras Premium",
    size: "medium" as const,
    alt: "Playera premium sublimada colgada en un gancho de madera contra pared de yeso.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsFmvlh7BLf7lT-mmjOjWC7Bg-GN9iB68nERgmTSavG201_KTZ3WhAQrr0osnSOrjxgx6p1OrEALJ-gS1IEVqNASuscyGIRbUYTr0IJJ6ZuJGRPAQ3SEZDaBGAfLFytuxtK7tjfTLNkOH6TXd6rcL0SF5QtImZ54hfeGHdhpOgHhZUnkKubaIvQtveruX1NM0BtSGqxZE7pcoIkB_ETxRolPkiZGEWsl6DFSSr-hqHU7yGcJ3fuXgf",
  },
  {
    href: "/articulos/termos",
    tag: "Térmicos",
    title: "Termos",
    size: "small" as const,
    alt: "Termo de acero inoxidable personalizado con gotas de condensación.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuASSX2QvjoM7ZWlXUbClJtREgHmFKRROHHmw_J73pqmFvV9XLVba-R8Fhva7AUOOr7rMfD-yLhpUX_EFwulKhKjPd9_Vbz7R4orUU3rUNvNRqY4vUqhAg4xfoNsrl-2hevwvfYqqdzffoFQbMTvzMAVqACQjaxMpJRmUrgRAZS41OrAt0Mx2_1Hqzws6DUXH6DQ7KWZCWFZuM9-ljVc7d078vi5A-ZRJffpE8i77EHnFcFbEzBsGKcF",
  },
  {
    href: "/articulos/accesorios",
    tag: "Oficina",
    title: "Accesorios",
    size: "small" as const,
    alt: "Mousepads y posavasos personalizados sobre un escritorio de roble.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5Bolqxku_HBxuhDyXm9hnu_UcuCSBuB6bAXljRqnGnICFr8oHJ-bV7B0qfF_AsuMAT9TKj97tdHNthy9Wa9bvLU4Dj9nAZSmKfOOah2ITeb8puNhCc8ldx6g0mOsH9dab4tqnjmnMir1lajglFCVj0tKvAOUpDUAo7250b_0fRksZ62gtAnwcr3g6EvWI1ca0ZgirvxIM-E_C26-6yZjt_ei2eg-wh72Iq2apsUocdkcuVNNHdF3T",
  },
];

const SEASONS = [
  {
    href: "/temporadas/navidad",
    title: "Navidad",
    alt: "Set navideño de sublimación con luces cálidas y tazas de chocolate caliente.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb_XUh8ZzPq4UwYRxaLm74o-qiDyelmbcm5NkbYoomJ6A769GBV5TD5hsdmkQNRZyUSvFo47Bo_cx0mSYpdB-8ZQ0IBfGcz2C0p4PUfOckkpXVjswWSvDNlhjAFvgqVLaRl-QutgYLYthNUBphqtGJyX89UmHjkAuIDa5WIpJyww5vzn6dsCr6RsVaqkNfncrTiU59VuVfART-8RXDesYfGPvYG7ozHKJhzk8gntZHR9RWd-MkemJ8",
  },
  {
    href: "/temporadas/dia-de-las-madres",
    title: "Día de las Madres",
    alt: "Arreglo floral pastel sobre bolsas de lienzo personalizadas y tazas rosas.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjsZtiu5cE3HY3kLs70WHtF14lrw1TbPfxdBAWI82Q07ZBGVlEwvxTkFoyJjEaNDg2inxKyqS5VDUPTO_rJzMKvMYBRjRlhsLyw5wdq2xb4gsr7XaJ3d0rCF13NwA0z0hefUJ8omaLFA6eo9E6rQaAqT5Eb5JagVckfgLzBGn2Md6UsYoIho54HbXf48Zwtd_UYgikfkDgwQ1IljzkodnmKE-ysquVUdH4rKtYrUsS4XJGfopeuFPs",
  },
  {
    href: "/temporadas/san-valentin",
    title: "San Valentín",
    alt: "Playeras de pareja personalizadas para San Valentín, tonos rojos intensos.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBD09dm_EqecOPkd5xaD5jamgaVK2m523U1yX13Ls_zCqJSXpTAlkjoLIXwOPcLsbb0ekScLSOoxbSdiyS3PPludNQcmSoBjxya5NrR8vlJn5MEJsnEXRJ776us4GGTKr4ehyABwbVNcJsCESVskqu8hRK8vpYUVy0ZJEqsg4oYm-y16m0-1mPi00tnjGXkLoOW5j_xpjmIB9wHe_ZPTSgbBmTEbTXjV_LgUpP5h7YVe7CDHc03bW_n",
  },
];

const PROCESS_STEPS = [
  {
    n: "1",
    title: "Cuéntanos tu idea",
    body: "Compartimos referencias, colores y el propósito del artículo. Escuchamos lo que imaginas para hacerlo realidad.",
  },
  {
    n: "2",
    title: "Aprobamos el diseño juntos",
    body: "Generamos una propuesta visual. Iteramos sobre los detalles hasta que el diseño sea exactamente lo que buscas.",
  },
  {
    n: "3",
    title: "Producimos y enviamos",
    body: "Sublimamos con precisión y preparamos tu pedido con un embalaje seguro para que llegue perfecto a tus manos.",
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

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Hero */}
      <section className="relative w-full pt-[120px] pb-section-gap-desktop md:pt-[160px]">
        <div className="px-container-margin grid grid-cols-1 md:grid-cols-12 gap-grid-gutter items-center">
          <div className="col-span-1 md:col-span-5 flex flex-col items-start space-y-stack-md z-10">
            <span className="font-label-caps text-on-surface-variant text-[11px] tracking-[0.2em] uppercase">
              Monterrey, México
            </span>
            <h1 className="font-display-lg text-on-surface leading-[0.9] -ml-1">
              Lo personalizado se siente distinto
            </h1>
            <p className="font-body-main text-on-surface-variant max-w-[400px]">
              Creamos piezas únicas a través de la sublimación. Cada artículo cuenta una historia
              pensada exclusivamente para ti.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <Link
                href="/articulos"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-on-primary font-label-caps rounded-full transition-transform hover:-translate-y-1"
              >
                Ver artículos
              </Link>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 group font-label-caps text-on-surface">
                <span>Escríbenos por WhatsApp</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
          <div className="col-span-1 md:col-span-7 mt-stack-lg md:mt-0 relative h-[600px] w-[calc(100%+64px)] -mr-container-margin md:h-[700px]">
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
      <section className="w-full border-y border-outline-variant/20 py-8">
        <div className="px-container-margin flex flex-wrap justify-between gap-y-8 divide-x-0 md:divide-x divide-outline-variant/20">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item}
              className={`w-1/2 md:w-1/4 px-0 md:px-6 first:pl-0 last:pr-0 flex flex-col gap-2 ${i % 2 === 1 ? "px-4" : ""}`}
            >
              <span className="font-label-caps text-on-surface tracking-widest text-[11px]">{item}</span>
              <span className="block w-6 h-[1px] bg-outline-variant/40" />
            </div>
          ))}
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
            {SEASONS.map((season) => (
              <Link
                key={season.href}
                href={season.href}
                className="group block relative h-[400px] rounded-2xl overflow-hidden"
              >
                <Image
                  src={season.src}
                  alt={season.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-on-secondary-fixed-variant/40 group-hover:bg-on-secondary-fixed-variant/30 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-display-sm-mobile text-white mb-2">{season.title}</h3>
                  <span className="font-label-caps text-white/80 tracking-widest">Explorar colección</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="w-full bg-secondary-fixed/30 py-[140px] my-section-gap-desktop">
        <div className="px-container-margin grid grid-cols-1 md:grid-cols-12 gap-grid-gutter items-center">
          <div className="col-span-1 md:col-span-5 relative -mt-[180px] md:-mt-[240px] z-10 aspect-[3/4]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoQpbkM9y29c7H5i7QhXN0ox7NTur9mEEez8oZ_2dLy1TsMyctEz4c3CuF-5vs60LzGZCxrR0EmdVsKYzsm-xzAqCggKygAy6L7mNOdSZdGADGhRJXIfgqBsWe0_QP2kwtSzgORvkvH7vsV5RVk-5eCbAyiDCLTS0uwYdRM9BG3VZ7Gxgt2alF9RmxeKLvyEjUVOGopwDhtF-6aWkP958I3u_QcskaXNS7k6XlxGSl-U4c0LTvmpjX"
              alt="Retrato de un husky en un estudio minimalista, luz cálida y natural."
              fill
              className="object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="col-span-1 md:col-span-6 md:col-start-7 flex flex-col items-start space-y-6 pt-12 md:pt-0">
            <span className="font-label-caps text-on-surface-variant tracking-[0.2em]">Nuestra historia</span>
            <h2 className="font-display-md text-on-surface leading-[1.1]">Todo empezó con Keyli</h2>
            <div className="space-y-4 font-body-main text-on-surface-variant max-w-[480px]">
              <p>
                Keyli no es solo un nombre, es la inspiración detrás de nuestra dedicación. Al igual
                que la lealtad y el carácter único de un husky, cada pieza que creamos está hecha con
                un propósito y atención inquebrantable.
              </p>
              <p>
                Nacimos de la idea de que los objetos cotidianos deben reflejar la personalidad de
                quien los usa. No producimos en masa; sublimamos historias.
              </p>
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

      {/* Process */}
      <section className="w-full py-section-gap-mobile">
        <div className="px-container-margin">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} className="flex flex-col gap-6 relative">
                <span className="font-display-lg text-outline-variant/30 text-[120px] leading-none absolute -top-16 -left-6 z-0 select-none">
                  {step.n}
                </span>
                <div className="z-10 pt-8">
                  <h3 className="font-display-sm-mobile text-on-surface text-[24px] mb-4">{step.title}</h3>
                  <span className="block w-8 h-[1px] bg-on-surface-variant/40 mb-4" />
                  <p className="font-body-secondary text-on-surface-variant">{step.body}</p>
                </div>
              </div>
            ))}
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
