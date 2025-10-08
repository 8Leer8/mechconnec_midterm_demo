"use client"

import React, { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Store,
  Package
} from "lucide-react"
import { shopDetails } from "@/data/shopOwnerMockData"
import { ShopItemsTab } from "@/components/shopowner/manageShop/ShopItemsTab"
import { ShopDetailsTab } from "@/components/shopowner/manageShop/ShopDetailsTab"

// Shop Header Component
const ShopHeader = React.memo(() => (
  <div>
    <h1 className="text-3xl font-bold tracking-tight">Manage Shop</h1>
    <p className="text-muted-foreground mt-2">Update your shop information, services, and settings.</p>
  </div>
))

ShopHeader.displayName = "ShopHeader"







export default function ManageShopPage() {
  const [formData, setFormData] = useState(shopDetails)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setIsEditing(true)
  }

  const handleOpeningHoursChange = (day: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: value
      }
    }))
    setIsEditing(true)
  }

  const handleServicesChange = (services: string[]) => {
    setFormData(prev => ({
      ...prev,
      services
    }))
    setIsEditing(true)
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving shop data:", formData)
    setIsEditing(false)
    // Show success toast
  }

  const handleCancel = () => {
    setFormData(shopDetails)
    setIsEditing(false)
  }

  const memoizedOpeningHours = useMemo(() => Object.entries(formData.openingHours), [formData.openingHours])

  return (
    <div className="space-y-8 page-enter">
      <ShopHeader />

      <Tabs defaultValue="shop-details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-fit">
          <TabsTrigger value="shop-details" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Shop Details
          </TabsTrigger>
          <TabsTrigger value="shop-items" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Shop Items
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shop-details" className="space-y-6">
          <ShopDetailsTab
            formData={formData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onOpeningHoursChange={handleOpeningHoursChange}
            onServicesChange={handleServicesChange}
            onSave={handleSave}
            onCancel={handleCancel}
            memoizedOpeningHours={memoizedOpeningHours}
          />
        </TabsContent>

        <TabsContent value="shop-items" className="space-y-6">
          <ShopItemsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}