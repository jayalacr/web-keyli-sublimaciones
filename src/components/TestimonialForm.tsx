"use client";

import { useState, useTransition } from "react";
import { enviarOpinion } from "@/app/(sitio)/actions";
import { Dialog } from "@/components/Dialog";
import Image from "next/image";
import { Destellos } from "@/components/Marca";

export function TestimonialForm() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="boton-sticker inline-flex items-center gap-2 min-h-12 px-8 py-3 bg-primary text-on-primary rounded-full font-label-caps"
      >
        Comparte tu opinión
      </button>
      {open && <TestimonialModal onClose={() => setOpen(false)} />}
    </div>
  );
}

function TestimonialModal({ onClose }: { onClose: () => void }) {
  const [nombre, setNombre] = useState("");
  const [detalle, setDetalle] = useState("");
  const [texto, setTexto] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await enviarOpinion(nombre, detalle, texto, anonimo);
        setSent(true);
      } catch {
        setError("No se pudo enviar tu opinión. Intenta de nuevo.");
      }
    });
  }

  return (
    <Dialog label="Comparte tu opinión" onClose={onClose} className="max-w-md rounded-[28px]">
      <div className="bg-surface w-full rounded-[28px] shadow-2xl relative p-7 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-tint-soft transition-colors"
          aria-label="Cerrar"
        >
          <span className="material-symbols-outlined text-on-surface-variant">close</span>
        </button>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="relative">
              <Image src="/keyli-husky.png" alt="" width={304} height={480} className="h-36 w-auto" />
              <Destellos className="absolute -top-1 -right-8 w-10 h-10" />
            </div>
            <h2 className="font-display-sm-mobile text-on-surface">¡Gracias por tu opinión!</h2>
            <p className="font-body-secondary text-on-surface-variant">La revisamos y pronto aparecerá en la página.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4 mt-2">
            <div className="text-center pr-8 pl-8">
              <h2 className="font-display-sm-mobile text-on-surface">¿Nos compraste algo?</h2>
              <p className="font-body-secondary text-on-surface-variant mt-1">Cuéntanos tu experiencia.</p>
            </div>
            {!anonimo && (
              <input
                type="text"
                required
                maxLength={80}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                aria-label="Tu nombre"
                className="w-full px-4 py-2 bg-surface-container-lowest border-2 border-outline-variant/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-main text-on-surface"
              />
            )}
            <label className="flex items-center gap-2 -mt-1 font-body-secondary text-sm text-on-surface-variant">
              <input
                type="checkbox"
                checked={anonimo}
                onChange={(e) => setAnonimo(e.target.checked)}
                className="accent-primary"
              />
              Publicar como anónimo
            </label>
            <input
              type="text"
              maxLength={80}
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              placeholder="Qué pediste (opcional)"
              aria-label="Qué pediste (opcional)"
              className="w-full px-4 py-2 bg-surface-container-lowest border-2 border-outline-variant/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-main text-on-surface"
            />
            <textarea
              required
              rows={3}
              maxLength={500}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Tu opinión"
              aria-label="Tu opinión"
              className="w-full px-4 py-2 bg-surface-container-lowest border-2 border-outline-variant/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-main text-on-surface resize-none"
            />
            {error && <p className="text-sm text-error text-center">{error}</p>}
            <button
              type="submit"
              disabled={isPending}
              className="boton-sticker self-center min-h-12 px-8 py-3 bg-primary text-on-primary rounded-full font-label-caps disabled:opacity-60"
            >
              {isPending ? "Enviando..." : "Enviar opinión"}
            </button>
          </form>
        )}
      </div>
    </Dialog>
  );
}
