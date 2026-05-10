"use client";

import React, { useState } from 'react';
import { Sparkles, BarChart3, Loader2, Send, Database, Download } from 'lucide-react';
import { runAiDataAnalysis } from '@/services/ai';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiDataAnalyzer() {
  const [dataInput, setDataInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!dataInput.trim()) {
      toast.error("Please provide some data for analysis");
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await runAiDataAnalysis(dataInput);
      setAnalysisResult(result.response);
      toast.success("Strategic analysis complete!");
    } catch (error) {
      toast.error("AI analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border p-8 rounded-[40px] shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-brand/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-green-brand/10 flex items-center justify-center text-green-brand">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-xl font-serif font-black text-foreground">Strategic Data <em className="italic text-green-brand not-italic">Analyzer</em></h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Powered by KrishiBondhu Intelligence</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Paste Agricultural Data or Trends</label>
            <textarea 
              rows={8}
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              className="w-full p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium resize-none leading-relaxed"
              placeholder="Example: Yield data for Boro rice in Bogra vs Mymensingh for the last 3 years, or market price trends for onions..."
            />
          </div>

          <div className="flex justify-end mt-6">
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-10 py-4 bg-zinc-950 dark:bg-green-brand text-white rounded-full font-black text-sm hover:scale-105 transition-all shadow-2xl flex items-center gap-3 disabled:opacity-50"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {isAnalyzing ? "Processing Analytics..." : "Generate Insights"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {analysisResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 text-white p-10 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-brand/10 blur-[120px] rounded-full -mr-48 -mt-48" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <BarChart3 className="text-green-brand" size={24} />
                  <h4 className="text-2xl font-serif font-black">AI Analysis <em className="text-green-brand not-italic">Report</em></h4>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-white/70"
                >
                  <Download size={18} />
                </button>
              </div>

              <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-strong:text-green-brand prose-h3:text-white prose-li:text-gray-400">
                <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                  {analysisResult}
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="text-[10px] font-black uppercase tracking-[3px] text-white/30">KrishiBondhu V1.5 Analytics</div>
                <div className="flex items-center gap-2 text-green-brand font-black uppercase tracking-widest text-[10px]">
                  <Send size={12} /> Share Insights
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
