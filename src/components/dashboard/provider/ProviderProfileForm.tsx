"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMe, updateProfile } from "@/services/auth";
import { User, Mail, Phone, MapPin, Camera, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(3, "Location is required"),
  avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProviderProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const avatarUrl = watch("avatar");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMe();
        if (res.success) {
          reset({
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phone || "",
            location: res.data.location || "",
            avatar: res.data.avatar || "",
          });
        }
      } catch (error) {
        toast.error("Failed to fetch profile");
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      const res = await updateProfile(data);
      if (res.success) {
        toast.success("Profile updated successfully!");
        reset(data); // reset dirty state
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl animate-fadeUp">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Left Column: Avatar & Verification */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-[32px] p-8 text-center shadow-sm">
            <div className="relative inline-block group mb-6">
              <Avatar className="w-32 h-32 border-4 border-background ring-2 ring-green-brand/20 shadow-2xl">
                <AvatarImage src={avatarUrl} alt="Profile" />
                <AvatarFallback className="bg-green-50 text-green-brand text-4xl font-black">
                  {watch("name")?.[0]?.toUpperCase() || "P"}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-green-brand text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-deep transition-all group-hover:scale-110">
                <Camera size={18} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-1">{watch("name")}</h3>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Equipment Provider</p>
            
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-brand/10 text-green-brand rounded-full border border-green-brand/20">
              <ShieldCheck size={16} className="shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Verified Business</span>
            </div>
          </div>

          <div className="bg-green-brand text-white rounded-[32px] p-6 shadow-lg shadow-green-brand/20">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} />
              Trust Score: 98%
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Your profile is nearly complete. Verifying your business address increases your visibility to farmers by 40%.
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-card border border-border rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-brand/5 blur-[60px] rounded-full -mr-16 -mt-16" />
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name / Business Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter name"
                    className="pl-10 h-12 rounded-xl border-border bg-muted/30 focus:bg-background transition-all"
                    {...register("name")}
                  />
                </div>
                {errors.name && <p className="text-xs text-destructive font-medium">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address (Read Only)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    readOnly
                    className="pl-10 h-12 rounded-xl border-border bg-muted/10 opacity-70 cursor-not-allowed"
                    {...register("email")}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+880 1XXX-XXXXXX"
                    className="pl-10 h-12 rounded-xl border-border bg-muted/30 focus:bg-background transition-all"
                    {...register("phone")}
                  />
                </div>
                {errors.phone && <p className="text-xs text-destructive font-medium">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Business Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, District"
                    className="pl-10 h-12 rounded-xl border-border bg-muted/30 focus:bg-background transition-all"
                    {...register("location")}
                  />
                </div>
                {errors.location && <p className="text-xs text-destructive font-medium">{errors.location.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Profile Picture URL</Label>
              <div className="relative">
                <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="avatar"
                  placeholder="https://example.com/avatar.jpg"
                  className="pl-10 h-12 rounded-xl border-border bg-muted/30 focus:bg-background transition-all"
                  {...register("avatar")}
                />
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Recommended: Square image, max 2MB</p>
            </div>

            <div className="pt-4 border-t border-border flex justify-end gap-4">
              <Button
                type="button"
                variant="ghost"
                className="rounded-xl px-6 h-12 font-bold"
                onClick={() => reset()}
                disabled={!isDirty || isLoading}
              >
                Reset Changes
              </Button>
              <Button
                type="submit"
                className="rounded-xl px-10 h-12 bg-green-brand hover:bg-green-deep text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-green-brand/20 disabled:opacity-50 transition-all hover:-translate-y-1"
                disabled={!isDirty || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </div>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
