import { ADMIN_SEASONS_LIST } from "@/lib/adminSeasons";
import { ADMIN_PRODUCTS } from "@/lib/adminProducts";
import { SeasonsManager } from "@/components/admin/SeasonsManager";

export default function AdminTemporadasPage() {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-3">
            <h1 className="font-admin-title text-on-surface">Temporadas</h1>
            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-admin-label-caps">
              {ADMIN_SEASONS_LIST.length}
            </span>
          </div>
          <p className="font-admin-body text-on-surface-variant">El orden de aparición aquí coincide con el del sitio público.</p>
        </div>
        {/* ponytail: crear temporadas nuevas requiere agregarlas también a src/lib/seasons.ts (o a Supabase) — llega junto con la BD */}
        <button disabled className="bg-primary hover:bg-surface-tint text-on-primary px-4 py-2 rounded flex items-center gap-2 font-admin-label-caps transition-colors shadow-sm opacity-60 cursor-not-allowed">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nueva temporada
        </button>
      </div>

      <SeasonsManager initialSeasons={ADMIN_SEASONS_LIST} allProducts={ADMIN_PRODUCTS} />
    </div>
  );
}
