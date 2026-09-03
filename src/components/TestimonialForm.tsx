"use client";

import { useState, useTransition } from "react";
import { enviarOpinion } from "@/app/(sitio)/actions";

export function TestimonialForm() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center">
      <button
        onClick={() => setOpen(true)}
        className="px-8 py-3 bg-primary text-on-primary rounded-full font-label-caps hover:bg-primary-container hover:text-on-primary-container transition-colors"
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/90 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-surface w-full max-w-md rounded-2xl shadow-2xl relative p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-variant transition-colors"
          aria-label="Cerrar"
        >
          <span className="material-symbols-outlined text-on-surface-variant">close</span>
        </button>

        {sent ? (
          <p className="font-body-main text-on-surface text-center py-8">
            ¡Gracias por tu opinión!
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4 mt-2">
            <h3 className="font-label-caps text-secondary tracking-widest uppercase text-center">¿Nos compraste algo?</h3>
            <p className="font-body-secondary text-on-surface-variant text-sm text-center -mt-2">
              Cuéntanos tu experiencia.
            </p>
            {!anonimo && (
              <input
                type="text"
                required
                maxLength={80}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-main text-on-surface"
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
              className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-main text-on-surface"
            />
            <textarea
              required
              rows={3}
              maxLength={500}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Tu opinión"
              className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-main text-on-surface resize-none"
            />
            {error && <p className="text-sm text-error text-center">{error}</p>}
            <button
              type="submit"
              disabled={isPending}
              className="self-center px-8 py-3 bg-primary text-on-primary rounded-full font-label-caps hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-60"
            >
              {isPending ? "Enviando..." : "Enviar opinión"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
