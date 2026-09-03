"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/admin", label: "Inicio", icon: "home" },
  { href: "/admin/productos", label: "Productos", icon: "inventory_2" },
  { href: "/admin/categorias", label: "Categorías", icon: "category" },
  { href: "/admin/temporadas", label: "Temporadas", icon: "calendar_today" },
  { href: "/admin/opiniones", label: "Opiniones", icon: "rate_review" },
  { href: "/admin/configuracion", label: "Configuración", icon: "settings" },
];

export function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 bg-inverse-surface/30 backdrop-blur-[1px] z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed left-0 top-0 h-full w-sidebar-width bg-surface-container-low border-r border-outline-variant z-50 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="p-6 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary">brush</span>
            </div>
            <span className="font-admin-title text-lg text-on-surface">Keyli Sub.</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
            aria-label="Cerrar menú"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <nav className="flex-1 pr-4">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex items-center px-6 py-3 transition-all mb-1 bg-secondary-fixed border-l-4 border-primary text-on-secondary-fixed font-semibold rounded-r-lg"
                    : "flex items-center px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all mb-1"
                }
              >
                <span className="material-symbols-outlined mr-3 text-on-surface-variant">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4 border-t border-outline-variant bg-surface-container-low/50">
          <div className="px-2 py-2 mb-2">
            <p className="text-xs font-admin-label-caps text-on-surface-variant">ADMINISTRADOR</p>
            <p className="text-sm font-admin-body truncate text-on-surface">admin@keylisub.com</p>
          </div>
          {/* ponytail: sin logout real — HTTP Basic Auth no tiene sesión que cerrar; llega con Supabase Auth */}
          <button className="w-full flex items-center px-2 py-2 text-error hover:bg-error-container/20 rounded-lg transition-colors" disabled>
            <span className="material-symbols-outlined mr-3">logout</span>
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
