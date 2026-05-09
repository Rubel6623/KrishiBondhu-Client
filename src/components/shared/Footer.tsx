import Link from "next/link";
import { Leaf } from "lucide-react";

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const YoutubeIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-green-950 dark:bg-green-950 py-16 px-6 sm:px-10 lg:px-[5%] text-gray-300">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10 mb-8">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white transition-transform group-hover:scale-110 group-hover:rotate-12">
              <Leaf size={20} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl font-bold text-white tracking-wide">KrishiBondhu</span>
              <span className="font-sans text-[10px] text-green-500 mt-1 tracking-wider uppercase font-medium">কৃষকের সাথে, উন্নতির পথে</span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed max-w-[280px] text-gray-400 mt-2">
            Bangladesh's first end-to-end agricultural equipment marketplace and AI farming platform. Empowering farmers, one booking at a time.
          </p>
          <div className="flex gap-3 mt-4">
            {[
              { icon: FacebookIcon, href: "#" },
              { icon: InstagramIcon, href: "#" },
              { icon: TwitterIcon, href: "#" },
              { icon: YoutubeIcon, href: "#" },
            ].map((Social, idx) => (
              <Link 
                key={idx} 
                href={Social.href} 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 transition-all duration-300 hover:bg-green-600 hover:border-green-600 hover:text-white hover:-translate-y-1"
              >
                <Social.icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-600"></span>
            Platform
          </h3>
          <ul className="flex flex-col gap-3.5">
            {[
              { name: "Equipment Marketplace", href: "/equipment" },
              { name: "Find Providers", href: "/providers" },
              { name: "All Services", href: "/services" },
              { name: "AI Crop Assistant", href: "/ai/crop-assistant" },
              { name: "Knowledge Hub", href: "/blog" },
              { name: "About Us", href: "/about" },
              { name: "Contact Us", href: "/contact-us" }
            ].map((link, i) => (
              <li key={i}>
                <Link href={link.href} className="text-sm text-gray-400 hover:text-[var(--green-bright)] hover:translate-x-1 transition-all inline-block">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-600"></span>
            Farmers
          </h3>
          <ul className="flex flex-col gap-3.5">
            {[
              { name: "Join as Farmer", href: "/register" },
              { name: "Farmer Dashboard", href: "/dashboard/farmer" },
              { name: "AI Recommendations", href: "/dashboard/farmer/ai-assistant" },
              { name: "My Bookings", href: "/dashboard/farmer/bookings" },
              { name: "FAQ", href: "/faq" },
              { name: "Support", href: "/support" }
            ].map((link, i) => (
              <li key={i}>
                <Link href={link.href} className="text-sm text-gray-400 hover:text-[var(--green-bright)] hover:translate-x-1 transition-all inline-block">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter / Providers */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-600"></span>
              Providers
            </h3>
            <ul className="flex flex-col gap-3.5">
              {[
                { name: "List Equipment", href: "/register?role=provider" },
                { name: "Provider Dashboard", href: "/dashboard/provider" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms & Conditions", href: "/terms-conditions" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[var(--green-bright)] hover:translate-x-1 transition-all inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs text-gray-500 text-center md:text-left">
          © {new Date().getFullYear()} KrishiBondhu. All rights reserved. Made with 🌱 for Bangladeshi farmers.
        </div>
        <div className="font-['Hind_Siliguri'] text-sm text-gray-400 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
          কৃষিকে করি আধুনিক ও লাভজনক
        </div>
      </div>
    </footer>
  );
};

export default Footer;
