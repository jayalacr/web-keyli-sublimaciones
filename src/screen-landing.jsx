// =============================================================
// Keyli — Landing Screen (slim version)
// =============================================================

const LandingScreen = ({ tweaks }) => {
  const D = window.KEYLI_DATA;
  const featured = D.products.filter(p => p.featured);
  return (
    <main>
      <Hero variant={tweaks?.heroVariant || "gradient"} accent={tweaks?.accent} />
      <SparkleBand />
      <ServicesSection />
      <FeaturedProducts items={featured} />
      <CTAClose />
    </main>
  );
};

// -----------------------------------------------------------
// HERO — logo-centric, no stats
// -----------------------------------------------------------

const Hero = ({ variant = "gradient", accent = "yellow" }) => {
  const D = window.KEYLI_DATA;

  const bgClass = {
    gradient: "hero-bg-gradient",
    yellow:   "hero-bg-yellow",
    clean:    "hero-bg-clean",
    deep:     "hero-bg-deep"
  }[variant] || "hero-bg-gradient";

  const isDeep = variant === "deep";
  const isYellow = variant === "yellow";

  const accentColor =
    accent === "purple" ? "var(--lilac-700)" :
    accent === "white"  ? "white" :
    "var(--yellow-400)";

  return (
    <section className={bgClass} style={{
      position: "relative", overflow: "hidden",
      paddingBlock: "clamp(48px, 7vw, 96px) clamp(64px, 9vw, 128px)"
    }}>
      <div className="shell-wide hero-grid" style={{
        display: "grid",
        gridTemplateColumns: "1.05fr 0.95fr",
        gap: "clamp(32px, 5vw, 80px)",
        alignItems: "center",
        position: "relative"
      }}>
        {/* Text column */}
        <div className="hero-text">
          <span className="eyebrow" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 99,
            background: isDeep ? "rgba(255,255,255,.12)" : "white",
            color: isDeep ? "var(--yellow-300)" : "var(--lilac-700)",
            boxShadow: isDeep ? "none" : "0 2px 8px rgba(92,58,140,.08)"
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 99,
              background: "var(--yellow-400)"
            }}/>
            Personalizamos lo que imaginas
          </span>

          <h1 style={{
            marginTop: 22,
            marginBottom: 18,
            color: isDeep ? "white" : "var(--ink)",
            fontSize: "clamp(44px, 6.5vw, 88px)",
            lineHeight: .95
          }}>
            <span className="script" style={{
              color: isDeep ? accentColor : "var(--lilac-700)",
              display: "block",
              fontSize: "1.35em",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 6
            }}>
              Creamos tu idea.
            </span>
            <span style={{ fontSize: ".48em", fontWeight: 700, color: isDeep ? "rgba(255,255,255,.95)" : "var(--ink)", letterSpacing: "-.015em" }}>
              Playeras, tazas, termos<br/>
              y más, hechos para ti.
            </span>
          </h1>

          <p style={{
            fontSize: 17, lineHeight: 1.55,
            color: isDeep ? "rgba(255,255,255,.85)" : "var(--ink-soft)",
            maxWidth: 480, marginBottom: 32
          }}>
            DTF, sublimación y trabajos digitales con el detalle que mereces.
            Diseñamos contigo y producimos en tiempo récord para regalos, eventos y temporadas especiales.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a className="btn btn-wa btn-lg"
               href={D.waLink("Hola Keyli, quiero cotizar un producto.")}
               target="_blank" rel="noopener">
              <WhatsAppGlyph size={20}/> Cotizar por WhatsApp
            </a>
            <a className="btn btn-ghost btn-lg" href="#/catalogo"
               style={ isDeep ? {background: "rgba(255,255,255,.1)", color: "white", borderColor: "rgba(255,255,255,.25)"} : {} }>
              Ver catálogo <ArrowRight size={16}/>
            </a>
          </div>
        </div>

        {/* Logo column */}
        <HeroLogoComp variant={variant}/>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
};

// -----------------------------------------------------------
// Hero logo composition — soft halo + the actual logo
// -----------------------------------------------------------

const HeroLogoComp = ({ variant }) => {
  const isDeep = variant === "deep";
  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: 520,
      aspectRatio: "1 / 1",
      justifySelf: "center"
    }} className="hero-logo-comp">
      {/* Soft outer ring / halo */}
      <div style={{
        position: "absolute",
        inset: "6%",
        borderRadius: "50%",
        background: isDeep
          ? "radial-gradient(circle, rgba(255,255,255,.12) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(202, 176, 236, .35) 0%, transparent 70%)"
      }}/>

      {/* Decorative concentric ring */}
      <div style={{
        position: "absolute",
        inset: "8%",
        borderRadius: "50%",
        border: `1.5px dashed ${isDeep ? "rgba(255,216,77,.4)" : "rgba(124, 79, 184, .35)"}`,
        animation: "spin-slow 60s linear infinite"
      }}/>

      {/* Logo */}
      <img
        src="assets/logo-keyli.jpeg"
        alt="Keyli Sublimaciones"
        style={{
          position: "absolute",
          inset: "14%",
          width: "72%",
          height: "72%",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: isDeep
            ? "0 30px 80px -20px rgba(0, 0, 0, 0.5), 0 0 0 4px rgba(255, 255, 255, .15)"
            : "0 30px 80px -20px rgba(92, 58, 140, 0.35), 0 0 0 4px rgba(255, 255, 255, .8)",
          background: "white"
        }}
      />

      {/* Soft sparkle accents (echoing logo) */}
      <div style={{position:"absolute", top: "6%", right: "10%", color: "var(--yellow-500)"}}>
        <Sparkle size={28} className="sparkle-anim"/>
      </div>
      <div style={{position:"absolute", bottom: "10%", left: "6%", color: "var(--yellow-500)"}}>
        <Sparkle size={22} className="sparkle-anim"/>
      </div>
      <div style={{position:"absolute", top: "42%", right: "-2%", color: "var(--yellow-500)"}}>
        <Sparkle size={16} className="sparkle-anim"/>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 600px) {
          .hero-logo-comp { max-width: 360px !important; }
        }
      `}</style>
    </div>
  );
};

// -----------------------------------------------------------
// SparkleBand (marquee)
// -----------------------------------------------------------

const SparkleBand = () => {
  const items = [
    "Sublimación full color", "DTF para textil", "Trabajos digitales", "Envíos a todo México",
    "Diseño incluido", "Pedidos por WhatsApp",
    "Sublimación full color", "DTF para textil", "Trabajos digitales", "Envíos a todo México",
    "Diseño incluido", "Pedidos por WhatsApp"
  ];
  return (
    <div className="sparkle-band">
      <div className="sparkle-band-track">
        {items.map((it, i) => (
          <span key={i} style={{display:"inline-flex", gap: 10, alignItems:"center"}}>
            <Sparkle size={10} color="var(--yellow-400)"/> {it}
          </span>
        ))}
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// Services Section — DTF / Sublimación / Trabajos digitales
// -----------------------------------------------------------

const ServicesSection = () => {
  const D = window.KEYLI_DATA;
  return (
    <section className="section">
      <div className="shell">
        <div style={{textAlign:"center", marginBottom: 56, maxWidth: 640, marginInline:"auto"}}>
          <span className="eyebrow"><Sparkle size={10}/> Nuestros servicios</span>
          <h2 style={{marginTop: 12, marginBottom: 14}}>
            Tres formas de imprimir tu idea
          </h2>
          <p className="muted" style={{fontSize: 16}}>
            Cada técnica está pensada para distintos materiales y volúmenes. Te recomendamos la mejor según lo que necesites.
          </p>
        </div>

        <div className="grid-3 services-grid">
          {D.techniques.map((t, i) => (
            <ServiceCard key={t.id} service={t} index={i}/>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => {
  const D = window.KEYLI_DATA;
  // Each service gets a distinct visual treatment
  const styles = [
    { bg: "linear-gradient(140deg, #F3EAFE 0%, #E6D3FB 100%)", border: "var(--lilac-200)", dot: "var(--lilac-600)" },
    { bg: "linear-gradient(140deg, #FFF1B0 0%, #FFE066 100%)", border: "#F5D966",            dot: "#B8860B"           },
    { bg: "linear-gradient(140deg, #FFFFFF 0%, #F3EAFE 100%)", border: "var(--lilac-200)", dot: "var(--lilac-700)" }
  ][index] || { bg: "white", border: "var(--line)", dot: "var(--lilac-700)" };

  return (
    <div className="card service-card" style={{
      padding: 32,
      background: styles.bg,
      border: `1.5px solid ${styles.border}`,
      borderRadius: 24,
      display: "flex", flexDirection: "column", gap: 16,
      position: "relative", overflow: "hidden",
      minHeight: 360
    }}>
      {/* Decorative sparkle */}
      <div style={{position:"absolute", top: 20, right: 20, color: styles.dot, opacity: .5}}>
        <Sparkle size={20}/>
      </div>

      {/* Big numeral */}
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: 64,
        fontWeight: 700,
        color: styles.dot,
        lineHeight: 1,
        opacity: .9
      }}>
        0{index + 1}
      </div>

      <div>
        <h3 style={{ marginBottom: 4 }}>{service.label}</h3>
        <span style={{
          fontSize: 13, fontWeight: 600, color: styles.dot,
          fontStyle: "italic"
        }}>{service.tagline}</span>
      </div>

      <p style={{fontSize: 14.5, lineHeight: 1.55, color:"var(--ink-soft)"}}>
        {service.desc}
      </p>

      {/* Pills */}
      <div style={{display:"flex", flexWrap:"wrap", gap: 6, marginTop: "auto"}}>
        {service.includes.map(it => (
          <span key={it} style={{
            background: "rgba(255,255,255,.6)",
            color: "var(--ink)",
            fontSize: 11.5,
            fontWeight: 600,
            padding: "5px 10px",
            borderRadius: 99,
            border: "1px solid rgba(0,0,0,.04)"
          }}>{it}</span>
        ))}
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// Featured Products — Lo más pedido
// -----------------------------------------------------------

const FeaturedProducts = ({ items }) => {
  return (
    <section className="section" style={{ background: "var(--lilac-50)" }}>
      <div className="shell">
        <div style={{textAlign:"center", marginBottom: 48, maxWidth: 640, marginInline: "auto"}}>
          <span className="eyebrow"><Sparkle size={10}/> Más pedidos</span>
          <h2 style={{marginTop: 12, marginBottom: 12}}>
            Lo que la gente <span className="script" style={{color:"var(--lilac-700)", fontSize:"1.05em"}}>está pidiendo</span>
          </h2>
          <p className="muted" style={{fontSize: 16}}>
            Una muestra de nuestros favoritos. Todo en el catálogo es 100% personalizable.
          </p>
        </div>

        <div className="grid-3">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div style={{textAlign:"center", marginTop: 56}}>
          <a className="btn btn-primary btn-lg" href="#/catalogo">
            Ver catálogo completo <ArrowRight size={16}/>
          </a>
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------------------
// CTA Close
// -----------------------------------------------------------

const CTAClose = () => {
  const D = window.KEYLI_DATA;
  return (
    <section style={{
      background: "linear-gradient(135deg, var(--lilac-700) 0%, var(--lilac-800) 100%)",
      color: "white", padding: "80px 0", position:"relative", overflow:"hidden"
    }}>
      <div style={{position:"absolute", top: "20%", right: "8%", color: "var(--yellow-400)", opacity: .25}}>
        <Sparkle size={120}/>
      </div>
      <div style={{position:"absolute", bottom: "10%", left: "5%", color: "var(--yellow-400)", opacity: .2}}>
        <Sparkle size={80}/>
      </div>

      <div className="shell" style={{textAlign:"center", position:"relative", zIndex: 2}}>
        <span className="script" style={{fontSize: 32, color:"var(--yellow-300)", display:"block"}}>
          ¿Tienes una idea?
        </span>
        <h2 style={{color:"white", marginTop: 8, marginBottom: 16, fontSize: "clamp(32px, 4vw, 52px)"}}>
          La hacemos realidad hoy mismo.
        </h2>
        <p style={{fontSize: 18, color:"rgba(255,255,255,.85)", maxWidth: 560, marginInline:"auto", marginBottom: 32}}>
          Cuéntanos por WhatsApp qué necesitas: cantidad, fecha y estilo. Te respondemos rápido con tu cotización.
        </p>
        <a className="btn btn-yellow btn-lg" href={D.waLink("Hola Keyli, quiero pedir algo personalizado.")} target="_blank" rel="noopener">
          <WhatsAppGlyph size={20}/> Iniciar mi pedido
        </a>
      </div>
    </section>
  );
};

Object.assign(window, {
  LandingScreen, Hero, HeroLogoComp, SparkleBand,
  ServicesSection, ServiceCard, FeaturedProducts, CTAClose
});
