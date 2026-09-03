import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { diasHastaProxima } from "@/lib/temporadas";

const QUICK_ACTIONS = [
  { icon: "add_box", label: "Nuevo producto", href: "/admin/productos/nuevo" },
  { icon: "edit_document", label: "Editar textos del sitio", href: "/admin/configuracion" },
  { icon: "event_note", label: "Nueva temporada", href: null },
  { icon: "upload_file", label: "Subir imágenes", href: null },
];

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export default async function AdminDashboardPage() {
  const db = supabaseAdmin();
  const [{ data: productos, error: prodErr }, { data: categorias, error: catErr }, { data: temporadas, error: seasErr }] = await Promise.all([
    db
      .from("productos")
      .select("id,nombre,slug,imagen_url,descripcion,material,tecnica,activo,destacado,categoria_id,actualizado_en")
      .order("actualizado_en", { ascending: false }),
    db.from("categorias").select("id,nombre"),
    db
      .from("temporadas")
      .select("id,nombre,slug,activa,fecha_inicio_mes,fecha_inicio_dia,fecha_fin_mes,fecha_fin_dia")
      .order("orden"),
  ]);
  if (prodErr) throw prodErr;
  if (catErr) throw catErr;
  if (seasErr) throw seasErr;

  const hoy = new Date();

  const stats = [
    { label: "Productos activos", value: String(productos.filter((p) => p.activo).length), icon: "inventory_2" },
    { label: "Temporadas activas", value: String(temporadas.filter((t) => t.activa).length), icon: "calendar_month" },
    { label: "Productos sin imagen", value: String(productos.filter((p) => !p.imagen_url).length), icon: "image_not_supported", alert: productos.some((p) => !p.imagen_url) },
    { label: "Productos destacados", value: String(productos.filter((p) => p.destacado).length), icon: "star" },
  ];

  const sinImagen = productos.filter((p) => !p.imagen_url).slice(0, 4);
  const categoriasSinProductos = categorias.filter((c) => !productos.some((p) => p.categoria_id === c.id));
  const fichaIncompleta = productos.filter((p) => !p.descripcion || !p.material || !p.tecnica).slice(0, 4);
  const ultimosEditados = productos.slice(0, 5);

  const proximaTemporada = temporadas
    .filter((t): t is typeof temporadas[number] & { fecha_inicio_mes: number; fecha_inicio_dia: number } => t.fecha_inicio_mes != null && t.fecha_inicio_dia != null)
    .map((t) => ({ ...t, dias: diasHastaProxima(t.fecha_inicio_mes, t.fecha_inicio_dia, hoy) }))
    .sort((a, b) => a.dias - b.dias)[0];

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-8">
      <div>
        <p className="font-admin-label-caps text-primary uppercase tracking-wider mb-1">Panel de control</p>
        <h1 className="font-display text-3xl md:text-4xl text-on-surface">Hola, Keyli</h1>
        <p className="text-on-surface-variant mt-1">Esto es lo que está pasando en tu catálogo hoy.</p>
      </div>

      <section>
        <h2 className="font-admin-label-caps text-on-surface-variant uppercase tracking-wider mb-3">Resumen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-sm">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface p-4 rounded-xl flex items-center justify-between border border-outline-variant shadow-sm transition-transform hover:-translate-y-1"
            >
              <div>
                <p className="text-on-surface-variant font-admin-label-caps uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`font-admin-title text-3xl font-bold flex items-center gap-2 ${stat.alert ? "text-error" : "text-on-surface"}`}>
                  {stat.value}
                  {stat.alert && (
                    <span className="text-xs font-admin-label-caps bg-error-container text-on-error-container px-2 py-0.5 rounded">
                      Atención
                    </span>
                  )}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.alert ? "bg-error-container/50" : "bg-primary-container/30"}`}>
                <span className={`material-symbols-outlined text-2xl ${stat.alert ? "text-error" : "text-primary"}`}>{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-admin-label-caps text-on-surface-variant uppercase tracking-wider mb-3">Próxima temporada</h2>
        {proximaTemporada ? (
          <Link
            href="/admin/temporadas"
            className="flex items-center justify-between gap-4 bg-primary-container/20 border border-primary-container rounded-xl p-5 shadow-sm hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-2xl">celebration</span>
              </div>
              <div>
                <p className="font-admin-section-header text-on-surface">{proximaTemporada.nombre}</p>
                <p className="text-sm text-on-surface-variant">
                  Comienza el {proximaTemporada.fecha_inicio_dia} de {MESES[proximaTemporada.fecha_inicio_mes - 1]}
                  {" — "}
                  {proximaTemporada.dias === 0 ? "hoy" : proximaTemporada.dias === 1 ? "en 1 día" : `en ${proximaTemporada.dias} días`}
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </Link>
        ) : (
          <p className="text-sm text-on-surface-variant italic">Ninguna temporada tiene fechas de vigencia configuradas todavía.</p>
        )}
      </section>

      <section>
        <h2 className="font-admin-label-caps text-on-surface-variant uppercase tracking-wider mb-3">Pendientes por revisar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-sm">
          <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-outline-variant flex items-center justify-between">
              <span className="font-admin-section-header text-on-surface">Sin imagen</span>
              <span className="text-xs font-admin-label-caps bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded">
                {productos.filter((p) => !p.imagen_url).length}
              </span>
            </div>
            <div className="p-2 flex-1">
              {sinImagen.length === 0 ? (
                <p className="text-sm text-on-surface-variant italic px-2 py-2">Todo con imagen.</p>
              ) : (
                sinImagen.map((p) => (
                  <Link key={p.id} href={`/admin/productos/${p.id}`} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-surface-container-low transition-colors text-sm text-on-surface">
                    {p.nombre}
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-outline-variant flex items-center justify-between">
              <span className="font-admin-section-header text-on-surface">Categorías vacías</span>
              <span className="text-xs font-admin-label-caps bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded">
                {categoriasSinProductos.length}
              </span>
            </div>
            <div className="p-2 flex-1">
              {categoriasSinProductos.length === 0 ? (
                <p className="text-sm text-on-surface-variant italic px-2 py-2">Todas tienen productos.</p>
              ) : (
                categoriasSinProductos.map((c) => (
                  <Link key={c.id} href="/admin/categorias" className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-surface-container-low transition-colors text-sm text-on-surface">
                    {c.nombre}
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-outline-variant flex items-center justify-between">
              <span className="font-admin-section-header text-on-surface">Ficha incompleta</span>
              <span className="text-xs font-admin-label-caps bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded">
                {productos.filter((p) => !p.descripcion || !p.material || !p.tecnica).length}
              </span>
            </div>
            <div className="p-2 flex-1">
              {fichaIncompleta.length === 0 ? (
                <p className="text-sm text-on-surface-variant italic px-2 py-2">Todas las fichas completas.</p>
              ) : (
                fichaIncompleta.map((p) => (
                  <Link key={p.id} href={`/admin/productos/${p.id}`} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-surface-container-low transition-colors text-sm text-on-surface">
                    {p.nombre}
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-admin-label-caps text-on-surface-variant uppercase tracking-wider mb-3">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-sm">
          {QUICK_ACTIONS.map((action) =>
            action.href ? (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between px-4 py-3 bg-surface border border-outline-variant text-primary font-semibold rounded-xl shadow-sm hover:bg-primary-fixed hover:-translate-y-0.5 transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">{action.icon}</span>
                  {action.label}
                </span>
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            ) : (
              <button
                key={action.label}
                disabled
                title="Próximamente"
                className="flex items-center justify-between px-4 py-3 bg-surface border border-outline-variant text-primary font-semibold rounded-xl opacity-50 cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">{action.icon}</span>
                  {action.label}
                </span>
                <span className="text-[10px] font-admin-label-caps uppercase text-on-surface-variant">Próximamente</span>
              </button>
            )
          )}
        </div>
      </section>

      <section>
        <h2 className="font-admin-label-caps text-on-surface-variant uppercase tracking-wider mb-3">Últimos productos editados</h2>
        <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant text-on-surface-variant font-admin-label-caps">
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider text-right">Última edición</th>
                </tr>
              </thead>
              <tbody className="text-on-surface font-admin-data">
                {ultimosEditados.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-center text-on-surface-variant italic">
                      Todavía no hay productos.
                    </td>
                  </tr>
                ) : (
                  ultimosEditados.map((p, i) => (
                    <tr
                      key={p.id}
                      className={`hover:bg-surface-container-lowest transition-colors h-row-height-dense ${i < ultimosEditados.length - 1 ? "border-b border-outline-variant" : ""}`}
                    >
                      <td className="px-6 py-3">
                        <Link href={`/admin/productos/${p.id}`} className="font-medium hover:text-primary transition-colors">
                          {p.nombre}
                        </Link>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`text-xs font-medium ${p.activo ? "text-success" : "text-outline"}`}>{p.activo ? "Activo" : "Inactivo"}</span>
                      </td>
                      <td className="px-6 py-3 text-right text-on-surface-variant">
                        {new Date(p.actualizado_en).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
