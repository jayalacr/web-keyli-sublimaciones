export function AdminBottomBar() {
  return (
    <footer className="fixed bottom-0 left-sidebar-width right-0 h-16 bg-surface-container-highest border-t border-outline-variant flex items-center justify-between px-8 z-50">
      <div className="flex items-center gap-4">
        {/* ponytail: sin acción real todavía — se conecta cuando el sitio público lea de Supabase en vez de datos hardcodeados */}
        <button className="flex items-center px-4 py-2 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:bg-on-primary-fixed-variant transition-all shadow-sm" disabled>
          <span className="material-symbols-outlined mr-2 text-[18px]">sync</span>
          Actualizar sitio
        </button>
        <div className="h-4 w-px bg-outline-variant mx-2" />
        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-success" />
          Sitio al día
        </div>
      </div>
      <div className="text-xs font-admin-label-caps text-on-surface-variant tracking-wider uppercase">Keyli Admin</div>
    </footer>
  );
}
