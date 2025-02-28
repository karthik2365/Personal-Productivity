import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const createGoal = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    timeframe: v.union(v.literal("day"), v.literal("month")),
    target: v.number(),
    status: v.union(v.literal("not_started"), v.literal("in_progress"), v.literal("completed")),
  },
  handler: async (ctx, args) => {
    const goalId = await ctx.db.insert("goals", {
      title: args.title,
      description: args.description,
      timeframe: args.timeframe,
      target: args.target,
      progress: 0,
      status: args.status,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      progressUpdates: [],
    })

    return goalId
  },
})

export const updateGoal = mutation({
  args: {
    id: v.id("goals"),
    title: v.string(),
    description: v.string(),
    timeframe: v.union(v.literal("day"), v.literal("month")),
    target: v.number(),
    status: v.union(v.literal("not_started"), v.literal("in_progress"), v.literal("completed")),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    })

    return id
  },
})

export const updateGoalStatus = mutation({
  args: {
    id: v.id("goals"),
    status: v.union(v.literal("not_started"), v.literal("in_progress"), v.literal("completed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    })

    return args.id
  },
})

export const updateGoalProgress = mutation({
  args: {
    id: v.id("goals"),
    progressValue: v.number(),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    const goal = await ctx.db.get(args.id)

    if (!goal) {
      throw new Error("Goal not found")
    }

    const newProgress = goal.progress + args.progressValue

    // Don't allow progress to exceed target
    if (newProgress > goal.target) {
      throw new Error("Progress cannot exceed target")
    }

    const newUpdate = {
      value: args.progressValue,
      note: args.note,
      timestamp: Date.now(),
    }

    // Update the goal with new progress value and add to progress updates
    await ctx.db.patch(args.id, {
      progress: newProgress,
      progressUpdates: [...(goal.progressUpdates || []), newUpdate],
      updatedAt: Date.now(),
      // If we've reached the target, mark as completed
      ...(newProgress >= goal.target ? { status: "completed" } : {}),
    })

    return args.id
  },
})

export const deleteGoal = mutation({
  args: {
    id: v.id("goals"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
    return args.id
  },
})

export const getDailyGoals = query({
  handler: async (ctx) => {
    const goals = await ctx.db
      .query("goals")
      .filter((q) => q.eq(q.field("timeframe"), "day"))
      .order("desc")
      .collect()

    return goals
  },
})

export const getMonthlyGoals = query({
  handler: async (ctx) => {
    const goals = await ctx.db
      .query("goals")
      .filter((q) => q.eq(q.field("timeframe"), "month"))
      .order("desc")
      .collect()

    return goals
  },
})

export const getGoalById = query({
  args: {
    id: v.id("goals"),
  },
  handler: async (ctx, args) => {
    const goal = await ctx.db.get(args.id)
    return goal
  },
})

