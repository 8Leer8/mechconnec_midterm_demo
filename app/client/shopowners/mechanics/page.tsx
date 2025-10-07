"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  Users,
  Search,
  Star,
  Phone,
  Mail,
  Calendar,
  Trash2,
  UserPlus,
  DollarSign,
  Clock,
  Send
} from "lucide-react"
import { shopMechanics, availableMechanics } from "@/data/shopOwnerMockData"

interface Mechanic {
  id: number
  name: string
  email: string
  phone: string
  status: string
  totalEarnings: number
  expertise: string
  experience: string
  joinDate: string
  rating: number
  completedBookings: number
  avatar: string
}

// Mechanics Header Component
const MechanicsHeader = React.memo(() => (
  <div>
    <h1 className="text-3xl font-bold tracking-tight">Mechanics Management</h1>
    <p className="text-muted-foreground mt-2">Manage your shop's mechanics, add new team members, and track performance.</p>
  </div>
))

MechanicsHeader.displayName = "MechanicsHeader"

// Available Mechanic Card Component for Invite Modal
const AvailableMechanicCard = React.memo(({ 
  mechanic, 
  onInvite 
}: { 
  mechanic: any,
  onInvite: (mechanic: any) => void 
}) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <Avatar className="h-12 w-12">
        <AvatarImage src={mechanic.avatar} alt={mechanic.name} />
        <AvatarFallback>{mechanic.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{mechanic.name}</h4>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{mechanic.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{mechanic.expertise}</p>
        <p className="text-xs text-muted-foreground">{mechanic.experience} experience</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <Mail className="h-3 w-3" />
          <span>{mechanic.email}</span>
        </div>
      </div>

      {mechanic.isAvailable ? (
        <Button size="sm" onClick={() => onInvite(mechanic)} className="flex items-center gap-1">
          <Send className="h-3 w-3" />
          Invite
        </Button>
      ) : (
        <Badge variant="secondary" className="text-xs">
          In Another Shop
        </Badge>
      )}
    </div>
  )
})

AvailableMechanicCard.displayName = "AvailableMechanicCard"

// Invite Confirmation Modal
const InviteConfirmationModal = React.memo(({ 
  mechanic, 
  isOpen, 
  onClose, 
  onConfirm 
}: { 
  mechanic: any, 
  isOpen: boolean, 
  onClose: () => void, 
  onConfirm: () => void 
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Invite Mechanic to Shop</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to invite <strong>{mechanic?.name}</strong> to join your shop? 
            They will receive an invitation and can accept or decline.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Send Invitation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
})

InviteConfirmationModal.displayName = "InviteConfirmationModal"

// Invite Mechanic Modal Component
const InviteMechanicModal = React.memo(({ onInviteMechanic }: { onInviteMechanic: (mechanic: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMechanic, setSelectedMechanic] = useState<any>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { toast } = useToast()

  const filteredMechanics = useMemo(() => {
    return availableMechanics.filter(mechanic => 
      mechanic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mechanic.expertise.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const handleInvite = (mechanic: any) => {
    if (!mechanic.isAvailable) {
      toast({
        title: "Cannot Invite Mechanic",
        description: "This mechanic is already part of another shop.",
        variant: "destructive",
      })
      return
    }
    
    setSelectedMechanic(mechanic)
    setShowConfirmation(true)
  }

  const handleConfirmInvite = () => {
    if (selectedMechanic) {
      // Simulate invite process
      const invitedMechanic = {
        id: selectedMechanic.id,
        name: selectedMechanic.name,
        email: selectedMechanic.email,
        phone: selectedMechanic.phone,
        status: "Invited",
        totalEarnings: 0,
        expertise: selectedMechanic.expertise,
        experience: selectedMechanic.experience,
        joinDate: new Date().toISOString().split('T')[0],
        rating: selectedMechanic.rating,
        completedBookings: 0,
        avatar: selectedMechanic.avatar
      }
      
      onInviteMechanic(invitedMechanic)
      
      toast({
        title: "Invitation Sent!",
        description: `Invitation sent to ${selectedMechanic.name}. They will appear in your mechanics list once they accept.`,
      })
      
      setShowConfirmation(false)
      setSelectedMechanic(null)
      setIsOpen(false)
      setSearchTerm("")
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Mechanic
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Invite Existing Mechanic</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mechanics by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredMechanics.length > 0 ? (
                filteredMechanics.map((mechanic) => (
                  <AvailableMechanicCard
                    key={mechanic.id}
                    mechanic={mechanic}
                    onInvite={handleInvite}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No mechanics found matching your search.</p>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <InviteConfirmationModal
        mechanic={selectedMechanic}
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false)
          setSelectedMechanic(null)
        }}
        onConfirm={handleConfirmInvite}
      />
    </>
  )
})

InviteMechanicModal.displayName = "InviteMechanicModal"

// Mechanic Card Component
const MechanicCard = React.memo(({ mechanic, onRemove }: { mechanic: Mechanic, onRemove: (id: number) => void }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="default">Active</Badge>
      case "Invited":
        return <Badge variant="secondary">Invited</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusMessage = (status: string) => {
    if (status === "Invited") {
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <Clock className="h-4 w-4" />
          <span>Waiting for mechanic confirmation</span>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="transition-optimized hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={mechanic.avatar} alt={mechanic.name} />
            <AvatarFallback>{mechanic.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{mechanic.name}</h3>
              {getStatusBadge(mechanic.status)}
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{mechanic.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{mechanic.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {mechanic.status === "Invited" 
                    ? `Invited: ${new Date(mechanic.joinDate).toLocaleDateString()}`
                    : `Joined: ${new Date(mechanic.joinDate).toLocaleDateString()}`
                  }
                </span>
              </div>
            </div>

            {getStatusMessage(mechanic.status)}

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Expertise</p>
                <p className="font-medium">{mechanic.expertise}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Experience</p>
                <p className="font-medium">{mechanic.experience}</p>
              </div>
              {mechanic.status === "Active" && (
                <>
                  <div>
                    <p className="text-muted-foreground">Total Earnings</p>
                    <p className="font-medium text-primary">${mechanic.totalEarnings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completed Bookings</p>
                    <p className="font-medium">{mechanic.completedBookings}</p>
                  </div>
                </>
              )}
              {mechanic.status === "Invited" && (
                <>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium text-orange-600">Pending Acceptance</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Potential Earnings</p>
                    <p className="font-medium text-muted-foreground">TBD</p>
                  </div>
                </>
              )}
            </div>

            {mechanic.rating > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{mechanic.rating}</span>
                <span className="text-sm text-muted-foreground">rating</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1 hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                Remove from Shop
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Mechanic from Shop</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove <strong>{mechanic.name}</strong> from your shop? 
                  {mechanic.status === "Invited" 
                    ? " This will cancel their invitation."
                    : " They will no longer be part of your team and won't be able to accept bookings for your shop."
                  }
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onRemove(mechanic.id)}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  {mechanic.status === "Invited" ? "Cancel Invitation" : "Remove from Shop"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
})

MechanicCard.displayName = "MechanicCard"

// Statistics Overview Component
const StatisticsOverview = React.memo(({ mechanics }: { mechanics: Mechanic[] }) => {
  const stats = useMemo(() => {
    const activeMechanics = mechanics.filter(m => m.status === "Active").length
    const invitedMechanics = mechanics.filter(m => m.status === "Invited").length
    const totalEarnings = mechanics.filter(m => m.status === "Active").reduce((sum, m) => sum + m.totalEarnings, 0)
    const totalBookings = mechanics.filter(m => m.status === "Active").reduce((sum, m) => sum + m.completedBookings, 0)
    const avgRating = mechanics.filter(m => m.status === "Active" && m.rating > 0).length > 0 
      ? (mechanics.filter(m => m.status === "Active" && m.rating > 0).reduce((sum, m) => sum + m.rating, 0) / mechanics.filter(m => m.status === "Active" && m.rating > 0).length).toFixed(1)
      : "0.0"
    
    return {
      total: mechanics.length,
      active: activeMechanics,
      invited: invitedMechanics,
      totalEarnings,
      totalBookings,
      avgRating
    }
  }, [mechanics])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Mechanics</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.total}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Active</span>
          </div>
          <div className="text-2xl font-bold mt-1 text-green-600">{stats.active}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-muted-foreground">Invited</span>
          </div>
          <div className="text-2xl font-bold mt-1 text-orange-600">{stats.invited}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Earnings</span>
          </div>
          <div className="text-2xl font-bold mt-1">${stats.totalEarnings.toLocaleString()}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Bookings</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.totalBookings}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-muted-foreground">Avg Rating</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.avgRating}</div>
        </CardContent>
      </Card>
    </div>
  )
})

StatisticsOverview.displayName = "StatisticsOverview"

export default function MechanicsManagementPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>(shopMechanics)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const { toast } = useToast()

  const filteredMechanics = useMemo(() => {
    return mechanics.filter(mechanic => {
      const matchesSearch = mechanic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mechanic.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mechanic.expertise.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "All" || mechanic.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [mechanics, searchTerm, statusFilter])

  const handleInviteMechanic = (newMechanic: Mechanic) => {
    setMechanics(prev => [...prev, newMechanic])
  }

  const handleRemoveMechanic = (mechanicId: number) => {
    const mechanic = mechanics.find(m => m.id === mechanicId)
    setMechanics(prev => prev.filter(m => m.id !== mechanicId))
    
    if (mechanic) {
      toast({
        title: "Mechanic Removed",
        description: `${mechanic.name} has been removed from your shop.`,
      })
    }
  }

  return (
    <div className="space-y-8 page-enter">
      <MechanicsHeader />

      <StatisticsOverview mechanics={mechanics} />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mechanics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Active", "Invited"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
        <InviteMechanicModal onInviteMechanic={handleInviteMechanic} />
      </div>

      {/* Mechanics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMechanics.map((mechanic) => (
          <MechanicCard
            key={mechanic.id}
            mechanic={mechanic}
            onRemove={handleRemoveMechanic}
          />
        ))}
      </div>

      {filteredMechanics.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No mechanics found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm || statusFilter !== "All" 
                ? "Try adjusting your search criteria or filters"
                : "Get started by adding your first mechanic to the shop"
              }
            </p>
            {!searchTerm && statusFilter === "All" && (
              <InviteMechanicModal onInviteMechanic={handleInviteMechanic} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}