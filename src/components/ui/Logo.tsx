import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "default" | "big";
  className?: string;
}

interface LogoLockupProps {
  inverted?: boolean;
  className?: string;
}

export function Logo({ size = "default", className = "" }: LogoProps) {
  const dim = size === "big" ? 72 : 56;
  return (
    <Link href="/" className={`flex items-center shrink-0 ${className}`} aria-label="Keyli Sublimaciones — Inicio">
      <Image
        src="/assets/logo-keyli.jpeg"
        alt="Keyli Sublimaciones"
        width={dim}
        height={dim}
        className="rounded-full object-cover"
        priority
      />
    </Link>
  );
}

export function LogoLockup({ inverted = false, className = "" }: LogoLockupProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/assets/logo-keyli.jpeg"
        alt="Keyli Sublimaciones"
        width={48}
        height={48}
        className="rounded-full object-cover shrink-0"
      />
      <div className="flex flex-col leading-tight">
        <span
          className="font-display font-bold text-[28px] leading-none"
          style={{ color: inverted ? "#ffffff" : "var(--color-lilac-800)" }}
        >
          Keyli
        </span>
        <span
          className="font-sans text-[11px] tracking-widest uppercase"
          style={{ color: inverted ? "rgba(255,255,255,.7)" : "var(--color-ink-faint)" }}
        >
          Sublimaciones
        </span>
      </div>
    </div>
  );
}
