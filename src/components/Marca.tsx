import { Fragment } from "react";

// Motivos de marca derivados del logo — ver docs/marca.md.

// La "caja lila" detrás de la K del logo: las palabras entre *asteriscos* se resaltan.
// Funciona igual para textos fijos y para los que se editan en /admin/configuracion.
export function conMarca(texto: string) {
  return texto.split("*").map((parte, i) =>
    i % 2 === 1 ? (
      <span key={i} className="marca">
        {parte}
      </span>
    ) : (
      <Fragment key={i}>{parte}</Fragment>
    )
  );
}

const ESTRELLA =
  "M12 0C12.6 6.5 17.5 11.4 24 12 17.5 12.6 12.6 17.5 12 24 11.4 17.5 6.5 12.6 0 12 6.5 11.4 11.4 6.5 12 0Z";

// Los destellos dorados del logo. Decorativos: máximo un grupo por sección.
export function Destellos({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 44" aria-hidden="true" className={`destellos text-accent ${className}`}>
      <g transform="translate(0 6)"><path d={ESTRELLA} fill="currentColor" /></g>
      <g transform="translate(28 0) scale(0.8)"><path d={ESTRELLA} fill="currentColor" /></g>
      <g transform="translate(24 28) scale(0.6)"><path d={ESTRELLA} fill="currentColor" /></g>
    </svg>
  );
}
