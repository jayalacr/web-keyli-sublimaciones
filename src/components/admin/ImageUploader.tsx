"use client";

import { useState } from "react";
import Image from "next/image";
import { compressImage } from "@/lib/compressImage";
import { subirImagen } from "@/app/admin/actions";

export function ImageUploader({
  src,
  alt,
  onChange,
  heightClass = "h-40",
}: {
  src: string | null;
  alt: string;
  onChange: (url: string) => void;
  heightClass?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const blob = await compressImage(file);
      const fd = new FormData();
      fd.set("file", blob, "imagen.webp");
      onChange(await subirImagen(fd));
    } catch {
      setError("No se pudo subir la imagen. Si es HEIC (foto de Mac), conviértela a JPG/PNG.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        className={`relative block w-full ${heightClass} rounded-lg border-2 border-dashed border-outline-variant overflow-hidden bg-surface-container cursor-pointer hover:border-primary transition-colors`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        {src && <Image src={src} alt={alt} fill sizes="480px" className="object-cover" />}
        {(!src || uploading) && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-1 text-sm ${src ? "bg-surface/70 text-on-surface" : "text-on-surface-variant/60"}`}>
            <span className="material-symbols-outlined text-2xl">cloud_upload</span>
            {uploading ? "Subiendo..." : "Subir imagen"}
          </div>
        )}
      </label>
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}
