import Link from "next/link";
import { MapPin } from "lucide-react";
import SectionBackground from "./SectionBackground";

export default function TopProviders() {
  const providers = [
    { avatar: "🚜", name: "Agro Solutions BD", loc: "Rajshahi Division", badge: "✓ Verified Pro", rating: "4.9", equipment: "12", bookings: "340+" },
    { avatar: "🌾", name: "Sylhet Farm Tech", loc: "Sylhet Division", badge: "✓ Verified Pro", rating: "4.8", equipment: "8", bookings: "210+" },
    { avatar: "💧", name: "Dhaka Agri Rentals", loc: "Dhaka Division", badge: "✓ Verified", rating: "4.7", equipment: "15", bookings: "480+" },
    { avatar: "🌱", name: "Rangpur Harvest Co.", loc: "Rangpur Division", badge: "✓ Verified Pro", rating: "4.9", equipment: "6", bookings: "185+" },
  ];

  return (
    <section className="py-[100px] px-[5%] relative overflow-hidden" id="providers">
      <SectionBackground />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2px] uppercase text-green-brand dark:text-green-light mb-4 before:content-[''] before:block before:w-6 before:h-0.5 before:bg-green-brand dark:before:bg-green-light before:rounded-sm">Top Providers</div>
        <h2 className="font-serif text-[clamp(36px,4vw,54px)] font-extrabold leading-tight tracking-[-1.5px] text-green-deep dark:text-white mb-[18px]">Verified & Trusted<br /><em className="italic text-green-brand dark:text-green-bright not-italic">Equipment Partners</em></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {providers.map((p, i) => (
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-[20px] p-7 text-center border border-black/6 dark:border-white/10 hover:border-green-brand hover:shadow-xl hover:-translate-y-1 transition-all duration-300" key={p.name}>
              <div className="w-16 h-16 rounded-full bg-green-pale dark:bg-green-deep/40 mx-auto mb-4 flex items-center justify-center text-[30px] shadow-inner">{p.avatar}</div>
              <div className="text-[17px] font-bold text-green-deep dark:text-white mb-1">{p.name}</div>
              <div className="text-[12px] text-text-muted mb-4 flex items-center justify-center gap-1"><MapPin size={10} /> {p.loc}</div>
              <div className="inline-block text-[10px] font-bold tracking-[0.5px] uppercase px-3 py-1 rounded-full bg-green-pale dark:bg-green-brand/20 text-green-brand dark:text-green-bright mb-5">{p.badge}</div>
              <div className="flex justify-between pt-5 border-t border-black/5 dark:border-white/10">
                <div className="text-center"><div className="text-[16px] font-bold text-green-deep dark:text-white">{p.rating}</div><div className="text-[10px] text-text-muted uppercase font-semibold">Rating</div></div>
                <div className="text-center"><div className="text-[16px] font-bold text-green-deep dark:text-white">{p.equipment}</div><div className="text-[10px] text-text-muted uppercase font-semibold">Equip.</div></div>
                <div className="text-center"><div className="text-[16px] font-bold text-green-deep dark:text-white">{p.bookings}</div><div className="text-[10px] text-text-muted uppercase font-semibold">Book.</div></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/providers" className="inline-flex items-center gap-2 px-10 py-4 text-[15px] font-bold text-white bg-green-brand rounded-full hover:bg-green-mid hover:-translate-y-0.5 transition-all shadow-xl shadow-green-brand/20">Browse All Providers →</Link>
        </div>
      </div>
    </section>
  );
}
