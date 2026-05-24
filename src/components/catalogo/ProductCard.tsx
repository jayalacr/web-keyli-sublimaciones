import Link from "next/link";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { slugify } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const slug = slugify(product.name);

  return (
    <article
      className="product-card flex flex-col overflow-hidden bg-white"
      style={{
        borderRadius: 24,
        border: "1px solid var(--color-line)",
        boxShadow: "var(--shadow-sm)",
        transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
      }}
    >
      <Link href={`/catalogo/${slug}`} className="block text-inherit no-underline">
        {/* Image area */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "1/1", background: "var(--color-lilac-50)" }}
        >
          <ProductIcon kind={product.icon} gradient={product.gradient} />

          {product.badge && (
            <span
              className="absolute top-3 left-3 z-10 text-[11px] font-bold px-3 py-1 rounded-full"
              style={{
                background: product.badge === "Bajo pedido" ? "var(--color-ink)" : "var(--color-yellow-200)",
                color: product.badge === "Bajo pedido" ? "white" : "var(--color-lilac-900)",
              }}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col gap-1 px-4 pt-[14px] pb-2">
          <h4
            className="text-[14.5px] font-bold leading-[1.25] overflow-hidden"
            style={{
              color: "var(--color-ink)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: 36,
            }}
          >
            {product.name}
          </h4>
          <p className="text-[13px]" style={{ color: "var(--color-ink-soft)" }}>
            Desde <strong style={{ color: "var(--color-ink)", fontWeight: 700 }}>${product.priceFrom}</strong> MXN
          </p>
        </div>
      </Link>

      {/* Yellow CTA button */}
      <div className="px-4 pb-4 pt-1 mt-auto">
        <Link
          href={`/catalogo/${slug}`}
          className="flex items-center justify-center w-full text-[13.5px] font-bold py-[10px] px-[14px] rounded-full transition-colors hover:brightness-95"
          style={{
            background: "var(--color-yellow-200)",
            color: "var(--color-lilac-900)",
          }}
        >
          Más información
        </Link>
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px -20px rgba(92,58,140,.30), 0 8px 20px -8px rgba(92,58,140,.10) !important;
          border-color: var(--color-lilac-300) !important;
        }
      `}</style>
    </article>
  );
}
