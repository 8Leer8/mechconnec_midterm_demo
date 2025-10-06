"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"

interface NavLink {
  href: string
  label: string
  icon: LucideIcon
}

interface SidebarNavProps {
  links: NavLink[]
  onLinkClick?: () => void
}

const SidebarNav = React.memo(({ links, onLinkClick }: SidebarNavProps) => {
  const pathname = usePathname()

  return (
    <div className="p-4 space-y-1 overflow-y-auto h-full">
      {links.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground hover:bg-accent hover:shadow-sm"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{link.label}</span>
          </Link>
        )
      })}
    </div>
  )
})

SidebarNav.displayName = "SidebarNav"

export { SidebarNav }