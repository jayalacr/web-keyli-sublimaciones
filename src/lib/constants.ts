// ponytail: número placeholder — usado solo si no hay contacto configurado en el admin
export const DEFAULT_PHONE = "5218110000000";

export function waLink(phone: string, message = "Hola, quiero cotizar un artículo personalizado") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function tiktokProfileUrl(tiktokUrls: string[]) {
  const handle = tiktokUrls[0]?.match(/tiktok\.com\/(@[^/]+)/)?.[1];
  return handle ? `https://www.tiktok.com/${handle}` : tiktokUrls[0];
}

const MXN = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

// Devuelve null si el producto no tiene precio capturado (0), para no mostrar "Desde $0".
export function precioDesde(centavos: number) {
  return centavos > 0 ? `Desde ${MXN.format(centavos / 100)}` : null;
}
