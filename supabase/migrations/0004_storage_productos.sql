-- Bucket para imágenes de productos. Subida sólo vía service role (server actions del admin,
-- ya protegido con Basic Auth), por eso no se agregan políticas de escritura pública.
insert into storage.buckets (id, name, public)
values ('productos', 'productos', true)
on conflict (id) do nothing;

create policy "productos: lectura publica" on storage.objects
  for select using (bucket_id = 'productos');
