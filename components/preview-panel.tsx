'use client'

import Image from "next/image"
import { cn } from "@/lib/utils"

interface PreviewPanelProps {
  previewImage: string
  className?: string
}

export function PreviewPanel({ previewImage, className }: PreviewPanelProps) {
  return (
    <div className={cn(
      "flex items-center justify-center bg-gray-50/40 min-h-[calc(100vh-60px)]",
      className
    )}>
      <div className="relative aspect-[390/844] w-[300px] overflow-hidden rounded-[38px] bg-white shadow-xl">
        <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-2xl bg-black" />
        <Image
          src={previewImage}
          alt="Template preview"
          width={300}
          height={650}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </div>
  )
} 