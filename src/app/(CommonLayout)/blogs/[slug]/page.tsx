import type { Metadata } from "next";
export const metadata: Metadata = { title: "Blog Post — KrishiBondhu" };
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Article</div>
          <h1 className="section-h2">Blog Post</h1>
          <p className="section-desc">Slug: {params.slug}</p>
        </div>
      </section>
    </main>
  );
}
