"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, LogOut } from "lucide-react"

interface TopNavbarProps {
  role: string | null
  sidebarOpen: boolean
  darkMode: boolean
  onToggleSidebar: () => void
  onToggleDarkMode: () => void
  onLogout: () => void
}

const TopNavbar = React.memo(({
  role,
  sidebarOpen,
  darkMode,
  onToggleSidebar,
  onToggleDarkMode,
  onLogout
}: TopNavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden hover:bg-accent"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">MC</span>
            </div>
            <span className="font-semibold text-lg hidden sm:inline">MechConnect</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
            {role === "headadmin" ? "Head Admin" : role === "Shop Owner" ? "Shop Owner" : "Admin"}
          </span>
          <Button variant="ghost" size="icon" onClick={onToggleDarkMode} className="hover:bg-accent">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
})

TopNavbar.displayName = "TopNavbar"

export { TopNavbar }