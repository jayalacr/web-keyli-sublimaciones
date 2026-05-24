import { Sparkle } from "./Icons";

interface IllustrationProps {
  size?: number;
  color?: string;
  accent?: string;
}

export const Shirt = ({ size = 110, color = "#5C3A8C", accent = "#fff" }: IllustrationProps) => (
  <svg width={size} viewBox="0 0 120 120" fill="none">
    <path
      d="M28 30 L40 14 L52 22 Q60 30 68 22 L80 14 L92 30 L102 42 L88 52 L88 100 Q88 106 82 106 L38 106 Q32 106 32 100 L32 52 L18 42 Z"
      fill={color}
    />
    <path d="M52 22 Q60 30 68 22" fill="none" stroke={accent} strokeWidth="2" />
  </svg>
);

export const Mug = ({ size = 110, color = "#5C3A8C", accent = "#FFD84D" }: IllustrationProps) => (
  <svg width={size} viewBox="0 0 120 120" fill="none">
    <rect x="22" y="30" width="60" height="68" rx="6" fill={color} />
    <path d="M82 46 Q102 46 102 64 Q102 82 82 82" fill="none" stroke={color} strokeWidth="6" />
    <rect x="32" y="44" width="40" height="14" rx="2" fill={accent} opacity=".9" />
  </svg>
);

export const Bottle = ({ size = 110, color = "#5C3A8C", accent = "#FFD84D" }: IllustrationProps) => (
  <svg width={size} viewBox="0 0 120 120" fill="none">
    <rect x="50" y="10" width="20" height="10" rx="2" fill={color} />
    <path
      d="M44 22 L44 30 Q44 36 50 38 L50 102 Q50 110 60 110 Q70 110 70 102 L70 38 Q76 36 76 30 L76 22 Z"
      fill={color}
    />
    <rect x="50" y="48" width="20" height="22" fill={accent} />
  </svg>
);

export const Key = ({ size = 110, color = "#5C3A8C", accent = "#FFD84D" }: IllustrationProps) => (
  <svg width={size} viewBox="0 0 120 120" fill="none">
    <circle cx="40" cy="60" r="20" fill="none" stroke={color} strokeWidth="8" />
    <rect x="58" y="56" width="50" height="8" fill={color} />
    <rect x="90" y="56" width="6" height="14" fill={color} />
    <rect x="100" y="56" width="6" height="20" fill={color} />
    <circle cx="40" cy="60" r="6" fill={accent} />
  </svg>
);

export const Tag = ({ size = 110, color = "#5C3A8C", accent = "#FFD84D" }: IllustrationProps) => (
  <svg width={size} viewBox="0 0 120 120" fill="none">
    <path d="M60 12 L108 12 L108 60 L60 108 L12 60 Z" fill={color} />
    <circle cx="92" cy="28" r="6" fill={accent} />
  </svg>
);

type IconKind = "shirt" | "mug" | "bottle" | "key" | "tag";

interface ProductIconProps {
  kind: IconKind;
  gradient?: [string, string];
  size?: number;
}

const ICON_MAP: Record<IconKind, React.ComponentType<IllustrationProps>> = {
  shirt: Shirt,
  mug: Mug,
  bottle: Bottle,
  key: Key,
  tag: Tag,
};

export function ProductIcon({ kind, gradient, size = 110 }: ProductIconProps) {
  const [a, b] = gradient ?? ["#E6D3FB", "#CAB0EC"];
  const Comp = ICON_MAP[kind] ?? Shirt;

  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{ background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)` }}
    >
      <div className="absolute top-[12%] right-[14%] text-[var(--color-yellow-300)]">
        <Sparkle size={18} />
      </div>
      <div className="absolute bottom-[18%] left-[14%] text-[var(--color-yellow-300)]">
        <Sparkle size={12} />
      </div>
      <Comp size={size} color="#5C3A8C" accent="#FFD84D" />
    </div>
  );
}
