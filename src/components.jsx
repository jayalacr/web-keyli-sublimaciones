// =============================================================
// Keyli — Components (shared, all UI primitives)
// Loaded as Babel before screens/app
// =============================================================

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// -----------------------------------------------------------
// Icons (inline SVG; designed for Keyli)
// -----------------------------------------------------------

const Sparkle = ({ size = 14, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={color}>
    <path d="M12 0 L13.7 9.1 L23 12 L13.7 14.9 L12 24 L10.3 14.9 L1 12 L10.3 9.1 Z" />
  </svg>
);

const Star = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2 L14.5 9 L22 9.5 L16 14 L18 22 L12 17.5 L6 22 L8 14 L2 9.5 L9.5 9 Z" />
  </svg>
);

const WhatsAppGlyph = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 .4C7.6.4.8 7.2.8 15.6c0 2.8.8 5.4 2.1 7.7L.4 31.6l8.6-2.3a15.1 15.1 0 0 0 7 1.8h.1c8.4 0 15.2-6.8 15.2-15.2 0-4.1-1.6-7.9-4.5-10.8A15.2 15.2 0 0 0 16 .4Zm0 27.7h-.1a12.6 12.6 0 0 1-6.4-1.8l-.5-.3-4.9 1.3 1.3-4.8-.3-.5a12.7 12.7 0 0 1 11-19.2 12.6 12.6 0 0 1 12.7 12.6c0 7-5.7 12.7-12.6 12.7Zm6.9-9.5c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.5-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9a11 11 0 0 1-2.1-2.6c-.2-.4 0-.6.2-.7.2-.2.4-.4.5-.7l.3-.5c.1-.2 0-.4 0-.6 0-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1c0 1.9 1.3 3.6 1.5 3.9.2.3 2.6 4 6.4 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8 0-.1-.3-.2-.7-.4Z"/>
  </svg>
);

const FacebookGlyph = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 21.95v-8.3h2.8l.42-3.24H13.5V8.34c0-.94.26-1.58 1.6-1.58h1.71V3.86a22.6 22.6 0 0 0-2.5-.13c-2.46 0-4.15 1.5-4.15 4.27v2.4h-2.79v3.25h2.79v8.3h3.34Z"/>
  </svg>
);

const InstagramGlyph = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const TikTokGlyph = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.5 8.4a6.5 6.5 0 0 1-3.8-1.22V15.2a5.55 5.55 0 1 1-5.55-5.55c.27 0 .53.02.78.06v2.78a2.78 2.78 0 1 0 1.95 2.65V2.2h2.74a3.79 3.79 0 0 0 3.88 3.4v2.8Z"/>
  </svg>
);

// Editable in data.js (KEYLI_DATA.social) — falls back to placeholder hrefs
const SOCIAL_LINKS = [
  { id: "facebook",  label: "Facebook",  href: "https://facebook.com/keylisublimaciones",  Glyph: FacebookGlyph },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/keylisublimaciones", Glyph: InstagramGlyph },
  { id: "tiktok",    label: "TikTok",    href: "https://tiktok.com/@keylisublimaciones",   Glyph: TikTokGlyph }
];

const SocialRow = ({ size = 36, iconSize = 16 }) => (
  <div className="social-row">
    {SOCIAL_LINKS.map(s => (
      <a key={s.id}
         href={s.href}
         target="_blank" rel="noopener"
         aria-label={s.label}
         className="social-btn"
         style={{ width: size, height: size }}>
        <s.Glyph size={iconSize}/>
      </a>
    ))}
  </div>
);

const Menu = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="7" x2="20" y2="7"/>
    <line x1="4" y1="12" x2="20" y2="12"/>
    <line x1="4" y1="17" x2="20" y2="17"/>
  </svg>
);

const X = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="6" y1="6" x2="18" y2="18"/>
    <line x1="18" y1="6" x2="6" y2="18"/>
  </svg>
);

const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ChevronDown = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const Search = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7"/>
    <line x1="21" y1="21" x2="16.5" y2="16.5" strokeLinecap="round"/>
  </svg>
);

const Edit = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const Trash = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
  </svg>
);

const Plus = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const Check = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const Clock = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14" strokeLinecap="round"/>
  </svg>
);

const Truck = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="13" height="11" rx="1"/>
    <polyline points="14 9 18 9 22 13 22 17 14 17"/>
    <circle cx="6" cy="19" r="2"/>
    <circle cx="17" cy="19" r="2"/>
  </svg>
);

const Heart = ({ size = 16, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const Grid = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.4"/>
    <rect x="14" y="3" width="7" height="7" rx="1.4"/>
    <rect x="3" y="14" width="7" height="7" rx="1.4"/>
    <rect x="14" y="14" width="7" height="7" rx="1.4"/>
  </svg>
);

const MugLine = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h11v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7z"/>
    <path d="M15 10h2.5a2.5 2.5 0 0 1 0 5H15"/>
    <line x1="7" y1="3" x2="7" y2="5"/>
    <line x1="11" y1="3" x2="11" y2="5"/>
  </svg>
);

const ShirtLine = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2L3 9.2a1 1 0 0 0 1 .8h2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2a1 1 0 0 0 1-.8l.7-3.5a2 2 0 0 0-1.3-2.2z"/>
  </svg>
);

const BottleLine = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2h6v3l1 2v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7l1-2V2z"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const KeyLine = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="4.5"/>
    <line x1="11" y1="12" x2="21" y2="2"/>
    <line x1="16" y1="7" x2="18" y2="9"/>
  </svg>
);

const TagLine = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/>
    <circle cx="7" cy="7" r="1.4"/>
  </svg>
);

const SortIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
    <line x1="9" y1="18" x2="15" y2="18"/>
  </svg>
);

// Product silhouette icons (decorative)
const Shirt = ({ size = 110, color, accent }) => (
  <svg width={size} viewBox="0 0 120 120" fill="none">
    <path d="M28 30 L40 14 L52 22 Q60 30 68 22 L80 14 L92 30 L102 42 L88 52 L88 100 Q88 106 82 106 L38 106 Q32 106 32 100 L32 52 L18 42 Z" fill={color || "#5C3A8C"} />
    <path d="M52 22 Q60 30 68 22" fill="none" stroke={accent || "#fff"} strokeWidth="2"/>
  </svg>
);

const Mug = ({ size = 110, color, accent }) => (
  <svg width={size} viewBox="0 0 120 120" fill="none">
    <rect x="22" y="30" width="60" height="68" rx="6" fill={color || "#5C3A8C"} />
    <path d="M82 46 Q102 46 102 64 Q102 82 82 82" fill="none" stroke={color || "#5C3A8C"} strokeWidth="6"/>
    <rect x="32" y="44" width="40" height="14" rx="2" fill={accent || "#FFD84D"} opacity=".9"/>
  </svg>
);

const Bottle = ({ size = 110, color, accent }) => (
  <svg width={size} viewBox="0 0 120 120" fill="none">
    <rect x="50" y="10" width="20" height="10" rx="2" fill={color || "#5C3A8C"} />
    <path d="M44 22 L44 30 Q44 36 50 38 L50 102 Q50 110 60 110 Q70 110 70 102 L70 38 Q76 36 76 30 L76 22 Z" fill={color || "#5C3A8C"} />
    <rect x="50" y="48" width="20" height="22" fill={accent || "#FFD84D"} />
  </svg>
);

const Key = ({ size = 110, color, accent }) => (
  <svg width={size} viewBox="0 0 120 120" fill="none">
    <circle cx="40" cy="60" r="20" fill="none" stroke={color || "#5C3A8C"} strokeWidth="8"/>
    <rect x="58" y="56" width="50" height="8" fill={color || "#5C3A8C"} />
    <rect x="90" y="56" width="6" height="14" fill={color || "#5C3A8C"} />
    <rect x="100" y="56" width="6" height="20" fill={color || "#5C3A8C"} />
    <circle cx="40" cy="60" r="6" fill={accent || "#FFD84D"} />
  </svg>
);

const Tag = ({ size = 110, color, accent }) => (
  <svg width={size} viewBox="0 0 120 120" fill="none">
    <path d="M60 12 L108 12 L108 60 L60 108 L12 60 Z" fill={color || "#5C3A8C"} />
    <circle cx="92" cy="28" r="6" fill={accent || "#FFD84D"} />
  </svg>
);

const ProductIcon = ({ kind, gradient }) => {
  const [a, b] = gradient || ["#E6D3FB", "#CAB0EC"];
  // gradient background + silhouette in dark purple
  const Comp = { shirt: Shirt, mug: Mug, bottle: Bottle, key: Key, tag: Tag }[kind] || Shirt;
  return (
    <div className="product-icon-bg" style={{
      position: "absolute", inset: 0,
      background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
      display: "grid", placeItems: "center"
    }}>
      {/* decorative sparkles */}
      <div style={{position:"absolute", top:"12%", right:"14%", color:"var(--yellow-400)"}}>
        <Sparkle size={18} />
      </div>
      <div style={{position:"absolute", bottom:"18%", left:"14%", color:"var(--yellow-400)"}}>
        <Sparkle size={12} />
      </div>
      <Comp color="#5C3A8C" accent="#FFD84D"/>
    </div>
  );
};

// -----------------------------------------------------------
// Logo lockup
// -----------------------------------------------------------

const Logo = ({ size = "default", onClick }) => {
  const big = size === "big";
  return (
    <a className="logo-mark" href="#/" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src="assets/logo-keyli.jpeg" alt="Keyli Sublimaciones" style={ big ? {width:72, height:72} : {width: 56, height: 56} }/>
    </a>
  );
};

// Logo with wordmark (used in footer & admin sidebar)
const LogoLockup = ({ inverted = false }) => (
  <div className="logo-mark">
    <img src="assets/logo-keyli.jpeg" alt="Keyli Sublimaciones" style={{width: 48, height: 48}}/>
    <div className="wordmark">
      <span className="name" style={inverted ? {color: "white", fontSize: 28} : {}}>Keyli</span>
      <span className="sub" style={inverted ? {color: "rgba(255,255,255,.7)"} : {}}>Sublimaciones</span>
    </div>
  </div>
);

// -----------------------------------------------------------
// Header
// -----------------------------------------------------------

const NAV_ITEMS = [
  { id: "home",     label: "Inicio",        href: "#/" },
  { id: "catalog",  label: "Catálogo",      href: "#/catalogo" },
  { id: "process",  label: "Cómo comprar",   href: "#/proceso" }
];

const Header = ({ route }) => {
  const [open, setOpen] = useState(false);
  const D = window.KEYLI_DATA;

  const activeId = (() => {
    if (route.path === "/" || route.path === "") return "home";
    if (route.path.startsWith("/catalogo")) return "catalog";
    if (route.path.startsWith("/proceso")) return "process";
    if (route.path.startsWith("/admin")) return "admin";
    return "";
  })();

  // Admin uses its own chrome
  if (route.path.startsWith("/admin")) return null;

  return (
    <>
      <header className="app-header">
        <div className="shell-wide" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 0"
        }}>
          <Logo />

          <nav className="hide-mobile" style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {NAV_ITEMS.map(item => (
              <a key={item.id} href={item.href} className="nav-link" data-active={activeId === item.id}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hide-mobile" style={{ display: "flex", alignItems: "center" }}>
            <SocialRow size={36} iconSize={15}/>
          </div>

          <button
            className="hide-desktop"
            style={{ display: "none" }}
            onClick={() => setOpen(true)}
            aria-label="Menú"
          >
            <Menu />
          </button>

          {/* Mobile toggle button (shown via media query trick) */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Menú"
            style={{
              padding: 10, borderRadius: 12, border: "1px solid var(--line)",
              background: "white"
            }}
            className="show-mobile-only"
          >
            <Menu />
          </button>
        </div>
      </header>

      {open && (
        <>
          <div className="menu-overlay" onClick={() => setOpen(false)} />
          <aside className="menu-drawer">
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 20}}>
              <Logo />
              <button onClick={() => setOpen(false)} style={{padding:8}}><X/></button>
            </div>
            {NAV_ITEMS.map(item => (
              <a key={item.id} href={item.href}
                 className="nav-link"
                 data-active={activeId === item.id}
                 onClick={() => setOpen(false)}
                 style={{fontSize: 16, padding: "14px 16px", color: "var(--ink-soft)"}}>
                {item.label}
              </a>
            ))}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
              <div style={{ display: "flex", gap: 10 }}>
                {SOCIAL_LINKS.map(s => (
                  <a key={s.id} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                     style={{
                       width: 40, height: 40, borderRadius: "50%",
                       display: "grid", placeItems: "center",
                       background: "var(--lilac-50)", color: "var(--lilac-700)",
                       border: "1px solid var(--lilac-200)"
                     }}>
                    <s.Glyph size={16}/>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}

      <style>{`
        .show-mobile-only { display: none; }
        @media (max-width: 900px) {
          .show-mobile-only { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
};

// -----------------------------------------------------------
// WhatsApp Floating Button
// -----------------------------------------------------------

const WhatsAppFAB = ({ message }) => {
  const D = window.KEYLI_DATA;
  const text = message || "Hola Keyli, me interesa hacer un pedido.";
  return (
    <a className="wa-fab" href={D.waLink(text)} target="_blank" rel="noopener" aria-label="Pedir por WhatsApp">
      <WhatsAppGlyph size={32}/>
    </a>
  );
};

// -----------------------------------------------------------
// Footer
// -----------------------------------------------------------

const Footer = () => {
  const D = window.KEYLI_DATA;
  return (
    <footer style={{ background: "var(--lilac-400)", color: "var(--lilac-800)", padding: "40px 0 24px" }}>
      <div className="shell-wide">
        <div className="footer-row" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 24, flexWrap: "wrap"
        }}>
          <div className="logo-mark">
            <img src="assets/logo-keyli.jpeg" alt="" style={{width:44, height:44, boxShadow:"0 0 0 2px rgba(255,255,255,.55)"}}/>
            <div className="wordmark">
              <span className="name" style={{color: "var(--lilac-800)", fontSize: 24}}>Keyli</span>
              <span className="sub" style={{color: "rgba(94, 62, 128, .75)"}}>Sublimaciones</span>
            </div>
          </div>

          <SocialRow size={40} iconSize={16}/>
        </div>

        <div style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: "1px solid rgba(94, 62, 128, .18)",
          display:"flex", justifyContent:"space-between", alignItems:"center", gap: 12, flexWrap:"wrap",
          color: "rgba(94, 62, 128, .8)",
          fontSize: 13
        }}>
          <span>© 2026 Keyli Sublimaciones · Hecho con cariño en México</span>
          <span>CDMX · Envíos a todo el país</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-row { justify-content: center; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

// -----------------------------------------------------------
// ProductCard
// -----------------------------------------------------------

const ProductCard = ({ product, onClick }) => {
  return (
    <article className="product-card">
      <a
        href={`#/producto/${product.id}`}
        onClick={onClick}
        style={{ display: "block", color: "inherit" }}
      >
        <div className="product-image-wrap">
          <ProductIcon kind={product.icon} gradient={product.gradient}/>
          {product.badge && (
            <span className="badge" style={{
              position: "absolute", top: 12, left: 12,
              background: product.badge === "Bajo pedido" ? "var(--ink)" : "var(--yellow-400)",
              color: product.badge === "Bajo pedido" ? "white" : "var(--lilac-900)"
            }}>{product.badge}</span>
          )}
        </div>
        <div className="product-card-body">
          <h4 className="product-card-title">{product.name}</h4>
          <p className="product-card-price">Desde <strong>${product.priceFrom}</strong> MXN</p>
        </div>
      </a>
      <a
        href={`#/producto/${product.id}`}
        onClick={onClick}
        className="btn btn-yellow product-card-cta"
      >Más información</a>
    </article>
  );
};

// -----------------------------------------------------------
// Router (hash-based)
// -----------------------------------------------------------

function parseHash() {
  const h = window.location.hash.replace(/^#/, "") || "/";
  const [pathRaw, queryRaw = ""] = h.split("?");
  const path = pathRaw.startsWith("/") ? pathRaw : "/" + pathRaw;
  const query = {};
  queryRaw.split("&").forEach(p => {
    if (!p) return;
    const [k, v] = p.split("=");
    query[k] = decodeURIComponent(v || "");
  });
  return { path, query };
}

function useRoute() {
  const [route, setRoute] = useState(parseHash());
  useEffect(() => {
    const handle = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, []);
  return route;
}

// Export to window
Object.assign(window, {
  Sparkle, Star, WhatsAppGlyph, FacebookGlyph, InstagramGlyph, TikTokGlyph, SocialRow, Menu, X, ArrowRight, ChevronDown, Search,
  Edit, Trash, Plus, Check, Clock, Truck,
  Heart, Grid, MugLine, ShirtLine, BottleLine, KeyLine, TagLine, SortIcon,
  Shirt, Mug, Bottle, Key, Tag, ProductIcon,
  Logo, LogoLockup, Header, WhatsAppFAB, Footer, ProductCard,
  useRoute, parseHash
});
