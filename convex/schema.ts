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
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),

}
);
