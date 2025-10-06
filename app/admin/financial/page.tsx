"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const summaryCards = [
  {
    title: "Total Token Sales",
    value: "₱2,450,000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Commissions Earned",
    value: "₱367,500",
    change: "+8.3%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Total Withdrawals",
    value: "₱245,000",
    change: "-3.2%",
    trend: "down",
    icon: Wallet,
  },
  {
    title: "Platform Balance",
    value: "₱122,500",
    change: "+15.7%",
    trend: "up",
    icon: CreditCard,
  },
]

const commissionTrendsData = [
  { month: "Jul", commission: 28000 },
  { month: "Aug", commission: 32000 },
  { month: "Sep", commission: 35000 },
  { month: "Oct", commission: 38000 },
  { month: "Nov", commission: 42000 },
  { month: "Dec", commission: 45000 },
]

const mechanicEarningsData = [
  { name: "Mike Santos", earnings: 45000 },
  { name: "Carlo Reyes", earnings: 38000 },
  { name: "Anna Garcia", earnings: 42000 },
  { name: "Pedro Cruz", earnings: 35000 },
  { name: "Lisa Tan", earnings: 32000 },
]

const customerBookings = [
  {
    id: 1,
    bookingId: "BK-2025-001",
    customerName: "John Doe",
    mechanicName: "Mike Santos",
    serviceType: "Oil Change",
    amount: "₱1,500",
    status: "Completed",
    date: "2025-01-05",
  },
  {
    id: 2,
    bookingId: "BK-2025-002",
    customerName: "Jane Smith",
    mechanicName: "Carlo Reyes",
    serviceType: "Brake Repair",
    amount: "₱3,200",
    status: "Completed",
    date: "2025-01-05",
  },
  {
    id: 3,
    bookingId: "BK-2025-003",
    customerName: "Bob Johnson",
    mechanicName: "Anna Garcia",
    serviceType: "Engine Diagnostics",
    amount: "₱2,800",
    status: "Pending",
    date: "2025-01-04",
  },
  {
    id: 4,
    bookingId: "BK-2025-004",
    customerName: "Alice Brown",
    mechanicName: "Pedro Cruz",
    serviceType: "Tire Replacement",
    amount: "₱4,500",
    status: "Completed",
    date: "2025-01-04",
  },
  {
    id: 5,
    bookingId: "BK-2025-005",
    customerName: "Charlie Wilson",
    mechanicName: "Lisa Tan",
    serviceType: "AC Repair",
    amount: "₱2,100",
    status: "Canceled",
    date: "2025-01-03",
  },
  {
    id: 6,
    bookingId: "BK-2025-006",
    customerName: "Diana Prince",
    mechanicName: "Mike Santos",
    serviceType: "Battery Replacement",
    amount: "₱1,800",
    status: "Completed",
    date: "2025-01-03",
  },
]

const bookingStatusData = [
  { name: "Completed", value: 156, color: "#27AE60" },
  { name: "Pending", value: 23, color: "#F39C12" },
  { name: "Canceled", value: 12, color: "#E74C3C" },
]

const totalBookings = bookingStatusData.reduce((sum, item) => sum + item.value, 0)
const completedBookings = bookingStatusData.find((item) => item.name === "Completed")?.value || 0
const pendingBookings = bookingStatusData.find((item) => item.name === "Pending")?.value || 0
const canceledBookings = bookingStatusData.find((item) => item.name === "Canceled")?.value || 0

export default function FinancialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financial & Commission Management</h1>
        <p className="text-muted-foreground mt-2">Track token sales, commissions, and customer bookings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  {card.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {card.change}
                  </span>
                  <span className="text-sm text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Commission Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                commission: {
                  label: "Commission",
                  color: "#FF6B35",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={commissionTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="commission"
                    stroke="#FF6B35"
                    strokeWidth={2}
                    dot={{ fill: "#FF6B35", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Top Mechanic Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                earnings: {
                  label: "Earnings",
                  color: "#36B5B0",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mechanicEarningsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" angle={-45} textAnchor="end" height={80} />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="earnings" fill="#36B5B0" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Customer Financial & Commission Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card className="bg-accent/50">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{totalBookings}</div>
                <p className="text-sm text-muted-foreground mt-1">Total Bookings</p>
              </CardContent>
            </Card>
            <Card className="bg-green-500/10">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600 dark:text-green-500">{completedBookings}</div>
                <p className="text-sm text-muted-foreground mt-1">Completed</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-500/10">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">{pendingBookings}</div>
                <p className="text-sm text-muted-foreground mt-1">Pending</p>
              </CardContent>
            </Card>
            <Card className="bg-red-500/10">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600 dark:text-red-500">{canceledBookings}</div>
                <p className="text-sm text-muted-foreground mt-1">Canceled</p>
              </CardContent>
            </Card>
            <Card className="bg-accent/50">
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    value: {
                      label: "Bookings",
                      color: "#FF6B35",
                    },
                  }}
                  className="h-[60px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookingStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={15}
                        outerRadius={25}
                      >
                        {bookingStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bookings table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Booking ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Customer Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Mechanic Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Service Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                {customerBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-border hover:bg-accent transition-colors duration-200"
                  >
                    <td className="py-4 px-4 font-medium">{booking.bookingId}</td>
                    <td className="py-4 px-4">{booking.customerName}</td>
                    <td className="py-4 px-4">{booking.mechanicName}</td>
                    <td className="py-4 px-4 text-muted-foreground">{booking.serviceType}</td>
                    <td className="py-4 px-4 text-primary font-semibold">{booking.amount}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === "Completed"
                            ? "bg-green-500/10 text-green-600 dark:text-green-500"
                            : booking.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
                              : "bg-red-500/10 text-red-600 dark:text-red-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
