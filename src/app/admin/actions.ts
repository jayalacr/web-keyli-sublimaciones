"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

// Subida genérica al bucket "productos" de Storage — la usan productos, temporadas y configuración.
// "folder" organiza el bucket (ej. "productos/mi-slug", "temporadas/verano", "sitio") para que sea
// fácil encontrar los archivos de cada sección desde el dashboard de Supabase.
// Next.js oculta el mensaje real de cualquier error "throw" en producción (error #441
// "An error occurred in the Server Components render"). Por eso esta acción nunca lanza:
// devuelve { url } o { error } explícito para que el cliente pueda mostrar la causa real.
export async function subirImagen(formData: FormData): Promise<{ url: string } | { error: string }> {
  try {
    const file = formData.get("file") as File | null;
    if (!file) return { error: "Sin archivo" };
    const folderRaw = (formData.get("folder") as string | null) ?? "otros";
    const folder = folderRaw
      .split("/")
      .map((s) => s.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "otros")
      .join("/");

    const db = supabaseAdmin();
    const ext = file.type === "image/webp" ? "webp" : (file.name.split(".").pop() ?? "jpg").toLowerCase();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await db.storage.from("productos").upload(path, file, { contentType: file.type || "application/octet-stream" });
    if (error) {
      console.error("subirImagen: fallo al subir a Supabase Storage", { path, contentType: file.type, error });
      return { error: `Supabase Storage: ${error.message}` };
    }

    const { data } = db.storage.from("productos").getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (e) {
    console.error("subirImagen: excepción inesperada", e);
    return { error: e instanceof Error ? e.message : String(e) };
  }
}
