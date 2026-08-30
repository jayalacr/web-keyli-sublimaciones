import { ADMIN_PRODUCTS } from "./adminProducts";

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  order: number;
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ponytail: categorías hardcodeadas — se reemplazan por una tabla real cuando exista Supabase
export const ADMIN_CATEGORIES_LIST: AdminCategory[] = ["Tazas", "Termos", "Playeras", "Sudaderas", "Cuadros", "Papelería"].map(
  (name, i) => ({
    id: slugify(name),
    name,
    slug: slugify(name),
    order: (i + 1) * 10,
  })
);

export function productCountFor(categoryName: string) {
  return ADMIN_PRODUCTS.filter((p) => p.category === categoryName).length;
}
