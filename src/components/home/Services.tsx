import Link from "next/link";
import { Tractor, Bot, FlaskConical, Droplets, Layout, MessageSquare } from "lucide-react";
import SectionBackground from "./SectionBackground";

export default function Services() {
  const services = [
    { icon: <Tractor />, title: "Equipment Rental", desc: "Rent power tillers, harvesters, irrigation pumps, and 50+ types of agricultural machinery from verified providers near you.", price: "Explore Equipment →", featured: true, tag: "Most Popular", href: "/equipment" },
    { icon: <Bot />, title: "AI Crop Assistant", desc: "Get personalized crop advice, disease detection, and yield predictions powered by our intelligent farming AI trained on Bangladeshi agriculture data.", price: "Try AI Assistant →", href: "/ai-assistant" },
    { icon: <FlaskConical />, title: "Soil Testing", desc: "Book certified soil testing services and receive detailed reports with fertilizer recommendations tailored to your specific land and crop type.", price: "Book Test →", href: "/services" },
    { icon: <Droplets />, title: "Irrigation Planning", desc: "AI-driven irrigation schedules, pump rental, and water management solutions to maximize yield while minimizing water usage.", price: "Learn More →", href: "/services" },
    { icon: <Layout />, title: "Farm Analytics", desc: "Track your spending, equipment usage, crop performance, and seasonal trends with a farmer-friendly analytics dashboard.", price: "View Dashboard →", href: "/dashboard" },
    { icon: <MessageSquare />, title: "Provider Network", desc: "Connect directly with verified equipment providers, negotiate rates, and build long-term relationships for priority seasonal bookings.", price: "Find Specialists →", href: "/specialists" },
  ];

  return (
    <section className="py-[100px] px-[5%] relative overflow-hidden" id="services">
      <SectionBackground />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2px] uppercase text-green-brand dark:text-green-light mb-4 before:content-[''] before:block before:w-6 before:h-0.5 before:bg-green-brand dark:before:bg-green-light before:rounded-sm">Our Services</div>
            <h2 className="font-serif text-[clamp(36px,4vw,54px)] font-extrabold leading-tight tracking-[-1.5px] text-green-deep dark:text-white mb-[18px]">Everything Your<br /><em className="italic text-green-brand dark:text-green-bright not-italic">Farm Needs</em></h2>
          </div>
          <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white bg-green-brand rounded-full hover:bg-green-mid hover:-translate-y-0.5 transition-all">View All Services →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((card, i) => (
            <Link 
              href={card.href}
              className={`block relative backdrop-blur-sm rounded-[32px] p-8 transition-all duration-350 hover:-translate-y-1 group border cursor-pointer ${
                card.featured 
                  ? "bg-green-brand dark:bg-green-brand border-green-bright shadow-xl shadow-green-brand/20" 
                  : "bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/10"
              }`} 
              key={card.title}
            >
              {/* Tag Badge */}
              {card.tag && (
                <div className={`absolute top-6 right-6 text-[10px] font-bold tracking-[1.2px] uppercase px-3 py-1 rounded-full ${
                  card.featured ? "bg-gold text-white" : "bg-gold/10 text-gold"
                }`}>
                  {card.tag}
                </div>
              )}

              {/* Icon */}
              <div className={`text-[40px] mb-6 block transition-transform group-hover:scale-110 duration-300 ${
                card.featured ? "text-white dark:text-green-deep" : "text-green-brand dark:text-green-bright"
              }`}>
                {card.icon}
              </div>

              {/* Title */}
              <h3 className={`font-serif text-[24px] font-bold mb-3 ${
                card.featured ? "text-white dark:text-green-deep" : "text-green-deep dark:text-white"
              }`}>
                {card.title}
              </h3>

              {/* Description */}
              <p className={`text-[15px] leading-relaxed mb-8 ${
                card.featured ? "text-white/80 dark:text-green-deep/80" : "text-text-muted"
              }`}>
                {card.desc}
              </p>

              {/* Footer / Price */}
              <div className={`text-[14px] font-bold flex items-center gap-2 ${
                card.featured ? "text-gold-light dark:text-green-deep" : "text-green-brand dark:text-green-bright"
              }`}>
                {card.price}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
