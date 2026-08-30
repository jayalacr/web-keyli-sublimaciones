export type SiteSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  historyTitle: string;
  historyText: string;
  historyImageSrc: string;
  historyImageAlt: string;
  trustBadges: [string, string, string, string];
};

// ponytail: textos del sitio hardcodeados — se reemplazan por Supabase cuando exista la BD
export const SITE_SETTINGS: SiteSettings = {
  heroTitle: "Lo personalizado se siente distinto",
  heroSubtitle: "Creamos piezas únicas a través de la sublimación. Cada artículo cuenta una historia pensada exclusivamente para ti.",
  heroCta: "Ver artículos",
  historyTitle: "Todo empezó con Keyli",
  historyText:
    "Keyli no es solo un nombre, es la inspiración detrás de nuestra dedicación. Al igual que la lealtad y el carácter único de un husky, cada pieza que creamos está hecha con un propósito y atención inquebrantable.",
  historyImageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoQpbkM9y29c7H5i7QhXN0ox7NTur9mEEez8oZ_2dLy1TsMyctEz4c3CuF-5vs60LzGZCxrR0EmdVsKYzsm-xzAqCggKygAy6L7mNOdSZdGADGhRJXIfgqBsWe0_QP2kwtSzgORvkvH7vsV5RVk-5eCbAyiDCLTS0uwYdRM9BG3VZ7Gxgt2alF9RmxeKLvyEjUVOGopwDhtF-6aWkP958I3u_QcskaXNS7k6XlxGSl-U4c0LTvmpjX",
  historyImageAlt: "Retrato de un husky en un estudio minimalista, luz cálida y natural.",
  trustBadges: ["Envíos a todo México", "Entrega en 3 a 5 días", "Diseño incluido sin costo", "Más de 500 pedidos entregados"],
};
