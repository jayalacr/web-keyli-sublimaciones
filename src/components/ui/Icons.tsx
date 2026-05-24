interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

interface HeartProps extends IconProps {
  filled?: boolean;
}

export const Sparkle = ({ size = 14, color = "currentColor", className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={color}>
    <path d="M12 0 L13.7 9.1 L23 12 L13.7 14.9 L12 24 L10.3 14.9 L1 12 L10.3 9.1 Z" />
  </svg>
);

export const Star = ({ size = 16, color = "currentColor", className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 2 L14.5 9 L22 9.5 L16 14 L18 22 L12 17.5 L6 22 L8 14 L2 9.5 L9.5 9 Z" />
  </svg>
);

export const WhatsAppGlyph = ({ size = 28, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
    <path d="M16 .4C7.6.4.8 7.2.8 15.6c0 2.8.8 5.4 2.1 7.7L.4 31.6l8.6-2.3a15.1 15.1 0 0 0 7 1.8h.1c8.4 0 15.2-6.8 15.2-15.2 0-4.1-1.6-7.9-4.5-10.8A15.2 15.2 0 0 0 16 .4Zm0 27.7h-.1a12.6 12.6 0 0 1-6.4-1.8l-.5-.3-4.9 1.3 1.3-4.8-.3-.5a12.7 12.7 0 0 1 11-19.2 12.6 12.6 0 0 1 12.7 12.6c0 7-5.7 12.7-12.6 12.7Zm6.9-9.5c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.5-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9a11 11 0 0 1-2.1-2.6c-.2-.4 0-.6.2-.7.2-.2.4-.4.5-.7l.3-.5c.1-.2 0-.4 0-.6 0-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1c0 1.9 1.3 3.6 1.5 3.9.2.3 2.6 4 6.4 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8 0-.1-.3-.2-.7-.4Z" />
  </svg>
);

export const FacebookGlyph = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.5 21.95v-8.3h2.8l.42-3.24H13.5V8.34c0-.94.26-1.58 1.6-1.58h1.71V3.86a22.6 22.6 0 0 0-2.5-.13c-2.46 0-4.15 1.5-4.15 4.27v2.4h-2.79v3.25h2.79v8.3h3.34Z" />
  </svg>
);

export const InstagramGlyph = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const TikTokGlyph = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.5 8.4a6.5 6.5 0 0 1-3.8-1.22V15.2a5.55 5.55 0 1 1-5.55-5.55c.27 0 .53.02.78.06v2.78a2.78 2.78 0 1 0 1.95 2.65V2.2h2.74a3.79 3.79 0 0 0 3.88 3.4v2.8Z" />
  </svg>
);

export const Menu = ({ size = 22, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

export const XClose = ({ size = 22, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

export const ArrowRight = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const ChevronDown = ({ size = 18, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const Search = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" strokeLinecap="round" />
  </svg>
);

export const Edit = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const Trash = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const Plus = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const Check = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const Clock = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" strokeLinecap="round" />
  </svg>
);

export const Truck = ({ size = 22, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="1" y="6" width="13" height="11" rx="1" />
    <polyline points="14 9 18 9 22 13 22 17 14 17" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
  </svg>
);

export const Heart = ({ size = 16, filled = false, className = "" }: HeartProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const Grid = ({ size = 18, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1.4" />
    <rect x="14" y="3" width="7" height="7" rx="1.4" />
    <rect x="3" y="14" width="7" height="7" rx="1.4" />
    <rect x="14" y="14" width="7" height="7" rx="1.4" />
  </svg>
);

export const MugLine = ({ size = 18, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 7h11v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7z" />
    <path d="M15 10h2.5a2.5 2.5 0 0 1 0 5H15" />
    <line x1="7" y1="3" x2="7" y2="5" />
    <line x1="11" y1="3" x2="11" y2="5" />
  </svg>
);

export const ShirtLine = ({ size = 18, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2L3 9.2a1 1 0 0 0 1 .8h2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2a1 1 0 0 0 1-.8l.7-3.5a2 2 0 0 0-1.3-2.2z" />
  </svg>
);

export const BottleLine = ({ size = 18, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 2h6v3l1 2v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7l1-2V2z" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

export const KeyLine = ({ size = 18, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="7.5" cy="15.5" r="4.5" />
    <line x1="11" y1="12" x2="21" y2="2" />
    <line x1="16" y1="7" x2="18" y2="9" />
  </svg>
);

export const TagLine = ({ size = 18, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z" />
    <circle cx="7" cy="7" r="1.4" />
  </svg>
);

export const SortIcon = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);
