'use client'

import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { CampaignHeader } from "@/components/campaign-header"
import { useCampaignStore } from "@/lib/stores/campaign"

interface CampaignLayoutProps {
  children: React.ReactNode
  currentStep: 'rewards' | 'how-it-looks' | 'communications' | 'summary'
}

export function CampaignLayout({
  children,
  currentStep
}: CampaignLayoutProps) {
  const { campaignName, setCampaignName } = useCampaignStore()

  const steps = [
    { id: 'rewards', label: 'Rewards', href: '/campaign-builder' },
    { id: 'how-it-looks', label: 'How it looks', href: '/campaign-builder/how-it-looks' },
    { id: 'communications', label: 'Communications', href: '/campaign-builder/communications' },
    { id: 'summary', label: 'Summary', href: '/campaign-builder/summary' }
  ]

  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className="flex flex-col h-screen">
      <CampaignHeader 
        campaignTitle={campaignName}
        onTitleChange={setCampaignName}
        className="border-b"
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r bg-gray-50/40">
          <nav className="space-y-2 p-4">
            <div className="space-y-1">
              {steps.map((step, index) => {
                const isCompleted = currentStepIndex > index
                const isCurrent = step.id === currentStep

                return (
                  <Link
                    key={step.id}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 ${
                      isCurrent ? 'font-medium text-emerald-600' : 'text-gray-600'
                    }`}
                    href={step.href}
                  >
                    {isCompleted && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                    {step.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}