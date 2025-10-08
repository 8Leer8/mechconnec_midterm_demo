"use client"

import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ShopItem, mockShopItems, itemCategories } from "@/data/shopOwnerMockData"
import { ItemCompactCard } from "./ItemCompactCard"
import { ItemModal } from "./ItemModal"
import { ItemStats } from "./ItemStats"
import { Plus, Search, Filter } from "lucide-react"

export const ShopItemsTab = React.memo(() => {
  const [items, setItems] = useState<ShopItem[]>(mockShopItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null)
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  // Filter and search items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      
      return matchesSearch && matchesCategory
    })
  }, [items, searchTerm, categoryFilter])

  const handleAddItem = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleEditItem = (item: ShopItem) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleDeleteItem = (itemId: number) => {
    setDeleteItemId(itemId)
  }

  const confirmDelete = () => {
    if (deleteItemId) {
      setItems(prev => prev.filter(item => item.id !== deleteItemId))
      setDeleteItemId(null)
    }
  }

  const handleSaveItem = (itemData: Omit<ShopItem, 'id'> | ShopItem) => {
    if ('id' in itemData) {
      // Editing existing item
      setItems(prev => prev.map(item => 
        item.id === itemData.id ? itemData : item
      ))
    } else {
      // Adding new item
      const newId = Math.max(...items.map(item => item.id), 0) + 1
      setItems(prev => [...prev, { ...itemData, id: newId }])
    }
  }

  const resetFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Shop Items</h2>
          <p className="text-muted-foreground">Manage your shop's inventory and track sales</p>
        </div>
        <Button onClick={handleAddItem} className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 pl-5">
                  <Filter className="h-4 w-4 mr-5" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {itemCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(searchTerm || categoryFilter !== "all") && (
                <Button variant="outline" onClick={resetFilters}>
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Items Grid - Compact Layout */}
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
            {filteredItems.map((item) => (
              <ItemCompactCard
                key={item.id}
                item={item}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                {searchTerm || categoryFilter !== "all" ? (
                  <div>
                    <p className="text-lg font-medium mb-2">No items found</p>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium mb-2">No items yet</p>
                    <p className="mb-4">Start building your inventory by adding your first item</p>
                    <Button onClick={handleAddItem} className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Item
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Statistics Sidebar - Shows on top on mobile, right side on desktop */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <ItemStats items={items} />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        editingItem={editingItem}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteItemId !== null} onOpenChange={() => setDeleteItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
})

ShopItemsTab.displayName = "ShopItemsTab"