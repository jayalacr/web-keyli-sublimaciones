# Product Marketing Context — Keyli Studio

**Document version:** v1
**Last updated:** 2026-11-22

> Borrador generado a partir del repo (rama `rebranding`, sitio aún sin publicar). Todo lo marcado **FALTA CONFIRMAR** no está respaldado por el código ni por los textos y debe validarlo la dueña antes de usarse en copy, anuncios o SEO.
>
> Fuentes: `docs/marca.md`, `PENDIENTES.md`, `src/app/(sitio)/page.tsx`, `nosotros/page.tsx`, `proceso/ProcesoContent.tsx`, `articulos/page.tsx`, `temporadas/`, `src/lib/db.ts`, `src/lib/constants.ts`, `supabase/migrations/`.

## Decisiones del rebranding (confirmadas con el desarrollador, 2026-11-22)

> Estas decisiones mandan sobre cualquier hipótesis de abajo.

- **Nombre:** Keyli Studio — "Diseño & Personalización" en todos lados. "Sublimación" solo como keyword SEO / nombre de técnica.
- **Servicios:** sublimación, **papelería creativa** (stickers, etiquetas, tarjetas, invitaciones, separadores, cajas/empaques, planners), **vinil** y **DTF**.
- **Un solo público en el sitio:** sin caminos separados "regalo / negocio". El sitio muestra **solo productos**, organizados por producto y ocasión; que sirven para regalo, eventos o negocios se dice en textos y descripciones. La técnica es texto libre en cada producto (campo existente), sin filtro.
- **Voz:** siempre en plural ("nosotros"), también en Nosotros.
- **Insignias:** "Envíos a todo México" · "Desde 2021" · "Sublimación, vinil, DTF y papelería" · "Apruebas tu diseño antes de producir". Se quitan "Diseño incluido sin costo", "Entrega en 3 a 5 días" y "Más de 500 pedidos".
- **Redes:** Instagram cambia a **@keylistudio.mx**; Facebook y TikTok sin cambio por ahora. Dominio: sin definir.
- **Hero:** título "Lo *personalizado* se siente distinto" se queda; subtítulo se afina después.
- **Analítica:** no por ahora.
- **Publicación:** sólo con el rebranding completo.

## Product Overview

**One-liner:** Keyli Studio diseña y personaliza artículos (termos, tazas, playeras, libretas, papelería, vinil y prendas DTF) a partir de tu idea, para regalar, para eventos o para tu negocio, desde Monterrey, y lo cotizas por WhatsApp.

**What it does:** Tú mandas tu idea, foto o referencia por WhatsApp. La dueña te prepara una propuesta (mockup) para que la apruebes, la produce bajo pedido y te la entrega en Monterrey o te la envía a cualquier parte de México. El sitio funciona como catálogo e inspiración (artículos por categoría y colecciones por temporada); la venta se cierra por WhatsApp.

**Product category (cómo buscan):** regalos personalizados / artículos personalizados en Monterrey; "termos personalizados", "tazas personalizadas", "playeras personalizadas", "regalos para el Día de las Madres / San Valentín / Navidad". Categoría anterior: "sublimación" (técnica). Con el rebranding la marca deja de presentarse como una técnica y pasa a ser **un estudio de diseño y personalización**. Ojo: la gente sí busca "sublimación Monterrey"; conviene mantener ese término en SEO y en descripciones aunque deje de ser el nombre.

**Product type:** servicio de personalización bajo pedido, B2C con venta asistida (catálogo web + cierre por WhatsApp). Sin carrito ni pagos en línea (decisión explícita, FAQ de `/proceso`).

**Business model y precios:**
- Precio por cotización: "el precio cambia según el diseño, técnica, cantidad y tiempo de entrega" (FAQ).
- Cada producto puede mostrar un precio "Desde $X" (campo `precio_desde_centavos`); si está en 0 no se muestra. Precios reales: **FALTA CONFIRMAR** (no hay catálogo real cargado en el repo).
- Pago: 50% para apartar, 50% al entregar. Transferencia (BBVA, Banamex, Santander), depósito en OXXO/bancos, o efectivo contra entrega solo en Monterrey y área metropolitana.
- Envío: se cobra aparte. Repartidor local en Monterrey y área metropolitana; paquetería a toda la república.
- Pedido mínimo: no para piezas únicas; sí en algunos productos (llaveros, vinil).
- Diseño: ajustes menores sin costo; "diseño desde cero se cotiza aparte" (FAQ).

## Target Audience

**Cliente principal (B2C):** persona en Monterrey y área metropolitana (y en segundo lugar, el resto de México por paquetería) que quiere **dar un regalo con significado** o marcar una fecha especial, y prefiere algo hecho para ella antes que algo genérico de tienda. Compra desde el celular y quiere resolverlo en una conversación de WhatsApp.
- Perfil demográfico (edad, género): **FALTA CONFIRMAR**. Hipótesis por el tono, las temporadas (San Valentín, Madres) y los casos de uso (mascotas, aniversarios): mayormente mujeres de 20 a 45 años que compran regalos. No usar como dato hasta validarlo con los pedidos reales.

**Decision-makers:** quien regala es quien decide y paga. En pedidos para empresas o eventos decide quien organiza (FALTA CONFIRMAR quién suele ser).

**Primary use case:** convertir un recuerdo, una mascota, una persona o una fecha en un objeto tangible para regalar o usar a diario.

**Jobs to be done:**
- "Quiero regalar algo que se note que pensé en esa persona, no algo comprado al aventón."
- "Quiero tener algo para la fecha (San Valentín, Día de las Madres, Navidad...) y que llegue a tiempo."
- "Tengo una idea o una foto, pero no sé diseñarla; ayúdenme a que se vea bien."

**Use cases respaldados por el repo:**
- Regalos personales con fotos, mascotas o recuerdos (historia de Nosotros: "sus recuerdos, sus mascotas y sus momentos especiales").
- Aniversarios ("rompecabezas para aniversarios").
- Fechas del año: San Valentín, Primavera, Día de las Madres, Regreso a Clases, Día de Muertos, Navidad (tabla `temporadas`).
- Empresas ("libretas para empresas") y pedidos por volumen (FAQ de pedido mínimo, "cantidad" en la cotización).
- Eventos, marcas y celebraciones ("Creamos colecciones exclusivas para eventos, marcas y celebraciones únicas", `/temporadas`). Qué tipo de eventos (bodas, XV años, bautizos, cumpleaños): **FALTA CONFIRMAR**.

## Personas

B2C, sin comité de compra. Se distinguen dos segmentos por la forma de comprar:

| Segmento | Le importa | Su reto | Lo que le prometemos |
|---|---|---|---|
| Quien regala (pieza única) | Que el regalo emocione y que llegue a tiempo | No sabe diseñar; teme que el resultado se vea "chafa" o distinto a lo que imaginó | Mockup para aprobar antes de producir, trato directo con la dueña, ayuda con el diseño |
| Empresa / evento (volumen) | Precio por cantidad, tiempos claros, que todas las piezas salgan iguales | Coordinar fechas y presupuesto | Cotización por cantidad, tiempo confirmado antes de apartar. Qué tanto volumen se puede atender: **FALTA CONFIRMAR** (es un taller de una sola persona) |

## Problems & Pain Points

**Core problem:** encontrar un regalo que se sienta personal, que se vea bien hecho y que llegue para la fecha, sin tener que saber diseñar.

**Why alternatives fall short:**
- Tiendas de regalos genéricos: no son personales; "comprado al aventón".
- Marketplaces (Amazon, Mercado Libre, Temu): se puede personalizar, pero sin acompañamiento en el diseño, con tiempos de envío inciertos y sin saber quién lo hace. (Comparación de criterio, no investigada; sin datos de precios de competencia).
- Otros sublimadores locales: compiten con la misma técnica y suelen vender "la impresión", no el diseño. La diferencia de Keyli Studio tiene que estar en el diseño, el trato y la presentación. Competidores concretos de Monterrey: **FALTA CONFIRMAR** (no investigados).

**What it costs them:** un regalo que no emociona, o que no llega a tiempo para la fecha.

**Emotional tension:** miedo a que el resultado no se parezca a lo que imaginó, a pagar por adelantado a alguien que no conoce y a que no llegue a tiempo.

## Competitive Landscape

**Direct:** sublimadores y talleres de personalización de Monterrey que venden por Facebook/Instagram. Fallan cuando solo imprimen lo que les mandas sin ayudarte con el diseño. Nombres: **FALTA CONFIRMAR**.
**Secondary:** marketplaces con productos personalizables (Amazon, Mercado Libre, Etsy, Temu). Fallan en el acompañamiento, en los tiempos y en la confianza.
**Indirect:** regalo genérico de tienda departamental o de regalos, o hacerlo uno mismo (imprimir una foto, enmarcarla). Fallan en que no se sienten únicos o no se ven profesionales.

## Differentiation

**Key differentiators (respaldados por el sitio):**
- **Diseño incluido en el proceso:** apruebas un mockup antes de producir y se ajusta tu diseño sin costo si es un cambio menor.
- **Trato directo con la dueña:** "Soy solo yo, pero le pongo atención a cada detalle y trato personal a cada cliente."
- **Historia propia y una mascota real:** Keyli, la husky, es el origen del negocio. Ninguna tienda genérica tiene eso.
- **Colecciones por temporada** con piezas pensadas para cada fecha, así que no tienes que empezar de cero.
- **Proceso y reglas claras publicadas:** 3 pasos, métodos de pago, política de cancelación y FAQ. Eso reduce la desconfianza de pagar por WhatsApp.

**How we do it differently:** se empieza por tu idea y por el diseño, no por el catálogo de técnicas.
**Why that's better:** el resultado se parece a lo que imaginaste y lo apruebas antes de pagar la producción completa.
**Why customers choose us:** **FALTA CONFIRMAR** con clientes reales (las opiniones del sitio todavía no tienen contenido verificado en el repo).

## Objections

| Objeción | Respuesta (según lo publicado en `/proceso`) |
|---|---|
| "¿Por qué no puedo comprar directo en la página?" | El precio depende del diseño, la cantidad y el tiempo de entrega; por WhatsApp te cotizamos exacto. La página es tu catálogo. |
| "¿Y si pago y no me llega o no me gusta?" | Apruebas el mockup antes de apartar. Apartas con 50% y liquidas el resto al entregar. Hay política de cancelación por etapa. |
| "No sé diseñar / mi idea no es muy buena" | Te ayudamos a mejorarla; los ajustes menores no tienen costo. |
| "¿Llega a tiempo para la fecha?" | Te confirmamos el tiempo antes de apartar. En temporada alta pide con anticipación. |
| "¿Cuánto cuesta?" | Precio "desde" en cada producto + cotización exacta por WhatsApp. (Hoy no hay precios reales cargados: FALTA CONFIRMAR). |
| "¿Hacen envíos fuera de Monterrey?" | Sí, a toda la república por paquetería; el envío se cobra aparte. |

**Anti-persona:** quien busca el precio más bajo por volumen industrial con entrega inmediata, o quien quiere comprar en línea con tarjeta sin conversar. Límite de volumen que se puede atender: **FALTA CONFIRMAR**.

## Switching Dynamics

**Push:** los regalos genéricos no emocionan; con otros proveedores el diseño queda "como salga" o no hay seguimiento.
**Pull:** diseño acompañado, trato personal, una marca cálida con historia y fotos del resultado.
**Habit:** comprar en el marketplace de siempre o con el proveedor que ya conocen.
**Anxiety:** pagar por adelantado por WhatsApp a un negocio desconocido; que no quede como esperaban; que no llegue a tiempo.

## Customer Language

**How they describe the problem:** **FALTA CONFIRMAR**. Sacar frases textuales de los chats de WhatsApp y comentarios de Instagram/TikTok (no hay ninguna en el repo).
**How they describe us:** **FALTA CONFIRMAR** (la tabla `opiniones` existe, pero no hay opiniones reales en el repo).

**Words to use:** personalizado, diseño, tu idea, regalo, pieza única, hecho para ti, cotizar por WhatsApp, Monterrey, envíos a todo México, pide con tiempo.
**Words to avoid / con cuidado:**
- "Sublimaciones" como nombre de marca (rebranding). Sí se puede usar como técnica o palabra de SEO ("termos sublimados").
- "Hecho a mano": aparece en Nosotros, pero el proceso usa prensa térmica y máquinas. Conviene "hecho por mí, pieza por pieza" o "hecho con cuidado en casa" para no prometer artesanía manual.
- "Ediciones limitadas" (`/temporadas`): solo si de verdad hay piezas limitadas. FALTA CONFIRMAR.
- Tono de tienda formal: "servirle", "solicitud", "nuestros productos destacados" (`docs/marca.md`).

**Glossary:**
| Término | Significado |
|---|---|
| Mockup | Vista previa del diseño que el cliente aprueba antes de producir |
| Apartar | Pagar el 50% para iniciar la producción |
| Temporada / colección | Selección de piezas para una fecha del año (tiene un color propio) |
| Lo más pedido | Productos marcados como destacados en el admin |
| Keyli | La husky de la dueña; mascota e inspiración de la marca. No habla en primera persona |

## Brand Voice

Personalidad (de `docs/marca.md`): **cálida, juguetona, cuidadosa**. Con el rebranding se agrega **creativa** (estudio de diseño, no solo una técnica). Es "el taller de alguien que conoces", no una tienda de lujo fría ni un marketplace genérico.

| Atributo | Significa | No significa | Línea real |
|---|---|---|---|
| Cálida | Tuteo, cercanía, español de México natural | Cursi, empalagosa, emojis en la web | "Cuéntanos qué tienes en mente" |
| Juguetona | Detalles de marca (destellos, Keyli, la estrella) | Chistes forzados o que Keyli "hable" | "Todo empezó con *Keyli*" |
| Cuidadosa | Atención al detalle y datos concretos (días, precios "desde", zona) | Calidez sin información | "Te confirmamos el tiempo estimado antes de apartar para que llegue cuando lo necesitas." |
| Creativa (rebranding) | Hablar de diseño, ideas e historias | Tecnicismos de impresión | "Lo *personalizado* se siente distinto" |

**Tone by context:**
- Soporte / FAQ: directo y tranquilizador, con datos ("50% al apartar · 50% al entregar").
- Lanzamiento de temporada: emotivo + urgencia honesta ("Pide con tiempo").
- Errores / estados vacíos: amable, invita a escribir ("Estamos preparando las piezas de esta colección. Escríbenos...").
- Ventas (WhatsApp): mensaje precargado con el nombre del producto; máximo un emoji.
- Redes: más juguetón, aquí Keyli puede aparecer como protagonista visual.

**Decisión de voz pendiente:** Nosotros está en primera persona del singular ("Soy solo yo", "Escríbeme") y el resto del sitio en plural ("Escríbenos", "Diseñamos"). "Studio" invita al plural; la historia personal es un diferenciador. **FALTA CONFIRMAR** cuál usar en todo el sitio.

**Terms we own:** Keyli, "Lo personalizado se siente distinto", "Diseño & Personalización", el destello ✦.
**Never use:** dorado/lila/rosa como color de texto; tipografía script que imite el logo; animaciones en bucle (`docs/marca.md`).

## Proof Points

**Metrics:** ninguna verificada.
- "Más de 500 pedidos entregados": **FALTA CONFIRMAR**. No publicar hasta tener la cifra real.
- "Entrega en 3 a 5 días": **FALTA CONFIRMAR**, y choca con la FAQ ("Depende del producto, la cantidad y la temporada").
- "Diseño incluido sin costo": **FALTA CONFIRMAR**, y choca con la FAQ ("Diseño desde cero se cotiza aparte").
- "Envíos a todo México": respaldado por la FAQ.
**Customers:** empresas que compraron libretas: nombres **FALTA CONFIRMAR** (y si se pueden mencionar).
**Testimonials:** ninguno en el repo. Existe el flujo de opiniones con aprobación desde el admin; no inventar.
**Value themes:**
| Tema | Prueba |
|---|---|
| Diseño acompañado | Mockup para aprobar + ajustes menores sin costo (`/proceso`) |
| Confianza al pagar | 50/50, métodos de pago, política de cancelación publicada (`/proceso`) |
| Historia auténtica | Historia de Keyli y del taller casero (`/nosotros`) |
| Cobertura | Entrega local en Monterrey + paquetería nacional (`/proceso`) |
| Resultado real | Fotos de productos y videos de TikTok: **FALTA** cargar fotos reales (hoy son placeholders de Stitch) |

## Goals

**Business goal:** generar pedidos personalizados, sobre todo en temporadas altas, con la nueva marca Keyli Studio.
**Objetivo del sitio:** que quien llega (desde redes, Google o una recomendación) vea el resultado, confíe y **inicie una conversación de cotización por WhatsApp** con el producto o la temporada ya identificados.
**Conversion action principal:** clic en un botón de WhatsApp (hero, modal de producto "Vi *X* en su página...", temporada "quiero cotizar algo de la colección X", banda de contacto, FAQ).
**Métrica de éxito:**
- Principal: conversaciones de WhatsApp iniciadas desde el sitio (clics en `wa.me`, segmentados por origen: producto, temporada, hero, contacto).
- Secundaria: cotizaciones que se convierten en pedido (apartado del 50%), registradas a mano por la dueña. Así se mide la calidad y no solo el volumen.
- Apoyo: opiniones enviadas desde el formulario.
**Current metrics:** ninguna. El sitio no está publicado y **no hay analítica instalada** (no se encontró GA, Vercel Analytics ni píxel de Meta en `src/`). Metas numéricas: **FALTA CONFIRMAR**.

## Paid Ads (optional)

Sin información. Presupuesto y canales de pago: **FALTA CONFIRMAR**.

## Learnings
*Decisiones y aprendizajes probados. Lo más reciente primero.*
| Fecha | Aprendizaje | Evidencia | Aplica a | Estado |
|---|---|---|---|---|
| 2026-11-22 | Un solo público en el sitio (sin caminos regalo/negocio); se muestran sólo productos | Decisión del rebranding | Layout, copy | active |
| 2026-11-22 | Voz en plural en todo el sitio | Decisión del rebranding | Todo el copy | active |
| 2026-11-22 | Sin carrito ni pago en línea: toda venta se cierra por WhatsApp | Decisión documentada en la FAQ de `/proceso` | Copy, CRO, ads | active |
| 2026-11-22 | La marca se presenta como estudio de diseño y personalización, no como "sublimaciones" | Rebranding a Keyli Studio, lema "Diseño & Personalización" | Todo el copy | active |

## Preguntas abiertas para la dueña (prioridad de mayor a menor)

> Resueltas el 2026-11-22: diseño/tiempos/500 pedidos (se quitan de las insignias), "yo vs nosotros" (plural), redes (Instagram → @keylistudio.mx), experiencia (desde 2021). No bloquean el diseño; deben resolverse antes de publicar: precios "desde", tiempos reales, capacidad semanal, fotos reales, opiniones, favicon, dominio.

1. ¿Cuántos pedidos has entregado de verdad (aunque sea aproximado) y cuánto tarda normalmente un pedido? (Define si se quedan "Más de 500 pedidos" y "3 a 5 días".)
2. ¿El diseño está incluido sin costo o solo los ajustes menores? (El inicio y la FAQ se contradicen.)
3. ¿Qué te piden más y de qué te llegan más pedidos: regalos personales, empresas o eventos (¿cuáles: bodas, XV años, cumpleaños?)? ¿Quién te compra normalmente?
4. ¿Rangos de precio "desde" de tus 5 productos más pedidos y precio aproximado del envío?
5. ¿Cuántas piezas puedes producir por semana y cuál es el pedido más grande que aceptarías (sobre todo en temporada alta)?
6. ¿La voz del sitio es "yo" (tu historia personal) o "nosotros" (Studio)?
7. ¿Tienes opiniones o capturas de clientes que podamos publicar con permiso, y fotos reales de tus trabajos?
8. ¿Cuál es la meta de los primeros 3 meses (conversaciones o pedidos al mes), hay presupuesto para anuncios y cuál red te trae hoy más clientes? ¿Las cuentas cambian de @keylisublimaciones a un usuario nuevo?

## Changelog
*Lo más reciente primero.*
- v2 (2026-11-22) — Decisiones del rebranding confirmadas (servicios nuevos, un solo público, voz plural, insignias, redes).
- v1 (2026-11-22) — Contexto inicial, redactado desde el repo durante el rebranding a Keyli Studio; datos no verificados marcados como FALTA CONFIRMAR.
