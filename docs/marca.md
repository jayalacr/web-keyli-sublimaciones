# Hoja de marca — Keyli Sublimaciones

Derivada de `public/logoKeyli.jpeg` (colores muestreados del archivo, contrastes WCAG calculados).
Complementa a `docs/stitch-design-system.md`: no lo reemplaza, le agrega calidez.

## 1. Personalidad

**Cálida · Juguetona · Cuidadosa**

- **Sí es:** el taller de alguien que conoces y que hace tu regalo con cariño y detalle.
- **No es:** una tienda de lujo fría ni un marketplace genérico de productos impresos.

El logo (husky sacando la lengua y destellos) ya marca el tono: tierno, pero bien hecho.
El sitio puede seguir siendo limpio y "editorial" en la estructura y sumar la calidez con color y pequeños detalles.

## 2. Paleta

| Rol | Token | HEX | Origen | Uso |
|---|---|---|---|---|
| Primario | `primary` | `#6c538b` | ya existe (≈ morado de "eyli") | botones, links, estado activo |
| Primario fuerte | `primary-strong` | `#4a2d6b` | morado "eyli" (`#613e83`) oscurecido | bandas oscuras (contacto, footer), hover del primario |
| Acento cálido | `accent` | `#ffc61c` | destellos dorados | estrellas, destellos ✦, badge "Lo más pedido" |
| Acento suave | `accent-soft` | `#d4a9df` | anillo lila | bordes, ilustraciones, fondos de chips |
| Tinte lila | `surface-tint-soft` | `#f4ecf8` | lila aclarado | fondos de sección alternos (historia, opiniones) |
| Rosa | `accent-pink` | `#eb959e` | lengua de Keyli | sólo decorativo: corazones, San Valentín/Madres |
| Fondo | `surface` | `#fbf9fc` | ya existe | fondo general |
| Texto | `on-surface` | `#1b1b1e` | ya existe | títulos y texto |
| Texto secundario | `on-surface-variant` | `#4a454e` | ya existe | descripciones |

### Contrastes medidos (texto normal requiere ≥ 4.5)

| Combinación | Ratio | ¿Texto? |
|---|---|---|
| blanco sobre `primary` | 6.47 | ✅ |
| blanco sobre `primary-strong` | 11.18 | ✅ |
| `accent` dorado sobre `primary-strong` | 7.10 | ✅ (ideal para banda de contacto) |
| `primary-strong` sobre `accent` dorado | 7.10 | ✅ (badge dorado con texto morado) |
| `on-surface` sobre `accent` dorado | 10.92 | ✅ |
| `primary` sobre `surface-tint-soft` | 5.60 | ✅ |
| `on-surface` sobre `surface` | 16.41 | ✅ |
| `on-surface-variant` sobre `surface` | 8.90 | ✅ |
| dorado sobre blanco | 1.57 | ❌ sólo decorativo |
| lila `accent-soft` sobre blanco | 1.99 | ❌ sólo decorativo |
| rosa sobre blanco | 2.25 | ❌ sólo decorativo |

### Proporción de uso
**70 / 20 / 10**: 70% neutros (surface/blanco), 20% morados (primary, primary-strong, tinte lila) y 10% acentos (dorado y rosa).
Si el dorado aparece en más de 2–3 lugares por pantalla, ya es demasiado.

## 3. Motivo: el destello ✦

Los cuatro destellos del logo son el elemento gráfico de la marca.

- **Sí:** junto al título del hero (2–3 destellos), en el badge "Lo más pedido", como estrellas de las opiniones y en el mensaje de "¡Gracias!" tras enviar una opinión.
- **No:** como fondo repetido (patrón), dentro de botones o en el admin.
- **Máximo:** un grupo de destellos por sección visible.
- **Animación:** un brillo (escala + opacidad) **una sola vez** al aparecer, nunca en bucle, y desactivado con `prefers-reduced-motion`.
- Formato: SVG inline de 4 puntas en `accent`, con `aria-hidden="true"`.

## 4. Tono de voz

1. **Tuteo siempre**, español de México natural ("¿Qué tienes en mente?", no "¿En qué podemos servirle?").
2. **Cálido, no cursi:** máximo un emoji por mensaje y sólo en WhatsApp o redes, no en la web.
3. **Concreto:** días, precios "desde" y zona de entrega claros. La calidez no sustituye a la información.
4. **Keyli es la mascota, no la vocera:** se menciona en la historia, no habla en primera persona.

| Pieza | ❌ Evitar | ✅ Así |
|---|---|---|
| Botón | "Enviar solicitud" | "Cotizar por WhatsApp" |
| Título de sección | "Nuestros productos destacados" | "Lo que más nos piden" |
| Mensaje WhatsApp precargado | "Hola, quiero cotizar un artículo personalizado" | "¡Hola! Vi la *Taza mágica* en su página y me gustaría cotizarla 🙂" |

## 5. Fotografía de producto (alcanzable con celular)

1. **Fondo liso y claro** (cartulina blanca o lila muy pálido), siempre el mismo, para que el catálogo se vea uniforme.
2. **Luz de ventana lateral**, sin flash y sin sol directo. Una cartulina blanca del lado opuesto rellena la sombra.
3. **Encuadre 4:5 vertical**, producto centrado con aire alrededor. Una foto frontal y una de detalle o en uso (en la mano, sobre una mesa).

## 6. Acentos por temporada

Se usan sólo dentro de su temporada (franja, badge o subrayado del título), nunca en todo el sitio. Todos aceptan texto blanco encima.

| Temporada | HEX | Blanco encima |
|---|---|---|
| San Valentín | `#c2185b` | 5.87 ✅ |
| Primavera | `#3d7330` | 5.69 ✅ |
| Día de las Madres | `#b5476b` | 5.15 ✅ |
| Regreso a Clases | `#1f6fb2` | 5.28 ✅ |
| Día de Muertos | `#c4500f` | 4.67 ✅ |
| Navidad | `#a5262a` | 7.22 ✅ |

## 7. Lo que NO hacer

1. Dorado, lila o rosa como color de **texto** sobre fondo claro (no pasan contraste).
2. Más de un acento cálido compitiendo en la misma pantalla (dorado **o** rosa **o** color de temporada).
3. Agregar una fuente script para imitar el "Keyli" del logo: el logo ya cumple ese papel.
4. Deformar, recolorear o recortar el husky del logo.
5. Animaciones en bucle (destellos que parpadean sin parar o un botón de WhatsApp que late todo el tiempo).

## 8. Tokens para `globals.css`

**Ya aplicados** en `src/app/globals.css` (2026-11-14). Están dentro del `@theme { }`. `primary`, `surface`, `on-surface` y `on-surface-variant` ya están definidos y no cambian.

```css
  /* Marca — derivados del logo (docs/marca.md) */
  --color-primary-strong: #4a2d6b;
  --color-accent: #ffc61c;
  --color-accent-soft: #d4a9df;
  --color-accent-pink: #eb959e;
  --color-surface-tint-soft: #f4ecf8;

  /* Acento por temporada (slug de la tabla temporadas) */
  --color-season-san-valentin: #c2185b;
  --color-season-primavera: #3d7330;
  --color-season-dia-de-las-madres: #b5476b;
  --color-season-regreso-a-clases: #1f6fb2;
  --color-season-dia-de-muertos: #c4500f;
  --color-season-navidad: #a5262a;
```

> Slugs verificados contra la tabla `temporadas` (2026-11-14). Si se crea una temporada nueva, agregar su `--color-season-<slug>`; sin él, la página usa el primario.

## 9. Cómo se aplica en el código

- **Caja lila:** `conMarca("Lo más *pedido*")` en `src/components/Marca.tsx`. Las palabras entre `*asteriscos*` se resaltan; también funciona en los títulos editables de `/admin/configuracion`.
- **Destellos:** `<Destellos />` en el mismo archivo. Máximo un grupo por sección.
- **Color de temporada:** variable `--season` en `src/app/(sitio)/temporadas/[slug]/page.tsx`, usada como `bg-(--season)`.

## 10. Pendientes de marca

- [ ] **Logo en vectorial (SVG/AI/PDF) o PNG con fondo transparente.** El actual (`public/logoKeyli.jpeg`) tiene fondo blanco y se ve como un "sticker" sobre fondos lila.
- [ ] **"Keyli asomándose":** SVG de orejas y patas de la husky asomándose sobre el borde de la banda de contacto (Inicio), del estado vacío de temporadas y de una página 404 propia. Depende del logo vectorial.
- [ ] **Página 404 con Keyli** (hoy es la de Next). Depende del punto anterior.
- [ ] **Estrellas en opiniones:** necesita un campo de calificación en la tabla `opiniones` y en el formulario. No se muestran estrellas inventadas.
