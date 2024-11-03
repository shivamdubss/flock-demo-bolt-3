'use client'

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, Mail, Gift, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CampaignHeader } from "@/components/campaign-header"
import { cn } from "@/lib/utils"

interface JourneyStep {
  id: string
  title: string
  subtitle: string
  icon: 'email' | 'reward'
  config: EmailConfig
}

interface EmailConfig {
  trigger: 'new-user' | 'first-share' | 'custom'
  subject: string
  body: string
  buttonUrl: string
  customTrigger?: string
}

interface TriggerButtonProps {
  value: string
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}

const TriggerButton = ({ value, selected, onClick, children }: TriggerButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-full px-6 py-2.5 text-sm font-medium transition-colors",
      selected ? "bg-[#4B4B4B] text-white" : "text-gray-600 hover:bg-gray-100"
    )}
  >
    {children}
  </button>
)

export default function ReferrerJourney() {
  const [campaignTitle, setCampaignTitle] = useState("Campaign #1")
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>([
    {
      id: '1',
      title: 'Launch email',
      subtitle: 'New user sign up',
      icon: 'email',
      config: {
        trigger: 'new-user',
        subject: '',
        body: '',
        buttonUrl: '',
      }
    },
    {
      id: '2',
      title: 'First share',
      subtitle: 'Users who shares >1',
      icon: 'email',
      config: {
        trigger: 'first-share',
        subject: '',
        body: '',
        buttonUrl: '',
      }
    },
    {
      id: '3',
      title: 'New reward',
      subtitle: 'Successful referral',
      icon: 'reward',
      config: {
        trigger: 'custom',
        subject: '',
        body: '',
        buttonUrl: '',
      }
    }
  ])

  const handleStepClick = (id: string) => {
    setSelectedStep(id === selectedStep ? null : id)
  }

  const handleConfigChange = (id: string, field: keyof EmailConfig, value: string) => {
    setJourneySteps(prev => prev.map(step => 
      step.id === id ? { 
        ...step, 
        config: { 
          ...step.config, 
          [field]: value,
          ...(field === 'trigger' && value !== 'custom' ? { customTrigger: undefined } : {})
        } 
      } : step
    ))
  }

  const addNewStep = () => {
    const newStep: JourneyStep = {
      id: `${journeySteps.length + 1}`,
      title: 'New Step',
      subtitle: 'Custom action',
      icon: 'email',
      config: {
        trigger: 'custom',
        subject: '',
        body: '',
        buttonUrl: '',
      }
    }
    setJourneySteps(prev => [...prev.slice(0, -1), newStep, prev[prev.length - 1]])
  }

  const renderInstructionsPanel = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Journey Builder</h1>
        <p className="mt-2 text-gray-600">
          Build a journey that gets Referrers excited about sharing your product with their network.
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-medium">This visual builder lets you:</p>
        <ol className="list-decimal space-y-3 pl-4">
          <li>
            Design a seamless flow: Create a series of touchpoints that nurture Referrers from initial awareness to active participation.
          </li>
          <li>
            Configure triggers: Choose when and how each step of the journey is activated, ensuring timely and relevant communication.
          </li>
          <li>
            Tailor the messaging: Personalize the Subject and Body copy of each message to resonate with your audience and drive action.
          </li>
        </ol>
      </div>

      <p className="text-gray-600">
        Click on each step to customize its details, and use the '+' button to add new steps.
      </p>

      <Button 
        className="w-full bg-gray-600 hover:bg-gray-700"
        onClick={() => setSelectedStep('1')}
      >
        Edit Launch Email
      </Button>
    </div>
  )

  const renderEmailConfig = (step: JourneyStep) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{step.title}</h1>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Email Trigger</Label>
          <div className="flex flex-wrap gap-2">
            <TriggerButton
              value="new-user"
              selected={step.config.trigger === 'new-user'}
              onClick={() => handleConfigChange(step.id, 'trigger', 'new-user')}
            >
              New User Signup
            </TriggerButton>
            <TriggerButton
              value="first-share"
              selected={step.config.trigger === 'first-share'}
              onClick={() => handleConfigChange(step.id, 'trigger', 'first-share')}
            >
              First Referral Share
            </TriggerButton>
            <TriggerButton
              value="custom"
              selected={step.config.trigger === 'custom'}
              onClick={() => handleConfigChange(step.id, 'trigger', 'custom')}
            >
              Custom
            </TriggerButton>
          </div>
          {step.config.trigger === 'custom' && (
            <Input
              value={step.config.customTrigger || ''}
              onChange={(e) => handleConfigChange(step.id, 'customTrigger', e.target.value)}
              placeholder="Enter custom trigger name"
              className="mt-2"
            />
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label>Subject</Label>
            <Input
              value={step.config.subject}
              onChange={(e) => handleConfigChange(step.id, 'subject', e.target.value)}
              placeholder="Share & get ($X) per successful referral"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label>Body</Label>
            <Textarea
              value={step.config.body}
              onChange={(e) => handleConfigChange(step.id, 'body', e.target.value)}
              placeholder="Invite your friends and you'll get ($X) every time your friend {signs up}. Your friend will get ($Y). Here is your referral code: {ABC}. Terms apply."
              className="mt-1.5 min-h-[100px]"
            />
          </div>

          <div>
            <Label>Button destination</Label>
            <Input
              value={step.config.buttonUrl}
              onChange={(e) => handleConfigChange(step.id, 'buttonUrl', e.target.value)}
              placeholder="linear.com/referrals/payouts/PInB0B1tNAnm"
              className="mt-1.5"
            />
          </div>
        </div>

        <Link href="/campaign-builder/referee-journey">
          <Button className="w-full bg-gray-600 hover:bg-gray-700">
            Next
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-gray-50/40">
        <nav className="space-y-2 p-4">
          <div className="space-y-1">
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Rewards
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder/how-it-looks"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              How it looks
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-gray-100"
              href="#"
            >
              Referrer journey
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder/referee-journey"
            >
              Referee journey
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder/summary"
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

        <div className="grid grid-cols-[1fr_400px] divide-x">
          {/* Journey Steps */}
          <div className="flex items-center justify-center p-12">
            <div className="space-y-4">
              {journeySteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex w-[300px] cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors",
                      selectedStep === step.id ? "border-emerald-600 bg-emerald-50" : "border-gray-200 bg-white hover:border-gray-300"
                    )}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white">
                      {step.icon === 'email' ? (
                        <Mail className="h-5 w-5" />
                      ) : (
                        <Gift className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{step.title}</div>
                      <div className="text-sm text-gray-500">{step.subtitle}</div>
                    </div>
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div className="my-2 h-4 w-px bg-gray-200"></div>
                  )}
                </div>
              ))}
              <div className="flex justify-center pt-2">
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-lg" onClick={addNewStep}>
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-6">
            {selectedStep 
              ? renderEmailConfig(journeySteps.find(step => step.id === selectedStep)!)
              : renderInstructionsPanel()}
          </div>
        </div>
      </div>
    </div>
  )
}