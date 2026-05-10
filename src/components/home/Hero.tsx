"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import debounce from "lodash/debounce";
import SectionBackground from "./SectionBackground";



export default function Hero() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced fetch function
  const fetchSuggestions = useRef(
    debounce(async (q: string) => {
      if (q.length < 2) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/ai/suggestions?q=${q}`);
        const data = await res.json();
        if (data.success) {
          setSuggestions(data.data);
        }
      } catch (err) {
        console.error("Suggestion error:", err);
      } finally {
        setLoading(false);
      }
    }, 400)
  ).current;

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <section className="min-h-screen pt-[var(--nav-h)] relative overflow-hidden flex items-center">
      {/* Background Layer with theme-aware SectionBackground */}
      <SectionBackground />
      
      {/* Hero Banner Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-30 mix-blend-overlay md:mix-blend-normal transition-opacity duration-700" 
        style={{ backgroundImage: `url('/images/hero_banner.png')` }}
      />
      {/* Dark gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-cream-dark/90 via-cream-dark/70 to-transparent dark:from-[#05150d]/95 dark:via-[#05150d]/80 dark:to-transparent" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:32px_32px] text-green-deep dark:text-white" />
      
      {/* Animated Orbs */}
      <div className="absolute rounded-full blur-[80px] pointer-events-none w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(74,184,112,0.2),transparent_70%)] -top-[100px] -right-[50px] animate-[floatOrb_8s_ease-in-out_infinite]" />
      <div className="absolute rounded-full blur-[80px] pointer-events-none w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(200,148,42,0.1),transparent_70%)] bottom-[50px] left-[100px] animate-[floatOrb_10s_ease-in-out_infinite_reverse]" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[5%] pt-2 pb-20 lg:pt-4 grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 bg-green-brand/10 dark:bg-green-bright/15 border border-green-brand/20 dark:border-green-bright/30 px-3.5 py-1.5 rounded-full mb-6 animate-[fadeUp_0.6s_ease_both]">
            <div className="w-2 h-2 rounded-full bg-green-brand dark:bg-green-bright animate-[pulse_2s_infinite]" />
            <span className="text-xs font-semibold text-green-deep dark:text-green-light tracking-wider uppercase">Bangladesh&apos;s #1 AgriTech Platform</span>
          </div>

          <h1 className="font-serif text-[clamp(44px,5.5vw,72px)] font-black leading-[1.05] tracking-[-2px] text-green-deep dark:text-white mb-5 animate-[fadeUp_0.7s_0.1s_ease_both]">
            Smart Farming<br />
            <em className="italic text-green-brand dark:text-green-bright not-italic">Starts Here.</em>
            <span className="block font-sans text-[clamp(24px,3vw,36px)] font-semibold tracking-normal text-gold mt-2 dark:text-gold-light">কৃষিকে করো সহজ ও লাভজনক</span>
          </h1>

          <p className="text-[16px] leading-relaxed text-text-mid dark:text-white/70 max-w-[480px] mb-8 animate-[fadeUp_0.7s_0.2s_ease_both]">
            Rent agricultural equipment, connect with trusted providers, and grow your farm with AI-powered insights — all in one platform built for Bangladeshi farmers.
          </p>

          <div className="flex gap-4 flex-wrap mb-10 animate-[fadeUp_0.7s_0.4s_ease_both]">
            <Link href="/register" className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-bold text-white bg-green-brand rounded-xl hover:bg-green-deep hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(45,138,82,0.3)] transition-all">
              🌾 Start as Farmer
            </Link>
            <Link href="/providers" className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-bold text-green-deep dark:text-white bg-white/40 dark:bg-white/10 border-[1.5px] border-green-brand/20 dark:border-white/25 rounded-xl backdrop-blur-md hover:bg-white/60 dark:hover:bg-white/20 hover:-translate-y-0.5 transition-all">
              🚜 List Equipment
            </Link>
          </div>

          {/* AI Search Bar */}
          <div className="relative max-w-[540px] mb-8 animate-[fadeUp_0.7s_0.3s_ease_both]" ref={containerRef}>
            <div className={`
              relative flex items-center bg-white/80 dark:bg-zinc-900/60 backdrop-blur-2xl border-2 transition-all duration-300 rounded-2xl px-5 py-3 group shadow-[0_12px_40px_rgba(45,138,82,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)]
              ${showSuggestions ? 'border-green-brand ring-4 ring-green-brand/10 scale-[1.02] bg-white dark:bg-zinc-900' : 'border-green-brand/20 dark:border-white/10 hover:border-green-brand/50'}
            `}>
              <Search className={`w-5 h-5 mr-3 transition-colors ${showSuggestions ? 'text-green-brand' : 'text-text-muted dark:text-white/40'}`} />
              <input 
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && query.trim()) {
                    setShowSuggestions(false);
                    window.location.href = `/equipment?search=${encodeURIComponent(query.trim())}`;
                  }
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search equipment, crops, or expert help..."
                className="bg-transparent border-none outline-none flex-1 text-[16px] font-semibold text-green-deep dark:text-white placeholder:text-text-muted/50 dark:placeholder:text-white/30 placeholder:font-medium"
              />
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-green-brand" />
              ) : query && (
                <button onClick={() => setQuery("")} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-4 h-4 text-text-muted" />
                </button>
              ) }
              <div className="w-[1px] h-8 bg-border dark:bg-white/10 mx-3" />
              <button 
                onClick={() => {
                  if (query.trim()) {
                    window.location.href = `/equipment?search=${encodeURIComponent(query.trim())}`;
                  }
                }}
                className="flex items-center justify-center w-10 h-10 bg-green-brand text-white rounded-xl hover:bg-green-deep transition-all active:scale-95 shadow-md shadow-green-brand/20"
                aria-label="Search"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && (query.length >= 2 || suggestions.length > 0) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-zinc-900 border border-border dark:border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-2"
                >
                  <div className="px-3 py-2.5 text-[11px] font-bold text-text-muted dark:text-white/40 flex items-center gap-2 uppercase tracking-wider bg-muted/30 dark:bg-white/5 rounded-lg mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold" /> AI Suggestions
                  </div>
                  <div className="flex flex-col gap-1">
                    {loading && suggestions.length === 0 ? (
                      [1,2,3].map(i => (
                        <div key={i} className="h-11 animate-pulse bg-muted dark:bg-white/5 rounded-xl mx-1" />
                      ))
                    ) : suggestions.length > 0 ? (
                      suggestions.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            setQuery(s);
                            setShowSuggestions(false);
                            window.location.href = `/equipment?search=${encodeURIComponent(s)}`;
                          }}
                          className="flex items-center gap-3 px-3 py-3 hover:bg-green-brand/10 dark:hover:bg-white/10 rounded-xl text-left transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-green-brand/10 dark:bg-green-brand/20 flex items-center justify-center group-hover:bg-green-brand group-hover:text-white transition-all shadow-sm">
                            <Search className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[14px] font-bold text-green-deep dark:text-white/90 group-hover:text-green-brand dark:group-hover:text-white">{s}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-[13px] text-text-muted italic">
                        Try searching for &quot;Tractor&quot;, &quot;Rice Harvester&quot;, or &quot;Fertilizer&quot;
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        

        <div className="relative hidden lg:block animate-[fadeUp_0.8s_0.3s_ease_both]">
          <div className="bg-white/40 dark:bg-white/7 backdrop-blur-[20px] border border-black/5 dark:border-white/12 rounded-[24px] p-7 relative shadow-2xl">
            <div className="inline-flex items-center gap-1.5 bg-green-brand text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-[0.5px] uppercase mb-4">🔥 Available Now</div>
            <div className="font-serif text-[22px] font-bold text-green-deep dark:text-white leading-[1.3] mb-5">Rent Equipment Near You</div>
            <div className="flex flex-col gap-3">
              {[
                { icon: "🚜", name: "Power Tiller", detail: "Rajshahi · Available today", price: "৳800/day", bg: "rgba(45,138,82,0.12)" },
                { icon: "🌾", name: "Combine Harvester", detail: "Dhaka · 3 days min", price: "৳3500/day", bg: "rgba(200,148,42,0.12)" },
                { icon: "💧", name: "Irrigation Pump", detail: "Sylhet · Instant booking", price: "৳450/day", bg: "rgba(45,138,82,0.12)" },
              ].map((item) => (
                <div className="flex items-center gap-3 bg-white/60 dark:bg-white/6 border border-black/5 dark:border-white/8 rounded-[14px] p-3 hover:bg-green-brand/10 dark:hover:bg-green-bright/15 transition-all" key={item.name}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px] shrink-0" style={{ background: item.bg }}>{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-green-deep dark:text-white">{item.name}</div>
                    <div className="text-[11px] text-text-muted dark:text-white/50 mt-0.5">{item.detail}</div>
                  </div>
                  <div className="text-[13px] font-bold text-green-brand dark:text-green-bright">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-[18px] px-4.5 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] -top-5 -right-5 animate-[float_5s_ease-in-out_infinite_reverse]">
            <div className="text-[10px] text-text-muted dark:text-gray-400 mb-1 font-bold">Provider rating</div>
            <div className="text-[#f5a623] text-[12px]">★★★★★</div>
            <div className="text-[14px] font-black text-green-deep dark:text-white">4.8 / 5.0</div>
          </div>

          {/* Stats Block (Moved to Right Side) */}
          <div className="flex justify-center w-full mt-14 animate-[fadeUp_0.9s_0.5s_ease_both]">
            <div className="flex items-center gap-8 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/20 dark:border-white/10 px-8 py-5 rounded-[24px] shadow-xl">
              {[
                { val: "10K+", label: "Active Farmers" },
                { val: "2.5K+", label: "Equipment Listed" },
                { val: "64+", label: "Districts Covered" }
              ].map((stat, i) => (
                <Fragment key={stat.label}>
                  <div className="flex flex-col items-center">
                    <div className="font-serif text-[26px] font-bold leading-none text-green-deep dark:text-white">{stat.val.replace("+", "")}<span className="text-green-brand dark:text-green-bright">+</span></div>
                    <div className="text-[10px] text-text-muted dark:text-white/60 mt-1.5 uppercase font-bold tracking-widest text-center">{stat.label}</div>
                  </div>
                  {i < 2 && <div className="w-[1px] h-10 bg-black/10 dark:bg-white/10" />}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
