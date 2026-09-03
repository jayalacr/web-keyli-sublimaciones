import { supabaseAdmin } from "@/lib/supabase/admin";
import { OpinionesTable } from "@/components/admin/OpinionesTable";

export default async function AdminOpinionesPage() {
  const db = supabaseAdmin();
  const { data: opiniones, error } = await db
    .from("opiniones")
    .select("id,nombre,detalle,texto,aprobada,creado_en")
    .order("creado_en", { ascending: false });
  if (error) throw error;

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-baseline gap-3 mb-stack-md">
        <h1 className="font-admin-title text-on-surface">Opiniones</h1>
        <span className="text-sm font-medium text-outline">({opiniones.length})</span>
      </div>

      <OpinionesTable initialOpiniones={opiniones} />
    </div>
  );
}
