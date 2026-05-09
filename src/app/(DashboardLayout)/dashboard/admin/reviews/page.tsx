import type { Metadata } from "next";
export const metadata: Metadata = { title: "Review Moderation — KrishiBondhu Admin" };
export default function AdminReviewsPage() {
  return (
    <div>
      <div className="section-label">Admin · Reviews</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Review <em>Moderation</em></h1>
      <p className="section-desc">Flag, hide, or remove reviews that violate platform policies.</p>
    </div>
  );
}
