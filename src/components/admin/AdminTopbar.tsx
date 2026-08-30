import Link from "next/link";

export function AdminTopbar() {
  const today = new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });

  return (
    <header className="fixed top-0 left-sidebar-width right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant z-40 flex items-center justify-between px-8">
      <div className="text-sm text-on-surface-variant flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
        <span className="capitalize">{today}</span>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 text-sm font-semibold text-primary border border-primary rounded-lg hover:bg-primary-fixed transition-all"
        >
          Ver sitio público
        </Link>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
}
