import type { Metadata } from "next";
import CatalogoClient from "./CatalogoClient";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora playeras, tazas, termos, llaveros y más productos personalizados con DTF, sublimación y vinil.",
};

export default function CatalogoPage() {
  return <CatalogoClient />;
}
