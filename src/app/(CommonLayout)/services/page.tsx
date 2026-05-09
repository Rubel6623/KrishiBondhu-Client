"use client";

import Link from "next/link";
import { Tractor, Bot, FlaskConical, Droplets, Layout, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import SectionBackground from "@/components/home/SectionBackground";

export default function ServicesPage() {
  const services = [
    {
      id: "equipment-rental",
      icon: <Tractor size={48} />,
      title: "Equipment Rental",
      shortDesc: "Access 50+ types of agricultural machinery on demand.",
      longDesc: "Rent power tillers, harvesters, irrigation pumps, and more from verified providers near you. We ensure all equipment is well-maintained and ready for deployment. Flexible daily, weekly, and seasonal rental plans available.",
      benefits: ["Verified providers", "Flexible pricing", "On-site delivery support"],
      price: "Starting from ৳ 400/day",
      link: "/equipment",
      linkText: "Browse Equipment",
      featured: true,
    },
    {
      id: "ai-assistant",
      icon: <Bot size={48} />,
      title: "AI Crop Assistant",
      shortDesc: "Intelligent farming advice powered by local data.",
      longDesc: "Get personalized crop advice, early disease detection, and yield predictions. Our AI is specifically trained on Bangladeshi agriculture data, weather patterns, and soil conditions to give you the most accurate recommendations.",
      benefits: ["Disease identification via photo", "Weather-based alerts", "Yield predictions"],
      price: "Free for all registered farmers",
      link: "/dashboard",
      linkText: "Try AI Assistant",
      featured: false,
    },
    {
      id: "soil-testing",
      icon: <FlaskConical size={48} />,
      title: "Soil Testing Services",
      shortDesc: "Scientific analysis for optimal crop selection.",
      longDesc: "Book certified soil testing experts who will collect samples from your land, analyze pH and nutrient levels, and provide a detailed report with tailored fertilizer and crop recommendations to maximize your yield.",
      benefits: ["Certified agronomists", "Detailed PDF reports", "Fertilizer recommendations"],
      price: "Starting from ৳ 250",
      link: "/contact-us",
      linkText: "Book a Test",
      featured: false,
    },
    {
      id: "irrigation",
      icon: <Droplets size={48} />,
      title: "Smart Irrigation",
      shortDesc: "Maximize yield while minimizing water usage.",
      longDesc: "Access AI-driven irrigation schedules, rent high-capacity water pumps, and get consultations on modern water management solutions like drip irrigation setups specifically tailored for your land topography.",
      benefits: ["Water conservation", "Pump rentals", "Custom schedules"],
      price: "Free consultation",
      link: "/equipment?category=irrigation",
      linkText: "Find Pumps",
      featured: false,
    },
    {
      id: "analytics",
      icon: <Layout size={48} />,
      title: "Farm Analytics",
      shortDesc: "Track spending and optimize your seasonal ROI.",
      longDesc: "A dedicated dashboard to track your equipment rental expenses, monitor crop performance over time, and analyze seasonal trends. Make data-driven decisions for your next planting season.",
      benefits: ["Expense tracking", "ROI calculation", "Exportable reports"],
      price: "Included in Dashboard",
      link: "/dashboard",
      linkText: "View Analytics",
      featured: false,
    },
    {
      id: "provider-network",
      icon: <MessageSquare size={48} />,
      title: "Provider Network",
      shortDesc: "Direct connections with equipment owners.",
      longDesc: "Connect directly with verified equipment providers, negotiate custom rates, and build long-term relationships to secure priority bookings during peak harvesting or planting seasons.",
      benefits: ["Direct messaging", "Secure payments", "Review system"],
      price: "Join the network",
      link: "/providers",
      linkText: "View Providers",
      featured: false,
    },
  ];

  return (
    <main className="min-h-screen pt-[120px] pb-20 relative overflow-hidden bg-background">
      <SectionBackground />
      
      {/* Hero Section */}
      <section className="px-[5%] mb-20 relative z-10 text-center">
        <div className="max-w-[800px] mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-brand/10 border border-green-brand/20 text-green-brand text-[12px] font-bold uppercase tracking-wider mb-6">
            Platform Features
          </div>
          <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.1] text-green-deep dark:text-white mb-6">
            Everything Your <br />
            <em className="italic text-green-brand dark:text-green-bright not-italic underline decoration-green-brand/30 decoration-8 underline-offset-8">Farm Needs</em>
          </h1>
          <p className="text-[18px] leading-relaxed text-text-muted mx-auto max-w-[600px]">
            From high-quality machinery rentals to cutting-edge AI assistance, we provide a complete ecosystem to modernize your agricultural operations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-[5%] relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`relative rounded-[32px] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 border animate-[fadeUp_0.6s_ease-out_both] ${
                  service.featured 
                    ? "bg-green-brand text-white border-green-bright shadow-[0_20px_60px_rgba(45,138,82,0.3)]" 
                    : "bg-white/60 dark:bg-card-bg backdrop-blur-md border-black/6 dark:border-white/10 shadow-lg hover:border-green-brand/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-10 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className={`p-4 rounded-2xl inline-block ${
                      service.featured ? "bg-white/20 text-white" : "bg-green-pale dark:bg-white/5 text-green-brand"
                    }`}>
                      {service.icon}
                    </div>
                    {service.featured && (
                      <span className="px-4 py-1.5 rounded-full bg-gold text-white text-[11px] font-bold tracking-wider uppercase shadow-sm">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h2 className={`font-serif text-3xl font-bold mb-4 ${
                    service.featured ? "text-white" : "text-green-deep dark:text-white"
                  }`}>
                    {service.title}
                  </h2>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    service.featured ? "text-green-pale" : "text-green-brand"
                  }`}>
                    {service.shortDesc}
                  </h3>
                  <p className={`text-[15px] leading-relaxed mb-8 flex-1 ${
                    service.featured ? "text-white/90" : "text-text-muted"
                  }`}>
                    {service.longDesc}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-3 mb-10">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className={`flex items-center gap-3 text-[14px] font-medium ${
                        service.featured ? "text-white" : "text-text-mid dark:text-text-muted"
                      }`}>
                        <CheckCircle2 size={18} className={service.featured ? "text-green-bright" : "text-green-brand"} />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${
                    service.featured ? "border-white/20" : "border-black/5 dark:border-white/10"
                  }`}>
                    <div className="text-[15px] font-bold">
                      {service.price}
                    </div>
                    <Link 
                      href={service.link}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                        service.featured 
                          ? "bg-white text-green-brand hover:bg-green-pale" 
                          : "bg-green-brand text-white hover:bg-green-mid"
                      }`}
                    >
                      {service.linkText} <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] mt-32 relative z-10">
         <div className="max-w-[1280px] mx-auto bg-green-deep dark:bg-[#0a1a11] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-brand/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10">
               <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-white mb-6">
                 Ready to modernize your farm?
               </h2>
               <p className="text-white/80 text-[18px] max-w-[600px] mx-auto mb-10">
                 Join thousands of farmers across Bangladesh who are already using KrishiBondhu to increase their yield and efficiency.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/register" className="px-8 py-4 bg-green-brand text-white font-bold rounded-full hover:bg-green-bright transition-all shadow-lg shadow-green-brand/30">
                     Create Free Account
                  </Link>
                  <Link href="/contact-us" className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-full hover:bg-white/20 transition-all">
                     Contact Sales Team
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}

