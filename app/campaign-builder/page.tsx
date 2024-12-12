'use client'

import * as React from "react"
import { CampaignLayout } from "@/components/campaign-layout"
import { Check, CheckCircle2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function RewardsPage() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [rewardTrigger, setRewardTrigger] = React.useState("new-user")
  const [referrerMethod, setReferrerMethod] = React.useState("stripe")
  const [referrerAmount, setReferrerAmount] = React.useState("10")
  const [inviteeMethod, setInviteeMethod] = React.useState("stripe")
  const [inviteeAmount, setInviteeAmount] = React.useState("5")
  const [customTrigger, setCustomTrigger] = React.useState("")
  const [limitEnabled, setLimitEnabled] = React.useState(false)
  const [rewardLimit, setRewardLimit] = React.useState("100")

  const steps = [
    { name: "Trigger Setup", weight: 1 },
    { name: "Referrer Rewards", weight: 1 },
    { name: "Invitee Rewards", weight: 1 },
  ]

  const ProgressTracker = () => {
    return (
      <div className="w-full space-y-2 mb-6">
        <div className="flex gap-2">
          {steps.map((step, index) => {
            const isCompleted = index + 1 < currentStep
            const isCurrent = index + 1 === currentStep

            return (
              <div key={index} className="flex-1">
                <div
                  className={cn(
                    "h-1 w-full rounded-full mb-2",
                    isCompleted ? "bg-gray-800" :
                    "bg-muted"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <CampaignLayout currentStep="rewards">
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Rewards Configuration</h1>
          <p className="mt-2 text-gray-600">
            Set up your reward strategy by configuring when rewards are triggered and how they're delivered.
          </p>
        </div>

        <ProgressTracker />

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">When should rewards be triggered?</CardTitle>
              <CardDescription>
                Choose the event that will trigger rewards for both referrers and invitees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className={`h-auto w-full flex-col items-start p-4 ${
                    rewardTrigger === "new-user" ? "border-emerald-600 text-emerald-600" : ""
                  }`}
                  onClick={() => setRewardTrigger("new-user")}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-semibold">New User Signup</span>
                    {rewardTrigger === "new-user" && <Check className="h-4 w-4" />}
                  </div>
                  <p className="mt-1 text-left text-sm text-muted-foreground">
                    Reward is triggered when an invited user creates an account
                  </p>
                </Button>
                <Button
                  variant="outline"
                  className={`h-auto w-full flex-col items-start p-4 ${
                    rewardTrigger === "subscription" ? "border-emerald-600 text-emerald-600" : ""
                  }`}
                  onClick={() => setRewardTrigger("subscription")}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-semibold">Subscription Signup</span>
                    {rewardTrigger === "subscription" && <Check className="h-4 w-4" />}
                  </div>
                  <p className="mt-1 text-left text-sm text-muted-foreground">
                    Reward is triggered when an invited user subscribes to a paid plan
                  </p>
                </Button>
                <Button
                  variant="outline"
                  className={`h-auto w-full flex-col items-start p-4 ${
                    rewardTrigger === "custom" ? "border-emerald-600 text-emerald-600" : ""
                  }`}
                  onClick={() => setRewardTrigger("custom")}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-semibold">Custom Event</span>
                    {rewardTrigger === "custom" && <Check className="h-4 w-4" />}
                  </div>
                  <p className="mt-1 text-left text-sm text-muted-foreground">
                    Specify a custom event that will trigger the reward
                  </p>
                </Button>
              </div>
              {rewardTrigger === "custom" && (
                <div className="mt-4">
                  <Label htmlFor="custom-event">Custom Event Name</Label>
                  <Input
                    id="custom-event"
                    type="text"
                    placeholder="e.g., first_purchase"
                    value={customTrigger}
                    onChange={(e) => setCustomTrigger(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={() => setCurrentStep(2)} className="bg-emerald-600 hover:bg-emerald-600/90">Next Step</Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Configure Referrer Rewards</CardTitle>
              <CardDescription>
                Set up how referrers will be rewarded for successful invites
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Reward Method</Label>
                  <Select value={referrerMethod} onValueChange={setReferrerMethod}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe Payment</SelectItem>
                      <SelectItem value="paypal">PayPal Transfer</SelectItem>
                      <SelectItem value="amazon">Amazon Gift Card</SelectItem>
                      <SelectItem value="custom">Custom Reward</SelectItem>
                      <SelectItem value="none">No Reward</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {referrerMethod !== 'none' && (
                  <div>
                    <Label>Reward Amount</Label>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-gray-500">$</span>
                      <Input
                        type="number"
                        value={referrerAmount}
                        onChange={(e) => setReferrerAmount(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="limit-switch"
                        checked={limitEnabled}
                        onCheckedChange={setLimitEnabled}
                      />
                      <Label htmlFor="limit-switch">Enable reward limit</Label>
                    </div>
                  </div>
                  {limitEnabled && (
                    <div className="flex items-center space-x-2">
                      <Label>Maximum rewards per referrer:</Label>
                      <Input
                        type="number"
                        value={rewardLimit}
                        onChange={(e) => setRewardLimit(e.target.value)}
                        className="w-24"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Previous
              </Button>
              <Button onClick={() => setCurrentStep(3)} className="bg-emerald-600 hover:bg-emerald-600/90">Next Step</Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Configure Invitee Rewards</CardTitle>
              <CardDescription>
                Set up how invited users will be rewarded for joining
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Reward Method</Label>
                  <Select value={inviteeMethod} onValueChange={setInviteeMethod}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe Payment</SelectItem>
                      <SelectItem value="paypal">PayPal Transfer</SelectItem>
                      <SelectItem value="amazon">Amazon Gift Card</SelectItem>
                      <SelectItem value="custom">Custom Reward</SelectItem>
                      <SelectItem value="none">No Reward</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {inviteeMethod !== 'none' && (
                  <div>
                    <Label>Reward Amount</Label>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-gray-500">$</span>
                      <Input
                        type="number"
                        value={inviteeAmount}
                        onChange={(e) => setInviteeAmount(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Previous
              </Button>
              <Link href="/campaign-builder/how-it-looks">
                <Button className="bg-emerald-600 hover:bg-emerald-600/90">Continue</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </CampaignLayout>
  )
}