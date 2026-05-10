import ProfileForm from "@/components/dashboard/ProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Provider Profile — KrishiBondhu" };

export default function ProviderProfilePage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="section-label">Provider · Profile</div>
        <h1 className="section-h2" style={{ fontSize: "32px" }}>Provider <em>Profile</em></h1>
        <p className="section-desc">Update your business details, contact information, and verification documents.</p>
      </div>

      <ProfileForm role="PROVIDER" />
    </div>
  );
}
