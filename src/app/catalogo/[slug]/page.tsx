import type { Metadata } from "next";
import { products } from "@/lib/data";
import { slugify } from "@/lib/utils";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: slugify(p.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => slugify(p.name) === slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.blurb,
    openGraph: { title: product.name, description: product.blurb },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  return <ProductDetailClient params={{ slug }} />;
}
