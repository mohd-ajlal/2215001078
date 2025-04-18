const API_BASE_URL = "http://localhost:8000"

export async function fetchTopUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) throw new Error("Failed to fetch top users")
    return response.json()
  } catch (error) {
    console.error("Error fetching top users:", error)
    throw error
  }
}

export async function fetchPosts(type: "popular" | "latest") {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?type=${type}`)
    if (!response.ok) throw new Error(`Failed to fetch ${type} posts`)
    return response.json()
  } catch (error) {
    console.error(`Error fetching ${type} posts:`, error)
    throw error
  }
}
