// =============================================================
// Keyli — CategoryCard (catalog tile, replaces product grid items)
// =============================================================

const CategoryCard = ({ entry, onOpen }) => {
  const { meta, items, count, priceFrom } = entry;
  const D = window.KEYLI_DATA;
  // Use up to 3 examples for the inspiration mosaic
  const examples = items.length
    ? items.slice(0, 3)
    : D.products.filter(p => p.category === meta.label).slice(0, 3);
  const techniqueLabels = meta.techniques
    .map(t => D.techniques.find(x => x.id === t)?.label)
    .filter(Boolean);

  return (
    <article
      className="category-card"
      onClick={onOpen}
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); }
      }}
    >
      {/* Hero */}
      <div className="category-card-hero" style={{
        background: `linear-gradient(140deg, ${meta.gradient[0]} 0%, ${meta.gradient[1]} 100%)`
      }}>
        <ProductIcon kind={meta.icon} gradient={meta.gradient}/>
        <span className="category-card-tag">
          <Sparkle size={11} color="var(--yellow-500)"/>
          Personalizable
        </span>
      </div>

      {/* Inspiration mosaic */}
      <div className="category-card-mosaic">
        {examples.length > 0 ? examples.map((p) => (
          <div key={p.id} className="category-card-mini" style={{
            background: `linear-gradient(135deg, ${p.gradient[0]} 0%, ${p.gradient[1]} 100%)`
          }}>
            <ProductIcon kind={p.icon} gradient={p.gradient}/>
          </div>
        )) : (
          <div className="category-card-mini-empty">
            <span>Sin ejemplos para esta temporada</span>
          </div>
        )}
        {examples.length > 0 && examples.length < 3 &&
          Array.from({ length: 3 - examples.length }, (_, i) => (
            <div key={`empty-${i}`} className="category-card-mini category-card-mini-ghost"/>
          ))}
      </div>

      {/* Body */}
      <div className="category-card-body">
        <h3 className="category-card-title">{meta.label}</h3>
        <p className="category-card-tagline">{meta.tagline}</p>
        <div className="category-card-tech">
          {techniqueLabels.map(t => (
            <span key={t} className="category-card-tech-chip">{t}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="category-card-footer">
        <div className="category-card-stats">
          {priceFrom != null && (
            <span className="category-card-price">Desde <strong>${priceFrom}</strong> MXN</span>
          )}
          {count > 0 && (
            <span className="category-card-count">· {count} {count === 1 ? "estilo" : "estilos"}</span>
          )}
          {count === 0 && (
            <span className="category-card-count">A la medida</span>
          )}
        </div>
        <span className="category-card-cta">
          Ver ejemplos
          <ArrowRight size={14}/>
        </span>
      </div>
    </article>
  );
};

Object.assign(window, { CategoryCard });
