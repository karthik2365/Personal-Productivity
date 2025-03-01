"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { useConvexAuth } from "convex/react"
import { Spinner } from "@/components/spinner"

export function Workspace() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/documents")
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <div className="max-w-3xl space-y-4 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">Welcome to your workspace</h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
          Notion-like editor with real-time collaboration
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <Button onClick={() => router.push("/sign-in")}>Get Started</Button>
        </div>
      </div>
    </div>
  )
}
