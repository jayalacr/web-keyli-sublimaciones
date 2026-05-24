import { Sparkle, WhatsAppGlyph } from "@/components/ui/Icons";
import { waLink } from "@/lib/constants";

export function CTAClose() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-cream)", padding: "80px 0" }}
    >
      {/* Background decorative sparkles */}
      <div
        className="absolute top-[18%] right-[6%] pointer-events-none"
        style={{ color: "var(--color-lilac-300)", opacity: .55 }}
      >
        <Sparkle size={90} />
      </div>
      <div
        className="absolute bottom-[12%] left-[4%] pointer-events-none"
        style={{ color: "var(--color-yellow-300)", opacity: .45 }}
      >
        <Sparkle size={70} />
      </div>

      <div
        className="relative z-10"
        style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}
      >
        {/* Yellow note-style card */}
        <div
          style={{
            background: "linear-gradient(180deg, var(--color-yellow-100) 0%, var(--color-yellow-200) 100%)",
            borderRadius: 28,
            padding: "56px 40px",
            textAlign: "center",
            position: "relative",
            maxWidth: 720,
            marginInline: "auto",
            boxShadow: "0 24px 60px -24px rgba(230,175,20,.55), 0 0 0 1px rgba(230,175,20,.25)",
            transform: "rotate(-.5deg)",
          }}
        >
          {/* Tape strip — top left */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", top: -14, left: "18%",
              width: 70, height: 26,
              background: "rgba(94,62,128,.18)",
              border: "1px solid rgba(94,62,128,.22)",
              borderRadius: 2,
              transform: "rotate(-8deg)",
            }}
          />
          {/* Tape strip — top right */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", top: -12, right: "16%",
              width: 70, height: 26,
              background: "rgba(94,62,128,.18)",
              border: "1px solid rgba(94,62,128,.22)",
              borderRadius: 2,
              transform: "rotate(6deg)",
            }}
          />

          <span
            className="block font-display font-bold leading-none"
            style={{ fontSize: 34, color: "var(--color-lilac-700)" }}
          >
            ¿Tienes una idea?
          </span>

          <h2
            className="mt-[10px] mb-[14px]"
            style={{ color: "var(--color-lilac-900)", fontSize: "clamp(30px,4vw,48px)" }}
          >
            La hacemos realidad hoy mismo.
          </h2>

          <p
            className="mx-auto mb-7"
            style={{
              fontSize: 17,
              color: "var(--color-lilac-800)",
              maxWidth: 520,
              opacity: .85,
            }}
          >
            Cuéntanos por WhatsApp qué necesitas: cantidad, fecha y estilo.
            Te respondemos rápido con tu cotización.
          </p>

          <a
            href={waLink("Hola Keyli, quiero pedir algo personalizado.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[10px] px-[22px] py-[14px] rounded-full font-bold text-[15px] text-white transition-transform hover:-translate-y-px"
            style={{ background: "#25D366", boxShadow: "0 6px 18px -4px rgba(37,211,102,.55)" }}
          >
            <WhatsAppGlyph size={20} /> Iniciar mi pedido
          </a>
        </div>
      </div>
    </section>
  );
}
