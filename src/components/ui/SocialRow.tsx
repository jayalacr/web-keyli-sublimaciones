import { FacebookGlyph, InstagramGlyph, TikTokGlyph } from "./Icons";

const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/keylisublimaciones",
    Glyph: FacebookGlyph,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/keylisublimaciones",
    Glyph: InstagramGlyph,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://tiktok.com/@keylisublimaciones",
    Glyph: TikTokGlyph,
  },
];

interface SocialRowProps {
  size?: number;
  iconSize?: number;
  className?: string;
}

export function SocialRow({ size = 36, iconSize = 16, className = "" }: SocialRowProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.id}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="flex items-center justify-center rounded-full transition-colors text-[var(--color-lilac-700)] hover:text-[var(--color-lilac-900)] hover:bg-[var(--color-lilac-100)]"
          style={{ width: size, height: size }}
        >
          <s.Glyph size={iconSize} />
        </a>
      ))}
    </div>
  );
}
