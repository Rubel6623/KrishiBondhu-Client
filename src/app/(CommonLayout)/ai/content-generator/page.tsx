import type { Metadata } from "next";
export const metadata: Metadata = { title: "Content Generator — KrishiBondhu AI" };
export default function AIContentGeneratorPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">AI Features</div>
          <h1 className="section-h2">AI Content <em>Generator</em></h1>
          <p className="section-desc">Generate farming guides, equipment descriptions, and blog posts powered by AI.</p>
        </div>
      </section>
    </main>
  );
}
