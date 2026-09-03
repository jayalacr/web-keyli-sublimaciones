// ponytail: número placeholder — usado solo si no hay contacto configurado en el admin
export const DEFAULT_PHONE = "5218110000000";

export function waLink(phone: string, message = "Hola, quiero cotizar un artículo personalizado") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
