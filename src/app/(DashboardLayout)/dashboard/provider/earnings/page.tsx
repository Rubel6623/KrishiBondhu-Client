"use client";

import { useEffect, useState } from "react";
import { 
  Wallet, 
  TrendingUp, 
  ArrowDownCircle, 
  ArrowUpCircle,
  BarChart3,
  Calendar,
  Loader2
} from "lucide-react";
import { getProviderStats } from "@/services/analytics";

export default function EarningsPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      const res = await getProviderStats();
      if (res.success) setStats(res.data);
      setIsLoading(false);
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-green-brand" size={40} />
        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Calculating earnings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
          My <em className="italic text-green-brand not-italic">Earnings</em>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 font-medium">Track your income, withdrawals, and financial performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Earnings Card */}
        <div className="lg:col-span-2 bg-green-deep dark:bg-green-deep/20 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-green-brand/20">
           <div className="absolute top-0 right-0 w-64 h-64 bg-green-brand/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="relative z-10">
              <div className="flex items-center gap-3 opacity-80 mb-4">
                 <Wallet size={20} />
                 <span className="text-xs font-black uppercase tracking-[0.2em]">Total Balance</span>
              </div>
              <h2 className="text-6xl font-serif font-black mb-10">৳{stats?.totalEarnings || 0}</h2>
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">This Month</p>
                    <p className="text-2xl font-black">৳{(stats?.totalEarnings * 0.4).toFixed(0)}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Pending Clearances</p>
                    <p className="text-2xl font-black">৳{(stats?.totalEarnings * 0.1).toFixed(0)}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Withdrawal Card */}
        <div className="bg-card border border-border rounded-[40px] p-8 flex flex-col justify-between shadow-sm">
           <div>
              <div className="flex items-center justify-between mb-6">
                 <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                    <ArrowUpCircle size={24} />
                 </div>
                 <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full uppercase tracking-widest">Withdraw</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">Fast Payouts</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                 Withdraw your earnings directly to your bank account or mobile wallet. Minimum withdrawal amount is ৳500.
              </p>
           </div>
           <button className="w-full py-4 bg-foreground text-background font-black rounded-2xl text-xs uppercase tracking-widest hover:opacity-90 transition-all mt-8">
              Initiate Withdrawal
           </button>
        </div>
      </div>

      {/* Mock Transaction History */}
      <div className="space-y-6">
        <h2 className="text-xl font-serif font-black text-foreground">
          Recent <em className="italic text-green-brand not-italic">Transactions</em>
        </h2>
        <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
           <div className="divide-y divide-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center">
                       <ArrowDownCircle size={20} />
                    </div>
                    <div>
                       <p className="font-bold text-foreground">Rental Income - Combine Harvester</p>
                       <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Order #KB-293{i} • May {10-i}, 2026</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-green-brand">+৳{2500 - i * 200}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black">Completed</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
