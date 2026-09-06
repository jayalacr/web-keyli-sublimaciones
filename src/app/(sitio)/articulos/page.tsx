import Link from "next/link";
import { DEFAULT_PHONE, waLink } from "@/lib/constants";
import { getCategorias, getContacto, getProductosActivos } from "@/lib/db";
import { ArticulosGrid } from "@/components/ArticulosGrid";

export default async function ArticulosPage(props: PageProps<"/articulos">) {
  const searchParams = await props.searchParams;
  const categoriaParam = typeof searchParams.categoria === "string" ? searchParams.categoria : undefined;
  const [categorias, productos, contacto] = await Promise.all([getCategorias(), getProductosActivos(), getContacto()]);
  const whatsapp = contacto?.whatsapp ?? DEFAULT_PHONE;

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      <div className="px-container-margin w-full max-w-[1440px] mx-auto">
        <div className="flex flex-wrap gap-stack-md border-b border-outline-variant/30 pb-4 mt-8 relative pt-section-gap-desktop">
          <span className="font-label-caps text-on-surface-variant tracking-wider relative">
            Artículos
            <span className="absolute -bottom-4 left-0 w-full h-[2px] bg-primary rounded-full" />
          </span>
          <Link href="/temporadas" className="font-label-caps text-secondary/60 tracking-wider hover:text-on-surface transition-colors">
            Temporadas
          </Link>
        </div>
      </div>

      <ArticulosGrid categorias={categorias.map((c) => c.nombre)} productos={productos} initialCategory={categoriaParam} whatsapp={whatsapp} />

      <div className="bg-surface-container-low mt-section-gap-mobile w-full py-section-gap-desktop px-container-margin relative overflow-hidden">
        <div className="absolute -right-32 -top-32 w-[600px] h-[600px] max-w-full bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-stack-lg relative z-10">
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-display-md text-on-surface-variant">¿Traes una idea que no está aquí?</h2>
            <p className="font-body-main text-on-surface-variant/80 max-w-lg">
              Escríbenos y diseñamos algo único para ti. Nuestro taller está equipado para hacer
              realidad tus proyectos más creativos.
            </p>
          </div>
          <a
            href={waLink(whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-4 rounded-full bg-primary text-on-primary font-label-caps hover:bg-on-primary-fixed-variant transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-center"
          >
            Iniciar conversación
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </a>
        </div>
      </div>
    </div>
  );
}
