import type { Metadata } from "next";
export const metadata: Metadata = { title: "Farmer Dashboard — KrishiBondhu" };
export default function FarmerDashboardPage() {
  return (
    <div>
      <div className="section-label">Farmer Dashboard</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Welcome, <em>Farmer</em> 🌾</h1>
      <p className="section-desc">Manage your bookings, discover equipment, and get AI-powered farming insights.</p>
    </div>
  );
}
