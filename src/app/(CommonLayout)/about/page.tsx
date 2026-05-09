import type { Metadata } from "next";
export const metadata: Metadata = { title: "About Us — KrishiBondhu" };
export default function AboutPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="section-inner">
          <div className="section-label">About Us</div>
          <h1 className="section-h2">Bangladesh&apos;s First<br /><em>AgriTech Marketplace</em></h1>
          <p className="section-desc">KrishiBondhu was founded with a singular mission: to make modern agricultural tools and expertise accessible to every farmer in Bangladesh, regardless of land size or income.</p>
        </div>
      </section>
    </main>
  );
}
