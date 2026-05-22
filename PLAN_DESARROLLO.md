# Plan de Desarrollo — Keyli Sublimaciones

## Stack Tecnológico

| Tecnología    | Rol                        | Costo     |
|---------------|----------------------------|-----------|
| Next.js 14    | Framework frontend (App Router, SSG) | Gratis    |
| TypeScript    | Tipado estático            | Gratis    |
| Tailwind CSS  | Framework de estilos       | Gratis    |
| Supabase      | Base de datos + Storage + Auth | Gratis (free tier) |
| Vercel        | Hosting + CI/CD            | Gratis (free tier) |
| GitHub        | Repositorio de código      | Gratis    |
| Dominio       | URL personalizada          | ~$10-15 USD/año |

---

## Modelo de Datos (Supabase / PostgreSQL)

### Tabla: `categorias`
| Columna      | Tipo         | Descripción                    |
|--------------|--------------|--------------------------------|
| id           | UUID (PK)    | Identificador único            |
| nombre       | VARCHAR(100) | Nombre de la categoría         |
| slug         | VARCHAR(100) | URL amigable (ej: "playeras")  |
| descripcion  | TEXT         | Descripción opcional           |
| imagen_url   | TEXT         | Imagen representativa          |
| orden        | INT          | Orden de aparición             |
| activa       | BOOLEAN      | Visible o no en el catálogo    |
| created_at   | TIMESTAMPTZ  | Fecha de creación              |

### Tabla: `productos`
| Columna        | Tipo         | Descripción                       |
|----------------|--------------|-----------------------------------|
| id             | UUID (PK)    | Identificador único               |
| nombre         | VARCHAR(200) | Nombre del producto               |
| slug           | VARCHAR(200) | URL amigable                      |
| descripcion    | TEXT         | Descripción detallada             |
| precio_base    | DECIMAL(10,2)| Precio base (referencia)          |
| categoria_id   | UUID (FK)    | Relación con categorías           |
| destacado      | BOOLEAN      | Mostrar en la página de inicio    |
| activo         | BOOLEAN      | Visible en el catálogo            |
| created_at     | TIMESTAMPTZ  | Fecha de creación                 |
| updated_at     | TIMESTAMPTZ  | Última modificación               |

### Tabla: `producto_imagenes`
| Columna      | Tipo         | Descripción                    |
|--------------|--------------|--------------------------------|
| id           | UUID (PK)    | Identificador único            |
| producto_id  | UUID (FK)    | Relación con productos         |
| url          | TEXT         | URL de la imagen en Storage    |
| alt_text     | VARCHAR(200) | Texto alternativo (SEO)        |
| orden        | INT          | Orden de aparición             |
| es_principal | BOOLEAN      | Imagen principal del producto  |

### Tabla: `info_negocio`
| Columna      | Tipo         | Descripción                    |
|--------------|--------------|--------------------------------|
| id           | UUID (PK)    | Identificador único            |
| clave        | VARCHAR(50)  | Ej: "telefono", "whatsapp"     |
| valor        | TEXT         | El valor correspondiente       |
| updated_at   | TIMESTAMPTZ  | Última modificación            |

> **Nota:** La tabla `info_negocio` es un key-value store para guardar datos como teléfono, dirección, horarios, redes sociales, etc. Así los puedes editar desde el admin sin tocar código.

---

## Estructura de Carpetas

```
web-keyli-sublimaciones/
├── public/
│   ├── favicon.ico
│   └── images/              # Imágenes estáticas (logo, etc.)
│
├── src/
│   ├── app/                  # App Router de Next.js
│   │   ├── layout.tsx        # Layout principal (navbar + footer)
│   │   ├── page.tsx          # Página de INICIO
│   │   ├── catalogo/
│   │   │   ├── page.tsx      # Listado de productos con filtros
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Detalle de un producto
│   │   ├── contacto/
│   │   │   └── page.tsx      # Formulario de contacto
│   │   └── admin/            # Panel de administración
│   │       ├── layout.tsx    # Layout del admin (sidebar + auth)
│   │       ├── page.tsx      # Dashboard
│   │       ├── productos/
│   │       │   ├── page.tsx  # CRUD de productos
│   │       │   └── [id]/
│   │       │       └── page.tsx  # Editar producto
│   │       └── categorias/
│   │           └── page.tsx  # CRUD de categorías
│   │
│   ├── components/
│   │   ├── ui/               # Componentes genéricos (Button, Input, Modal)
│   │   ├── layout/           # Navbar, Footer, WhatsAppButton
│   │   ├── catalogo/         # ProductCard, ProductGrid, CategoryFilter
│   │   ├── home/             # Hero, FeaturedProducts, CategoryShowcase
│   │   └── admin/            # AdminSidebar, ProductForm, ImageUploader
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts     # Cliente de Supabase (browser)
│   │   │   ├── server.ts     # Cliente de Supabase (server-side)
│   │   │   └── types.ts      # Tipos generados de la BD
│   │   ├── utils.ts          # Funciones utilitarias
│   │   └── constants.ts      # Constantes (WhatsApp number, etc.)
│   │
│   └── hooks/                # Custom hooks de React
│       ├── useProducts.ts
│       └── useCategories.ts
│
├── supabase/
│   └── migrations/           # Migraciones SQL de la BD
│
├── .env.local                # Variables de entorno (keys de Supabase)
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Fases de Desarrollo

### FASE 1 — Setup del Proyecto (1-2 días)

**Objetivo:** Tener el proyecto corriendo localmente con todas las herramientas conectadas.

- [ ] Crear repositorio en GitHub
- [ ] Inicializar proyecto Next.js 14 con TypeScript y Tailwind
- [ ] Crear proyecto en Supabase y obtener API keys
- [ ] Configurar variables de entorno (`.env.local`)
- [ ] Crear el cliente de Supabase (`lib/supabase/client.ts` y `server.ts`)
- [ ] Conectar repo con Vercel para deploy automático
- [ ] Verificar que el deploy funcione (página en blanco = éxito)

**Comandos clave:**
```bash
npx create-next-app@latest web-keyli-sublimaciones --typescript --tailwind --eslint --app --src-dir
npm install @supabase/supabase-js @supabase/ssr
```

---

### FASE 2 — Base de Datos y Storage (1-2 días)

**Objetivo:** Tener la base de datos lista con datos de prueba.

- [ ] Crear las tablas en Supabase (categorías, productos, producto_imagenes, info_negocio)
- [ ] Configurar Row Level Security (RLS) policies
  - Lectura pública para productos y categorías activos
  - Escritura solo para usuarios autenticados (admin)
- [ ] Crear bucket de Storage para imágenes de productos
- [ ] Configurar políticas del bucket (lectura pública, escritura autenticada)
- [ ] Insertar datos de prueba (3-5 categorías, 10-15 productos)
- [ ] Generar tipos de TypeScript desde Supabase (`supabase gen types`)

**Comando para generar tipos:**
```bash
npx supabase gen types typescript --project-id TU_PROJECT_ID > src/lib/supabase/types.ts
```

---

### FASE 3 — Panel de Administración (3-5 días)

**Objetivo:** Poder gestionar productos y categorías desde una interfaz web protegida.

- [ ] Configurar autenticación con Supabase Auth (email/password para el admin)
- [ ] Crear layout del admin con sidebar de navegación
- [ ] Middleware de protección de rutas `/admin/*`
- [ ] CRUD de Categorías:
  - Listar categorías
  - Crear nueva categoría
  - Editar categoría existente
  - Activar/desactivar categoría
- [ ] CRUD de Productos:
  - Listar productos con filtro por categoría
  - Crear producto con upload de imágenes
  - Editar producto y sus imágenes
  - Marcar producto como destacado
  - Activar/desactivar producto
- [ ] Componente de upload de imágenes a Supabase Storage
- [ ] Gestión de info del negocio (WhatsApp, dirección, redes)

---

### FASE 4 — Frontend Público (3-5 días)

**Objetivo:** Las 3 páginas del sitio visibles y funcionales.

- [ ] **Layout principal:**
  - Navbar responsiva con logo y menú hamburguesa en móvil
  - Footer con redes sociales e info de contacto
  - Botón flotante de WhatsApp
- [ ] **Página de Inicio:**
  - Hero section con imagen/texto llamativo
  - Sección de categorías destacadas
  - Productos destacados (los marcados como `destacado = true`)
  - Call-to-action hacia el catálogo
- [ ] **Página de Catálogo:**
  - Grid de productos con imagen, nombre y precio
  - Filtros por categoría
  - Página de detalle de producto (`/catalogo/[slug]`)
  - Botón "Pedir por WhatsApp" que abre WA con mensaje pre-armado
- [ ] **Página de Contacto:**
  - Formulario de contacto (nombre, email, mensaje)
  - Info del negocio (teléfono, redes, ubicación)
  - Mapa embebido (opcional, Google Maps)

**Mensaje pre-armado de WhatsApp:**
```
Hola! Me interesa el producto: {nombre_producto}. ¿Podrías darme más información?
```

---

### FASE 5 — SEO y Optimización (1-2 días)

**Objetivo:** Que Google indexe bien el sitio y cargue rápido.

- [ ] Configurar metadata de Next.js por página (title, description, og:image)
- [ ] Implementar `generateStaticParams` para las páginas de productos
- [ ] Agregar `sitemap.xml` dinámico
- [ ] Agregar `robots.txt`
- [ ] Optimizar imágenes con `next/image`
- [ ] Configurar ISR (Incremental Static Regeneration) para revalidar datos del catálogo
- [ ] Verificar Core Web Vitals con Lighthouse

---

### FASE 6 — Testing y Deploy Final (1-2 días)

**Objetivo:** Sitio listo para producción.

- [ ] Probar responsividad en móvil, tablet y desktop
- [ ] Probar flujo completo: ver producto → clic WhatsApp → mensaje correcto
- [ ] Probar panel admin: crear/editar/eliminar productos
- [ ] Verificar que las imágenes cargan correctamente desde Storage
- [ ] Conectar dominio personalizado en Vercel
- [ ] Configurar DNS del dominio
- [ ] Deploy final y verificación en producción

---

## Tiempo Estimado Total

| Fase | Duración estimada |
|------|-------------------|
| Fase 1 — Setup | 1-2 días |
| Fase 2 — Base de datos | 1-2 días |
| Fase 3 — Panel admin | 3-5 días |
| Fase 4 — Frontend público | 3-5 días |
| Fase 5 — SEO y optimización | 1-2 días |
| Fase 6 — Testing y deploy | 1-2 días |
| **Total** | **~10-18 días** |

> Los tiempos asumen dedicación parcial (no tiempo completo). Si le dedicas tiempo completo, podrías terminar en ~7-10 días.

---

## Costos

| Concepto | Costo |
|----------|-------|
| Dominio (.com) | ~$10-15 USD/año |
| Hosting (Vercel free) | $0 |
| Base de datos (Supabase free) | $0 |
| SSL (incluido en Vercel) | $0 |
| **Total mensual** | **$0 USD** |
| **Total anual** | **~$10-15 USD** |
