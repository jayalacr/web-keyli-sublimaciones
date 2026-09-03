import { DEFAULT_PHONE } from "@/lib/constants";
import { getContacto } from "@/lib/db";
import { ProcesoContent } from "./ProcesoContent";

export default async function ProcesoPage() {
  const contacto = await getContacto();
  return <ProcesoContent whatsapp={contacto?.whatsapp ?? DEFAULT_PHONE} />;
}
