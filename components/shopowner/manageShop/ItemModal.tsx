"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShopItem, itemCategories } from "@/data/shopOwnerMockData"
import { Upload, Package } from "lucide-react"

interface ItemModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (item: Omit<ShopItem, 'id'> | ShopItem) => void
  editingItem?: ShopItem | null
}

export const ItemModal = React.memo(({ isOpen, onClose, onSave, editingItem }: ItemModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sold: "0",
    image: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        description: editingItem.description,
        price: editingItem.price.toString(),
        category: editingItem.category,
        stock: editingItem.stock.toString(),
        sold: editingItem.sold.toString(),
        image: editingItem.image || ""
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        sold: "0",
        image: ""
      })
    }
    setErrors({})
  }, [editingItem, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Item name is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0"
    }
    if (!formData.category) {
      newErrors.category = "Category is required"
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "Stock must be 0 or greater"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return

    const itemData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      sold: parseInt(formData.sold),
      image: formData.image || "/placeholder.jpg"
    }

    if (editingItem) {
      onSave({ ...itemData, id: editingItem.id })
    } else {
      onSave(itemData)
    }

    onClose()
  }

  const handleImageUpload = () => {
    // Mock image upload functionality
    setFormData(prev => ({ ...prev, image: "/placeholder.jpg" }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Edit Item" : "Add New Item"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Item Image</Label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                {formData.image ? (
                  <img src={formData.image} alt="Item" className="w-full h-full object-cover" />
                ) : (
                  <Package className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={handleImageUpload}>
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Button>
            </div>
          </div>

          {/* Item Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Item Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter item name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter item description"
              rows={3}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₱) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                className={errors.price ? "border-destructive" : ""}
              />
              {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {itemCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
            </div>
          </div>

          {/* Stock Quantity */}
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
              placeholder="0"
              className={errors.stock ? "border-destructive" : ""}
            />
            {errors.stock && <p className="text-xs text-destructive">{errors.stock}</p>}
          </div>

          {editingItem && (
            <div className="space-y-2">
              <Label htmlFor="sold">Total Sold</Label>
              <Input
                id="sold"
                type="number"
                min="0"
                value={formData.sold}
                onChange={(e) => setFormData(prev => ({ ...prev, sold: e.target.value }))}
                placeholder="0"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">
            {editingItem ? "Update Item" : "Add Item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

ItemModal.displayName = "ItemModal"