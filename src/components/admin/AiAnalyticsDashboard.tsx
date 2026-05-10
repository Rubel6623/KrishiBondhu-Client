"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAiAnalytics } from '@/services/ai';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  BrainCircuit, 
  Activity, 
  Target, 
  Loader2, 
  History,
  TrendingUp,
  Zap
} from 'lucide-react';
import AiDataAnalyzer from './AiDataAnalyzer';
import { motion } from 'framer-motion';

const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac'];

export default function AiAnalyticsDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ai-analytics'],
    queryFn: fetchAiAnalytics,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">Aggregating AI metrics...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-20 text-center bg-red-50 dark:bg-red-500/10 rounded-[40px] border border-red-100 dark:border-red-500/20">
        <h3 className="text-red-600 font-bold uppercase tracking-widest text-xs">Failed to load AI analytics</h3>
        <p className="text-red-500/70 text-sm mt-2">Please ensure the Gemini API key is configured correctly on the server.</p>
      </div>
    );
  }

  const popularFeature = data.featureUsage.length > 0 
    ? [...data.featureUsage].sort((a: any, b: any) => b.count - a.count)[0]?.name 
    : 'N/A';

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            AI <em className="italic text-green-brand not-italic">Intelligence Hub</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-widest text-[10px]">Strategic monitoring of KrishiBondhu Smart Services</p>
        </div>
        <div className="flex items-center gap-3 bg-card border border-border px-6 py-3 rounded-2xl shadow-sm">
           <Zap className="text-amber-500 animate-pulse" size={18} />
           <span className="text-xs font-black uppercase tracking-widest">Real-time Performance</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total AI Queries", val: data.totalQueries, icon: BrainCircuit, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Queries This Week", val: data.queriesThisWeek, icon: Activity, color: "text-green-brand", bg: "bg-green-brand/10" },
          { label: "Top Feature", val: popularFeature, icon: Target, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border p-8 rounded-[40px] shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
               <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={20} />
               </div>
            </div>
            <p className="text-4xl font-black text-foreground tracking-tighter">{stat.val}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distribution Chart */}
        <div className="bg-card border border-border p-10 rounded-[40px] shadow-sm">
          <div className="flex items-center gap-3 mb-10">
            <TrendingUp className="text-green-brand" size={20} />
            <h3 className="text-xl font-serif font-black">Feature <em className="italic text-green-brand not-italic">Distribution</em></h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.featureUsage}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#64748B' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9', radius: 12 }}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                />
                <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                  {data.featureUsage.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Logs */}
        <div className="bg-card border border-border p-10 rounded-[40px] shadow-sm">
          <div className="flex items-center gap-3 mb-10">
            <History className="text-green-brand" size={20} />
            <h3 className="text-xl font-serif font-black">Recent <em className="italic text-green-brand not-italic">Interactions</em></h3>
          </div>
          <div className="space-y-4">
            {data.recentLogs.map((log: any) => (
              <div key={log.id} className="flex items-center justify-between p-4 rounded-3xl bg-muted/30 border border-transparent hover:border-green-brand/20 hover:bg-muted transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center font-black text-green-brand">
                    {log.user?.name?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-black text-foreground">{log.user?.name || 'Anonymous'}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{log.user?.role || 'Guest'}</p>
                  </div>
                </div>
                <div className="text-right">
                   <div className="px-3 py-1 rounded-full bg-green-brand/10 text-green-brand text-[9px] font-black uppercase tracking-widest mb-1">
                      {log.featureType.replace('_', ' ')}
                   </div>
                   <p className="text-[9px] font-bold text-muted-foreground">{new Date(log.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Data Analyzer Tool */}
      <div className="pt-10 border-t border-border">
         <div className="mb-10 text-center max-w-[600px] mx-auto">
            <h2 className="text-3xl font-serif font-black text-foreground mb-4">AI Strategic <em className="italic text-green-brand not-italic">Analyzer</em></h2>
            <p className="text-sm text-muted-foreground font-medium">Upload raw data or market trends below to generate deep strategic insights for the platform.</p>
         </div>
         <AiDataAnalyzer />
      </div>
    </div>
  );
}
