"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShopItem } from "@/data/shopOwnerMockData"
import { Package, TrendingUp, Award, AlertTriangle } from "lucide-react"

interface ItemStatsProps {
  items: ShopItem[]
}

export const ItemStats = React.memo(({ items }: ItemStatsProps) => {
  const stats = useMemo(() => {
    const totalItems = items.length
    const totalSales = items.reduce((sum, item) => sum + (item.sold * item.price), 0)
    const totalSold = items.reduce((sum, item) => sum + item.sold, 0)
    
    const sortedBySold = [...items].sort((a, b) => b.sold - a.sold)
    const mostSoldItem = sortedBySold[0] || null
    const leastSoldItem = sortedBySold[sortedBySold.length - 1] || null
    
    // Top 5 most sold items for chart
    const topItems = sortedBySold.slice(0, 5)
    const maxSold = topItems[0]?.sold || 1

    return {
      totalItems,
      totalSales,
      totalSold,
      mostSoldItem,
      leastSoldItem,
      topItems,
      maxSold
    }
  }, [items])

  return (
    <div className="space-y-5">
      {/* Statistics Cards - Compact 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#FF6B35]/10 rounded-md">
                <Package className="h-4 w-4 text-[#FF6B35]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Items</p>
                <p className="text-lg font-bold">{stats.totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 rounded-md">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Sales</p>
                <p className="text-lg font-bold">₱{stats.totalSales.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-md">
                <Award className="h-4 w-4 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Most Sold</p>
                <p className="text-xs font-semibold truncate">
                  {stats.mostSoldItem ? stats.mostSoldItem.name : "N/A"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.mostSoldItem ? `${stats.mostSoldItem.sold} sold` : ""}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-100 rounded-md">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Least Sold</p>
                <p className="text-xs font-semibold truncate">
                  {stats.leastSoldItem ? stats.leastSoldItem.name : "N/A"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.leastSoldItem ? `${stats.leastSoldItem.sold} sold` : ""}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart - Compact Design */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Top 5 Best Sellers</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {stats.topItems.map((item, index) => {
              const percentage = (item.sold / stats.maxSold) * 100
              return (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate max-w-28 text-xs">
                      {item.name}
                    </span>
                    <span className="text-muted-foreground ml-2 text-xs font-semibold">
                      {item.sold}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-[#FF6B35] h-1.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
            
            {stats.topItems.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No items available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

ItemStats.displayName = "ItemStats"