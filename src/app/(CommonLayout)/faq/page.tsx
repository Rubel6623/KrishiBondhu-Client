"use client";
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Search, HelpCircle, MessageCircle, ArrowRight, Tractor, CreditCard, UserCheck, ShieldCheck } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    label: "General",
    icon: <HelpCircle className="w-5 h-5" />,
    questions: [
      { q: "What is KrishiBondhu?", a: "KrishiBondhu is a specialized AgriTech marketplace that connects farmers who need agricultural machinery with providers who own them. We also provide AI-driven agricultural advice to help farmers optimize their yield." },
      { q: "Which areas do you cover?", a: "We currently operate across all 64 districts of Bangladesh, with our strongest presence in major agricultural hubs like Rajshahi, Bogura, and Mymensingh." },
      { q: "Is the platform free to use?", a: "Registering and searching for equipment is free. We only charge a small service fee on successful bookings to cover platform maintenance and insurance." },
    ]
  },
  {
    id: "renting",
    label: "Renting Equipment",
    icon: <Tractor className="w-5 h-5" />,
    questions: [
      { q: "How do I book a tractor or harvester?", a: "Simply search for the equipment you need on the 'Equipment' page, filter by your location, select a verified provider, and click 'Book Now'. Our team will coordinate the delivery." },
      { q: "Are the operators included?", a: "Most rentals include a professional operator provided by the equipment owner. You can check the specific terms on each equipment listing page." },
      { q: "What happens if the machine breaks down during work?", a: "If a machine fails, the provider is responsible for repair or providing a replacement. KrishiBondhu's support team is available 24/7 to resolve such disputes." },
    ]
  },
  {
    id: "payments",
    label: "Payments & Refunds",
    icon: <CreditCard className="w-5 h-5" />,
    questions: [
      { q: "Which payment methods are supported?", a: "We support all major mobile financial services in Bangladesh, including bKash, Nagad, and Rocket, as well as direct bank transfers." },
      { q: "How does the escrow system work?", a: "Your payment is held securely by KrishiBondhu when you book. We only release the funds to the provider after you confirm that the service has been successfully completed." },
      { q: "Can I cancel a booking?", a: "Yes, you can cancel up to 24 hours before the scheduled start time for a full refund. Late cancellations may incur a small fee." },
    ]
  },
  {
    id: "providers",
    label: "For Providers",
    icon: <UserCheck className="w-5 h-5" />,
    questions: [
      { q: "How do I list my machine?", a: "Sign up as a 'Provider', upload your machine's photos, NID, and ownership documents. Once our team verifies your profile, your listing will go live." },
      { q: "How much commission does KrishiBondhu take?", a: "We take a competitive 10-15% service fee depending on the machine type and rental duration." },
    ]
  }
];

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");

  const filteredFaqs = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <main className="min-h-screen pt-[var(--nav-h)] bg-background">
      {/* Header Section */}
      <section className="py-20 dark:bg-green-deep dark:text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="max-w-[800px] mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <span className="text-xs font-bold text-green-bright uppercase tracking-widest">Help Center</span>
          </div>
          <h1 className="text-[clamp(32px,5vw,56px)] font-serif font-black mb-8 leading-tight">
            How can we <em>help you</em> today?
          </h1>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-green-bright/60 dark:text-white/60 w-6 h-6" />
            <input 
              type="text" 
              placeholder="Search for answers (e.g. 'tractor', 'payment', 'refund')..." 
              className="w-full dark:bg-white/10 dark:backdrop-blur-xl dark:border-2 border-2 border-green-bright/60 dark:border-white/20 dark:text-white dark:placeholder:text-white/30 rounded-[24px] py-6 pl-14 pr-6 text-lg focus:outline-none focus:border-green-brand transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-[5%]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          
          {/* Sidebar Categories */}
          <aside className="hidden lg:block space-y-2 sticky top-[120px] h-fit">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-4">Categories</div>
            {faqCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
                  activeCategory === cat.id 
                    ? "bg-green-brand text-white shadow-lg shadow-green-brand/20" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </aside>

          {/* FAQ List */}
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map(cat => (
                <div key={cat.id} id={cat.id} className={`${searchTerm ? "block" : (activeCategory === cat.id ? "block" : "hidden lg:block")}`}>
                  <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-green-brand/10 text-green-brand flex items-center justify-center">{cat.icon}</span>
                    {cat.label}
                  </h2>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {cat.questions.map((q, idx) => (
                      <AccordionItem 
                        key={idx} 
                        value={`${cat.id}-${idx}`}
                        className="bg-white dark:bg-zinc-900 border border-border rounded-2xl px-6 overflow-hidden"
                      >
                        <AccordionTrigger className="text-left py-5 font-bold text-foreground hover:no-underline">
                          {q.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-[15px]">
                          {q.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or browsing categories.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 bg-cream dark:bg-zinc-950 px-[5%] border-t border-border">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-background p-10 rounded-[32px] border border-border shadow-sm flex flex-col items-start group">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-8">Can&apos;t find the answer you&apos;re looking for? Our friendly support team is here to help you via chat or email.</p>
            <a href="/contact" className="mt-auto inline-flex items-center gap-2 font-bold text-green-brand group-hover:gap-4 transition-all">
              Chat with Support <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="bg-background p-10 rounded-[32px] border border-border shadow-sm flex flex-col items-start group">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-brand rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Trust & Safety</h3>
            <p className="text-muted-foreground mb-8">Learn more about how we verify providers and protect your payments with our secure escrow system.</p>
            <a href="/terms-conditions" className="mt-auto inline-flex items-center gap-2 font-bold text-green-brand group-hover:gap-4 transition-all">
              Read Safety Policies <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
