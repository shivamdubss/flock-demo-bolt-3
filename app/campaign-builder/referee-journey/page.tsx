'use client'

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, MessageSquare, Gift, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CampaignHeader } from "@/components/campaign-header"
import { cn } from "@/lib/utils"

interface JourneyStep {
  id: string
  title: string
  subtitle: string
  icon: 'invite' | 'reward'
  config: StepConfig
}

interface StepConfig {
  content: string
}

export default function RefereeJourney() {
  const [campaignTitle, setCampaignTitle] = useState("Campaign #1")
  const [selectedStep, setSelectedStep] = useState<string>('1')
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>([
    {
      id: '1',
      title: 'Invite Message',
      subtitle: 'All users',
      icon: 'invite',
      config: {
        content: '',
      }
    },
    {
      id: '2',
      title: 'New reward',
      subtitle: 'Successful referral',
      icon: 'reward',
      config: {
        content: '',
      }
    }
  ])

  const handleStepClick = (id: string) => {
    setSelectedStep(id)
  }

  const handleConfigChange = (id: string, field: keyof StepConfig, value: string) => {
    setJourneySteps(prev => prev.map(step => 
      step.id === id ? { ...step, config: { ...step.config, [field]: value } } : step
    ))
  }

  const addNewStep = () => {
    const newStep: JourneyStep = {
      id: `${journeySteps.length + 1}`,
      title: 'New Step',
      subtitle: 'Custom action',
      icon: 'invite',
      config: {
        content: '',
      }
    }
    setJourneySteps(prev => [...prev.slice(0, -1), newStep, prev[prev.length - 1]])
  }

  const renderStepConfig = (step: JourneyStep) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{step.title}</h1>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {step.id === '1' && (
        <div>
          <h2 className="text-lg font-semibold">Invite Message</h2>
          <p className="mt-2 text-gray-600">
            The customizable text that accompanies a referral link inviting a Referee to sign up for your product.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label>Content</Label>
          <Textarea
            value={step.config.content}
            onChange={(e) => handleConfigChange(step.id, 'content', e.target.value)}
            placeholder={step.id === '1' 
              ? "Example: Hey Lisa! I'm loving Linear, it's an elegant way to build software that's so much easier to use than project management tools like Jira. If you sign up for Linear using this link you'll get $10!" 
              : "Enter content for this step"}
            className="mt-1.5 min-h-[150px]"
          />
        </div>
      </div>

      <Link href="/campaign-builder/summary">
        <Button className="w-full bg-gray-600 hover:bg-gray-700">
          Next
        </Button>
      </Link>
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
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder/referrer-journey"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Referrer journey
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-gray-100"
              href="#"
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
                      {step.icon === 'invite' ? (
                        <MessageSquare className="h-5 w-5" />
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
            {renderStepConfig(journeySteps.find(step => step.id === selectedStep)!)}
          </div>
        </div>
      </div>
    </div>
  )
}