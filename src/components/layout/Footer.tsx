import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-section-gap-desktop border-t border-outline-variant/20">
      <div className="w-full px-container-margin py-section-gap-mobile">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-gutter">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <Image
              src="/logoKeyli.jpeg"
              alt="Keyli Sublimaciones"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover grayscale opacity-80"
            />
            <p className="font-body-secondary text-on-surface-variant max-w-[240px]">
              Sublimación artesanal con precisión editorial. El arte de imprimir historias.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label-caps text-on-surface">Navegación</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/articulos" className="font-body-secondary text-on-surface-variant hover:text-primary transition-colors">
                Artículos
              </Link>
              <Link href="/temporadas" className="font-body-secondary text-on-surface-variant hover:text-primary transition-colors">
                Temporadas
              </Link>
              <Link href="/proceso" className="font-body-secondary text-on-surface-variant hover:text-primary transition-colors">
                Proceso
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label-caps text-on-surface">Envíos</h4>
            <p className="font-body-secondary text-on-surface-variant">
              Realizamos envíos nacionales a toda la república con embalaje premium protegido.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label-caps text-on-surface">Social</h4>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">share</span>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">public</span>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">mail</span>
            </div>
          </div>
        </div>
        <div className="mt-stack-lg pt-stack-md border-t border-outline-variant/10 flex justify-between items-center">
          <span className="font-label-caps text-on-surface-variant opacity-60">© 2026 Keyli Sublimaciones</span>
          <span className="font-label-caps text-on-surface-variant opacity-60">Bespoke Craftsmanship</span>
        </div>
      </div>
    </footer>
  );
}
