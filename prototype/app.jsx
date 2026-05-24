// =============================================================
// Keyli — Main App (router + tweaks integration)
// =============================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "gradient",
  "accent": "yellow",
  "showFAB": true,
  "showBand": true
}/*EDITMODE-END*/;

const HERO_VARIANTS = [
  { value: "gradient", label: "Lila" },
  { value: "yellow",   label: "Amarillo" },
  { value: "clean",    label: "Blanco" },
  { value: "deep",     label: "Morado" }
];

const ACCENT_OPTIONS = ["#FFD84D", "#5C3A8C", "#FFFFFF"];

const App = () => {
  const route = useRoute();
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const isAdmin = route.path.startsWith("/admin");

  let screen;
  if (route.path === "/" || route.path === "") {
    screen = <LandingScreen tweaks={tweaks}/>;
  } else if (route.path.startsWith("/catalogo")) {
    screen = <CatalogScreen route={route}/>;
  } else if (route.path.startsWith("/producto/")) {
    screen = <ProductScreen route={route}/>;
  } else if (route.path.startsWith("/proceso")) {
    screen = <ProcessScreen route={route}/>;
  } else if (route.path.startsWith("/admin")) {
    screen = <AdminScreen route={route}/>;
  } else {
    screen = (
      <main className="section">
        <div className="shell center">
          <h2>Página no encontrada</h2>
          <a className="btn btn-primary" href="#/" style={{marginTop: 24}}>Volver al inicio</a>
        </div>
      </main>
    );
  }

  return (
    <>
      {tweaks.showBand === false && <style>{`.sparkle-band { display: none !important; }`}</style>}
      <Header route={route}/>
      <div data-screen-label={routeLabel(route)}>
        {screen}
      </div>
      {!isAdmin && <Footer/>}
      {!isAdmin && tweaks.showFAB && <WhatsAppFAB/>}

      <TweaksPanel title="Tweaks · Keyli">
        <TweakSection label="Hero (landing)">
          <TweakRadio
            label="Estilo de fondo"
            value={tweaks.heroVariant}
            onChange={v => setTweak("heroVariant", v)}
            options={HERO_VARIANTS}
          />
          <TweakColor
            label="Acento"
            value={tweaks.accent}
            onChange={v => setTweak("accent", v)}
            options={ACCENT_OPTIONS}
          />
        </TweakSection>

        <TweakSection label="Elementos del sitio">
          <TweakToggle
            label="Botón flotante WhatsApp"
            value={tweaks.showFAB}
            onChange={v => setTweak("showFAB", v)}
          />
          <TweakToggle
            label="Banda de destellos"
            value={tweaks.showBand}
            onChange={v => setTweak("showBand", v)}
          />
        </TweakSection>

        <TweakSection label="Navegar">
          <NavQuickLinks/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

const NavQuickLinks = () => (
  <div style={{display:"grid", gap: 6, padding: "0 14px 8px"}}>
    {[
      { href: "#/", label: "Landing" },
      { href: "#/catalogo", label: "Catálogo" },
      { href: "#/catalogo?season=madres", label: "Temporada: Madres" },
      { href: "#/producto/playera-dtf-madre", label: "Detalle de producto" },
      { href: "#/proceso", label: "Proceso de compra" },
      { href: "#/proceso?tab=cancelacion", label: "Cancelaciones" },
      { href: "#/proceso?tab=faq", label: "FAQ" },
      { href: "#/admin", label: "Panel admin" }
    ].map(it => (
      <a key={it.href} href={it.href} style={{
        padding: "6px 10px", background: "rgba(92, 58, 140, .08)",
        borderRadius: 6, fontSize: 11, color: "#5C3A8C",
        fontWeight: 600
      }}>
        {it.label}
      </a>
    ))}
  </div>
);

function routeLabel(route) {
  if (route.path === "/" || route.path === "") return "01 Landing";
  if (route.path.startsWith("/catalogo")) return "02 Catálogo";
  if (route.path.startsWith("/producto/")) return "03 Detalle producto";
  if (route.path.startsWith("/proceso")) return "04 Proceso";
  if (route.path.startsWith("/admin")) return "05 Admin";
  return "404";
}

// Mount
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
