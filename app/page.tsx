"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Prefetch admin on component mount for faster transitions
  useEffect(() => {
    router.prefetch("/admin")
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Simple demo authentication
    if ((username === "admin" || username === "headadmin") && password === "1234") {
      localStorage.setItem("role", username)
      
      router.prefetch("/admin")
      router.push("/admin")
    } else if (username === "shopowner" && password === "1234") {
      localStorage.setItem("role", "shopowner")
      
      router.prefetch("/client/shopowners")
      router.push("/client/shopowners")
    } else {
      setError("Invalid credentials. Try admin/1234, headadmin/1234, or shopowner/1234")
    }
  }

  const handleViewDashboard = async () => {
    router.prefetch("/admin")
    router.push("/admin")
  }

  const handleViewShopOwnerDashboard = async () => {
    router.prefetch("/client/shopowners")
    router.push("/client/shopowners")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">MC</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">MechConnect</CardTitle>
          <CardDescription className="text-base">Sign in to your admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>
            {error && <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">{error}</div>}
            <Button type="submit" className="w-full h-11 text-base font-medium">
              Sign In
            </Button>
            <div className="flex gap-2 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={handleViewDashboard}
              >
                Admin Demo
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={handleViewShopOwnerDashboard}
              >
                Shop Owner Demo
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-4">Demo: admin/1234, headadmin/1234, or shopowner/1234</p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
