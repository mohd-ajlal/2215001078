"use client"

import { useState, useEffect } from "react"
import { fetchTopUsers } from "@/lib/api"
import UserCard from "@/components/UserCard"
import LoadingSpinner from "@/components/LoadingSpinner"

interface User {
  id: string
  name: string
  totalComments: number
  postCount: number
}

export default function TopUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        const data = await fetchTopUsers()
        setUsers(data.topUsers)
      } catch (err) {
        setError("Failed to load top users. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Top Users</h1>
        <p className="text-gray-600">Users with the most commented posts</p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user, index) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              totalComments={user.totalComments}
              postCount={user.postCount}
              rank={index + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
