"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/auth";
import { 
  Stethoscope, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  MapPin, 
  ArrowLeft, 
  GraduationCap, 
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import SocialLogin from "@/components/shared/SocialLogin";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  location: z.string().min(3, "Location is required"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterSpecialistPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Force VETERINARIAN role
      const result = await registerUser({ ...data, role: "VETERINARIAN" });
      if (result.success) {
        toast.success("Specialist account created!", {
          description: "Welcome to the panel. Please log in to complete your professional profile.",
        });
        router.push("/login");
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Column: Marketing/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-brand relative flex-col justify-center p-20 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid)" />
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
          </svg>
        </div>

        <Link 
          href="/" 
          className="absolute top-10 left-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[3px] text-white/70 hover:text-white transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="relative z-10 max-w-lg">
          <div className="w-20 h-20 bg-white/10 rounded-[30px] flex items-center justify-center mb-10 border border-white/20 backdrop-blur-xl">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-serif font-black mb-8 leading-tight">
            Join the Digital <br /><em className="italic text-green-bright not-italic">Veterinary Revolution</em>
          </h1>
          <p className="text-lg text-white/80 font-medium mb-12 leading-relaxed">
            KrishiBondhu connects verified veterinarians with thousands of farmers nationwide. 
            Grow your practice while making a real impact on livestock health.
          </p>

          <div className="space-y-6">
            {[
              "Reach 10k+ local farmers",
              "Manage digital appointments",
              "Secure payment processing",
              "Build your professional brand"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-green-bright group-hover:text-green-brand transition-all">
                  <CheckCircle2 size={16} />
                </div>
                <span className="font-bold text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-white/5 blur-[100px] rounded-full" />
      </div>

      {/* Right Column: Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-20 relative bg-background">
        <div className="w-full max-w-md space-y-10">
          
          <div className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-brand/10 rounded-3xl flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-green-brand" />
              </div>
            </div>
            <h2 className="text-3xl font-serif font-black text-foreground">Specialist Registration</h2>
            <p className="text-muted-foreground mt-2 font-medium">Step into your digital veterinary clinic</p>
          </div>

          <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-green-brand/20 to-transparent">
            <div className="bg-card border border-border/50 p-10 rounded-[2.3rem] shadow-xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name & Title</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-brand transition-colors" />
                    <Input
                      id="name"
                      placeholder="e.g. Dr. Abul Hayat"
                      className="pl-11 h-14 rounded-2xl bg-muted/30 border-transparent focus:border-green-brand transition-all font-medium"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-destructive font-bold">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Professional Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-brand transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="dr.hayat@example.com"
                      className="pl-11 h-14 rounded-2xl bg-muted/30 border-transparent focus:border-green-brand transition-all font-medium"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-destructive font-bold">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</Label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-brand transition-colors" />
                      <Input
                        id="phone"
                        placeholder="017XXXXXXXX"
                        className="pl-11 h-14 rounded-2xl bg-muted/30 border-transparent focus:border-green-brand transition-all font-medium"
                        {...register("phone")}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-destructive font-bold">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">City/Region</Label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-brand transition-colors" />
                      <Input
                        id="location"
                        placeholder="Dhaka, BD"
                        className="pl-11 h-14 rounded-2xl bg-muted/30 border-transparent focus:border-green-brand transition-all font-medium"
                        {...register("location")}
                      />
                    </div>
                    {errors.location && <p className="text-xs text-destructive font-bold">{errors.location.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Secure Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-brand transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-11 h-14 rounded-2xl bg-muted/30 border-transparent focus:border-green-brand transition-all font-medium"
                      {...register("password")}
                    />
                  </div>
                  {errors.password && <p className="text-xs text-destructive font-bold">{errors.password.message}</p>}
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-brand/5 border border-green-brand/10 rounded-2xl">
                   <ShieldCheck size={20} className="text-green-brand shrink-0" />
                   <p className="text-[10px] font-bold text-green-brand/80 leading-relaxed uppercase tracking-widest">
                     Your role is preset to <span className="font-black">Veterinarian</span> for this specialized application.
                   </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-16 text-sm font-black uppercase tracking-widest rounded-2xl bg-green-brand hover:bg-green-mid transition-all duration-300 shadow-2xl shadow-green-brand/30"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Validating...
                    </div>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground font-medium">
              Already have a specialist account?{" "}
              <Link
                href="/login"
                className="font-black text-green-brand hover:underline transition-all"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
