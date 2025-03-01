import { Loader } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpinnerProps {
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
}

export function Spinner({ className, size = "default" }: SpinnerProps) {
  return (
    <Loader
      className={cn(
        "animate-spin text-muted-foreground",
        size === "default" && "h-6 w-6",
        size === "sm" && "h-4 w-4",
        size === "lg" && "h-8 w-8",
        size === "icon" && "h-10 w-10",
        className,
      )}
    />
  )
}

