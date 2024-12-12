'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import dynamic from 'next/dynamic'
const Dialog = dynamic(() => import('@/components/ui/dialog').then(mod => mod.Dialog), { ssr: false })
const DialogContent = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogContent), { ssr: false })
const DialogHeader = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogHeader), { ssr: false })
const DialogTitle = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogTitle), { ssr: false })
import { Input } from "@/components/ui/input"
import { CampaignHeader } from "@/components/campaign-header"
import { 
  CheckCircle2, 
  ChevronDown, 
  PenSquare,
  Rocket,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Environment = {
  selected: boolean
  isPublishing: boolean
  isPublished: boolean
  lastPublished: Date | null
}

export default function Summary() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [campaignTitle, setCampaignTitle] = useState("Campaign #1")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [environments, setEnvironments] = useState<Record<string, Environment>>({
    staging: { selected: true, isPublishing: false, isPublished: false, lastPublished: null },
    production: { selected: false, isPublishing: false, isPublished: false, lastPublished: null }
  })

  const sections = [
    {
      title: "Rewards",
      href: "/campaign-builder",
      content: [
        { label: "Payout Trigger", value: "New User Sign Up" },
        { label: "Referrer Payout", value: "$20 Amazon Gift Card, Max 200 referrals all time" },
        { label: "Invitee Payout", value: "$20 Amazon Gift Card" }
      ]
    },
    {
      title: "How it looks",
      href: "/campaign-builder/how-it-looks",
      content: [
        { label: "Referral Modal", value: "Sharing options: TikTok, X, Facebook" },
        { label: "Referrer Messaging", value: "Launch email, first share, and new reward" }
      ]
    },
    {
      title: "Communications",
      href: "/campaign-builder/communications",
      content: [
        { label: "Referrer Messages", value: "Launch email, first share, and new reward" },
        { label: "Invitee Messages", value: "Intro message, and new reward" }
      ]
    }
  ]

  const handleSaveAndClose = () => {
    router.push('/campaigns')
  }

  const handlePublish = async () => {
    const selectedEnvs = Object.entries(environments)
      .filter(([_, value]) => value.selected)
      .map(([key]) => key)

    if (selectedEnvs.length === 0) return

    setEnvironments(prev => {
      const newState = { ...prev }
      selectedEnvs.forEach(env => {
        newState[env] = { ...newState[env], isPublishing: true }
      })
      return newState
    })

    try {
      await Promise.all(
        selectedEnvs.map(async (env) => {
          await new Promise(resolve => setTimeout(resolve, 1000))
          console.log(`Published to ${env}`)
          setEnvironments(prev => ({
            ...prev,
            [env]: { 
              ...prev[env], 
              isPublished: true, 
              lastPublished: new Date(),
              isPublishing: false,
              selected: true
            }
          }))
        })
      )
    } catch (error) {
      console.error("Failed to publish", error)
      setEnvironments(prev => {
        const newState = { ...prev }
        selectedEnvs.forEach(env => {
          newState[env] = { ...newState[env], isPublishing: false }
        })
        return newState
      })
    }
  }

  const handleUnpublish = async (env: string) => {
    setEnvironments(prev => ({
      ...prev,
      [env]: { ...prev[env], isPublishing: true }
    }))

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Unpublished from ${env}`)
      setEnvironments(prev => ({
        ...prev,
        [env]: { 
          ...prev[env], 
          isPublished: false, 
          lastPublished: null,
          isPublishing: false,
          selected: false
        }
      }))
    } catch (error) {
      console.error(`Failed to unpublish from ${env}`, error)
      setEnvironments(prev => ({
        ...prev,
        [env]: { ...prev[env], isPublishing: false }
      }))
    }
  }

  const toggleEnvironment = (env: string) => {
    setEnvironments(prev => ({
      ...prev,
      [env]: { ...prev[env], selected: !prev[env].selected }
    }))
  }

  const isAnySelected = Object.values(environments).some(env => env.selected)
  const isAnyPublishing = Object.values(environments).some(env => env.isPublishing)

  const formatPublishTime = (date: Date | null) => {
    if (!date) return ''
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 5) return 'Just now'
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setEnvironments(prev => ({
        ...prev,
        staging: { ...prev.staging },
        production: { ...prev.production }
      }))
    }, 10000) // Update every 10 seconds

    return () => clearInterval(timer)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-gray-50/40">
        <nav className="space-y-2 p-4">
          <div className="space-y-1">
            {sections.map((section) => (
              <Link
                key={section.title}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
                href={section.href}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {section.title}
              </Link>
            ))}
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-gray-100"
              href="#"
            >
              Summary
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <CampaignHeader 
          campaignTitle={campaignTitle}
          onTitleChange={setCampaignTitle}
          onClose={handleSaveAndClose}
        />

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold">Summary</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  className="bg-gray-600 text-white hover:bg-gray-700"
                  onClick={() => setIsInviteDialogOpen(true)}
                >
                  Invite developers
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="secondary" 
                      className="bg-gray-600 text-white hover:bg-gray-700"
                      disabled={isAnyPublishing}
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Publish
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80">
                    <div className="px-4 py-3">
                      <h3 className="text-lg font-semibold">Choose publish destination</h3>
                    </div>
                    <div className="space-y-4 p-4">
                      {Object.entries(environments).map(([env, { selected, isPublishing, isPublished, lastPublished }]) => (
                        <div key={env} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={env}
                              checked={selected}
                              onCheckedChange={() => toggleEnvironment(env)}
                              disabled={isPublishing}
                            />
                            <label
                              htmlFor={env}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {env.charAt(0).toUpperCase() + env.slice(1)}
                            </label>
                          </div>
                          <div className="pl-6">
                            {isPublished ? (
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-green-600">Published {formatPublishTime(lastPublished)}</p>
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() => handleUnpublish(env)}
                                  disabled={isPublishing}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Unpublish
                                </Button>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">Not published</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t p-4">
                      <Button 
                        className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                        onClick={handlePublish}
                        disabled={!isAnySelected || isAnyPublishing}
                      >
                        {isAnyPublishing ? "Publishing..." : "Publish"}
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-4">
              {sections.map((section) => (
                <Card key={section.title} className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">{section.title}</h2>
                    <Link href={section.href}>
                      <Button variant="ghost" size="icon">
                        <PenSquare className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-4 space-y-3">
                    {section.content.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-sm text-gray-500">{item.label}</div>
                        <div className="text-sm">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite developers</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Bring your referral campaign to life: Send your dev team
              instructions to access and implement Flock's SDK.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="bart@linear.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  // Copy invite link logic here
                }}
              >
                Copy invite link
              </Button>
              <Button 
                className="flex-1 bg-gray-700 hover:bg-gray-600"
                onClick={() => {
                  // Send invites logic here
                  setIsInviteDialogOpen(false)
                }}
              >
                Send invites
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}