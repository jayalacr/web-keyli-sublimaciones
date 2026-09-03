"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";

export async function crearCategoria(nombre: string) {
  const db = supabaseAdmin();
  const { data: existentes } = await db.from("categorias").select("orden").order("orden", { ascending: false }).limit(1);
  const orden = (existentes?.[0]?.orden ?? 0) + 10;
  const { data, error } = await db.from("categorias").insert({ nombre, slug: slugify(nombre), orden }).select().single();
  if (error) throw error;
  revalidatePath("/admin/categorias");
  return data;
}

export async function renombrarCategoria(id: string, nombre: string) {
  const db = supabaseAdmin();
  const { error } = await db.from("categorias").update({ nombre, slug: slugify(nombre) }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/categorias");
}

export async function eliminarCategoria(id: string) {
  const db = supabaseAdmin();

  const { count, error: countErr } = await db.from("productos").select("*", { count: "exact", head: true }).eq("categoria_id", id);
  if (countErr) throw countErr;
  if (count) {
    throw new Error(`No se puede eliminar: tiene ${count} producto(s) asignados. Cámbialos de categoría primero.`);
  }

  const { error } = await db.from("categorias").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/categorias");
}
