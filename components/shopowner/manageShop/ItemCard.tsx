"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShopItem } from "@/data/shopOwnerMockData"
import { Edit, Trash2, Package } from "lucide-react"
import Image from "next/image"

interface ItemCardProps {
  item: ShopItem
  onEdit: (item: ShopItem) => void
  onDelete: (itemId: number) => void
}

export const ItemCard = React.memo(({ item, onEdit, onDelete }: ItemCardProps) => {
  return (
    <Card className="group hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-3 bg-gray-50 rounded-lg overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {item.name}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {item.category}
            </Badge>
            <span className="font-bold text-[#FF6B35]">
              ₱{item.price.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Stock: {item.stock}</span>
            <span>Sold: {item.sold}</span>
          </div>
          
          <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(item)}
              className="flex-1 h-8 text-xs"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(item.id)}
              className="flex-1 h-8 text-xs hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

ItemCard.displayName = "ItemCard"