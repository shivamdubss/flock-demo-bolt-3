'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CampaignNameDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (name: string) => void
  initialValue?: string
  mode: 'create' | 'edit'
}

export function CampaignNameDialog({
  open,
  onOpenChange,
  onSave,
  initialValue = '',
  mode
}: CampaignNameDialogProps) {
  const [name, setName] = useState(initialValue)

  const handleSave = () => {
    if (name.trim()) {
      onSave(name)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create new campaign' : 'Edit campaign name'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Campaign name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <Button 
          onClick={handleSave}
          className="w-full bg-emerald-600 hover:bg-emerald-600/90"
        >
          {mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}