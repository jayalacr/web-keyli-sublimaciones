import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminBottomBar } from "@/components/admin/AdminBottomBar";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="font-admin-body text-on-surface bg-background min-h-screen">
      <AdminSidebar />
      <div className="pl-sidebar-width pb-20">
        <AdminTopbar />
        <main className="relative pt-16 min-h-screen bg-surface px-stack-md py-stack-md">{children}</main>
      </div>
      <AdminBottomBar />
    </div>
  );
}
