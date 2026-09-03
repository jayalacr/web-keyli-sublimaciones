"use client";

import { useState, type ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export function AdminShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AdminTopbar onMenuClick={() => setMenuOpen((v) => !v)} />
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="min-h-screen bg-surface px-4 md:px-stack-md pb-stack-md pt-24">{children}</main>
    </>
  );
}
