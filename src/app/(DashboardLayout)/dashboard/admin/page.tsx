import type { Metadata } from "next";
export const metadata: Metadata = { title: "Admin Dashboard — KrishiBondhu" };
export default function AdminDashboardPage() {
  return (
    <div>
      <div className="section-label">Admin Dashboard</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Admin <em>Overview</em> 🛡️</h1>
      <p className="section-desc">Monitor platform activity, manage users, providers, bookings, and system health.</p>
    </div>
  );
}
