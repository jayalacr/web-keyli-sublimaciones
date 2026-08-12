import type { MetadataRoute } from "next";
import { products } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { slugify } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/catalogo", "/proceso", "/contacto"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/catalogo/${slugify(p.name)}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
