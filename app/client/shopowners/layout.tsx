"use client"

import type React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { TopNavbar } from "@/components/dashboard/TopNavbar"
import { SidebarNav } from "@/components/dashboard/SidebarNav"
import {
  LayoutDashboard,
  Store,
  Users,
  BarChart3,
  Settings,
} from "lucide-react"

export default function ShopOwnerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // For now, we'll simulate shop owner role
    // In a real app, this would come from authentication
    setRole("shopowner")

    // Check for dark mode preference
    const isDark = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }

    // Prefetch shop owner routes for faster navigation
    router.prefetch("/client/shopowners/dashboard")
    router.prefetch("/client/shopowners/manage")
    router.prefetch("/client/shopowners/mechanics")
    router.prefetch("/client/shopowners/analytics")
    router.prefetch("/client/shopowners/settings")
  }, [router])

  // Memoize navigation links to prevent re-creation
  const shopOwnerLinks = useMemo(() => [
    { href: "/client/shopowners/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/client/shopowners/manage", label: "Manage Shop", icon: Store },
    { href: "/client/shopowners/mechanics", label: "Mechanics Management", icon: Users },
    { href: "/client/shopowners/analytics", label: "Revenue Analytics", icon: BarChart3 },
    { href: "/client/shopowners/settings", label: "Settings", icon: Settings },
  ], [])

  // Memoize callback functions to prevent re-renders
  const handleLogout = useCallback(() => {
    localStorage.removeItem("role")
    localStorage.removeItem("darkMode")
    router.push("/")
  }, [router])

  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen)
  }, [sidebarOpen])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  if (!role) return null

  return (
    <div className="min-h-screen bg-background transition-all duration-300">
      {/* Top Navigation */}
      <TopNavbar
        role="Shop Owner"
        sidebarOpen={sidebarOpen}
        darkMode={darkMode}
        onToggleSidebar={toggleSidebar}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-card border-r border-border transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Shop Owner Panel</h2>
          <p className="text-sm text-muted-foreground">AutoFix Pro</p>
        </div>
        <SidebarNav links={shopOwnerLinks} onLinkClick={closeSidebar} />
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300" 
          onClick={closeSidebar} 
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="p-6 lg:p-8 transition-all duration-300">
          {children}
        </div>
      </main>
    </div>
  )
}