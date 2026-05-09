import type { Metadata } from "next";
export const metadata: Metadata = { title: "Reports & Analytics — KrishiBondhu Admin" };
export default function AdminReportsPage() {
  return (
    <div>
      <div className="section-label">Admin · Reports</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Reports &amp; <em>Analytics</em></h1>
      <p className="section-desc">Platform-wide performance metrics, revenue reports, and growth analytics.</p>
    </div>
  );
}
