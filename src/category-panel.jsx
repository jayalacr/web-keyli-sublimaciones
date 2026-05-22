// =============================================================
// Keyli — CategoryDetailPanel (right-side slide-over)
// =============================================================

const { useEffect: _useEffectCP } = React;

const CategoryDetailPanel = ({ entry, open, onClose, season }) => {
  const D = window.KEYLI_DATA;

  // Esc handler + body scroll lock while open
  _useEffectCP(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!entry) return null;

  const { meta, items } = entry;
  const techniqueRows = meta.techniques
    .map(tid => D.techniques.find(x => x.id === tid))
    .filter(Boolean);
  const allItems = D.products.filter(p => p.category === meta.label);
  const seasonObj = season ? D.seasons.find(s => s.id === season) : null;

  // Aggregate sizes + colors from all items in category
  const allSizes = Array.from(new Set(allItems.flatMap(p => p.sizes)));
  const allColors = Array.from(new Set(allItems.flatMap(p => p.colors)));
  const priceFrom = allItems.length ? Math.min(...allItems.map(p => p.priceFrom)) : null;
  const priceTo = allItems.length ? Math.max(...allItems.map(p => p.priceFrom)) : null;

  const waText = `Hola Keyli, quiero cotizar un pedido de ${meta.label.toLowerCase()}.

Mi idea: [describe o adjunta imagen]
${seasonObj ? `Para: ${seasonObj.label}\n` : ""}Cantidad estimada: [ej. 5 piezas]`;

  return (
    <>
      <div
        className={`cat-panel-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`cat-panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={meta.label}
      >
        {/* Header */}
        <div className="cat-panel-header">
          <div>
            <span className="eyebrow" style={{margin: 0}}>Categoría</span>
            <h2 style={{margin: "4px 0 0", fontSize: 22}}>{meta.label}</h2>
          </div>
          <button onClick={onClose} className="cat-panel-close" aria-label="Cerrar">
            <X size={18}/>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="cat-panel-body">
          {/* Hero */}
          <div className="cat-panel-hero" style={{
            background: `linear-gradient(140deg, ${meta.gradient[0]} 0%, ${meta.gradient[1]} 100%)`
          }}>
            <ProductIcon kind={meta.icon} gradient={meta.gradient}/>
            <span className="cat-panel-personalizable">
              <Sparkle size={12} color="var(--yellow-500)"/>
              100% personalizable
            </span>
          </div>

          {/* Tagline + description */}
          <div className="cat-panel-section">
            <p className="cat-panel-tagline">{meta.tagline}</p>
            <p className="cat-panel-desc">{meta.desc}</p>
          </div>

          {/* "Lo que más piden" — inspiration chips */}
          <div className="cat-panel-section">
            <h4 className="cat-panel-h4">Lo que más nos piden</h4>
            <div className="cat-panel-chips">
              {meta.inspiration.map(tag => (
                <span key={tag} className="cat-panel-insp-chip">{tag}</span>
              ))}
            </div>
          </div>

          {/* Techniques */}
          <div className="cat-panel-section">
            <h4 className="cat-panel-h4">Técnicas que usamos</h4>
            <div style={{display: "flex", flexDirection: "column", gap: 10}}>
              {techniqueRows.map(t => (
                <div key={t.id} className="cat-panel-tech-row">
                  <div className="cat-panel-tech-dot"/>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontWeight: 700, fontSize: 13.5, marginBottom: 2}}>{t.label}</div>
                    <div style={{fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.45}}>{t.tagline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          {(allSizes.length > 0 || allColors.length > 0) && (
            <div className="cat-panel-section">
              <h4 className="cat-panel-h4">Tamaños y colores</h4>
              <div className="cat-panel-specs">
                {allSizes.length > 0 && (
                  <div>
                    <span className="cat-panel-spec-label">Tamaños / tallas</span>
                    <div className="cat-panel-chips">
                      {allSizes.slice(0, 10).map(s => (
                        <span key={s} className="cat-panel-mini-chip">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {allColors.length > 0 && (
                  <div>
                    <span className="cat-panel-spec-label">Colores disponibles</span>
                    <div className="cat-panel-chips">
                      {allColors.slice(0, 10).map(c => (
                        <span key={c} className="cat-panel-mini-chip">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Inspiration gallery */}
          {allItems.length > 0 && (
            <div className="cat-panel-section">
              <h4 className="cat-panel-h4">
                Inspiración de otros pedidos
                <span className="cat-panel-h4-sub">
                  {items.length < allItems.length && season
                    ? `${items.length} en ${seasonObj?.label}`
                    : `${allItems.length} ${allItems.length === 1 ? "ejemplo" : "ejemplos"}`}
                </span>
              </h4>
              <div className="cat-panel-gallery">
                {allItems.map(p => (
                  <a key={p.id} href={`#/producto/${p.id}`} className="cat-panel-example" onClick={onClose}>
                    <div className="cat-panel-example-img">
                      <ProductIcon kind={p.icon} gradient={p.gradient}/>
                    </div>
                    <div className="cat-panel-example-body">
                      <div className="cat-panel-example-name">{p.name}</div>
                      <div className="cat-panel-example-price">Desde ${p.priceFrom} MXN</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="cat-panel-footer">
          <div className="cat-panel-footer-price">
            {priceFrom != null ? (
              <>
                <span style={{fontSize: 11, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: ".08em"}}>Rango</span>
                <span style={{fontWeight: 700, color: "var(--ink)", fontSize: 16}}>
                  ${priceFrom}{priceTo !== priceFrom ? ` – $${priceTo}` : ""} MXN
                </span>
              </>
            ) : (
              <span style={{fontSize: 13, color: "var(--ink-soft)"}}>Cotizamos a medida</span>
            )}
          </div>
          <a
            className="btn btn-wa btn-lg"
            href={D.waLink(waText)}
            target="_blank"
            rel="noopener"
            style={{flex: 1, justifyContent: "center"}}
          >
            <WhatsAppGlyph size={18}/> Cotizar mi diseño
          </a>
        </div>
      </aside>
    </>
  );
};

Object.assign(window, { CategoryDetailPanel });
