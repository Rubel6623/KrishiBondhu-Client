import type { Metadata } from "next";
export const metadata: Metadata = { title: "Dashboard — KrishiBondhu" };
export default function DashboardPage() {
  return (
    <div>
      <div className="section-label">Dashboard</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Welcome <em>Back</em></h1>
      <p className="section-desc">Select a dashboard from your role to get started.</p>
    </div>
  );
}
