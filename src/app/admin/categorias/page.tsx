import { ADMIN_CATEGORIES_LIST, productCountFor } from "@/lib/adminCategories";
import { CategoriesTable } from "@/components/admin/CategoriesTable";

export default function AdminCategoriasPage() {
  const productCounts = Object.fromEntries(ADMIN_CATEGORIES_LIST.map((c) => [c.name, productCountFor(c.name)]));

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-baseline gap-3 mb-stack-md">
        <h1 className="font-admin-title text-on-surface">Categorías</h1>
        <span className="text-sm font-medium text-outline">({ADMIN_CATEGORIES_LIST.length})</span>
      </div>

      <CategoriesTable initialCategories={ADMIN_CATEGORIES_LIST} productCounts={productCounts} />
    </div>
  );
}
