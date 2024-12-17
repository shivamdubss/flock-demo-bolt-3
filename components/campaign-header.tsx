'use client'

import { useState } from "react"
import Link from "next/link"
import { PenSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CampaignNameDialog } from "@/components/campaign-name-dialog"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface CampaignHeaderProps {
  campaignTitle: string
  onTitleChange: (title: string) => void
  className?: string
}

export function CampaignHeader({ 
  campaignTitle, 
  onTitleChange,
  className 
}: CampaignHeaderProps) {
  const router = useRouter()
  const [showNameDialog, setShowNameDialog] = useState(false)

  const handleClose = () => {
    router.push('/')
  }

  return (
    <div className={cn(
      "flex h-14 items-center justify-between px-6",
      className
    )}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{campaignTitle}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setShowNameDialog(true)}
        >
          <PenSquare className="h-4 w-4" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        aria-label="Close"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <CampaignNameDialog
        open={showNameDialog}
        onOpenChange={setShowNameDialog}
        onSave={onTitleChange}
        initialValue={campaignTitle}
        mode="edit"
      />
    </div>
  )
}