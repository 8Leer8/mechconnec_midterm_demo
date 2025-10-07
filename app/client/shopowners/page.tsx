"use client"

import React from "react"
import { redirect } from "next/navigation"

export default function ShopOwnersPage() {
  // Redirect to dashboard as the main page
  redirect("/client/shopowners/dashboard")
}