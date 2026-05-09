"use client";

import { Fragment } from "react";
import Link from "next/link";
import SectionBackground from "./SectionBackground";

export default function Hero() {
  return (
    <section className="min-h-screen pt-[var(--nav-h)] relative overflow-hidden flex items-center">
      {/* Background Layer with theme-aware SectionBackground */}
      <SectionBackground />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:32px_32px] text-green-deep dark:text-white" />
      
      {/* Animated Orbs */}
      <div className="absolute rounded-full blur-[80px] pointer-events-none w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(74,184,112,0.2),transparent_70%)] -top-[100px] -right-[50px] animate-[floatOrb_8s_ease-in-out_infinite]" />
      <div className="absolute rounded-full blur-[80px] pointer-events-none w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(200,148,42,0.1),transparent_70%)] bottom-[50px] left-[100px] animate-[floatOrb_10s_ease-in-out_infinite_reverse]" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[5%] py-20 grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 bg-green-brand/10 dark:bg-green-bright/15 border border-green-brand/20 dark:border-green-bright/30 px-3.5 py-1.5 rounded-full mb-7 animate-[fadeUp_0.6s_ease_both]">
            <div className="w-2 h-2 rounded-full bg-green-brand dark:bg-green-bright animate-[pulse_2s_infinite]" />
            <span className="text-xs font-semibold text-green-deep dark:text-green-light tracking-wider uppercase">Bangladesh&apos;s #1 AgriTech Platform</span>
          </div>

          <h1 className="font-serif text-[clamp(48px,5.5vw,78px)] font-black leading-[1.0] tracking-[-2px] text-green-deep dark:text-white mb-6 animate-[fadeUp_0.7s_0.1s_ease_both]">
            Smart Farming<br />
            <em className="italic text-green-brand dark:text-green-bright not-italic">Starts Here.</em>
            <span className="block font-sans text-[clamp(28px,3vw,44px)] font-semibold tracking-normal text-gold mt-2 dark:text-gold-light">কৃষিকে করো সহজ ও লাভজনক</span>
          </h1>

          <p className="text-[17px] leading-relaxed text-text-mid dark:text-white/70 max-w-[480px] mb-9 animate-[fadeUp_0.7s_0.2s_ease_both]">
            Rent agricultural equipment, connect with trusted providers, and grow your farm with AI-powered insights — all in one platform built for Bangladeshi farmers.
          </p>

          <div className="flex gap-4 flex-wrap animate-[fadeUp_0.7s_0.3s_ease_both]">
            <Link href="/register" className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-bold text-white bg-green-brand rounded-full hover:bg-green-deep hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(45,138,82,0.3)] transition-all">
              🌾 Start as Farmer
            </Link>
            <Link href="/providers" className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-bold text-green-deep dark:text-white bg-white/40 dark:bg-white/10 border-[1.5px] border-green-brand/20 dark:border-white/25 rounded-full backdrop-blur-md hover:bg-white/60 dark:hover:bg-white/20 hover:-translate-y-0.5 transition-all">
              🚜 List Equipment
            </Link>
          </div>

          <div className="flex gap-9 mt-14 animate-[fadeUp_0.7s_0.4s_ease_both]">
            <div className="flex items-center gap-9">
              {[
                { val: "10K+", label: "Active Farmers" },
                { val: "2.5K+", label: "Equipment Listed" },
                { val: "64+", label: "Districts Covered" }
              ].map((stat, i) => (
                <Fragment key={stat.label}>
                  <div className="flex flex-col">
                    <div className="font-serif text-[32px] font-bold leading-none text-green-deep dark:text-white">{stat.val.replace("+", "")}<span className="text-green-brand dark:text-green-bright">+</span></div>
                    <div className="text-[12px] text-text-muted dark:text-white/50 mt-1 uppercase font-bold tracking-wider">{stat.label}</div>
                  </div>
                  {i < 2 && <div className="w-[1px] h-8 bg-black/10 dark:bg-white/12" />}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block animate-[fadeUp_0.8s_0.3s_ease_both]">
          <div className="bg-white/40 dark:bg-white/7 backdrop-blur-[20px] border border-black/5 dark:border-white/12 rounded-[24px] p-7 relative shadow-2xl">
            <div className="inline-flex items-center gap-1.5 bg-green-brand text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-[0.5px] uppercase mb-4">🔥 Available Now</div>
            <div className="font-serif text-[22px] font-bold text-green-deep dark:text-white leading-[1.3] mb-5">Rent Equipment Near You</div>
            <div className="flex flex-col gap-3">
              {[
                { icon: "🚜", name: "Power Tiller", detail: "Rajshahi · Available today", price: "৳800/day", bg: "rgba(45,138,82,0.12)" },
                { icon: "🌾", name: "Combine Harvester", detail: "Dhaka · 3 days min", price: "৳3500/day", bg: "rgba(200,148,42,0.12)" },
                { icon: "💧", name: "Irrigation Pump", detail: "Sylhet · Instant booking", price: "৳450/day", bg: "rgba(45,138,82,0.12)" },
              ].map((item) => (
                <div className="flex items-center gap-3 bg-white/60 dark:bg-white/6 border border-black/5 dark:border-white/8 rounded-[14px] p-3 hover:bg-green-brand/10 dark:hover:bg-green-bright/15 transition-all" key={item.name}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px] shrink-0" style={{ background: item.bg }}>{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-green-deep dark:text-white">{item.name}</div>
                    <div className="text-[11px] text-text-muted dark:text-white/50 mt-0.5">{item.detail}</div>
                  </div>
                  <div className="text-[13px] font-bold text-green-brand dark:text-green-bright">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-[18px] px-4.5 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] -bottom-6 -left-8 animate-[float_6s_ease-in-out_infinite]">
            <div className="text-[10px] text-text-muted dark:text-gray-400 mb-1 font-bold">Avg. savings per season</div>
            <div className="text-[16px] font-black text-green-deep">৳18,500</div>
            <div className="text-[10px] text-green-brand font-bold">↑ 34% vs. ownership</div>
          </div>
          <div className="absolute bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-[18px] px-4.5 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] -top-5 -right-5 animate-[float_5s_ease-in-out_infinite_reverse]">
            <div className="text-[10px] text-text-muted dark:text-gray-400 mb-1 font-bold">Provider rating</div>
            <div className="text-[#f5a623] text-[12px]">★★★★★</div>
            <div className="text-[14px] font-black text-green-deep dark:text-white">4.8 / 5.0</div>
          </div>
        </div>
      </div>
    </section>
  );
}
