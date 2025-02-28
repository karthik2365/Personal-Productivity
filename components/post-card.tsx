"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, MessageSquare, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc } from "@/convex/_generated/dataModel"

interface PostCardProps {
  post: Doc<"posts">
}

export default function PostCard({ post }: PostCardProps) {
  const [comment, setComment] = useState("")
  const comments = useQuery(api.comments.listByPost, { postId: post._id })
  const createComment = useMutation(api.comments.create)
  const addLike = useMutation(api.posts.like)
  const addDislike = useMutation(api.posts.dislike)
  const deletePost = useMutation(api.posts.remove)

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    await createComment({
      postId: post._id,
      content: comment,
      author: "Current User", // In a real app, get from auth
      authorInitial: "C",
    })
    setComment("")
  }

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const handleDelete = async () => {
    await deletePost({ id: post._id })
  }

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="bg-purple-500 h-10 w-10">
            <AvatarFallback>{getInitial(post.author)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{post.author}</div>
            <div className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post._creationTime), { addSuffix: true })}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto text-gray-500" onClick={handleDelete}>
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-700 mb-4">{post.content}</p>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-green-600"
            onClick={() => addLike({ id: post._id })}
          >
            <ThumbsUp className="h-4 w-4" /> {post.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-red-600"
            onClick={() => addDislike({ id: post._id })}
          >
            <ThumbsDown className="h-4 w-4" /> {post.dislikes}
          </Button>
          <div className="flex items-center gap-1 text-gray-600">
            <MessageSquare className="h-4 w-4" /> {comments?.length || 0}
          </div>
        </div>
      </CardContent>

      {comments && comments.length > 0 && (
        <div className="px-6 pb-2">
          <h4 className="font-semibold mb-2">Comments</h4>
          <div className="space-y-3 pl-4 border-l-2 border-gray-200">
            {comments.map((comment) => (
              <div key={comment._id} className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="bg-purple-500 h-6 w-6">
                    <AvatarFallback>{getInitial(comment.author)}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-sm">{comment.author}</span>
                </div>
                <p className="text-gray-700 text-sm pl-8">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <CardFooter className="p-4">
        <form onSubmit={handleAddComment} className="w-full flex gap-2">
          <Textarea
            placeholder="I wanna join too..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[40px] resize-none bg-[#e8f4e5] border-0"
          />
          <Button type="submit" className="bg-[#6b9a5b] hover:bg-[#5a8249] text-white">
            Comment
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}