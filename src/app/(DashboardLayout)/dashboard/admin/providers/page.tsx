import type { Metadata } from "next";
export const metadata: Metadata = { title: "Provider Management — KrishiBondhu Admin" };
export default function AdminProvidersPage() {
  return (
    <div>
      <div className="section-label">Admin · Providers</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Provider <em>Management</em></h1>
      <p className="section-desc">Review, verify, and manage all equipment provider accounts.</p>
    </div>
  );
}
