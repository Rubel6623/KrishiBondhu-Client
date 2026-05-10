"use client";

import React, { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    toast.success("Welcome to the Circle! Check your inbox soon.", {
      description: `We've sent a verification link to ${email}`,
    });
    setEmail("");
  };

  return (
    <section className="px-[5%] mt-20 relative z-10">
      <div className="max-w-[1280px] mx-auto bg-green-brand rounded-[64px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-green-brand/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-black text-white mb-6 leading-tight">
            Get Farming Tips <em className="text-green-bright">Delivered</em>
          </h2>
          <p className="text-white/80 text-lg max-w-[600px] mx-auto mb-10 font-medium">
            Subscribe to our newsletter and join 10,000+ farmers receiving modern agricultural insights.
          </p>
          <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 py-2 h-14 rounded-2xl px-6 bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-white transition-all shadow-inner"
            />
            <button
              type="submit"
              className="h-14 px-10 rounded-2xl bg-white text-green-brand font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl"
            >
              Join Hub
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
