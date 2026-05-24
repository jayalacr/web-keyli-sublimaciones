"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  "/admin":              "Dashboard",
  "/admin/productos":    "Productos",
  "/admin/categorias":   "Categorías",
  "/admin/temporadas":   "Temporadas",
  "/admin/configuracion":"Configuración",
};

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export function AdminTopbar() {
  const pathname = usePathname();

  const section = Object.entries(LABELS)
    .sort((a, b) => b[0].length - a[0].length)
    .find(([href]) => pathname === href || pathname.startsWith(href + "/"));

  const label = section?.[1] ?? "Admin";

  return (
    <header
      style={{
        height: 60,
        background: "white",
        borderBottom: "1px solid #ECE4F4",
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 30,
        flexShrink: 0,
      }}
    >
      {/* Breadcrumb */}
      <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, flex: 1 }}>
        <Link href="/admin" style={{ color: "rgba(30,15,60,.4)", textDecoration: "none", fontWeight: 500 }}>
          Admin
        </Link>
        {label !== "Dashboard" && (
          <>
            <span style={{ color: "rgba(30,15,60,.25)", fontSize: 11 }}>›</span>
            <span style={{ color: "#1E0F3C", fontWeight: 600 }}>{label}</span>
          </>
        )}
        {label === "Dashboard" && (
          <span style={{ color: "#1E0F3C", fontWeight: 600 }}>Dashboard</span>
        )}
      </nav>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#F7F3FB",
          border: "1px solid #ECE4F4",
          borderRadius: 10,
          padding: "7px 12px",
          width: 220,
          color: "rgba(30,15,60,.4)",
          fontSize: 13,
        }}
      >
        <SearchIcon />
        <span>Buscar…</span>
      </div>

      {/* User pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 14px 6px 6px",
          borderRadius: 999,
          background: "#F7F3FB",
          border: "1px solid #ECE4F4",
          cursor: "default",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #5C3A8C, #9D6BAA)",
            display: "grid",
            placeItems: "center",
            color: "white",
            fontWeight: 800,
            fontSize: 13,
          }}
        >
          K
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1E0F3C" }}>Keyli</span>
          <span style={{ fontSize: 10, color: "rgba(30,15,60,.45)", letterSpacing: ".04em" }}>Administradora</span>
        </div>
      </div>
    </header>
  );
}
