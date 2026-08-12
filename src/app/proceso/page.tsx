import type { Metadata } from "next";
import ProcesoClient from "./ProcesoClient";

export const metadata: Metadata = {
  title: "Cómo comprar",
  description:
    "Conoce el proceso de compra, políticas de cancelación y preguntas frecuentes de Keyli Sublimaciones.",
};

export default function ProcesoPage() {
  return <ProcesoClient />;
}
