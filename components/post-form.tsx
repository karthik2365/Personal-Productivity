"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function PostForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const createPost = useMutation(api.posts.create)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    await createPost({ title, content })
    setTitle("")
    setContent("")
  }

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2c4a1f]">Start a Discussion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#e8f4e5] border-0"
          />
          <Textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] bg-[#e8f4e5] border-0"
          />
          <Button type="submit" className="w-full bg-[#6b9a5b] hover:bg-[#5a8249] text-white">
            Create Post
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
