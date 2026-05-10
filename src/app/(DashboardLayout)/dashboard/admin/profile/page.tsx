import ProfileForm from "@/components/dashboard/ProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Profile — KrishiBondhu" };

export default function AdminProfilePage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="section-label">Admin · Settings</div>
        <h1 className="section-h2" style={{ fontSize: "32px" }}>My <em>Profile</em></h1>
        <p className="section-desc">Manage your administrative profile and security settings.</p>
      </div>

      <ProfileForm role="ADMIN" />
    </div>
  );
}
