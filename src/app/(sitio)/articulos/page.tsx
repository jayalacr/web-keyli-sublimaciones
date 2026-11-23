import { DEFAULT_PHONE, waLink } from "@/lib/constants";
import { getCategorias, getContacto, getProductosActivos } from "@/lib/db";
import { ArticulosGrid } from "@/components/ArticulosGrid";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { Destellos } from "@/components/Marca";

export const metadata = {
  title: "Artículos — Keyli Studio",
  description: "Termos, tazas, playeras, papelería, vinil y más, personalizados en Monterrey. Cotiza por WhatsApp.",
};

export default async function ArticulosPage(props: PageProps<"/articulos">) {
  const searchParams = await props.searchParams;
  const categoriaParam = typeof searchParams.categoria === "string" ? searchParams.categoria : undefined;
  const [categorias, productos, contacto] = await Promise.all([getCategorias(), getProductosActivos(), getContacto()]);
  const whatsapp = contacto?.whatsapp ?? DEFAULT_PHONE;

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      <ArticulosGrid categorias={categorias.map((c) => c.nombre)} productos={productos} initialCategory={categoriaParam} whatsapp={whatsapp} />

      {/* Cierre: idea a la medida — bloque morado con el tapete en blanco */}
      <section className="w-full px-container-margin pb-section-gap-mobile max-w-[1440px] mx-auto">
        <div className="tapete-oscuro relative overflow-hidden rounded-[36px] bg-primary-strong text-white px-6 py-16 md:py-20">
          <Destellos className="absolute top-8 right-8 md:top-10 md:right-14 w-12 h-12 md:w-16 md:h-16" />
          <div className="revela relative max-w-2xl mx-auto flex flex-col items-center text-center gap-stack-md">
            <h2 className="font-display-md text-white leading-tight">¿Traes una idea que no está aquí?</h2>
            <p className="font-body-main text-white/85 max-w-lg">
              Escríbenos y la diseñamos contigo: un regalo, algo para tu evento o piezas para tu negocio.
            </p>
            <a
              href={waLink(whatsapp, "¡Hola! Tengo una idea que no vi en su catálogo y me gustaría cotizarla.")}
              target="_blank"
              rel="noopener noreferrer"
              className="boton-sticker mt-2 inline-flex items-center gap-2 min-h-12 px-8 py-4 rounded-full bg-accent text-primary-strong font-label-caps"
            >
              {SOCIAL_ICONS.whatsapp}
              Platícanos tu idea
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
