import Image from "next/image"
import { MessageCircle, Heart, Share2 } from "lucide-react"
import { getRandomAvatar, getRandomPostImage } from "@/lib/utils"

interface PostCardProps {
  id: number
  userid: string | number
  userName: string
  content: string
  commentCount?: number
  trending?: boolean
}

export default function PostCard({ id, userid, userName, content, commentCount = 0, trending = false }: PostCardProps) {
  const likes = Math.floor(Math.random() * 100) + commentCount * 2
  const shares = Math.floor(Math.random() * 20)

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${trending ? "border-2 border-blue-500" : ""}`}>
      {trending && <div className="bg-blue-600 text-white text-xs font-bold px-4 py-1">TRENDING</div>}
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={getRandomAvatar(userid) || "/placeholder.svg"}
              alt={userName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{userName}</h3>
            <p className="text-xs text-gray-500">{new Date(id * 1000).toLocaleDateString()}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-3">{content}</p>

        <div className="rounded-lg overflow-hidden mb-3 bg-gray-200">
          <Image
            src={getRandomPostImage(id) || "/placeholder.svg"}
            alt="Post image"
            width={800}
            height={600}
            className="w-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{commentCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Share2 className="h-4 w-4" />
            <span>{shares}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
