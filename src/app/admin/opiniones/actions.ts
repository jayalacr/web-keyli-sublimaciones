"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function toggleOpinionAprobada(id: string, aprobada: boolean) {
  const db = supabaseAdmin();
  const { error } = await db.from("opiniones").update({ aprobada }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/opiniones");
  revalidatePath("/");
}

export async function eliminarOpinion(id: string) {
  const db = supabaseAdmin();
  const { error } = await db.from("opiniones").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/opiniones");
  revalidatePath("/");
}
