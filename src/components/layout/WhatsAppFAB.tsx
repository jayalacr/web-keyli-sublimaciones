import { WhatsAppGlyph } from "@/components/ui/Icons";
import { waLink } from "@/lib/constants";

interface WhatsAppFABProps {
  message?: string;
}

export function WhatsAppFAB({ message = "Hola Keyli, me interesa hacer un pedido." }: WhatsAppFABProps) {
  return (
    <>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir por WhatsApp"
        className="wa-fab"
      >
        <WhatsAppGlyph size={32} />
      </a>

      <style>{`
        .wa-fab {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 50;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #25D366;
          color: white;
          display: grid;
          place-items: center;
          box-shadow: 0 10px 28px -6px rgba(37,211,102,.55), 0 4px 12px rgba(0,0,0,.08);
          transition: transform .2s ease;
          text-decoration: none;
        }
        .wa-fab:hover { transform: scale(1.06); }
        .wa-fab::after {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(37,211,102,.4);
          animation: wa-ping 2s ease-out infinite;
        }
        @keyframes wa-ping {
          0%   { transform: scale(.9);  opacity: 1; }
          100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>
    </>
  );
}
