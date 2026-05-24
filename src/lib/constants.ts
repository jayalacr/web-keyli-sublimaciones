export const PHONE = "525512345678";
export const WA_BASE = "https://wa.me";

export const waLink = (text: string) =>
  `${WA_BASE}/${PHONE}?text=${encodeURIComponent(text)}`;
