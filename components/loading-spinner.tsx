'use client'

import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  isLoading: boolean
}

export function LoadingSpinner({ isLoading }: LoadingSpinnerProps) {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
    </div>
  )
}