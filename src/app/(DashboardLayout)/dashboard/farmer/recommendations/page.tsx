import type { Metadata } from "next";
export const metadata: Metadata = { title: "AI Recommendations — KrishiBondhu" };
export default function FarmerRecommendationsPage() {
  return (
    <div>
      <div className="section-label">Farmer · AI</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Smart <em>Recommendations</em></h1>
      <p className="section-desc">Personalised AI-driven recommendations for equipment, crop care, and seasonal planning.</p>
    </div>
  );
}
