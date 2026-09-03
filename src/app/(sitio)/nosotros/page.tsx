import Image from "next/image";
import { DEFAULT_PHONE, waLink } from "@/lib/constants";
import { getContacto } from "@/lib/db";

const MILESTONES = [
  { year: "2020", text: "El inicio de un sueño con una prensa térmica pequeña." },
  { year: "2022", text: "Crecimiento y llegada a nuestro primer taller propio." },
  { year: "2024", text: "Expandiendo horizontes para personalizar tu mundo." },
];

const VALUES = [
  { n: "01", title: "Cada pieza es única", body: "No hay dos productos iguales porque no hay dos historias iguales." },
  { n: "02", title: "Hecho a mano en Monterrey", body: "Orgullosamente locales, cuidando cada detalle del proceso." },
  { n: "03", title: "Tu idea, nuestra técnica", body: "Transformamos tus momentos en objetos tangibles." },
];

const PROCESS_PHOTOS = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVU-s0J_dOEdsDaASdcf9aD-mC8ysZU_mQiVl4LDtkOCrQRKOp_pINtTKHMaVrWdl9abuPI1wq0Haoi0Ma1sMGlyMLkooxR7aI3rNvNYD47Rb7GhaKQAYJZ2z6q9PoAr86ftOmb5F0J68qu3nyG65F6gFX0ivZfGYAra_Dt1PlN1XYuwPkM94n7LdMgOjkrN8n2vklnJIim1AbzQ9nhTB9I7vn4_59AT3UW4pU3VpAJDYXszLpkBy7",
    alt: "Manos colocando cuidadosamente el papel transfer de sublimación sobre una taza de cerámica blanca.",
    caption: "Diseño y preparación.",
    aspect: "aspect-[4/5]",
    width: "w-[70vw] md:w-[40vw] lg:w-[30vw]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMRcBi4sbtusfRXmfJ8sw7kjPEYCZDTjP5TId6Nvr7xEQujXRisAS03MrHi2ZAmzrLplA8TA0OiBJ05CLJ-OrkKom2jJPae9qXCLmpxJdExU_CkfB2q0v7SHF3jYO_ZYmHjqXLue8vxfbBWXZXxaV_Ov4cmaD6s1veJRz2A4vBZngOhBW8K9ugQ2qPiA6exmSrk9pDK1g9CkVJU3ghUu3x8FeeIjRWTgjp_M4DwicznS9v8fNrGTQg",
    alt: "Prensa térmica cerrando sobre un producto, con vapor levantándose levemente.",
    caption: "El momento del calor.",
    aspect: "aspect-[16/9]",
    width: "w-[80vw] md:w-[50vw] lg:w-[45vw]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-vuJjgjUSQn4oqcno0C9gwXdM6GOu_C__91p9XogJeKCb3hFW5cGk8KGlD559dwuFneiWXyADHdX9mv76xKq6-4glU7ElkyPRq86RZ9eBOQbwt0U3AdQaue9oSRiW1KFnw6vT8lhH52K4PUHlGIoMcB9AvPyBcqTNAbTEF4GnYBvIJabwk2AKwPG908SWUgp-fX6Gyj1bfZEs0J1NVVkOKQ4gfRe2L9JI5oPJq9zEcRLcMVAZiBL",
    alt: "Macro de un diseño recién sublimado revelándose al despegar el papel transfer.",
    caption: "La revelación.",
    aspect: "aspect-square",
    width: "w-[60vw] md:w-[35vw] lg:w-[25vw]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6F-uCaxoUCIBySDj1U6qGmt_8_RoBmMzMhHX9OOo6TAIdGX7N8-vCDL_uH85KqlKvSNvOaoI422-bdj3D8kUG1ywmC5cNWjrPR6M1mLMZfnmjyvD30HS8GxaJBk4PY7wust_y8ycs6O4dmRlA2JTabUFEmMq7IaVDT_epoI-rXCkRuNYq-POndD1xeaKwQr5p1UaXOEIR8_uomz44rYFcZJcOblUc-itpzSXoz4sjNd91GaZYio6Y",
    alt: "Producto sublimado envuelto en papel tisú y colocado en una caja de cartón kraft.",
    caption: "Empaque artesanal.",
    aspect: "aspect-[3/2]",
    width: "w-[75vw] md:w-[45vw] lg:w-[35vw]",
  },
];

export default async function NosotrosPage() {
  const contacto = await getContacto();
  const whatsapp = contacto?.whatsapp ?? DEFAULT_PHONE;
  const instagramUrl = contacto?.instagram_url ?? "https://instagram.com/keylisublimaciones";
  const facebookUrl = contacto?.facebook_url ?? "https://facebook.com/keylisublimaciones";

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Hero */}
      <section className="w-full min-h-[85vh] flex flex-col lg:flex-row relative pt-section-gap-mobile lg:pt-section-gap-desktop">
        <div className="w-full lg:w-5/12 h-[60vh] lg:h-auto relative bg-surface-container-low">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsZ-QLNPxoNzXdvc7V-6N-J60XgVNdBxMDaHclP4GuWwim8Gyo4EZPPJH9lnzFGBRDymymad_xpDHpnsriE7NqBij59W4Q6XhMnUUhmNBK_iLvILYI-kQlDRx4InIuabdQ6O3nYQ6VT31G56Gifhga_oWo5CtpcprILgDZo04yeu1n2aaLquMkN629vT37d7T_2YhJ6aXuHAgT7_5lxi9p9EuE_sDCV3mULmiAynIvTmJ0xE5RRHg7"
            alt="Retrato editorial de una husky siberiana en un estudio, luz suave y natural."
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="w-full lg:w-7/12 px-container-margin py-section-gap-mobile lg:py-section-gap-desktop flex flex-col justify-center bg-surface z-10 lg:-ml-8 relative">
          <div className="max-w-[800px] flex flex-col gap-stack-md">
            <span className="font-label-caps text-secondary tracking-widest uppercase">Nuestra Historia</span>
            <h1 className="font-display-lg text-on-surface text-balance">
              Keyli, la razón <br />
              <span className="text-primary italic font-normal">de todo esto</span>
            </h1>
            <p className="font-body-main text-on-surface-variant max-w-prose text-lg leading-relaxed mt-4">
              Lo que comenzó como un tributo a nuestra compañera más leal, se transformó en un taller
              dedicado a capturar momentos que merecen ser recordados para siempre.
            </p>
          </div>
        </div>
      </section>

      {/* Story Part 1 */}
      <section className="w-full px-container-margin py-section-gap-desktop bg-surface">
        <div className="max-w-[560px] mx-auto lg:mx-0 lg:ml-[15vw] flex flex-col gap-8">
          <p className="font-body-main text-on-surface text-lg leading-relaxed">
            Todo empezó en una pequeña habitación en Monterrey. Con una prensa térmica básica y un
            montón de ideas, buscábamos una forma de estampar la huella de Keyli, nuestra husky, en
            objetos que pudiéramos usar todos los días. Queríamos algo más que una foto en el
            celular; queríamos algo tangible.
          </p>
          <p className="font-body-main text-on-surface text-lg leading-relaxed">
            Ese primer intento no fue perfecto, pero la emoción de ver una idea cobrar vida en una
            taza nos atrapó. Pronto, amigos y familiares empezaron a pedirnos que hiciéramos lo mismo
            con sus recuerdos, sus mascotas y sus momentos especiales.
          </p>
          <p className="font-body-main text-on-surface text-lg leading-relaxed">
            Nos dimos cuenta de que no estábamos simplemente imprimiendo imágenes sobre cerámica o
            tela. Estábamos materializando emociones.
          </p>
          <div className="my-stack-lg py-stack-md border-l border-outline-variant/30 pl-8 ml-[-2rem] relative">
            <p className="font-display-md text-primary leading-tight tracking-tight">
              Cada regalo que entregamos lleva un pedacito de nuestra historia.
            </p>
          </div>
        </div>
      </section>

      {/* Workspace Band */}
      <section className="w-full relative bg-surface-container-lowest">
        <div className="w-full h-[60vh] lg:h-[70vh] relative">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk611Y_Kb7StYr8FMseyKjCdFrEGcwFRUL_1kY1UUvySu3dNTGUZ0Nr6bMdhG2r0Q2P-HLWWjWK5yFFRPF263qHRL2vH-h0HUWuPLStnzjxg0wK0dEw2OwTMye2xy9BkG702r7tPStwaTSRv9cxY0CCvfeBHd85ZbeKmtPgRINaISxXa4D8qk37NC1zhctT2LXOgbe47qYHjqQTlDMClKWtNFh324FRl4-mTVDM6iRzl5fBmTzQJKd"
            alt="Taller de sublimación en Monterrey: mesas de madera, prensa térmica, tazas y textiles apilados."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="px-container-margin py-6">
          <p className="font-body-secondary text-on-surface-variant text-sm">
            Donde la magia sucede: nuestro taller en Monterrey.
          </p>
        </div>
      </section>

      {/* Story Part 2 */}
      <section className="w-full px-container-margin py-section-gap-desktop bg-surface">
        <div className="max-w-[560px] mx-auto lg:mx-0 lg:ml-[15vw] flex flex-col gap-8">
          <p className="font-body-main text-on-surface text-lg leading-relaxed">
            Con el tiempo, el equipo creció, las máquinas mejoraron y nuestra técnica se perfeccionó.
            Sin embargo, el núcleo de Keyli Sublimaciones sigue siendo el mismo: una atención obsesiva
            al detalle y un trato personal con cada cliente.
          </p>
          <p className="font-body-main text-on-surface text-lg leading-relaxed">
            Hoy, desde libretas para empresas hasta rompecabezas para aniversarios, seguimos
            trabajando con la misma ilusión del primer día. Porque sabemos que detrás de cada pedido,
            hay alguien esperando sonreír.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-secondary-container/30 px-container-margin py-section-gap-desktop relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="flex flex-col gap-stack-lg relative z-10">
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-primary tracking-widest">En qué creemos</span>
            <h2 className="font-display-md text-on-secondary-container">Nuestros Pilares</h2>
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

      {/* Timeline */}
      <section className="w-full px-container-margin py-section-gap-desktop bg-surface relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
          <div className="lg:col-span-4">
            <h2 className="font-display-md text-on-surface sticky top-32">Nuestra Ruta</h2>
          </div>
          <div className="lg:col-span-8 flex flex-col">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`flex flex-col md:flex-row items-baseline gap-6 py-12 group ${
                  i < MILESTONES.length - 1 ? "border-b border-outline-variant/20" : ""
                }`}
              >
                <span className="font-display-lg text-outline-variant group-hover:text-primary transition-colors duration-500 min-w-[200px]">
                  {m.year}
                </span>
                <p className="font-body-main text-on-primary-fixed-variant text-xl leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process photos */}
      <section className="w-full py-section-gap-desktop bg-surface overflow-hidden">
        <div className="px-container-margin mb-stack-md">
          <span className="font-label-caps text-secondary tracking-widest uppercase">Proceso Creativo</span>
        </div>
        <div className="flex gap-4 overflow-x-auto px-container-margin pb-8 snap-x snap-mandatory [scrollbar-width:none]">
          {PROCESS_PHOTOS.map((photo) => (
            <div key={photo.src} className={`flex-none ${photo.width} snap-center`}>
              <div className={`${photo.aspect} relative rounded-lg mb-4 overflow-hidden bg-surface-container-low`}>
                <Image src={photo.src} alt={photo.alt} fill sizes="80vw" className="object-cover" />
              </div>
              <p className="font-body-secondary text-sm text-on-surface-variant">{photo.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="w-full bg-on-secondary-fixed-variant px-container-margin py-section-gap-mobile lg:py-section-gap-desktop">
        <div className="max-w-4xl flex flex-col gap-stack-md">
          <div className="flex flex-col gap-4">
            <h2 className="font-display-md text-on-primary">Hagamos algo juntos</h2>
            <p className="font-body-main text-on-primary/80 text-lg">
              ¿Tienes una idea en mente? Escríbenos y empecemos a crear.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href={waLink(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-primary rounded-full font-label-caps text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">chat</span> WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border border-outline-variant/30 rounded-full font-label-caps text-on-primary hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">photo_camera</span> Instagram
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border border-outline-variant/30 rounded-full font-label-caps text-on-primary hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">thumb_up</span> Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
