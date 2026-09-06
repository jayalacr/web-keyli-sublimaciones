import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DEFAULT_PHONE } from "@/lib/constants";
import { getContacto } from "@/lib/db";

export default async function SitioLayout({ children }: LayoutProps<"/">) {
  const contacto = await getContacto();
  return (
    <>
      <Header
        whatsapp={contacto?.whatsapp ?? DEFAULT_PHONE}
        instagramUrl={contacto?.instagram_url ?? "https://instagram.com/keylisublimaciones"}
        facebookUrl={contacto?.facebook_url ?? "https://facebook.com/keylisublimaciones"}
      />
      <main className="flex-1">{children}</main>
      <Footer
        whatsapp={contacto?.whatsapp ?? DEFAULT_PHONE}
        instagramUrl={contacto?.instagram_url ?? "https://instagram.com/keylisublimaciones"}
        facebookUrl={contacto?.facebook_url ?? "https://facebook.com/keylisublimaciones"}
        tiktokUrls={contacto?.tiktok_urls ?? []}
      />
    </>
  );
}
