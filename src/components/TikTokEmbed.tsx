"use client";

import { useEffect, useState } from "react";

// ponytail: hover-to-play se descartó — cargaría y descartaría el iframe de TikTok en cada
// entrada/salida del mouse, generando parpadeo y peticiones de red repetidas. Click-to-play
// (patrón "lite embed") es la versión estable: no carga nada hasta que el usuario decide ver.
export function TikTokEmbed({ url, thumbnailUrl, title }: { url: string; thumbnailUrl?: string; title?: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [active]);

  useEffect(() => {
    // ponytail: TikTok no documenta un evento público de "video terminado" para su embed
    // (a diferencia de YouTube), así que esto es best-effort — si algún día lo emiten con
    // esta forma lo detectamos, si no, el botón "volver" manual sigue funcionando siempre.
    if (!active) return;
    const onMessage = (event: MessageEvent) => {
      if (!event.origin.includes("tiktok.com")) return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.type === "onStateChange" && (data.state === 0 || data.value === 0)) {
          setActive(false);
        }
      } catch {
        // mensaje no era JSON reconocible, se ignora
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [active]);

  if (active) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setActive(false)}
          className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
          aria-label="Volver a la vista previa"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
        <blockquote
          className="tiktok-embed w-full rounded-lg overflow-hidden border border-outline-variant"
          cite={url}
          data-video-id={url.match(/\/video\/(\d+)/)?.[1]}
          style={{ maxWidth: "100%", minWidth: 0 }}
        >
          <section />
        </blockquote>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative w-full aspect-[9/16] rounded-lg overflow-hidden border border-outline-variant bg-surface-container-low"
      aria-label={title ? `Reproducir: ${title}` : "Reproducir video de TikTok"}
    >
      {thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbnailUrl} alt={title ?? "Video de TikTok"} className="absolute inset-0 w-full h-full object-cover" />
      )}
      <span className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center">
        <span className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-on-surface text-3xl">play_arrow</span>
        </span>
      </span>
    </button>
  );
}
