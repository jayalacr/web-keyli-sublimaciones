import { SITE_SETTINGS } from "@/lib/siteSettings";
import { ConfiguracionTabs } from "@/components/admin/ConfiguracionTabs";

export default function AdminConfiguracionPage() {
  return <ConfiguracionTabs initialSettings={SITE_SETTINGS} />;
}
