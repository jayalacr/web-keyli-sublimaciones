import { supabaseAdmin } from "@/lib/supabase/admin";
import { CategoriesTable } from "@/components/admin/CategoriesTable";

export default async function AdminCategoriasPage() {
  const db = supabaseAdmin();
  const [{ data: categorias, error }, { data: productos, error: prodErr }] = await Promise.all([
    db.from("categorias").select("id,nombre,slug,orden").order("orden"),
    db.from("productos").select("categoria_id"),
  ]);
  if (error) throw error;
  if (prodErr) throw prodErr;

  const productCounts: Record<string, number> = {};
  for (const p of productos) {
    if (p.categoria_id) productCounts[p.categoria_id] = (productCounts[p.categoria_id] ?? 0) + 1;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-baseline gap-3 mb-stack-md">
        <h1 className="font-admin-title text-on-surface">Categorías</h1>
        <span className="text-sm font-medium text-outline">({categorias.length})</span>
      </div>

      <CategoriesTable initialCategories={categorias} productCounts={productCounts} />
    </div>
  );
}
