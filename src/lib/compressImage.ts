// Redimensiona a máx. 1600px y convierte a WebP en el navegador antes de subir.
// ponytail: si el navegador no puede decodificar el archivo (ej. HEIC en Chrome/algunos
// iPhone con "Formato más compatible" desactivado), devuelve null y el llamador sube el
// archivo original sin comprimir. Soporte real de HEIC requeriría una librería de decodificación.
export async function compressImage(file: File, maxSize = 1600, quality = 0.8): Promise<Blob | null> {
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
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("No se pudo procesar la imagen"))), "image/webp", quality);
  });
}
