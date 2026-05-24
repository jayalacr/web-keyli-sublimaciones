// =============================================================
// Keyli — Catalog & Product Detail screens
// =============================================================

// -----------------------------------------------------------
// Catalog
// -----------------------------------------------------------

const CatalogScreen = ({ route }) => {
  const D = window.KEYLI_DATA;
  const initialSeason = route.query.season && route.query.season !== "all" ? route.query.season : "";
  const initialCat = route.query.cat || "";

  const [season, setSeason] = useState(initialSeason);
  const [search, setSearch] = useState("");
  const [openCat, setOpenCat] = useState(initialCat);

  // Sync state with route changes (back/forward, deep links)
  useEffect(() => {
    setSeason(route.query.season || "");
    setOpenCat(route.query.cat || "");
  }, [route.query.season, route.query.cat]);

  // Build URL combining filters
  const buildHash = (overrides = {}) => {
    const next = { season, cat: openCat, ...overrides };
    const parts = [];
    if (next.season) parts.push(`season=${next.season}`);
    if (next.cat) parts.push(`cat=${next.cat}`);
    return "#/catalogo" + (parts.length ? `?${parts.join("&")}` : "");
  };

  // Group products by category & compute summary stats
  const categoryEntries = useMemo(() => {
    return Object.values(D.categoryMeta).map(meta => {
      let items = D.products.filter(p => p.category === meta.label);
      if (season) items = items.filter(p => p.seasons.includes(season));
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(p => p.name.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q));
      }
      const prices = items.map(p => p.priceFrom);
      return {
        meta,
        items,
        count: items.length,
        priceFrom: prices.length ? Math.min(...prices) : null,
        priceTo: prices.length ? Math.max(...prices) : null
      };
    });
  }, [season, search]);

  // When opened, find the active category entry
  const activeEntry = openCat
    ? categoryEntries.find(e => e.meta.id === openCat) ||
      Object.values(D.categoryMeta).map(meta => ({
        meta,
        items: D.products.filter(p => p.category === meta.label)
      })).find(e => e.meta.id === openCat)
    : null;

  const visibleCategories = season
    ? categoryEntries.filter(e => e.count > 0)
    : categoryEntries;

  const activeSeason = D.seasons.find(s => s.id === season);
  const hasAnyFilter = season || search;

  const closeCat = () => {
    setOpenCat("");
    window.location.hash = buildHash({ cat: "" });
  };

  const openCategory = (catId) => {
    setOpenCat(catId);
    window.location.hash = buildHash({ cat: catId });
  };

  const setSeasonAndNav = (sid) => {
    setSeason(sid);
    window.location.hash = buildHash({ season: sid });
  };

  return (
    <main>
      {/* Catalog header */}
      <section style={{
        background: activeSeason ? `linear-gradient(180deg, ${activeSeason.tint} 0%, #ffffff 100%)` : "linear-gradient(180deg, var(--lilac-50) 0%, #ffffff 100%)",
        paddingBlock: "48px 24px",
        borderBottom: "1px solid var(--line)"
      }}>
        <div className="shell">
          <div style={{display:"flex", gap: 8, marginBottom: 12, fontSize: 13, color:"var(--ink-soft)"}}>
            <a href="#/" style={{color:"var(--lilac-700)"}}>Inicio</a>
            <span>/</span>
            <span>Catálogo</span>
            {activeSeason && <>
              <span>/</span>
              <span style={{color:"var(--lilac-700)", fontWeight: 600}}>{activeSeason.label}</span>
            </>}
          </div>

          {activeSeason ? (
            <>
              <h1 style={{marginBottom: 8}}>{activeSeason.label}</h1>
              <p style={{fontSize: 17, color:"var(--ink-soft)", maxWidth: 600}}>
                Edición especial · {activeSeason.month}. Mira qué categorías personalizamos para esta temporada.
              </p>
            </>
          ) : (
            <>
              <h1 style={{marginBottom: 8}}>
                Catálogo <span className="script" style={{color:"var(--lilac-700)", fontSize:"1.1em"}}>completo</span>
              </h1>
              <p style={{fontSize: 17, color:"var(--ink-soft)", maxWidth: 600}}>
                Elige una categoría para ver ejemplos e inspiración. Todo es <strong style={{color:"var(--lilac-700)"}}>100% personalizable</strong>.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Body: sidebar + main */}
      <section style={{ paddingBlock: 36 }}>
        <div className="shell">
          <div className="catalog-layout">
            {/* Sidebar filters */}
            <aside className="catalog-sidebar">
              <div className="filter-group">
                <h5 className="filter-label">Temporadas</h5>
                <button
                  className={"filter-item" + (season === "" ? " is-active" : "")}
                  onClick={() => setSeasonAndNav("")}
                >
                  <span className="filter-item-ico"><Sparkle size={14}/></span>
                  <span>Todas las temporadas</span>
                </button>
                {D.seasons.map(s => (
                  <button key={s.id}
                    className={"filter-item" + (season === s.id ? " is-active" : "")}
                    onClick={() => setSeasonAndNav(season === s.id ? "" : s.id)}
                  >
                    <span className="filter-item-ico" style={{
                      width: 10, height: 10, borderRadius: "50%",
                      background: s.tint, display: "inline-block"
                    }}></span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>

              <div className="filter-group">
                <h5 className="filter-label">Buscar</h5>
                <div style={{position:"relative"}}>
                  <span style={{position:"absolute", left: 12, top: "50%", transform:"translateY(-50%)", color:"var(--ink-faint)"}}>
                    <Search size={14}/>
                  </span>
                  <input
                    className="input"
                    placeholder="Buscar inspiración…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{paddingLeft: 34, fontSize: 13}}
                  />
                </div>
              </div>

              {hasAnyFilter && (
                <button className="filter-clear" onClick={() => {
                  setSeason(""); setSearch("");
                  window.location.hash = "#/catalogo" + (openCat ? `?cat=${openCat}` : "");
                }}>
                  <X size={12}/> Limpiar filtros
                </button>
              )}

              <div className="filter-help">
                <Sparkle size={12} color="var(--yellow-500)"/>
                <span>Todo lo que ves se personaliza. Diseñamos contigo desde cero.</span>
              </div>
            </aside>

            {/* Main column */}
            <div className="catalog-main">
              {!season && <SeasonsBanner/>}

              {/* Section heading */}
              <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"baseline",
                padding: "16px 0",
                borderTop: "1px solid var(--line)",
                marginBottom: 22
              }}>
                <div>
                  <span className="eyebrow">Categorías</span>
                  <h2 style={{fontSize: 24, marginTop: 4, marginBottom: 0}}>
                    {activeSeason ? `Para ${activeSeason.label.toLowerCase()}` : "Lo que personalizamos"}
                  </h2>
                </div>
                <span className="muted" style={{fontSize: 13}}>
                  {visibleCategories.length} {visibleCategories.length === 1 ? "categoría" : "categorías"}
                </span>
              </div>

              {visibleCategories.length === 0 ? (
                <div className="card-soft" style={{textAlign:"center", padding: "60px 20px"}}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: "white", border: "1px solid var(--lilac-200)",
                    display: "grid", placeItems: "center",
                    margin: "0 auto 16px", color: "var(--lilac-500)"
                  }}>
                    <Search size={22}/>
                  </div>
                  <h3 style={{marginBottom: 8}}>Nada por aquí todavía</h3>
                  <p className="muted" style={{marginBottom: 20}}>Quita un filtro o pídenos un diseño a la medida.</p>
                  <a className="btn btn-wa"
                     href={D.waLink("Hola Keyli, busco algo que no veo en el catálogo.")}
                     target="_blank" rel="noopener">
                    <WhatsAppGlyph size={16}/> Pedir a la medida
                  </a>
                </div>
              ) : (
                <div className="category-grid">
                  {visibleCategories.map(entry => (
                    <CategoryCard
                      key={entry.meta.id}
                      entry={entry}
                      onOpen={() => openCategory(entry.meta.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category detail panel */}
      <CategoryDetailPanel entry={activeEntry} open={!!openCat} onClose={closeCat} season={season}/>

      {/* Banner: pedido a medida */}
      <section style={{padding: "32px 0 80px"}}>
        <div className="shell">
          <div style={{
            background: "linear-gradient(135deg, var(--lilac-100) 0%, var(--yellow-200) 100%)",
            borderRadius: 24, padding: "40px 48px",
            display:"grid", gridTemplateColumns: "1.4fr auto", gap: 32, alignItems:"center"
          }} className="custom-banner">
            <div>
              <span className="eyebrow"><Sparkle size={10}/> ¿No ves lo que buscas?</span>
              <h3 style={{marginTop: 8, marginBottom: 8}}>Lo hacemos a la medida.</h3>
              <p className="muted" style={{maxWidth: 460}}>
                Si tienes un diseño, una idea o un evento específico, escríbenos. Cotizamos cualquier producto personalizado.
              </p>
            </div>
            <a className="btn btn-wa btn-lg" href={D.waLink("Hola Keyli, quiero un producto a la medida.")} target="_blank" rel="noopener">
              <WhatsAppGlyph size={18}/> Cotizar a medida
            </a>
          </div>
        </div>
      </section>

      <style>{`
        /* ===== Catalog layout ===== */
        .catalog-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 36px;
          align-items: start;
        }
        .catalog-sidebar {
          position: sticky;
          top: 96px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .catalog-main { min-width: 0; }

        /* Filter labels */
        .filter-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--ink-faint);
          margin: 0 0 10px 4px;
        }
        .filter-group { display: flex; flex-direction: column; }

        /* Category items (single select) */
        .filter-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--ink-soft);
          text-align: left;
          background: transparent;
          margin-bottom: 2px;
          transition: background .15s, color .15s;
        }
        .filter-item:hover { background: var(--lilac-50); color: var(--lilac-700); }
        .filter-item.is-active {
          background: var(--lilac-700);
          color: white;
          font-weight: 600;
        }
        .filter-item-ico {
          display: grid;
          place-items: center;
          width: 22px;
          flex-shrink: 0;
        }

        /* Checkbox filters */
        .filter-check {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          font-size: 13.5px;
          color: var(--ink-soft);
          cursor: pointer;
          border-radius: 10px;
          transition: background .15s;
        }
        .filter-check:hover { background: var(--lilac-50); }
        .filter-check input { display: none; }
        .filter-check-box {
          width: 18px; height: 18px;
          border: 1.5px solid var(--lilac-300);
          border-radius: 5px;
          display: grid; place-items: center;
          color: white;
          background: white;
          flex-shrink: 0;
          transition: background .15s, border-color .15s;
        }
        .filter-check-box > svg { opacity: 0; }
        .filter-check input:checked + .filter-check-box {
          background: var(--lilac-700);
          border-color: var(--lilac-700);
        }
        .filter-check input:checked + .filter-check-box > svg { opacity: 1; }
        .filter-check input:checked ~ span { color: var(--ink); font-weight: 600; }

        .filter-clear {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          font-size: 12.5px;
          color: var(--ink-soft);
          align-self: flex-start;
          border-radius: 10px;
          background: var(--lilac-50);
        }
        .filter-clear:hover { background: var(--lilac-100); color: var(--lilac-700); }

        .filter-help {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          padding: 12px;
          background: var(--lilac-50);
          border-radius: 10px;
          font-size: 12px;
          color: var(--ink-soft);
          line-height: 1.45;
          margin-top: 4px;
        }
        .filter-help svg { flex-shrink: 0; margin-top: 2px; }

        /* Category grid: 3 cols */
        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        @media (max-width: 1100px) {
          .category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 900px) {
          .catalog-layout { grid-template-columns: 1fr; }
          .catalog-sidebar {
            position: static;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 16px;
          }
          .filter-group { flex: 1 1 240px; min-width: 200px; }
        }
        @media (max-width: 560px) {
          .category-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 720px) {
          .custom-banner { grid-template-columns: 1fr !important; padding: 32px 24px !important; }
        }
      `}</style>
    </main>
  );
};

// -----------------------------------------------------------
// Product Detail
// -----------------------------------------------------------

const ProductScreen = ({ route }) => {
  const D = window.KEYLI_DATA;
  const id = route.path.split("/")[2];
  const product = D.products.find(p => p.id === id);

  const [size, setSize] = useState(product?.sizes[0]);
  const [color, setColor] = useState(product?.colors[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("specs");

  if (!product) {
    return (
      <main className="section">
        <div className="shell center">
          <h2>Producto no encontrado</h2>
          <a className="btn btn-primary" href="#/catalogo" style={{marginTop: 24}}>Volver al catálogo</a>
        </div>
      </main>
    );
  }

  const technique = D.techniques.find(t => t.id === product.technique);
  const relatedProducts = D.products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const waText = `Hola Keyli, quiero cotizar:
• Producto: ${product.name}
• Talla/tamaño: ${size}
• Color: ${color}
• Cantidad: ${qty}

Mi diseño: [describe o adjunta imagen]`;

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="shell" style={{paddingTop: 24, fontSize: 13, color:"var(--ink-soft)"}}>
        <a href="#/" style={{color:"var(--lilac-700)"}}>Inicio</a>
        <span> / </span>
        <a href="#/catalogo" style={{color:"var(--lilac-700)"}}>Catálogo</a>
        <span> / </span>
        <span>{product.name}</span>
      </div>

      <section style={{ paddingBlock: 32 }}>
        <div className="shell">
          <div className="product-detail-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56
          }}>
            {/* Gallery */}
            <div>
              <div className="card" style={{
                aspectRatio: "1 / 1", position: "relative", overflow: "hidden",
                borderRadius: 28
              }}>
                <ProductIcon kind={product.icon} gradient={product.gradient}/>
                {product.badge && (
                  <span className="badge" style={{
                    position: "absolute", top: 20, left: 20,
                    background: "var(--yellow-400)", color: "var(--lilac-900)",
                    padding: "8px 14px", fontSize: 12
                  }}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails (decorative) */}
              <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 12, marginTop: 16}}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="card" style={{
                    aspectRatio: "1 / 1", overflow: "hidden", borderRadius: 16,
                    cursor: "pointer", borderColor: i === 0 ? "var(--lilac-700)" : undefined,
                    borderWidth: i === 0 ? 2 : 1
                  }}>
                    <ProductIcon
                      kind={product.icon}
                      gradient={i === 0 ? product.gradient : [["#FAD0D8","#FFE066"], ["#D5E1F5","#B991E5"], ["#E7D7F7","#CAB0EC"]][i-1]}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div style={{display:"flex", gap: 8, marginBottom: 12}}>
                <span className="chip">{technique?.label}</span>
                <span className="chip chip-white">{product.category}</span>
                {product.seasons.map(s => {
                  const season = D.seasons.find(x => x.id === s);
                  return season && <span key={s} className="chip chip-yellow">{season.label}</span>;
                })}
              </div>

              <h1 style={{fontSize: "clamp(28px, 3.4vw, 40px)", marginBottom: 16}}>
                {product.name}
              </h1>

              <p style={{fontSize: 17, color:"var(--ink-soft)", lineHeight: 1.6, marginBottom: 24}}>
                {product.blurb}
              </p>

              <div style={{
                background: "var(--lilac-50)", borderRadius: 18, padding: 24, marginBottom: 32,
                border: "1px solid var(--lilac-100)"
              }}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
                  <span style={{fontSize: 13, color:"var(--ink-soft)", fontWeight: 600}}>Precio desde</span>
                  <span style={{fontFamily: "var(--font-display)", color:"var(--lilac-700)", fontSize: 44, fontWeight: 700, lineHeight: 1}}>
                    ${product.priceFrom}
                  </span>
                </div>
                <p style={{fontSize: 12, color:"var(--ink-faint)", marginTop: 8}}>
                  El precio final varía según diseño, cantidad y tiempo de entrega. Cotizamos personalmente por WhatsApp.
                </p>
              </div>

              {/* Selectors */}
              <div style={{marginBottom: 20}}>
                <label className="label">Talla / tamaño</label>
                <div style={{display:"flex", flexWrap:"wrap", gap: 8}}>
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 12,
                        border: `1.5px solid ${size === s ? "var(--lilac-700)" : "var(--line)"}`,
                        background: size === s ? "var(--lilac-700)" : "white",
                        color: size === s ? "white" : "var(--ink)",
                        fontWeight: 600, fontSize: 13, cursor: "pointer",
                        transition: "all .15s"
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{marginBottom: 20}}>
                <label className="label">Color</label>
                <div style={{display:"flex", flexWrap:"wrap", gap: 8}}>
                  {product.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 12,
                        border: `1.5px solid ${color === c ? "var(--lilac-700)" : "var(--line)"}`,
                        background: color === c ? "var(--lilac-50)" : "white",
                        color: color === c ? "var(--lilac-700)" : "var(--ink)",
                        fontWeight: 600, fontSize: 13, cursor: "pointer"
                      }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{marginBottom: 28, maxWidth: 200}}>
                <label className="label">Cantidad estimada</label>
                <div style={{display:"flex", alignItems:"center", border:"1.5px solid var(--line)", borderRadius: 12, overflow:"hidden", background:"white"}}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{padding: "12px 18px", color:"var(--lilac-700)", fontWeight: 700, fontSize: 18}}>−</button>
                  <input
                    type="number" min="1"
                    value={qty}
                    onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{flex: 1, padding: "12px 0", border: 0, textAlign:"center", fontWeight: 700, fontSize: 16}}
                  />
                  <button onClick={() => setQty(qty + 1)} style={{padding: "12px 18px", color:"var(--lilac-700)", fontWeight: 700, fontSize: 18}}>+</button>
                </div>
              </div>

              {/* WhatsApp CTA section */}
              <div style={{
                background: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
                borderRadius: 20, padding: 24,
                border: "1px solid #86EFAC",
                marginBottom: 16
              }}>
                <div style={{display:"flex", alignItems:"start", gap: 16, marginBottom: 16}}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: "var(--wa)", color:"white",
                    display: "grid", placeItems:"center",
                    flexShrink: 0
                  }}>
                    <WhatsAppGlyph size={24}/>
                  </div>
                  <div>
                    <h4 style={{marginBottom: 4, color: "#14532D"}}>Pide por WhatsApp</h4>
                    <p style={{fontSize: 13, color: "#166534", lineHeight: 1.5}}>
                      Nos llega tu selección con todos los detalles. Te respondemos lo más pronto posible con tu cotización.
                    </p>
                  </div>
                </div>
                <a className="btn btn-wa btn-lg" href={D.waLink(waText)} target="_blank" rel="noopener" style={{width:"100%"}}>
                  <WhatsAppGlyph size={18}/> Cotizar este pedido
                </a>
                <p style={{fontSize: 11, color:"#166534", textAlign:"center", marginTop: 10}}>
                  No se realizan pagos ni pedidos desde el sitio · Todo se confirma por WhatsApp
                </p>
              </div>

              {/* Status */}
              <div style={{display:"flex", gap: 16, fontSize: 13, color:"var(--ink-soft)"}}>
                {product.stock > 0 ? (
                  <span style={{display:"inline-flex", alignItems:"center", gap: 6}}>
                    <span style={{width: 8, height: 8, borderRadius: "50%", background:"#22C55E"}}/>
                    Disponible para cotizar
                  </span>
                ) : (
                  <span style={{display:"inline-flex", alignItems:"center", gap: 6}}>
                    <span style={{width: 8, height: 8, borderRadius: "50%", background:"var(--yellow-500)"}}/>
                    Bajo pedido
                  </span>
                )}
                <span style={{display:"inline-flex", alignItems:"center", gap: 6}}>
                  <Truck size={14}/> Envíos a todo México
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: specs / technique / care */}
      <section className="section-tight" style={{background: "var(--lilac-50)"}}>
        <div className="shell">
          <div style={{display:"flex", gap: 4, marginBottom: 28, borderBottom: "1px solid var(--lilac-200)"}}>
            {[
              { id: "specs", label: "Especificaciones" },
              { id: "technique", label: "Sobre la técnica" },
              { id: "care", label: "Cuidado" }
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{
                  padding: "12px 24px",
                  fontWeight: 700, fontSize: 14,
                  color: tab === t.id ? "var(--lilac-700)" : "var(--ink-soft)",
                  borderBottom: tab === t.id ? "3px solid var(--lilac-700)" : "3px solid transparent",
                  marginBottom: -1
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === "specs" && (
            <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap: 24}} className="specs-grid">
              <SpecRow label="Técnica" value={technique?.label}/>
              <SpecRow label="Categoría" value={product.category}/>
              <SpecRow label="Tallas/tamaños disponibles" value={product.sizes.join(" · ")}/>
              <SpecRow label="Colores disponibles" value={product.colors.join(" · ")}/>
              <SpecRow label="Temporadas" value={product.seasons.map(s => D.seasons.find(x => x.id === s)?.label).join(" · ")}/>
              <SpecRow label="Pedido mínimo" value="Confirmado al cotizar"/>
              <SpecRow label="Tiempo de producción" value="Confirmado al cotizar"/>
              <SpecRow label="Diseño incluido" value="Sí, ajustes ilimitados antes de aprobar"/>
            </div>
          )}

          {tab === "technique" && (
            <div style={{maxWidth: 720}}>
              <div className="card" style={{padding: 32}}>
                <h3 style={{marginBottom: 12}}>{technique?.label}</h3>
                <p style={{fontSize: 16, color:"var(--ink-soft)", lineHeight: 1.6, marginBottom: 20}}>
                  {technique?.desc}
                </p>
                <ul style={{listStyle:"none", display:"grid", gap: 12}}>
                  {[
                    "Tinta de alta calidad, resistente a lavado",
                    "Colores brillantes y duraderos",
                    "Ideal para diseños complejos y full color",
                    "Garantía de impresión duradera"
                  ].map((it, i) => (
                    <li key={i} style={{display:"flex", gap: 12, alignItems:"start"}}>
                      <span style={{
                        width: 22, height: 22, borderRadius: "50%",
                        background: "var(--lilac-100)", color: "var(--lilac-700)",
                        display: "grid", placeItems:"center", flexShrink: 0, marginTop: 2
                      }}><Check size={12}/></span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "care" && (
            <div style={{maxWidth: 720}}>
              <div className="card" style={{padding: 32}}>
                <h3 style={{marginBottom: 16}}>Cuidado y conservación</h3>
                <div style={{display:"grid", gap: 16}}>
                  {[
                    { t: "Lavado", d: "A mano o a máquina en programa delicado. Agua fría. Voltea la prenda al revés." },
                    { t: "Secado", d: "Al aire libre, lejos del sol directo. Evita secadora a temperatura alta." },
                    { t: "Planchado", d: "Por el revés o usando una tela protectora encima. No planches directamente sobre la impresión." },
                    { t: "Tazas", d: "Lavar a mano para conservar el estampado. Apta para microondas." }
                  ].map((it, i) => (
                    <div key={i} style={{display:"grid", gridTemplateColumns: "120px 1fr", gap: 20, paddingBottom: 16, borderBottom: i < 3 ? "1px solid var(--line)" : "none"}}>
                      <strong style={{color: "var(--lilac-700)"}}>{it.t}</strong>
                      <span style={{color:"var(--ink-soft)"}}>{it.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 720px) {
            .specs-grid { grid-template-columns: 1fr !important; }
            .product-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="section-tight">
          <div className="shell">
            <h3 style={{marginBottom: 24}}>También te puede gustar</h3>
            <div className="grid-4">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

const SpecRow = ({ label, value }) => (
  <div style={{
    display:"grid", gridTemplateColumns: "200px 1fr", gap: 20,
    padding: "12px 0",
    borderBottom: "1px solid var(--lilac-200)"
  }}>
    <span style={{fontSize: 13, color:"var(--ink-soft)", fontWeight: 600, textTransform:"uppercase", letterSpacing: ".04em"}}>{label}</span>
    <span style={{fontWeight: 600}}>{value}</span>
  </div>
);

// -----------------------------------------------------------
// SeasonsBanner — Big seasonal cards above product grid
// -----------------------------------------------------------

const SeasonsBanner = () => {
  const D = window.KEYLI_DATA;
  const items = D.seasons;

  // Dark, photo-like backdrops per season
  const treatments = {
    madres:       { from: "#3A1A2E", to: "#5C3A8C", subtitle: "Tazas y cuadros sublimados" },
    padres:       { from: "#1E2A4E", to: "#3E4E7C", subtitle: "Termos y playeras DTF" },
    ninos:        { from: "#1F4F4A", to: "#2A6E8C", subtitle: "Prendas DTF y puzzles" },
    maestros:     { from: "#2F4A2A", to: "#3E6E47", subtitle: "Tazas y detalles de fin de ciclo" },
    valentin:     { from: "#4A1E2E", to: "#A14060", subtitle: "Llaveros y tazas para parejas" },
    navidad:      { from: "#2A1E3E", to: "#5C3A8C", subtitle: "Esferas y regalos especiales" },
    muertos:      { from: "#3A1A4E", to: "#7C4FB8", subtitle: "Diseños conmemorativos" },
    graduaciones: { from: "#2A1E4E", to: "#7C57BD", subtitle: "Llaveros y uniformes" },
    xv:           { from: "#3E1F5C", to: "#9D6FD4", subtitle: "Recuerdos y detalles VIP" },
    babyshower:   { from: "#4A3A2A", to: "#A18560", subtitle: "Detalles tiernos personalizados" }
  };

  return (
    <section style={{ marginBottom: 28 }}>
      <div style={{marginBottom: 18}}>
        <span className="eyebrow">Temporadas especiales</span>
        <h2 style={{marginTop: 4, marginBottom: 0, fontSize: 26}}>
          Momentos <span className="script" style={{color:"var(--lilac-700)", fontSize:"1.1em"}}>Personalizados</span>
        </h2>
      </div>

      <div className="seasons-banner-scroll">
        {items.map((s) => {
          const t = treatments[s.id] || { from: "#3A2A5C", to: "#5C3A8C", subtitle: "" };
          return (
            <a key={s.id} href={`#/catalogo?season=${s.id}`} className="season-banner-card">
              <div className="season-banner-image" style={{
                background: `linear-gradient(150deg, ${t.from} 0%, ${t.to} 100%)`
              }}>
                <image-slot
                  id={`season-${s.id}`}
                  shape="rounded"
                  radius="18"
                  placeholder=""
                ></image-slot>
                <div className="season-banner-overlay">
                  <h3 className="season-banner-title">{s.label}</h3>
                  <p className="season-banner-sub">{t.subtitle}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <style>{`
        .seasons-banner-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 14px;
          margin: 0 -4px;
          padding-inline: 4px;
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
          scrollbar-color: var(--lilac-300) transparent;
        }
        .seasons-banner-scroll::-webkit-scrollbar { height: 8px; }
        .seasons-banner-scroll::-webkit-scrollbar-track {
          background: var(--lilac-50);
          border-radius: 999px;
        }
        .seasons-banner-scroll::-webkit-scrollbar-thumb {
          background: var(--lilac-300);
          border-radius: 999px;
        }
        .seasons-banner-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--lilac-500);
        }
        .season-banner-card {
          display: block;
          position: relative;
          flex: 0 0 280px;
          border-radius: 18px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          scroll-snap-align: start;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .season-banner-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 36px -16px rgba(92, 58, 140, 0.35);
        }
        .season-banner-image {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .season-banner-card image-slot {
          display: block;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          min-width: 0;
        }
        .season-banner-card image-slot::part(empty) {
          background: transparent;
        }
        .season-banner-card image-slot::part(frame) {
          border-radius: 0 !important;
        }
        .season-banner-overlay {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 16px 18px;
          background: linear-gradient(0deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,.15) 70%, transparent 100%);
          color: white;
          z-index: 2;
          pointer-events: none;
        }
        .season-banner-title {
          color: white;
          font-size: 20px;
          margin: 0 0 4px;
          line-height: 1.1;
        }
        .season-banner-sub {
          font-size: 12.5px;
          color: rgba(255,255,255,.85);
          margin: 0;
          line-height: 1.35;
        }
        @media (max-width: 720px) {
          .season-banner-card { flex-basis: 240px; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { CatalogScreen, ProductScreen, SpecRow, SeasonsBanner });
