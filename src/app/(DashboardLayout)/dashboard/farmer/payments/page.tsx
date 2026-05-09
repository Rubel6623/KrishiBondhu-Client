"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Loader2, 
  RefreshCw,
  FileText,
  Calendar,
  Tractor,
  Wallet
} from "lucide-react";
import { getMyBookings } from "@/services/bookings";
import { toast } from "sonner";

export default function FarmerPayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await getMyBookings();
      if (res.success) {
        // We consider COMPLETED bookings as successful payments for now
        const completed = res.data.filter((b: any) => b.status === "COMPLETED");
        setPayments(completed);
      }
    } catch (error) {
      toast.error("Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading && payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Securing Ledger...</p>
      </div>
    );
  }

  const totalSpent = payments.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">Financial Records</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
            Payment <em>History</em>
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Track all your transactions and rental invoices.</p>
        </div>
        <button 
          onClick={fetchPayments}
          className="p-4 rounded-2xl bg-muted hover:bg-muted/80 transition-all border border-border"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Wallet Summary */}
      <div className="p-10 rounded-[40px] bg-green-deep text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-brand/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
                 <Wallet className="w-8 h-8 text-green-brand" />
              </div>
              <div>
                 <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-1">Total Lifetime Spend</p>
                 <h2 className="text-5xl font-serif font-black">৳{totalSpent.toLocaleString()}</h2>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Transactions</p>
                 <p className="text-xl font-bold">{payments.length}</p>
              </div>
              <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Status</p>
                 <p className="text-xl font-bold text-green-brand">Verified</p>
              </div>
           </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white dark:bg-zinc-950 border border-border rounded-[40px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-muted/20">
           <h3 className="text-lg font-black text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-brand" />
              Transaction Log
           </h3>
        </div>
        <div className="divide-y divide-border">
          <AnimatePresence mode="popLayout">
            {payments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-muted/30 transition-all group"
              >
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-foreground text-lg leading-none mb-1">Payment for {payment.equipment?.title}</h4>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-2">
                         <Calendar className="w-3 h-3" /> {new Date(payment.createdAt).toLocaleDateString()} • ID: {payment.id.substring(0, 10)}
                      </p>
                   </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="text-center md:text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Method</p>
                      <p className="text-sm font-bold text-foreground">KrishiPay Online</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Amount</p>
                      <p className="text-2xl font-serif font-black text-foreground">৳{payment.totalPrice.toLocaleString()}</p>
                   </div>
                   <div className="p-2 rounded-xl bg-muted text-muted-foreground group-hover:bg-green-brand group-hover:text-white transition-all cursor-pointer">
                      <FileText className="w-5 h-5" />
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {payments.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-serif font-black text-foreground">No payments recorded</h3>
            <p className="text-muted-foreground font-medium">Your financial history will appear here once you complete a rental.</p>
          </div>
        )}
      </div>
    </div>
  );
}
