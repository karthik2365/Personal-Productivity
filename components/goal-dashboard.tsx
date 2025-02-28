"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoalList } from "@/components/goal-list"
import { GoalForm } from "@/components/goal-form"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function GoalDashboard() {
  const [isCreating, setIsCreating] = useState(false)
  const [timeframe, setTimeframe] = useState<"day" | "month">("day")
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)

  const dailyGoals = useQuery(api.goals.getDailyGoals) || []
  const monthlyGoals = useQuery(api.goals.getMonthlyGoals) || []

  const deleteGoal = useMutation(api.goals.deleteGoal)

  const handleDeleteGoal = async (goalId: string) => {
    await deleteGoal({ id: goalId })
    setSelectedGoalId(null)
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Goal Tracker</h1>
        <p className="text-muted-foreground">Track your daily and monthly goals, log progress, and stay on target.</p>
      </div>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="day" className="w-full" onValueChange={(value) => setTimeframe(value as "day" | "month")}>
          <TabsList>
            <TabsTrigger value="day">Daily Goals</TabsTrigger>
            <TabsTrigger value="month">Monthly Goals</TabsTrigger>
          </TabsList>

          <div className="flex justify-end my-4">
            <Button
              onClick={() => {
                setIsCreating(true)
                setSelectedGoalId(null)
              }}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Goal
            </Button>
          </div>

          <TabsContent value="day" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <GoalList
                  goals={dailyGoals}
                  onSelect={(id) => {
                    setSelectedGoalId(id)
                    setIsCreating(false)
                  }}
                  onDelete={handleDeleteGoal}
                  timeframe="day"
                />
              </div>
              <div className="md:col-span-1">
                <GoalForm
                  isCreating={isCreating}
                  selectedGoalId={selectedGoalId}
                  timeframe={timeframe}
                  onCancel={() => {
                    setIsCreating(false)
                    setSelectedGoalId(null)
                  }}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="month" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <GoalList
                  goals={monthlyGoals}
                  onSelect={(id) => {
                    setSelectedGoalId(id)
                    setIsCreating(false)
                  }}
                  onDelete={handleDeleteGoal}
                  timeframe="month"
                />
              </div>
              <div className="md:col-span-1">
                <GoalForm
                  isCreating={isCreating}
                  selectedGoalId={selectedGoalId}
                  timeframe={timeframe}
                  onCancel={() => {
                    setIsCreating(false)
                    setSelectedGoalId(null)
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

