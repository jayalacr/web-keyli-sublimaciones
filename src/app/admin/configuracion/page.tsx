import { getTextosInicio, type TextosInicio } from "@/lib/db";
import { ConfiguracionTabs } from "@/components/admin/ConfiguracionTabs";

const FALLBACK: TextosInicio = {
  hero_titulo: "Lo personalizado se siente distinto",
  hero_subtitulo: "Creamos piezas únicas a través de la sublimación. Cada artículo cuenta una historia pensada exclusivamente para ti.",
  hero_cta: "Ver artículos",
  historia_titulo: "Todo empezó con Keyli",
  historia_texto: "Keyli no es solo un nombre, es la inspiración detrás de nuestra dedicación.",
  historia_imagen_url: "",
  historia_imagen_alt: "",
  insignias_confianza: ["Envíos a todo México", "Entrega en 3 a 5 días", "Diseño incluido sin costo", "Más de 500 pedidos entregados"],
};

export default async function AdminConfiguracionPage() {
  const textos = (await getTextosInicio()) ?? FALLBACK;
  return <ConfiguracionTabs initialSettings={textos} />;
}
