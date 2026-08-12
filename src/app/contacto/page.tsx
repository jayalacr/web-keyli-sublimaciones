import type { Metadata } from "next";
import { Clock, Truck, WhatsAppGlyph } from "@/components/ui/Icons";
import { SocialRow } from "@/components/ui/SocialRow";
import { waLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp para cotizar tu pedido. Horarios de atención, envíos y redes sociales de Keyli Sublimaciones.",
};

const CARDS = [
  {
    Icon: Clock,
    title: "Horario de atención",
    lines: ["Lunes a sábado", "9:00 am – 7:00 pm"],
  },
  {
    Icon: Truck,
    title: "Envíos",
    lines: ["CDMX y área metropolitana", "Envíos a todo el país"],
  },
];

export default function ContactoPage() {
  return (
    <main>
      <section
        style={{
          background: "linear-gradient(180deg, var(--color-lilac-100) 0%, #ffffff 100%)",
          paddingBlock: "80px 56px",
        }}
      >
        <div style={{ width: "min(760px, 100% - 32px)", marginInline: "auto", textAlign: "center" }}>
          <span
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.14em] rounded-full px-[14px] py-[6px]"
            style={{ background: "white", color: "var(--color-lilac-700)", boxShadow: "0 2px 8px rgba(92,58,140,.08)" }}
          >
            Contacto
          </span>
          <h1
            className="mt-[18px] mb-[14px] font-display font-bold"
            style={{ color: "var(--color-ink)", fontSize: "clamp(36px,5vw,56px)" }}
          >
            Hablemos de tu proyecto
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--color-ink-soft)" }}>
            La forma más rápida de cotizar es por WhatsApp: cuéntanos qué necesitas,
            cantidad y fecha, y te respondemos con tu propuesta.
          </p>

          <a
            href={waLink("Hola Keyli, quiero más información.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-[10px] px-[26px] py-[16px] rounded-full font-bold text-[16px] text-white transition-transform hover:-translate-y-px"
            style={{ background: "#25D366", boxShadow: "0 8px 22px -6px rgba(37,211,102,.55)" }}
          >
            <WhatsAppGlyph size={22} /> Escribir por WhatsApp
          </a>
        </div>
      </section>

      <section style={{ paddingBlock: "0 80px" }}>
        <div
          style={{
            width: "min(900px, 100% - 32px)",
            marginInline: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {CARDS.map(({ Icon, title, lines }) => (
            <div
              key={title}
              style={{
                background: "var(--color-lilac-50)",
                border: "1px solid var(--color-lilac-200)",
                borderRadius: 20,
                padding: "28px 24px",
              }}
            >
              <div
                className="mb-4 grid place-items-center rounded-full"
                style={{ width: 44, height: 44, background: "white", color: "var(--color-lilac-700)" }}
              >
                <Icon size={20} />
              </div>
              <div className="font-bold mb-1" style={{ color: "var(--color-ink)", fontSize: 16 }}>
                {title}
              </div>
              {lines.map((line) => (
                <div key={line} style={{ fontSize: 14, color: "var(--color-ink-soft)" }}>
                  {line}
                </div>
              ))}
            </div>
          ))}

          <div
            style={{
              background: "var(--color-lilac-50)",
              border: "1px solid var(--color-lilac-200)",
              borderRadius: 20,
              padding: "28px 24px",
            }}
          >
            <div className="font-bold mb-3" style={{ color: "var(--color-ink)", fontSize: 16 }}>
              Síguenos
            </div>
            <SocialRow size={40} iconSize={17} />
          </div>
        </div>
      </section>
    </main>
  );
}
