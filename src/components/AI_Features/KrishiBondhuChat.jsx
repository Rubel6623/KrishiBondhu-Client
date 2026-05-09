"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// Fallback chain: try each model in order until one works
const GEMINI_MODELS = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];

const CHAT_SYSTEM = `You are KrishiBondhu Assistant — the professional, expert agricultural AI for KrishiBondhu (কৃষিবন্ধু), Bangladesh's premier AgriTech platform.

Your mission:
- Empower Bangladeshi farmers by helping them rent modern agricultural equipment (Tractors, Harvesters, Irrigation pumps, etc.)
- Help Equipment Providers list their machines and reach more farmers
- Provide expert advice on crop management, pest control, and seasonal farming tips
- Explain platform features: Booking, AI-powered query, Provider verification, and Payments (bKash, Nagad)
- Be professional, empathetic, and encouraging. If someone asks in Bangla, ALWAYS respond in Bangla.

Platform details:
- Services: Equipment Rental, AI Farming Advisor, Market Prices, Provider Directory
- Equipment Categories: Tillage (Tractors), Harvesting (Combine Harvesters), Irrigation (Pumps), Pest Control (Sprayers), Planting
- Verification: Providers are verified via NID and machine ownership checks
- Payments: Secure escrow system via bKash, Nagad, and Rocket
- Mission: Modernizing agriculture in Bangladesh through technology and community.

Common FAQs:
- "কিভাবে ট্রাক্টর ভাড়া করবো?" → Home page এ যান → 'Rent Equipment' সিলেক্ট করুন → আপনার এলাকা ও পছন্দের যন্ত্র বেছে নিন → বুকিং কনফার্ম করুন।
- "আমি কি আমার যন্ত্র লিস্ট করতে পারি?" → অবশ্যই! 'Become a Provider' এ সাইন আপ করুন, আপনার যন্ত্রের ছবি ও বিস্তারিত দিন। আমাদের টিম ২৪ ঘণ্টার মধ্যে ভেরিফাই করবে।
- "পেমেন্ট কিভাবে কাজ করে?" → বুকিং করার সময় পেমেন্ট KrishiBondhu এর কাছে সুরক্ষিত থাকে। যন্ত্র পাওয়ার পর এবং কাজ শেষ হলে টাকা সার্ভিস প্রোভাইডারের কাছে পৌঁছে যায়।
- "AI কৃষি পরামর্শ কি?" → আমাদের AI আপনার ফসলের সমস্যা সমাধান করতে পারে। শুধু সমস্যার কথা লিখুন বা ছবি আপলোড করুন।`;

const ADVISOR_SYSTEM = `You are a Smart Agricultural Advisor for KrishiBondhu platform. 
Analyze a farmer's crop or equipment query and return ONLY valid JSON.

Return this exact structure:
{
  "category": "one of: Tillage | Harvesting | Irrigation | Pest Control | Planting | Soil Health",
  "suggestedTitle": "Professional title for the query/task",
  "improvedDescription": "Technical and clear agricultural advice (2-3 sentences)",
  "estimatedCost": "Estimated cost range for the solution in BDT",
  "tips": ["Expert tip 1", "Expert tip 2"],
  "urgencyLevel": "low | medium | high",
  "confidence": number between 0 and 1
}`;

// ─── GEMINI API CALL ────────────────────────────────────────────────────────
async function callGemini(messages, system, maxTokens = 1000) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "undefined") {
    console.warn("GEMINI_API_KEY not configured, using mock response");
    return getMockResponse(messages, system);
  }

  if (typeof window !== "undefined" && !window.navigator.onLine) {
    return getMockResponse(messages, system, true);
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const lastMessage = messages[messages.length - 1].content;

  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: system,
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.6,
        },
      });

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(lastMessage);
      return result.response.text();
    } catch (err) {
      if (err?.status === 429 || err?.status === 404) continue;
      console.error("Gemini API Error:", err);
      return getMockResponse(messages, system);
    }
  }
  return getMockResponse(messages, system);
}

// ─── MOCK RESPONSES ──────────────────────────────────────────────────────────
function getMockResponse(messages, system, isOffline = false) {
  if (isOffline) {
    return "আপনি বর্তমানে অফলাইনে আছেন। দয়া করে ইন্টারনেট সংযোগ চেক করুন যাতে আমি আপনাকে সরাসরি সাহায্য করতে পারি।";
  }
  const lastMsg = messages[messages.length - 1].content.toLowerCase();
  
  if (system && system.includes("JSON")) {
    return JSON.stringify({
      category: "Tillage",
      suggestedTitle: "Modern Land Preparation",
      improvedDescription: "We recommend using a power tiller for small-to-medium plots in Rajshahi. Ensure soil moisture is optimal before starting.",
      estimatedCost: "৳৮০০ - ৳১২০০ প্রতি বিঘা",
      tips: ["Deep plowing improves root growth", "Check weather forecast before tilling"],
      urgencyLevel: "medium",
      confidence: 0.95
    });
  }

  if (lastMsg.includes("hello") || lastMsg.includes("hi") || lastMsg.includes("কেমন")) {
    return "আসসালামু আলাইকুম! আমি কৃষিবন্ধু AI অ্যাসিস্ট্যান্ট। আমি আপনাকে আধুনিক কৃষি যন্ত্রাংশ ভাড়া করা, আপনার ফসলের যত্ন নেওয়া বা আমাদের প্ল্যাটফর্ম ব্যবহার করতে সাহায্য করতে পারি। আজ আপনাকে কিভাবে সাহায্য করতে পারি?";
  }
  if (lastMsg.includes("ভাড়া") || lastMsg.includes("rent") || lastMsg.includes("tractor")) {
    return "আমাদের প্ল্যাটফর্মে ট্রাক্টর, হারভেস্টার এবং সেচ পাম্প ভাড়া নেওয়া খুব সহজ। আপনার প্রয়োজন অনুযায়ী যন্ত্রটি সার্চ করুন এবং প্রোভাইডারের সাথে যোগাযোগ করে বুকিং করুন। KrishiBondhu পেমেন্ট ও ডেলিভারি সিকিউরিটি নিশ্চিত করে।";
  }
  if (lastMsg.includes("পেমেন্ট") || lastMsg.includes("টাকা")) {
    return "আমরা বিকাশ (bKash) এবং নগদের (Nagad) মাধ্যমে নিরাপদ পেমেন্ট সাপোর্ট করি। আপনার টাকা KrishiBondhu এর এসক্রো সিস্টেমে সুরক্ষিত থাকে এবং সার্ভিস পাওয়ার পর প্রোভাইডারকে দেওয়া হয়।";
  }
  if (lastMsg.includes("পরামর্শ") || lastMsg.includes("advice") || lastMsg.includes("crop")) {
    return "ফসলের যেকোনো সমস্যায় আপনি আমাদের AI Farming Advisor ব্যবহার করতে পারেন। আপনার সমস্যার কথা বিস্তারিত লিখলে আমি আপনাকে আধুনিক সমাধান ও সঠিক কীটনাশক ব্যবহারে সাহায্য করতে পারবো।";
  }
  
  return "আপনার এই বিষয়টি সম্পর্কে আরও জানতে পারলে আমি আরও ভালোভাবে সাহায্য করতে পারবো। কৃষিবন্ধু প্ল্যাটফর্ম সংক্রান্ত যেকোনো প্রশ্নে আমি আপনার পাশেই আছি।";
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = {
  Bot:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/><path d="M7 11h10"/></svg>,
  Send:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Spark: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  X:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Loader:() => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/></svg>,
  Tractor:() => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="18" r="3"/><circle cx="17" cy="15" r="5"/><path d="M17 10h-7v8"/><path d="M10 14h-5"/><path d="M12 10l-2-4H5"/></svg>,
};

// ─── CATEGORY BADGE ────────────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  "Tillage":     { bg: "#f0fdf4", text: "#166534", dot: "#22c55e" },
  "Harvesting":  { bg: "#fffbeb", text: "#92400e", dot: "#f59e0b" },
  "Irrigation":  { bg: "#eff6ff", text: "#1e40af", dot: "#3b82f6" },
  "Pest Control":{ bg: "#fef2f2", text: "#991b1b", dot: "#ef4444" },
  "Planting":    { bg: "#f5f3ff", text: "#5b21b6", dot: "#8b5cf6" },
  "Soil Health": { bg: "#fdf4ff", text: "#86198f", dot: "#d946ef" },
};

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURE 1: KRISHIBONDHU AI ASSISTANT
// ═══════════════════════════════════════════════════════════════════════════════
export function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "আসসালামু আলাইকুম! আমি কৃষিবন্ধু AI অ্যাসিস্ট্যান্ট। কৃষি যন্ত্রাংশ ভাড়া, ফসলের সমস্যা বা যেকোনো তথ্যের জন্য আমাকে জিজ্ঞাসা করুন। 👋", ts: Date.now() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  const QUICK_REPLIES = [
    "কিভাবে ট্রাক্টর ভাড়া করবো?",
    "কিভাবে সার্ভিস প্রোভাইডার হবো?",
    "পেমেন্ট সিস্টেম কিভাবে কাজ করে?",
    "AI কৃষি পরামর্শ কিভাবে পাবো?",
  ];

  useEffect(() => {
    setIsMounted(true);
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, messages]);

  const send = useCallback(async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg, ts: Date.now() }]);
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.role !== "assistant" || messages.indexOf(m) > 0)
        .map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      history.push({ role: "user", content: userMsg });

      const reply = await callGemini(history, CHAT_SYSTEM, 600);
      setMessages(prev => [...prev, { role: "assistant", text: reply, ts: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "দুঃখিত, সংযোগ বিচ্ছিন্ন হয়েছে। দয়া করে একটু পর আবার চেষ্টা করুন।", ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <style>{`
        @keyframes kb-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes kb-fade-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes kb-spin { to{transform:rotate(360deg)} }
        @keyframes kb-pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.2);opacity:0} }
        .kb-spin { animation: kb-spin 1s linear infinite; }
        .kb-msg-in { animation: kb-fade-in 0.25s ease; }
        .kb-chat-bubble { font-family: 'DM Sans', sans-serif; }
        .kb-chat-input:focus { outline: none; }
        .kb-quick-btn:hover { background: #2d8a52 !important; color: #fff !important; border-color: #2d8a52 !important; }
        .kb-send-btn:hover:not(:disabled) { background: #1e633d !important; }
        .kb-chat-fab:hover { transform: scale(1.08); }
      `}</style>

      {/* FAB */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999 }}>
        {!open && pulse && (
          <div style={{
            position: "absolute", inset: -4,
            borderRadius: "50%", background: "#2d8a52",
            animation: "kb-pulse-ring 2s ease-out infinite",
          }}/>
        )}
        <button
          onClick={() => { setOpen(o => !o); setPulse(false); }}
          className="kb-chat-fab"
          style={{
            width: 62, height: 62, borderRadius: "50%",
            background: open ? "#1e293b" : "linear-gradient(135deg, #2d8a52, #1e633d)",
            border: "none", cursor: "pointer", color: "#fff",
            boxShadow: "0 10px 40px rgba(45,138,82,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            padding: 0,
            overflow: "hidden"
          }}
        >
          {open ? (
            <div style={{ width: 28, height: 28 }}><Icon.X /></div>
          ) : (
            <img src="/ai-avatar.png" alt="AI" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
        </button>
        {!open && (
          <div style={{
            position: "absolute", bottom: 70, right: 0, whiteSpace: "nowrap",
            background: "#1e293b", color: "#fff", fontSize: 13, fontWeight: 600,
            padding: "8px 16px", borderRadius: 20,
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            animation: "kb-fade-in 0.4s ease",
          }}>
            💬 কৃষিবন্ধু AI-কে জিজ্ঞাসা করুন
          </div>
        )}
      </div>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: "fixed", bottom: 104, right: 28, zIndex: 9998,
          width: 400, height: 580,
          background: "#fff", borderRadius: 24,
          boxShadow: "0 32px 100px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)",
          display: "flex", flexDirection: "column",
          animation: "kb-fade-in 0.3s cubic-bezier(.22,.68,0,1.2)",
          fontFamily: "'DM Sans', sans-serif",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #1e633d 0%, #2d8a52 100%)",
            padding: "20px 24px", display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "12px",
              background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", border: "1px solid rgba(255,255,255,0.3)",
              flexShrink: 0,
            }}>
              <img src="/ai-avatar.png" alt="AI Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>KrishiBondhu Assistant</div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade80" }}/>
                অনলাইন · Expert AI Advisor
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 0", display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((msg, i) => (
              <div key={i} className="kb-msg-in" style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%", padding: "12px 16px",
                  borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "4px 20px 20px 20px",
                  background: msg.role === "user" ? "linear-gradient(135deg, #2d8a52, #1e633d)" : "#f1f5f9",
                  color: msg.role === "user" ? "#fff" : "#1e293b",
                  fontSize: 14.5, lineHeight: 1.6, fontWeight: 400,
                  boxShadow: msg.role === "user" ? "0 4px 12px rgba(45,138,82,0.25)" : "none",
                  whiteSpace: "pre-wrap",
                }}>
                  {msg.text}
                </div>
                <div suppressHydrationWarning style={{ fontSize: 10, color: "#94a3b8", marginTop: 5, paddingInline: 6 }}>
                  {isMounted ? formatTime(msg.ts) : ""}
                </div>
              </div>
            ))}
            {loading && (
              <div className="kb-msg-in" style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <div style={{ padding: "14px 18px", background: "#f1f5f9", borderRadius: "4px 20px 20px 20px", display: "flex", gap: 5, alignItems: "center" }}>
                  {[0,1,2].map(d => (
                    <div key={d} style={{ width: 8, height: 8, borderRadius: "50%", background: "#2d8a52", animation: `kb-bounce 1.2s ease ${d*0.18}s infinite`, opacity: 0.6 }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div style={{ padding: "16px 20px 0", display: "flex", flexWrap: "wrap", gap: 8 }}>
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => send(q)} className="kb-quick-btn" style={{
                  background: "#f0fdf4", color: "#1e633d", border: "1px solid #bcf0da",
                  borderRadius: 20, padding: "7px 14px", fontSize: 12.5, cursor: "pointer",
                  fontFamily: "inherit", fontWeight: 600, transition: "all 0.2s ease",
                }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "16px 20px 24px", display: "flex", gap: 10, alignItems: "center" }}>
            <input
              ref={inputRef}
              className="kb-chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="আপনার প্রশ্নটি এখানে লিখুন..."
              style={{
                flex: 1, border: "2px solid #e2e8f0", borderRadius: 16,
                padding: "12px 16px", fontSize: 14.5, fontFamily: "inherit",
                background: "#f8fafc", color: "#1e293b",
                transition: "all 0.2s ease",
              }}
              onFocus={e => e.target.style.borderColor = "#2d8a52"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
            <button
              onClick={() => send()} disabled={!input.trim() || loading}
              className="kb-send-btn"
              style={{
                width: 48, height: 48, borderRadius: 14,
                background: input.trim() && !loading ? "#2d8a52" : "#e2e8f0",
                border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                color: input.trim() && !loading ? "#fff" : "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease", flexShrink: 0,
                boxShadow: input.trim() && !loading ? "0 4px 12px rgba(45,138,82,0.3)" : "none",
              }}
            >
              {loading ? <div style={{ width: 20, height: 20 }} className="kb-spin"><Icon.Loader /></div>
                       : <div style={{ width: 22, height: 22 }}><Icon.Send /></div>}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURE 2: AI SMART FARMING ADVISOR (FORMERLY TASK COMPOSER)
// ═══════════════════════════════════════════════════════════════════════════════
export function AIFarmingAdvisor() {
  const [step, setStep] = useState("compose"); 
  const [rawInput, setRawInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [editedPrice, setEditedPrice] = useState("");
  const [editedDesc, setEditedDesc] = useState("");

  const analyze = async () => {
    if (!rawInput.trim() || rawInput.length < 10) {
      setError("দয়া করে আপনার প্রশ্নটি আরও একটু বিস্তারিত লিখুন (কমপক্ষে ১০ অক্ষর)।");
      return;
    }
    setError(null);
    setStep("analyzing");

    try {
      const raw = await callGemini(
        [{ role: "user", content: `Analyze this agricultural query: "${rawInput}"` }],
        ADVISOR_SYSTEM, 700
      );

      // Robust JSON extraction
      let jsonStr = raw;
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
      
      const parsed = JSON.parse(jsonStr);
      setResult(parsed);
      setEditedPrice(String(parsed.estimatedCost));
      setEditedDesc(parsed.improvedDescription);
      setStep("result");
    } catch (err) {
      console.error("Advisor Analysis Error:", err);
      setStep("compose");
      setError("দুঃখিত, পরামর্শটি তৈরি করতে সমস্যা হয়েছে। দয়া করে আপনার প্রশ্নটি আরও বিস্তারিত লিখে আবার চেষ্টা করুন।");
    }
  };

  const reset = () => {
    setStep("compose"); setResult(null); setRawInput("");
    setEditedPrice(""); setEditedDesc(""); setError(null);
  };

  const catStyle = result ? CATEGORY_COLORS[result.category] || CATEGORY_COLORS["Soil Health"] : {};

  const urgencyColor = {
    low:    { bg: "#f0fdf4", text: "#166534", label: "কম জরুরি" },
    medium: { bg: "#fffbeb", text: "#92400e", label: "জরুরি" },
    high:   { bg: "#fef2f2", text: "#991b1b", label: "খুব জরুরি" },
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", maxWidth: 720, margin: "0 auto" }}>
      <style>{`
        @keyframes kbt-spin { to{transform:rotate(360deg)} }
        @keyframes kbt-fade { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes kbt-progress { from{width:0} to{width:100%} }
        .kbt-spin { animation:kbt-spin 1s linear infinite; }
        .kbt-card { animation:kbt-fade 0.4s ease-out; }
        .kbt-btn-primary:hover:not(:disabled) { background:#1e633d!important; transform:translateY(-2px); box-shadow:0 8px 24px rgba(45,138,82,0.4)!important; }
        .kbt-btn-secondary:hover { background:#f8fafc!important; border-color: #cbd5e1!important; }
        .kbt-textarea:focus { outline:none; border-color:#2d8a52!important; box-shadow:0 0 0 4px rgba(45,138,82,0.1)!important; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ marginBottom: 32, display: "flex", alignItems: "flex-start", gap: 18 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 20,
          background: "linear-gradient(135deg, #2d8a52, #c8942a)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", border: "2px solid rgba(255,255,255,0.2)",
          flexShrink: 0,
          boxShadow: "0 8px 32px rgba(45,138,82,0.4)",
        }}>
          <img src="/ai-avatar.png" alt="AI Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>
            AI Farming Advisor
          </h2>
          <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 15, lineHeight: 1.5 }}>
            আপনার ফসলের সমস্যা বা কৃষি যন্ত্রাংশ সংক্রান্ত পরামর্শের জন্য এখানে লিখুন। আমাদের AI আপনাকে আধুনিক ও সঠিক দিকনির্দেশনা দেবে।
          </p>
        </div>
      </div>

      {/* ── Step: Compose ── */}
      {(step === "compose" || step === "analyzing") && (
        <div className="kbt-card" style={{
          background: "#f5f1f1ff", borderRadius: 24,
          border: "2px solid #e2e8f0",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}>
          <div style={{ padding: "28px 28px 0" }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#334155", marginBottom: 10 }}>
              আপনার সমস্যাটি বিস্তারিত লিখুন
            </label>
            <textarea
              className="kbt-textarea"
              value={rawInput}
              onChange={e => setRawInput(e.target.value)}
              disabled={step === "analyzing"}
              placeholder="উদা: আমার ধান ক্ষেতে পোকা ধরেছে, পাতার রং হলুদ হয়ে যাচ্ছে। কি করলে সমাধান পাবো?"
              style={{
                width: "100%", minHeight: 140, border: "2px solid #6fda9fff",
                borderRadius: 16, padding: "16px 18px", fontSize: 15, lineHeight: 1.7,
                fontFamily: "inherit", color: "#0f172a", background: "#f4f8f6ff",
                resize: "vertical", boxSizing: "border-box", transition: "all 0.2s ease",
              }}
            />
            {error && (
              <div style={{ marginTop: 12, padding: "10px 16px", background: "#fef2f2", color: "#dc2626", borderRadius: 12, fontSize: 14, fontWeight: 500 }}>
                ⚠️ {error}
              </div>
            )}
          </div>

          <div style={{ padding: "20px 28px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
            <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
              {rawInput.length} characters · AI analysis enabled
            </div>
            <button
              onClick={analyze}
              disabled={step === "analyzing" || rawInput.trim().length < 10}
              className="kbt-btn-primary"
              style={{
                display: "flex", alignItems: "center", gap: 10,
                background: step === "analyzing" || rawInput.trim().length < 5 ? "#e2e8f0" : "linear-gradient(135deg, #2d8a52, #1e633d)",
                color: step === "analyzing" || rawInput.trim().length < 5 ? "#9ca3af" : "#fff",
                border: "none", borderRadius: 14, padding: "14px 26px",
                fontSize: 15, fontWeight: 700, cursor: step === "analyzing" || rawInput.trim().length < 5 ? "not-allowed" : "pointer",
                boxShadow: "0 6px 18px rgba(45,138,82,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              {step === "analyzing" ? (
                <><div style={{ width: 20, height: 20 }} className="kbt-spin"><Icon.Loader /></div>বিশ্লেষণ করা হচ্ছে...</>
              ) : (
                <><div style={{ width: 20, height: 20 }}><Icon.Spark /></div>পরামর্শ নিন</>
              )}
            </button>
          </div>

          {step === "analyzing" && (
            <div style={{ height: 4, background: "#f0fdf4", position: "relative", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg, #2d8a52, #c8942a)", animation: "kbt-progress 2s ease-in-out infinite" }}/>
            </div>
          )}
        </div>
      )}

      {/* ── Step: Result ── */}
      {step === "result" && result && (
        <div className="kbt-card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* AI Analysis Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", background: "linear-gradient(135deg, #f0fdf4, #fffbeb)", borderRadius: 16, border: "1px solid #bcf0da" }}>
            <div style={{ width: 18, height: 18, color: "#2d8a52" }}><Icon.Spark /></div>
            <span style={{ fontSize: 14, color: "#166534", fontWeight: 700 }}>AI পরামর্শ তৈরি হয়েছে</span>
            <div style={{ marginLeft: "auto", fontSize: 13, color: "#2d8a52", fontWeight: 600 }}>
              {Math.round(result.confidence * 100)}% নিশ্চিত
            </div>
            <div style={{
              width: 70, height: 8, background: "#dcfce7", borderRadius: 99, overflow: "hidden",
            }}>
              <div style={{ width: `${result.confidence * 100}%`, height: "100%", background: "linear-gradient(90deg, #2d8a52, #c8942a)", borderRadius: 99 }}/>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Category */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 14,
              background: catStyle.bg, color: catStyle.text,
              fontSize: 14, fontWeight: 700, border: `1px solid ${catStyle.dot}40`,
            }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: catStyle.dot, display: "inline-block" }}/>
              বিষয়: {result.category}
            </div>
            {/* Urgency */}
            <div style={{
              padding: "10px 18px", borderRadius: 14, fontSize: 14, fontWeight: 700,
              background: urgencyColor[result.urgencyLevel]?.bg,
              color: urgencyColor[result.urgencyLevel]?.text,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${urgencyColor[result.urgencyLevel]?.text}20`,
            }}>
              গুরুত্ব: {urgencyColor[result.urgencyLevel]?.label}
            </div>
          </div>

          {/* Advice Description */}
          <div style={{ background: "#fff", borderRadius: 20, border: "2px solid #e2e8f0", padding: "20px 24px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
              AI বিশেষজ্ঞের পরামর্শ
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#1e293b", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
              {editedDesc}
            </div>
          </div>

          {/* Cost/Resources */}
          <div style={{ background: "#fff", borderRadius: 20, border: "2px solid #e2e8f0", padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 16, height: 16, color: "#c8942a" }}><Icon.Tractor /></div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>আনুমানিক খরচ/রিসোর্স</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>{editedPrice}</div>
          </div>

          {/* Expert Tips */}
          {result.tips && (
            <div style={{ background: "#f8fafc", borderRadius: 20, border: "2px solid #e2e8f0", padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 16, height: 16, color: "#2d8a52" }}><Icon.Spark /></div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>সফলতার জন্য টিপস</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {result.tips.map((tip, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 12, fontSize: 14.5, color: "#334155", fontWeight: 500 }}>
                    <span style={{ color: "#2d8a52", fontWeight: 900 }}>✓</span> {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
            <button onClick={reset} className="kbt-btn-secondary" style={{
              flex: 1, padding: "14px", borderRadius: 16, border: "2px solid #e2e8f0",
              background: "#fff", color: "#64748b", fontSize: 15, fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s"
            }}>
              আবার জিজ্ঞাসা করুন
            </button>
            <button onClick={() => setStep("posted")} className="kbt-btn-primary" style={{
              flex: 2, padding: "14px", borderRadius: 16, border: "none",
              background: "linear-gradient(135deg, #2d8a52, #1e633d)", color: "#fff",
              fontSize: 15, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 6px 20px rgba(45,138,82,0.3)", transition: "all 0.2s"
            }}>
              প্রয়োজনীয় যন্ত্র ভাড়া করুন →
            </button>
          </div>
        </div>
      )}

      {/* ── Step: Posted ── */}
      {step === "posted" && (
        <div className="kbt-card" style={{
          background: "#fff", borderRadius: 24, border: "2px solid #e2e8f0",
          padding: "50px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center"
        }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 36, height: 36 }}><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 800, color: "#0f172a" }}>চমৎকার!</h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: 15, marginBottom: 30, lineHeight: 1.6 }}>
            আপনার কৃষি সমস্যার জন্য সঠিক যন্ত্র খুঁজে পেতে আমাদের মার্কেটপ্লেসে নিয়ে যাচ্ছি।
          </p>
          <button onClick={() => window.location.href='/equipment'} className="kbt-btn-primary" style={{
            padding: "14px 30px", borderRadius: 16, border: "none",
            background: "linear-gradient(135deg, #2d8a52, #1e633d)", color: "#fff",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 8px 24px rgba(45,138,82,0.3)"
          }}>
            মার্কেটপ্লেস দেখুন
          </button>
        </div>
      )}
    </div>
  );
}

export default AIChatAssistant;
