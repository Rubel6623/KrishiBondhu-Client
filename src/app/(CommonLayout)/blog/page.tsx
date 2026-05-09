import type { Metadata } from "next";
export const metadata: Metadata = { title: "Blog — KrishiBondhu" };
export default function BlogPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Knowledge Hub</div>
          <h1 className="section-h2">Farming Tips &amp; <em>Seasonal Guides</em></h1>
          <p className="section-desc">Expert advice on crop management, equipment usage, and smart farming techniques tailored for Bangladesh.</p>
        </div>
      </section>
    </main>
  );
}
