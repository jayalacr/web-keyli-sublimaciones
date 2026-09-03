"use client";

import { useState, useTransition } from "react";
import { toggleOpinionAprobada, eliminarOpinion } from "@/app/admin/opiniones/actions";

type Opinion = {
  id: string;
  nombre: string;
  detalle: string | null;
  texto: string;
  aprobada: boolean;
  creado_en: string;
};

export function OpinionesTable({ initialOpiniones }: { initialOpiniones: Opinion[] }) {
  const [opiniones, setOpiniones] = useState(initialOpiniones);
  const [filter, setFilter] = useState<"todas" | "pendientes" | "aprobadas">("pendientes");
  const [, startTransition] = useTransition();

  const filtered = opiniones.filter((o) =>
    filter === "todas" ? true : filter === "aprobadas" ? o.aprobada : !o.aprobada
  );

  function toggle(id: string, aprobada: boolean) {
    setOpiniones((prev) => prev.map((o) => (o.id === id ? { ...o, aprobada } : o)));
    startTransition(() => {
      toggleOpinionAprobada(id, aprobada);
    });
  }

  function remove(id: string) {
    setOpiniones((prev) => prev.filter((o) => o.id !== id));
    startTransition(() => {
      eliminarOpinion(id);
    });
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-stack-md">
        {(["pendientes", "aprobadas", "todas"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              f === filter
                ? "px-4 py-1.5 rounded-full bg-primary text-on-primary font-admin-label-caps text-xs transition-colors"
                : "px-4 py-1.5 rounded-full border border-outline-variant text-on-surface-variant font-admin-label-caps text-xs hover:bg-surface-container transition-colors"
            }
          >
            {f === "pendientes" ? "Pendientes" : f === "aprobadas" ? "Aprobadas" : "Todas"}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant border-dashed">
          <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-outline text-[32px]">rate_review</span>
          </div>
          <p className="text-on-surface font-medium">No hay opiniones en esta vista</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((o) => (
            <div key={o.id} className="bg-surface-container-lowest rounded-xl shadow-sm p-4 flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-admin-body font-semibold text-on-surface">{o.nombre}</span>
                  {o.detalle && <span className="text-sm text-on-surface-variant">· {o.detalle}</span>}
                </div>
                <p className="text-sm text-on-surface-variant mt-1 italic">&ldquo;{o.texto}&rdquo;</p>
                <p className="text-xs text-outline mt-2">
                  {new Date(o.creado_en).toLocaleString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggle(o.id, !o.aprobada)}
                  className={
                    o.aprobada
                      ? "px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container text-sm font-medium hover:opacity-90 transition-opacity"
                      : "px-3 py-1.5 rounded-lg bg-primary text-on-primary text-sm font-medium hover:opacity-90 transition-opacity"
                  }
                >
                  {o.aprobada ? "Ocultar del sitio" : "Aprobar y mostrar"}
                </button>
                <button
                  onClick={() => remove(o.id)}
                  className="p-1.5 text-outline hover:text-error transition-colors rounded hover:bg-error-container/20"
                  title="Eliminar"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
