"use client";

import Link from "next/link";
import { Search, MessageCircle, PhoneCall, Mail, BookOpen, CreditCard, Settings, Tractor, ShieldAlert, ArrowRight, Sparkles, Shield, Lock, Eye, Server, ArrowLeft, CheckCircle2, ChevronRight, Scale, FileText, AlertTriangle, HelpCircle, ShieldCheck, Gavel } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
} as const;

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

export function SupportContent() {
  const supportCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      desc: "Guides for new farmers and providers to set up their accounts.",
      color: "text-blue-500",
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
    },
    {
      icon: Tractor,
      title: "Equipment & Listings",
      desc: "How to rent equipment or manage your provider listings.",
      color: "text-green-brand",
      bg: "bg-green-brand/10 dark:bg-green-brand/20",
    },
    {
      icon: CreditCard,
      title: "Payments & Refunds",
      desc: "Information about payment methods, escrow, and refund policies.",
      color: "text-amber-500",
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
    },
    {
      icon: Settings,
      title: "Account Settings",
      desc: "Manage your profile, password, and notification preferences.",
      color: "text-purple-500",
      bg: "bg-purple-500/10 dark:bg-purple-500/20",
    },
    {
      icon: ShieldAlert,
      title: "Trust & Safety",
      desc: "Learn about our verification processes and safety guidelines.",
      color: "text-red-500",
      bg: "bg-red-500/10 dark:bg-red-500/20",
    },
  ];

  return (
    <main className="min-h-screen pt-[var(--nav-h)] bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-green-50/50 to-background dark:from-zinc-900/50 dark:to-background">
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:32px_32px] text-green-900 dark:text-white" />
        
        {/* Decorative Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-brand/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-brand/10 dark:bg-green-brand/20 px-4 py-2 rounded-full mb-8 text-xs font-black uppercase tracking-[1.5px] text-green-brand border border-green-brand/20"
          >
            <Sparkles className="w-3.5 h-3.5" /> Help Center
          </motion.div>
          
          <motion.h1 
            {...fadeInUp}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground font-serif tracking-tight mb-8 leading-[1.1]"
          >
            How can we <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-brand to-green-deep italic">help you</span> today?
          </motion.h1>
          
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Find guides, troubleshoot issues, and connect with our support team to make the most of KrishiBondhu.
          </motion.p>
          
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="group relative flex items-center bg-white dark:bg-zinc-900 rounded-[24px] shadow-[0_20px_50px_rgba(45,138,82,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-border/50 overflow-hidden focus-within:ring-4 focus-within:ring-green-brand/10 transition-all duration-300">
              <Search className="w-6 h-6 text-muted-foreground ml-7 transition-colors group-focus-within:text-green-brand" />
              <input 
                type="text" 
                placeholder="Search articles, categories, or keywords..." 
                className="w-full py-6 px-5 bg-transparent border-none outline-none text-foreground text-lg placeholder:text-muted-foreground/50 font-medium"
              />
              <button className="bg-green-brand text-white px-10 py-6 font-black text-sm uppercase tracking-widest hover:bg-green-deep transition-all h-full shadow-lg">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-black font-serif text-foreground mb-5">Explore by Category</h2>
            <div className="w-20 h-1.5 bg-green-brand mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Click a category below to find specific answers and detailed documentation.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {supportCategories.map((cat, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="group relative bg-white dark:bg-zinc-900 border border-border/60 rounded-[32px] p-10 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:border-green-brand/20 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-brand/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${cat.bg} ${cat.color} shadow-inner`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-green-brand transition-colors">{cat.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">{cat.desc}</p>
                
                <div className="flex items-center gap-2 text-green-brand font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Read Guides <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
            
            {/* View All FAQ Card */}
            <motion.div 
              variants={fadeInUp}
              className="group relative bg-green-brand border-none rounded-[32px] p-10 shadow-[0_20px_40px_rgba(45,138,82,0.3)] hover:shadow-[0_30px_60px_rgba(45,138,82,0.4)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center items-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white mb-4">Still Curious?</h3>
                <p className="text-white/80 mb-10 text-[15px] leading-relaxed">Our FAQ covers almost everything from payments to rentals.</p>
                <Link href="/faq" className="inline-flex items-center gap-3 bg-white text-green-brand px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[1.5px] hover:scale-105 transition-transform shadow-xl">
                  Visit FAQ Page <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Direct Contact Section */}
      <section className="py-24 bg-muted/20 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900 rounded-[48px] border border-border/50 p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.06)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-brand/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="text-center mb-16 relative z-10">
              <h2 className="text-4xl font-black font-serif text-foreground mb-4">Talk to a Human</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Sometimes a conversation is better. Reach out to our dedicated support team.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              <div className="group flex flex-col items-center text-center p-8 rounded-[32px] hover:bg-muted/40 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-[20px] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Call Support</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">Mon - Sat, 9AM to 6PM</p>
                <a href="tel:+8801700000000" className="text-green-brand font-black text-[15px] hover:underline decoration-2 underline-offset-4 tracking-tight">+880 1700 000 000</a>
              </div>
              
              <div className="group flex flex-col items-center text-center p-8 rounded-[32px] hover:bg-muted/40 transition-all duration-300">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-[20px] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">Response within 12 hours</p>
                <a href="mailto:support@krishibondhu.com" className="text-green-brand font-black text-[15px] hover:underline decoration-2 underline-offset-4 tracking-tight">support@krishibondhu.com</a>
              </div>
              
              <div className="group flex flex-col items-center text-center p-8 rounded-[32px] hover:bg-muted/40 transition-all duration-300">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-[20px] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">Available for instant help</p>
                <Link href="/contact-us" className="inline-flex items-center gap-2 text-green-brand font-black text-[15px] hover:underline decoration-2 underline-offset-4 tracking-tight">
                  Start Chat <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export function PrivacyContent() {
  const lastUpdated = "May 10, 2026";

  return (
    <main className="min-h-screen pt-[var(--nav-h)] bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-green-50/30 to-background dark:from-zinc-900/30 dark:to-background border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:48px_48px] text-green-900 dark:text-white" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-brand/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-green-brand transition-all mb-10 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-brand/10 dark:bg-green-brand/20 px-4 py-2 rounded-full mb-8 text-[11px] font-black uppercase tracking-[2px] text-green-brand border border-green-brand/20"
          >
            <Shield className="w-3.5 h-3.5" /> Legal & Compliance
          </motion.div>

          <motion.h1 
            {...fadeInUp}
            className="text-5xl md:text-6xl font-black text-foreground font-serif tracking-tight mb-8 leading-tight"
          >
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-brand to-green-deep italic">Policy</span>
          </motion.h1>

          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            At KrishiBondhu, we prioritize your data security. This policy outlines how we handle your personal information with transparency and care.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-[1100px] flex flex-col lg:flex-row gap-16">
          
          {/* Quick Nav / Meta (Sidebar) */}
          <aside className="w-full lg:w-72 shrink-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-[calc(var(--nav-h)+3rem)] space-y-6"
            >
              <div className="bg-white dark:bg-zinc-900 border border-border/60 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="mb-8">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[1.5px] mb-3">Last Updated</p>
                  <p className="text-foreground font-bold text-lg">{lastUpdated}</p>
                </div>
                
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[1.5px] mb-5">Quick Jump</p>
                  <ul className="flex flex-col gap-4 text-sm font-bold text-foreground/70">
                    {[
                      { icon: Lock, label: "Data Collection" },
                      { icon: Eye, label: "Data Usage" },
                      { icon: Server, label: "Data Storage" },
                      { icon: Scale, label: "Your Rights" }
                    ].map((item, idx) => (
                      <li key={idx}>
                        <button className="flex items-center gap-3 hover:text-green-brand transition-all group w-full text-left">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-green-brand/10 transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-green-brand rounded-[32px] p-8 text-white shadow-lg overflow-hidden relative group cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-80">Need help?</p>
                <p className="font-bold text-lg mb-4">Have questions about your data?</p>
                <Link href="/contact-us" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white text-green-brand px-5 py-3 rounded-xl hover:scale-105 transition-transform">
                  Contact Us <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </aside>

          {/* Document Body */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-white dark:bg-zinc-900 border border-border/60 rounded-[40px] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.03)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
          >
            <div className="max-w-none">
              <div className="space-y-16">
                <section>
                  <h2 className="text-3xl font-black text-foreground mb-6 font-serif flex items-center gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center text-lg font-black">1</span>
                    Introduction
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Welcome to KrishiBondhu. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-black text-foreground mb-8 font-serif flex items-center gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-lg font-black">2</span>
                    Data We Collect
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    We collect and process various types of personal information to provide and improve our agricultural services:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { title: "Identity Data", items: ["First Name", "Last Name", "Username"] },
                      { title: "Contact Data", items: ["Email", "Phone", "Address"] },
                      { title: "Financial Data", items: ["Payment Details", "Invoices"] },
                      { title: "Technical Data", items: ["IP Address", "Browser Info"] }
                    ].map((group, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-muted/30 border border-border/50">
                        <h4 className="font-black text-foreground mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-brand" /> {group.title}
                        </h4>
                        <ul className="space-y-2">
                          {group.items.map((item, j) => (
                            <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-border" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-black text-foreground mb-6 font-serif flex items-center gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-lg font-black">3</span>
                    Data Security
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way. Our systems use industry-standard encryption and regular security audits to ensure your farm data remains private.
                  </p>
                </section>

                <section className="pt-8 border-t border-border/50">
                  <div className="p-10 bg-muted/30 rounded-[32px] border border-border/50 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-green-brand" />
                    <h3 className="text-xl font-black text-foreground mb-4">Official Contact</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      If you have any questions about this privacy policy or our privacy practices, please contact our Data Protection Officer.
                    </p>
                    <a href="mailto:privacy@krishibondhu.com" className="inline-block text-green-brand font-black text-lg hover:underline decoration-2 underline-offset-8 transition-all">
                      privacy@krishibondhu.com
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export function TermsContent() {
  const lastUpdated = "May 10, 2026";

  return (
    <main className="min-h-screen pt-[var(--nav-h)] bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-green-50/30 to-background dark:from-zinc-900/30 dark:to-background border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:48px_48px] text-green-900 dark:text-white" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-brand/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-green-brand transition-all mb-10 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-brand/10 dark:bg-green-brand/20 px-4 py-2 rounded-full mb-8 text-[11px] font-black uppercase tracking-[2px] text-green-brand border border-green-brand/20"
          >
            <FileText className="w-3.5 h-3.5" /> Legal & Compliance
          </motion.div>

          <motion.h1 
            {...fadeInUp}
            className="text-5xl md:text-6xl font-black text-foreground font-serif tracking-tight mb-8 leading-tight"
          >
            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-brand to-green-deep italic">Conditions</span>
          </motion.h1>

          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            By using KrishiBondhu, you agree to the following terms. We’ve designed these to ensure a safe and fair marketplace for all.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-[1100px] flex flex-col lg:flex-row gap-16">
          
          {/* Quick Nav / Meta (Sidebar) */}
          <aside className="w-full lg:w-72 shrink-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-[calc(var(--nav-h)+3rem)] space-y-6"
            >
              <div className="bg-white dark:bg-zinc-900 border border-border/60 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="mb-8">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[1.5px] mb-3">Last Updated</p>
                  <p className="text-foreground font-bold text-lg">{lastUpdated}</p>
                </div>
                
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[1.5px] mb-5">Section Index</p>
                  <ul className="flex flex-col gap-4 text-sm font-bold text-foreground/70">
                    {[
                      { icon: Scale, label: "Usage Terms" },
                      { icon: ShieldCheck, label: "Safety Rules" },
                      { icon: Gavel, label: "Liability" },
                      { icon: HelpCircle, label: "Disputes" }
                    ].map((item, idx) => (
                      <li key={idx}>
                        <button className="flex items-center gap-3 hover:text-green-brand transition-all group w-full text-left">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-green-brand/10 transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-zinc-900 dark:bg-zinc-800 rounded-[32px] p-8 text-white shadow-xl overflow-hidden relative group cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-brand/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-80 text-green-brand">Legal Help</p>
                <p className="font-bold text-lg mb-4">Questions about these terms?</p>
                <Link href="/contact-us" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-green-brand text-white px-5 py-3 rounded-xl hover:scale-105 transition-transform">
                  Talk to Us <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </aside>

          {/* Document Body */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-white dark:bg-zinc-900 border border-border/60 rounded-[40px] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.03)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
          >
            <div className="max-w-none">
              <div className="space-y-16">
                <section>
                  <h2 className="text-3xl font-black text-foreground mb-6 font-serif flex items-center gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center text-lg font-black">1</span>
                    Platform Usage
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    By accessing KrishiBondhu, you agree to use the platform only for its intended purposes: renting agricultural equipment and accessing farming insights. Any misuse of the platform, including fraudulent listings or unauthorized data scraping, is strictly prohibited.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-black text-foreground mb-8 font-serif flex items-center gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-lg font-black">2</span>
                    User Responsibilities
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      "Accurate profile information is mandatory.",
                      "Respect rental agreements and schedules.",
                      "Maintain the condition of rented equipment.",
                      "Report any issues or damages immediately."
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 border border-border/50 group hover:border-green-brand/30 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-green-brand mt-0.5 shrink-0" />
                        <p className="text-foreground font-medium">{text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-black text-foreground mb-6 font-serif flex items-center gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center text-lg font-black">3</span>
                    Liability Disclaimer
                  </h2>
                  <div className="p-8 rounded-[32px] bg-red-500/5 border border-red-500/10">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      KrishiBondhu acts as a marketplace. We are not responsible for the mechanical condition of equipment or the specific outcomes of farming advice. Users are encouraged to verify equipment condition and follow safety protocols.
                    </p>
                    <div className="flex items-center gap-3 text-red-500 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5" /> Important Safety Notice
                    </div>
                  </div>
                </section>

                <section className="pt-8 border-t border-border/50">
                  <div className="p-10 bg-zinc-900 rounded-[32px] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-brand/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-xl font-black text-white mb-4">Legal Notice</h3>
                    <p className="text-white/60 mb-8 leading-relaxed max-w-xl">
                      These terms are governed by the laws of Bangladesh. Any disputes will be settled through arbitration in accordance with local regulations.
                    </p>
                    <a href="mailto:legal@krishibondhu.com" className="inline-block text-green-brand font-black text-lg hover:underline decoration-2 underline-offset-8 transition-all">
                      legal@krishibondhu.com
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
