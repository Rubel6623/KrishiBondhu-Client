import type { Metadata } from "next";
export const metadata: Metadata = { title: "Provider Dashboard — KrishiBondhu" };
export default function ProviderDashboardPage() {
  return (
    <div>
      <div className="section-label">Provider Dashboard</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Welcome, <em>Provider</em> 🚜</h1>
      <p className="section-desc">Manage your equipment, view booking requests, and track your earnings.</p>
    </div>
  );
}
