// import { mutation, query } from "./_generated/server"
// import { v } from "convex/values"

// export const create = mutation({
//   args: {
//     title: v.string(),
//     content: v.string(),
//   },
//   handler: async (ctx, args) => {
//     // In a real app, get the user from auth
//     const author = "PALASH RUPANI"

//     return await ctx.db.insert("posts", {
//       title: args.title,
//       content: args.content,
//       author,
//       likes: 0,
//       dislikes: 0,
//     })
//   },
// })

// export const list = query({
//   handler: async (ctx) => {
//     return await ctx.db.query("posts").order("desc").collect()
//   },
// })

// export const like = mutation({
//   args: {
//     id: v.id("posts"),
//   },
//   handler: async (ctx, args) => {
//     const post = await ctx.db.get(args.id)
//     if (!post) throw new Error("Post not found")

//     return await ctx.db.patch(args.id, {
//       likes: post.likes + 1,
//     })
//   },
// })

// export const dislike = mutation({
//   args: {
//     id: v.id("posts"),
//   },
//   handler: async (ctx, args) => {
//     const post = await ctx.db.get(args.id)
//     if (!post) throw new Error("Post not found")

//     return await ctx.db.patch(args.id, {
//       dislikes: post.dislikes + 1,
//     })
//   },
// })

// export const remove = mutation({
//   args: {
//     id: v.id("posts"),
//   },
//   handler: async (ctx, args) => {
//     // In a real app, check if the user is the author
//     await ctx.db.delete(args.id)
//   },
// })

import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      author: args.author,
      likes: 0,
      dislikes: 0,
    })
  },
})

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("posts").order("desc").collect()
  },
})

export const like = mutation({
  args: {
    id: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id)
    if (!post) throw new Error("Post not found")

    return await ctx.db.patch(args.id, {
      likes: post.likes + 1,
    })
  },
})

export const dislike = mutation({
  args: {
    id: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id)
    if (!post) throw new Error("Post not found")

    return await ctx.db.patch(args.id, {
      dislikes: post.dislikes + 1,
    })
  },
})

export const remove = mutation({
  args: {
    id: v.id("posts"),
  },
  handler: async (ctx, args) => {
    // In a real app, check if the user is the author
    await ctx.db.delete(args.id)
  },
})



