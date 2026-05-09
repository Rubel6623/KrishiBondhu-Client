import type { Metadata } from "next";
export const metadata: Metadata = { title: "Messages — KrishiBondhu" };
export default function MessagesPage() {
  return (
    <div>
      <div className="section-label">Communication</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>My <em>Messages</em></h1>
      <p className="section-desc">Chat with farmers, providers, and support staff.</p>
    </div>
  );
}
