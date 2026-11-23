import { DEFAULT_PHONE } from "@/lib/constants";
import { getContacto } from "@/lib/db";
import { ProcesoContent } from "./ProcesoContent";

export const metadata = {
  title: "Proceso — Keyli Studio",
  description: "Cómo cotizar, pagar y recibir tu pedido personalizado: pasos, métodos de pago, cancelaciones y preguntas frecuentes.",
};

export default async function ProcesoPage() {
  const contacto = await getContacto();
  return <ProcesoContent whatsapp={contacto?.whatsapp ?? DEFAULT_PHONE} />;
}
