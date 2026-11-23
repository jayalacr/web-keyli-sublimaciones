import Image from "next/image";
import { DEFAULT_PHONE, waLink } from "@/lib/constants";
import { getContacto, getTextosInicio } from "@/lib/db";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { Destellos, Sello } from "@/components/Marca";

export const metadata = {
  title: "Nosotros — Keyli Studio",
  description: "La historia de Keyli Studio: un taller en casa en Monterrey que empezó con Keyli, una husky, y una prensa térmica.",
};

const HERO_FALLBACK_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAsZ-QLNPxoNzXdvc7V-6N-J60XgVNdBxMDaHclP4GuWwim8Gyo4EZPPJH9lnzFGBRDymymad_xpDHpnsriE7NqBij59W4Q6XhMnUUhmNBK_iLvILYI-kQlDRx4InIuabdQ6O3nYQ6VT31G56Gifhga_oWo5CtpcprILgDZo04yeu1n2aaLquMkN629vT37d7T_2YhJ6aXuHAgT7_5lxi9p9EuE_sDCV3mULmiAynIvTmJ0xE5RRHg7";
const HERO_FALLBACK_ALT = "Retrato editorial de una husky siberiana en un estudio, luz suave y natural.";

const PILARES = [
  { icono: "fingerprint", titulo: "Cada pieza es única", texto: "No hay dos productos iguales porque no hay dos historias iguales." },
  { icono: "favorite", titulo: "Hecho con cuidado", texto: "Un taller en casa donde revisamos cada detalle antes de entregar." },
  { icono: "draw", titulo: "Tu idea, nuestro diseño", texto: "Convertimos tus momentos en objetos que se usan todos los días." },
];

const SERVICIOS = [
  { icono: "coffee", nombre: "Sublimación", texto: "Tazas, termos, rompecabezas y más." },
  { icono: "content_cut", nombre: "Vinil", texto: "Decoración, rotulado y detalles." },
  { icono: "checkroom", nombre: "DTF", texto: "Playeras y prendas con tu diseño." },
  { icono: "edit_note", nombre: "Papelería creativa", texto: "Stickers, etiquetas, invitaciones y planners." },
];

const GIROS = ["-1.5deg", "1.2deg", "-0.8deg"];

export default async function NosotrosPage() {
  const [contacto, textos] = await Promise.all([getContacto(), getTextosInicio()]);
  const whatsapp = contacto?.whatsapp ?? DEFAULT_PHONE;
  const instagramUrl = contacto?.instagram_url ?? "https://instagram.com/keylistudio.mx";
  const facebookUrl = contacto?.facebook_url ?? "https://facebook.com/keylisublimaciones";
  const heroUrl = textos?.nosotros_imagen_url || HERO_FALLBACK_URL;
  const heroAlt = textos?.nosotros_imagen_alt || HERO_FALLBACK_ALT;

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Hero: texto + foto de Keyli como sticker, con su ilustración asomándose */}
      <section className="tapete w-full pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="px-container-margin max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <span className="entrada font-label-caps text-primary" style={{ "--i": 0 } as React.CSSProperties}>
              Nuestra historia
            </span>
            <h1 className="entrada font-display-lg text-on-surface leading-[0.95]" style={{ "--i": 1 } as React.CSSProperties}>
              Keyli, la razón de <span className="marca">todo esto</span>
              <Destellos className="inline-block w-[0.55em] h-[0.5em] ml-2 align-top" />
            </h1>
            <p className="entrada font-body-main text-on-surface-variant text-lg max-w-xl" style={{ "--i": 2 } as React.CSSProperties}>
              Lo que empezó como un homenaje a una compañera leal se convirtió en un pequeño estudio en
              casa, dedicado a convertir momentos en piezas que se quedan contigo.
            </p>
          </div>
          <div className="lg:col-span-6 relative mx-auto w-full max-w-[460px]">
            <div className="pega sticker relative aspect-[4/5] rounded-[28px]" style={{ "--giro": "2deg", "--i": 2 } as React.CSSProperties}>
              <div className="absolute inset-0 rounded-[22px] overflow-hidden bg-surface-container">
                <Image src={heroUrl} alt={heroAlt} fill priority sizes="(min-width: 1024px) 460px, 90vw" className="object-cover" />
              </div>
            </div>
            <Image
              src="/keyli-husky.png"
              alt=""
              width={304}
              height={480}
              className="pega absolute -left-6 -bottom-8 sm:-left-16 h-40 sm:h-52 w-auto drop-shadow-[0_10px_14px_rgb(0_0_0/0.18)]"
              style={{ "--i": 4 } as React.CSSProperties}
            />
            <Sello className="pega absolute -right-3 -top-8 sm:-right-10 w-24 h-24 sm:w-32 sm:h-32" style={{ "--i": 5 } as React.CSSProperties} />
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="w-full px-container-margin py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-[640px] mx-auto flex flex-col gap-7">
          <p className="revela font-body-main text-on-surface text-lg">
            Todo comenzó en una habitación, con una prensa térmica básica y muchas ideas. La meta era
            sencilla: estampar la huella de Keyli, nuestra husky, en objetos de todos los días. Queríamos
            algo más que una foto en el celular; queríamos algo que se pudiera tocar.
          </p>
          <p className="revela font-body-main text-on-surface text-lg">
            Ese primer intento no fue perfecto, pero ver una idea cobrar vida en una taza nos atrapó.
            Pronto, amigos y familiares empezaron a pedirnos lo mismo con sus recuerdos, sus mascotas y
            sus momentos especiales.
          </p>

          <blockquote className="revela relative my-6 rounded-[28px] bg-surface-tint-soft px-7 py-9 md:px-10">
            <Destellos className="absolute -top-5 -right-3 w-12 h-12" />
            <p className="font-display-md text-primary-strong leading-[1.1]">
              No solo imprimimos imágenes: <span className="marca">materializamos emociones.</span>
            </p>
          </blockquote>

          <p className="revela font-body-main text-on-surface text-lg">
            Hoy seguimos trabajando desde casa en Monterrey, con la misma ilusión del primer día y trato
            personal para cada cliente. Desde 2021 hemos crecido de la sublimación al vinil, el DTF y la
            papelería creativa. Libretas para empresas, rompecabezas para aniversarios o etiquetas para
            tu marca: detrás de cada pedido hay alguien esperando sonreír.
          </p>
        </div>
      </section>

      {/* Lo que hacemos */}
      <section className="w-full px-container-margin pb-section-gap-mobile">
        <div className="max-w-[1440px] mx-auto">
          <div className="revela flex flex-col gap-2 mb-stack-lg">
            <span className="font-label-caps text-primary">Lo que hacemos</span>
            <h2 className="font-display-md text-on-surface">Cuatro técnicas, <span className="marca">un estudio</span></h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICIOS.map((s) => (
              <li key={s.nombre} className="revela flex flex-col gap-4 p-6 rounded-[24px] bg-surface-container-lowest border-2 border-dashed border-primary/25">
                <span className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined" aria-hidden="true">{s.icono}</span>
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display-sm-mobile text-[24px] text-on-surface">{s.nombre}</h3>
                  <p className="font-body-secondary text-on-surface-variant">{s.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pilares como stickers sobre el tapete */}
      <section className="tapete w-full px-container-margin py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-[1440px] mx-auto">
          <div className="revela flex flex-col gap-2 mb-12 text-center items-center">
            <span className="font-label-caps text-primary">En qué creemos</span>
            <h2 className="font-display-md text-on-surface">Nuestros <span className="marca">pilares</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILARES.map((p, i) => (
              <div
                key={p.titulo}
                className="revela sticker flex flex-col gap-4 p-7 rounded-[24px] bg-surface-container-lowest"
                style={{ "--giro": GIROS[i] } as React.CSSProperties}
              >
                <span className="w-12 h-12 rounded-full bg-accent text-primary-strong flex items-center justify-center">
                  <span className="material-symbols-outlined" aria-hidden="true">{p.icono}</span>
                </span>
                <h3 className="font-display-sm-mobile text-[26px] text-on-surface">{p.titulo}</h3>
                <p className="font-body-main text-on-surface-variant">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="w-full px-container-margin py-section-gap-mobile">
        <div className="tapete-oscuro relative overflow-hidden rounded-[36px] bg-primary-strong text-white px-6 py-16 md:py-24 max-w-[1440px] mx-auto">
          <Destellos className="absolute top-8 right-8 md:top-12 md:right-16 w-14 h-14 md:w-20 md:h-20" />
          <div className="revela relative flex flex-col items-center text-center max-w-3xl mx-auto gap-stack-md">
            <h2 className="font-display-md text-white">Hagamos algo juntos</h2>
            <p className="font-body-main text-white/85 text-lg">¿Tienes una idea en mente? Escríbenos y empecemos a crear.</p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <a
                href={waLink(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="boton-sticker inline-flex items-center gap-2 min-h-12 px-8 py-4 bg-accent text-primary-strong font-label-caps rounded-full"
              >
                {SOCIAL_ICONS.whatsapp} WhatsApp
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-12 px-7 py-4 border-2 border-white/40 text-white font-label-caps rounded-full hover:bg-white/10 transition-colors"
              >
                {SOCIAL_ICONS.instagram} Instagram
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-12 px-7 py-4 border-2 border-white/40 text-white font-label-caps rounded-full hover:bg-white/10 transition-colors"
              >
                {SOCIAL_ICONS.facebook} Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
