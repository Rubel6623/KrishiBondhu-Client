import { DM_Sans, Fraunces, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import type { Metadata } from "next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-bangla",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KrishiBondhu — কৃষকের সাথে, উন্নতির পথে",
    template: "%s — KrishiBondhu",
  },
  description:
    "Bangladesh's #1 AgriTech Platform. Rent agricultural equipment, connect with trusted providers, and grow your farm with AI-powered insights.",
  keywords: ["agriculture", "Bangladesh", "equipment rental", "farming", "কৃষি"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${fraunces.variable} ${hindSiliguri.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// remake hero section with proper background color (remind theme provider)