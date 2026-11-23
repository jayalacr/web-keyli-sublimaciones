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

// Sello circular tipo sticker: texto en círculo + estrella al centro.
export function Sello({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`sello ${className}`} style={style} role="img" aria-label="Hecho en Monterrey desde 2021">
      <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
        <circle cx="60" cy="60" r="58" fill="var(--color-accent)" stroke="white" strokeWidth="4" />
        <defs>
          <path id="sello-circulo" d="M60,60 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0" />
        </defs>
        <text fill="var(--color-primary-strong)" fontSize="11.5" fontWeight="700" letterSpacing="2.6" fontFamily="var(--font-body)">
          <textPath href="#sello-circulo">HECHO EN MONTERREY ✦ DESDE 2021 ✦</textPath>
        </text>
        <path
          transform="translate(46 46) scale(1.17)"
          d="M12 0C12.6 6.5 17.5 11.4 24 12 17.5 12.6 12.6 17.5 12 24 11.4 17.5 6.5 12.6 0 12 6.5 11.4 11.4 6.5 12 0Z"
          fill="var(--color-primary)"
        />
      </svg>
    </div>
  );
}
