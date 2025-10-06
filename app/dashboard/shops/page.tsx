"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Store, MapPin, Phone, Star, Wrench } from "lucide-react"

const shops = [
  {
    id: 1,
    name: "AutoFix Pro",
    location: "Manila",
    rating: 4.8,
    bookings: 234,
    owner: "Juan Dela Cruz",
    contact: "+63 912 345 6789",
    mechanics: ["Mike Santos", "Carlo Reyes", "Anna Garcia"],
    services: ["Oil Change", "Brake Repair", "Engine Diagnostics", "Tire Replacement"],
  },
  {
    id: 2,
    name: "Quick Repair",
    location: "Quezon City",
    rating: 4.5,
    bookings: 189,
    owner: "Maria Santos",
    contact: "+63 923 456 7890",
    mechanics: ["Pedro Cruz", "Lisa Tan"],
    services: ["Battery Replacement", "AC Repair", "Transmission Service"],
  },
  {
    id: 3,
    name: "Elite Motors",
    location: "Makati",
    rating: 4.9,
    bookings: 312,
    owner: "Robert Lim",
    contact: "+63 934 567 8901",
    mechanics: ["James Lee", "Sarah Kim", "David Wong", "Emma Chen"],
    services: ["Full Service", "Paint Job", "Body Work", "Detailing"],
  },
  {
    id: 4,
    name: "Speedy Service",
    location: "Pasig",
    rating: 4.6,
    bookings: 156,
    owner: "Carlos Mendoza",
    contact: "+63 945 678 9012",
    mechanics: ["Tony Ramos", "Jenny Cruz"],
    services: ["Quick Lube", "Tire Rotation", "Inspection"],
  },
  {
    id: 5,
    name: "Master Mechanics",
    location: "Taguig",
    rating: 4.7,
    bookings: 278,
    owner: "Angela Torres",
    contact: "+63 956 789 0123",
    mechanics: ["Mark Silva", "Grace Aquino", "Ben Castillo"],
    services: ["Engine Repair", "Suspension", "Exhaust System", "Electrical"],
  },
]

export default function ShopsPage() {
  const [selectedShop, setSelectedShop] = useState<(typeof shops)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewShop = (shop: (typeof shops)[0]) => {
    setSelectedShop(shop)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shops</h1>
          <p className="text-muted-foreground mt-2">Manage registered repair shops</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Store className="h-4 w-4 mr-2" />
          Add Shop
        </Button>
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search shops..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Shop Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Total Bookings</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shops.map((shop) => (
                  <tr key={shop.id} className="border-b border-border hover:bg-accent transition-colors duration-200">
                    <td className="py-4 px-4 font-medium">{shop.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{shop.location}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        {shop.rating}
                      </span>
                    </td>
                    <td className="py-4 px-4">{shop.bookings}</td>
                    <td className="py-4 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-accent"
                        onClick={() => handleViewShop(shop)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedShop?.name}</DialogTitle>
          </DialogHeader>
          {selectedShop && (
            <div className="space-y-6 px-6 py-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Store className="h-4 w-4" />
                    <span className="text-sm font-medium">Owner</span>
                  </div>
                  <p className="text-lg font-semibold">{selectedShop.owner}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <p className="text-lg font-semibold">{selectedShop.location}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">Contact</span>
                  </div>
                  <p className="text-lg font-semibold">{selectedShop.contact}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">Rating</span>
                  </div>
                  <p className="text-lg font-semibold flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    {selectedShop.rating} ({selectedShop.bookings} bookings)
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Wrench className="h-4 w-4" />
                  <span className="text-sm font-medium">Mechanics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedShop.mechanics.map((mechanic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {mechanic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Wrench className="h-4 w-4" />
                  <span className="text-sm font-medium">Services Offered</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {selectedShop.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 bg-accent rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
