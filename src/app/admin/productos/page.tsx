import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ProductsTable } from "@/components/admin/ProductsTable";
import type { AdminProduct } from "@/components/admin/ProductForm";

export default async function AdminProductosPage() {
  const db = supabaseAdmin();
  const [{ data: productos, error }, { data: categorias, error: catErr }, { data: temporadas, error: seasErr }] = await Promise.all([
    db
      .from("productos")
      .select(
        "id,nombre,slug,precio_desde_centavos,activo,orden,imagen_url,imagen_alt,categoria:categorias(nombre),productos_temporadas(temporadas(nombre))"
      )
      .order("orden"),
    db.from("categorias").select("nombre").order("orden"),
    db.from("temporadas").select("nombre").order("orden"),
  ]);
  if (error) throw error;
  if (catErr) throw catErr;
  if (seasErr) throw seasErr;

  type Row = typeof productos extends (infer T)[] ? T : never;
  const products: AdminProduct[] = (productos as Row[]).map((p) => {
    const categoria = p.categoria as unknown as { nombre: string } | null;
    const relaciones = p.productos_temporadas as unknown as { temporadas: { nombre: string } | null }[];
    return {
      id: p.id,
      name: p.nombre,
      slug: p.slug,
      category: categoria?.nombre ?? "",
      priceFrom: p.precio_desde_centavos,
      seasons: relaciones.map((r) => r.temporadas?.nombre).filter((n): n is string => !!n),
      active: p.activo,
      featured: false,
      order: p.orden,
      description: "",
      material: "",
      technique: "",
      capacities: [],
      colors: [],
      productionDays: 0,
      imageSrc: p.imagen_url,
      imageAlt: p.imagen_alt ?? "",
      gallery: [],
    };
  });

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-stack-md">
        <div className="flex items-baseline gap-3">
          <h1 className="font-admin-title text-on-surface">Productos</h1>
          <span className="text-sm font-medium text-outline">({products.length})</span>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-admin-section-header hover:bg-on-primary-fixed-variant transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Nuevo producto
        </Link>
      </div>

      <ProductsTable initialProducts={products} categories={categorias.map((c) => c.nombre)} seasons={temporadas.map((t) => t.nombre)} />
    </div>
  );
}
