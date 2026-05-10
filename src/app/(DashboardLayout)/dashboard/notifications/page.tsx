"use client";

import { useEffect, useState } from "react";
import { 
  Bell, 
  BellRing, 
  Check, 
  Trash2, 
  Filter, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Calendar,
  MoreVertical,
  Search,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchNotifications, markAllRead, markAsRead, INotification } from "@/services/notification";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
} as const;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    const data = await fetchNotifications();
    setNotifications(data);
    setLoading(false);
  };

  const handleMarkAllRead = async () => {
    const res = await markAllRead();
    if (res.success) {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read");
    }
  };

  const handleMarkAsRead = async (id: string) => {
    const res = await markAsRead(id);
    if (res.success) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    }
  };

  const filteredNotifications = notifications
    .filter(n => filter === "all" || !n.isRead)
    .filter(n => 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen space-y-10">
      {/* Header Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-green-brand/10 dark:bg-green-brand/20 px-4 py-2 rounded-full mb-4 text-[10px] font-black uppercase tracking-[2px] text-green-brand border border-green-brand/20">
              <Sparkles className="w-3.5 h-3.5" /> Activity Stream
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground font-serif tracking-tight leading-none mb-4">
              My <span className="text-green-brand italic">Notifications</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Stay updated with your latest activities, messages, and platform alerts in real-time.
            </p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-2 bg-green-brand text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-deep transition-all shadow-lg shadow-green-brand/20"
              >
                <Check className="w-4 h-4" /> Mark all as read
              </button>
            )}
            <button
              onClick={loadNotifications}
              className="p-3.5 bg-card border border-border rounded-2xl hover:border-green-brand transition-all group"
            >
              <Bell className={`w-5 h-5 group-hover:text-green-brand transition-colors ${unreadCount > 0 ? 'animate-wiggle text-green-brand' : ''}`} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Controls Bar */}
      <section>
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 border border-border rounded-[32px] p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/50 border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-green-brand/20 outline-none text-sm font-medium"
            />
          </div>
          
          <div className="flex items-center bg-muted/50 p-1.5 rounded-2xl shrink-0">
            <button 
              onClick={() => setFilter("all")}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === "all" ? "bg-white dark:bg-zinc-800 text-green-brand shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("unread")}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === "unread" ? "bg-white dark:bg-zinc-800 text-green-brand shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Notifications List */}
      <section className="pb-20">
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-32 bg-muted/50 animate-pulse rounded-[32px]" />
            ))}
          </div>
        ) : filteredNotifications.length > 0 ? (
          <motion.div 
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.05 } }
            }}
            className="grid grid-cols-1 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((notification) => (
                <motion.div
                  layout
                  key={notification.id}
                  variants={fadeInUp}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group relative flex items-start gap-6 p-6 sm:p-8 rounded-[32px] border transition-all duration-300 ${
                    !notification.isRead 
                      ? "bg-white dark:bg-zinc-900 border-green-brand/20 shadow-[0_20px_50px_rgba(45,138,82,0.06)] ring-1 ring-green-brand/5" 
                      : "bg-white/50 dark:bg-zinc-900/50 border-border hover:bg-white dark:hover:bg-zinc-900"
                  }`}
                >
                  {/* Status Indicator */}
                  {!notification.isRead && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-green-brand rounded-r-full" />
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                    !notification.isRead 
                      ? "bg-green-brand text-white shadow-lg shadow-green-brand/20" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {notification.title.toLowerCase().includes('success') ? <CheckCircle2 size={24} /> : 
                     notification.title.toLowerCase().includes('alert') ? <AlertCircle size={24} /> :
                     notification.title.toLowerCase().includes('error') ? <XCircle size={24} /> :
                     <Bell size={24} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className={`text-lg font-black leading-tight truncate ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                        {notification.title}
                      </h3>
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted/50 px-3 py-1 rounded-full whitespace-nowrap">
                        <Calendar className="w-3 h-3" />
                        {new Date(notification.createdAt).toLocaleDateString(undefined, { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className={`text-[15px] leading-relaxed line-clamp-2 sm:line-clamp-none ${!notification.isRead ? "text-muted-foreground font-medium" : "text-muted-foreground/60"}`}>
                      {notification.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {!notification.isRead && (
                      <button 
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-3 rounded-xl bg-green-brand/10 text-green-brand hover:bg-green-brand hover:text-white transition-all shadow-sm"
                        title="Mark as read"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button className="p-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            {...fadeInUp}
            className="flex flex-col items-center justify-center py-32 text-center bg-white dark:bg-zinc-900 border border-border border-dashed rounded-[48px]"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8">
              <BellRing className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h2 className="text-2xl font-black text-foreground mb-3">All caught up!</h2>
            <p className="text-muted-foreground max-w-xs mx-auto">
              You don&apos;t have any notifications {filter === "unread" ? "unread" : ""} at the moment.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
