'use client'

import { useState } from "react"
import Link from "next/link"
import { PenSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CampaignNameDialog } from "@/components/campaign-name-dialog"

interface CampaignHeaderProps {
  campaignTitle: string
  onTitleChange: (title: string) => void
}

export function CampaignHeader({ campaignTitle, onTitleChange }: CampaignHeaderProps) {
  const [showNameDialog, setShowNameDialog] = useState(false)

  return (
    <div className="flex h-14 items-center justify-between border-b px-6">
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
      <Link href="/">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </Link>

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