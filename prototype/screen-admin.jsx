// =============================================================
// Keyli — Admin Panel
// =============================================================

const AdminScreen = ({ route }) => {
  const D = window.KEYLI_DATA;

  // Local mutable state (mirrors data but editable)
  const [products, setProducts] = useState(D.products);
  const [seasons, setSeasons] = useState(D.seasons);
  const [view, setView] = useState(route.query.view || "dashboard");

  useEffect(() => { setView(route.query.view || "dashboard"); }, [route.query.view]);

  const stats = useMemo(() => ({
    totalProducts: products.length,
    activeSeasons: seasons.length,
    totalStock: products.reduce((acc, p) => acc + (p.stock || 0), 0),
    lowStock: products.filter(p => p.stock < 20).length
  }), [products, seasons]);

  return (
    <div className="admin-shell">
      <AdminSidebar view={view} onChange={setView}/>
      <div className="admin-main">
        <AdminTopbar view={view}/>

        {view === "dashboard" && <DashboardView products={products} seasons={seasons} stats={stats}/>}
        {view === "productos" && <ProductsView products={products} setProducts={setProducts} seasons={seasons}/>}
        {view === "temporadas" && <SeasonsView seasons={seasons} setSeasons={setSeasons} products={products}/>}
        {view === "categorias" && <CategoriesView products={products}/>}
        {view === "config" && <ConfigView/>}
      </div>
    </div>
  );
};

const AdminSidebar = ({ view, onChange }) => {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "productos", label: "Productos", icon: "🛍" },
    { id: "temporadas", label: "Temporadas", icon: "🌸" },
    { id: "categorias", label: "Categorías", icon: "🏷" },
    { id: "config", label: "Configuración", icon: "⚙️" }
  ];

  return (
    <aside className="admin-sidebar">
      <div style={{marginBottom: 32, padding: "8px 12px"}}>
        <LogoLockup/>
        <span style={{
          fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase",
          color: "var(--lilac-700)", fontWeight: 700, marginTop: 4, display: "inline-block"
        }}>
          Panel Admin
        </span>
      </div>

      {items.map(it => (
        <a key={it.id}
           href={`#/admin?view=${it.id}`}
           className="admin-link"
           data-active={view === it.id}
           onClick={() => onChange(it.id)}>
          <span style={{fontSize: 18, lineHeight: 1}}>{it.icon}</span>
          <span>{it.label}</span>
        </a>
      ))}

      <div style={{marginTop: 40, padding: "16px", background: "var(--lilac-50)", borderRadius: 12}}>
        <div style={{fontSize: 12, fontWeight: 700, color:"var(--lilac-700)", marginBottom: 4}}>Modo demostración</div>
        <p style={{fontSize: 12, color:"var(--ink-soft)", lineHeight: 1.4}}>
          Los cambios son simulados y no se persisten.
        </p>
      </div>

      <a href="#/" style={{
        display: "block", marginTop: 24, fontSize: 13,
        color: "var(--ink-soft)", padding: "12px 16px"
      }}>← Volver al sitio</a>
    </aside>
  );
};

const AdminTopbar = ({ view }) => {
  const titles = {
    dashboard: { t: "Dashboard", s: "Resumen del catálogo y actividad" },
    productos: { t: "Productos", s: "Administra tu catálogo completo" },
    temporadas: { t: "Temporadas", s: "Gestiona las temporadas y fechas especiales" },
    categorias: { t: "Categorías", s: "Organiza tus productos en categorías" },
    config: { t: "Configuración", s: "Datos de contacto y preferencias" }
  };
  const info = titles[view];

  return (
    <div style={{
      display:"flex", justifyContent:"space-between", alignItems:"center",
      marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid var(--line)",
      flexWrap:"wrap", gap: 16
    }}>
      <div>
        <h1 style={{fontSize: 28, marginBottom: 4}}>{info.t}</h1>
        <p className="muted" style={{fontSize: 14}}>{info.s}</p>
      </div>
      <div style={{display:"flex", gap: 12, alignItems:"center"}}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "var(--lilac-100)", color: "var(--lilac-700)",
          display:"grid", placeItems:"center", fontWeight: 700
        }}>K</div>
        <div>
          <div style={{fontSize: 13, fontWeight: 700}}>Keyli</div>
          <div style={{fontSize: 11, color:"var(--ink-faint)"}}>Administrador</div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// Dashboard View
// -----------------------------------------------------------

const DashboardView = ({ products, seasons, stats }) => {
  const D = window.KEYLI_DATA;
  const lowStockProducts = products.filter(p => p.stock < 20).slice(0, 5);
  const upcomingSeasons = seasons.slice(0, 4);

  return (
    <div>
      {/* Stats cards */}
      <div className="grid-4" style={{marginBottom: 32}}>
        <StatCard label="Productos activos" value={stats.totalProducts} icon="🛍" trend="En catálogo" tint="var(--lilac-100)"/>
        <StatCard label="Temporadas" value={stats.activeSeasons} icon="🌸" trend="Configuradas" tint="#FAD0D8"/>
        <StatCard label="Stock total" value={stats.totalStock} icon="📦" trend="Piezas disponibles" tint="var(--yellow-200)"/>
        <StatCard label="Stock bajo" value={stats.lowStock} icon="⚠️" trend="Productos con poco stock" tint="#FECACA"/>
      </div>

      <div style={{display:"grid", gridTemplateColumns: "2fr 1fr", gap: 24}} className="dash-grid">
        {/* Low stock list */}
        <div className="card" style={{padding: 28}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 20}}>
            <h3>Stock bajo</h3>
            <a href="#/admin?view=productos" style={{fontSize: 13, color:"var(--lilac-700)", fontWeight: 600}}>
              Ver todo →
            </a>
          </div>
          <div style={{display:"grid", gap: 12}}>
            {lowStockProducts.map(p => (
              <div key={p.id} style={{
                display:"grid", gridTemplateColumns: "auto 1fr auto",
                gap: 16, alignItems:"center",
                padding: 12, background: "var(--lilac-50)",
                borderRadius: 12
              }}>
                <div style={{width: 48, height: 48, borderRadius: 10, overflow:"hidden", position:"relative"}}>
                  <ProductIcon kind={p.icon} gradient={p.gradient}/>
                </div>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>{p.name}</div>
                  <div style={{fontSize: 12, color:"var(--ink-faint)"}}>${p.priceFrom} · {p.category}</div>
                </div>
                <span className="badge" style={{
                  background: p.stock === 0 ? "#FECACA" : "var(--yellow-200)",
                  color: p.stock === 0 ? "#7F1D1D" : "#78350F"
                }}>
                  {p.stock} unid
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming seasons */}
        <div className="card" style={{padding: 28}}>
          <h3 style={{marginBottom: 20}}>Próximas temporadas</h3>
          <div style={{display:"grid", gap: 14}}>
            {upcomingSeasons.map(s => (
              <div key={s.id} style={{display:"flex", gap: 14, alignItems:"center"}}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: s.tint, display:"grid", placeItems:"center",
                  fontSize: 24
                }}>{s.emoji}</div>
                <div style={{flex: 1}}>
                  <div style={{fontWeight: 600, fontSize: 14}}>{s.label}</div>
                  <div style={{fontSize: 12, color:"var(--ink-faint)"}}>{s.month}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .dash-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const StatCard = ({ label, value, icon, trend, tint }) => (
  <div className="card" style={{padding: 22}}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"start", marginBottom: 16}}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: tint,
        display:"grid", placeItems:"center", fontSize: 20
      }}>{icon}</div>
    </div>
    <div style={{fontSize: 28, fontWeight: 800, color:"var(--ink)", marginBottom: 4}}>{value}</div>
    <div style={{fontSize: 13, color:"var(--ink-soft)", fontWeight: 600, marginBottom: 2}}>{label}</div>
    <div style={{fontSize: 11, color:"var(--ink-faint)"}}>{trend}</div>
  </div>
);

// -----------------------------------------------------------
// Products View
// -----------------------------------------------------------

const ProductsView = ({ products, setProducts, seasons }) => {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (product) => {
    if (editing) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      setProducts([{ ...product, id: `prod-${Date.now()}` }, ...products]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (confirm("¿Eliminar este producto?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 24, gap: 16, flexWrap:"wrap"}}>
        <div style={{position:"relative", flex:"1 1 280px", maxWidth: 360}}>
          <span style={{position:"absolute", left: 14, top: "50%", transform:"translateY(-50%)", color:"var(--ink-faint)"}}>
            <Search size={16}/>
          </span>
          <input
            className="input"
            placeholder="Buscar producto…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{paddingLeft: 40}}
          />
        </div>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}>
          <Plus size={16}/> Nuevo producto
        </button>
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Técnica</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th style={{textAlign:"right"}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td>
                <div style={{display:"flex", gap: 12, alignItems:"center"}}>
                  <div style={{width: 40, height: 40, borderRadius: 8, overflow:"hidden", position:"relative", flexShrink: 0}}>
                    <ProductIcon kind={p.icon} gradient={p.gradient}/>
                  </div>
                  <div>
                    <div style={{fontWeight: 600, fontSize: 14}}>{p.name}</div>
                    <div style={{fontSize: 11, color:"var(--ink-faint)"}}>{p.id}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="chip" style={{fontSize: 11, padding: "3px 8px"}}>
                  {p.technique === "dtf" ? "DTF" : p.technique === "sublimacion" ? "Sublimación" : "Digital"}
                </span>
              </td>
              <td style={{fontSize: 14, color:"var(--ink-soft)"}}>{p.category}</td>
              <td style={{fontWeight: 700, color:"var(--lilac-700)"}}>${p.priceFrom}</td>
              <td>
                <span style={{
                  fontWeight: 600,
                  color: p.stock === 0 ? "#7F1D1D" : p.stock < 20 ? "#78350F" : "var(--ink)"
                }}>
                  {p.stock}
                </span>
              </td>
              <td>
                <span className="badge" style={{
                  background: p.featured ? "var(--yellow-200)" : "var(--lilac-100)",
                  color: p.featured ? "#78350F" : "var(--lilac-700)"
                }}>
                  {p.featured ? "Destacado" : "Activo"}
                </span>
              </td>
              <td>
                <div style={{display:"flex", gap: 6, justifyContent:"flex-end"}}>
                  <button onClick={() => { setEditing(p); setShowForm(true); }}
                    style={{padding: 8, borderRadius: 8, color:"var(--lilac-700)", background:"var(--lilac-50)"}}>
                    <Edit size={14}/>
                  </button>
                  <button onClick={() => handleDelete(p.id)}
                    style={{padding: 8, borderRadius: 8, color:"#DC2626", background:"#FEF2F2"}}>
                    <Trash size={14}/>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <ProductForm
          product={editing}
          seasons={seasons}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

const ProductForm = ({ product, seasons, onClose, onSave }) => {
  const [form, setForm] = useState(product || {
    name: "", technique: "sublimacion", category: "", priceFrom: 0,
    blurb: "", colors: [], sizes: [], seasons: [], icon: "shirt",
    gradient: ["#E6D3FB", "#CAB0EC"], stock: 0, featured: false
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  const toggleSeason = (sid) => {
    const list = form.seasons || [];
    update("seasons", list.includes(sid) ? list.filter(x => x !== sid) : [...list, sid]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth: 720}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 20}}>
          <h3>{product ? "Editar producto" : "Nuevo producto"}</h3>
          <button onClick={onClose} style={{padding: 8}}><X size={20}/></button>
        </div>

        <div style={{display:"grid", gap: 16}}>
          <div>
            <label className="label">Nombre del producto</label>
            <input className="input" value={form.name} onChange={e => update("name", e.target.value)} placeholder="Ej. Playera DTF — Día de las Madres"/>
          </div>

          <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12}}>
            <div>
              <label className="label">Técnica</label>
              <select className="select" value={form.technique} onChange={e => update("technique", e.target.value)}>
                <option value="dtf">DTF</option>
                <option value="sublimacion">Sublimación</option>
                <option value="digital">Trabajos digitales</option>
              </select>
            </div>
            <div>
              <label className="label">Categoría</label>
              <select className="select" value={form.category} onChange={e => update("category", e.target.value)}>
                <option value="">Seleccionar…</option>
                <option>Playeras</option>
                <option>Tazas</option>
                <option>Termos</option>
                <option>Llaveros</option>
                <option>Vinil</option>
              </select>
            </div>
            <div>
              <label className="label">Tipo gráfico</label>
              <select className="select" value={form.icon} onChange={e => update("icon", e.target.value)}>
                <option value="shirt">Playera</option>
                <option value="mug">Taza</option>
                <option value="bottle">Termo/Botella</option>
                <option value="key">Llavero</option>
                <option value="tag">Etiqueta/Vinil</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Descripción</label>
            <textarea className="textarea" rows="3" value={form.blurb} onChange={e => update("blurb", e.target.value)}
              placeholder="Materiales, terminados, detalles…"/>
          </div>

          <div style={{display:"grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
            <div>
              <label className="label">Precio desde ($)</label>
              <input className="input" type="number" value={form.priceFrom} onChange={e => update("priceFrom", parseInt(e.target.value) || 0)}/>
            </div>
            <div>
              <label className="label">Stock disponible</label>
              <input className="input" type="number" value={form.stock} onChange={e => update("stock", parseInt(e.target.value) || 0)}/>
            </div>
          </div>

          <div>
            <label className="label">Tallas/tamaños (separados por coma)</label>
            <input className="input"
              value={Array.isArray(form.sizes) ? form.sizes.join(", ") : ""}
              onChange={e => update("sizes", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
              placeholder="CH, M, G, XG"/>
          </div>

          <div>
            <label className="label">Colores disponibles (separados por coma)</label>
            <input className="input"
              value={Array.isArray(form.colors) ? form.colors.join(", ") : ""}
              onChange={e => update("colors", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
              placeholder="Blanco, Lila, Negro"/>
          </div>

          <div>
            <label className="label">Temporadas asociadas</label>
            <div style={{display:"flex", flexWrap:"wrap", gap: 6}}>
              {seasons.map(s => (
                <button key={s.id}
                  onClick={() => toggleSeason(s.id)}
                  className="chip"
                  style={{
                    cursor:"pointer",
                    background: (form.seasons || []).includes(s.id) ? "var(--lilac-700)" : "var(--lilac-100)",
                    color: (form.seasons || []).includes(s.id) ? "white" : "var(--lilac-700)"
                  }}>
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>
          </div>

          <label style={{display:"flex", alignItems:"center", gap: 10, cursor: "pointer"}}>
            <input type="checkbox" checked={form.featured} onChange={e => update("featured", e.target.checked)}/>
            <span style={{fontSize: 14, fontWeight: 600}}>Producto destacado en landing</span>
          </label>
        </div>

        <div style={{display:"flex", gap: 8, justifyContent:"flex-end", marginTop: 28}}>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => onSave(form)}>
            <Check size={14}/> Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// Seasons View
// -----------------------------------------------------------

const SeasonsView = ({ seasons, setSeasons, products }) => {
  const [editing, setEditing] = useState(null);

  const handleSave = (s) => {
    if (s.id && seasons.find(x => x.id === s.id)) {
      setSeasons(seasons.map(x => x.id === s.id ? s : x));
    } else {
      setSeasons([...seasons, { ...s, id: s.id || `season-${Date.now()}` }]);
    }
    setEditing(null);
  };

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 24}}>
        <p className="muted">Activa o desactiva las temporadas que aparecerán en el sitio.</p>
        <button className="btn btn-primary" onClick={() => setEditing({ label: "", emoji: "✨", month: "", tint: "#E6D3FB" })}>
          <Plus size={16}/> Nueva temporada
        </button>
      </div>

      <div className="grid-3">
        {seasons.map(s => {
          const productCount = products.filter(p => p.seasons.includes(s.id)).length;
          return (
            <div key={s.id} className="card" style={{padding: 24}}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: s.tint, display: "grid", placeItems:"center",
                fontSize: 32, marginBottom: 16
              }}>{s.emoji}</div>
              <h4 style={{marginBottom: 6}}>{s.label}</h4>
              <p className="muted" style={{fontSize: 13, marginBottom: 16}}>
                <Clock size={11}/> {s.month} · {productCount} producto{productCount !== 1 ? "s" : ""}
              </p>
              <div style={{display:"flex", gap: 8}}>
                <button onClick={() => setEditing(s)}
                  className="btn btn-ghost btn-sm" style={{flex: 1}}>
                  <Edit size={12}/> Editar
                </button>
                <button onClick={() => {
                  if (confirm("¿Eliminar temporada?")) setSeasons(seasons.filter(x => x.id !== s.id));
                }} style={{padding: 8, borderRadius: 10, color:"#DC2626", background:"#FEF2F2"}}>
                  <Trash size={14}/>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <SeasonForm season={editing} onClose={() => setEditing(null)} onSave={handleSave}/>
      )}
    </div>
  );
};

const SeasonForm = ({ season, onClose, onSave }) => {
  const [form, setForm] = useState(season);
  const update = (k, v) => setForm({ ...form, [k]: v });
  const tintOptions = ["#F5D8E8", "#D5E1F5", "#FFE6C2", "#E0F0DC", "#FAD0D8", "#D7EFD9", "#F1D9F0", "#E1DAF5", "#EFDFF7", "#F0E2D8", "#E6D3FB"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 20}}>
          <h3>{season.id ? "Editar temporada" : "Nueva temporada"}</h3>
          <button onClick={onClose} style={{padding: 8}}><X size={20}/></button>
        </div>

        <div style={{display:"grid", gap: 16}}>
          <div style={{display:"grid", gridTemplateColumns: "100px 1fr", gap: 12}}>
            <div>
              <label className="label">Emoji</label>
              <input className="input" value={form.emoji} onChange={e => update("emoji", e.target.value)}
                style={{textAlign:"center", fontSize: 24}}/>
            </div>
            <div>
              <label className="label">Nombre</label>
              <input className="input" value={form.label} onChange={e => update("label", e.target.value)} placeholder="Día de la Madre"/>
            </div>
          </div>

          <div>
            <label className="label">Mes / fecha</label>
            <input className="input" value={form.month} onChange={e => update("month", e.target.value)} placeholder="Mayo"/>
          </div>

          <div>
            <label className="label">Color de fondo</label>
            <div style={{display:"flex", gap: 8, flexWrap:"wrap"}}>
              {tintOptions.map(c => (
                <button key={c} onClick={() => update("tint", c)}
                  style={{
                    width: 36, height: 36, borderRadius: 10, background: c,
                    border: form.tint === c ? "2px solid var(--lilac-700)" : "2px solid transparent",
                    cursor:"pointer"
                  }}/>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:"flex", gap: 8, justifyContent:"flex-end", marginTop: 28}}>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => onSave(form)}>
            <Check size={14}/> Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// Categories View
// -----------------------------------------------------------

const CategoriesView = ({ products }) => {
  const categories = useMemo(() => {
    const map = {};
    products.forEach(p => {
      if (!map[p.category]) map[p.category] = { count: 0, items: [] };
      map[p.category].count++;
      map[p.category].items.push(p);
    });
    return Object.entries(map);
  }, [products]);

  return (
    <div>
      <p className="muted" style={{marginBottom: 24}}>
        Las categorías se generan automáticamente desde tus productos. Edita un producto para cambiar su categoría.
      </p>
      <div className="grid-3">
        {categories.map(([cat, { count, items }]) => (
          <div key={cat} className="card" style={{padding: 24}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"start", marginBottom: 16}}>
              <h4>{cat}</h4>
              <span className="chip">{count}</span>
            </div>
            <div style={{display:"grid", gap: 8}}>
              {items.slice(0, 3).map(p => (
                <div key={p.id} style={{display:"flex", gap: 10, alignItems:"center"}}>
                  <div style={{width: 32, height: 32, borderRadius: 8, overflow:"hidden", position:"relative"}}>
                    <ProductIcon kind={p.icon} gradient={p.gradient}/>
                  </div>
                  <span style={{fontSize: 13}}>{p.name}</span>
                </div>
              ))}
              {items.length > 3 && (
                <span style={{fontSize: 12, color:"var(--ink-faint)"}}>+{items.length - 3} más</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// Config View
// -----------------------------------------------------------

const ConfigView = () => {
  const D = window.KEYLI_DATA;
  const [phone, setPhone] = useState(D.PHONE);
  const [name, setName] = useState("Keyli Sublimaciones");
  const [slogan, setSlogan] = useState("Creamos tu idea.");
  const [hours, setHours] = useState("Lun – Sáb");
  const [city, setCity] = useState("CDMX · Envíos a todo México");
  const [saved, setSaved] = useState(false);

  return (
    <div style={{maxWidth: 720}}>
      <div className="card" style={{padding: 32, marginBottom: 24}}>
        <h3 style={{marginBottom: 6}}>Datos del negocio</h3>
        <p className="muted" style={{fontSize: 13, marginBottom: 24}}>
          Esta información aparece en el sitio público y en los mensajes pre-llenados de WhatsApp.
        </p>

        <div style={{display:"grid", gap: 16}}>
          <div>
            <label className="label">Nombre del negocio</label>
            <input className="input" value={name} onChange={e => setName(e.target.value)}/>
          </div>
          <div>
            <label className="label">Eslogan</label>
            <input className="input" value={slogan} onChange={e => setSlogan(e.target.value)}/>
          </div>
          <div>
            <label className="label">WhatsApp (10 dígitos, con lada)</label>
            <input className="input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="525512345678"/>
          </div>
          <div>
            <label className="label">Horario</label>
            <input className="input" value={hours} onChange={e => setHours(e.target.value)}/>
          </div>
          <div>
            <label className="label">Zona / ubicación</label>
            <input className="input" value={city} onChange={e => setCity(e.target.value)}/>
          </div>
        </div>

        <div style={{display:"flex", gap: 8, marginTop: 28, justifyContent:"flex-end"}}>
          <button className="btn btn-primary" onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}>
            <Check size={14}/> {saved ? "¡Guardado!" : "Guardar cambios"}
          </button>
        </div>
      </div>

      <div className="card" style={{padding: 32}}>
        <h3 style={{marginBottom: 6}}>Política de cancelación</h3>
        <p className="muted" style={{fontSize: 13, marginBottom: 20}}>
          Configura los textos que aparecen en la página de proceso.
        </p>
        <div style={{display:"grid", gap: 16}}>
          {D.cancellationPolicy.map((c, i) => (
            <div key={i} style={{padding: 16, background:"var(--lilac-50)", borderRadius: 12}}>
              <input className="input" defaultValue={c.window} style={{marginBottom: 8, fontWeight: 700}}/>
              <textarea className="textarea" defaultValue={c.detail} rows="2"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  AdminScreen, AdminSidebar, AdminTopbar,
  DashboardView, ProductsView, SeasonsView, CategoriesView, ConfigView,
  ProductForm, SeasonForm, StatCard
});
