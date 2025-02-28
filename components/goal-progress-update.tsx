"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type GoalProgressUpdateProps = {
  goalId: string
  currentProgress: number
  target: number
  onClose: () => void
}

export function GoalProgressUpdate({ goalId, currentProgress, target, onClose }: GoalProgressUpdateProps) {
  const [progressValue, setProgressValue] = useState(1)
  const [note, setNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProgress = useMutation(api.goals.updateGoalProgress)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (progressValue <= 0) {
      setError("Progress value must be greater than 0")
      return
    }

    if (currentProgress + progressValue > target) {
      setError(`This would exceed your target of ${target}`)
      return
    }

    setIsSubmitting(true)

    try {
      await updateProgress({
        id: goalId as Id<"goals">,
        progressValue,
        note,
      })

      onClose()
    } catch (error) {
      console.error("Error updating progress:", error)
      setError("Failed to update progress. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-4 p-4 border rounded-md bg-muted/50">
      <h3 className="text-sm font-medium mb-3">Update Progress</h3>

      {error && (
        <Alert variant="destructive" className="mb-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="progress-value">Progress Value</Label>
          <Input
            id="progress-value"
            type="number"
            min="1"
            max={target - currentProgress}
            value={progressValue}
            onChange={(e) => setProgressValue(Number.parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Current: {currentProgress} / {target}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="progress-note">Note (Optional)</Label>
          <Textarea
            id="progress-note"
            placeholder="Add details about this progress update"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="resize-none"
            rows={2}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Save Update"}
          </Button>
        </div>
      </form>
    </div>
  )
}

