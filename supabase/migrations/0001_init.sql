-- Categorías
create table categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  slug text not null unique,
  orden int not null default 0,
  creado_en timestamptz not null default now()
);

-- Temporadas
create table temporadas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  slug text not null unique,
  eslogan text,
  descripcion text,
  portada_url text,
  portada_alt text,
  activa boolean not null default true,
  orden int not null default 0,
  creado_en timestamptz not null default now()
);

-- Productos
create table productos (
  id uuid primary key default gen_random_uuid(),
  categoria_id uuid references categorias(id),
  nombre text not null,
  slug text not null unique,
  descripcion text,
  material text,
  tecnica text,
  precio_desde_centavos int not null default 0,
  dias_produccion int not null default 3,
  capacidades text[] not null default '{}',
  colores jsonb not null default '[]',
  imagen_url text,
  imagen_alt text,
  galeria jsonb not null default '[]',
  activo boolean not null default true,
  destacado boolean not null default false,
  orden int not null default 0,
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

-- Relación producto <-> temporada
create table productos_temporadas (
  producto_id uuid references productos(id) on delete cascade,
  temporada_id uuid references temporadas(id) on delete cascade,
  primary key (producto_id, temporada_id)
);

-- Configuración del sitio (clave-valor)
create table configuracion_sitio (
  clave text primary key,
  valor jsonb not null,
  actualizado_en timestamptz not null default now()
);

-- RLS: lectura pública de lo activo, escritura sólo vía service role (server-side, detrás del Basic Auth del admin)
alter table categorias enable row level security;
alter table temporadas enable row level security;
alter table productos enable row level security;
alter table productos_temporadas enable row level security;
alter table configuracion_sitio enable row level security;

create policy "categorias: lectura publica" on categorias for select using (true);
create policy "temporadas: lectura publica de activas" on temporadas for select using (activa = true);
create policy "productos: lectura publica de activos" on productos for select using (activo = true);
create policy "productos_temporadas: lectura publica" on productos_temporadas for select using (true);
create policy "configuracion_sitio: lectura publica" on configuracion_sitio for select using (true);
