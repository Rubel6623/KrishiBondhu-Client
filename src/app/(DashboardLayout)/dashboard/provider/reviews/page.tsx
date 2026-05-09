import type { Metadata } from "next";
export const metadata: Metadata = { title: "Provider Reviews — KrishiBondhu" };
export default function ProviderReviewsPage() {
  return (
    <div>
      <div className="section-label">Provider · Reviews</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Provider <em>Reviews</em></h1>
      <p className="section-desc">See what farmers are saying about your equipment and service.</p>
    </div>
  );
}
