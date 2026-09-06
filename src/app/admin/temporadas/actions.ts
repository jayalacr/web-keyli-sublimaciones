"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function toggleTemporadaActiva(id: string, activa: boolean) {
  const db = supabaseAdmin();
  const { error } = await db.from("temporadas").update({ activa }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/temporadas");
  revalidatePath("/");
  revalidatePath("/temporadas");
}

export async function guardarTemporada(input: {
  id: string;
  nombre: string;
  orden: number;
  descripcion: string;
  activa: boolean;
  fechaInicioMes: number | null;
  fechaInicioDia: number | null;
  fechaFinMes: number | null;
  fechaFinDia: number | null;
  portadaUrl: string | null;
  portadaAlt: string;
  productIds: string[];
}) {
  const db = supabaseAdmin();
  const { error } = await db
    .from("temporadas")
    .update({
      nombre: input.nombre,
      orden: input.orden,
      descripcion: input.descripcion,
      activa: input.activa,
      fecha_inicio_mes: input.fechaInicioMes,
      fecha_inicio_dia: input.fechaInicioDia,
      fecha_fin_mes: input.fechaFinMes,
      fecha_fin_dia: input.fechaFinDia,
      portada_url: input.portadaUrl,
      portada_alt: input.portadaAlt,
    })
    .eq("id", input.id);
  if (error) throw error;

  const { error: delErr } = await db.from("productos_temporadas").delete().eq("temporada_id", input.id);
  if (delErr) throw delErr;

  if (input.productIds.length) {
    const { error: insErr } = await db
      .from("productos_temporadas")
      .insert(input.productIds.map((producto_id) => ({ producto_id, temporada_id: input.id })));
    if (insErr) throw insErr;
  }

  revalidatePath("/admin/temporadas");
  revalidatePath("/");
  revalidatePath("/temporadas");
}
