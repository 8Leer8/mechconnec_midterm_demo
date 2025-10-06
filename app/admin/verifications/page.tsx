"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, CheckCircle, XCircle, FileText } from "lucide-react"

const initialMechanicApplications = [
  {
    id: 1,
    name: "Mark Rodriguez",
    shop: "AutoFix Pro",
    experience: "5 years",
    documents: "License, Certifications",
    status: "Pending",
  },
  {
    id: 2,
    name: "Lisa Chen",
    shop: "Quick Repair",
    experience: "3 years",
    documents: "License, ID",
    status: "Pending",
  },
  {
    id: 3,
    name: "Tom Anderson",
    shop: "None",
    experience: "7 years",
    documents: "License, Certifications, ID",
    status: "Pending",
  },
  {
    id: 4,
    name: "Sarah Martinez",
    shop: "Elite Motors",
    experience: "4 years",
    documents: "License, Certifications",
    status: "Pending",
  },
]

const initialShopVerifications = [
  {
    id: 1,
    shopName: "Premium Auto Care",
    owner: "Michael Johnson",
    location: "Pasay City",
    dateSubmitted: "2025-01-03",
    status: "Pending",
  },
  {
    id: 2,
    shopName: "City Mechanics Hub",
    owner: "Rachel Green",
    location: "Mandaluyong",
    dateSubmitted: "2025-01-02",
    status: "Pending",
  },
  {
    id: 3,
    shopName: "Express Auto Fix",
    owner: "Daniel Park",
    location: "Taguig",
    dateSubmitted: "2025-01-01",
    status: "Pending",
  },
]

export default function VerificationsPage() {
  const [mechanicApplications, setMechanicApplications] = useState(initialMechanicApplications)
  const [shopVerifications, setShopVerifications] = useState(initialShopVerifications)

  const handleApproveMechanic = (id: number) => {
    setMechanicApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "Approved" } : app)))
  }

  const handleRejectMechanic = (id: number) => {
    setMechanicApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "Rejected" } : app)))
  }

  const handleApproveShop = (id: number) => {
    setShopVerifications((prev) => prev.map((shop) => (shop.id === id ? { ...shop, status: "Approved" } : shop)))
  }

  const handleRejectShop = (id: number) => {
    setShopVerifications((prev) => prev.map((shop) => (shop.id === id ? { ...shop, status: "Rejected" } : shop)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verifications</h1>
          <p className="text-muted-foreground mt-2">Review and approve mechanic and shop applications</p>
        </div>
      </div>

      <Tabs defaultValue="mechanics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="mechanics">Mechanic Applications</TabsTrigger>
          <TabsTrigger value="shops">Shop Verifications</TabsTrigger>
        </TabsList>

        <TabsContent value="mechanics">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search mechanic applications..." className="max-w-sm" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Experience</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Shop</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Documents</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mechanicApplications.map((application) => (
                      <tr
                        key={application.id}
                        className="border-b border-border hover:bg-accent transition-colors duration-200"
                      >
                        <td className="py-4 px-4 font-medium">{application.name}</td>
                        <td className="py-4 px-4">{application.experience}</td>
                        <td className="py-4 px-4 text-muted-foreground">{application.shop}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{application.documents}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              application.status === "Pending"
                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
                                : application.status === "Approved"
                                  ? "bg-green-500/10 text-green-600 dark:text-green-500"
                                  : "bg-red-500/10 text-red-600 dark:text-red-500"
                            }`}
                          >
                            {application.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-green-500/10 hover:text-green-600"
                              onClick={() => handleApproveMechanic(application.id)}
                              disabled={application.status !== "Pending"}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-red-500/10 hover:text-red-600"
                              onClick={() => handleRejectMechanic(application.id)}
                              disabled={application.status !== "Pending"}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shops">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search shop verifications..." className="max-w-sm" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-sm">Shop Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Owner</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Location</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Date Submitted</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shopVerifications.map((shop) => (
                      <tr
                        key={shop.id}
                        className="border-b border-border hover:bg-accent transition-colors duration-200"
                      >
                        <td className="py-4 px-4 font-medium">{shop.shopName}</td>
                        <td className="py-4 px-4">{shop.owner}</td>
                        <td className="py-4 px-4 text-muted-foreground">{shop.location}</td>
                        <td className="py-4 px-4 text-muted-foreground">{shop.dateSubmitted}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              shop.status === "Pending"
                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
                                : shop.status === "Approved"
                                  ? "bg-green-500/10 text-green-600 dark:text-green-500"
                                  : "bg-red-500/10 text-red-600 dark:text-red-500"
                            }`}
                          >
                            {shop.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-green-500/10 hover:text-green-600"
                              onClick={() => handleApproveShop(shop.id)}
                              disabled={shop.status !== "Pending"}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-red-500/10 hover:text-red-600"
                              onClick={() => handleRejectShop(shop.id)}
                              disabled={shop.status !== "Pending"}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
