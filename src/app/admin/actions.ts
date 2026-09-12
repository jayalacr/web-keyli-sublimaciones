"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

// Subida genérica al bucket "productos" de Storage — la usan productos, temporadas y configuración.
// "folder" organiza el bucket (ej. "productos/mi-slug", "temporadas/verano", "sitio") para que sea
// fácil encontrar los archivos de cada sección desde el dashboard de Supabase.
export async function subirImagen(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) throw new Error("Sin archivo");
  const folderRaw = (formData.get("folder") as string | null) ?? "otros";
  const folder = folderRaw
    .split("/")
    .map((s) => s.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "otros")
    .join("/");

  const db = supabaseAdmin();
  const path = `${folder}/${crypto.randomUUID()}.webp`;
  const { error } = await db.storage.from("productos").upload(path, file, { contentType: "image/webp" });
  if (error) throw error;

  const { data } = db.storage.from("productos").getPublicUrl(path);
  return data.publicUrl;
}
