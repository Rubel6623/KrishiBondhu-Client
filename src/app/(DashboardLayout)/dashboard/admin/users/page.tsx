import type { Metadata } from "next";
export const metadata: Metadata = { title: "User Management — KrishiBondhu" };
export default function AdminUsersPage() {
  return (
    <div>
      <div className="section-label">Admin · Users</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>User <em>Management</em></h1>
      <p className="section-desc">View, activate, ban, or delete user accounts across the platform.</p>
    </div>
  );
}
