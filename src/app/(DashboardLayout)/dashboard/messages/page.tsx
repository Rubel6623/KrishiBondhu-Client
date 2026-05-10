"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Search, 
  Loader2, 
  Clock, 
  ChevronRight,
  Circle,
  Send,
  MoreVertical,
  Paperclip,
  Smile,
  CheckCheck,
  User as UserIcon,
  Leaf
} from "lucide-react";
import { getMyChatRooms } from "@/services/chat";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

interface ChatRoom {
  id: string;
  contextType: string;
  contextId: string;
  title: string;
  subTitle: string;
  avatar: string | null;
  unreadCount: number;
  lastMessage: ChatMessage | null;
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

export default function MessagesPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const myId = getMyId();

  // Initial Fetch
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getMyChatRooms();
        if (res.success) {
          setRooms(res.data || []);
        }
      } catch (error) {
        toast.error("Failed to load conversations");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // Socket setup for active room
  useEffect(() => {
    if (!activeRoom) {
      if (socketRef.current) socketRef.current.disconnect();
      return;
    }

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
      socket.emit("join_room", { 
        contextType: activeRoom.contextType, 
        contextId: activeRoom.contextId 
      });
    });

    socket.on("message_history", (history: ChatMessage[]) => {
      setMessages(history);
      // Update unread count locally for the active room
      setRooms(prev => prev.map(r => 
        r.id === activeRoom.id ? { ...r, unreadCount: 0 } : r
      ));
    });

    socket.on("new_message", (msg: ChatMessage) => {
      setMessages(prev => [...prev, msg]);
      
      // Update rooms list with last message and unread count
      setRooms(prev => {
        const isCurrentRoom = msg.roomId === activeRoom?.id || 
                             (activeRoom && rooms.find(r => r.id === msg.roomId)?.id === activeRoom.id);
        
        return prev.map(r => {
          if (r.id === msg.roomId) {
            return {
              ...r,
              lastMessage: msg,
              unreadCount: isCurrentRoom ? 0 : r.unreadCount + (msg.senderId !== myId ? 1 : 0)
            };
          }
          return r;
        }).sort((a, b) => {
          const timeA = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
          const timeB = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
          return timeB - timeA;
        });
      });
    });

    socket.on("disconnect", () => setConnected(false));

    return () => {
      socket.disconnect();
    };
  }, [activeRoom, myId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current || !activeRoom) return;
    
    // Find internal roomId from rooms list if not already present
    const roomId = activeRoom.id;
    socketRef.current.emit("send_message", { roomId, content: input.trim() });
    setInput("");
  };

  const filteredRooms = rooms.filter(room => 
    room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.subTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-black animate-pulse uppercase tracking-[0.2em] text-xs">
          Syncing your conversations...
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-160px)] bg-card border border-border rounded-[40px] shadow-2xl flex overflow-hidden">
      {/* Sidebar - Conversations List */}
      <div className="w-full md:w-80 lg:w-[380px] border-r border-border flex flex-col bg-muted/20">
        <div className="p-6 border-b border-border space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif font-black text-foreground">Messages</h1>
            <div className="w-8 h-8 rounded-full bg-green-brand/10 text-green-brand flex items-center justify-center">
              <MessageSquare size={16} />
            </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border outline-none focus:border-green-brand transition-all text-xs font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room)}
                className={`w-full flex items-center gap-4 p-4 rounded-[24px] transition-all relative group ${
                  activeRoom?.id === room.id 
                    ? "bg-green-brand text-white shadow-lg shadow-green-brand/20" 
                    : "hover:bg-muted"
                }`}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold overflow-hidden ${
                    activeRoom?.id === room.id ? "bg-white/20" : "bg-green-brand/10 text-green-brand"
                  }`}>
                    {room.avatar ? (
                      <img src={room.avatar} alt={room.title} className="w-full h-full object-cover" />
                    ) : (
                      room.title.charAt(0)
                    )}
                  </div>
                  {room.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-card">
                      {room.unreadCount}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm font-black truncate ${activeRoom?.id === room.id ? "text-white" : "text-foreground"}`}>
                      {room.title}
                    </h3>
                    {room.lastMessage && (
                      <span className={`text-[9px] font-bold uppercase opacity-60 ${activeRoom?.id === room.id ? "text-white" : "text-muted-foreground"}`}>
                        {new Date(room.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-wider mb-1 ${activeRoom?.id === room.id ? "text-white/70" : "text-green-brand"}`}>
                    {room.subTitle}
                  </p>
                  {room.lastMessage && (
                    <p className={`text-xs truncate ${activeRoom?.id === room.id ? "text-white/80" : "text-muted-foreground font-medium"}`}>
                      {room.lastMessage.senderId === myId ? "You: " : ""}{room.lastMessage.content}
                    </p>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="py-20 text-center opacity-50 space-y-2">
              <MessageSquare className="mx-auto text-muted-foreground/30" size={32} />
              <p className="text-[10px] font-black uppercase tracking-widest">No conversations</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-card">
        {activeRoom ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-brand text-white flex items-center justify-center text-xl font-bold overflow-hidden">
                  {activeRoom.avatar ? (
                    <img src={activeRoom.avatar} alt={activeRoom.title} className="w-full h-full object-cover" />
                  ) : (
                    activeRoom.title.charAt(0)
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-black text-foreground">{activeRoom.title}</h2>
                  <div className="flex items-center gap-1.5">
                    <Circle size={6} className={connected ? "fill-green-500 text-green-500" : "fill-gray-400 text-gray-400"} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      {connected ? "Active Connection" : "Connecting..."}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-xl text-muted-foreground transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-card/50">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => {
                  const isMe = msg.senderId === myId;
                  const showDate = index === 0 || 
                    new Date(msg.createdAt).toDateString() !== new Date(messages[index-1].createdAt).toDateString();
                  
                  return (
                    <div key={msg.id} className="space-y-4">
                      {showDate && (
                        <div className="flex justify-center">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-muted px-3 py-1 rounded-full text-muted-foreground">
                            {new Date(msg.createdAt).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[70%] group relative ${isMe ? "text-right" : "text-left"}`}>
                          {!isMe && (
                            <p className="text-[9px] font-black uppercase tracking-widest mb-1 ml-1 text-green-brand">
                              {msg.senderName}
                            </p>
                          )}
                          <div className={`px-5 py-3.5 rounded-[24px] text-sm shadow-sm ${
                            isMe 
                              ? "bg-green-brand text-white rounded-tr-none" 
                              : "bg-muted text-foreground rounded-tl-none"
                          }`}>
                            <p className="leading-relaxed font-medium">{msg.content}</p>
                            <div className={`flex items-center gap-1 mt-1.5 opacity-60 ${isMe ? "justify-end" : ""}`}>
                              <span className="text-[10px] font-bold">
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {isMe && <CheckCheck size={12} className={msg.isRead ? "text-white" : "text-white/50"} />}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-border bg-muted/5">
              <div className="flex items-end gap-3 bg-card border border-border rounded-[24px] p-2 focus-within:border-green-brand transition-all shadow-sm">
                <button className="p-2.5 hover:bg-muted rounded-xl text-muted-foreground transition-all">
                  <Paperclip size={20} />
                </button>
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 py-2.5 bg-transparent outline-none text-sm font-medium resize-none max-h-32 custom-scrollbar"
                />
                <button className="p-2.5 hover:bg-muted rounded-xl text-muted-foreground transition-all">
                  <Smile size={20} />
                </button>
                <button 
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="p-3 bg-green-brand text-white rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-lg shadow-green-brand/30"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground/50 mt-3 uppercase tracking-widest font-bold">
                Shift + Enter for new line • Enter to send
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="w-32 h-32 rounded-[48px] bg-green-brand/5 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-green-brand/10 blur-2xl rounded-full" />
              <Leaf className="text-green-brand w-16 h-16 animate-bounce" />
            </div>
            <div className="space-y-2 max-w-md">
              <h2 className="text-2xl font-serif font-black text-foreground">Welcome to KrishiBondhu Chat</h2>
              <p className="text-muted-foreground font-medium">
                Select a conversation from the sidebar to start chatting with your farmers, providers, or specialists.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="p-4 rounded-3xl bg-muted/30 border border-border flex flex-col items-center gap-2">
                <Circle size={8} className="fill-green-500 text-green-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Secure</span>
              </div>
              <div className="p-4 rounded-3xl bg-muted/30 border border-border flex flex-col items-center gap-2">
                <CheckCheck size={16} className="text-green-brand" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Real-time</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
