"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const transactions = [
  { id: 1, user: "John Doe", amount: 100, tokens: 10, date: "2025-01-05", status: "Completed" },
  { id: 2, user: "Jane Smith", amount: 500, tokens: 60, date: "2025-01-05", status: "Completed" },
  { id: 3, user: "Bob Johnson", amount: 1000, tokens: 130, date: "2025-01-04", status: "Completed" },
  { id: 4, user: "Alice Brown", amount: 100, tokens: 10, date: "2025-01-04", status: "Pending" },
  { id: 5, user: "Charlie Wilson", amount: 500, tokens: 60, date: "2025-01-03", status: "Completed" },
]

export default function TokensPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tokens</h1>
          <p className="text-muted-foreground mt-2">Track token purchases and transactions</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,678</div>
            <p className="text-xs text-primary mt-1">+23% from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱2,345,600</div>
            <p className="text-xs text-primary mt-1">+18% from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Purchase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱512</div>
            <p className="text-xs text-primary mt-1">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Tokens</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-border hover:bg-accent transition-colors duration-200">
                    <td className="py-4 px-4 font-medium">{tx.user}</td>
                    <td className="py-4 px-4">₱{tx.amount}</td>
                    <td className="py-4 px-4">{tx.tokens} tokens</td>
                    <td className="py-4 px-4 text-muted-foreground">{tx.date}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.status === "Completed"
                            ? "bg-primary/10 text-primary"
                            : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
                        }`}
                      >
                        {tx.status}
                      </span>
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
