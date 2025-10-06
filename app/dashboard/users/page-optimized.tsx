"use client"

import React, { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, UserPlus, Eye } from "lucide-react"
import { shopOwners, users } from "@/data/mockData"

// Memoized components
const PageHeader = React.memo(() => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
      <p className="text-muted-foreground mt-2">Manage shop owners and platform users</p>
    </div>
    <Button className="bg-primary hover:bg-primary/90">
      <UserPlus className="w-4 h-4 mr-2" />
      Add User
    </Button>
  </div>
))

PageHeader.displayName = "PageHeader"

const SearchBar = React.memo(({ value, onChange, placeholder }: {
  value: string
  onChange: (value: string) => void
  placeholder: string
}) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
    />
  </div>
))

SearchBar.displayName = "SearchBar"

const ShopOwnerCard = React.memo(({ owner, onViewShop }: {
  owner: typeof shopOwners[0]
  onViewShop: (owner: typeof shopOwners[0]) => void
}) => (
  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{owner.name}</h3>
          <p className="text-primary font-medium">{owner.shopName}</p>
          <p className="text-sm text-muted-foreground">{owner.email}</p>
          <p className="text-sm text-muted-foreground">{owner.contact}</p>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            owner.status === "Active" 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}>
            {owner.status}
          </span>
          <p className="text-sm text-muted-foreground mt-2">{owner.mechanicsCount} mechanics</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onViewShop(owner)}
        className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
      >
        <Eye className="w-4 h-4 mr-2" />
        View Shop Details
      </Button>
    </CardContent>
  </Card>
))

ShopOwnerCard.displayName = "ShopOwnerCard"

const UserCard = React.memo(({ user }: { user: typeof users[0] }) => (
  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          user.status === "Active" 
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        }`}>
          {user.status}
        </span>
      </div>
    </CardContent>
  </Card>
))

UserCard.displayName = "UserCard"

export default function UsersPage() {
  const [selectedShop, setSelectedShop] = useState<typeof shopOwners[0] | null>(null)
  const [searchOwners, setSearchOwners] = useState("")
  const [searchUsers, setSearchUsers] = useState("")

  // Memoized filtered data
  const filteredOwners = useMemo(() => 
    shopOwners.filter(owner =>
      owner.name.toLowerCase().includes(searchOwners.toLowerCase()) ||
      owner.shopName.toLowerCase().includes(searchOwners.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchOwners.toLowerCase())
    ), [searchOwners]
  )

  const filteredUsers = useMemo(() =>
    users.filter(user =>
      user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUsers.toLowerCase())
    ), [searchUsers]
  )

  const handleViewShop = useCallback((owner: typeof shopOwners[0]) => {
    setSelectedShop(owner)
  }, [])

  return (
    <div className="space-y-8 transition-all duration-300">
      <PageHeader />

      {/* Shop Owners Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Shop Owners</h2>
          <div className="w-80">
            <SearchBar
              value={searchOwners}
              onChange={setSearchOwners}
              placeholder="Search shop owners..."
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOwners.map((owner) => (
            <ShopOwnerCard
              key={owner.id}
              owner={owner}
              onViewShop={handleViewShop}
            />
          ))}
        </div>
      </div>

      {/* Platform Users Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Platform Users</h2>
          <div className="w-80">
            <SearchBar
              value={searchUsers}
              onChange={setSearchUsers}
              placeholder="Search users..."
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>

      {/* Shop Details Modal */}
      <Dialog open={!!selectedShop} onOpenChange={() => setSelectedShop(null)}>
        <DialogContent className="max-w-2xl transition-all duration-300">
          <DialogHeader>
            <DialogTitle>{selectedShop?.shop.name} - Shop Details</DialogTitle>
          </DialogHeader>
          {selectedShop && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-muted-foreground">Owner</h4>
                  <p>{selectedShop.name}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Rating</h4>
                  <p className="text-yellow-600">★ {selectedShop.shop.rating}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Address</h4>
                  <p>{selectedShop.shop.address}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Contact</h4>
                  <p>{selectedShop.contact}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-muted-foreground mb-2">Mechanics</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedShop.shop.mechanics.map((mechanic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {mechanic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}