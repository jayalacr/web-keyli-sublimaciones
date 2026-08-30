"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteSettings } from "@/lib/siteSettings";

const TABS: { id: "contacto" | "textos" | "envios" | "cuenta"; label: string; hint?: string }[] = [
  { id: "contacto", label: "Contacto", hint: "WhatsApp, Instagram, Facebook" },
  { id: "textos", label: "Textos del sitio" },
  { id: "envios", label: "Envíos" },
  { id: "cuenta", label: "Cuenta" },
];

type TabId = (typeof TABS)[number]["id"];

export function ConfiguracionTabs({ initialSettings }: { initialSettings: SiteSettings }) {
  const [tab, setTab] = useState<TabId>("textos");
  const [settings, setSettings] = useState(initialSettings);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function updateBadge(i: number, value: string) {
    setSettings((s) => {
      const badges = [...s.trustBadges] as SiteSettings["trustBadges"];
      badges[i] = value;
      return { ...s, trustBadges: badges };
    });
  }

  function save() {
    // ponytail: sin persistencia todavía — se conecta cuando exista Supabase
    setLastSaved(new Date().toLocaleString("es-MX", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }));
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-admin-title text-on-surface">Configuración</h1>
        <button onClick={save} className="bg-primary hover:bg-primary-container text-on-primary font-admin-body px-4 py-2 rounded transition-colors shadow-sm">
          Guardar cambios
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
          <nav className="flex flex-col space-y-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={
                  t.id === tab
                    ? "px-4 py-3 rounded text-left font-admin-body text-primary bg-secondary-container/50 border-l-4 border-primary shadow-sm font-medium"
                    : "px-4 py-3 rounded text-left font-admin-body text-on-surface-variant hover:bg-surface-container transition-colors"
                }
              >
                {t.label}
                {t.hint && <div className="font-admin-data text-outline mt-1 leading-tight">{t.hint}</div>}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 flex flex-col space-y-6">
          {tab === "textos" ? (
            <>
              <SettingsCard icon="home" title="Inicio">
                <Field label="Título principal" hint="Se muestra en el banner superior de la página principal.">
                  <input
                    type="text"
                    value={settings.heroTitle}
                    onChange={(e) => update("heroTitle", e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                  />
                </Field>
                <Field label="Subtítulo" hint={`Texto secundario bajo el título principal. ${settings.heroSubtitle.length}/120 caracteres.`}>
                  <textarea
                    rows={3}
                    maxLength={120}
                    value={settings.heroSubtitle}
                    onChange={(e) => update("heroSubtitle", e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface resize-none"
                  />
                </Field>
                <Field label="Texto del botón principal" hint="Botón que dirige a los productos.">
                  <input
                    type="text"
                    value={settings.heroCta}
                    onChange={(e) => update("heroCta", e.target.value)}
                    className="w-full max-w-md px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                  />
                </Field>
              </SettingsCard>

              <SettingsCard icon="history_edu" title="Historia">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-2 flex flex-col gap-5">
                    <Field label="Título de la sección">
                      <input
                        type="text"
                        value={settings.historyTitle}
                        onChange={(e) => update("historyTitle", e.target.value)}
                        className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                      />
                    </Field>
                    <Field
                      label={
                        <span className="flex justify-between">
                          <span>Texto de la historia</span>
                          <span className="font-admin-data text-outline font-normal">{settings.historyText.length} / 1000</span>
                        </span>
                      }
                      hint='Se muestra en la sección "Sobre Nosotros" del sitio público.'
                    >
                      <textarea
                        rows={8}
                        maxLength={1000}
                        value={settings.historyText}
                        onChange={(e) => update("historyText", e.target.value)}
                        className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface resize-none"
                      />
                    </Field>
                  </div>
                  <div className="col-span-1 flex flex-col gap-2">
                    <label className="font-admin-label-caps text-on-surface-variant">Imagen de Keyli</label>
                    <div className="relative rounded-lg overflow-hidden border border-outline-variant bg-surface-container h-48 w-full">
                      <Image src={settings.historyImageSrc} alt={settings.historyImageAlt} fill sizes="240px" className="object-cover" />
                    </div>
                    <span className="font-admin-data text-outline mt-1 text-center">Recomendado: 1024x1024px, JPG o PNG.</span>
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard icon="verified_user" title="Franja de confianza">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {settings.trustBadges.map((badge, i) => (
                    <Field key={i} label={`Beneficio ${i + 1}`}>
                      <input
                        type="text"
                        value={badge}
                        onChange={(e) => updateBadge(i, e.target.value)}
                        className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                      />
                    </Field>
                  ))}
                </div>
                <span className="font-admin-data text-outline mt-4 block">Iconos y textos breves mostrados sobre el footer del sitio.</span>
              </SettingsCard>
            </>
          ) : (
            <div className="bg-surface rounded-xl shadow-sm p-6 flex flex-col items-center text-center gap-2 py-16">
              <span className="material-symbols-outlined text-outline text-3xl">construction</span>
              <p className="font-admin-body text-on-surface-variant">
                {TABS.find((t) => t.id === tab)?.label} llega cuando esta sección se diseñe en Stitch.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end font-admin-data text-outline border-t border-outline-variant pt-4 max-w-6xl w-full">
        {lastSaved ? `Último guardado: ${lastSaved}` : "Sin cambios guardados en esta sesión"}
      </div>
    </div>
  );
}

function SettingsCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-outline">{icon}</span>
          <h2 className="font-admin-section-header text-on-surface">{title}</h2>
        </div>
        <div className="flex flex-col gap-5">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: React.ReactNode; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-admin-label-caps text-on-surface-variant">{label}</label>
      {children}
      {hint && <span className="font-admin-data text-outline">{hint}</span>}
    </div>
  );
}
