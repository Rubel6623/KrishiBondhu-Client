import type { Metadata } from "next";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = { 
  title: "Contact Us — KrishiBondhu",
  description: "Get in touch with the KrishiBondhu team. We're here to help farmers and providers across Bangladesh."
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen pt-[var(--nav-h)] bg-background">
      {/* Header */}
      <section className="py-20 bg-green-deep text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="text-[clamp(36px,6vw,64px)] font-serif font-black leading-tight mb-6">
            Get in <em>Touch</em>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Have questions about renting equipment or becoming a provider? Our team is available 24/7 to support your farming journey.
          </p>
        </div>
      </section>

      <section className="py-24 px-[5%]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16">
          
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center shrink-0 group-hover:bg-green-brand group-hover:text-white transition-all">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Our Office</h4>
                    <p className="text-muted-foreground leading-relaxed">Suite 402, Agricultural Innovation Hub<br />Farmgate, Dhaka - 1215, Bangladesh</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Phone Numbers</h4>
                    <p className="text-muted-foreground">+880 1712 345678 (Support)</p>
                    <p className="text-muted-foreground">+880 1812 987654 (Provider Relations)</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white transition-all">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Email Us</h4>
                    <p className="text-muted-foreground">support@krishibondhu.com</p>
                    <p className="text-muted-foreground">info@krishibondhu.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-cream dark:bg-zinc-950/50 rounded-[32px] border border-border">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-green-brand" />
                Support Hours
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Saturday - Thursday</span>
                  <span className="font-bold text-foreground">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Friday</span>
                  <span className="font-bold text-foreground">Emergency Only</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-border shadow-2xl p-10 lg:p-16 relative">
            <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
              <MessageCircle className="w-32 h-32" />
            </div>
            
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Send a Message</h2>
            <p className="text-muted-foreground mb-10">Fill out the form below and our team will get back to you within 24 hours.</p>
            
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Social Support Section */}
      <section className="py-24 bg-cream dark:bg-zinc-950 px-[5%] border-t border-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <h3 className="text-2xl font-bold mb-10">Follow us for updates</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(social => (
              <a 
                key={social} 
                href="#" 
                className="flex items-center gap-3 px-8 py-4 bg-background border border-border rounded-2xl font-bold hover:border-green-brand hover:text-green-brand transition-all"
              >
                <Globe className="w-5 h-5" />
                {social}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
