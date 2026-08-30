import { SEASONS } from "./seasons";
import { ADMIN_PRODUCTS } from "./adminProducts";

export type AdminSeason = {
  id: string;
  name: string;
  slug: string;
  order: number;
  active: boolean;
  description: string;
  coverSrc: string | null;
  coverAlt: string;
  productIds: string[];
};

// ponytail: visibilidad/orden/descripción hardcodeados — se reemplazan por Supabase cuando exista la BD.
// La lista de temporadas y su imagen de portada se reutiliza de src/lib/seasons.ts (misma fuente que el sitio público).
export const ADMIN_SEASONS_LIST: AdminSeason[] = SEASONS.map((s, i) => ({
  id: s.slug,
  name: s.title,
  slug: s.slug,
  order: (i + 1) * 10,
  active: s.slug !== "regreso-a-clases",
  description: `${s.tagline}.`,
  coverSrc: s.slug === "primavera" ? null : s.src,
  coverAlt: s.alt,
  productIds: ADMIN_PRODUCTS.filter((p) => p.seasons.includes(s.title)).map((p) => p.id),
}));
