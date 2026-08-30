// ponytail: datos de ejemplo — se reemplazan por consultas reales cuando el admin se conecte a Supabase
const STATS = [
  { label: "Productos activos", value: "24", icon: "inventory_2" },
  { label: "Temporadas activas", value: "6", icon: "calendar_month" },
  { label: "Productos sin imagen", value: "3", icon: "image_not_supported", alert: true },
  { label: "Productos destacados", value: "4", icon: "star" },
];

const ACTIVITY = [
  { icon: "edit", action: "Edición de producto", item: "Taza Clásica Blanca", date: "24/05/24, 14:30" },
  { icon: "add_circle", action: "Nueva temporada", item: "Verano 2024", date: "22/05/24, 09:15" },
  { icon: "image", action: "Actualización de imagen", item: "Playera Cuello V Negra", date: "21/05/24, 16:45" },
  { icon: "delete", action: "Eliminación de producto", item: "Gorra Básica (Dañada)", date: "20/05/24, 11:20", danger: true },
  { icon: "edit_note", action: "Edición de textos", item: "Página 'Quiénes Somos'", date: "18/05/24, 10:05" },
];

const QUICK_ACTIONS = [
  { icon: "add_box", label: "Nuevo producto" },
  { icon: "event_note", label: "Nueva temporada" },
  { icon: "upload_file", label: "Subir imágenes" },
  { icon: "edit_document", label: "Editar textos del sitio" },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-sm">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface p-4 rounded-lg flex items-center justify-between border border-outline-variant shadow-sm transition-transform hover:-translate-y-1"
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        <div className="lg:col-span-8 bg-surface rounded-lg border border-outline-variant shadow-sm overflow-hidden flex flex-col">
          <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant flex items-center justify-between">
            <h2 className="font-admin-section-header text-on-surface">Actividad reciente</h2>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant text-on-surface-variant font-admin-label-caps">
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Acción</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Elemento</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider text-right">Fecha</th>
                </tr>
              </thead>
              <tbody className="text-on-surface font-admin-data">
                {ACTIVITY.map((row, i) => (
                  <tr
                    key={row.item}
                    className={`hover:bg-surface-container-lowest transition-colors h-row-height-dense ${i < ACTIVITY.length - 1 ? "border-b border-outline-variant" : ""}`}
                  >
                    <td className="px-6 py-3 flex items-center gap-3">
                      <span className={`material-symbols-outlined text-lg ${row.danger ? "text-error" : "text-tertiary"}`}>{row.icon}</span>
                      <span className="font-medium">{row.action}</span>
                    </td>
                    <td className="px-6 py-3">{row.item}</td>
                    <td className="px-6 py-3 text-right text-on-surface-variant">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface rounded-lg border border-outline-variant shadow-sm overflow-hidden">
            <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant">
              <h2 className="font-admin-section-header text-on-surface">Accesos rápidos</h2>
            </div>
            <div className="p-6 flex flex-col gap-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  disabled
                  className="w-full flex items-center justify-between px-4 py-3 bg-surface border border-outline-variant text-primary font-semibold rounded-lg opacity-60 cursor-not-allowed"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined">{action.icon}</span>
                    {action.label}
                  </span>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low rounded-lg border border-outline-variant p-6 flex flex-col items-center justify-center text-center mt-auto shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-tertiary/5 rounded-full blur-xl" />
            <span className="material-symbols-outlined text-primary text-3xl mb-3 relative z-10">public</span>
            <p className="text-on-surface-variant text-sm mb-4 relative z-10">
              El sitio público está al día con los datos actuales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
