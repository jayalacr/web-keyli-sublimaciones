// ponytail: número placeholder — reemplazar por el real de Keyli Sublimaciones
export const PHONE = "5218110000000";

export function waLink(message = "Hola, quiero cotizar un artículo personalizado") {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
