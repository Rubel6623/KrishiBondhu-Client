import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Users, Leaf, Target, Heart, Zap } from "lucide-react";

export const metadata: Metadata = { 
  title: "About Us — KrishiBondhu",
  description: "Learn about KrishiBondhu, Bangladesh's premier AgriTech platform modernizing agriculture through equipment rental and AI advice."
};

export default function AboutPage() {
  const values = [
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "Trust & Safety", 
      desc: "Every provider and machine on our platform is strictly verified to ensure your peace of mind." 
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: "Innovation", 
      desc: "Leveraging AI and modern tech to solve age-old farming challenges in Bangladesh." 
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "Community First", 
      desc: "Built for farmers, by people who understand the soil. We grow together." 
    },
  ];

  const milestones = [
    { year: "2023", title: "The Idea", desc: "Born from a need to make machinery accessible to small-scale farmers." },
    { year: "2024", title: "Pilot Launch", desc: "Started with 50+ providers in Rajshahi and Bogura districts." },
    { year: "2025", title: "Going National", desc: "Now serving thousands of farmers across 64 districts." },
  ];

  return (
    <main className="min-h-screen pt-[var(--nav-h)] bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/about-hero.png" 
          alt="Modern Farming" 
          fill 
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="inline-flex items-center gap-2 bg-green-brand/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-brand animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Our Story</span>
          </div>
          <h1 className="text-[clamp(40px,7vw,72px)] font-serif font-black leading-tight text-white mb-6">
            Modernizing the <br />
            <span className="text-green-brand italic">Roots of Bangladesh</span>
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            KrishiBondhu is more than a marketplace; it&apos;s a movement to empower 16 million farmers with technology, transparency, and tools.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-[5%] relative">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <div className="section-label mb-4">Our Mission</div>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Empowering Every Farmer with <em>Modern Tools</em></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that the size of a farm shouldn&apos;t limit the quality of tools available to it. KrishiBondhu bridges the gap between expensive machinery and small-scale farmers through a secure, transparent rental ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-green-brand/5 rounded-3xl border border-green-brand/10">
                <Target className="w-10 h-10 text-green-brand mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-sm text-muted-foreground">To become the digital backbone of Bangladesh&apos;s agricultural revolution.</p>
              </div>
              <div className="p-6 bg-gold/5 rounded-3xl border border-gold/10">
                <Heart className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Values</h3>
                <p className="text-sm text-muted-foreground">Integrity, accessibility, and unwavering support for our farming community.</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-[40px] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
             <Image 
                src="/about-hero.png" 
                alt="Farmer with Tech" 
                fill 
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-10 left-10 text-white">
                <div className="text-5xl font-black mb-2">10K+</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80">Farmers Empowered</div>
             </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-24 bg-cream dark:bg-zinc-950">
        <div className="max-w-[1280px] mx-auto px-[5%]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">The <em>Values</em> That Drive Us</h2>
            <p className="text-muted-foreground">Built on a foundation of trust and innovation, we are committed to changing the agricultural landscape.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-background p-10 rounded-[32px] border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center mb-8">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-5xl font-serif font-bold mb-6">Our <em>Journey</em></h2>
              <p className="text-lg text-muted-foreground">From a simple observation to a national platform — here is how we grew.</p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-12 relative">
               <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-brand/10 hidden md:block" />
               {milestones.map((m, i) => (
                 <div key={i} className="relative z-10 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-green-brand text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-green-brand/20">{m.year}</div>
                    <h3 className="text-xl font-bold">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-[5%] bg-green-deep text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Ready to be part of the <em>Future?</em></h2>
          <p className="text-xl text-white/70 mb-10">Join thousands of farmers and providers building a smarter, stronger agricultural network in Bangladesh.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/register" className="px-10 py-4 bg-green-brand text-white font-bold rounded-full hover:bg-green-mid transition-all">Start Now →</a>
            <a href="/contact" className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all">Contact Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
