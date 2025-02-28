"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import PostCard from "./post-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PostList() {
  const posts = useQuery(api.posts.list)

  if (posts === undefined) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

