"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import { RevenueChart, TokenSalesChart } from "@/components/dashboard/ReportsCharts"
import { monthlyRevenueData, tokenSalesData, shopPerformanceData, userActivityData } from "@/data/dashboardData"

// Memoized components
const ReportsHeader = React.memo(() => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
      <p className="text-muted-foreground mt-2">Comprehensive business insights and analytics</p>
    </div>
    <Button className="bg-primary hover:bg-primary/90">
      <Download className="w-4 h-4 mr-2" />
      Export All
    </Button>
  </div>
))

ReportsHeader.displayName = "ReportsHeader"

const ReportCard = React.memo(({ title, description, onDownload }: {
  title: string
  description: string
  onDownload: () => void
}) => (
  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onDownload}>
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </CardHeader>
  </Card>
))

ReportCard.displayName = "ReportCard"

const QuickStats = React.memo(() => {
  const stats = useMemo(() => [
    { label: "Total Revenue", value: "$1,245,000", change: "+12.5%" },
    { label: "Active Users", value: "15,234", change: "+8.3%" },
    { label: "Completed Bookings", value: "8,456", change: "+15.2%" },
    { label: "Platform Revenue", value: "$124,500", change: "+18.7%" },
  ], [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
})

QuickStats.displayName = "QuickStats"

export default function ReportsPage() {
  // Memoize data to prevent unnecessary re-renders
  const memoizedRevenueData = useMemo(() => monthlyRevenueData, [])
  const memoizedTokenData = useMemo(() => tokenSalesData, [])

  const handleDownload = (reportType: string) => {
    console.log(`Downloading ${reportType} report...`)
    // Implementation for downloading reports
  }

  const reports = useMemo(() => [
    { title: "Monthly Revenue Report", description: "Detailed financial performance overview", type: "revenue" },
    { title: "User Activity Report", description: "User engagement and activity metrics", type: "activity" },
    { title: "Shop Performance Report", description: "Individual shop analytics and ratings", type: "shops" },
    { title: "Token Sales Report", description: "Token sales and transaction analysis", type: "tokens" },
  ], [])

  return (
    <div className="space-y-8 transition-all duration-300">
      <ReportsHeader />
      
      <QuickStats />

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={memoizedRevenueData} />
        <TokenSalesChart data={memoizedTokenData} />
      </div>

      {/* Report Downloads */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <p className="text-sm text-muted-foreground">Download detailed reports for further analysis</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <ReportCard
                key={report.type}
                title={report.title}
                description={report.description}
                onDownload={() => handleDownload(report.type)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}