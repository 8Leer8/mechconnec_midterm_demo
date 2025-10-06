"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const disputes = [
  {
    id: 1,
    case: "#145",
    client: "John Doe",
    shop: "AutoFix Pro",
    issue: "Service quality",
    status: "Resolved",
    date: "2025-01-05",
  },
  {
    id: 2,
    case: "#146",
    client: "Jane Smith",
    shop: "Quick Repair",
    issue: "Overcharging",
    status: "Open",
    date: "2025-01-05",
  },
  {
    id: 3,
    case: "#147",
    client: "Bob Johnson",
    shop: "Elite Motors",
    issue: "Delayed service",
    status: "In Progress",
    date: "2025-01-04",
  },
  {
    id: 4,
    case: "#148",
    client: "Alice Brown",
    shop: "Speedy Service",
    issue: "Parts quality",
    status: "Open",
    date: "2025-01-04",
  },
]

export default function DisputesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Disputes</h1>
        <p className="text-muted-foreground mt-2">Manage and resolve customer disputes</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <div className="text-sm font-medium text-muted-foreground">Open Cases</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <div className="text-sm font-medium text-muted-foreground">In Progress</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <div className="text-sm font-medium text-muted-foreground">Resolved</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search disputes..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Case ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Client</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Shop</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Issue</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((dispute) => (
                  <tr
                    key={dispute.id}
                    className="border-b border-border hover:bg-accent transition-colors duration-200"
                  >
                    <td className="py-4 px-4 font-medium">{dispute.case}</td>
                    <td className="py-4 px-4">{dispute.client}</td>
                    <td className="py-4 px-4 text-muted-foreground">{dispute.shop}</td>
                    <td className="py-4 px-4">{dispute.issue}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          dispute.status === "Resolved"
                            ? "bg-primary/10 text-primary"
                            : dispute.status === "In Progress"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
                        }`}
                      >
                        {dispute.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{dispute.date}</td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm" className="hover:bg-accent">
                        View
                      </Button>
                    </td>
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
