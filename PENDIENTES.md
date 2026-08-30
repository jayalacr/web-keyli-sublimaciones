# Pendientes — reconstrucción con diseño Stitch

Contexto: se borró el proyecto anterior y se re-escafoldó Next.js desde cero para reconstruir sobre
el nuevo diseño de Stitch ("Catálogo Editorial Keyli Sublimaciones v2", `projects/9197813770905051520`).
Datos hardcodeados por ahora — la estructura de Supabase todavía no está definida.

## Hecho

- [x] Reset completo del repo (código viejo borrado, recuperable en `git log` previo a este reset)
- [x] Next.js 16 re-escafoldado (TypeScript, Tailwind v4, App Router, src/)
- [x] `docs/stitch-design-system.md` — design system exportado de Stitch
- [x] `src/app/globals.css` — tokens `@theme` del sitio público + tokens `font-admin-*`/spacing propios del admin (sin pisar los del sitio público)
- [x] `src/app/layout.tsx`, `src/proxy.ts` (Basic Auth de `/admin/:path*`), `next.config.ts`
- [x] `src/components/layout/Header.tsx` / `Footer.tsx`
- [x] Sitio público: Inicio (`src/app/page.tsx`), Artículos (`src/app/articulos/page.tsx`), Nosotros (`src/app/nosotros/page.tsx`), Temporadas (`src/app/temporadas/page.tsx` + detalle dinámico `src/app/temporadas/[slug]/page.tsx` usando Navidad como plantilla, `src/lib/seasons.ts`)
- [x] Admin completo, protegido por Basic Auth:
  - Dashboard (`src/app/admin/page.tsx`)
  - Productos (`src/app/admin/productos/page.tsx`) + Editar/Nuevo Producto (`src/app/admin/productos/[id]/page.tsx`)
  - Categorías (`src/app/admin/categorias/page.tsx`) — sin diseño en Stitch, genérica por decisión del cliente
  - Temporadas admin (`src/app/admin/temporadas/page.tsx`) con panel lateral de edición
  - Configuración (`src/app/admin/configuracion/page.tsx`) — sólo tab "Textos del sitio" tiene diseño en Stitch
- [x] `npm run build` / `tsc --noEmit` limpios en cada paso

## Pendiente

- [ ] Landing estacional Navidad (`d2aa2e0490d84c6e93ae87a57bc53eb6`) — actualmente `/temporadas/navidad` reutiliza la plantilla genérica de `/temporadas/[slug]`, no el screen específico de Navidad
- [ ] Productos reales para las 5 temporadas sin diseño en Stitch (San Valentín, Primavera, Día de las Madres, Regreso a Clases, Día de Muertos) — hoy `src/lib/seasons.ts` las deja con estado vacío
- [ ] Tabs Contacto/Envíos/Cuenta de Configuración admin — sin diseño en Stitch, placeholder honesto por ahora
- [ ] Página `/proceso` (link roto en el Footer)

## Pendiente — decisiones/insumos del cliente

- [ ] Número real de WhatsApp (hoy `PHONE` en `src/lib/constants.ts` es un placeholder)
- [ ] Catálogo real de productos (hoy `src/lib/data.ts` y `src/lib/adminProducts.ts` son placeholder)
- [ ] Definir la estructura de base de datos y conectar Supabase (paquetes ya instalados: `@supabase/ssr`, `@supabase/supabase-js`; sin cliente ni migraciones todavía) — esto es lo que le da persistencia real a todo el admin (hoy todas las ediciones son sólo estado local de la sesión del navegador)
- [ ] Fotos reales de producto (hoy se usan las URLs placeholder de Stitch — `lh3.googleusercontent.com` — que pueden expirar)

## Notas técnicas para retomar

- Proyecto de Stitch: `projects/9197813770905051520` ("Catálogo Editorial Keyli Sublimaciones v2")
- Patrón para convertir cada pantalla: `mcp__stitch__get_screen` para el HTML, extraer contenido real (textos, alts, URLs de imagen), convertir a componente React usando las clases tal cual (ya mapeadas en `globals.css`), reemplazar `<a href="#">` por `next/link`, `background-image` inline por `next/image` con `fill`
- El admin usa un design system MD3 ligeramente distinto al del sitio público (mismos roles de color, tipografía/spacing propios con prefijo `font-admin-*` y tokens `--spacing-row-height-*`/`--spacing-sidebar-width` en `globals.css`)
