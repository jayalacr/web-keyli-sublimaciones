import Link from "next/link";
import Image from "next/image";
import { tiktokProfileUrl, waLink } from "@/lib/constants";
import { SOCIAL_ICONS } from "@/components/SocialIcons";

const NAV = [
  { href: "/articulos", label: "Artículos" },
  { href: "/temporadas", label: "Temporadas" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/proceso", label: "Proceso" },
];

export function Footer({
  whatsapp,
  instagramUrl,
  facebookUrl,
  tiktokUrls,
}: {
  whatsapp: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrls: string[];
}) {
  const redes = [
    { href: instagramUrl, label: "Instagram", icon: SOCIAL_ICONS.instagram },
    { href: facebookUrl, label: "Facebook", icon: SOCIAL_ICONS.facebook },
    ...(tiktokUrls.length > 0 ? [{ href: tiktokProfileUrl(tiktokUrls), label: "TikTok", icon: SOCIAL_ICONS.tiktok }] : []),
    { href: waLink(whatsapp), label: "WhatsApp", icon: SOCIAL_ICONS.whatsapp },
  ];

  return (
    <footer className="tapete w-full bg-surface-tint-soft">
      <div className="w-full px-container-margin pt-16 pb-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 flex flex-col items-start gap-5">
            <Link href="/" aria-label="Keyli Studio, ir al inicio">
              <Image src="/logo-keyli-studio-v6.png" alt="Keyli Studio" width={1000} height={501} className="h-20 w-auto" />
            </Link>
            <p className="font-body-secondary text-on-surface-variant max-w-[320px]">
              Diseño y personalización en Monterrey: sublimación, vinil, DTF y papelería creativa para
              regalos, eventos y negocios.
            </p>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="font-label-caps text-[11px] text-primary">Navegación</h2>
            <nav className="flex flex-col gap-1">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} className="py-1.5 font-body-secondary text-on-surface hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="font-label-caps text-[11px] text-primary">Envíos</h2>
            <p className="font-body-secondary text-on-surface-variant">
              Entregas locales en Monterrey y área metropolitana. Envíos a todo México por paquetería.
            </p>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h2 className="font-label-caps text-[11px] text-primary">Síguenos</h2>
            <div className="flex flex-wrap gap-2">
              {redes.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.label}
                  className="w-11 h-11 rounded-full bg-surface-container-lowest text-primary-strong flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                >
                  {r.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-primary/15 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <span className="font-label-caps text-on-surface-variant text-[10px]">© 2026 Keyli Studio · Diseño & Personalización</span>
          <a
            href="https://instagram.com/code4u_mx"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-caps text-on-surface-variant text-[10px] hover:text-primary transition-colors"
          >
            powered by code4u
          </a>
        </div>
      </div>
    </footer>
  );
}
