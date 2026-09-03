import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="font-admin-body text-on-surface bg-background min-h-screen">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
