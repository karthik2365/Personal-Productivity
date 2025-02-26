import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { LayoutDashboard } from 'lucide-react'

function Navbar() {
  return (
    <nav className="bg-secondary text-primary px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Prodo
      </Link>

      <div className="flex items-center gap-6">
        <ModeToggle />

        <Link href="/dashboard" className="flex items-center gap-2 text-primary bg-secondary px-4 py-2 rounded-lg hover:bg-accent-dark transition">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar
