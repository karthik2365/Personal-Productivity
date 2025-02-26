"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import ChatUI from "@/components/assistant";

export default function Navbar() {
  return (
    <nav className="bg-primary text-secondary px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Prodo
      </Link>

      <div className="flex items-center gap-4">
        <ModeToggle/>

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* <ChatUI/> */}
      </div>
    </nav>
  );
}
