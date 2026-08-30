import { notFound } from "next/navigation";
import { ADMIN_PRODUCTS, getAdminProduct, blankAdminProduct } from "@/lib/adminProducts";
import { ProductForm } from "@/components/admin/ProductForm";

export function generateStaticParams() {
  return [...ADMIN_PRODUCTS.map((p) => ({ id: p.id })), { id: "nuevo" }];
}

export default async function AdminProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === "nuevo") {
    return <ProductForm product={blankAdminProduct()} isNew />;
  }

  const product = getAdminProduct(id);
  if (!product) notFound();

  return <ProductForm product={product} isNew={false} />;
}
