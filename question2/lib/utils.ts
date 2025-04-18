import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function getRandomAvatar(userId: string | number): string {
  const styles = [
    "adventurer",
    "adventurer-neutral",
    "avataaars",
    "big-ears",
    "big-smile",
    "bottts",
    "croodles",
    "fun-emoji",
    "icons",
    "identicon",
    "initials",
    "lorelei",
    "micah",
    "miniavs",
    "open-peeps",
    "personas",
    "pixel-art",
    "shapes",
  ]
  const style = styles[Math.floor(Math.random() * styles.length)]
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${userId}`
}

export function getRandomPostImage(postId: number): string {
  return `https://source.unsplash.com/random/800x600?sig=${postId}`
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return `${seconds}s ago`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
