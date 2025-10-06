"use client"

import React, { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Eye, Edit, Star, Clock, Award } from "lucide-react"
import { shopOwners, users, mechanics } from "@/data/mockData"

// Memoized components
const PageHeader = React.memo(() => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
      <p className="text-muted-foreground mt-2">Manage shop owners, clients, and mechanics</p>
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

const ShopOwnerCard = React.memo(({ owner, onViewShop, onEdit }: {
  owner: typeof shopOwners[0]
  onViewShop: (owner: typeof shopOwners[0]) => void
  onEdit: (owner: typeof shopOwners[0]) => void
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
          <Badge variant={owner.status === "Active" ? "default" : "destructive"}>
            {owner.status}
          </Badge>
          <p className="text-sm text-muted-foreground mt-2">{owner.mechanicsCount} mechanics</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewShop(owner)}
          className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(owner)}
          className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>
    </CardContent>
  </Card>
))

ShopOwnerCard.displayName = "ShopOwnerCard"

const ClientCard = React.memo(({ user, onEdit }: { 
  user: typeof users[0]
  onEdit: (user: typeof users[0]) => void 
}) => (
  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground">{user.contact}</p>
          <p className="text-xs text-muted-foreground mt-1">Joined: {user.joinedDate}</p>
        </div>
        <Badge variant={user.status === "Active" ? "default" : "destructive"}>
          {user.status}
        </Badge>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEdit(user)}
        className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
      >
        <Edit className="w-4 h-4 mr-2" />
        Edit Details
      </Button>
    </CardContent>
  </Card>
))

ClientCard.displayName = "ClientCard"

const MechanicCard = React.memo(({ mechanic, onEdit }: { 
  mechanic: typeof mechanics[0]
  onEdit: (mechanic: typeof mechanics[0]) => void 
}) => (
  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold">{mechanic.name}</h3>
          <p className="text-sm text-muted-foreground">{mechanic.email}</p>
          <p className="text-sm text-muted-foreground">{mechanic.contact}</p>
          <p className="text-sm text-primary font-medium">{mechanic.assignedShop}</p>
        </div>
        <div className="text-right">
          <Badge variant={mechanic.status === "Active" ? "default" : "destructive"}>
            {mechanic.status}
          </Badge>
          <div className="flex items-center mt-1">
            <Star className="w-3 h-3 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{mechanic.rating}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Award className="w-3 h-3 mr-2" />
          {mechanic.specialization}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-3 h-3 mr-2" />
          {mechanic.experience} • {mechanic.completedJobs} jobs
        </div>
        <div className="flex flex-wrap gap-1">
          {mechanic.certifications.slice(0, 2).map((cert, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {cert}
            </Badge>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEdit(mechanic)}
        className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
      >
        <Edit className="w-4 h-4 mr-2" />
        Edit Details
      </Button>
    </CardContent>
  </Card>
))

MechanicCard.displayName = "MechanicCard"

// Edit User Modal Component
const EditUserModal = React.memo(({ 
  user, 
  isOpen, 
  onClose, 
  onSave,
  userType 
}: {
  user: any
  isOpen: boolean
  onClose: () => void
  onSave: (updatedUser: any) => void
  userType: 'shopOwner' | 'client' | 'mechanic'
}) => {
  const [formData, setFormData] = useState(user || {})

  React.useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Edit {userType === 'shopOwner' ? 'Shop Owner' : userType === 'client' ? 'Client' : 'Mechanic'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                value={formData.contact || ''}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status || 'Active'} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {userType === 'shopOwner' && (
            <div>
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                value={formData.shopName || ''}
                onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                required
              />
            </div>
          )}

          {userType === 'mechanic' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization || ''}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience || ''}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="assignedShop">Assigned Shop</Label>
                <Input
                  id="assignedShop"
                  value={formData.assignedShop || ''}
                  onChange={(e) => setFormData({ ...formData, assignedShop: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
})

EditUserModal.displayName = "EditUserModal"

export default function UsersPage() {
  const [selectedShop, setSelectedShop] = useState<typeof shopOwners[0] | null>(null)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [editUserType, setEditUserType] = useState<'shopOwner' | 'client' | 'mechanic'>('client')
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("shopOwners")

  // Memoized filtered data
  const filteredOwners = useMemo(() => 
    shopOwners.filter(owner =>
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  )

  const filteredUsers = useMemo(() =>
    users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  )

  const filteredMechanics = useMemo(() =>
    mechanics.filter(mechanic =>
      mechanic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mechanic.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mechanic.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mechanic.assignedShop.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  )

  const handleViewShop = useCallback((owner: typeof shopOwners[0]) => {
    setSelectedShop(owner)
  }, [])

  const handleEditUser = useCallback((user: any, type: 'shopOwner' | 'client' | 'mechanic') => {
    setEditingUser(user)
    setEditUserType(type)
  }, [])

  const handleSaveUser = useCallback((updatedUser: any) => {
    // In a real app, you would update the data through an API
    console.log('Saving user:', updatedUser)
    // You can implement the actual save logic here
  }, [])

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'shopOwners': return 'Search shop owners...'
      case 'clients': return 'Search clients...'
      case 'mechanics': return 'Search mechanics...'
      default: return 'Search...'
    }
  }

  return (
    <div className="space-y-8 transition-all duration-300">
      <PageHeader />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-auto grid-cols-3">
            <TabsTrigger value="shopOwners">Shop Owners</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
          </TabsList>
          
          <div className="w-80">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={getPlaceholder()}
            />
          </div>
        </div>

        <TabsContent value="shopOwners" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOwners.map((owner) => (
              <ShopOwnerCard
                key={owner.id}
                owner={owner}
                onViewShop={handleViewShop}
                onEdit={(owner) => handleEditUser(owner, 'shopOwner')}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <ClientCard 
                key={user.id} 
                user={user} 
                onEdit={(user) => handleEditUser(user, 'client')}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mechanics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMechanics.map((mechanic) => (
              <MechanicCard 
                key={mechanic.id} 
                mechanic={mechanic} 
                onEdit={(mechanic) => handleEditUser(mechanic, 'mechanic')}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

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
                    <Badge key={index} variant="secondary">
                      {mechanic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveUser}
        userType={editUserType}
      />
    </div>
  )
}