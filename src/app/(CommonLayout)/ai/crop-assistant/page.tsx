import type { Metadata } from "next";
export const metadata: Metadata = { title: "Crop Assistant — KrishiBondhu AI" };
export default function AICropAssistantPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section ai-bg">
        <div className="section-inner">
          <div className="section-label">AI Features</div>
          <h1 className="section-h2">Crop <em>Assistant</em> 🤖</h1>
          <p className="section-desc">Ask KrishiAI anything about your crops — disease detection, treatment advice, and seasonal tips in Bangla &amp; English.</p>
          <div className="ai-chat-ui" style={{ maxWidth: "640px", marginTop: "40px" }}>
            <div className="ai-chat-header">
              <div className="ai-avatar">🤖</div>
              <div>
                <div className="ai-name">KrishiAI Assistant</div>
                <div className="ai-status">● Online · Responding in Bangla &amp; English</div>
              </div>
            </div>
            <div className="chat-messages">
              <div className="chat-msg bot">আমি KrishiAI। আপনার ফসল সম্পর্কে যেকোনো প্রশ্ন করুন — আমি বাংলা ও ইংরেজি উভয় ভাষায় সাহায্য করতে পারি।</div>
              <div className="chat-typing"><div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" /></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
