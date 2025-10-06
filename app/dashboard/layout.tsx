"use client"

import type React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { TopNavbar } from "@/components/dashboard/TopNavbar"
import { SidebarNav } from "@/components/dashboard/SidebarNav"
import {
  LayoutDashboard,
  Users,
  Store,
  Coins,
  AlertCircle,
  FileText,
  UserCog,
  DollarSign,
  Settings,
  BarChart3,
  Wallet,
} from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem("role")
    if (!userRole) {
      router.push("/")
    } else {
      setRole(userRole)
    }

    // Check for dark mode preference
    const isDark = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }

    // Prefetch dashboard routes for faster navigation
    router.prefetch("/dashboard/users")
    router.prefetch("/dashboard/shops")
    router.prefetch("/dashboard/tokens")
    router.prefetch("/dashboard/reports")
  }, [router])

  // Memoize navigation links to prevent re-creation
  const adminLinks = useMemo(() => [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/users", label: "Users", icon: Users },
    { href: "/dashboard/verifications", label: "Verifications", icon: UserCog },
    { href: "/dashboard/shops", label: "Shops", icon: Store },
    { href: "/dashboard/tokens", label: "Tokens", icon: Coins },
    { href: "/dashboard/disputes", label: "Disputes", icon: AlertCircle },
    { href: "/dashboard/reports", label: "Reports", icon: FileText },
    { href: "/dashboard/financial", label: "Financial & Commission", icon: Wallet },
  ], [])

  const headAdminLinks = useMemo(() => [
    ...adminLinks,
    { href: "/dashboard/accounts", label: "Account Management", icon: UserCog },
    { href: "/dashboard/pricing", label: "Token Pricing", icon: DollarSign },
    { href: "/dashboard/settings", label: "Platform Settings", icon: Settings },
    { href: "/dashboard/global-reports", label: "Global Reports", icon: BarChart3 },
  ], [adminLinks])

  const links = useMemo(() => 
    role === "headadmin" ? headAdminLinks : adminLinks, 
    [role, headAdminLinks, adminLinks]
  )

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
        role={role}
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
        <SidebarNav links={links} onLinkClick={closeSidebar} />
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