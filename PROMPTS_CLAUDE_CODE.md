# Prompts para Claude Code — Keyli Sublimaciones

> **Instrucciones:** Ejecuta estos prompts **uno por uno** en Claude Code, en orden.
> Después de cada uno, verifica que el resultado coincida con el diseño antes de continuar.
> El diseño de referencia es el HTML generado por Claude Design.

---

## Prompt 1 — Setup del proyecto

```
Lee los archivos PROMPT_CLAUDE_CODE.md y PLAN_DESARROLLO.md para entender 
el contexto completo del proyecto Keyli Sublimaciones.

Luego inicializa el proyecto Next.js 14 con App Router:

1. npx create-next-app@latest con TypeScript, Tailwind, ESLint, App Router y src/
2. Instala dependencias: @supabase/supabase-js @supabase/ssr
3. Configura tailwind.config.ts con el design system completo definido en 
   PROMPT_CLAUDE_CODE.md (paleta de colores lilac/yellow/neutros, tipografía 
   Dancing Script + Plus Jakarta Sans, sombras tintadas, border-radius, spacing 8pt)
4. Crea la estructura de carpetas vacía según PROMPT_CLAUDE_CODE.md
5. Configura las Google Fonts en el layout principal

No implementes componentes todavía, solo el scaffolding.
```

---

## Prompt 2 — Componentes UI base (iconos + ilustraciones)

```
Fetch this design file y léelo como referencia visual:
https://api.anthropic.com/v1/design/h/GvivKQMIJXg2QYa3YI5wNA?open_file=index.html

Del HTML del diseño, extrae TODOS los componentes SVG inline y conviértelos 
a componentes React tipados con TypeScript en:

- src/components/ui/Icons.tsx — Todos los iconos: Sparkle, Star, WhatsAppGlyph, 
  FacebookGlyph, InstagramGlyph, TikTokGlyph, Menu, ArrowRight, ChevronDown, 
  Search, Edit, Trash, Plus, Check, Clock, Truck, Heart, Grid, MugLine, 
  ShirtLine, BottleLine, KeyLine, TagLine, SortIcon

- src/components/ui/ProductIcon.tsx — Las ilustraciones SVG de producto: 
  Shirt, Mug, Bottle, Key, Tag. Cada una recibe props { size, color, accent }

- src/components/ui/Logo.tsx — Componentes Logo y LogoLockup

Cada componente debe tener interface tipada para sus props (size, color, className, etc.)
Usa las clases de Tailwind del design system que ya configuramos.
```

---

## Prompt 3 — Layout global (Header + Footer + WhatsApp)

```
Fetch this design file como referencia visual:
https://api.anthropic.com/v1/design/h/GvivKQMIJXg2QYa3YI5wNA?open_file=index.html

Implementa el layout global del sitio copiando fielmente el diseño del HTML:

1. src/components/layout/Header.tsx — Navbar con:
   - Logo a la izquierda
   - Nav items: Inicio, Catálogo, Cómo comprar
   - Botón de WhatsApp a la derecha
   - Menú hamburguesa en móvil (< 768px) con drawer animado
   - Usa los componentes de Icons.tsx y Logo.tsx que ya existen

2. src/components/layout/Footer.tsx — Footer con:
   - LogoLockup
   - Redes sociales (SocialRow)
   - Textos de contacto y copyright

3. src/components/layout/WhatsAppFAB.tsx — Botón flotante fijo en 
   esquina inferior derecha con el ícono de WhatsApp

4. src/app/layout.tsx — Layout raíz que envuelve Header + children + Footer + WhatsAppFAB

Usa next/link para la navegación. Los colores y estilos deben usar las 
clases Tailwind del design system (lilac, ink, cream, etc.)
```

---

## Prompt 4 — Página de inicio (Landing)

```
Fetch this design file como referencia visual:
https://api.anthropic.com/v1/design/h/GvivKQMIJXg2QYa3YI5wNA?open_file=index.html

Implementa la página de inicio en src/app/page.tsx replicando el diseño exacto 
del LandingScreen del HTML. Crea estos componentes en src/components/home/:

1. Hero.tsx — Hero section con gradiente lilac-amarillo, título con Dancing Script, 
   subtítulo, botón CTA a WhatsApp. Soporta variantes: gradient, glow, minimal, photo
2. SparkleBand.tsx — Banda horizontal animada que repite "✦ Personaliza tu mundo"
3. ServicesSection.tsx — 3 tarjetas de técnicas (DTF, Sublimación, Digital) con 
   ServiceCard. Cada card muestra tagline, descripción y lista de productos incluidos
4. FeaturedProducts.tsx — Grid de productos destacados usando ProductCard
5. SeasonsBanner.tsx — Banner horizontal scrolleable con las 10 temporadas
6. CTAClose.tsx — Sección final call-to-action

Los datos de productos, técnicas y temporadas van en src/lib/data.ts como 
constantes tipadas (extraer de window.KEYLI_DATA del HTML).
Los tipos van en src/types/index.ts (Product, Technique, Season).
```

---

## Prompt 5 — Catálogo y detalle de producto

```
Fetch this design file como referencia visual:
https://api.anthropic.com/v1/design/h/GvivKQMIJXg2QYa3YI5wNA?open_file=index.html

Implementa el catálogo replicando el diseño del CatalogScreen y ProductScreen:

1. src/components/catalogo/ProductCard.tsx — Card con gradiente de fondo, 
   ProductIcon, nombre, precio, badge opcional, botón de corazón
2. src/components/catalogo/CategoryCard.tsx — Card de categoría con contador
3. src/components/catalogo/CategoryDetailPanel.tsx — Panel desplegable con 
   productos filtrados por categoría

4. src/app/catalogo/page.tsx — Grid de productos con:
   - Barra de búsqueda
   - Filtros por categoría (chips) y por temporada
   - Ordenamiento (precio, nombre, stock)
   - Usa los datos de src/lib/data.ts por ahora

5. src/app/catalogo/[slug]/page.tsx — Detalle de producto con:
   - ProductIcon grande
   - Nombre, descripción, precio
   - Selector de color y talla
   - Botón "Pedir por WhatsApp" que abre wa.me con mensaje pre-armado:
     "Hola! Me interesa: {nombre}. ¿Podrían darme más info?"
   - Productos relacionados abajo
```

---

## Prompt 6 — Página de proceso (Cómo comprar)

```
Fetch this design file como referencia visual:
https://api.anthropic.com/v1/design/h/GvivKQMIJXg2QYa3YI5wNA?open_file=index.html

Implementa src/app/proceso/page.tsx con el diseño del ProcessScreen del HTML.
Es una página con 3 tabs:

1. src/components/proceso/CompraTab.tsx — Pasos de compra con StepIllustration 
   SVG animado por cada paso. Los pasos están en lib/data.ts (buyingSteps)
2. src/components/proceso/CancelacionTab.tsx — Política de cancelación con 
   los datos de cancellationPolicy
3. src/components/proceso/FaqTab.tsx — Acordeón de preguntas frecuentes 
   con animación de expandir/colapsar. Datos de faqs en lib/data.ts

Los tabs deben tener transición suave al cambiar de pestaña.
```

---

## Prompt 7 — Panel de administración

```
Fetch this design file como referencia visual:
https://api.anthropic.com/v1/design/h/GvivKQMIJXg2QYa3YI5wNA?open_file=index.html

Implementa el panel de administración completo en src/app/admin/ replicando 
el AdminScreen del HTML. Crea estos componentes en src/components/admin/:

1. AdminSidebar.tsx — Sidebar con navegación: Dashboard, Productos, 
   Temporadas, Categorías, Configuración
2. AdminTopbar.tsx — Barra superior con título de la vista activa
3. src/app/admin/layout.tsx — Layout del admin con sidebar + topbar

4. DashboardView.tsx + StatCard.tsx — Dashboard con cards de estadísticas 
   (total productos, activos, agotados, temporadas activas)
5. ProductsView.tsx + ProductForm.tsx — Tabla de productos con búsqueda, 
   filtros, y modal de crear/editar producto con todos los campos
6. SeasonsView.tsx + SeasonForm.tsx — Grid de temporadas con modal de edición
7. CategoriesView.tsx — Vista de categorías agrupadas por técnica
8. ConfigView.tsx — Formulario de configuración del negocio (WhatsApp, redes)

Por ahora usa estado local (useState) para el CRUD. Después conectaremos Supabase.
Todo el admin debe ser client-side ("use client").
```

---

## Tabla resumen

| # | Prompt | Qué implementa | Depende de |
|---|--------|-----------------|------------|
| 1 | Setup | Scaffolding + Tailwind config | — |
| 2 | UI base | Iconos SVG + Logo + Ilustraciones | #1 |
| 3 | Layout | Header + Footer + WhatsAppFAB | #2 |
| 4 | Home | Landing completa (6 secciones) | #2, #3 |
| 5 | Catálogo | Grid + filtros + detalle + WhatsApp | #2, #3 |
| 6 | Proceso | Tabs compra/cancelación/FAQ | #2, #3 |
| 7 | Admin | Panel CRUD completo (5 vistas) | #2, #3 |

---

## Tips de uso

- **Ejecuta en orden.** Cada prompt asume que el anterior ya se completó.
- **Verifica después de cada uno.** Corre `npm run dev` y compara con el diseño HTML.
- **Si algo no coincide**, dile a Claude Code: *"El componente X no se ve igual al diseño. En el HTML original [describe la diferencia]. Ajústalo."*
- **No mezcles prompts.** Si quieres un cambio extra, hazlo en un prompt separado después.
- **Prompts 4, 5 y 6 son independientes entre sí.** Puedes hacerlos en cualquier orden después del 3.
