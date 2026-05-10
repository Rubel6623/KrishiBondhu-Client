"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase.config";
import { socialLogin } from "@/services/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SocialLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user) {
        const userData = {
          email: user.email!,
          name: user.displayName!,
          avatar: user.photoURL || undefined,
        };

        const res = await socialLogin(userData);
        if (res.success) {
          toast.success("Welcome to KrishiBondhu!", {
            description: "Logged in with Google successfully.",
          });
          
          const role = res?.data?.user?.role?.toLowerCase() || "farmer";
          router.push(`/dashboard/${role}`);
          router.refresh();
        } else {
          toast.error(res.message || "Social login failed");
        }
      }
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        // User closed the popup, no need to show an error
        return;
      }
      console.error("Google Login Error:", error);
      toast.error(error.message || "Failed to login with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="relative flex items-center">
        <span className="flex-grow border-t border-border"></span>
        <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase tracking-widest font-bold">Or continue with</span>
        <span className="flex-grow border-t border-border"></span>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-12 rounded-xl border-border hover:bg-muted hover:text-foreground transition-all duration-300 flex items-center justify-center gap-3 font-bold group"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        ) : (
          <>
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </>
        )}
      </Button>
    </div>
  );
}
