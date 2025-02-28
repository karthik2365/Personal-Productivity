import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

posts: defineTable({
    title: v.string(),
    content: v.string(),
    author: v.string(),
    likes: v.number(),
    dislikes: v.number(),
  }),
  comments: defineTable({
    postId: v.id("posts"),
    content: v.string(),
    author: v.string(),
    authorInitial: v.string(),
  }),
  goals: defineTable({
    title: v.string(),
    description: v.string(),
    timeframe: v.union(v.literal("day"), v.literal("month")),
    target: v.number(),
    progress: v.number(),
    status: v.union(v.literal("not_started"), v.literal("in_progress"), v.literal("completed")),
    createdAt: v.number(),
    updatedAt: v.number(),
    progressUpdates: v.array(
      v.object({
        value: v.number(),
        note: v.string(),
        timestamp: v.number(),
      }),
    ),
  }),

}
);
