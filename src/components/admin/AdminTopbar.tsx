"use client";

import Link from "next/link";

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant z-30 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          aria-label="Abrir menú"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary text-[18px]">brush</span>
        </div>
        <span className="hidden sm:inline font-admin-title text-base text-on-surface">Keyli Sub.</span>
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
