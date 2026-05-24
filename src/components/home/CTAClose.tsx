import { Sparkle, WhatsAppGlyph } from "@/components/ui/Icons";
import { waLink } from "@/lib/constants";

export function CTAClose() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--color-lilac-700) 0%, var(--color-lilac-800) 100%)",
        color: "white",
        padding: "80px 0",
      }}
    >
      {/* Decorative background sparkles */}
      <div
        className="absolute top-[20%] right-[8%] pointer-events-none"
        style={{ color: "var(--color-yellow-200)", opacity: .25 }}
      >
        <Sparkle size={120} />
      </div>
      <div
        className="absolute bottom-[10%] left-[5%] pointer-events-none"
        style={{ color: "var(--color-yellow-200)", opacity: .2 }}
      >
        <Sparkle size={80} />
      </div>

      {/* Content */}
      <div
        className="relative z-10 text-center"
        style={{ width: "min(1240px, 100% - 32px)", marginInline: "auto" }}
      >
        <span
          className="block font-display font-bold"
          style={{ fontSize: 32, color: "#FFE066" }}
        >
          ¿Tienes una idea?
        </span>

        <h2
          className="mt-2 mb-4"
          style={{ color: "white", fontSize: "clamp(32px,4vw,52px)" }}
        >
          La hacemos realidad hoy mismo.
        </h2>

        <p
          className="mb-8 mx-auto"
          style={{ fontSize: 18, color: "rgba(255,255,255,.85)", maxWidth: 560 }}
        >
          Cuéntanos por WhatsApp qué necesitas: cantidad, fecha y estilo.
          Te respondemos rápido con tu cotización.
        </p>

        <a
          href={waLink("Hola Keyli, quiero pedir algo personalizado.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[10px] px-[22px] py-[14px] rounded-full font-bold text-[15px] transition-transform hover:-translate-y-px"
          style={{
            background: "var(--color-yellow-200)",
            color: "var(--color-lilac-900)",
            boxShadow: "0 6px 16px -6px rgba(255,201,38,.55)",
          }}
        >
          <WhatsAppGlyph size={20} /> Iniciar mi pedido
        </a>
      </div>
    </section>
  );
}
