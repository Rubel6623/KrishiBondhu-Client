import ProfileForm from "@/components/dashboard/ProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Farmer Profile — KrishiBondhu" };

export default function FarmerProfilePage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="section-label">Farmer · Profile</div>
        <h1 className="section-h2" style={{ fontSize: "32px" }}>My <em>Profile</em></h1>
        <p className="section-desc">Update your personal information to get better service recommendations.</p>
      </div>

      <ProfileForm role="FARMER" />
    </div>
  );
}
