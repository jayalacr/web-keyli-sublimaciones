import Image from "next/image";
import Link from "next/link";
import { Destellos } from "@/components/Marca";

// 404 para notFound() y URLs inexistentes. Va dentro del layout raíz (sin header), por eso trae su propio logo.
export default function NotFound() {
  return (
    <main className="tapete flex-1 w-full min-h-dvh flex flex-col items-center justify-center gap-6 px-container-margin py-16 text-center">
      <Link href="/" aria-label="Keyli Studio, ir al inicio">
        <Image src="/logo-keyli-studio-v6.png" alt="Keyli Studio" width={1000} height={501} className="h-16 w-auto" />
      </Link>
      <div className="relative mt-4">
        <Image src="/keyli-husky.png" alt="" width={304} height={480} priority className="h-48 w-auto" />
        <Destellos className="absolute -top-2 -right-10 w-12 h-12" />
      </div>
      <span className="font-label-caps text-primary">Error 404</span>
      <h1 className="font-display-md text-on-surface max-w-xl">Keyli buscó por todos lados y no encontró esta página</h1>
      <p className="font-body-main text-on-surface-variant max-w-md">
        Puede que el enlace haya cambiado. Te ayudamos a volver a lo bueno.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Link href="/" className="boton-sticker inline-flex items-center gap-2 min-h-12 px-7 py-3 rounded-full bg-primary text-on-primary font-label-caps">
          Ir al inicio
        </Link>
        <Link
          href="/articulos"
          className="inline-flex items-center gap-2 min-h-12 px-7 py-3 rounded-full border-2 border-primary text-primary font-label-caps hover:bg-primary hover:text-on-primary transition-colors"
        >
          Ver artículos
        </Link>
      </div>
    </main>
  );
}
