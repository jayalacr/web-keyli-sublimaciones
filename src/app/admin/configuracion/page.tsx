"use client";

import { useState } from "react";
import { PHONE } from "@/lib/constants";

const SECTIONS = [
  { id: "contacto",  label: "Contacto y WhatsApp" },
  { id: "redes",     label: "Redes sociales" },
  { id: "negocio",   label: "Información del negocio" },
] as const;

type SectionId = typeof SECTIONS[number]["id"];

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  prefix?: string;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(30,15,60,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", border: "1px solid #ECE4F4", borderRadius: 10, background: "#FAFAFA", overflow: "hidden" }}>
        {prefix && (
          <span style={{ padding: "0 12px", fontSize: 12, color: "rgba(30,15,60,.35)", borderRight: "1px solid #ECE4F4", background: "#F3EDF8", alignSelf: "stretch", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ flex: 1, padding: "10px 14px", border: "none", background: "transparent", fontSize: 13, color: "#1E0F3C", outline: "none" }}
        />
      </div>
    </label>
  );
}

function SaveToast({ show }: { show: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 200,
        background: "#14532D",
        color: "white",
        padding: "12px 22px",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 700,
        boxShadow: "0 8px 24px -6px rgba(0,0,0,.25)",
        transform: show ? "translateY(0)" : "translateY(80px)",
        opacity: show ? 1 : 0,
        transition: "transform .25s, opacity .25s",
        pointerEvents: "none",
      }}
    >
      ✓ Configuración guardada (demo)
    </div>
  );
}

export default function ConfiguracionAdmin() {
  const [section, setSection] = useState<SectionId>("contacto");
  const [toast, setToast] = useState(false);

  const [contacto, setContacto] = useState({
    phone:    PHONE,
    greeting: "Hola Keyli, me interesa un pedido.",
    email:    "keyli@example.com",
    address:  "Ciudad de México, CDMX",
  });

  const [redes, setRedes] = useState({
    instagram: "keylisublimaciones",
    facebook:  "keylisublimaciones",
    tiktok:    "keylisublimaciones",
  });

  const [negocio, setNegocio] = useState({
    name:     "Keyli Sublimaciones",
    tagline:  "Sublimaciones y estampado personalizado",
    metaDesc: "Playeras, tazas y más con tu diseño favorito. Hecho en México.",
    currency: "MXN",
  });

  const handleSave = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1E0F3C" }}>Configuración</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(30,15,60,.45)" }}>Ajustes generales del sitio y negocio</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20, alignItems: "start" }} className="config-layout">
        {/* Sidebar nav */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #ECE4F4", padding: 8, display: "flex", flexDirection: "column", gap: 2 }}>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                textAlign: "left",
                fontSize: 13,
                fontWeight: section === s.id ? 700 : 500,
                color: section === s.id ? "#5C3A8C" : "rgba(30,15,60,.55)",
                background: section === s.id ? "#F0EBF8" : "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Form panel */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #ECE4F4", padding: 28, boxShadow: "0 1px 4px rgba(92,58,140,.06)" }}>
          {section === "contacto" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#1E0F3C" }}>Contacto y WhatsApp</h2>
              <Field
                label="Número de WhatsApp"
                value={contacto.phone}
                onChange={(v) => setContacto((f) => ({ ...f, phone: v }))}
                prefix="52"
                placeholder="5512345678"
              />
              <Field
                label="Saludo predeterminado"
                value={contacto.greeting}
                onChange={(v) => setContacto((f) => ({ ...f, greeting: v }))}
                placeholder="Hola Keyli, me interesa un pedido."
              />
              <Field
                label="Correo de contacto"
                value={contacto.email}
                onChange={(v) => setContacto((f) => ({ ...f, email: v }))}
                type="email"
              />
              <Field
                label="Dirección / Zona de cobertura"
                value={contacto.address}
                onChange={(v) => setContacto((f) => ({ ...f, address: v }))}
              />
            </div>
          )}

          {section === "redes" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#1E0F3C" }}>Redes sociales</h2>
              <Field label="Instagram" value={redes.instagram} onChange={(v) => setRedes((f) => ({ ...f, instagram: v }))} prefix="instagram.com/" />
              <Field label="Facebook"  value={redes.facebook}  onChange={(v) => setRedes((f) => ({ ...f, facebook:  v }))} prefix="facebook.com/" />
              <Field label="TikTok"    value={redes.tiktok}    onChange={(v) => setRedes((f) => ({ ...f, tiktok:    v }))} prefix="tiktok.com/@" />
            </div>
          )}

          {section === "negocio" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#1E0F3C" }}>Información del negocio</h2>
              <Field label="Nombre del negocio" value={negocio.name}     onChange={(v) => setNegocio((f) => ({ ...f, name: v }))} />
              <Field label="Tagline"             value={negocio.tagline}  onChange={(v) => setNegocio((f) => ({ ...f, tagline: v }))} />
              <Field label="Meta descripción"    value={negocio.metaDesc} onChange={(v) => setNegocio((f) => ({ ...f, metaDesc: v }))} />
              <Field label="Moneda"              value={negocio.currency} onChange={(v) => setNegocio((f) => ({ ...f, currency: v }))} />
            </div>
          )}

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #F0EBF8", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSave}
              style={{ padding: "11px 26px", borderRadius: 12, fontSize: 13, fontWeight: 700, background: "#5C3A8C", color: "white", border: "none", cursor: "pointer" }}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .config-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <SaveToast show={toast} />
    </div>
  );
}
