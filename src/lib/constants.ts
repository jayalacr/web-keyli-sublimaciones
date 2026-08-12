export const PHONE = "525512345678";
export const WA_BASE = "https://wa.me";

export const waLink = (text: string) =>
  `${WA_BASE}/${PHONE}?text=${encodeURIComponent(text)}`;

// ponytail: sin dominio propio aún — ajustar cuando el sitio tenga hosting definitivo
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://keylisublimaciones.vercel.app";
