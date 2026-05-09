import Navbar from "@/components/shared/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--cream)]">
      <Navbar />
      <div className="flex flex-1 pt-[var(--nav-h)]">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
