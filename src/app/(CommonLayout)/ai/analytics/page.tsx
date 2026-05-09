import type { Metadata } from "next";
export const metadata: Metadata = { title: "AI Analytics — KrishiBondhu" };
export default function AIAnalyticsPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">AI Features</div>
          <h1 className="section-h2">Data <em>Analytics</em></h1>
          <p className="section-desc">AI-powered farm performance analytics — yield forecasts, cost breakdowns, and seasonal trend reports.</p>
        </div>
      </section>
    </main>
  );
}
