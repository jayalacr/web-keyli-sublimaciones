"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

// Subida genérica al bucket "productos" de Storage — la usan productos, temporadas y configuración.
export async function subirImagen(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) throw new Error("Sin archivo");

  const db = supabaseAdmin();
  const path = `${crypto.randomUUID()}.webp`;
  const { error } = await db.storage.from("productos").upload(path, file, { contentType: "image/webp" });
  if (error) throw error;

  const { data } = db.storage.from("productos").getPublicUrl(path);
  return data.publicUrl;
}
