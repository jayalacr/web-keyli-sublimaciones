import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
        background: "#F7F3FB",
      }}
    >
      <AdminSidebar />
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminTopbar />
        <main style={{ flex: 1, padding: 28 }}>{children}</main>
      </div>
    </div>
  );
}
