"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Send, X, MessageCircle, Loader2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: string;
  content: string;
  createdAt: string;
}

interface ChatWindowProps {
  contextType: "APPOINTMENT" | "BOOKING";
  contextId: string;
  participantName: string;
  onClose: () => void;
}

function getToken(): string | null {
  return (
    document.cookie
      .split("; ")
      .find((r) => r.startsWith("token="))
      ?.split("=")[1] ?? null
  );
}

function getMyId(): string | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
}

export default function ChatWindow({
  contextType,
  contextId,
  participantName,
  onClose,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const myId = getMyId();

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
      auth: { token },
      path: "/socket.io",
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join_room", { contextType, contextId });
    });

    socket.on("room_joined", ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      socket.emit("mark_read", { roomId });
    });

    socket.on("message_history", (history: ChatMessage[]) => {
      setMessages(history);
      setLoading(false);
    });

    socket.on("new_message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("error", (err: { message: string }) => {
      console.error("[Chat Error]", err.message);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [contextType, contextId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (!input.trim() || !roomId || !socketRef.current) return;
    socketRef.current.emit("send_message", { roomId, content: input.trim() });
    setInput("");
  }, [input, roomId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      className="flex flex-col w-[360px] h-[500px] bg-card border border-border rounded-[32px] shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border bg-green-brand/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-green-brand text-white flex items-center justify-center">
            <MessageCircle size={18} />
          </div>
          <div>
            <p className="text-sm font-black text-foreground">{participantName}</p>
            <div className="flex items-center gap-1.5">
              <Circle
                size={6}
                className={connected ? "fill-green-500 text-green-500" : "fill-gray-400 text-gray-400"}
              />
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                {connected ? "Online" : "Connecting..."}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center hover:bg-border transition-all"
        >
          <X size={14} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 size={28} className="animate-spin text-green-brand" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 opacity-50">
            <MessageCircle size={32} className="text-muted-foreground" />
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">
              No messages yet. Say hello!
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === myId;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-[20px] px-4 py-3 ${
                    isMe
                      ? "bg-green-brand text-white rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {!isMe && (
                    <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-60">
                      {msg.senderName}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p className={`text-[9px] mt-1 opacity-60 ${isMe ? "text-right" : ""}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || !roomId}
            className="w-8 h-8 rounded-xl bg-green-brand text-white flex items-center justify-center disabled:opacity-40 hover:bg-green-mid transition-all"
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-[9px] text-center text-muted-foreground/50 mt-2 uppercase tracking-widest">
          Press Enter to send
        </p>
      </div>
    </motion.div>
  );
}
