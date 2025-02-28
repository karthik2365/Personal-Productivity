"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(50, {
      message: "Title must not exceed 50 characters.",
    }),
  description: z
    .string()
    .max(500, {
      message: "Description must not exceed 500 characters.",
    })
    .optional(),
  timeframe: z.enum(["day", "month"]),
  target: z.coerce.number().positive({
    message: "Target must be a positive number.",
  }),
  status: z.enum(["not_started", "in_progress", "completed"]).default("not_started"),
})

type GoalFormProps = {
  isCreating: boolean
  selectedGoalId: string | null
  timeframe: "day" | "month"
  onCancel: () => void
}

export function GoalForm({ isCreating, selectedGoalId, timeframe, onCancel }: GoalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createGoal = useMutation(api.goals.createGoal)
  const updateGoal = useMutation(api.goals.updateGoal)
  const selectedGoal = useQuery(api.goals.getGoalById, selectedGoalId ? { id: selectedGoalId as Id<"goals"> } : "skip")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      timeframe: timeframe,
      target: 100,
      status: "not_started",
    },
  })

  useEffect(() => {
    // Reset form when switching between create and edit modes
    if (isCreating) {
      form.reset({
        title: "",
        description: "",
        timeframe: timeframe,
        target: 100,
        status: "not_started",
      })
    }
  }, [isCreating, timeframe, form])

  useEffect(() => {
    // Populate form when editing an existing goal
    if (selectedGoal && !isCreating) {
      form.reset({
        title: selectedGoal.title,
        description: selectedGoal.description || "",
        timeframe: selectedGoal.timeframe,
        target: selectedGoal.target,
        status: selectedGoal.status,
      })
    }
  }, [selectedGoal, isCreating, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      if (isCreating) {
        await createGoal({
          title: values.title,
          description: values.description || "",
          timeframe: values.timeframe,
          target: values.target,
          status: values.status,
        })
      } else if (selectedGoalId) {
        await updateGoal({
          id: selectedGoalId as Id<"goals">,
          title: values.title,
          description: values.description || "",
          timeframe: values.timeframe,
          target: values.target,
          status: values.status,
        })
      }

      onCancel()
      form.reset()
    } catch (error) {
      console.error("Error submitting goal:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isCreating && !selectedGoalId) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">Select a goal to edit or click "Add Goal" to create a new one.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isCreating ? "Create Goal" : "Edit Goal"}</CardTitle>
        <CardDescription>
          {isCreating ? "Set a new goal and track your progress" : "Update your existing goal details"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter goal title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your goal (optional)" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeframe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="day">Daily</SelectItem>
                        <SelectItem value="month">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormDescription>Set a numerical target</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="not_started">Not Started</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : isCreating ? "Create Goal" : "Update Goal"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

