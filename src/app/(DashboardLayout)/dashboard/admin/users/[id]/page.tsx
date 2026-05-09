import type { Metadata } from "next";
export const metadata: Metadata = { title: "User Details — KrishiBondhu Admin" };
export default function AdminUserDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="section-label">Admin · User Details</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>User <em>#{params.id}</em></h1>
      <p className="section-desc">Full profile, activity log, and moderation options for this user.</p>
    </div>
  );
}
