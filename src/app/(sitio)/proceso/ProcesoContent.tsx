"use client";

import { useState } from "react";
import { waLink } from "@/lib/constants";

const STEPS = [
  { title: "Cotiza tu idea", icon: "chat", desc: "Escríbenos por WhatsApp con el producto, cantidad y referencias o foto del diseño. Aprobamos la mockup contigo." },
  { title: "Apartamos y producimos", icon: "precision_manufacturing", desc: "Separas tu pedido con el 50% del total y comenzamos la producción. Te compartimos el avance." },
  { title: "Recibe tu pedido", icon: "local_shipping", desc: "Liquidas el 50% restante y entregamos en domicilio, punto acordado o envío nacional." },
];

const PAYMENT_METHODS = [
  { title: "Transferencia", desc: "BBVA, Banamex, Santander · Cuenta proporcionada por WhatsApp", icon: "account_balance" },
  { title: "Depósito en efectivo", desc: "OXXO, BBVA, sucursales bancarias", icon: "payments" },
  { title: "Efectivo a la entrega", desc: "Solo para entregas en persona dentro de Monterrey y área metropolitana", icon: "credit_card" },
];

const CANCELLATION_POLICY = [
  { title: "Antes de aprobar diseño", status: "Cancelación libre", tone: "ok", body: "Si aún no se aprueba la mockup ni se ha apartado, puedes cancelar sin costo." },
  { title: "Después de aprobar diseño y apartar", status: "Reembolso parcial", tone: "warn", body: "Se reembolsa el 70% del apartado. El 30% cubre diseño y materiales preparados." },
  { title: "Pedido en producción", status: "Sin reembolso", tone: "danger", body: "Una vez impreso el diseño no es posible cancelar. Puedes recoger el pedido o redirigirlo." },
  { title: "Cambios de diseño tras aprobar", status: "Aplica re-cotización", tone: "warn", body: "Si necesitas modificar arte/talla después de aprobar, se cotiza nuevamente desde el paso 2." },
] as const;

const TONE_CLASSES = {
  ok: "border-success/40 bg-success/10 text-success",
  warn: "border-tertiary/40 bg-tertiary-fixed text-on-tertiary-fixed-variant",
  danger: "border-error/40 bg-error-container text-on-error-container",
};

const FAQS = [
  { q: "¿Puedo hacer mi compra directamente desde la página?", a: "No. Todos los pedidos se realizan por WhatsApp porque el precio cambia según el diseño, técnica, cantidad y tiempo de entrega. La página es tu catálogo y referencia." },
  { q: "¿Hay pedido mínimo?", a: "Para piezas únicas no. Para algunos productos como llaveros o vinil aplica pedido mínimo; te lo confirmamos al cotizar." },
  { q: "¿Cuánto tarda mi pedido?", a: "Depende del producto, la cantidad y la temporada. Te confirmamos el tiempo estimado antes de apartar para que llegue cuando lo necesitas." },
  { q: "¿Hacen envíos?", a: "Sí, a toda la república por paquetería. Monterrey y área metropolitana con repartidor local. Envío se cobra aparte y se confirma en cotización." },
  { q: "¿Y si mi diseño no es muy bueno?", a: "No te preocupes. Te ayudamos a mejorarlo o lo rediseñamos sin costo si es ajuste menor. Diseño desde cero se cotiza aparte." },
];

export function ProcesoContent({ whatsapp }: { whatsapp: string }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* Hero */}
      <section className="w-full px-container-margin pt-section-gap-mobile lg:pt-section-gap-desktop pb-stack-md text-center">
        <span className="font-label-caps text-secondary tracking-widest uppercase">Cómo trabajamos contigo</span>
        <h1 className="font-display-md mt-3 mb-4">De tu idea a tu pedido, en tres pasos simples</h1>
        <p className="font-body-main text-on-surface-variant max-w-2xl mx-auto">
          Así es como producimos tu pedido personalizado, del primer mensaje a la entrega.
        </p>
      </section>

      {/* Steps */}
      <section className="w-full px-container-margin py-section-gap-mobile lg:py-section-gap-desktop">
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-grid-gutter">
          <div className="hidden sm:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-outline-variant/40" />
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined">{step.icon}</span>
              </div>
              <span className="font-label-caps text-xs text-on-surface-variant">Paso {i + 1}</span>
              <h3 className="font-body-main font-semibold">{step.title}</h3>
              <p className="font-body-secondary text-on-surface-variant text-sm max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Payment methods */}
      <section className="w-full px-container-margin py-section-gap-mobile lg:py-section-gap-desktop bg-surface-container-low">
        <div className="text-center mb-stack-md">
          <span className="font-label-caps text-secondary tracking-widest uppercase">Pago</span>
          <h2 className="font-display-sm-mobile mt-3 mb-2">Métodos de pago aceptados</h2>
          <p className="font-body-main text-on-surface-variant max-w-xl mx-auto">
            50% al apartar · 50% al entregar. Confirmas el pago enviándonos foto del comprobante por WhatsApp.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-grid-gutter max-w-4xl mx-auto">
          {PAYMENT_METHODS.map((m) => (
            <div key={m.title} className="bg-surface-container-lowest rounded-lg p-6 text-center border border-outline-variant/20">
              <span className="material-symbols-outlined text-3xl text-primary mb-2">{m.icon}</span>
              <h4 className="font-body-main font-semibold mb-1">{m.title}</h4>
              <p className="font-body-secondary text-on-surface-variant text-sm">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cancellation policy */}
      <section className="w-full px-container-margin py-section-gap-mobile lg:py-section-gap-desktop max-w-3xl mx-auto">
        <h2 className="font-display-sm-mobile mb-2">Política de cancelaciones y cambios</h2>
        <p className="font-body-main text-on-surface-variant mb-stack-md">
          Trabajamos con producción bajo pedido: cada diseño es único. Por eso las reglas de cancelación dependen del momento en que solicites cancelar.
        </p>
        <div className="flex flex-col gap-4">
          {CANCELLATION_POLICY.map((c) => (
            <div key={c.title} className={`rounded-lg border-l-4 p-4 ${TONE_CLASSES[c.tone]}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h4 className="font-body-main font-semibold text-on-surface">{c.title}</h4>
                <span className="font-label-caps text-xs px-3 py-1 rounded-full bg-surface-container-lowest">{c.status}</span>
              </div>
              <p className="font-body-secondary text-on-surface-variant text-sm">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full px-container-margin py-section-gap-mobile lg:py-section-gap-desktop bg-surface-container-low">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display-sm-mobile mb-2">Preguntas frecuentes</h2>
          <p className="font-body-main text-on-surface-variant mb-stack-md">
            Lo que la mayoría nos pregunta. Si tu duda no aparece, pregúntanos por WhatsApp.
          </p>
          <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/20 overflow-hidden">
            {FAQS.map((f, i) => (
              <div key={f.q} className={i < FAQS.length - 1 ? "border-b border-outline-variant/20" : ""}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-body-main font-semibold"
                >
                  <span>{f.q}</span>
                  <span
                    className={`material-symbols-outlined text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === i && (
                  <p className="font-body-secondary text-on-surface-variant px-6 pb-4">{f.a}</p>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-stack-md">
            <p className="font-body-secondary text-on-surface-variant mb-3">¿No encontraste tu respuesta?</p>
            <a
              href={waLink(whatsapp, "Hola Keyli, tengo una duda.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-label-caps hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chat</span> Pregúntanos por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
