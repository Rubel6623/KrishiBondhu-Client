import type { Metadata } from "next";
export const metadata: Metadata = { title: "My Reviews — KrishiBondhu" };
export default function FarmerReviewsPage() {
  return (
    <div>
      <div className="section-label">Farmer · Reviews</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>My <em>Reviews</em></h1>
      <p className="section-desc">View and manage reviews you&apos;ve left for providers and equipment.</p>
    </div>
  );
}
