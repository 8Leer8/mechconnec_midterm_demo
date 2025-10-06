"use client"

import React, { useMemo } from "react"
import { KPICardsGrid } from "@/components/dashboard/KPICards"
import { BookingsChart } from "@/components/dashboard/BookingsChart"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { kpiData, chartData, recentActivities } from "@/data/dashboardData"

// Memoized Dashboard Header
const DashboardHeader = React.memo(() => (
  <div>
    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
    <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening today.</p>
  </div>
))

DashboardHeader.displayName = "DashboardHeader"

export default function DashboardPage() {
  // Memoize data to prevent unnecessary re-renders
  const memoizedKpiData = useMemo(() => kpiData, [])
  const memoizedChartData = useMemo(() => chartData, [])
  const memoizedActivities = useMemo(() => recentActivities, [])

  return (
    <div className="space-y-8 page-enter">
      <DashboardHeader />

      {/* KPI Cards */}
      <div className="card-enter">
        <KPICardsGrid data={memoizedKpiData} />
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-2 chart-container">
        <BookingsChart data={memoizedChartData} />
        <RecentActivity activities={memoizedActivities} />
      </div>
    </div>
  )
}