import { getContacto, getTextosInicio, type Contacto, type TextosInicio } from "@/lib/db";
import { DEFAULT_PHONE } from "@/lib/constants";
import { ConfiguracionTabs } from "@/components/admin/ConfiguracionTabs";

const FALLBACK_CONTACTO: Contacto = {
  whatsapp: DEFAULT_PHONE,
  instagram_url: "https://instagram.com/keylistudio.mx",
  instagram_widget_url: "",
  facebook_url: "https://facebook.com/keylisublimaciones",
  tiktok_urls: [],
  logo_url: "",
};

const FALLBACK: TextosInicio = {
  hero_titulo: "Lo personalizado se siente distinto",
  hero_subtitulo: "Diseñamos y personalizamos regalos, papelería y prendas para ti, tus eventos o tu negocio.",
  hero_cta: "Ver artículos",
  hero_imagen_url: "",
  hero_imagen_alt: "",
  historia_titulo: "Todo empezó con Keyli",
  historia_texto: "Keyli no es solo un nombre, es la inspiración detrás de nuestra dedicación.",
  historia_imagen_url: "",
  historia_imagen_alt: "",
  nosotros_imagen_url: "",
  nosotros_imagen_alt: "",
  insignias_confianza: ["Envíos a todo México", "Desde 2021", "Sublimación, vinil, DTF y papelería", "Apruebas tu diseño antes de producir"],
};

export default async function AdminConfiguracionPage() {
  const [textos, contacto] = await Promise.all([getTextosInicio(), getContacto()]);
  return <ConfiguracionTabs initialSettings={textos ?? FALLBACK} initialContacto={contacto ?? FALLBACK_CONTACTO} />;
}
