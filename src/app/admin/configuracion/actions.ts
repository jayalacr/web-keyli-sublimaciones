"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { TextosInicio } from "@/lib/db";

export async function guardarTextosInicio(valor: TextosInicio) {
  const db = supabaseAdmin();
  const { error } = await db.from("configuracion_sitio").upsert({ clave: "textos_inicio", valor, actualizado_en: new Date().toISOString() });
  if (error) throw error;
  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}
