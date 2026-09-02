import { supabaseAdmin } from "@/lib/supabase/admin";
import { SeasonsManager } from "@/components/admin/SeasonsManager";

export default async function AdminTemporadasPage() {
  const db = supabaseAdmin();
  const [{ data: temporadas, error }, { data: relaciones, error: relErr }, { data: productos, error: prodErr }] = await Promise.all([
    db
      .from("temporadas")
      .select("id,nombre,slug,eslogan,descripcion,portada_url,portada_alt,activa,orden,fecha_inicio_mes,fecha_inicio_dia,fecha_fin_mes,fecha_fin_dia")
      .order("orden"),
    db.from("productos_temporadas").select("temporada_id,producto_id"),
    db.from("productos").select("id,nombre,imagen_url,imagen_alt").order("orden"),
  ]);
  if (error) throw error;
  if (relErr) throw relErr;
  if (prodErr) throw prodErr;

  const seasons = temporadas.map((t) => ({
    id: t.id,
    name: t.nombre,
    slug: t.slug,
    order: t.orden,
    active: t.activa,
    description: t.descripcion ?? "",
    coverSrc: t.portada_url,
    coverAlt: t.portada_alt ?? "",
    fechaInicioMes: t.fecha_inicio_mes,
    fechaInicioDia: t.fecha_inicio_dia,
    fechaFinMes: t.fecha_fin_mes,
    fechaFinDia: t.fecha_fin_dia,
    productIds: relaciones.filter((r) => r.temporada_id === t.id).map((r) => r.producto_id),
  }));

  const allProducts = productos.map((p) => ({ id: p.id, name: p.nombre, imageSrc: p.imagen_url, imageAlt: p.imagen_alt ?? "" }));

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-3">
            <h1 className="font-admin-title text-on-surface">Temporadas</h1>
            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-admin-label-caps">
              {seasons.length}
            </span>
          </div>
          <p className="font-admin-body text-on-surface-variant">El orden de aparición aquí coincide con el del sitio público.</p>
        </div>
        {/* ponytail: crear temporadas nuevas requiere agregarlas también en la tabla (portada, slug) — no hay flujo de alta todavía */}
        <button disabled className="bg-primary hover:bg-surface-tint text-on-primary px-4 py-2 rounded flex items-center gap-2 font-admin-label-caps transition-colors shadow-sm opacity-60 cursor-not-allowed">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nueva temporada
        </button>
      </div>

      <SeasonsManager initialSeasons={seasons} allProducts={allProducts} />
    </div>
  );
}
