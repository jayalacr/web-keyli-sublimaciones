"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

// Genera una URL firmada para que el navegador suba la imagen directo al bucket "productos"
// (ver src/lib/uploadImage.ts). El archivo nunca pasa por aquí, así que no aplica el límite
// de 4.5 MB de Vercel. "folder" organiza el bucket (ej. "productos/mi-slug", "temporadas/verano", "sitio").
// Next.js oculta el mensaje de errores "throw" en producción, por eso se devuelve { error } explícito.
export async function crearUrlSubida(
  folderRaw: string,
  extRaw: string
): Promise<{ path: string; token: string; publicUrl: string } | { error: string }> {
  try {
    const folder = folderRaw
      .split("/")
      .map((s) => s.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "otros")
      .join("/");
    const ext = extRaw.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;

    const bucket = supabaseAdmin().storage.from("productos");
    const { data, error } = await bucket.createSignedUploadUrl(path);
    if (error) {
      console.error("crearUrlSubida: fallo al firmar", { path, error });
      return { error: `Supabase Storage: ${error.message}` };
    }
    return { path: data.path, token: data.token, publicUrl: bucket.getPublicUrl(data.path).data.publicUrl };
  } catch (e) {
    console.error("crearUrlSubida: excepción inesperada", e);
    return { error: e instanceof Error ? e.message : String(e) };
  }
}
