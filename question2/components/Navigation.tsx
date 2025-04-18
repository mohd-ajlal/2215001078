"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, TrendingUp, Activity } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { name: "Top Users", href: "/", icon: <BarChart2 className="h-5 w-5" /> },
    { name: "Trending Posts", href: "/trending", icon: <TrendingUp className="h-5 w-5" /> },
    { name: "Feed", href: "/feed", icon: <Activity className="h-5 w-5" /> },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-blue-600">SocialAnalytics</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="grid grid-cols-3 text-xs">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-3 ${
                pathname === item.href ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
