import type { Metadata } from "next";
export const metadata: Metadata = { title: "AI Analytics — KrishiBondhu Admin" };
export default function AdminAIAnalyticsPage() {
  return (
    <div>
      <div className="section-label">Admin · AI</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>AI <em>Analytics &amp; Insights</em></h1>
      <p className="section-desc">Monitor AI assistant usage, crop query trends, and recommendation accuracy across all farmers.</p>
    </div>
  );
}
