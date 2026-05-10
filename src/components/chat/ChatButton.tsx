"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ChatWindow = dynamic(() => import("./ChatWindow"), { ssr: false });

interface ChatButtonProps {
  contextType: "APPOINTMENT" | "BOOKING";
  contextId: string;
  participantName: string;
  label?: string;
}

export default function ChatButton({
  contextType,
  contextId,
  participantName,
  label = "Open Chat",
}: ChatButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2.5 rounded-xl bg-blue-500/10 text-blue-500 font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 border border-blue-500/20"
      >
        <MessageCircle size={14} />
        {label}
      </button>

      {/* Floating chat window — rendered below the button */}
      <div className="fixed bottom-8 right-8 z-[999]">
        <AnimatePresence>
          {open && (
            <ChatWindow
              contextType={contextType}
              contextId={contextId}
              participantName={participantName}
              onClose={() => setOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
