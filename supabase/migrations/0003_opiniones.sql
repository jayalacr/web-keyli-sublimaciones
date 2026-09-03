-- Opiniones de clientes: las envía cualquiera desde el sitio público (server action con service role),
-- pero sólo se muestran en el Inicio una vez que el admin las aprueba.
create table opiniones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  detalle text,
  texto text not null,
  aprobada boolean not null default false,
  creado_en timestamptz not null default now()
);

alter table opiniones enable row level security;

create policy "opiniones: lectura publica de aprobadas" on opiniones for select using (aprobada = true);
