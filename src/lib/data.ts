export type Product = {
  slug: string;
  category: string;
  title: string;
  description: string;
  aspect: string;
  offset: string;
  image: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
  sizes: string;
  colors: string;
  technique: string;
};

export const CATEGORIES = ["Todos", "Termos", "Playeras", "Sudaderas", "Tazas", "Cuadros", "Papelería"];

// ponytail: catálogo hardcodeado — mover a Supabase cuando se defina la estructura de BD
export const PRODUCTS: Product[] = [
  {
    slug: "taza-ceramica-clasica",
    category: "Tazas",
    title: "Taza Cerámica Clásica",
    description:
      "Nuestra pieza más solicitada. Cerámica de alta resistencia con un recubrimiento premium que garantiza colores vivos y duraderos. Ideal para regalos corporativos o detalles personales.",
    aspect: "aspect-[4/5]",
    offset: "mt-12",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9iwLkbv-rlpRrme1HpE3dIHeoF362lO4Daklu3Vko8e7-u1XiZ7loQHAEwf972tQprlfhVJWD6Gu6TfIgxNKJwMTE-YqqRNPjUUQLQaLmhV4K9pBvG2wFkRORcHsyj7hi4lX2uXMljZGM_nJj-z2aXazvPG86evNrfG96RJC7iJuP3RRtfU5Xr_gtsc1bxsj8pvG0lISKtzdR61yFc8aPbrS6NbHuQHvR71a615Ma82j9tPGX79zo",
      alt: "Taza de cerámica personalizada sobre fondo lila, luz suave y difusa.",
    },
    gallery: [
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuARQE2TIBvq3P-pW7Rz8TZSssiRo-nR29dQJCUbIqd0Sa1ThkSx-HEWBACg3WNDwn-bsbX3L5QVay2v5V-Qd8heS-f5Gl6ROxmf665aINY8apE0TXSDPXiS0MVTUYy8u9tf_S916ja0I_wA39IZzjBpeREDsgiQsoKRQgfUUFHcfBrefSuFZUZaO20Mr5Jj4YyXRU9EQ8NnnyDwoI62K8SFPeTSoWRjWxBRp51_QzpSrVrh6OzsP8E7", alt: "Detalle del asa y borde de la taza" },
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQfpe3yboPxNG9RjwmUNRd-MyMVkStBD8d-HuZCWLtEte22heAhc_wTDy2Jh-ulpQ3NdxgSUM0nY6uMHdr8iHBSUc73XnFWmGggcPcqm7FyPt0WFfCWGX5da59mGVAHSxqe6b96xf0218CCCAL8z_dFfhXkdcxcEndz91mnjmwtif_VGoe_uDRlUipuB85kVoWR8vgcd0rTw0xyhKYIL-iGxF03TwBamNByZOVUloW7KD35LUoiHpk", alt: "Ángulo alterno mostrando el diseño envolvente" },
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKmw2ZBHKs9hQR_GfVz_XwmcMC4on86glOK60SapKlqJusVDzrlVwx5ay6qCYMNbf9EiNPW3Ci47OjlwbmTJkgT4c9lF0RWY61qUZsZ6BQf_JiT6HmsKsLkfQiUwSWT_fixcxA8oidwXPw1QIO0bzIwbLGq0TWlp0pBmxcvaqQSEXdEKAIKtoSG5W_BihL_lRDQd0n5KZCDrRBg_2Qb1AJJezqy7wpDyUrSX9AgNo3JZRxBdRdXCyG", alt: "Foto de estilo de vida de la taza sobre un escritorio" },
    ],
    sizes: "11 oz, 15 oz",
    colors: "Blanco, Interior Color, Mágica",
    technique: "Sublimación de Alta Resolución",
  },
  {
    slug: "termo-acero-inoxidable-20oz",
    category: "Termos",
    title: "Termo Acero Inoxidable 20oz",
    description:
      "Termo de doble pared con acabado metálico premium, ideal para mantener bebidas frías o calientes por horas. Impresión de alta resolución resistente al uso diario.",
    aspect: "aspect-[3/4]",
    offset: "",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY-lYxwrX7lFqF0wCFnt9tLEWXVABW3skZ_FKQD-dy844-2M704I58IqTvioX4n3fZ5o-tZFnzt3nqU6Zz6fXVtoOxOzh9Wqzj9xFMEGM4gY8gWU-Hzsq2zpQOqZqIja3Aun6PDJd_MFPjm9cSgFv670GFo_qdNivJ27RbQRdBPQ_IOCMdAxQC50BFckxlRHTzwhGT49UyWiTkC1gBRCQMWOW26d_QwR0HSV8alUtFKr8Bu7xaPqkF",
      alt: "Termo de acero inoxidable sobre pedestal minimalista.",
    },
    gallery: [],
    sizes: "20 oz",
    colors: "Plata, Negro Mate, Blanco",
    technique: "Sublimación de Alta Resolución",
  },
  {
    slug: "playera-premium-soft",
    category: "Playeras",
    title: "Playera Premium Soft",
    description:
      "Playera de algodón premium con estampado sublimado que no se agrieta ni se siente pesado. Corte cómodo para uso diario.",
    aspect: "aspect-[4/5]",
    offset: "mt-24",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoKfDWXuVO4ZFHX5nBxKS-iSSwZJg3QdjqG879vYDnhTt6eRFROPptKvDWtpj_oA2ogh4zeeL7zKNbpLvlPYnXN8EFRfdOalhCnmxwZDEBSfpTKLAj9dwZ-LDZ9M1IclOken0AiXI63oq-NWkW38bikr_iBk9rSIip1HVBJ6S40SLWCb311yinDWwhpHnVtipqkaPcF7Ru4coSH5ao5SIRnGgIopustzXKX-fjXzcyEpixqHrOw1Js",
      alt: "Playera de algodón doblada con estampado sublimado sobre fondo lila.",
    },
    gallery: [],
    sizes: "CH, M, G, XG, XXG",
    colors: "Blanco, Gris Jaspe, Arena",
    technique: "Sublimación Textil",
  },
  {
    slug: "libreta-pasta-dura",
    category: "Papelería",
    title: "Libreta Pasta Dura",
    description:
      "Libreta de pasta dura con portada personalizada de alta definición. Perfecta como regalo corporativo o de detalle.",
    aspect: "aspect-square",
    offset: "mt-4",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCkmvS6hJpGQbqIL6ybKFWhgH-Qr9D1nGhtIRdTNLCHdVzFe_VvqAw-KwCxK93ECcwBkH2npiyG2JhfWmf6icuc3ku5vw7OS2vdYrRq6P1G9G-HAxv-xGMuF_e_RKI9cKxFzdAKwucUxwEmXUCrciKtvzTKicJPYuQG1DIh-A6nz4IC_w7p1jsWfQ7MaoAf5SPDqkyohT7ojfgxnecciE1oP0_3hDwsNwN1YMpH2YBGWXC5E_lz46W",
      alt: "Portada de libreta sublimada junto a una pluma minimalista.",
    },
    gallery: [],
    sizes: "A5",
    colors: "Personalizable",
    technique: "Sublimación de Alta Resolución",
  },
  {
    slug: "cuadro-aluminio-fotografico",
    category: "Cuadros",
    title: "Cuadro Aluminio Fotográfico",
    description:
      "Impresión fotográfica sobre placa de aluminio con acabado brillante. Una pieza duradera y con gran definición de color para decorar cualquier espacio.",
    aspect: "aspect-[4/3]",
    offset: "-mt-8",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW1d-a6N7PFxolLmzDj7PlOTFBcGHE1oZ19eDIlIcOj-CqmX3eUEfFju9UeB8WN8kMN2yYEulWzL6gKqEclmG1ehK0HRFbslWuJLWU44l2ajekiNlnZV2_ReRujfLXHdENFIjRgY8y9I1eV4rBK1rbCKkKWu8UE0k6YDJldr_zSOdTyk205srnGFEo7WcRcrzTV3cuUf8Aar9JAu0z6fdbaKZYtSyaXPNtGuUvui0LnUNXlp4NNu9C",
      alt: "Cuadro de aluminio fotográfico recargado en una pared de galería.",
    },
    gallery: [],
    sizes: "20x30 cm, 30x45 cm",
    colors: "Acabado Brillante, Mate",
    technique: "Sublimación sobre Aluminio",
  },
  {
    slug: "sudadera-heavyweight",
    category: "Sudaderas",
    title: "Sudadera Heavyweight",
    description:
      "Sudadera de peso pesado con estampado sublimado de gran formato. Tela gruesa y cómoda, ideal para la temporada de frío.",
    aspect: "aspect-[3/4]",
    offset: "mt-16",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuASTsx0QT7fjeySF36JGw4w7MBv2-GVklwfc8R_bX1TzWyZ3dlB4ywooW9kofQHiFpc5PCj9ihecpVo7na65fJjM0jqvFhYijN7aEy0tMMPtpZCqYVekB7OHDv9RS3v8n3vAKUjbqG-fBQ6UwhYi0W96ne59MyIv11LhS08WBWoetn4yGW03KJnCydhtn6EFe3l-o2NsG4ex4ckavhIzjZakXTqfGhKVzi8p7EaHvbsY6QhvfpUel-x",
      alt: "Sudadera heavyweight sobre gancho de madera contra pared clara.",
    },
    gallery: [],
    sizes: "CH, M, G, XG, XXG",
    colors: "Gris, Negro, Vino",
    technique: "Sublimación Textil",
  },
];
