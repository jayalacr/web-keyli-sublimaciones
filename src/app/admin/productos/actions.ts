"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";
import type { AdminProduct } from "@/components/admin/ProductForm";

export async function toggleProductoActivo(id: string, activo: boolean) {
  const db = supabaseAdmin();
  const { error } = await db.from("productos").update({ activo }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/productos");
}

export async function eliminarProducto(id: string) {
  const db = supabaseAdmin();
  const { error } = await db.from("productos").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function guardarProducto(input: AdminProduct) {
  const db = supabaseAdmin();

  const { data: categoria, error: catErr } = await db.from("categorias").select("id").eq("nombre", input.category).single();
  if (catErr) throw catErr;

  const row = {
    categoria_id: categoria.id,
    nombre: input.name,
    slug: input.slug || slugify(input.name),
    descripcion: input.description,
    material: input.material,
    tecnica: input.technique,
    precio_desde_centavos: input.priceFrom,
    dias_produccion: input.productionDays,
    capacidades: input.capacities,
    colores: input.colors.map((c) => ({ hex: c.hex, etiqueta: c.label })),
    imagen_url: input.imageSrc,
    imagen_alt: input.imageAlt,
    galeria: input.gallery.map((g) => ({ url: g.src, alt: g.alt })),
    activo: input.active,
    destacado: input.featured,
    orden: input.order,
  };

  let productoId = input.id;
  if (productoId) {
    const { error } = await db.from("productos").update(row).eq("id", productoId);
    if (error) throw error;
  } else {
    const { data, error } = await db.from("productos").insert(row).select("id").single();
    if (error) throw error;
    productoId = data.id;
  }

  const { error: delErr } = await db.from("productos_temporadas").delete().eq("producto_id", productoId);
  if (delErr) throw delErr;

  if (input.seasons.length) {
    const { data: temporadas, error: seasErr } = await db.from("temporadas").select("id,nombre").in("nombre", input.seasons);
    if (seasErr) throw seasErr;
    const { error: insErr } = await db
      .from("productos_temporadas")
      .insert(temporadas.map((t) => ({ producto_id: productoId, temporada_id: t.id })));
    if (insErr) throw insErr;
  }

  revalidatePath("/admin/productos");
  revalidatePath("/articulos");
  redirect("/admin/productos");
}
