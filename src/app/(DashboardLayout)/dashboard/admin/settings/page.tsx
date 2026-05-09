import type { Metadata } from "next";
export const metadata: Metadata = { title: "System Settings — KrishiBondhu Admin" };
export default function AdminSettingsPage() {
  return (
    <div>
      <div className="section-label">Admin · Settings</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>System <em>Settings</em></h1>
      <p className="section-desc">Configure platform-wide settings, commission rates, and feature flags.</p>
    </div>
  );
}
