import { createClient } from "@supabase/supabase-js";

const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const ADMIN_CATEGORIES = ["Termos", "Playeras", "Sudaderas", "Tazas", "Cuadros", "Papelería"];

const SEASONS = [
  { slug: "san-valentin", title: "San Valentín", tagline: "El arte de regalar con intención", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpoy5LDHvALLypeW1kfe7pnQk7jxax_qg6xXBaS--jjzSafOjG4mq0rf1sXz2FJ7JKC-FTxosxz5VCqgeKflr7DaU7lu_Niiy24p1GncrNzu7qNN5obBiePsOOhi0EY6jawWXUBNwud5sBDek-gvdFz9gNEtV3RSKZpCfKck38Va2FATvz7898qeCSFI4lIXTO_X3yiJLdbQmleaG0GaxGd4yKw4ZJiqqKsxij4O-nAGo2bmdNZBS9", alt: "Taza de cerámica con motivos románticos, tonos rosa suave y rojo profundo." },
  { slug: "primavera", title: "Primavera", tagline: "Colores que despiertan espacios", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5XxhEbkkC2ByA6UKdWbtFjD9aRI3w-BcM-ZjbwyI6S7gVoxauh8lMHyfIRZ9-iEUN4P43MVSOQ6k31Vr1uEGL7DfRkbAfGNPE4-KDQFc1suzycNf4D5xf58BqqF_ynrNrTssdF6qeM0Ld2uNPJnytprElY_2uD6ID3HvWVUJrvHuGmgj48xmAMJ4t-U8OqMXq3Pg9aMaqSTNzm4OqqoAHNWaYuuSh70ui3y2MuvrnJEJxMLRKTI7C", alt: "Textiles y termos sublimados con patrones florales, luz solar y paleta verde-amarilla." },
  { slug: "dia-de-las-madres", title: "Día de las Madres", tagline: "Detalles que celebran su historia", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtrPxWN0KrQay-3SSrjJbwCQWylqHji3aZR1XoRQ3NDDKfUWBI38CjqNQ_Wkj8-I5-3M-EmjOKTIamzJAz3lEulDzQz3nTv4meXgCf0lOsjwt4ZbVLpcGbSzmKRBKN1fFARzcvN6iM9wivH0bPiJs2GA5XSvgmG2CNuHo6bzZN73mdBnCey7W97Pw5MZp_J7RH01pq6EdzIDYTQAfilrWTRHRrhzb6C5Jl8Oq9_tVsl0bNyJY-cLdP", alt: "Papelería personalizada, libreta y marco sublimado en tonos pastel." },
  { slug: "regreso-a-clases", title: "Regreso a Clases", tagline: "Organización con estilo propio", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbkKHT_2UHtWaohP34wt0in6pFKJG44bpq7ok9Il1FuCIetaDRnytXVPZqdmzy8U2az3Nqafm3u8Xe0cPMojhUInQtkGLhestKbcTozrYCOAO2OAr0wjwehpGhNrTx7eotWaT77Khc2f5hd1Vvh86fyPx5XCJ5ao7xGiBLyu1z_m5O7pj83Cl7zsv5CiWGrv3w2HrMcleLwMqBwM9Q8M4NnrCrdOhbPmPnqXnkxLTt55_cWlZm0cB9", alt: "Mochilas, estuches y botellas sublimadas en colores gráficos de alto contraste." },
  { slug: "dia-de-muertos", title: "Día de Muertos", tagline: "Tradición en cada trazo", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwLNlU5N0p1pPQVb-O6yrTqAKtl3KroKstScRs_tKlMoL3ENSBXefdV2Izg4Ngu76aTf2aJcVWkuaN7B-m7YvKZmt9Vkg7u95I3HjrCoGYuRAnnZaw85bfjvJXSBUnhjTWpY5BsClZh3ImGWVcOJqYw41bvUUem6amOm5jGrqero0sdVMM_bSJ-uFmyF9uL7oY2_ET-YX0iBeacW7lDBKxvVQP9azzldAHv40RS9J6NZE8p_v0EfGC", alt: "Velas y platos de cerámica sublimados con motivos de catrina y cempasúchil." },
  { slug: "navidad", title: "Navidad", tagline: "La calidez de lo hecho a mano", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_SYEseN_zJQrHa4j9KGvUdU8zRhGep7dCwIhFb46_SUBTSfCrv3CtMV78wdn4Cm7Oq954kFB4oCklXbelp3nrfTtdftV3sa4pHsGkxZD4ZDRHL0bL9fG_6Ng67DshGwfnMmQ7SP20Jua0hxPd-FEX5p0dQDDHDNQ435rHQ-YwftHbu6WMDYuxhQVqthRg_yRVdYhu7HmYG1iXwIuHJIQ7F4jeRApjgJiBrbLCcI1tTiFskIQkpaLJ", alt: "Ambiente navideño con esferas, envoltorios y tazas personalizadas." },
];

const ADMIN_PRODUCTS = [
  {
    name: "Taza de Cerámica 11oz Mandala", slug: "taza-ceramica-11oz-mandala", category: "Tazas", priceFrom: 4500,
    seasons: ["Día de las Madres", "Navidad", "San Valentín"], active: true, featured: true, order: 10,
    description: "Taza de cerámica de 11oz con patrón de mandala sublimado a alta resolución. Recubrimiento premium que resiste lavavajillas.",
    material: "Cerámica", technique: "Sublimación de alta resolución", capacities: ["11 oz", "15 oz"],
    colors: [{ hex: "#ffffff", label: "Blanco" }, { hex: "#1b1b1e", label: "Interior negro" }], productionDays: 3,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF-6gVSWgoEPYKKwbA08vjsmARDhN0rBK6ch4owwxHVTFLeZbAYWznat7x5Tc9OEziRryDvxVwmcVLaWRxJLOyFMtlSstoBdXCwQYbV705fjtl1MSSbpu4XdN_ekXm_ebPuszVjUl_wUvPscHMZbOzgHIbrbyS5QJaYtLO5mykdALgBD2PWLDnoTfNqQa4dEYShFo8hSca4Sr2H1evGVKg7ZFPbVdoLFe_nNdopiqGPTdOJcR7r7oD",
    imageAlt: "Taza de cerámica blanca con patrón de mandala colorido, fotografía de producto en estudio.", gallery: [],
  },
  {
    name: "Playera Algodón Premium Blanca", slug: "playera-algodon-premium-blanca", category: "Playeras", priceFrom: 8900,
    seasons: ["Primavera"], active: true, featured: false, order: 20,
    description: "Playera de algodón peinado 100%, corte unisex, lista para sublimación en área frontal completa.",
    material: "Algodón peinado 100%", technique: "Sublimación textil", capacities: ["CH", "M", "G", "XG"],
    colors: [{ hex: "#ffffff", label: "Blanco" }], productionDays: 4,
    imageSrc: null, imageAlt: "Playera de algodón blanca doblada, sin foto cargada todavía.", gallery: [],
  },
  {
    name: "Tote Bag Negra 'Art'", slug: "tote-bag-negra-art", category: "Papelería", priceFrom: 3200,
    seasons: [], active: false, featured: false, order: 30,
    description: "Bolsa tote de lona negra con tipografía blanca minimalista, ideal para uso diario.",
    material: "Lona de algodón", technique: "Sublimación textil", capacities: ["Único"],
    colors: [{ hex: "#1b1b1e", label: "Negro" }], productionDays: 3,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHbTm1YTHQbiIY_BGHSaZTEXMUlSwPD2HEOSP0S_sn6Zep4S1nwSjjvkB5r9turFWC5_QRZyMT88TfcCF8FJjXalBgrltyGsqi34Jn2WcsCocWNEEKs5KxtVXvqy-Wk2bzoabk80Y_RdKrQp6ajPcWjKHMdUbIcCe5XMHFUQiqqpjhJzUMiyMS-ScakFQVqBOLcboKoQ56IARyO0UXhSqG7b_S15ZNa_ARt2RcNzvmACX_zAwzxmM5",
    imageAlt: "Tote bag negra con tipografía blanca minimalista, foto plana sobre fondo gris.", gallery: [],
  },
  {
    name: "Termo Acero Nochebuena", slug: "termo-acero-nochebuena", category: "Termos", priceFrom: 6200,
    seasons: ["Navidad"], active: true, featured: false, order: 15,
    description: "Termo de acero inoxidable de doble pared. Ideal para mantener bebidas frías o calientes por más de 12 horas. Recubrimiento especial para sublimación de alta resolución, garantizando colores vibrantes y duraderos.",
    material: "Acero Inoxidable 304", technique: "Sublimación 360°", capacities: ["12 oz", "20 oz", "30 oz"],
    colors: [{ hex: "#ffffff", label: "Blanco (Sublimable)" }, { hex: "#cbd5e1", label: "Plata/Acero" }, { hex: "#fbcfe8", label: "Rosa pastel" }], productionDays: 2,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4L5cl9MqNKMGWQ533ZKIp4F13s3LCQQmYVKB64pWy5rbZ8v77rQz3mTfDoInV1ZRdGFiX5YkltGaQGoIRC-1w8ukQicHLnXtd4Vgz8fUrt45Y8kE8FdfnxqXaQlWC8qhnk61ckpnvzCsyMbpp7EpLcxH0H9VfnuqiOLji9RGuhCeVMD8TAgDznuOgMTQP2oWrLamWWSuPxlnEWvkpx0LlaAkD9tSumc_kSLlBGE7enWHD60qaOC6A",
    imageAlt: "Termo de acero inoxidable blanco de pie sobre fondo gris claro, foto de producto minimalista.",
    gallery: [{ src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2FI4LXC3PcB0_d36NcSyD2XD69jMBBOnyLzgI-0dZx8JnfEQkzze2I-qp-GF4b3uPW8dIBwX7OOgOyCzZdRroNDnsABGRe9E42PVY-uNoJs73U90tDXP_HZ-B9REwC9wtpHtx2pPbmWAPKXWkmLgA0cPbzzCumQKy5Ar_gMaRoezITIWQG-opbdlTKx8JmawpIEhSaFYQQlw5l42ElAUSZZnUbaYHuuoy_dMlsvsdto_reab-LeLZ", alt: "Termo sublimado con diseño abstracto sostenido en un entorno de oficina luminoso." }],
  },
];

const SITE_SETTINGS_TEXTOS_INICIO = {
  hero_titulo: "Lo personalizado se siente distinto",
  hero_subtitulo: "Creamos piezas únicas a través de la sublimación. Cada artículo cuenta una historia pensada exclusivamente para ti.",
  hero_cta: "Ver artículos",
  historia_titulo: "Todo empezó con Keyli",
  historia_texto: "Keyli no es solo un nombre, es la inspiración detrás de nuestra dedicación. Al igual que la lealtad y el carácter único de un husky, cada pieza que creamos está hecha con un propósito y atención inquebrantable.",
  historia_imagen_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoQpbkM9y29c7H5i7QhXN0ox7NTur9mEEez8oZ_2dLy1TsMyctEz4c3CuF-5vs60LzGZCxrR0EmdVsKYzsm-xzAqCggKygAy6L7mNOdSZdGADGhRJXIfgqBsWe0_QP2kwtSzgORvkvH7vsV5RVk-5eCbAyiDCLTS0uwYdRM9BG3VZ7Gxgt2alF9RmxeKLvyEjUVOGopwDhtF-6aWkP958I3u_QcskaXNS7k6XlxGSl-U4c0LTvmpjX",
  historia_imagen_alt: "Retrato de un husky en un estudio minimalista, luz cálida y natural.",
  insignias_confianza: ["Envíos a todo México", "Entrega en 3 a 5 días", "Diseño incluido sin costo", "Más de 500 pedidos entregados"],
};

async function main() {
  console.log("Limpiando tablas...");
  await db.from("productos_temporadas").delete().neq("producto_id", "00000000-0000-0000-0000-000000000000");
  await db.from("productos").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await db.from("temporadas").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await db.from("categorias").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await db.from("configuracion_sitio").delete().neq("clave", "");

  console.log("Sembrando categorías...");
  const { data: categorias, error: catErr } = await db
    .from("categorias")
    .insert(ADMIN_CATEGORIES.map((nombre, i) => ({ nombre, slug: slugify(nombre), orden: (i + 1) * 10 })))
    .select();
  if (catErr) throw catErr;
  const categoriaIdPorNombre = Object.fromEntries(categorias.map((c) => [c.nombre, c.id]));

  console.log("Sembrando temporadas...");
  const { data: temporadas, error: seasErr } = await db
    .from("temporadas")
    .insert(
      SEASONS.map((s, i) => ({
        nombre: s.title,
        slug: s.slug,
        eslogan: s.tagline,
        descripcion: `${s.tagline}.`,
        portada_url: s.slug === "primavera" ? null : s.src,
        portada_alt: s.alt,
        activa: s.slug !== "regreso-a-clases",
        orden: (i + 1) * 10,
      }))
    )
    .select();
  if (seasErr) throw seasErr;
  const temporadaIdPorNombre = Object.fromEntries(temporadas.map((t) => [t.nombre, t.id]));

  console.log("Sembrando productos...");
  const { data: productos, error: prodErr } = await db
    .from("productos")
    .insert(
      ADMIN_PRODUCTS.map((p) => ({
        categoria_id: categoriaIdPorNombre[p.category],
        nombre: p.name,
        slug: p.slug,
        descripcion: p.description,
        material: p.material,
        tecnica: p.technique,
        precio_desde_centavos: p.priceFrom,
        dias_produccion: p.productionDays,
        capacidades: p.capacities,
        colores: p.colors.map((c) => ({ hex: c.hex, etiqueta: c.label })),
        imagen_url: p.imageSrc,
        imagen_alt: p.imageAlt,
        galeria: p.gallery.map((g) => ({ url: g.src, alt: g.alt })),
        activo: p.active,
        destacado: p.featured,
        orden: p.order,
      }))
    )
    .select();
  if (prodErr) throw prodErr;
  const productoIdPorSlug = Object.fromEntries(productos.map((p) => [p.slug, p.id]));

  console.log("Sembrando relación producto-temporada...");
  const relaciones = ADMIN_PRODUCTS.flatMap((p) =>
    p.seasons.map((seasonName) => ({
      producto_id: productoIdPorSlug[p.slug],
      temporada_id: temporadaIdPorNombre[seasonName],
    }))
  );
  if (relaciones.length) {
    const { error: relErr } = await db.from("productos_temporadas").insert(relaciones);
    if (relErr) throw relErr;
  }

  console.log("Sembrando configuración del sitio...");
  const { error: cfgErr } = await db
    .from("configuracion_sitio")
    .insert({ clave: "textos_inicio", valor: SITE_SETTINGS_TEXTOS_INICIO });
  if (cfgErr) throw cfgErr;

  console.log("Listo.");
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
