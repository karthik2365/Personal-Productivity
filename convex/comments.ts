
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const create = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
    author: v.string(),
    authorInitial: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("comments", {
      postId: args.postId,
      content: args.content,
      author: args.author,
      authorInitial: args.authorInitial,
    })
  },
})

export const listByPost = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .collect()
  },
})
