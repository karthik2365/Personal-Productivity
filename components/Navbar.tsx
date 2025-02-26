import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { MessageCircleIcon } from 'lucide-react'
import AIAssistant from '@/app/chat/page'

function navbar() {
  return (
    <nav className="bg-primary text-secondary px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Prodo
      </Link>

      <div className="flex items-center gap-8">
        <ModeToggle/>

        <Link href="/chat">
          <MessageCircleIcon />
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

export default navbar