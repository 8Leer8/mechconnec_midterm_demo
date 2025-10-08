"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShopItem } from "@/data/shopOwnerMockData"
import { Edit, Trash2, Package } from "lucide-react"
import Image from "next/image"

interface ItemCompactCardProps {
  item: ShopItem
  onEdit: (item: ShopItem) => void
  onDelete: (itemId: number) => void
}

export const ItemCompactCard = React.memo(({ item, onEdit, onDelete }: ItemCompactCardProps) => {
  return (
    <Card className="group hover:shadow-md hover:scale-[1.02] transition-all duration-200 h-48">
      <CardContent className="p-4 h-full">
        <div className="flex gap-4 h-full">
          {/* Left: Item Image */}
          <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Center: Item Details */}
          <div className="flex-grow min-w-0 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                {item.name}
              </h3>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#FF6B35]">
                    ₱{item.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Stock: <span className="font-medium">{item.stock}</span></span>
                  <span>Sold: <span className="font-medium">{item.sold}</span></span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(item)}
                className="flex-1 h-7 text-xs"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(item.id)}
                className="flex-1 h-7 text-xs hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

ItemCompactCard.displayName = "ItemCompactCard"