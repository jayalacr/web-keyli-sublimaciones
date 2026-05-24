# Implementación del Diseño — Keyli Sublimaciones

## Contexto del Proyecto

Keyli Sublimaciones es un emprendimiento mexicano dedicado a la personalización de artículos: playeras (DTF y sublimación), tazas, termos, llaveros, vinil textil/decorativo, cuadros MDF, y trabajos digitales (tarjetas, invitaciones, stickers, lonas).

Actualmente existe un **prototipo funcional en un solo archivo HTML** (`index.html`) que usa React 18 via CDN + Babel en el navegador. Este archivo contiene:
- Todo el diseño visual (componentes, estilos, layout)
- Los datos hardcodeados de productos, temporadas, técnicas
- Un panel de administración funcional (CRUD de productos, temporadas, categorías, config)
- Navegación SPA con rutas simuladas

**Tu tarea:** Migrar este prototipo a un proyecto **Next.js 14 con App Router, TypeScript y Tailwind CSS**, respetando fielmente el diseño visual del HTML.

---

## Stack Objetivo

| Tecnología      | Rol                                      |
|-----------------|------------------------------------------|
| **Next.js 14**  | Framework (App Router, SSG/ISR)          |
| **TypeScript**  | Tipado estático                          |
| **Tailwind CSS**| Estilos (reemplazar el CSS custom)       |
| **Supabase**    | Base de datos + Storage + Auth           |
| **Vercel**      | Hosting + CI/CD                          |

### Setup inicial (ejecutar primero)
```bash
npx create-next-app@latest web-keyli-sublimaciones --typescript --tailwind --eslint --app --src-dir
cd web-keyli-sublimaciones
npm install @supabase/supabase-js @supabase/ssr
```

---

## Design System (extraer del CSS actual)

El archivo `styles.css` define un design system completo que debe traducirse a `tailwind.config.ts`:

### Paleta de colores (extraída del logo)
```
Lilas:       #FAF4FB, #F2E3F4, #E6CCEB, #D7B5DE, #CFA8D8, #B98AC4, #9D6BAA, #7C4F8C, #5E3E80, #3D2756
Amarillos:   #FFF1B0, #FFE066, #FFD84D, #FFC926, #E6AF14
Neutros:     cream=#FFFBF0, paper=#FFFFFF, ink=#2A1F44, ink-soft=#5A4E73, ink-faint=#8B82A1
Líneas:      line=#EDE6F7, line-soft=#F6F1FC
```

### Tipografía
- **Display/decorativa:** "Dancing Script" (cursiva, para el nombre "Keyli")
- **UI/cuerpo:** "Plus Jakarta Sans" (sans-serif, para todo el texto)

### Sombras (tintadas con púrpura)
```
shadow-sm: 0 1px 2px rgba(92,58,140,0.06)
shadow-md: 0 8px 24px -8px rgba(92,58,140,0.18)
shadow-lg: 0 24px 60px -20px rgba(92,58,140,0.30)
```

### Espaciado (escala de 8pt)
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px

### Border radius
xs=6px, sm=10px, md=16px, lg=24px, xl=32px, pill=999px

---

## Estructura de Carpetas Objetivo

```
src/
├── app/
│   ├── layout.tsx              # Layout principal (Header + Footer + WhatsAppFAB)
│   ├── page.tsx                # Página de Inicio (LandingScreen)
│   ├── catalogo/
│   │   ├── page.tsx            # Listado con filtros (CatalogScreen)
│   │   └── [slug]/
│   │       └── page.tsx        # Detalle de producto (ProductScreen)
│   ├── proceso/
│   │   └── page.tsx            # Cómo comprar, cancelaciones, FAQ (ProcessScreen)
│   ├── contacto/
│   │   └── page.tsx            # Formulario de contacto
│   └── admin/
│       ├── layout.tsx          # Layout admin (AdminSidebar + AdminTopbar + auth)
│       ├── page.tsx            # Dashboard (DashboardView)
│       ├── productos/
│       │   └── page.tsx        # CRUD productos (ProductsView + ProductForm)
│       ├── temporadas/
│       │   └── page.tsx        # CRUD temporadas (SeasonsView + SeasonForm)
│       ├── categorias/
│       │   └── page.tsx        # Vista categorías (CategoriesView)
│       └── configuracion/
│           └── page.tsx        # Configuración (ConfigView)
│
├── components/
│   ├── ui/                     # Componentes genéricos reutilizables
│   │   ├── Logo.tsx            # Logo + LogoLockup
│   │   ├── Icons.tsx           # Todos los SVG icons (Sparkle, Star, WhatsAppGlyph, etc.)
│   │   ├── SocialRow.tsx
│   │   └── ProductIcon.tsx     # Shirt, Mug, Bottle, Key, Tag illustrations
│   │
│   ├── layout/
│   │   ├── Header.tsx          # Navbar con menú hamburguesa móvil
│   │   ├── Footer.tsx          # Footer con redes sociales
│   │   └── WhatsAppFAB.tsx     # Botón flotante de WhatsApp
│   │
│   ├── home/
│   │   ├── Hero.tsx            # Hero section (variantes: gradient, glow, minimal, photo)
│   │   ├── SparkleBand.tsx     # Banda animada de "Personaliza tu mundo"
│   │   ├── ServicesSection.tsx # Tarjetas de técnicas (DTF, Sublimación, Digital)
│   │   ├── FeaturedProducts.tsx
│   │   ├── SeasonsBanner.tsx   # Banner de temporadas
│   │   └── CTAClose.tsx        # Call-to-action final
│   │
│   ├── catalogo/
│   │   ├── ProductCard.tsx
│   │   ├── CategoryCard.tsx
│   │   └── CategoryDetailPanel.tsx
│   │
│   ├── proceso/
│   │   ├── CompraTab.tsx       # Pasos de compra con StepIllustration
│   │   ├── CancelacionTab.tsx
│   │   └── FaqTab.tsx
│   │
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── AdminTopbar.tsx
│       ├── DashboardView.tsx
│       ├── StatCard.tsx
│       ├── ProductsView.tsx
│       ├── ProductForm.tsx
│       ├── SeasonsView.tsx
│       ├── SeasonForm.tsx
│       ├── CategoriesView.tsx
│       └── ConfigView.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Cliente browser
│   │   ├── server.ts           # Cliente server-side
│   │   └── types.ts            # Tipos de la BD
│   ├── data.ts                 # Datos iniciales (migrar de window.KEYLI_DATA)
│   ├── constants.ts            # PHONE, WA_BASE, waLink()
│   └── utils.ts                # Funciones auxiliares
│
├── hooks/
│   ├── useProducts.ts
│   └── useCategories.ts
│
└── types/
    └── index.ts                # Interfaces: Product, Technique, Season, Category, etc.
```

---

## Mapeo de Componentes (HTML → React/Next.js)

A continuación el mapeo de cada componente del HTML hacia su archivo en Next.js. **Cada componente mantiene el mismo diseño visual**, solo cambia la sintaxis (JSX → TSX, CSS inline → Tailwind, datos hardcodeados → props/fetch).

### Iconos SVG (archivo: `components/ui/Icons.tsx`)
Exportar como componentes tipados todos estos SVGs inline del HTML:
`Sparkle`, `Star`, `WhatsAppGlyph`, `FacebookGlyph`, `InstagramGlyph`, `TikTokGlyph`, `Menu`, `ArrowRight`, `ChevronDown`, `Search`, `Edit`, `Trash`, `Plus`, `Check`, `Clock`, `Truck`, `Heart`, `Grid`, `MugLine`, `ShirtLine`, `BottleLine`, `KeyLine`, `TagLine`, `SortIcon`

### Ilustraciones de producto (archivo: `components/ui/ProductIcon.tsx`)
SVG illustrations: `Shirt`, `Mug`, `Bottle`, `Key`, `Tag` — cada uno recibe `size`, `color`, `accent`.

### Layout
- `Header` → Navbar con logo, nav items, menú hamburguesa en móvil, botón WhatsApp
- `Footer` → Info de contacto, redes sociales, copyright
- `WhatsAppFAB` → Botón flotante fijo esquina inferior derecha

### Páginas públicas
- `LandingScreen` → Compuesto por: Hero + SparkleBand + ServicesSection + FeaturedProducts + SeasonsBanner + CTAClose
- `CatalogScreen` → Filtros por categoría/temporada + grid de ProductCard + búsqueda
- `ProductScreen` → Detalle con ProductIcon, colores, tallas, botón "Pedir por WhatsApp"
- `ProcessScreen` → Tabs: CompraTab, CancelacionTab, FaqTab

### Panel Admin
- `AdminScreen` → Layout con sidebar + topbar + vista activa
- `DashboardView` → StatCards + resumen de productos/temporadas
- `ProductsView` → Tabla de productos + ProductForm modal
- `SeasonsView` → Grid de temporadas + SeasonForm modal
- `CategoriesView` → Vista de categorías agrupadas
- `ConfigView` → Configuración del negocio (WhatsApp, redes, etc.)

---

## Modelo de Datos

### Interfaces TypeScript (crear en `types/index.ts`)

```typescript
interface Technique {
  id: string;           // "dtf" | "sublimacion" | "digital"
  label: string;
  tagline: string;
  desc: string;
  includes: string[];
}

interface Season {
  id: string;
  label: string;
  emoji: string;
  month: string;
  tint: string;         // Color hex para el fondo
}

interface Product {
  id: string;
  name: string;
  technique: string;    // FK a Technique.id
  seasons: string[];    // FK[] a Season.id
  category: string;     // "Playeras" | "Tazas" | "Termos" | "Llaveros" | "Vinil"
  priceFrom: number;
  blurb: string;
  colors: string[];
  sizes: string[];
  gradient: [string, string];  // Par de colores para fondo de la card
  icon: string;         // "shirt" | "mug" | "bottle" | "key" | "tag"
  featured?: boolean;
  stock?: number;
  badge?: string;
}
```

### Tablas Supabase (PostgreSQL)

```sql
-- Categorías de producto
CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  descripcion TEXT,
  imagen_url TEXT,
  orden INT DEFAULT 0,
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Productos
CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  descripcion TEXT,
  precio_base DECIMAL(10,2),
  categoria_id UUID REFERENCES categorias(id),
  destacado BOOLEAN DEFAULT false,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Imágenes de productos
CREATE TABLE producto_imagenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text VARCHAR(200),
  orden INT DEFAULT 0,
  es_principal BOOLEAN DEFAULT false
);

-- Configuración del negocio (key-value)
CREATE TABLE info_negocio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clave VARCHAR(50) UNIQUE NOT NULL,
  valor TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Datos Iniciales (seed)

El HTML tiene todos los datos hardcodeados en `window.KEYLI_DATA`. Migrar a `lib/data.ts` como constantes tipadas para usar como seed y como fallback mientras no haya Supabase configurado:

- **10 temporadas:** Día de las Madres, Padre, Niño, Maestro, San Valentín, Navidad, Día de Muertos, Graduaciones, Bautizos/XV, Baby Shower
- **3 técnicas:** DTF, Sublimación, Trabajos digitales
- **~10 productos** con todos sus campos (colores, tallas, precios, badges)
- **Testimonios, FAQs, pasos de compra, política de cancelación**

---

## Instrucciones de Conversión CSS → Tailwind

El archivo `styles.css` tiene ~1030 líneas de CSS custom. Convertir así:

1. **Variables CSS → tailwind.config.ts `extend`:** Mapear toda la paleta de colores, sombras, radios y tipografía a la configuración de Tailwind.

2. **Estilos inline del HTML → clases Tailwind:** El HTML usa `style={{...}}` extensivamente. Convertir cada prop CSS a su equivalente Tailwind. Ejemplo:
   ```
   style={{ padding: 24, borderRadius: 16, background: '#FAF4FB' }}
   →
   className="p-6 rounded-2xl bg-lilac-50"
   ```

3. **Animaciones CSS → Tailwind animations:** El CSS tiene keyframes para `sparkle-float`, `fade-in-up`, etc. Definirlas en `tailwind.config.ts`.

4. **Responsive:** El HTML ya maneja responsive con media queries inline. Convertir a breakpoints de Tailwind (`sm:`, `md:`, `lg:`).

---

## Navegación / Rutas

El HTML simula rutas con estado React. Mapear a App Router:

| Ruta HTML (estado)     | Ruta Next.js           | Componente principal  |
|------------------------|------------------------|-----------------------|
| `route === "home"`     | `/`                    | LandingScreen         |
| `route === "catalog"`  | `/catalogo`            | CatalogScreen         |
| `route === "product"`  | `/catalogo/[slug]`     | ProductScreen         |
| `route === "process"`  | `/proceso`             | ProcessScreen         |
| `route === "admin"`    | `/admin`               | AdminScreen           |

---

## Funcionalidad de WhatsApp

El botón principal de conversión es "Pedir por WhatsApp". La URL se construye así:

```typescript
const PHONE = "525512345678"; // Número de Keyli
const waLink = (text: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

// Ejemplo de uso en ProductScreen:
waLink(`Hola! Me interesa: ${product.name}. ¿Podrían darme más info?`)
```

---

## Prioridades de Implementación

1. **Setup** → Inicializar Next.js + Tailwind + config del design system
2. **Componentes UI** → Icons, Logo, ProductIcon (los bloques base)
3. **Layout** → Header, Footer, WhatsAppFAB (estructura global)
4. **Home** → Hero + todas las secciones de landing
5. **Catálogo** → Grid + filtros + detalle de producto
6. **Proceso** → Tabs de compra/cancelación/FAQ
7. **Admin** → Dashboard + CRUD completo
8. **Supabase** → Conectar BD real, reemplazar datos hardcodeados
9. **SEO** → Metadata, sitemap, robots.txt, next/image

---

## Notas Importantes

- **El archivo `index.html` es la fuente de verdad visual.** Cada componente debe verse igual que en el prototipo.
- **No inventar diseño nuevo.** Respetar colores, espaciados, tipografía, bordes redondeados y sombras del original.
- **Los SVG inline son ilustraciones custom.** No reemplazarlos con librerías de iconos — copiarlos tal cual como componentes React tipados.
- **El admin ya funciona en el HTML.** Tiene CRUD completo con modales, formularios, validación — todo eso debe migrarse.
- **Mobile-first.** El diseño ya es responsive, mantener los breakpoints.
- **Idioma: español.** Todo el contenido, labels, placeholders y mensajes en español.
- **Archivo de referencia del diseño HTML:** ver `index.html` y `styles.css` en la raíz del proyecto.
