// =============================================================
// Keyli — Process & Admin screens
// =============================================================

// -----------------------------------------------------------
// Process Screen (compra + cancelación + faq)
// -----------------------------------------------------------

const ProcessScreen = ({ route }) => {
  const D = window.KEYLI_DATA;
  const initialTab = route.query.tab || "compra";
  const [tab, setTab] = useState(initialTab);

  useEffect(() => { setTab(route.query.tab || "compra"); }, [route.query.tab]);

  return (
    <main>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(180deg, var(--lilac-100) 0%, #ffffff 100%)",
        paddingBlock: "80px 56px",
        position: "relative", overflow:"hidden"
      }}>
        <div style={{position:"absolute", top:"15%", right:"6%", color:"var(--yellow-400)"}}>
          <Sparkle size={48} className="sparkle-anim"/>
        </div>
        <div style={{position:"absolute", bottom:"20%", left:"4%", color:"var(--yellow-400)"}}>
          <Sparkle size={28} className="sparkle-anim"/>
        </div>

        <div className="shell center" style={{maxWidth: 720, position:"relative"}}>
          <span className="eyebrow"><Sparkle size={10}/> Cómo trabajamos contigo</span>
          <h1 style={{marginTop: 12, marginBottom: 16}}>
            Tu pedido <span className="script" style={{color:"var(--lilac-700)", fontSize:"1.1em"}}>paso a paso</span>
          </h1>
          <p style={{fontSize: 18, color:"var(--ink-soft)"}}>
            Para que todo salga perfecto, así es como producimos tu pedido personalizado.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section style={{borderBottom: "1px solid var(--line)", background: "white", position: "sticky", top: 73, zIndex: 20}}>
        <div className="shell" style={{display:"flex", gap: 4, overflowX: "auto"}}>
          {[
            { id: "compra", label: "Proceso de compra" },
            { id: "cancelacion", label: "Cancelaciones" },
            { id: "faq", label: "Preguntas frecuentes" }
          ].map(t => (
            <button key={t.id}
              onClick={() => { setTab(t.id); window.location.hash = `#/proceso?tab=${t.id}`; }}
              style={{
                padding: "16px 24px",
                fontWeight: 700, fontSize: 14,
                color: tab === t.id ? "var(--lilac-700)" : "var(--ink-soft)",
                borderBottom: tab === t.id ? "3px solid var(--lilac-700)" : "3px solid transparent",
                whiteSpace: "nowrap"
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {tab === "compra" && <CompraTab />}
      {tab === "cancelacion" && <CancelacionTab />}
      {tab === "faq" && <FaqTab />}
    </main>
  );
};

// -----------------------------------------------------------
// Compra Tab
// -----------------------------------------------------------

const CompraTab = () => {
  const D = window.KEYLI_DATA;
  return (
    <>
      <section className="section">
        <div className="shell">
          {D.buyingSteps.map((step, i) => (
            <div key={step.n} style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: 32,
              alignItems: "center",
              padding: "32px 0",
              borderBottom: i < D.buyingSteps.length - 1 ? "1px solid var(--lilac-100)" : "none",
              position: "relative"
            }} className="step-row">
              {/* Big script number */}
              <div style={{
                width: 120, height: 120,
                borderRadius: "50%",
                background: i === 0 ? "linear-gradient(135deg, var(--yellow-300) 0%, var(--yellow-500) 100%)" : `linear-gradient(135deg, var(--lilac-${300 + i*100}) 0%, var(--lilac-${500 + i*50}) 100%)`,
                display: "grid", placeItems: "center",
                fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 700,
                color: i === 0 ? "var(--lilac-900)" : "white",
                boxShadow: "0 20px 40px -12px rgba(92, 58, 140, 0.3)"
              }} className="step-bubble">
                {step.n}
              </div>

              <div>
                <div style={{display:"flex", alignItems:"center", gap: 12, marginBottom: 10}}>
                  <h3 style={{margin: 0}}>{step.title}</h3>
                  <span className="chip chip-yellow" style={{fontSize: 12}}>
                    <Clock size={11}/> {step.time}
                  </span>
                </div>
                <p style={{fontSize: 16, color:"var(--ink-soft)", lineHeight: 1.6, maxWidth: 580}}>
                  {step.desc}
                </p>
              </div>

              <StepIllustration kind={step.icon}/>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 760px) {
            .step-row { grid-template-columns: 1fr !important; text-align: center; }
            .step-bubble { margin-inline: auto !important; width: 80px !important; height: 80px !important; font-size: 40px !important; }
            .step-row > div:last-child { display: none; }
          }
        `}</style>
      </section>

      {/* Payment methods */}
      <section className="section-tight" style={{background:"var(--lilac-50)"}}>
        <div className="shell">
          <div style={{textAlign:"center", marginBottom: 40}}>
            <span className="eyebrow"><Sparkle size={10}/> Pago</span>
            <h2 style={{marginTop: 12}}>Métodos de pago aceptados</h2>
            <p className="muted" style={{maxWidth: 520, marginInline:"auto", marginTop: 8}}>
              50% al apartar · 50% al entregar. Confirmas el pago enviándonos foto del comprobante por WhatsApp.
            </p>
          </div>

          <div className="grid-3">
            {[
              { t: "Transferencia", d: "BBVA, Banamex, Santander · Cuenta proporcionada por WhatsApp", icon: "🏦" },
              { t: "Depósito en efectivo", d: "OXXO, BBVA, sucursales bancarias", icon: "💵" },
              { t: "Efectivo a la entrega", d: "Solo para entregas en persona dentro de CDMX", icon: "💳" }
            ].map(m => (
              <div key={m.t} className="card" style={{padding: 28, textAlign:"center"}}>
                <div style={{fontSize: 40, marginBottom: 12}}>{m.icon}</div>
                <h4 style={{marginBottom: 6}}>{m.t}</h4>
                <p className="muted" style={{fontSize: 14}}>{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAClose/>
    </>
  );
};

const StepIllustration = ({ kind }) => {
  const inner = {
    chat: (
      <g>
        <rect x="14" y="20" width="60" height="36" rx="8" fill="#5C3A8C"/>
        <circle cx="28" cy="38" r="3" fill="white"/>
        <circle cx="40" cy="38" r="3" fill="white"/>
        <circle cx="52" cy="38" r="3" fill="white"/>
        <path d="M30 56 L26 64 L40 56 Z" fill="#5C3A8C"/>
      </g>
    ),
    preview: (
      <g>
        <rect x="16" y="18" width="56" height="44" rx="6" fill="white" stroke="#5C3A8C" strokeWidth="2.5"/>
        <circle cx="34" cy="38" r="10" fill="#FFD84D"/>
        <rect x="22" y="54" width="20" height="3" fill="#5C3A8C"/>
        <rect x="46" y="54" width="14" height="3" fill="#CAB0EC"/>
      </g>
    ),
    wallet: (
      <g>
        <rect x="14" y="24" width="60" height="40" rx="6" fill="#5C3A8C"/>
        <rect x="14" y="32" width="60" height="6" fill="#3E2566"/>
        <circle cx="60" cy="50" r="6" fill="#FFD84D"/>
      </g>
    ),
    factory: (
      <g>
        <rect x="18" y="34" width="14" height="30" fill="#5C3A8C"/>
        <rect x="36" y="20" width="14" height="44" fill="#5C3A8C"/>
        <rect x="54" y="28" width="14" height="36" fill="#5C3A8C"/>
        <circle cx="25" cy="14" r="5" fill="#FFD84D"/>
      </g>
    ),
    truck: (
      <g>
        <rect x="10" y="32" width="36" height="22" rx="2" fill="#5C3A8C"/>
        <path d="M46 38 L62 38 L72 48 L72 54 L46 54 Z" fill="#CAB0EC"/>
        <circle cx="22" cy="58" r="5" fill="#3E2566"/>
        <circle cx="60" cy="58" r="5" fill="#3E2566"/>
        <rect x="50" y="42" width="14" height="8" fill="#FFD84D"/>
      </g>
    )
  }[kind];

  return (
    <div style={{flexShrink: 0}}>
      <svg width="100" height="80" viewBox="0 0 88 80">
        {inner}
      </svg>
    </div>
  );
};

// -----------------------------------------------------------
// Cancelacion Tab
// -----------------------------------------------------------

const CancelacionTab = () => {
  const D = window.KEYLI_DATA;
  const toneColors = {
    ok:     { bg: "#DCFCE7", text: "#14532D", border: "#86EFAC", icon: "✓" },
    warn:   { bg: "#FEF3C7", text: "#78350F", border: "#FCD34D", icon: "!" },
    danger: { bg: "#FECACA", text: "#7F1D1D", border: "#F87171", icon: "×" }
  };

  return (
    <section className="section">
      <div className="shell" style={{maxWidth: 920}}>
        <div style={{marginBottom: 40}}>
          <h2 style={{marginBottom: 12}}>Política de cancelaciones y cambios</h2>
          <p style={{fontSize: 16, color:"var(--ink-soft)", lineHeight: 1.6}}>
            Trabajamos con producción bajo pedido: cada diseño es único. Por eso las reglas de cancelación dependen del momento en que solicites cancelar.
          </p>
        </div>

        {/* Timeline */}
        <div style={{position:"relative", paddingLeft: 32}}>
          <div style={{
            position:"absolute", left: 11, top: 8, bottom: 8,
            width: 2, background: "var(--lilac-200)"
          }}/>

          {D.cancellationPolicy.map((c, i) => {
            const tone = toneColors[c.tone];
            return (
              <div key={i} style={{position:"relative", paddingBottom: 32}}>
                <div style={{
                  position:"absolute", left: -32, top: 4,
                  width: 24, height: 24, borderRadius: "50%",
                  background: tone.bg, border: `2px solid ${tone.border}`,
                  display: "grid", placeItems:"center",
                  color: tone.text, fontWeight: 800, fontSize: 14
                }}>
                  {tone.icon}
                </div>

                <div className="card" style={{padding: 24, borderLeft: `4px solid ${tone.border}`}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"start", gap: 16, marginBottom: 8, flexWrap:"wrap"}}>
                    <h4 style={{margin: 0}}>{c.window}</h4>
                    <span className="badge" style={{background: tone.bg, color: tone.text}}>
                      {c.status}
                    </span>
                  </div>
                  <p style={{color:"var(--ink-soft)", lineHeight: 1.5}}>{c.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help box */}
        <div style={{
          marginTop: 32,
          background: "var(--lilac-50)",
          borderRadius: 20, padding: 32,
          display:"grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems:"center"
        }} className="help-banner">
          <div>
            <h4 style={{marginBottom: 6}}>¿Tu caso es especial?</h4>
            <p className="muted" style={{lineHeight: 1.5}}>
              Cada pedido es único. Si tienes una situación particular, escríbenos y vemos juntos cómo resolverlo.
            </p>
          </div>
          <a className="btn btn-wa" href={D.waLink("Hola Keyli, necesito ayuda con una cancelación o cambio.")} target="_blank" rel="noopener">
            <WhatsAppGlyph size={16}/> Contactar
          </a>
        </div>

        <style>{`
          @media (max-width: 600px) {
            .help-banner { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

// -----------------------------------------------------------
// FAQ Tab
// -----------------------------------------------------------

const FaqTab = () => {
  const D = window.KEYLI_DATA;
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="shell" style={{maxWidth: 800}}>
        <div style={{marginBottom: 40}}>
          <h2 style={{marginBottom: 12}}>Preguntas frecuentes</h2>
          <p style={{fontSize: 16, color:"var(--ink-soft)"}}>
            Lo que la mayoría nos pregunta. Si tu duda no aparece, pregúntanos por WhatsApp.
          </p>
        </div>

        <div className="card" style={{padding: 8}}>
          {D.faqs.map((f, i) => (
            <div key={i} style={{borderBottom: i < D.faqs.length - 1 ? "1px solid var(--lilac-100)" : "none"}}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: "100%", padding: "20px 24px", textAlign: "left",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  fontSize: 16, fontWeight: 600, color: "var(--ink)"
                }}>
                {f.q}
                <span style={{
                  transition: "transform .2s",
                  transform: open === i ? "rotate(180deg)" : "rotate(0)",
                  color: "var(--lilac-700)"
                }}>
                  <ChevronDown size={20}/>
                </span>
              </button>
              {open === i && (
                <div style={{padding: "0 24px 24px", color: "var(--ink-soft)", lineHeight: 1.6, fontSize: 15}}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{textAlign:"center", marginTop: 40}}>
          <p className="muted" style={{marginBottom: 16}}>¿No encontraste tu respuesta?</p>
          <a className="btn btn-wa" href={D.waLink("Hola Keyli, tengo una duda.")} target="_blank" rel="noopener">
            <WhatsAppGlyph size={16}/> Pregúntanos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ProcessScreen, CompraTab, CancelacionTab, FaqTab });
