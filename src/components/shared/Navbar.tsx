"use client";

import { useEffect, useState } from "react";
import { MenuIcon, LogOut, LayoutDashboard, UserCircle, PlusCircle, Leaf } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../shared/ThemeToggle";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser, UserLogOut, getMe } from "@/services/auth";

export const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const decodedUser = await getUser();
      if (decodedUser) {
        const fullProfile = await getMe();
        if (fullProfile?.success) {
          setUser(fullProfile.data);
        } else {
          setUser(decodedUser);
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await UserLogOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const features = [
    {
      title: "Marketplace",
      description: "Rent or list agricultural equipment",
      href: "/equipment",
    },
    {
      title: "AI Assistant",
      description: "Get smart recommendations for your farm",
      href: "/ai/crop-assistant",
    },
    {
      title: "Find Providers",
      description: "Connect with trusted equipment owners",
      href: "/providers",
    },
    {
      title: "About Us",
      description: "Our mission to support farmers across the nation",
      href: "/about",
    }
  ];

  return (
    <section className="py-4 bg-background/80 sticky top-0 z-50 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform group-hover:scale-105">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl font-bold text-green-900 dark:text-white tracking-tight">
                KrishiBondhu
              </span>
              <span className="font-sans text-[10px] text-green-600 mt-1 tracking-wider uppercase font-medium">
                কৃষকের সাথে, উন্নতির পথে
              </span>
            </div>
          </Link>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground hover:text-green-600 transition-colors">Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="border-border bg-background shadow-2xl grid w-[600px] grid-cols-2 p-3 border rounded-xl">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        asChild
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-green-50 dark:hover:bg-green-600/20 cursor-pointer group"
                      >
                        <Link href={feature.href}>
                          <p className="mb-1 font-semibold text-foreground group-hover:text-green-600">
                            {feature.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/equipment"
                    className={`${navigationMenuTriggerStyle()} bg-transparent text-foreground hover:text-green-600 transition-colors`}
                  >
                    Marketplace
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/providers"
                    className={`${navigationMenuTriggerStyle()} bg-transparent text-foreground hover:text-green-600 transition-colors`}
                  >
                    Providers
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/services"
                    className={`${navigationMenuTriggerStyle()} bg-transparent text-foreground hover:text-green-600 transition-colors`}
                  >
                    Services
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    className={`${navigationMenuTriggerStyle()} bg-transparent text-foreground hover:text-green-600 transition-colors`}
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-4">
                <Link href={user.role === "PROVIDER" ? "/dashboard/provider/add-equipment" : "/dashboard/farmer/bookings"}>
                  <Button className="bg-green-600 text-white hover:bg-green-700 flex gap-2 shadow-lg shadow-green-500/20 rounded-xl px-6">
                    <PlusCircle className="w-4 h-4" />
                    {user.role === "PROVIDER" ? "List Equipment" : "My Bookings"}
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-transparent p-0">
                       <Avatar className="h-10 w-10 border-2 border-border hover:border-green-600 transition-colors">
                         <AvatarImage src={user.avatarUrl} alt={user.name} />
                         <AvatarFallback className="bg-green-50 text-green-900 font-bold">{user.name?.[0] || 'U'}</AvatarFallback>
                       </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-2 rounded-2xl bg-background border border-border shadow-2xl" align="end" sideOffset={12}>
                    <DropdownMenuLabel className="font-normal p-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        <span className="mt-1 w-fit px-2 py-0.5 bg-green-50 text-green-900 text-[10px] font-black rounded-full uppercase tracking-widest">
                          {user.role}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border/50 my-1" />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/${user.role?.toLowerCase()}`} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted transition-colors font-medium">
                        <LayoutDashboard className="w-4 h-4 text-green-600" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/${user.role?.toLowerCase()}/profile`} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted transition-colors font-medium">
                        <UserCircle className="w-4 h-4 text-green-600" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50 my-1" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 transition-colors font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-foreground font-bold hover:bg-muted hover:cursor-pointer rounded-xl">Sign in</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-transform font-bold px-6 rounded-xl hover:cursor-pointer shadow-xl">Join Now</Button>
                </Link>
              </div>
            )}

          </div>

          <Sheet>
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-border text-foreground">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
            </div>
            <SheetContent side="top" className="max-h-screen overflow-auto bg-background border-border">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white shadow-lg">
                       <Leaf className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                      KrishiBondhu
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline text-foreground">
                      Explore
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-2">
                        {features.map((feature, index) => (
                          <SheetClose asChild key={index}>
                            <Link
                              href={feature.href}
                              className="rounded-md p-3 transition-colors hover:bg-muted"
                            >
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-4 mb-8">
                  <SheetClose asChild>
                    <Link href="/equipment" className="text-lg font-medium text-foreground hover:text-green-600 transition-colors">
                      Marketplace
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/providers" className="text-lg font-medium text-foreground hover:text-green-600 transition-colors">
                      Providers
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/services" className="text-lg font-medium text-foreground hover:text-green-600 transition-colors">
                      Services
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/contact" className="text-lg font-medium text-foreground hover:text-green-600 transition-colors">
                      Contact
                    </Link>
                  </SheetClose>
                </div>
                
                <div className="flex flex-col gap-4 pt-4 border-t border-border">
                  {user ? (
                    <>
                      <SheetClose asChild>
                        <Link href={user.role === "PROVIDER" ? "/dashboard/provider/add-equipment" : "/dashboard/farmer/bookings"}>
                          <Button className="w-full justify-start gap-3 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20">
                            <PlusCircle className="w-5 h-5" />
                            {user.role === "PROVIDER" ? "List Equipment" : "My Bookings"}
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href={`/dashboard/${user.role?.toLowerCase()}`}>
                          <Button className="w-full justify-start gap-3 bg-muted hover:bg-muted/80 text-foreground border border-border">
                            <LayoutDashboard className="w-5 h-5" />
                            Dashboard
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button 
                          onClick={handleLogout}
                          variant="outline" 
                          className="w-full justify-start gap-3 border-red-500/30 text-red-500 hover:bg-red-500/10"
                        >
                          <LogOut className="w-5 h-5" />
                          Logout
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Link href="/login">
                          <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted hover:cursor-pointer">Sign in</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/register">
                          <Button className="bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer w-full">Join Now</Button>
                        </Link>
                      </SheetClose>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
