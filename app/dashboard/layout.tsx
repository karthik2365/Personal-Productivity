"use client";

import { ProductivitySidebar } from "@/components/productivity-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-black text-[rgb(37,99,235)]">
        <ProductivitySidebar />
        <SidebarInset className="flex flex-col flex-1 w-full">
          <main className="flex-1 w-full p-6">{children}</main> {/* Ensure full width */}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}