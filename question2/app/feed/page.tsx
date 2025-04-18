"use client"

import { useState, useEffect, useRef } from "react"
import { fetchPosts } from "@/lib/api"
import PostCard from "@/components/PostCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import { RefreshCw } from "lucide-react"

interface Post {
  id: number
  userid: string
  userName: string
  content: string
  commentCount?: number
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  async function loadLatestPosts(showRefreshing = false) {
    try {
      if (showRefreshing) setRefreshing(true)
      else setLoading(true)

      const data = await fetchPosts("latest")
      setPosts(data.posts)
      setError(null)
    } catch (err) {
      setError("Failed to load latest posts. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadLatestPosts()

    refreshTimerRef.current = setInterval(() => {
      loadLatestPosts(true)
    }, 30000)

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current)
      }
    }
  }, [])

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Latest Feed</h1>
          <p className="text-gray-600">Real-time updates of the newest posts</p>
        </div>
        <button
          onClick={() => loadLatestPosts(true)}
          disabled={refreshing}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No posts found</div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              userid={post.userid}
              userName={post.userName}
              content={post.content}
              commentCount={post.commentCount || 0}
            />
          ))}
        </div>
      )}
    </div>
  )
}
