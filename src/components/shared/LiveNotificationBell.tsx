"use client";

import { useEffect, useState, useCallback } from "react";
import { Bell, BellRing, Check, X, BookOpen, Tractor, Leaf, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { io } from "socket.io-client";

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  BOOKING: Tractor,
  AI: Leaf,
  BLOG: BookOpen,
};

async function fetchNotifications(): Promise<Notification[]> {
  try {
    const token = document.cookie
      .split("; ")
      .find((r) => r.startsWith("token="))
      ?.split("=")[1];
    if (!token) return [];

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/notifications`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

async function markAllRead() {
  try {
    const token = document.cookie
      .split("; ")
      .find((r) => r.startsWith("token="))
      ?.split("=")[1];
    if (!token) return;
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/mark-all-read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {}
}

export default function LiveNotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [lastCount, setLastCount] = useState(0);

  const unread = notifications.filter((n) => !n.isRead).length;

  const poll = useCallback(async () => {
    const fresh = await fetchNotifications();
    setNotifications(fresh);
    setLastCount(fresh.filter((n) => !n.isRead).length);
  }, []);

  // Initial fetch + Socket.io setup
  useEffect(() => {
    poll();

    const token = document.cookie
      .split("; ")
      .find((r) => r.startsWith("token="))
      ?.split("=")[1];
    
    if (!token) return;

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
      auth: { token },
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.on("new_notification", (notification: Notification) => {
      setNotifications(prev => [notification, ...prev]);
      toast.success(notification.title, {
        description: notification.message,
        duration: 5000,
        icon: <BellRing className="text-green-brand" />,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [poll]);

  const handleMarkAllRead = async () => {
    await markAllRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setLastCount(0);
  };

  return (
    <div className="relative">
      <button
        id="notification-bell"
        onClick={() => setOpen((v) => !v)}
        className="relative w-11 h-11 rounded-2xl bg-card border border-border flex items-center justify-center hover:border-green-brand transition-all hover:text-green-brand"
        aria-label="Notifications"
      >
        {unread > 0 ? (
          <BellRing size={20} className="text-green-brand animate-wiggle" />
        ) : (
          <Bell size={20} />
        )}
        {unread > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-background">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-3 w-[380px] bg-card border border-border rounded-[32px] shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <p className="font-black text-foreground">Notifications</p>
                  {unread > 0 && (
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {unread} unread
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unread > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-brand hover:underline"
                    >
                      <Check size={12} /> Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center hover:bg-border transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
                {notifications.length === 0 ? (
                  <div className="py-16 text-center">
                    <Bell className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-sm font-bold text-muted-foreground">All caught up!</p>
                  </div>
                ) : (
                  notifications.slice(0, 20).map((n) => {
                    const Icon = ICON_MAP.INFO ?? Info;
                    return (
                      <div
                        key={n.id}
                        className={`flex items-start gap-4 p-5 transition-colors ${
                          !n.isRead ? "bg-green-brand/5" : "hover:bg-muted/50"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                            !n.isRead
                              ? "bg-green-brand text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-foreground leading-snug truncate">
                            {n.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                            {n.message}
                          </p>
                          <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-2">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {!n.isRead && (
                          <div className="w-2 h-2 rounded-full bg-green-brand mt-2 shrink-0" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
