export type ProductImage = { src: string; alt: string };

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  priceFrom: number;
  seasons: string[];
  active: boolean;
  featured: boolean;
  order: number;
  description: string;
  material: string;
  technique: string;
  capacities: string[];
  colors: { hex: string; label: string }[];
  productionDays: number;
  imageSrc: string | null;
  imageAlt: string;
  gallery: ProductImage[];
};

// ponytail: catálogo admin hardcodeado — se reemplaza por consultas a Supabase cuando exista la BD
export const ADMIN_PRODUCTS: AdminProduct[] = [
  {
    id: "taza-ceramica-mandala",
    name: "Taza de Cerámica 11oz Mandala",
    slug: "taza-ceramica-11oz-mandala",
    category: "Tazas",
    priceFrom: 4500,
    seasons: ["Día de las Madres", "Navidad", "San Valentín"],
    active: true,
    featured: true,
    order: 10,
    description:
      "Taza de cerámica de 11oz con patrón de mandala sublimado a alta resolución. Recubrimiento premium que resiste lavavajillas.",
    material: "Cerámica",
    technique: "Sublimación de alta resolución",
    capacities: ["11 oz", "15 oz"],
    colors: [
      { hex: "#ffffff", label: "Blanco" },
      { hex: "#1b1b1e", label: "Interior negro" },
    ],
    productionDays: 3,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBF-6gVSWgoEPYKKwbA08vjsmARDhN0rBK6ch4owwxHVTFLeZbAYWznat7x5Tc9OEziRryDvxVwmcVLaWRxJLOyFMtlSstoBdXCwQYbV705fjtl1MSSbpu4XdN_ekXm_ebPuszVjUl_wUvPscHMZbOzgHIbrbyS5QJaYtLO5mykdALgBD2PWLDnoTfNqQa4dEYShFo8hSca4Sr2H1evGVKg7ZFPbVdoLFe_nNdopiqGPTdOJcR7r7oD",
    imageAlt: "Taza de cerámica blanca con patrón de mandala colorido, fotografía de producto en estudio.",
    gallery: [],
  },
  {
    id: "playera-algodon-premium-blanca",
    name: "Playera Algodón Premium Blanca",
    slug: "playera-algodon-premium-blanca",
    category: "Playeras",
    priceFrom: 8900,
    seasons: ["Primavera"],
    active: true,
    featured: false,
    order: 20,
    description: "Playera de algodón peinado 100%, corte unisex, lista para sublimación en área frontal completa.",
    material: "Algodón peinado 100%",
    technique: "Sublimación textil",
    capacities: ["CH", "M", "G", "XG"],
    colors: [{ hex: "#ffffff", label: "Blanco" }],
    productionDays: 4,
    imageSrc: null,
    imageAlt: "Playera de algodón blanca doblada, sin foto cargada todavía.",
    gallery: [],
  },
  {
    id: "tote-bag-negra-art",
    name: "Tote Bag Negra 'Art'",
    slug: "tote-bag-negra-art",
    category: "Papelería",
    priceFrom: 3200,
    seasons: [],
    active: false,
    featured: false,
    order: 30,
    description: "Bolsa tote de lona negra con tipografía blanca minimalista, ideal para uso diario.",
    material: "Lona de algodón",
    technique: "Sublimación textil",
    capacities: ["Único"],
    colors: [{ hex: "#1b1b1e", label: "Negro" }],
    productionDays: 3,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHbTm1YTHQbiIY_BGHSaZTEXMUlSwPD2HEOSP0S_sn6Zep4S1nwSjjvkB5r9turFWC5_QRZyMT88TfcCF8FJjXalBgrltyGsqi34Jn2WcsCocWNEEKs5KxtVXvqy-Wk2bzoabk80Y_RdKrQp6ajPcWjKHMdUbIcCe5XMHFUQiqqpjhJzUMiyMS-ScakFQVqBOLcboKoQ56IARyO0UXhSqG7b_S15ZNa_ARt2RcNzvmACX_zAwzxmM5",
    imageAlt: "Tote bag negra con tipografía blanca minimalista, foto plana sobre fondo gris.",
    gallery: [],
  },
  {
    id: "termo-acero-nochebuena",
    name: "Termo Acero Nochebuena",
    slug: "termo-acero-nochebuena",
    category: "Termos",
    priceFrom: 6200,
    seasons: ["Navidad"],
    active: true,
    featured: false,
    order: 15,
    description:
      "Termo de acero inoxidable de doble pared. Ideal para mantener bebidas frías o calientes por más de 12 horas. Recubrimiento especial para sublimación de alta resolución, garantizando colores vibrantes y duraderos.",
    material: "Acero Inoxidable 304",
    technique: "Sublimación 360°",
    capacities: ["12 oz", "20 oz", "30 oz"],
    colors: [
      { hex: "#ffffff", label: "Blanco (Sublimable)" },
      { hex: "#cbd5e1", label: "Plata/Acero" },
      { hex: "#fbcfe8", label: "Rosa pastel" },
    ],
    productionDays: 2,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4L5cl9MqNKMGWQ533ZKIp4F13s3LCQQmYVKB64pWy5rbZ8v77rQz3mTfDoInV1ZRdGFiX5YkltGaQGoIRC-1w8ukQicHLnXtd4Vgz8fUrt45Y8kE8FdfnxqXaQlWC8qhnk61ckpnvzCsyMbpp7EpLcxH0H9VfnuqiOLji9RGuhCeVMD8TAgDznuOgMTQP2oWrLamWWSuPxlnEWvkpx0LlaAkD9tSumc_kSLlBGE7enWHD60qaOC6A",
    imageAlt: "Termo de acero inoxidable blanco de pie sobre fondo gris claro, foto de producto minimalista.",
    gallery: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2FI4LXC3PcB0_d36NcSyD2XD69jMBBOnyLzgI-0dZx8JnfEQkzze2I-qp-GF4b3uPW8dIBwX7OOgOyCzZdRroNDnsABGRe9E42PVY-uNoJs73U90tDXP_HZ-B9REwC9wtpHtx2pPbmWAPKXWkmLgA0cPbzzCumQKy5Ar_gMaRoezITIWQG-opbdlTKx8JmawpIEhSaFYQQlw5l42ElAUSZZnUbaYHuuoy_dMlsvsdto_reab-LeLZ",
        alt: "Termo sublimado con diseño abstracto sostenido en un entorno de oficina luminoso.",
      },
    ],
  },
];

export const ADMIN_CATEGORIES = ["Termos", "Playeras", "Sudaderas", "Tazas", "Cuadros", "Papelería"];
export const ADMIN_SEASONS = ["San Valentín", "Primavera", "Día de las Madres", "Regreso a Clases", "Día de Muertos", "Navidad"];

export function getAdminProduct(id: string) {
  return ADMIN_PRODUCTS.find((p) => p.id === id);
}

export function blankAdminProduct(): AdminProduct {
  return {
    id: "",
    name: "",
    slug: "",
    category: ADMIN_CATEGORIES[0],
    priceFrom: 0,
    seasons: [],
    active: true,
    featured: false,
    order: 10,
    description: "",
    material: "",
    technique: "",
    capacities: [],
    colors: [],
    productionDays: 3,
    imageSrc: null,
    imageAlt: "",
    gallery: [],
  };
}
