import type { Metadata } from "next";
export const metadata: Metadata = { title: "Profile — KrishiBondhu" };
export default function ProfilePage() {
  return (
    <div>
      <div className="section-label">Account</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>My <em>Profile</em></h1>
      <p className="section-desc">Manage your personal information and account settings.</p>
    </div>
  );
}
