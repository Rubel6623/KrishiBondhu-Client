import type { Metadata } from "next";
import { Check, Zap, Shield, Crown, Tractor, Users, MessageSquare } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { 
  title: "Pricing Plans — KrishiBondhu",
  description: "Transparent pricing for farmers and equipment providers. Choose the plan that fits your agricultural needs."
};

const plans = [
  {
    name: "Farmer",
    price: "Free",
    desc: "Perfect for individual farmers looking to rent modern equipment.",
    icon: <Tractor className="w-10 h-10 text-green-brand" />,
    features: [
      "Access to all equipment listings",
      "AI Agricultural Advisor access",
      "Direct chat with providers",
      "Verified provider safety guarantee",
      "Booking history tracking",
      "No hidden subscription fees"
    ],
    buttonText: "Join as Farmer",
    href: "/register?role=farmer",
    highlight: false
  },
  {
    name: "Standard Provider",
    price: "৳৪৯৯",
    period: "/month",
    desc: "Ideal for individual equipment owners with 1-3 machines.",
    icon: <Users className="w-10 h-10 text-green-brand" />,
    features: [
      "List up to 3 machines",
      "Provider dashboard analytics",
      "Verified Provider badge",
      "Direct bKash/Nagad payments",
      "Priority customer support",
      "Monthly performance reports"
    ],
    buttonText: "Start Providing",
    href: "/register?role=provider",
    highlight: true
  },
  {
    name: "Premium Provider",
    price: "৳১,৪৯৯",
    period: "/month",
    desc: "For large fleet owners and agricultural cooperatives.",
    icon: <Crown className="w-10 h-10 text-gold" />,
    features: [
      "Unlimited machine listings",
      "Advanced ROI analytics",
      "Featured listing status",
      "API access for inventory",
      "Dedicated account manager",
      "Custom branding on profile"
    ],
    buttonText: "Go Premium",
    href: "/register?role=provider",
    highlight: false
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-[var(--nav-h)] bg-background overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-green-brand/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-green-brand/10 dark:bg-green-bright/15 border border-green-brand/20 px-4 py-1.5 rounded-full mb-6">
            <span className="text-xs font-bold text-green-deep dark:text-green-light uppercase tracking-widest">Transparent Pricing</span>
          </div>
          <h1 className="text-[clamp(32px,5vw,56px)] font-serif font-black leading-tight text-foreground mb-6">
            Invest in Your <br />
            <span className="text-green-brand italic">Farm&apos;s Future</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you are a farmer looking to modernize your harvest or a provider wanting to scale your business, we have a plan designed for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative flex flex-col p-10 rounded-[32px] border transition-all duration-500 hover:-translate-y-2 ${
                plan.highlight 
                ? "bg-green-deep text-white border-green-brand shadow-[0_32px_80px_rgba(45,138,82,0.25)] scale-105 z-20" 
                : "bg-white dark:bg-zinc-900 border-border shadow-sm hover:shadow-xl z-10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-green-deep font-black text-[11px] uppercase tracking-widest px-6 py-2 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className={`mb-8 p-4 rounded-2xl w-fit ${plan.highlight ? "bg-white/10" : "bg-green-brand/10"}`}>
                {plan.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-8 ${plan.highlight ? "text-white/70" : "text-muted-foreground"}`}>{plan.desc}</p>
              
              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-5xl font-black">{plan.price}</span>
                {plan.period && <span className={`text-lg font-medium ${plan.highlight ? "text-white/60" : "text-muted-foreground"}`}>{plan.period}</span>}
              </div>
              
              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? "bg-green-brand text-white" : "bg-green-brand/20 text-green-brand"}`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className={`text-[14.5px] leading-tight ${plan.highlight ? "text-white/85" : "text-muted-foreground"}`}>{feat}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                href={plan.href}
                className={`w-full py-4 rounded-2xl font-bold text-center transition-all ${
                  plan.highlight 
                  ? "bg-white text-green-deep hover:bg-green-light" 
                  : "bg-green-brand text-white hover:bg-green-deep"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQs Short Link */}
        <div className="mt-24 bg-cream dark:bg-zinc-950/50 border border-border rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-green-brand" />
              Have more questions?
            </h3>
            <p className="text-muted-foreground">Check our detailed FAQ page for information about payments, refunds, and machine insurance.</p>
          </div>
          <Link 
            href="/faq" 
            className="px-8 py-4 bg-background border border-border rounded-full font-bold hover:bg-muted transition-all"
          >
            Go to FAQs →
          </Link>
        </div>
      </div>
    </main>
  );
}
