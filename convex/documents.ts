import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect()

    return documents
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    })

    return document
  },
})

export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject

    const existingDocument = await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error("Document not found")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Not authorized")
    }

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    })

    return document
  },
})

export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    const document = await ctx.db.get(args.documentId)

    if (!document) {
      throw new Error("Document not found")
    }

    if (document.isPublished && !document.isArchived) {
      return document
    }

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject

    if (document.userId !== userId) {
      throw new Error("Not authorized")
    }

    return document
  },
})

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject

    const { id, ...rest } = args

    const existingDocument = await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error("Document not found")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Not authorized")
    }

    const document = await ctx.db.patch(args.id, {
      ...rest,
    })

    return document
  },
})

