import type { AdminProduct } from "@/components/admin/ProductForm";

export function blankAdminProduct(defaultCategory: string): AdminProduct {
  return {
    id: "",
    name: "",
    slug: "",
    category: defaultCategory,
    priceFrom: 0,
    seasons: [],
    active: true,
    featured: false,
    order: 10,
    description: "",
    material: "",
    technique: "",
    capacities: [],
    colors: [],
    productionDays: 3,
    imageSrc: null,
    imageAlt: "",
    gallery: [],
  };
}
