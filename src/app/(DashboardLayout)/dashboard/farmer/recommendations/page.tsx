"use client";

import { useState } from "react";
import { getSmartRecommendations } from "@/services/ai";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Sparkles,
  Tractor,
  Sprout,
  BookOpen,
  Stethoscope,
  Droplets,
  Sun,
  Bug,
  Scale,
  Loader2,
  RefreshCw,
  ArrowRight,
  Zap,
  Brain,
} from "lucide-react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Recommendation {
  type: "equipment" | "practice" | "blog" | "specialist";
  title: string;
  reason: string;
  priority: "high" | "medium" | "low";
  icon: string;
}

// ── Icon map ───────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  tractor: Tractor,
  sprout: Sprout,
  book: BookOpen,
  stethoscope: Stethoscope,
  droplets: Droplets,
  sun: Sun,
  bug: Bug,
  scale: Scale,
};

// ── Priority styles ────────────────────────────────────────────────────────────
const PRIORITY_STYLE: Record<string, string> = {
  high: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20",
  medium: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
  low: "bg-green-brand/10 text-green-brand border-green-brand/20",
};

// ── Type badge ─────────────────────────────────────────────────────────────────
const TYPE_META: Record<string, { label: string; color: string; href?: string }> = {
  equipment: { label: "Equipment", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400", href: "/equipment" },
  practice:  { label: "Best Practice", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
  blog:      { label: "Knowledge Hub", color: "bg-green-brand/10 text-green-brand", href: "/blogs" },
  specialist:{ label: "Specialist", color: "bg-orange-500/10 text-orange-500", href: "/specialists" },
};

// ── Card component ─────────────────────────────────────────────────────────────
function RecommendationCard({ rec, index }: { rec: Recommendation; index: number }) {
  const Icon = ICON_MAP[rec.icon] ?? Sprout;
  const meta = TYPE_META[rec.type] ?? TYPE_META.practice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, ease: "easeOut" }}
      className="group bg-card border border-border rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:border-green-brand/30 transition-all duration-500 flex flex-col gap-6"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="w-14 h-14 rounded-2xl bg-green-brand/10 flex items-center justify-center text-green-brand group-hover:bg-green-brand group-hover:text-white transition-all duration-300 shrink-0">
          <Icon size={26} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${PRIORITY_STYLE[rec.priority]}`}>
            {rec.priority} priority
          </span>
          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${meta.color}`}>
            {meta.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-serif font-black text-foreground group-hover:text-green-brand transition-colors leading-snug mb-3">
          {rec.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{rec.reason}</p>
      </div>

      {/* CTA */}
      {meta.href && (
        <Link
          href={meta.href}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-green-brand pt-4 border-t border-border group-hover:translate-x-1 transition-transform"
        >
          Explore Now <ArrowRight size={13} />
        </Link>
      )}
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function SmartRecommendationsPage() {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const fetchRecs = async () => {
    setLoading(true);
    setRecs([]);
    try {
      const res = await getSmartRecommendations();
      if (res.success && Array.isArray(res.data)) {
        setRecs(res.data);
        setGenerated(true);
        toast.success("Personalised recommendations ready!");
      } else {
        toast.error(res.message || "Could not generate recommendations");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const grouped = {
    high:   recs.filter((r) => r.priority === "high"),
    medium: recs.filter((r) => r.priority === "medium"),
    low:    recs.filter((r) => r.priority === "low"),
  };

  return (
    <div className="space-y-12 pb-20">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-brand/10 border border-green-brand/20 text-green-brand text-[10px] font-black uppercase tracking-widest mb-4">
            <Brain size={14} /> AI-Powered
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground leading-tight">
            Smart <em className="italic text-green-brand not-italic">Recommendations</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium max-w-[520px]">
            Gemini analyses your booking history, past AI queries, and reviews to suggest what matters most for your farm right now.
          </p>
        </div>

        <button
          onClick={fetchRecs}
          disabled={loading}
          className="flex items-center gap-3 px-8 py-4 bg-zinc-950 dark:bg-green-brand text-white rounded-full font-black text-sm hover:scale-105 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {loading ? (
            <><Loader2 className="animate-spin" size={18} /> Analysing your data…</>
          ) : generated ? (
            <><RefreshCw size={18} /> Refresh Insights</>
          ) : (
            <><Sparkles size={18} /> Generate My Recommendations</>
          )}
        </button>
      </div>

      {/* ── Empty / Loading States ───────────────────────────────── */}
      <AnimatePresence mode="wait">
        {!generated && !loading && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-32 flex flex-col items-center justify-center text-center bg-card border border-border rounded-[48px] shadow-sm relative overflow-hidden"
          >
            {/* decorative gradient blob */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-brand/5 via-transparent to-transparent pointer-events-none" />
            <div className="w-24 h-24 rounded-[32px] bg-green-brand/10 flex items-center justify-center text-green-brand mb-8 relative z-10">
              <Zap size={44} />
            </div>
            <h2 className="text-2xl font-serif font-black text-foreground mb-3 relative z-10">
              Your AI Advisor is Ready
            </h2>
            <p className="text-muted-foreground max-w-[440px] font-medium text-sm leading-relaxed relative z-10">
              Click <strong className="text-foreground">Generate My Recommendations</strong> and Gemini will scan your farm activity to surface the highest-impact actions.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-10 relative z-10">
              {[
                { icon: Tractor, label: "Equipment Suggestions" },
                { icon: Sprout, label: "Crop Best Practices" },
                { icon: BookOpen, label: "Relevant Articles" },
                { icon: Stethoscope, label: "Specialist Advice" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 bg-muted rounded-2xl border border-border text-sm font-bold text-muted-foreground">
                  <Icon size={14} className="text-green-brand" /> {label}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-32 flex flex-col items-center justify-center gap-6 bg-card border border-border rounded-[48px] shadow-sm"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-green-brand/20 border-t-green-brand animate-spin" />
              <Brain className="absolute inset-0 m-auto text-green-brand" size={28} />
            </div>
            <div className="text-center space-y-2">
              <p className="font-black text-foreground text-lg font-serif">Analysing Your Farm Data</p>
              <p className="text-sm text-muted-foreground max-w-[360px]">
                Reviewing bookings, AI queries, and reviews to craft personalised insights…
              </p>
            </div>
            {/* Animated steps */}
            <div className="space-y-3 mt-4 w-full max-w-[360px]">
              {["Scanning booking history", "Reviewing past AI queries", "Checking equipment feedback", "Generating farm insights"].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.5 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <div className="w-2 h-2 rounded-full bg-green-brand animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                  {step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {generated && recs.length > 0 && !loading && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">

            {/* Summary banner */}
            <div className="bg-zinc-900 text-white rounded-[32px] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-brand/10 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">AI Analysis Complete</p>
                <h2 className="text-2xl font-serif font-black">
                  {recs.length} Personalised <em className="text-green-brand not-italic">Insights</em> Found
                </h2>
                <p className="text-white/60 text-sm mt-1">Based on your real farm activity and history.</p>
              </div>
              <div className="flex gap-4 relative z-10 shrink-0">
                {(["high", "medium", "low"] as const).map((p) => (
                  <div key={p} className="text-center">
                    <p className="text-2xl font-black">{grouped[p].length}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{p}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* High Priority */}
            {grouped.high.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">High Priority Actions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {grouped.high.map((rec, i) => <RecommendationCard key={i} rec={rec} index={i} />)}
                </div>
              </section>
            )}

            {/* Medium Priority */}
            {grouped.medium.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Suggested Improvements</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {grouped.medium.map((rec, i) => <RecommendationCard key={i} rec={rec} index={i} />)}
                </div>
              </section>
            )}

            {/* Low Priority */}
            {grouped.low.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-3 h-3 rounded-full bg-green-brand" />
                  <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Nice-to-Have Insights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {grouped.low.map((rec, i) => <RecommendationCard key={i} rec={rec} index={i} />)}
                </div>
              </section>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
