import type { Metadata } from "next";
export const metadata: Metadata = { title: "Settings — KrishiBondhu" };
export default function SettingsPage() {
  return (
    <div>
      <div className="section-label">Preferences</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Account <em>Settings</em></h1>
      <p className="section-desc">Manage your account preferences, security, and notification settings.</p>
    </div>
  );
}
