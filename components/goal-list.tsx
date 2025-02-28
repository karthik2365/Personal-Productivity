"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CheckCircle2, Circle, Clock, Edit, MoreVertical, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { GoalProgressUpdate } from "./goal-progress-update"

type Goal = {
  _id: string
  title: string
  description: string
  timeframe: "day" | "month"
  target: number
  progress: number
  status: "not_started" | "in_progress" | "completed"
  createdAt: number
  updatedAt: number
  progressUpdates: {
    value: number
    note: string
    timestamp: number
  }[]
}

type GoalListProps = {
  goals: Goal[]
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  timeframe: "day" | "month"
}

export function GoalList({ goals, onSelect, onDelete, timeframe }: GoalListProps) {
  const [showProgressUpdate, setShowProgressUpdate] = useState<string | null>(null)

  const updateGoalStatus = useMutation(api.goals.updateGoalStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "not_started":
        return <Circle className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not_started":
        return "bg-slate-200 text-slate-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-slate-200 text-slate-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "not_started":
        return "Not Started"
      case "in_progress":
        return "In Progress"
      case "completed":
        return "Completed"
      default:
        return "Unknown"
    }
  }

  const handleStatusChange = async (goalId: string, newStatus: "not_started" | "in_progress" | "completed") => {
    await updateGoalStatus({ id: goalId, status: newStatus })
  }

  if (goals.length === 0) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">
            No {timeframe === "day" ? "daily" : "monthly"} goals yet. Create one to get started!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <Card key={goal._id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{goal.title}</CardTitle>
                <CardDescription className="mt-1">
                  {formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(goal.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(goal.status)}
                    {getStatusText(goal.status)}
                  </span>
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onSelect(goal._id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowProgressUpdate(goal._id)}>
                      <Clock className="h-4 w-4 mr-2" />
                      Update Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(goal._id, "not_started")}
                      disabled={goal.status === "not_started"}
                    >
                      <Circle className="h-4 w-4 mr-2" />
                      Mark Not Started
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(goal._id, "in_progress")}
                      disabled={goal.status === "in_progress"}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Mark In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(goal._id, "completed")}
                      disabled={goal.status === "completed"}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDelete(goal._id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {goal.progress} / {goal.target}
                </span>
              </div>
              <Progress value={(goal.progress / goal.target) * 100} />
            </div>

            {showProgressUpdate === goal._id && (
              <GoalProgressUpdate
                goalId={goal._id}
                currentProgress={goal.progress}
                target={goal.target}
                onClose={() => setShowProgressUpdate(null)}
              />
            )}

            {goal.progressUpdates && goal.progressUpdates.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Recent Updates</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {goal.progressUpdates.slice(0, 3).map((update, index) => (
                    <div key={index} className="text-xs p-2 bg-muted rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">+{update.value}</span>
                        <span className="text-muted-foreground">
                          {formatDistanceToNow(new Date(update.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      {update.note && <p className="mt-1">{update.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <div className="flex justify-between items-center w-full">
              <Button variant="ghost" size="sm" onClick={() => onSelect(goal._id)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowProgressUpdate(goal._id)}>
                Update Progress
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

