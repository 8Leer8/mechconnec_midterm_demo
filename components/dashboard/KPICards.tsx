"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Store, Coins, Calendar, LucideIcon } from "lucide-react"

interface KPICardProps {
  label: string
  value: string
  icon: string
  change: string
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  Store,
  Coins,
  Calendar,
}

const KPICard = React.memo(({ label, value, icon, change }: KPICardProps) => {
  const Icon = iconMap[icon] || Users
  
  return (
    <Card className="transition-optimized cursor-pointer hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-primary mt-1">{change} from last month</p>
      </CardContent>
    </Card>
  )
})

KPICard.displayName = "KPICard"

interface KPICardsGridProps {
  data: KPICardProps[]
}

const KPICardsGrid = React.memo(({ data }: KPICardsGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {data.map((kpi) => (
        <KPICard
          key={kpi.label}
          label={kpi.label}
          value={kpi.value}
          icon={kpi.icon}
          change={kpi.change}
        />
      ))}
    </div>
  )
})

KPICardsGrid.displayName = "KPICardsGrid"

export { KPICard, KPICardsGrid }