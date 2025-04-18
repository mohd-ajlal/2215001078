"use client"

import { useState, useEffect } from "react"
import { fetchPosts } from "@/lib/api"
import PostCard from "@/components/PostCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import { TrendingUp } from "lucide-react"

interface Post {
  id: number
  userid: string
  userName: string
  content: string
  commentCount: number
}

export default function TrendingPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTrendingPosts() {
      try {
        setLoading(true)
        const data = await fetchPosts("popular")
        setPosts(data.posts)
      } catch (err) {
        setError("Failed to load trending posts. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadTrendingPosts()
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
          Trending Posts
        </h1>
        <p className="text-gray-600">Posts with the most comments</p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No trending posts found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              userid={post.userid}
              userName={post.userName}
              content={post.content}
              commentCount={post.commentCount}
              trending={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}
