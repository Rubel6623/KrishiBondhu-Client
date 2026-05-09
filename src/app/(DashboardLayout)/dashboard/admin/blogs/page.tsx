import type { Metadata } from "next";
export const metadata: Metadata = { title: "Blog Management — KrishiBondhu Admin" };
export default function AdminBlogsPage() {
  return (
    <div>
      <div className="section-label">Admin · Blogs</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Blog <em>Management</em></h1>
      <p className="section-desc">Create, edit, publish, or remove blog posts and knowledge hub articles.</p>
    </div>
  );
}
