"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  XCircle,
  CheckCircle,
  Star,
  Target
} from "lucide-react"
import { 
  monthlyRevenueData, 
  revenueAnalytics,
  topEarningMechanics
} from "@/data/shopOwnerMockData"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// Analytics Header Component
const AnalyticsHeader = React.memo(() => (
  <div>
    <h1 className="text-3xl font-bold tracking-tight">Revenue Analytics</h1>
    <p className="text-muted-foreground mt-2">Track your shop's financial performance and analyze revenue trends.</p>
  </div>
))

AnalyticsHeader.displayName = "AnalyticsHeader"

// KPI Metrics Component
const RevenueKPICards = React.memo(() => {
  const kpiData = [
    {
      label: "Total Revenue",
      value: `$${revenueAnalytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+23%",
      changeType: "increase"
    },
    {
      label: "Average Booking Value",
      value: `$${revenueAnalytics.averageBookingValue}`,
      icon: Target,
      change: "+8%",
      changeType: "increase"
    },
    {
      label: "Completed Bookings",
      value: revenueAnalytics.completedBookings.toString(),
      icon: CheckCircle,
      change: "+15%",
      changeType: "increase"
    },
    {
      label: "Canceled Bookings",
      value: revenueAnalytics.canceledBookings.toString(),
      icon: XCircle,
      change: "-5%",
      changeType: "decrease"
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.label} className="transition-optimized cursor-pointer hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {kpi.changeType === "increase" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <p className={`text-xs ${kpi.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                  {kpi.change} from last month
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
})

RevenueKPICards.displayName = "RevenueKPICards"

// Monthly Revenue Chart Component
const MonthlyRevenueChart = React.memo(() => {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Monthly Revenue Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#FF6B35" 
              strokeWidth={2}
              fill="#FF6B35"
              fillOpacity={0.1}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
})

MonthlyRevenueChart.displayName = "MonthlyRevenueChart"

// Top Revenue Generating Mechanic Component
const TopRevenueMechanic = React.memo(() => {
  const topMechanic = revenueAnalytics.topRevenueGeneratingMechanic
  const mechanicDetails = topEarningMechanics.find(m => m.name === topMechanic.name)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Top Revenue Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mechanicDetails && (
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mechanicDetails.avatar} alt={mechanicDetails.name} />
              <AvatarFallback>{mechanicDetails.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{mechanicDetails.name}</h3>
              <p className="text-sm text-muted-foreground">{mechanicDetails.expertise}</p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Revenue Generated</span>
                  <span className="font-semibold text-primary">${topMechanic.revenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Percentage of Total</span>
                  <Badge variant="secondary">{topMechanic.percentage}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Bookings Completed</span>
                  <span className="text-sm font-medium">{mechanicDetails.bookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{mechanicDetails.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
})

TopRevenueMechanic.displayName = "TopRevenueMechanic"

// Booking Status Analysis Component
const BookingStatusAnalysis = React.memo(() => {
  const completionRate = (
    (revenueAnalytics.completedBookings / (revenueAnalytics.completedBookings + revenueAnalytics.canceledBookings)) * 100
  ).toFixed(1)

  const pieData = [
    { name: 'Completed', value: revenueAnalytics.completedBookings, color: '#22c55e' },
    { name: 'Canceled', value: revenueAnalytics.canceledBookings, color: '#ef4444' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Booking Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {revenueAnalytics.completedBookings}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">Completed</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {revenueAnalytics.canceledBookings}
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">Canceled</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Completion Rate</div>
            <div className="text-2xl font-bold text-primary">{completionRate}%</div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Bookings']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

BookingStatusAnalysis.displayName = "BookingStatusAnalysis"

// Revenue Summary Component
const RevenueSummary = React.memo(() => {
  const currentMonth = monthlyRevenueData[monthlyRevenueData.length - 1]
  const previousMonth = monthlyRevenueData[monthlyRevenueData.length - 2]
  const monthlyGrowth = previousMonth 
    ? (((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100).toFixed(1)
    : "0"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Revenue Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">This Month</span>
            <span className="font-semibold text-lg">${currentMonth.revenue.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">Monthly Growth</span>
            <div className="flex items-center gap-1">
              {parseFloat(monthlyGrowth) >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`font-semibold ${parseFloat(monthlyGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {monthlyGrowth}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">Average per Booking</span>
            <span className="font-semibold">${revenueAnalytics.averageBookingValue}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">Total Bookings</span>
            <span className="font-semibold">{revenueAnalytics.completedBookings + revenueAnalytics.canceledBookings}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

RevenueSummary.displayName = "RevenueSummary"

export default function RevenueAnalyticsPage() {
  return (
    <div className="space-y-8 page-enter">
      <AnalyticsHeader />

      {/* KPI Cards */}
      <div className="card-enter">
        <RevenueKPICards />
      </div>

      {/* Charts and Analysis */}
      <div className="grid gap-6 lg:grid-cols-3 chart-container">
        <MonthlyRevenueChart />
        <div className="space-y-6">
          <TopRevenueMechanic />
          <RevenueSummary />
        </div>
      </div>

      {/* Additional Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        <BookingStatusAnalysis />
        
        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">Strong Performance</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your shop has maintained a {((revenueAnalytics.completedBookings / (revenueAnalytics.completedBookings + revenueAnalytics.canceledBookings)) * 100).toFixed(0)}% booking completion rate this month.
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Top Performer</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {revenueAnalytics.topRevenueGeneratingMechanic.name} is your top revenue generator, contributing {revenueAnalytics.topRevenueGeneratingMechanic.percentage}% of total revenue.
                </p>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800 dark:text-orange-200">Growth Opportunity</span>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Consider promoting your most successful mechanics to increase overall shop revenue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}