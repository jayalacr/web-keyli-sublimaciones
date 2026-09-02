import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ProductForm, type AdminProduct } from "@/components/admin/ProductForm";
import { blankAdminProduct } from "@/lib/blankAdminProduct";

export default async function AdminProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = supabaseAdmin();

  const [{ data: categorias, error: catErr }, { data: temporadas, error: seasErr }] = await Promise.all([
    db.from("categorias").select("nombre").order("orden"),
    db.from("temporadas").select("nombre").order("orden"),
  ]);
  if (catErr) throw catErr;
  if (seasErr) throw seasErr;
  const categories = categorias.map((c) => c.nombre);
  const seasons = temporadas.map((t) => t.nombre);

  if (id === "nuevo") {
    return <ProductForm product={blankAdminProduct(categories[0] ?? "")} isNew categories={categories} seasons={seasons} />;
  }

  const { data: producto, error } = await db
    .from("productos")
    .select(
      "id,nombre,slug,descripcion,material,tecnica,precio_desde_centavos,dias_produccion,capacidades,colores,imagen_url,imagen_alt,galeria,activo,destacado,orden,categoria:categorias(nombre)"
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!producto) notFound();

  const { data: relaciones, error: relErr } = await db
    .from("productos_temporadas")
    .select("temporadas(nombre)")
    .eq("producto_id", id);
  if (relErr) throw relErr;

  const categoria = producto.categoria as unknown as { nombre: string } | null;
  const product: AdminProduct = {
    id: producto.id,
    name: producto.nombre,
    slug: producto.slug,
    category: categoria?.nombre ?? categories[0] ?? "",
    priceFrom: producto.precio_desde_centavos,
    seasons: (relaciones as unknown as { temporadas: { nombre: string } | null }[]).map((r) => r.temporadas?.nombre).filter((n): n is string => !!n),
    active: producto.activo,
    featured: producto.destacado,
    order: producto.orden,
    description: producto.descripcion ?? "",
    material: producto.material ?? "",
    technique: producto.tecnica ?? "",
    capacities: producto.capacidades,
    colors: (producto.colores as { hex: string; etiqueta: string }[]).map((c) => ({ hex: c.hex, label: c.etiqueta })),
    productionDays: producto.dias_produccion,
    imageSrc: producto.imagen_url,
    imageAlt: producto.imagen_alt ?? "",
    gallery: (producto.galeria as { url: string; alt: string }[]).map((g) => ({ src: g.url, alt: g.alt })),
  };

  return <ProductForm product={product} isNew={false} categories={categories} seasons={seasons} />;
}
