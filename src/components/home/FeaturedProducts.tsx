import Link from "next/link";
import { Sparkle, ArrowRight } from "@/components/ui/Icons";
import { ProductCard } from "@/components/catalogo/ProductCard";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  items: Product[];
}

export function FeaturedProducts({ items }: FeaturedProductsProps) {
  return (
    <section style={{ background: "var(--color-lilac-50)", paddingBlock: "clamp(56px,8vw,112px)" }}>
      <div style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}>
        {/* Header */}
        <div className="text-center mb-12" style={{ maxWidth: 640, marginInline: "auto" }}>
          <span
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.14em]"
            style={{ color: "var(--color-lilac-600)" }}
          >
            <Sparkle size={10} /> Más pedidos
          </span>
          <h2 className="mt-3 mb-3" style={{ color: "var(--color-ink)" }}>
            Lo que la gente{" "}
            <span className="font-display font-bold" style={{ color: "var(--color-lilac-700)", fontSize: "1.05em" }}>
              está pidiendo
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--color-ink-soft)" }}>
            Una muestra de nuestros favoritos. Todo en el catálogo es 100% personalizable.
          </p>
        </div>

        {/* Grid */}
        <div className="featured-grid grid gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-[10px] px-[22px] py-[14px] rounded-full font-bold text-[15px] text-white transition-transform hover:-translate-y-px"
            style={{ background: "var(--color-lilac-700)", boxShadow: "0 6px 16px -6px rgba(92,58,140,.5)" }}
          >
            Ver catálogo completo <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .featured-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .featured-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
