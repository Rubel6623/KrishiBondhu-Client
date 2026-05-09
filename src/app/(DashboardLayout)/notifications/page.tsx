import type { Metadata } from "next";
export const metadata: Metadata = { title: "Notifications — KrishiBondhu" };
export default function NotificationsPage() {
  return (
    <div>
      <div className="section-label">Activity</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>My <em>Notifications</em></h1>
      <p className="section-desc">Stay up to date with booking updates, messages, and platform alerts.</p>
    </div>
  );
}
