import { crearUrlSubida } from "@/app/admin/actions";
import { supabasePublic } from "@/lib/supabase/public";

const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/heic": "heic", "image/heif": "heif" };

// Reduce a máx. 2400px conservando calidad alta (master); next/image genera las versiones ligeras.
// Prefiere WebP; Safari/iPhone no codifica WebP en canvas y devuelve PNG, así que ahí cae a JPEG
// (o PNG si el original es PNG, para no perder la transparencia de logos).
// Devuelve null si el navegador no puede decodificar el archivo → se sube el original.
async function prepararImagen(file: File, maxSize = 2400): Promise<Blob | null> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return null;
  }
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const toBlob = (type: string, q?: number) => new Promise<Blob | null>((r) => canvas.toBlob(r, type, q));

  const webp = await toBlob("image/webp", 0.9);
  if (webp?.type === "image/webp") return webp;
  return file.type === "image/png" ? toBlob("image/png") : toBlob("image/jpeg", 0.9);
}

// Sube directo del navegador a Supabase Storage con una URL firmada: el archivo no pasa por
// el servidor (Vercel limita las funciones a 4.5 MB por request). Devuelve la URL pública.
export async function subirImagen(file: File, folder: string): Promise<string> {
  const blob = (await prepararImagen(file)) ?? file;
  const ext = EXT[blob.type] ?? (file.name.split(".").pop() || "jpg").toLowerCase();

  const res = await crearUrlSubida(folder, ext);
  if ("error" in res) throw new Error(res.error);

  const { error } = await supabasePublic()
    .storage.from("productos")
    .uploadToSignedUrl(res.path, res.token, blob, {
      contentType: blob.type || "application/octet-stream",
      cacheControl: "31536000", // nombres UUID: el archivo nunca cambia
    });
  if (error) throw new Error(`Supabase Storage: ${error.message}`);
  return res.publicUrl;
}
