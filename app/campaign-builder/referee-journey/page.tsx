'use client'

import * as React from "react"
import Link from "next/link"
import { X, Plus, Mail, Bell, MessageSquare, ChevronRight, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CampaignLayout } from "@/components/campaign-layout"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

// Types
interface Communication {
  id: string
  type: 'email' | 'push' | 'text'
  title: string
  description: string
  subject?: string
  body?: string
  buttonUrl?: string
}

interface Trigger {
  id: string
  name: string
  type: string
  customType?: string
  communications: Communication[]
  isLocked?: boolean
}

// Helper Components
const CommunicationIcon = ({ type }: { type: Communication['type'] }) => {
  switch (type) {
    case 'email':
      return <Mail className="h-5 w-5 text-blue-500" />
    case 'push':
      return <Bell className="h-5 w-5 text-purple-500" />
    case 'text':
      return <MessageSquare className="h-5 w-5 text-green-500" />
  }
}

const TriggerCard = ({ 
  trigger, 
  onAddCommunication, 
  onEditCommunication, 
  onDeleteCommunication,
  onEditTrigger,
  onDeleteTrigger
}: {
  trigger: Trigger
  onAddCommunication: (triggerId: string) => void
  onEditCommunication: (triggerId: string, commId: string) => void
  onDeleteCommunication: (triggerId: string, commId: string) => void
  onEditTrigger: (triggerId: string) => void
  onDeleteTrigger: (triggerId: string) => void
}) => (
  <Card className="mb-6 group">
    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
      <div className="space-y-1">
        <CardTitle className="text-lg font-semibold">
          {trigger.name}
        </CardTitle>
        {!trigger.isLocked && (
          <Badge variant="secondary" className="text-xs font-normal px-2 py-1">
            {trigger.type}
          </Badge>
        )}
      </div>
      {!trigger.isLocked && (
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => onEditTrigger(trigger.id)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit trigger</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => onDeleteTrigger(trigger.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete trigger</TooltipContent>
          </Tooltip>
        </div>
      )}
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {trigger.communications.map((comm) => (
          <div key={comm.id} className="relative group/comm">
            <div 
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md cursor-pointer"
              onClick={() => onEditCommunication(trigger.id, comm.id)}
            >
              <CommunicationIcon type={comm.type} />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{comm.title}</div>
                <div className="text-sm text-gray-500">{comm.description}</div>
              </div>
            </div>
            {!trigger.isLocked && (
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute top-1 right-1 opacity-0 group-hover/comm:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCommunication(trigger.id, comm.id);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {!trigger.isLocked && (
          <Button
            variant="outline"
            size="sm"
            className="w-full border-dashed"
            onClick={() => onAddCommunication(trigger.id)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Communication
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
)

// Main Component
export default function RefereeJourneyPage() {
  const [triggers, setTriggers] = React.useState<Trigger[]>([
    {
      id: '1',
      name: "Invite Message",
      type: "System Event",
      communications: [
        {
          id: '1-1',
          type: "text",
          title: "Invite Message",
          description: "Sent to potential referees",
          body: "Hey! I'm loving this platform. If you sign up using this code {referral_code} you'll get a special reward!",
        }
      ],
      isLocked: true
    },
    {
      id: '2',
      name: "New Reward",
      type: "System Event",
      communications: [
        {
          id: '2-1',
          type: "email",
          title: "Reward Notification",
          description: "Sent when a reward is earned",
          subject: "You've earned a reward!",
          body: "Congratulations! You've earned a reward for signing up through a referral.",
          buttonUrl: "https://example.com/rewards"
        }
      ],
      isLocked: true
    }
  ])

  const [editingComm, setEditingComm] = React.useState<{ triggerId: string, comm: Communication | null }>({ triggerId: '', comm: null })
  const [editingTrigger, setEditingTrigger] = React.useState<Trigger | null>(null)

  const addTrigger = () => {
    const newTrigger: Trigger = {
      id: Date.now().toString(),
      name: "New Trigger",
      type: "Custom Event",
      communications: []
    }
    setTriggers([...triggers, newTrigger])
    setEditingTrigger(newTrigger)
  }

  const editTrigger = (triggerId: string) => {
    const trigger = triggers.find(t => t.id === triggerId)
    if (trigger && !trigger.isLocked) {
      setEditingTrigger(trigger)
    }
  }

  const saveTrigger = () => {
    if (editingTrigger) {
      setTriggers(triggers.map(t => t.id === editingTrigger.id ? editingTrigger : t))
      setEditingTrigger(null)
    }
  }

  const deleteTrigger = (triggerId: string) => {
    setTriggers(triggers.filter(t => t.id !== triggerId && !t.isLocked))
  }

  const addCommunication = (triggerId: string) => {
    setEditingComm({
      triggerId,
      comm: { id: '', type: 'email', title: '', description: '', subject: '', body: '', buttonUrl: '' }
    })
  }

  const editCommunication = (triggerId: string, commId: string) => {
    const trigger = triggers.find(t => t.id === triggerId)
    const comm = trigger?.communications.find(c => c.id === commId)
    if (comm) {
      setEditingComm({ triggerId, comm })
    }
  }

  const saveCommunication = () => {
    if (editingComm.comm) {
      setTriggers(triggers.map(trigger => 
        trigger.id === editingComm.triggerId
          ? {
              ...trigger,
              communications: editingComm.comm.id
                ? trigger.communications.map(c => c.id === editingComm.comm?.id ? editingComm.comm : c)
                : [...trigger.communications, { ...editingComm.comm, id: Date.now().toString() }]
            }
          : trigger
      ))
      setEditingComm({ triggerId: '', comm: null })
    }
  }

  const deleteCommunication = (triggerId: string, commId: string) => {
    setTriggers(triggers.map(trigger => 
      trigger.id === triggerId && !trigger.isLocked
        ? { ...trigger, communications: trigger.communications.filter(c => c.id !== commId) }
        : trigger
    ))
  }

  return (
    <TooltipProvider>
      <CampaignLayout currentStep="referee-journey">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Referee Journey</h1>
              <p className="text-gray-600">
                Design the communication flow for users who are invited by referrers
              </p>
            </div>
            <Button onClick={addTrigger}>
              <Plus className="h-4 w-4 mr-2" />
              Add Trigger
            </Button>
          </div>
          <div className="space-y-6">
            {triggers.map((trigger) => (
              <TriggerCard 
                key={trigger.id}
                trigger={trigger}
                onAddCommunication={addCommunication}
                onEditCommunication={editCommunication}
                onDeleteCommunication={deleteCommunication}
                onEditTrigger={editTrigger}
                onDeleteTrigger={deleteTrigger}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between px-6 py-4 bg-white border-t">
          <Button variant="outline" asChild>
            <Link href="/campaign-builder/referrer-journey">
              <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Referrer Journey
            </Link>
          </Button>
          <Button asChild>
            <Link href="/campaign-builder/summary">
              Continue to Summary
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Communication Edit Dialog */}
        <Dialog open={!!editingComm.comm} onOpenChange={() => setEditingComm({ triggerId: '', comm: null })}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingComm.comm?.id ? 'Edit' : 'Add'} Communication</DialogTitle>
              <DialogDescription>
                Configure the details for this communication.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="comm-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={editingComm.comm?.type}
                  onValueChange={(value: 'email' | 'push' | 'text') => 
                    setEditingComm({ ...editingComm, comm: { ...editingComm.comm!, type: value } })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="text">Text Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="comm-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="comm-title"
                  value={editingComm.comm?.title}
                  onChange={(e) => setEditingComm({ ...editingComm, comm: { ...editingComm.comm!, title: e.target.value } })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="comm-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="comm-description"
                  value={editingComm.comm?.description}
                  onChange={(e) => setEditingComm({ ...editingComm, comm: { ...editingComm.comm!, description: e.target.value } })}
                  className="col-span-3"
                />
              </div>
              {editingComm.comm?.type === 'email' && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="comm-subject" className="text-right">
                      Subject
                    </Label>
                    <Input
                      id="comm-subject"
                      value={editingComm.comm?.subject}
                      onChange={(e) => setEditingComm({ ...editingComm, comm: { ...editingComm.comm!, subject: e.target.value } })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="comm-body" className="text-right">
                      Body
                    </Label>
                    <Textarea
                      id="comm-body"
                      value={editingComm.comm?.body}
                      onChange={(e) => setEditingComm({ ...editingComm, comm: { ...editingComm.comm!, body: e.target.value } })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="comm-button" className="text-right">
                      Button URL
                    </Label>
                    <Input
                      id="comm-button"
                      value={editingComm.comm?.buttonUrl}
                      onChange={(e) => setEditingComm({ ...editingComm, comm: { ...editingComm.comm!, buttonUrl: e.target.value } })
                      }
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
              {editingComm.comm?.type !== 'email' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comm-body" className="text-right">
                    Message
                  </Label>
                  <Textarea
                    id="comm-body"
                    value={editingComm.comm?.body}
                    onChange={(e) => setEditingComm({ ...editingComm, comm: { ...editingComm.comm!, body: e.target.value } })}
                    className="col-span-3"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={saveCommunication}>Save Communication</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Trigger Edit Dialog */}
        <Dialog open={!!editingTrigger} onOpenChange={() => setEditingTrigger(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingTrigger?.id ? 'Edit' : 'Add'} Trigger</DialogTitle>
              <DialogDescription>
                Configure the details for this trigger.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="trigger-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="trigger-name"
                  value={editingTrigger?.name}
                  onChange={(e) => setEditingTrigger({ ...editingTrigger!, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="trigger-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={editingTrigger?.type}
                  onValueChange={(value) => setEditingTrigger({ ...editingTrigger!, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User Event">User Event</SelectItem>
                    <SelectItem value="System Event">System Event</SelectItem>
                    <SelectItem value="Custom Event">Custom Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {editingTrigger?.type === 'Custom Event' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="custom-type" className="text-right">
                    Custom Type
                  </Label>
                  <Input
                    id="custom-type"
                    value={editingTrigger?.customType || ''}
                    onChange={(e) => setEditingTrigger({ ...editingTrigger!, customType: e.target.value })}
                    className="col-span-3"
                    placeholder="Enter custom event type..."
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={saveTrigger}>Save Trigger</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CampaignLayout>
    </TooltipProvider>
  )
}