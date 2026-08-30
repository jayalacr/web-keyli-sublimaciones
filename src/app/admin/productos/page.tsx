import Link from "next/link";
import { ADMIN_PRODUCTS, ADMIN_CATEGORIES, ADMIN_SEASONS } from "@/lib/adminProducts";
import { ProductsTable } from "@/components/admin/ProductsTable";

export default function AdminProductosPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-stack-md">
        <div className="flex items-baseline gap-3">
          <h1 className="font-admin-title text-on-surface">Productos</h1>
          <span className="text-sm font-medium text-outline">({ADMIN_PRODUCTS.length})</span>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-admin-section-header hover:bg-on-primary-fixed-variant transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Nuevo producto
        </Link>
      </div>

      <ProductsTable initialProducts={ADMIN_PRODUCTS} categories={ADMIN_CATEGORIES} seasons={ADMIN_SEASONS} />
    </div>
  );
}
