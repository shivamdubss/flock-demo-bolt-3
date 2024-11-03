'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CampaignHeader } from "@/components/campaign-header"
import { 
  CheckCircle2, 
  ChevronDown, 
  PenSquare
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Summary() {
  const router = useRouter()
  const [campaignTitle, setCampaignTitle] = useState("Campaign #1")

  const sections = [
    {
      title: "Rewards",
      href: "/campaign-builder",
      content: [
        { label: "Payout Trigger", value: "New User Sign Up" },
        { label: "Referrer Payout", value: "$20 Amazon Gift Card, Max 200 referrals all time" },
        { label: "Referee Payout", value: "$20 Amazon Gift Card" }
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
      title: "Referrer Journey",
      href: "/campaign-builder/referrer-journey",
      content: [
        { label: "Referral Modal", value: "Sharing options: TikTok, X, Facebook" },
        { label: "Referrer Messaging", value: "Launch email, first share, and new reward" }
      ]
    },
    {
      title: "Referee Journey",
      href: "/campaign-builder/referee-journey",
      content: [
        { label: "Referee Messaging", value: "Intro message, and new reward" }
      ]
    }
  ]

  const handleSaveAndClose = () => {
    router.push('/')
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
      <div className="flex-1">
        <CampaignHeader 
          campaignTitle={campaignTitle}
          onTitleChange={setCampaignTitle}
        />

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold">Summary</h1>
              <p className="mt-2 text-gray-600">
                You can now publish Campaign #{campaignTitle.split('#')[1]} to a staging or production
                environment. Invite your developers to integrate with Flock's SDK.
              </p>
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

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleSaveAndClose}
              >
                Save and close
              </Button>
              <Button className="flex-1 bg-gray-700 text-white hover:bg-gray-600">
                Invite developers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}