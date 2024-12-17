'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuSub, 
  SidebarMenuSubItem,
  SidebarProvider 
} from "@/components/ui/sidebar"
import { BarChart2, BookOpen, Home, Key, Link2, ListChecks, MoreVertical, Plus, Trash2 } from "lucide-react"

const WEBHOOK_EVENTS = {
  'campaign.launched': 'Campaign Launch',
  'campaign.ended': 'Campaign End',
  'referrer.visited': 'Referrer Visited',
  'referrer.rewarded': 'Referrer Rewarded',
  'referrer.reward_claimed': 'Referrer Reward Claimed',
  'invitee.visited': 'Invitee Visited',
  'invitee.accepted': 'Successful Referral',
  'invitee.rewarded': 'Invitee Rewarded',
  'invitee.reward_claimed': 'Invitee Reward Claimed'
} as const

interface Webhook {
  id: string
  name: string
  url: string
  method: "POST" | "PUT" | "PATCH" | "DELETE"
}

interface Listener {
  id: string
  eventType: keyof typeof WEBHOOK_EVENTS
  description?: string
  webhooks: Webhook[]
}

export default function WebhookConfig() {
  const [listeners, setListeners] = useState<Listener[]>([
    {
      id: '1',
      eventType: 'invitee.accepted',
      description: 'Trigger after an invitee enters a valid referral code',
      webhooks: [
        {
          id: '1',
          name: 'Send promo code',
          url: 'https://localhost:4000/promo',
          method: 'POST'
        },
        {
          id: '2',
          name: 'Send email',
          url: 'https://localhost:4000/promo2',
          method: 'PUT'
        }
      ]
    }
  ])

  const addListener = (eventType: keyof typeof WEBHOOK_EVENTS) => {
    const newListener: Listener = {
      id: (listeners.length + 1).toString(),
      eventType,
      webhooks: []
    }
    setListeners([...listeners, newListener])
  }

  const addWebhook = (listenerId: string) => {
    setListeners(listeners.map(listener => {
      if (listener.id === listenerId) {
        return {
          ...listener,
          webhooks: [
            ...listener.webhooks,
            {
              id: (listener.webhooks.length + 1).toString(),
              name: 'New Webhook',
              url: '',
              method: 'POST'
            }
          ]
        }
      }
      return listener
    }))
  }

  const deleteListener = (listenerId: string) => {
    setListeners(listeners.filter(l => l.id !== listenerId))
  }

  const deleteWebhook = (listenerId: string, webhookId: string) => {
    setListeners(listeners.map(listener => {
      if (listener.id === listenerId) {
        return {
          ...listener,
          webhooks: listener.webhooks.filter(w => w.id !== webhookId)
        }
      }
      return listener
    }))
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="w-64 border-r">
          <SidebarHeader className="flex h-[60px] items-center justify-start border-b px-4">
            <Link className="flex items-center" href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%208770%20(1)%201-kOBWph7wJ5hXISSOm5yJMHyPeH1VWp.png"
                width={87}
                height={24}
                alt="Flock logo"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="/">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="/analytics">
                  <BarChart2 className="h-4 w-4" />
                  Analytics
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenuSub>
              <SidebarMenuItem className="text-gray-500">Dev Setup</SidebarMenuItem>
              <SidebarMenuSubItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="/access-keys">
                  <Key className="h-4 w-4" />
                  Access Keys
                </Link>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 bg-accent text-black" href="/integrations">
                  <Link2 className="h-4 w-4" />
                  Integrations
                </Link>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <Link 
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" 
                  href="https://docs.withflock.com/introduction"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="h-4 w-4" />
                  Dev Docs
                </Link>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Webhooks</h1>
                <p className="text-muted-foreground">
                  Configure your webhooks to receive notifications when a specific event occurs.
                </p>
              </div>
              <div className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Add Listener <Plus className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[300px]">
                    {Object.entries(WEBHOOK_EVENTS).map(([value, label]) => (
                      <DropdownMenuItem 
                        key={value} 
                        className="flex justify-between"
                        onClick={() => addListener(value as keyof typeof WEBHOOK_EVENTS)}
                      >
                        <span>{label}</span>
                        <code className="text-sm text-muted-foreground ml-2">{value}</code>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-6">
              {listeners.map(listener => (
                <Card key={listener.id} className="shadow-sm rounded-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{WEBHOOK_EVENTS[listener.eventType]}</CardTitle>
                      <CardDescription className="flex items-center gap-3 mt-1">
                        <code className="text-sm">{listener.eventType}</code>
                        {listener.description && (
                          <span>{listener.description}</span>
                        )}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-gray-400 hover:text-destructive"
                          onClick={() => deleteListener(listener.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {listener.webhooks.map(webhook => (
                      <WebhookEndpoint
                        key={webhook.id}
                        {...webhook}
                        onDelete={() => deleteWebhook(listener.id, webhook.id)}
                        onChange={(updates) => {
                          setListeners(listeners.map(l => {
                            if (l.id === listener.id) {
                              return {
                                ...l,
                                webhooks: l.webhooks.map(w => 
                                  w.id === webhook.id ? { ...w, ...updates } : w
                                )
                              }
                            }
                            return l
                          }))
                        }}
                      />
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => addWebhook(listener.id)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add webhook
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

interface WebhookEndpointProps extends Webhook {
  onDelete: () => void
  onChange: (updates: Partial<Webhook>) => void
}

function WebhookEndpoint({ name, url, method, onDelete, onChange }: WebhookEndpointProps) {
  return (
    <div className="p-4 bg-muted/50 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <Input 
          value={name}
          className="bg-background border-0 text-lg font-medium"
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-400 hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-24 bg-[#5CB98B] text-white hover:bg-[#4ea77a]">
              {method}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {(['POST', 'PUT', 'PATCH', 'DELETE'] as const).map((m) => (
              <DropdownMenuItem 
                key={m}
                onClick={() => onChange({ method: m })}
              >
                {m}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input 
          value={url}
          className="flex-1 bg-background"
          onChange={(e) => onChange({ url: e.target.value })}
        />
      </div>
    </div>
  )
} 