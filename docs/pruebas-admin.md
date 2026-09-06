# Pruebas manuales — Panel de administración

Checklist para probar `/admin` antes de dar por buena una versión. No es suite automatizada; son pasos a mano en el navegador.

## 1. Autenticación

- [ ] Entrar a `/admin` sin credenciales → responde `401` y el navegador pide usuario/contraseña.
- [ ] Meter usuario o contraseña incorrectos → `401` de nuevo.
- [ ] Meter `ADMIN_USER` / `ADMIN_PASSWORD` correctos (`.env.local`) → entra al panel.
- [ ] Entrar a cualquier subruta directa (`/admin/productos`, `/admin/categorias`, etc.) sin sesión → también pide credenciales (el proxy cubre todo `/admin/:path*`).

## 2. Productos — listado

- [ ] `/admin/productos` carga sin error y muestra el conteo correcto de productos.
- [ ] La miniatura de cada fila coincide con `imagen_url` del producto.
- [ ] Activar/desactivar un producto desde la tabla se refleja de inmediato y persiste al recargar.
- [ ] "Nuevo producto" abre el formulario en blanco con la primera categoría preseleccionada.

## 3. Productos — alta y edición

- [ ] Guardar con nombre vacío o precio en `$0` → el botón "Guardar cambios" queda deshabilitado.
- [ ] Guardar un producto nuevo con datos válidos → redirige a `/admin/productos` y aparece en la lista.
- [ ] Editar un producto existente, cambiar categoría/temporadas/capacidades/colores → los cambios persisten al reabrir el formulario.
- [ ] Slug vacío al guardar → se autogenera a partir del nombre (`slugify`).
- [ ] Quitar todas las temporadas y guardar → el producto ya no aparece en `/temporadas/[slug]` de ninguna temporada.
- [ ] Eliminar un producto → pide confirmación, y tras confirmar desaparece de la lista y de cualquier temporada donde estuviera.
- [ ] "Descartar cambios" regresa al listado sin guardar nada.

## 4. Carga de fotos

- [ ] Subir un JPG/PNG desde el dropzone (click, no hay drag-and-drop real) → aparece como imagen "PRINCIPAL" si no había ninguna.
- [ ] Subir una segunda imagen con la principal ya puesta → se agrega a la galería, no la reemplaza.
- [ ] Subir varias imágenes a la vez (selección múltiple) → todas terminan en Supabase Storage y se listan en orden.
- [ ] Verificar en el dashboard de Supabase (bucket `productos`) que el archivo subido pesa considerablemente menos que el original (compresión a WebP ~1600px funcionando).
- [ ] Abrir la imagen subida directo por su URL pública → carga en el navegador (bucket público, política de lectura activa).
- [ ] Quitar la imagen principal con el botón "×" → el hueco queda vacío, no se cae el formulario, y **no** se sube nada nuevo hasta guardar.
- [ ] Quitar una imagen de la galería → desaparece de la grilla.
- [ ] Guardar el producto después de subir/quitar fotos → `imagen_url`/`galeria` en Supabase reflejan exactamente lo que se ve en pantalla.
- [ ] Probar con una foto tomada directo de iPhone (JPEG, ~3-4 MB) → sube y comprime sin error.
- [ ] Probar con un archivo `.heic` (foto de Mac/Photos sin convertir) → falla con el mensaje de error visible ("no se pudo procesar..."), comportamiento esperado y documentado.
- [ ] Probar con un archivo no-imagen renombrado a `.jpg` → falla controladamente, sin romper la página.
- [ ] Verificar que el producto se ve bien en `/articulos` y en su temporada con la imagen recién subida (`next/image` la sirve desde el hostname de Supabase configurado en `next.config.ts`).

## 5. Categorías

- [ ] Crear una categoría nueva → aparece en el selector de categoría del formulario de productos.
- [ ] Editar el nombre de una categoría existente → los productos que ya la tenían siguen mostrándola correctamente.
- [ ] Intentar borrar una categoría en uso por productos → falla o se comporta según la restricción de la base (revisar que no rompa productos existentes).

## 6. Temporadas

- [ ] Crear una temporada nueva con portada → aparece en `/temporadas` del sitio público.
- [ ] Marcar una temporada como inactiva → deja de listarse en `/temporadas` pero sigue existiendo en el admin.
- [ ] Asignar un producto a una temporada desde el formulario de producto → aparece en `/temporadas/[slug]` correspondiente.
- [ ] Quitar la vigencia/fecha de una temporada (si aplica) → se comporta según lo esperado en la página pública.

## 7. Opiniones de clientes

- [ ] Enviar una opinión desde el sitio público (`TestimonialForm`) → aparece en `/admin/opiniones` como pendiente, **no** visible aún en Inicio.
- [ ] Aprobar una opinión desde el admin → aparece en la sección de testimonios de Inicio.
- [ ] Rechazar/eliminar una opinión → no vuelve a aparecer ni en el admin ni en el sitio.

## 8. Configuración (contacto)

- [ ] Cambiar el número de WhatsApp/Instagram/Facebook desde `/admin/configuracion` → se refleja en el Header/Footer del sitio público sin redeploy.
- [ ] Dejar un campo vacío y guardar → el enlace correspondiente desaparece o no rompe el layout (validar comportamiento real).

## 9. Regresión rápida tras cualquier cambio

- [ ] `npx tsc --noEmit` sin errores.
- [ ] `/`, `/articulos`, `/temporadas`, `/temporadas/[slug]`, `/nosotros`, `/proceso` cargan sin error 500.
- [ ] Consola del navegador sin errores nuevos en las páginas tocadas.
