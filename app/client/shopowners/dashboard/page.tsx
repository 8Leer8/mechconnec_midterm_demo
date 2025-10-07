"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Clock,
  Star,
  TrendingUp
} from "lucide-react"
import { 
  shopOwnerKpiData, 
  revenuePerMechanicData, 
  topEarningMechanics,
  shopOwnerRecentActivities 
} from "@/data/shopOwnerMockData"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Icon mapping for KPI cards
const iconMap = {
  Users: Users,
  Calendar: Calendar,
  DollarSign: DollarSign,
  Clock: Clock,
}

// KPI Card Component
const KPICard = React.memo(({ label, value, icon, change }: any) => {
  const Icon = iconMap[icon as keyof typeof iconMap] || Users
  
  return (
    <Card className="transition-optimized cursor-pointer hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-primary mt-1">{change}</p>
      </CardContent>
    </Card>
  )
})

KPICard.displayName = "KPICard"

// Revenue per Mechanic Chart Component
const RevenueChart = React.memo(() => {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Revenue per Mechanic
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenuePerMechanicData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mechanic" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
            <Bar dataKey="revenue" fill="#FF6B35" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
})

RevenueChart.displayName = "RevenueChart"

// Top Earning Mechanics Component
const TopEarningMechanics = React.memo(() => {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Top Earning Mechanics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topEarningMechanics.map((mechanic, index) => (
          <div key={mechanic.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src={mechanic.avatar} alt={mechanic.name} />
                <AvatarFallback>{mechanic.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{mechanic.name}</p>
                  <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{mechanic.expertise}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-primary">{mechanic.earnings}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{mechanic.bookings} bookings</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{mechanic.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
})

TopEarningMechanics.displayName = "TopEarningMechanics"

// Recent Activity Component
const RecentActivity = React.memo(() => {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {shopOwnerRecentActivities.map((activity, index) => (
          <div key={index} className="flex gap-3 p-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-foreground">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
})

RecentActivity.displayName = "RecentActivity"

// Dashboard Header
const DashboardHeader = React.memo(() => (
  <div>
    <h1 className="text-3xl font-bold tracking-tight">Shop Dashboard</h1>
    <p className="text-muted-foreground mt-2">Welcome back! Here's how your shop is performing today.</p>
  </div>
))

DashboardHeader.displayName = "DashboardHeader"

export default function ShopOwnerDashboard() {
  // Memoize data to prevent unnecessary re-renders
  const memoizedKpiData = useMemo(() => shopOwnerKpiData, [])

  return (
    <div className="space-y-8 page-enter">
      <DashboardHeader />

      {/* KPI Cards */}
      <div className="card-enter">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {memoizedKpiData.map((kpi) => (
            <KPICard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              icon={kpi.icon}
              change={kpi.change}
            />
          ))}
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-3 chart-container">
        <RevenueChart />
        <div className="space-y-6">
          <TopEarningMechanics />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}