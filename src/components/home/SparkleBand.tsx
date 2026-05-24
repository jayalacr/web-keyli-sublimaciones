import { Sparkle } from "@/components/ui/Icons";

const ITEMS = [
  "Sublimación full color", "DTF para textil", "Trabajos digitales", "Envíos a todo México",
  "Diseño incluido", "Pedidos por WhatsApp",
  "Sublimación full color", "DTF para textil", "Trabajos digitales", "Envíos a todo México",
  "Diseño incluido", "Pedidos por WhatsApp",
];

export function SparkleBand() {
  return (
    <div
      className="overflow-hidden"
      style={{
        background: "var(--color-lilac-700)",
        color: "white",
        padding: "10px 0",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: ".04em",
      }}
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: "marquee 26s linear infinite" }}
      >
        {ITEMS.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-[10px]">
            <Sparkle size={10} color="var(--color-yellow-200)" />
            {it}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
