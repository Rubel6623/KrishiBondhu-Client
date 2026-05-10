"use client";

import { Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message Sent Successfully!", {
      description: "We've received your message and will get back to you shortly.",
      duration: 5000,
    });
    // Optional: reset the form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground ml-1">Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your name"
            required
            className="w-full bg-muted/30 border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/5 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground ml-1">Phone Number</label>
          <input 
            type="tel" 
            placeholder="e.g. 017XXXXXXXX"
            required
            className="w-full bg-muted/30 border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/5 transition-all"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-foreground ml-1">Email Address</label>
        <input 
          type="email" 
          placeholder="Enter your email"
          required
          className="w-full bg-muted/30 border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/5 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-foreground ml-1">Subject</label>
        <select className="w-full bg-muted/30 border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/5 transition-all appearance-none">
          <option>General Inquiry</option>
          <option>Equipment Booking Issue</option>
          <option>Become a Provider</option>
          <option>Technical Support</option>
          <option>Feedback/Suggestions</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-foreground ml-1">Your Message</label>
        <textarea 
          placeholder="How can we help you?"
          rows={5}
          required
          className="w-full bg-muted/30 border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/5 transition-all resize-none"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-green-brand text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-green-deep hover:shadow-xl hover:shadow-green-brand/20 transition-all active:scale-[0.98]"
      >
        Send Message <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
