import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DEFAULT_PHONE, waLink } from "@/lib/constants";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { getContacto } from "@/lib/db";

export default async function SitioLayout({ children }: LayoutProps<"/">) {
  const contacto = await getContacto();
  return (
    <>
      <Header
        whatsapp={contacto?.whatsapp ?? DEFAULT_PHONE}
        instagramUrl={contacto?.instagram_url ?? "https://instagram.com/keylisublimaciones"}
        facebookUrl={contacto?.facebook_url ?? "https://facebook.com/keylisublimaciones"}
        logoUrl={contacto?.logo_url || undefined}
      />
      <main className="flex-1">{children}</main>
      {/* WhatsApp flotante sólo en celular/tablet; en escritorio el Header ya tiene "Contáctanos". */}
      <a
        href={waLink(contacto?.whatsapp ?? DEFAULT_PHONE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="lg:hidden fixed z-40 right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] w-14 h-14 rounded-full bg-primary-strong text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform [&>svg]:w-7 [&>svg]:h-7"
      >
        {SOCIAL_ICONS.whatsapp}
      </a>
      <Footer
        whatsapp={contacto?.whatsapp ?? DEFAULT_PHONE}
        instagramUrl={contacto?.instagram_url ?? "https://instagram.com/keylisublimaciones"}
        facebookUrl={contacto?.facebook_url ?? "https://facebook.com/keylisublimaciones"}
        tiktokUrls={contacto?.tiktok_urls ?? []}
      />
    </>
  );
}
