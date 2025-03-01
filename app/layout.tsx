// "use client"; // Ensure this file is a Client Component

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider } from "convex/react";
import type { Metadata } from "next";
import { League_Spartan, Silkscreen } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "sonner";
// import { Toaster } from "@/components/ui/toaster"
export const silkScreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en" suppressHydrationWarning>
          <body className="antialiased">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {/* <Navbar /> Ensure Navbar is inside ClerkProvider */}
              {children}
              <Toaster/>
            </ThemeProvider>
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
