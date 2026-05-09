import type { Metadata } from "next";
export const metadata: Metadata = { title: "AI Assistant — KrishiBondhu" };
export default function FarmerAIAssistantPage() {
  return (
    <div>
      <div className="section-label">Farmer · AI</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>KrishiAI <em>Assistant</em> 🤖</h1>
      <p className="section-desc">Ask anything about crop management, disease detection, or seasonal planning — in Bangla or English.</p>
    </div>
  );
}
