"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Store,
  Clock,
  FileText,
  Upload,
  Plus,
  X,
  Save,
  RotateCcw,
  Star
} from "lucide-react"
import { shopDetails } from "@/data/shopOwnerMockData"

// Shop Image Upload Component
const ShopImageUpload = React.memo(({ currentImage, onImageChange }: { currentImage: string, onImageChange: (image: string) => void }) => {
  const handleFileUpload = () => {
    // In a real app, this would handle file upload
    console.log("File upload would be handled here")
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={currentImage} alt="Shop logo" />
        <AvatarFallback>
          <Store className="h-8 w-8" />
        </AvatarFallback>
      </Avatar>
      <div>
        <Button variant="outline" onClick={handleFileUpload} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Logo
        </Button>
        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
      </div>
    </div>
  )
})

ShopImageUpload.displayName = "ShopImageUpload"

// Services Management Component
const ServicesManagement = React.memo(({ services, onServicesChange }: { 
  services: string[], 
  onServicesChange: (services: string[]) => void 
}) => {
  const [newService, setNewService] = React.useState("")

  const addService = () => {
    if (newService.trim() && !services.includes(newService.trim())) {
      onServicesChange([...services, newService.trim()])
      setNewService("")
    }
  }

  const removeService = (serviceToRemove: string) => {
    onServicesChange(services.filter(service => service !== serviceToRemove))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add a new service..."
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addService()}
        />
        <Button onClick={addService} size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {services.map((service, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {service}
            <button 
              onClick={() => removeService(service)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
})

ServicesManagement.displayName = "ServicesManagement"

interface ShopDetailsTabProps {
  formData: typeof shopDetails
  isEditing: boolean
  onInputChange: (field: string, value: string) => void
  onOpeningHoursChange: (day: string, value: string) => void
  onServicesChange: (services: string[]) => void
  onSave: () => void
  onCancel: () => void
  memoizedOpeningHours: [string, string][]
}

export const ShopDetailsTab = React.memo(({ 
  formData, 
  isEditing, 
  onInputChange, 
  onOpeningHoursChange, 
  onServicesChange, 
  onSave, 
  onCancel,
  memoizedOpeningHours
}: ShopDetailsTabProps) => (
  <div className="grid gap-6 lg:grid-cols-3">
    {/* Shop Information */}
    <div className="lg:col-span-2 space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <ShopImageUpload 
            currentImage={formData.logo} 
            onImageChange={(image) => onInputChange('logo', image)} 
          />
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                value={formData.name}
                onChange={(e) => onInputChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Shop Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => onInputChange('address', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onInputChange('description', e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Services Offered
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ServicesManagement 
            services={formData.services}
            onServicesChange={onServicesChange}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={onSave} 
          disabled={!isEditing}
          className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF6B35]/90"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={!isEditing}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>

    {/* Opening Hours & Stats */}
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Opening Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {memoizedOpeningHours.map(([day, hours]) => (
            <div key={day} className="flex items-center justify-between">
              <Label className="capitalize font-medium w-20">{day}</Label>
              <Input
                value={hours}
                onChange={(e) => onOpeningHoursChange(day, e.target.value)}
                className="flex-1 ml-3"
                placeholder="e.g., 9:00 AM - 5:00 PM"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Shop Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overall Rating</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{formData.rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Reviews</span>
            <span className="font-semibold">{formData.totalReviews}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Services</span>
            <span className="font-semibold">{formData.services.length}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
))

ShopDetailsTab.displayName = "ShopDetailsTab"