import { waLink } from "@/lib/constants";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { Destellos } from "@/components/Marca";

const STEPS = [
  { title: "Cotiza tu idea", icon: "chat", desc: "Escríbenos por WhatsApp con el producto, la cantidad y tus referencias o foto. Aprobamos el diseño (mockup) contigo." },
  { title: "Apartamos y producimos", icon: "precision_manufacturing", desc: "Separas tu pedido con el 50% del total y comenzamos la producción. Te compartimos el avance." },
  { title: "Recibe tu pedido", icon: "local_shipping", desc: "Liquidas el 50% restante y entregamos en domicilio, punto acordado o envío nacional." },
];

const PAYMENT_METHODS = [
  { title: "Transferencia", desc: "BBVA, Banamex, Santander · Cuenta proporcionada por WhatsApp", icon: "account_balance" },
  { title: "Depósito en efectivo", desc: "OXXO, BBVA, sucursales bancarias", icon: "payments" },
  { title: "Efectivo a la entrega", desc: "Solo para entregas en persona dentro de Monterrey y área metropolitana", icon: "handshake" },
];

const CANCELLATION_POLICY = [
  { title: "Antes de aprobar diseño", status: "Cancelación libre", tone: "ok", icon: "check_circle", body: "Si aún no se aprueba la mockup ni se ha apartado, puedes cancelar sin costo." },
  { title: "Después de aprobar diseño y apartar", status: "Reembolso parcial", tone: "warn", icon: "info", body: "Se reembolsa el 70% del apartado. El 30% cubre diseño y materiales preparados." },
  { title: "Pedido en producción", status: "Sin reembolso", tone: "danger", icon: "block", body: "Una vez impreso el diseño no es posible cancelar. Puedes recoger el pedido o redirigirlo." },
  { title: "Cambios de diseño tras aprobar", status: "Aplica re-cotización", tone: "warn", icon: "edit", body: "Si necesitas modificar arte o talla después de aprobar, se cotiza nuevamente desde el paso 2." },
] as const;

const TONE_CLASSES = {
  ok: "bg-success/10 text-success",
  warn: "bg-accent/40 text-primary-strong",
  danger: "bg-error-container text-on-error-container",
};

const FAQS = [
  { q: "¿Puedo hacer mi compra directamente desde la página?", a: "No. Todos los pedidos se realizan por WhatsApp porque el precio cambia según el diseño, técnica, cantidad y tiempo de entrega. La página es tu catálogo y referencia." },
  { q: "¿Hay pedido mínimo?", a: "Para piezas únicas no. Para algunos productos como llaveros o vinil aplica pedido mínimo; te lo confirmamos al cotizar." },
  { q: "¿Cuánto tarda mi pedido?", a: "Depende del producto, la cantidad y la temporada. Te confirmamos el tiempo estimado antes de apartar para que llegue cuando lo necesitas." },
  { q: "¿Hacen envíos?", a: "Sí, a toda la república por paquetería. Monterrey y área metropolitana con repartidor local. Envío se cobra aparte y se confirma en cotización." },
  { q: "¿Y si mi diseño no es muy bueno?", a: "No te preocupes. Te ayudamos a mejorarlo o lo rediseñamos sin costo si es ajuste menor. Diseño desde cero se cotiza aparte." },
];

const GIROS = ["-1.5deg", "1.2deg", "-0.8deg"];

export function ProcesoContent({ whatsapp }: { whatsapp: string }) {
  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* Hero */}
      <section className="tapete w-full pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="px-container-margin max-w-[1440px] mx-auto flex flex-col items-start gap-6">
          <span className="entrada font-label-caps text-primary" style={{ "--i": 0 } as React.CSSProperties}>
            Cómo trabajamos contigo
          </span>
          <h1 className="entrada font-display-lg text-on-surface leading-[0.95] max-w-4xl" style={{ "--i": 1 } as React.CSSProperties}>
            De tu idea a tu pedido en <span className="marca">tres pasos</span>
            <Destellos className="inline-block w-[0.55em] h-[0.5em] ml-2 align-top" />
          </h1>
          <p className="entrada font-body-main text-on-surface-variant max-w-2xl" style={{ "--i": 2 } as React.CSSProperties}>
            Así producimos tu pedido personalizado, del primer mensaje a la entrega.
          </p>
        </div>
      </section>

      {/* Pasos: stickers unidos por una línea de corte */}
      <section className="w-full px-container-margin py-section-gap-mobile">
        <ol className="relative max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <span
            aria-hidden="true"
            className="absolute left-7 top-8 bottom-8 border-l-2 border-dashed border-primary/35 md:left-[16%] md:right-[16%] md:top-7 md:bottom-auto md:border-l-0 md:border-t-2"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="revela relative flex md:flex-col items-start md:items-center gap-5 md:text-center">
              <span className="relative z-10 shrink-0 w-14 h-14 rounded-full bg-accent text-primary-strong font-display-sm-mobile text-[26px] flex items-center justify-center ring-[6px] ring-surface">
                {i + 1}
              </span>
              <div
                className="sticker flex-1 w-full flex flex-col md:items-center gap-3 p-6 rounded-[24px] bg-surface-container-lowest"
                style={{ "--giro": GIROS[i] } as React.CSSProperties}
              >
                <span className="material-symbols-outlined text-primary text-[28px]" aria-hidden="true">{step.icon}</span>
                <h2 className="font-display-sm-mobile text-[24px] text-on-surface">{step.title}</h2>
                <p className="font-body-secondary text-on-surface-variant max-w-xs">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Pago */}
      <section className="w-full px-container-margin pb-section-gap-mobile">
        <div className="rounded-[36px] bg-surface-tint-soft px-6 py-14 md:px-14 md:py-16 max-w-[1440px] mx-auto">
          <div className="revela text-center flex flex-col items-center gap-3 mb-10">
            <span className="font-label-caps text-primary">Pago</span>
            <h2 className="font-display-md text-on-surface">Métodos de pago</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <span className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-caps">50% al apartar</span>
              <span className="px-5 py-2 rounded-full bg-accent text-primary-strong font-label-caps">50% al entregar</span>
            </div>
            <p className="font-body-main text-on-surface-variant max-w-xl">
              Confirmas el pago enviándonos foto del comprobante por WhatsApp.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {PAYMENT_METHODS.map((m) => (
              <li key={m.title} className="revela flex flex-col items-center text-center gap-3 p-6 rounded-[24px] bg-surface-container-lowest">
                <span className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined" aria-hidden="true">{m.icon}</span>
                </span>
                <h3 className="font-display-sm-mobile text-[22px] text-on-surface">{m.title}</h3>
                <p className="font-body-secondary text-on-surface-variant">{m.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Política de cancelaciones */}
      <section className="w-full px-container-margin pb-section-gap-mobile">
        <div className="max-w-3xl mx-auto">
          <div className="revela flex flex-col gap-2 mb-8">
            <span className="font-label-caps text-primary">Sin sorpresas</span>
            <h2 className="font-display-md text-on-surface">Cancelaciones y cambios</h2>
            <p className="font-body-main text-on-surface-variant">
              Trabajamos bajo pedido: cada diseño es único. Por eso las reglas dependen del momento en que
              solicites cancelar.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {CANCELLATION_POLICY.map((c) => (
              <li key={c.title} className="revela flex gap-4 p-5 rounded-[20px] bg-surface-container-lowest border-2 border-outline-variant/30">
                <span className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${TONE_CLASSES[c.tone]}`}>
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{c.icon}</span>
                </span>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-body-main font-semibold text-on-surface">{c.title}</h3>
                    <span className={`font-label-caps text-[10px] px-2.5 py-1 rounded-full ${TONE_CLASSES[c.tone]}`}>{c.status}</span>
                  </div>
                  <p className="font-body-secondary text-on-surface-variant">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Preguntas frecuentes — <details> nativo: accesible y sin JavaScript */}
      <section className="tapete w-full px-container-margin py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-3xl mx-auto">
          <div className="revela flex flex-col gap-2 mb-8 text-center items-center">
            <span className="font-label-caps text-primary">Dudas</span>
            <h2 className="font-display-md text-on-surface">Preguntas <span className="marca">frecuentes</span></h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="revela group rounded-[20px] bg-surface-container-lowest border-2 border-outline-variant/30 open:border-primary/40 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 min-h-14 px-6 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-body-main font-semibold text-on-surface">
                  {f.q}
                  <span className="shrink-0 w-8 h-8 rounded-full bg-surface-tint-soft text-primary flex items-center justify-center transition-transform group-open:rotate-45">
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">add</span>
                  </span>
                </summary>
                <p className="font-body-main text-on-surface-variant px-6 pb-5">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="w-full px-container-margin py-section-gap-mobile">
        <div className="tapete-oscuro relative overflow-hidden rounded-[36px] bg-primary-strong text-white px-6 py-16 md:py-20 max-w-[1440px] mx-auto">
          <Destellos className="absolute top-8 right-8 w-12 h-12 md:w-16 md:h-16" />
          <div className="revela relative flex flex-col items-center text-center gap-stack-md max-w-2xl mx-auto">
            <h2 className="font-display-md text-white">¿No encontraste tu respuesta?</h2>
            <p className="font-body-main text-white/85">Escríbenos y te ayudamos con lo que necesites.</p>
            <a
              href={waLink(whatsapp, "¡Hola! Tengo una duda sobre su proceso.")}
              target="_blank"
              rel="noopener noreferrer"
              className="boton-sticker mt-2 inline-flex items-center gap-2 min-h-12 px-8 py-4 rounded-full bg-accent text-primary-strong font-label-caps"
            >
              {SOCIAL_ICONS.whatsapp}
              Pregúntanos por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
