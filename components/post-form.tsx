// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
// import { useMutation } from "convex/react"
// import { api } from "@/convex/_generated/api"

// export default function PostForm() {
//   const [title, setTitle] = useState("")
//   const [content, setContent] = useState("")
//   const createPost = useMutation(api.posts.create)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!title.trim() || !content.trim()) return

//     await createPost({ title, content })
//     setTitle("")
//     setContent("")
//   }

//   return (
//     <Card className="bg-white border-0 shadow-sm">
//       <CardContent className="p-6">
//         <h2 className="text-xl font-semibold mb-4 text-[#2c4a1f]">Start a Discussion</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input
//             placeholder="Post title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="bg-[#e8f4e5] border-0"
//           />
//           <Textarea
//             placeholder="Share your thoughts..."
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="min-h-[120px] bg-[#e8f4e5] border-0"
//           />
//           <Button type="submit" className="w-full bg-[#6b9a5b] hover:bg-[#5a8249] text-white">
//             Create Post
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function PostForm() {
  const [mounted, setMounted] = useState(false); // ✅ Prevent SSR mismatch
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const createPost = useMutation(api.posts.create);

  useEffect(() => {
    setMounted(true); // ✅ Ensure component renders only on the client
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2c4a1f]">Start a Discussion</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!title.trim() || !content.trim() || !author.trim()) return;
            await createPost({ title, content, author });
            setTitle("");
            setContent("");
          }}
          className="space-y-4"
        >
<div className="space-y-2">
  <Label htmlFor="author" className="text-black">Your Name</Label>
  <Input
    id="author"
    placeholder="Enter your name"
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
    className="bg-[#e8f4e5] border-0 text-black"
    required
  />
</div>

<div className="space-y-2">
  <Label htmlFor="title" className="text-black">Title</Label>
  <Input
    id="title"
    placeholder="Post title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="bg-[#e8f4e5] border-0 text-black"
    required
  />
</div>
<div className="space-y-2">
  <Label htmlFor="content" className="text-black">Content</Label>
  <Textarea
    id="content"
    placeholder="Share your thoughts..."
    value={content}
    onChange={(e) => setContent(e.target.value)}
    className="min-h-[120px] bg-[#e8f4e5] border-0 text-black"
    required
  />
</div>

          <Button type="submit" className="w-full bg-[#6b9a5b] hover:bg-[#5a8249] text-white">
            Create Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
