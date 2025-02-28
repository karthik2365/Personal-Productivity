import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { LayoutDashboard } from 'lucide-react'
import { silkScreen } from '@/app/layout'

function Navbar() {
  return (
    <div className='h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-green-500 flex justify-between items-center'>
      <Link href="/" className={`${silkScreen.className} text-4xl font-bold text-black dark:text-white`}>
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
    </div>
  );
}

export default Navbar;
