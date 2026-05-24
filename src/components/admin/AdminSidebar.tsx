"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { products, categoryMeta, seasons } from "@/lib/data";

// ── Icons ────────────────────────────────────────────────────
const DashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="8" height="9" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/>
    <rect x="3" y="14" width="8" height="7" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/>
  </svg>
);
const ProductsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/>
    <path d="m3 17 5-5 6 6 4-4 3 3"/>
  </svg>
);
const CatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/>
    <circle cx="7" cy="7" r="1.5"/>
  </svg>
);
const SeasonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>
  </svg>
);
const ConfigIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const S = {
  sidebar: {
    background: "#1F0F36",
    backgroundImage: "radial-gradient(80% 50% at 0% 0%, rgba(202,176,236,.10) 0%, transparent 70%), linear-gradient(180deg, #1F0F36 0%, #15082A 100%)",
    color: "rgba(255,255,255,.78)",
    padding: "18px 14px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
    position: "sticky" as const,
    top: 0,
    height: "100vh",
    overflowY: "auto" as const,
    borderRight: "1px solid rgba(255,255,255,.08)",
    flexShrink: 0,
    width: 240,
  },
};

export function AdminSidebar() {
  const pathname = usePathname();

  const counts = {
    products: products.length,
    cats: categoryMeta.length,
    seasons: seasons.length,
    unassigned: products.filter((p) => !p.category).length,
  };

  const items = [
    { href: "/admin",              label: "Dashboard",   Icon: DashIcon,     count: null },
    { href: "/admin/productos",    label: "Productos",   Icon: ProductsIcon, count: counts.products },
    { href: "/admin/categorias",   label: "Categorías",  Icon: CatIcon,      count: counts.cats },
    { href: "/admin/temporadas",   label: "Temporadas",  Icon: SeasonIcon,   count: counts.seasons },
    { href: "/admin/configuracion",label: "Configuración",Icon: ConfigIcon,  count: null },
  ];

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside style={S.sidebar}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 10px 18px", borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 16 }}>
        <Image src="/assets/logo-keyli.jpeg" alt="Keyli" width={36} height={36} style={{ borderRadius: 10, boxShadow: "0 0 0 2px rgba(255,255,255,.15)" }} />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "white", letterSpacing: "-.01em" }}>Keyli</span>
          <span style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginTop: 2 }}>Studio</span>
        </div>
      </div>

      {/* Nav items */}
      {items.map(({ href, label, Icon, count }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "9px 12px",
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: active ? 600 : 500,
              color: active ? "white" : "rgba(255,255,255,.78)",
              background: active ? "linear-gradient(90deg, rgba(255,216,77,.08) 0%, rgba(202,176,236,.12) 100%)" : "transparent",
              textDecoration: "none",
              position: "relative",
              transition: "background .12s, color .12s",
            }}
          >
            {active && (
              <span style={{ position: "absolute", left: -14, top: 8, bottom: 8, width: 3, borderRadius: "0 3px 3px 0", background: "#FFD84D" }} />
            )}
            <span style={{ width: 18, height: 18, display: "grid", placeItems: "center", flexShrink: 0, color: active ? "white" : "rgba(255,255,255,.45)" }}>
              <Icon />
            </span>
            <span>{label}</span>
            {count !== null && (
              <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: active ? "#FFD84D" : "rgba(255,255,255,.45)", background: active ? "rgba(255,216,77,.18)" : "rgba(255,255,255,.06)", padding: "2px 7px", borderRadius: 999 }}>
                {count}
              </span>
            )}
          </Link>
        );
      })}

      {/* Demo note */}
      <div style={{ marginTop: "auto", padding: 14, background: "rgba(255,255,255,.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "white", marginBottom: 4 }}>Modo demostración</div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,.45)", lineHeight: 1.45, margin: 0 }}>
          Cambios simulados, no se persisten al cerrar.
        </p>
      </div>

      {/* Back to site */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,.45)", padding: "10px 12px", marginTop: 8, textDecoration: "none" }}>
        <BackIcon /> Volver al sitio
      </Link>
    </aside>
  );
}
