"use client";

import { useState, useTransition } from "react";
import type { Contacto, TextosInicio } from "@/lib/db";
import { guardarContacto, guardarTextosInicio } from "@/app/admin/configuracion/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";

const TABS: { id: "contacto" | "textos"; label: string; hint?: string }[] = [
  { id: "contacto", label: "Contacto", hint: "WhatsApp, Instagram, Facebook" },
  { id: "textos", label: "Textos del sitio" },
];

type TabId = (typeof TABS)[number]["id"];

export function ConfiguracionTabs({
  initialSettings,
  initialContacto,
}: {
  initialSettings: TextosInicio;
  initialContacto: Contacto;
}) {
  const [tab, setTab] = useState<TabId>("textos");
  const [settings, setSettings] = useState(initialSettings);
  const [contacto, setContacto] = useState(initialContacto);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function update<K extends keyof TextosInicio>(key: K, value: TextosInicio[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function updateContacto<K extends keyof Contacto>(key: K, value: Contacto[K]) {
    setContacto((c) => ({ ...c, [key]: value }));
  }

  function updateBadge(i: number, value: string) {
    setSettings((s) => {
      const badges = [...s.insignias_confianza] as TextosInicio["insignias_confianza"];
      badges[i] = value;
      return { ...s, insignias_confianza: badges };
    });
  }

  function save() {
    startTransition(async () => {
      const contactoLimpio = {
        ...contacto,
        tiktok_urls: contacto.tiktok_urls.map((u) => u.trim()).filter(Boolean),
      };
      await Promise.all([guardarTextosInicio(settings), guardarContacto(contactoLimpio)]);
      setLastSaved(new Date().toLocaleString("es-MX", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }));
    });
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-admin-title text-on-surface">Configuración</h1>
        <button onClick={save} disabled={isPending} className="bg-primary hover:bg-primary-container text-on-primary font-admin-body px-4 py-2 rounded transition-colors shadow-sm disabled:opacity-60">
          {isPending ? "Guardando..." : "Guardar cambios"}
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
          {tab === "contacto" ? (
            <SettingsCard icon="alternate_email" title="Contacto">
              <Field label="Logo del sitio" hint="Se muestra en el encabezado. Recomendado: cuadrado, mínimo 200x200px.">
                <div className="max-w-[160px]">
                  <ImageUploader
                    src={contacto.logo_url || null}
                    alt="Logo Keyli Sublimaciones"
                    onChange={(url) => updateContacto("logo_url", url)}
                    heightClass="h-24"
                  />
                </div>
              </Field>
              <Field label="Número de WhatsApp" hint="Solo dígitos, con código de país. Ej: 5218110000000">
                <input
                  type="text"
                  value={contacto.whatsapp}
                  onChange={(e) => updateContacto("whatsapp", e.target.value)}
                  className="w-full max-w-md px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                />
              </Field>
              <Field label="Instagram" hint="URL completa del perfil.">
                <input
                  type="text"
                  value={contacto.instagram_url}
                  onChange={(e) => updateContacto("instagram_url", e.target.value)}
                  className="w-full max-w-md px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                />
              </Field>
              <Field label="Widget de Instagram" hint="Pega la URL del iframe que te da SnapWidget/Elfsight/Behold para mostrar tus publicaciones en Inicio.">
                <input
                  type="text"
                  value={contacto.instagram_widget_url}
                  onChange={(e) => updateContacto("instagram_widget_url", e.target.value)}
                  className="w-full max-w-md px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                />
              </Field>
              <Field label="Facebook" hint="URL completa de la página.">
                <input
                  type="text"
                  value={contacto.facebook_url}
                  onChange={(e) => updateContacto("facebook_url", e.target.value)}
                  className="w-full max-w-md px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                />
              </Field>
              <Field label="Videos de TikTok" hint="Una URL de video por campo (ej: https://www.tiktok.com/@usuario/video/1234567890123456789). Se muestran en Inicio.">
                <div className="flex flex-col gap-2 max-w-md">
                  {contacto.tiktok_urls.map((url, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={url}
                        placeholder="https://www.tiktok.com/@usuario/video/..."
                        onChange={(e) =>
                          updateContacto(
                            "tiktok_urls",
                            contacto.tiktok_urls.map((u, j) => (j === i ? e.target.value : u)),
                          )
                        }
                        className="flex-1 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateContacto("tiktok_urls", contacto.tiktok_urls.filter((_, j) => j !== i))
                        }
                        className="shrink-0 px-2 text-on-surface-variant hover:text-error transition-colors"
                        aria-label="Eliminar video"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateContacto("tiktok_urls", [...contacto.tiktok_urls, ""])}
                    className="self-start flex items-center gap-1 text-primary hover:text-primary-container font-admin-body transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">add</span> Agregar video
                  </button>
                </div>
              </Field>
            </SettingsCard>
          ) : (
            <>
              <SettingsCard icon="home" title="Inicio">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-2 flex flex-col gap-5">
                    <Field label="Título principal" hint="Se muestra en el banner superior de la página principal.">
                      <input
                        type="text"
                        value={settings.hero_titulo}
                        onChange={(e) => update("hero_titulo", e.target.value)}
                        className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                      />
                    </Field>
                    <Field label="Subtítulo" hint={`Texto secundario bajo el título principal. ${settings.hero_subtitulo.length}/120 caracteres.`}>
                      <textarea
                        rows={3}
                        maxLength={120}
                        value={settings.hero_subtitulo}
                        onChange={(e) => update("hero_subtitulo", e.target.value)}
                        className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface resize-none"
                      />
                    </Field>
                    <Field label="Texto del botón principal" hint="Botón que dirige a los productos.">
                      <input
                        type="text"
                        value={settings.hero_cta}
                        onChange={(e) => update("hero_cta", e.target.value)}
                        className="w-full max-w-md px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                      />
                    </Field>
                  </div>
                  <div className="col-span-1 flex flex-col gap-2">
                    <label className="font-admin-label-caps text-on-surface-variant">Imagen de portada</label>
                    <ImageUploader src={settings.hero_imagen_url || null} alt={settings.hero_imagen_alt} onChange={(url) => update("hero_imagen_url", url)} heightClass="h-48" />
                    <input
                      type="text"
                      value={settings.hero_imagen_alt}
                      onChange={(e) => update("hero_imagen_alt", e.target.value)}
                      placeholder="Texto alternativo (accesibilidad)"
                      className="w-full px-3 py-2 text-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                    />
                    <span className="font-admin-data text-outline mt-1 text-center">Recomendado: imagen horizontal, mínimo 1200px de ancho.</span>
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard icon="history_edu" title="Historia">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-2 flex flex-col gap-5">
                    <Field label="Título de la sección">
                      <input
                        type="text"
                        value={settings.historia_titulo}
                        onChange={(e) => update("historia_titulo", e.target.value)}
                        className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                      />
                    </Field>
                    <Field
                      label={
                        <span className="flex justify-between">
                          <span>Texto de la historia</span>
                          <span className="font-admin-data text-outline font-normal">{settings.historia_texto.length} / 1000</span>
                        </span>
                      }
                      hint='Se muestra en la sección "Sobre Nosotros" del sitio público.'
                    >
                      <textarea
                        rows={8}
                        maxLength={1000}
                        value={settings.historia_texto}
                        onChange={(e) => update("historia_texto", e.target.value)}
                        className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface resize-none"
                      />
                    </Field>
                  </div>
                  <div className="col-span-1 flex flex-col gap-2">
                    <label className="font-admin-label-caps text-on-surface-variant">Imagen de Keyli</label>
                    <ImageUploader src={settings.historia_imagen_url || null} alt={settings.historia_imagen_alt} onChange={(url) => update("historia_imagen_url", url)} heightClass="h-48" />
                    <input
                      type="text"
                      value={settings.historia_imagen_alt}
                      onChange={(e) => update("historia_imagen_alt", e.target.value)}
                      placeholder="Texto alternativo (accesibilidad)"
                      className="w-full px-3 py-2 text-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                    />
                    <span className="font-admin-data text-outline mt-1 text-center">Recomendado: 1024x1024px, JPG o PNG.</span>
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard icon="pets" title="Página Nosotros">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-2 flex flex-col gap-2 justify-center">
                    <p className="font-admin-body text-sm text-on-surface-variant">
                      Imagen principal de la página &quot;Nosotros&quot; del sitio público.
                    </p>
                  </div>
                  <div className="col-span-1 flex flex-col gap-2">
                    <label className="font-admin-label-caps text-on-surface-variant">Foto de portada</label>
                    <ImageUploader src={settings.nosotros_imagen_url || null} alt={settings.nosotros_imagen_alt} onChange={(url) => update("nosotros_imagen_url", url)} heightClass="h-48" />
                    <input
                      type="text"
                      value={settings.nosotros_imagen_alt}
                      onChange={(e) => update("nosotros_imagen_alt", e.target.value)}
                      placeholder="Texto alternativo (accesibilidad)"
                      className="w-full px-3 py-2 text-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-admin-body text-on-surface"
                    />
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard icon="verified_user" title="Franja de confianza">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {settings.insignias_confianza.map((badge, i) => (
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
