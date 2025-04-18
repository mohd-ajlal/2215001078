import Image from "next/image"
import { getRandomAvatar } from "@/lib/utils"

interface UserCardProps {
  id: string
  name: string
  totalComments: number
  postCount: number
  rank: number
}

export default function UserCard({ id, name, totalComments, postCount, rank }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="p-4 flex items-center space-x-4">
        <div className="relative flex-shrink-0">
          <div className="absolute -top-1 -left-1 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {rank}
          </div>
          <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={getRandomAvatar(id) || "/placeholder.svg"}
              alt={name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <span className="font-medium text-blue-600">{postCount}</span>
              <span className="ml-1">posts</span>
            </span>
            <span className="flex items-center">
              <span className="font-medium text-blue-600">{totalComments}</span>
              <span className="ml-1">comments</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
