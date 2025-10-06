"use client"

import React from "react"

const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
))

LoadingSpinner.displayName = "LoadingSpinner"

const LoadingSkeleton = React.memo(() => (
  <div className="space-y-4 p-6">
    <div className="h-4 bg-muted rounded w-3/4 loading-pulse"></div>
    <div className="h-4 bg-muted rounded w-1/2 loading-pulse"></div>
    <div className="h-4 bg-muted rounded w-5/6 loading-pulse"></div>
  </div>
))

LoadingSkeleton.displayName = "LoadingSkeleton"

const CardSkeleton = React.memo(() => (
  <div className="border rounded-lg p-6 space-y-4">
    <div className="h-6 bg-muted rounded w-1/2 loading-pulse"></div>
    <div className="h-4 bg-muted rounded w-3/4 loading-pulse"></div>
    <div className="h-4 bg-muted rounded w-1/3 loading-pulse"></div>
  </div>
))

CardSkeleton.displayName = "CardSkeleton"

export { LoadingSpinner, LoadingSkeleton, CardSkeleton }