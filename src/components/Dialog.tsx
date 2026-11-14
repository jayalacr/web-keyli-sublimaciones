"use client";

import { useEffect, useRef } from "react";

// <dialog> nativo: Escape, foco atrapado y top layer los da el navegador. Se abre al montar;
// el padre lo cierra desmontándolo. ponytail: sin animación de salida (requiere mantenerlo montado).
export function Dialog({
  label,
  onClose,
  className = "",
  children,
}: {
  label: string;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      // El clic en el fondo (::backdrop) llega con target = el propio <dialog>.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={`m-auto p-0 bg-transparent w-[calc(100%-2rem)] backdrop:bg-surface/90 backdrop:backdrop-blur-sm transition duration-200 ease-out starting:open:opacity-0 starting:open:scale-[0.96] ${className}`}
    >
      {children}
    </dialog>
  );
}
