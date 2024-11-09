'use client'

import * as React from "react"
import Link from "next/link"
import { X, Mail, Bell, MessageSquare, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      <div>
        <CardTitle className="text-lg font-semibold">
          {trigger.name}
        </CardTitle>
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
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="w-full border-dashed"
          onClick={() => onAddCommunication(trigger.id)}
        >
          Add Message
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default function ReferrerJourneyPage() {
  const [triggers, setTriggers] = React.useState<Trigger[]>([
    {
      id: '1',
      name: "First Share",
      type: "System Event",
      communications: [
        {
          id: '1-1',
          type: "email",
          title: "Share Confirmation",
          description: "Sent immediately after first share",
          subject: "Thanks for sharing!",
          body: "Hey {referrer_name}!\n\nThank you for sharing our platform. We appreciate your support!",
          buttonUrl: "https://example.com/referral-status"
        }
      ],
      isLocked: true
    },
    {
      id: '2',
      name: "Sign Up",
      type: "System Event",
      communications: [
        {
          id: '2-1',
          type: "email",
          title: "Welcome Email",
          description: "Sent immediately after sign up",
          subject: "Welcome to our platform!",
          body: "Hey {referrer_name}!\n\nWelcome to our platform. We're excited to have you on board!",
          buttonUrl: "https://example.com/get-started"
        }
      ]
    },
    {
      id: '3',
      name: "Reward Earned",
      type: "System Event",
      communications: [
        {
          id: '3-1',
          type: "email",
          title: "Reward Notification",
          description: "Sent when a reward is earned",
          subject: "You've earned a reward!",
          body: "Congratulations {user}! You've earned a reward for your successful referral.",
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
      type: "System Event",
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
      trigger.id === triggerId
        ? { ...trigger, communications: trigger.communications.filter(c => c.id !== commId) }
        : trigger
    ))
  }

  return (
    <TooltipProvider>
      <CampaignLayout currentStep="referrer-journey">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Referrer Journey</h1>
              <p className="text-gray-600">
                Design the communication flow for users who refer others.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={addTrigger}
                className="bg-[#585A59] hover:bg-[#585A59]/90 text-white"
              >
                Add Trigger
              </Button>
              <Button 
                asChild
                className="bg-[#318562] hover:bg-[#318562]/90 text-white"
              >
                <Link href="/campaign-builder/referee-journey">
                  Continue
                </Link>
              </Button>
            </div>
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

        {/* Communication Edit Dialog */}
        <Dialog open={!!editingComm.comm} onOpenChange={() => setEditingComm({ triggerId: '', comm: null })}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingComm.comm?.id ? 'Edit' : 'Add'} Message</DialogTitle>
              <DialogDescription>
                Configure the details for this message.
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
                      onChange={(e) => setEditingComm({ ...editingComm, comm: { ...editingComm.comm!, buttonUrl: e.target.value } })}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button 
                onClick={saveCommunication}
                className="bg-[#585A59] hover:bg-[#585A59]/90 text-white"
              >
                Save Message
              </Button>
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
                    <SelectItem value="launch">Launch</SelectItem>
                    <SelectItem value="new-user">New User</SelectItem>
                    <SelectItem value="first-reward">First Reward</SelectItem>
                    <SelectItem value="system">System Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={saveTrigger}
                className="bg-[#585A59] hover:bg-[#585A59]/90 text-white"
              >
                Save Trigger
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CampaignLayout>
    </TooltipProvider>
  )
}