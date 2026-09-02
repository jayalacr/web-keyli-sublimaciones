"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";

export async function crearCategoria(nombre: string) {
  const db = supabaseAdmin();
  const { data: existentes } = await db.from("categorias").select("orden").order("orden", { ascending: false }).limit(1);
  const orden = (existentes?.[0]?.orden ?? 0) + 10;
  const { error } = await db.from("categorias").insert({ nombre, slug: slugify(nombre), orden });
  if (error) throw error;
  revalidatePath("/admin/categorias");
}

export async function renombrarCategoria(id: string, nombre: string) {
  const db = supabaseAdmin();
  const { error } = await db.from("categorias").update({ nombre, slug: slugify(nombre) }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/categorias");
}

export async function eliminarCategoria(id: string) {
  const db = supabaseAdmin();
  const { error } = await db.from("categorias").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/categorias");
}
