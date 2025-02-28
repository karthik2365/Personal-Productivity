import ForumHeader from "@/components/forum-header"
import PostForm from "@/components/post-form"
import PostList from "@/components/post-list"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e8f4e5] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <ForumHeader />
        <div className="space-y-6">
          <PostForm />
          <PostList />
        </div>
      </div>
    </main>
  )
}
