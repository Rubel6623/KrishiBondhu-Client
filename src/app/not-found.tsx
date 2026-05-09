"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Tractor, Home, ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-green-brand/20">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center relative overflow-hidden" style={{ paddingTop: "var(--nav-h)" }}>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-green-brand/5 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-lighten animate-floatOrb" />
          <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-gold/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-lighten animate-floatOrb" style={{ animationDelay: "-2s" }} />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] dark:opacity-[0.05] bg-[length:32px_32px]" />
        </div>

        <div className="container px-4 relative z-10 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center max-w-2xl mx-auto"
          >
            {/* 404 Visual */}
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-32 h-32 md:w-48 md:h-48 bg-green-brand/10 rounded-[40px] flex items-center justify-center rotate-3 border border-green-brand/20 shadow-2xl shadow-green-brand/10 backdrop-blur-md"
              >
                <Tractor className="w-16 h-16 md:w-24 md:h-24 text-green-brand -rotate-3" />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-background rounded-3xl p-4 md:p-6 shadow-xl border border-border flex items-center justify-center transform -rotate-12"
              >
                <span className="font-serif text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-brand to-green-deep">
                  404
                </span>
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-foreground mb-6 tracking-tight">
              Lost in the <em className="text-green-brand italic pr-2">Fields?</em>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps it never existed.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 rounded-full bg-green-brand hover:bg-green-brand/90 text-white transition-all shadow-lg shadow-green-brand/20 font-bold flex items-center justify-center gap-2 group">
                  <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                  Back to Homepage
                </button>
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-muted hover:bg-muted/80 border border-border text-foreground transition-all font-bold flex items-center justify-center gap-2 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
