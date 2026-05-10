"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import RealTimeActivityFeed from "@/components/dashboard/RealTimeActivityFeed";
import { 
  Users, 
  LayoutDashboard, 
  Tractor, 
  CreditCard, 
  ArrowUp, 
  ArrowDown, 
  Loader2, 
  ShieldAlert, 
  BarChart3, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Clock,
  ExternalLink
} from "lucide-react";
import { getAdminStats } from "@/services/analytics";
import Link from "next/link";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await getAdminStats();
        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Process data for charts
  const chartData = useMemo(() => {
    if (!data) return { userType: [], equipment: [] };

    // User type distribution
    const userTypeData = [
      { name: 'Farmers', value: data.totalFarmers },
      { name: 'Providers', value: data.totalProviders },
    ];

    // Top Equipment Bookings
    const equipmentData = data.topEquipment.map((eq: any) => ({
      name: eq.title.substring(0, 10) + '...',
      bookings: eq._count.bookings,
      rating: eq.rating
    }));

    return { userType: userTypeData, equipment: equipmentData };
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Analytics...</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Users", value: data?.totalUsers?.toString() || "0", icon: Users, change: "+12%", trend: "up", color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Equipments", value: data?.totalEquipment?.toString() || "0", icon: Tractor, change: "+5%", trend: "up", color: "text-green-brand", bg: "bg-green-brand/10" },
    { label: "Total Revenue", value: `৳${data?.totalRevenue?.toLocaleString() || "0"}`, icon: CreditCard, change: "+18%", trend: "up", color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Total Bookings", value: data?.totalBookings?.toString() || "0", icon: LayoutDashboard, change: "+8%", trend: "up", color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const PIE_COLORS = ['#2d8a52', '#c8942a']; // Brand Green and Gold
  const BAR_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">Platform Health</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
            Admin <em>Intelligence</em>
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Real-time system oversight and growth metrics.</p>
        </div>
        <div className="flex gap-2">
            <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-2xl bg-background border border-border hover:bg-muted transition-all shadow-sm font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-brand" />
                Refresh Insights
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-[32px] bg-white dark:bg-zinc-950 border border-border shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-2 h-full opacity-10 ${stat.color.replace('text-', 'bg-')} transition-opacity group-hover:opacity-30`} />
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-serif font-black text-foreground tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Top Equipment Performance */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="p-10 rounded-[40px] bg-white dark:bg-zinc-950 border border-border shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-10 relative z-10">
            <h3 className="text-2xl font-serif font-black text-foreground flex items-center gap-3">
               <BarChart3 className="w-6 h-6 text-green-brand" />
               Equipment Performance
            </h3>
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest bg-muted px-4 py-2 rounded-xl">By Bookings</span>
          </div>
          <div className="h-[350px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.equipment}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888822" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#888', fontSize: 11, fontWeight: 'bold'}}
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#888', fontSize: 11, fontWeight: 'bold'}}
                />
                <Tooltip 
                  cursor={{fill: '#2d8a5208'}}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', backgroundColor: '#000', color: '#fff', padding: '15px' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Bar 
                    dataKey="bookings" 
                    fill="#2d8a52" 
                    radius={[10, 10, 0, 0]} 
                    barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* User Distribution */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="p-10 rounded-[40px] bg-white dark:bg-zinc-950 border border-border shadow-xl"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-serif font-black text-foreground flex items-center gap-3">
               <PieChartIcon className="w-6 h-6 text-gold" />
               User Ecosystem
            </h3>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.userType}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={120}
                  paddingAngle={10}
                  cornerRadius={10}
                  dataKey="value"
                >
                  {chartData.userType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', backgroundColor: '#000', color: '#fff', padding: '15px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontWeight: 'bold', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings Table */}
        <div className="p-10 rounded-[40px] bg-white dark:bg-zinc-950 border border-border shadow-xl h-[550px] flex flex-col">
          <div className="flex items-center justify-between mb-8 shrink-0">
            <h3 className="text-2xl font-serif font-black text-foreground flex items-center gap-3">
                <LayoutDashboard className="w-6 h-6 text-green-brand" />
                Recent Bookings
            </h3>
            <Link href="/dashboard/admin/bookings">
                <button className="px-6 py-2 rounded-xl bg-green-brand/10 text-green-brand font-black text-[10px] uppercase tracking-widest hover:bg-green-brand/20 transition-all flex items-center gap-2">
                  Full Log <ExternalLink className="w-3 h-3" />
                </button>
            </Link>
          </div>
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {data?.recentBookings?.map((booking: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-[24px] bg-muted/30 hover:bg-muted/60 transition-all border border-transparent hover:border-green-brand/20 group">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center font-black text-xl group-hover:rotate-12 transition-all">
                    {booking.totalPrice >= 5000 ? '💰' : '🌾'}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg leading-none mb-1">{booking.equipment?.title}</h4>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                      Farmer: {booking.farmer?.name} • ৳{booking.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest ${
                    booking.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : 
                    booking.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {booking.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-bold">{new Date(booking.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
            {!data?.recentBookings?.length && (
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <Clock className="w-12 h-12 mb-4" />
                <p className="font-bold italic">No recent bookings recorded.</p>
              </div>
            )}
          </div>
        </div>

        {/* System Activity / Insights */}
        <div className="p-10 rounded-[40px] bg-green-deep text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-brand/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-serif font-black mb-4">Strategic <br /><span className="text-green-brand italic">Growth</span> Insight</h3>
            <p className="text-white/70 leading-relaxed max-w-sm">
              Your platform has seen a <span className="text-green-brand font-black">24% increase</span> in provider registrations this month. Most bookings are happening in the <span className="text-gold font-black">Rajshahi division</span>.
            </p>
          </div>

          <div className="relative z-10 space-y-6 mt-12">
            <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-white/50">Market Saturation</span>
                <span className="text-xs font-black text-green-brand">High</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[78%] h-full bg-green-brand rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center">
                <div className="text-2xl font-serif font-black text-gold">৳{Math.round(data?.totalRevenue / (data?.totalBookings || 1)).toLocaleString()}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Avg Booking</div>
              </div>
              <div className="flex-1 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center">
                <div className="text-2xl font-serif font-black text-green-brand">4.8/5</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">CSAT Score</div>
              </div>
            </div>
          </div>
          
          <Link href="/dashboard/admin/settings" className="relative z-10 mt-10 w-full py-4 bg-white text-green-deep rounded-2xl font-black text-center hover:bg-green-light transition-all active:scale-95">
             Manage Platform Parameters
          </Link>
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <RealTimeActivityFeed />

    </div>
  );
}
