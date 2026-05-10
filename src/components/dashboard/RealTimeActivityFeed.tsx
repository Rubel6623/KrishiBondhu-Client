"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tractor,
  Leaf,
  BookOpen,
  Wifi,
  WifiOff,
  RefreshCw,
  Zap,
  Activity,
  Clock,
} from "lucide-react";

interface ActivityEvent {
  id: string;
  type: "booking" | "ai_query" | "review" | "registration";
  message: string;
  status?: string;
  timestamp: string;
}

interface QueueStats {
  size: number;
  pending: number;
  concurrency: number;
  isPaused: boolean;
}

const EVENT_ICON: Record<string, React.ElementType> = {
  booking: Tractor,
  ai_query: Leaf,
  review: BookOpen,
  registration: Zap,
};

const EVENT_COLOR: Record<string, string> = {
  booking: "bg-blue-500/10 text-blue-500",
  ai_query: "bg-green-brand/10 text-green-brand",
  review: "bg-amber-500/10 text-amber-500",
  registration: "bg-purple-500/10 text-purple-500",
};

export default function RealTimeActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [queueStats, setQueueStats] = useState<QueueStats | null>(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const eventSourceRef = useRef<EventSource | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const BASE = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch initial snapshot
  const fetchRecent = async () => {
    try {
      const res = await fetch(`${BASE}/activity/recent`);
      const data = await res.json();
      if (data.success) {
        const tagged = data.data.events.map((e: any, i: number) => ({
          ...e,
          id: `init-${i}`,
        }));
        setEvents(tagged);
        setQueueStats(data.data.queueStats);
      }
    } catch {
      // silent fail — SSE will still work
    } finally {
      setLoading(false);
    }
  };

  // Connect to SSE stream
  const connectSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource(`${BASE}/activity/stream`);
    eventSourceRef.current = es;

    es.addEventListener("connected", () => {
      setConnected(true);
    });

    // Listen for pushed events
    es.addEventListener("new_booking", (e) => {
      const data = JSON.parse(e.data);
      addEvent({ ...data, type: "booking", id: `sse-${Date.now()}` });
    });

    es.addEventListener("new_ai_query", (e) => {
      const data = JSON.parse(e.data);
      addEvent({ ...data, type: "ai_query", id: `sse-${Date.now()}` });
    });

    es.addEventListener("new_registration", (e) => {
      const data = JSON.parse(e.data);
      addEvent({ ...data, type: "registration", id: `sse-${Date.now()}` });
    });

    es.onerror = () => {
      setConnected(false);
      es.close();
      // Auto-reconnect after 5 seconds
      setTimeout(connectSSE, 5000);
    };
  };

  const addEvent = (event: ActivityEvent) => {
    setEvents((prev) => [event, ...prev].slice(0, 50)); // Keep last 50 events
    // Scroll feed to top
    feedRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchRecent();
    connectSSE();
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  return (
    <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-green-brand/10 flex items-center justify-center text-green-brand">
            <Activity size={20} />
          </div>
          <div>
            <p className="font-black text-foreground text-sm">Live Activity Feed</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
              Real-time platform events
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Queue Stats */}
          {queueStats && (
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-muted rounded-2xl border border-border">
              <Zap size={12} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Queue: {queueStats.size} pending / {queueStats.pending} active
              </span>
            </div>
          )}
          {/* Connection Status */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
              connected
                ? "bg-green-brand/10 border-green-brand/20 text-green-brand"
                : "bg-red-500/10 border-red-500/20 text-red-500"
            }`}
          >
            {connected ? (
              <><Wifi size={11} /> Live</>
            ) : (
              <><WifiOff size={11} /> Reconnecting…</>
            )}
          </div>
          <button
            onClick={fetchRecent}
            className="w-8 h-8 rounded-xl bg-muted border border-border flex items-center justify-center hover:text-green-brand transition-colors"
            title="Refresh"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div
        ref={feedRef}
        className="h-[480px] overflow-y-auto divide-y divide-border"
      >
        {loading ? (
          <div className="space-y-0">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-6 animate-pulse">
                <div className="w-10 h-10 rounded-2xl bg-muted shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded-full w-2/3" />
                  <div className="h-3 bg-muted rounded-full w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="w-16 h-16 rounded-[24px] bg-muted flex items-center justify-center">
              <Activity size={28} className="text-muted-foreground/40" />
            </div>
            <p className="text-sm font-black text-muted-foreground">No activity yet</p>
            <p className="text-xs text-muted-foreground/60 max-w-[240px]">
              Events will stream here in real-time as users interact with the platform.
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {events.map((event) => {
              const Icon = EVENT_ICON[event.type] ?? Zap;
              const colorClass = EVENT_COLOR[event.type] ?? "bg-muted text-muted-foreground";
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-4 p-6 hover:bg-muted/30 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${colorClass}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground leading-snug">
                      {event.message}
                    </p>
                    {event.status && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-muted text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        {event.status}
                      </span>
                    )}
                    <div className="flex items-center gap-1.5 mt-2 text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                      <Clock size={9} />
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${colorClass.split(" ")[1]}`} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Footer stats */}
      <div className="px-8 py-4 border-t border-border flex items-center justify-between">
        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
          Showing {events.length} events
        </p>
        <div className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
          <div className={`w-2 h-2 rounded-full ${connected ? "bg-green-brand animate-pulse" : "bg-red-500"}`} />
          {connected ? "Streaming live" : "Reconnecting"}
        </div>
      </div>
    </div>
  );
}
