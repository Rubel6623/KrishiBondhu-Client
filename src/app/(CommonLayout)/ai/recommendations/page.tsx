import type { Metadata } from "next";
export const metadata: Metadata = { title: "Smart Recommendations — KrishiBondhu AI" };
export default function AIRecommendationsPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">AI Features</div>
          <h1 className="section-h2">Smart <em>Recommendations</em></h1>
          <p className="section-desc">Personalised equipment and crop care recommendations based on your location, season, and farm data.</p>
        </div>
      </section>
    </main>
  );
}
