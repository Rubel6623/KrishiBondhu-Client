"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListTodo, 
  Wallet, 
  User, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  Search,
  ShieldCheck,
  BarChart3,
  FolderOpen,
  ShieldAlert,
  CreditCard,
  Award,
  Star,
  Tractor,
  Leaf,
  MessageSquare,
  History,
  FileText,
  Settings
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getUser, UserLogOut } from "@/services/auth";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
// import { getMyNotifications } from "@/services/notifications"; // Ensure this service exists or mock it

const menuItems = {
  FARMER: [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard/farmer" },
    { label: "Rent Equipment", icon: Search, href: "/equipment" },
    { label: "My Bookings", icon: History, href: "/dashboard/farmer/bookings" },
    { label: "AI Crop Assistant", icon: Leaf, href: "/ai/crop-assistant" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
    { label: "Payment History", icon: CreditCard, href: "/dashboard/farmer/payments" },
    { label: "My Reviews", icon: Star, href: "/dashboard/farmer/reviews" },
  ],
  PROVIDER: [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard/provider" },
    { label: "My Equipment", icon: Tractor, href: "/dashboard/provider/equipment" },
    { label: "Add Equipment", icon: PlusCircle, href: "/dashboard/provider/add-equipment" },
    { label: "Received Bookings", icon: ListTodo, href: "/dashboard/provider/bookings" },
    { label: "Earnings", icon: Wallet, href: "/dashboard/provider/earnings" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
    { label: "Reviews & Ratings", icon: Star, href: "/dashboard/provider/reviews" },
  ],
  ADMIN: [
    { label: "Analytics", icon: BarChart3, href: "/dashboard/admin" },
    { label: "User Management", icon: User, href: "/dashboard/admin/users" },
    { label: "Providers", icon: ShieldCheck, href: "/dashboard/admin/providers" },
    { label: "Equipment", icon: Tractor, href: "/dashboard/admin/equipment" },
    { label: "All Bookings", icon: ListTodo, href: "/dashboard/admin/bookings" },
    { label: "Categories", icon: FolderOpen, href: "/dashboard/admin/categories" },
    { label: "Platform Blogs", icon: FileText, href: "/dashboard/admin/blogs" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
    { label: "System Settings", icon: Settings, href: "/dashboard/admin/settings" },
  ],
  VETERINARIAN: [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard/veterinarian" },
    { label: "Appointments", icon: ListTodo, href: "/dashboard/veterinarian/appointments" },
    { label: "Specialist Profile", icon: User, href: "/dashboard/veterinarian/profile" },
    { label: "Consultation History", icon: History, href: "/dashboard/veterinarian/history" },
    { label: "Reviews", icon: Star, href: "/dashboard/veterinarian/reviews" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      if (!userData) {
        router.push("/login");
        return;
      } 
      
      setUser(userData);

      // Role-based Path Protection
      const role = userData.role;
      const path = pathname.toLowerCase();

      if (path.startsWith("/dashboard/admin") && role !== "ADMIN") {
        router.push(`/dashboard/${role.toLowerCase()}`);
      } else if (path.startsWith("/dashboard/provider") && role !== "PROVIDER") {
        router.push(`/dashboard/${role.toLowerCase()}`);
      } else if (path.startsWith("/dashboard/farmer") && role !== "FARMER") {
        router.push(`/dashboard/${role.toLowerCase()}`);
      }
    };
    fetchUser();
  }, [router, pathname]);

  // Handle mobile responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await UserLogOut();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-brand border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">Initializing Dashboard...</p>
        </div>
      </div>
    );
  }

  const role = (user.role as keyof typeof menuItems) || "FARMER";
  const currentMenuItems = menuItems[role] || menuItems.FARMER;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex font-sans">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed lg:relative z-[60] w-72 h-screen bg-card border-r border-border flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-brand text-white shadow-lg shadow-green-brand/30 group-hover:rotate-12 transition-transform">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-serif font-black tracking-tight text-foreground">
                    KrishiBondhu
                  </span>
                  <span className="text-[9px] font-black text-green-brand uppercase tracking-widest mt-1">Dashboard</span>
                </div>
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 p-6 space-y-1 overflow-y-auto custom-scrollbar">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 ml-2">
                Main Menu
              </p>
              {currentMenuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                      isActive 
                        ? "bg-green-brand text-white shadow-lg shadow-green-brand/20" 
                        : "text-muted-foreground hover:bg-green-brand/5 hover:text-green-brand"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-white" : ""}`} />
                    <span className="font-bold text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-6 border-t border-gray-100 dark:border-white/5 space-y-3">
              <Link
                href={`/dashboard/${role.toLowerCase()}/profile`}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                  pathname.includes("/profile") 
                    ? "bg-muted text-foreground font-bold" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-bold">My Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group"
              >
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border px-8 flex items-center justify-between sticky top-0 z-[50]">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors border border-border"
              >
                <Menu className="w-6 h-6 text-muted-foreground" />
              </button>
            )}
            <div className="hidden md:block">
              <h2 className="text-xl font-serif font-black text-foreground">
                Hello, {user.name.split(' ')[0]}! 👋
              </h2>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-0.5">
                {role} Control Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2">
               <ThemeToggle />
            </div>
            
            <Link href="/dashboard/notifications" className="relative p-2.5 text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors border border-border group">
              <Bell className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 border-2 border-white dark:border-zinc-900 rounded-full flex items-center justify-center text-[10px] text-white font-black">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-4 pl-6 border-l border-gray-200 dark:border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-foreground leading-none mb-1">
                  {user.name}
                </p>
                <p className="text-[10px] text-green-brand font-black uppercase tracking-widest">
                  Verified {role}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-brand/10 border-2 border-green-brand/20 flex items-center justify-center text-green-brand font-black text-lg overflow-hidden shadow-inner">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-10 flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
