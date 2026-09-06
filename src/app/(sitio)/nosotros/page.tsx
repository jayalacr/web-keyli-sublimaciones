import Image from "next/image";
import { DEFAULT_PHONE, waLink } from "@/lib/constants";
import { getContacto, getTextosInicio } from "@/lib/db";
import { SOCIAL_ICONS } from "@/components/SocialIcons";

const HERO_FALLBACK_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAsZ-QLNPxoNzXdvc7V-6N-J60XgVNdBxMDaHclP4GuWwim8Gyo4EZPPJH9lnzFGBRDymymad_xpDHpnsriE7NqBij59W4Q6XhMnUUhmNBK_iLvILYI-kQlDRx4InIuabdQ6O3nYQ6VT31G56Gifhga_oWo5CtpcprILgDZo04yeu1n2aaLquMkN629vT37d7T_2YhJ6aXuHAgT7_5lxi9p9EuE_sDCV3mULmiAynIvTmJ0xE5RRHg7";
const HERO_FALLBACK_ALT = "Retrato editorial de una husky siberiana en un estudio, luz suave y natural.";

const VALUES = [
  { n: "01", title: "Cada pieza es única", body: "No hay dos productos iguales porque no hay dos historias iguales." },
  { n: "02", title: "Hecho a mano", body: "Un proyecto casero, cuidando cada detalle del proceso." },
  { n: "03", title: "Tu idea, mi técnica", body: "Transformo tus momentos en objetos tangibles." },
];

export default async function NosotrosPage() {
  const [contacto, textos] = await Promise.all([getContacto(), getTextosInicio()]);
  const whatsapp = contacto?.whatsapp ?? DEFAULT_PHONE;
  const instagramUrl = contacto?.instagram_url ?? "https://instagram.com/keylisublimaciones";
  const facebookUrl = contacto?.facebook_url ?? "https://facebook.com/keylisublimaciones";
  const heroUrl = textos?.nosotros_imagen_url || HERO_FALLBACK_URL;
  const heroAlt = textos?.nosotros_imagen_alt || HERO_FALLBACK_ALT;

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Hero */}
      <section className="w-full min-h-[85vh] flex flex-col lg:flex-row relative pt-section-gap-mobile lg:pt-section-gap-desktop">
        <div className="w-full lg:w-5/12 h-[45vh] min-h-[280px] lg:h-auto relative bg-surface-container-low">
          <Image
            src={heroUrl}
            alt={heroAlt}
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="w-full lg:w-7/12 px-container-margin py-section-gap-mobile lg:py-section-gap-desktop flex flex-col justify-center bg-surface z-10 lg:-ml-8 relative rounded-t-2xl -mt-6 lg:mt-0 lg:rounded-none">
          <div className="max-w-[800px] flex flex-col gap-stack-md">
            <span className="font-label-caps text-secondary tracking-widest uppercase">Mi Historia</span>
            <h1 className="font-display-lg text-on-surface text-balance">
              Mi Keyli, la razón <br />
              <span className="text-primary italic font-normal">de todo esto</span>
            </h1>
            <p className="font-body-main text-on-surface-variant max-w-prose text-lg leading-relaxed mt-4">
              Lo que comenzó como un tributo a mi compañera más leal, se transformó en un pequeño
              proyecto casero dedicado a capturar momentos que merecen ser recordados para siempre.
            </p>
          </div>
        </div>
      </section>

      {/* Story Part 1 */}
      <section className="w-full px-container-margin py-section-gap-desktop bg-surface">
        <div className="max-w-[560px] mx-auto lg:mx-0 lg:ml-[15vw] flex flex-col gap-8">
          <p className="font-body-main text-on-surface text-lg leading-relaxed">
            Todo comenzó en mi habitación. Con una prensa térmica básica y un
            montón de ideas, busqué una forma de estampar la huella de Keyli, mi husky, en objetos que
            pudiera usar todos los días. Quería algo más que una foto en el celular; quería algo
            tangible.
          </p>
          <p className="font-body-main text-on-surface text-lg leading-relaxed">
            Ese primer intento no fue perfecto, pero la emoción de ver una idea cobrar vida en una
            taza me atrapó. Pronto, amigos y familiares empezaron a pedirme que hiciera lo mismo con
            sus recuerdos, sus mascotas y sus momentos especiales.
          </p>
          <p className="font-body-main text-on-surface text-lg leading-relaxed">
            Me di cuenta de que no estaba simplemente imprimiendo imágenes sobre cerámica o tela.
            Estaba materializando emociones.
          </p>
          <div className="my-stack-lg py-stack-md border-l border-outline-variant/30 pl-6 md:pl-8 md:ml-[-2rem] relative">
            <p className="font-display-md text-primary leading-tight tracking-tight">
              Cada regalo que entrego lleva un pedacito de mi historia.
            </p>
          </div>
          <p className="font-body-main text-on-surface text-lg leading-relaxed">
            Hoy sigo trabajando desde casa, con unas cuantas máquinas y la misma ilusión del primer
            día. Soy solo yo, pero le pongo atención a cada detalle y trato personal a cada cliente.
            Desde libretas para empresas hasta rompecabezas para aniversarios, sé que detrás de cada
            pedido hay alguien esperando sonreír.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-secondary-container/30 px-container-margin py-section-gap-desktop relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 max-w-full bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="flex flex-col gap-stack-lg relative z-10">
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-primary tracking-widest">En qué creo</span>
            <h2 className="font-display-md text-on-secondary-container">Mis Pilares</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b border-outline-variant/20">
            {VALUES.map((value, i) => (
              <div
                key={value.n}
                className={`flex flex-col gap-6 py-stack-md ${
                  i === 0
                    ? "md:pr-stack-md border-b md:border-b-0 md:border-r border-outline-variant/20"
                    : i === 1
                      ? "md:px-stack-md border-b md:border-b-0 md:border-r border-outline-variant/20"
                      : "md:pl-stack-md"
                }`}
              >
                <span className="font-display-lg text-primary/30 leading-none">{value.n}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-body-main font-semibold text-on-surface">{value.title}</h3>
                  <p className="font-body-secondary text-on-surface-variant">{value.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="w-full bg-on-secondary-fixed-variant px-container-margin py-section-gap-mobile lg:py-section-gap-desktop">
        <div className="max-w-4xl flex flex-col gap-stack-md">
          <div className="flex flex-col gap-4">
            <h2 className="font-display-md text-on-primary">Hagamos algo juntos</h2>
            <p className="font-body-main text-on-primary/80 text-lg">
              ¿Tienes una idea en mente? Escríbeme y empecemos a crear.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href={waLink(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-primary rounded-full font-label-caps text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-2"
            >
              {SOCIAL_ICONS.whatsapp} WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border border-outline-variant/30 rounded-full font-label-caps text-on-primary hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              {SOCIAL_ICONS.instagram} Instagram
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border border-outline-variant/30 rounded-full font-label-caps text-on-primary hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              {SOCIAL_ICONS.facebook} Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
