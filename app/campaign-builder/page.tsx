'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CampaignLayout } from "@/components/campaign-layout"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface PayoutConfig {
  method: 'stripe' | 'paypal' | 'amazon' | 'none'
  amount?: string
  currency?: string
  limit?: string
  discountPercent?: string
  discountDuration?: string
  discountLimit?: string
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
      selected ? "bg-[#4B4B4B] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
    )}
  >
    {children}
  </button>
)

export default function RewardsPage() {
  const [rewardTrigger, setRewardTrigger] = useState<'new-user' | 'subscription' | 'custom'>('new-user')
  const [customEventName, setCustomEventName] = useState("")
  const [referrerPayout, setReferrerPayout] = useState<PayoutConfig>({ method: 'none' })
  const [inviteePayout, setInviteePayout] = useState<PayoutConfig>({ method: 'none' })

  const currencies = ['USD', 'EUR', 'GBP', 'AUD', 'CAD']

  const renderPayoutFields = (config: PayoutConfig, isInvitee: boolean) => {
    if (config.method === 'none') return null

    if (config.method === 'stripe') {
      return (
        <div className="mt-4 space-y-4">
          <div>
            <Label>Discount %</Label>
            <Input
              type="number"
              placeholder="20"
              value={config.discountPercent}
              onChange={(e) => {
                if (isInvitee) {
                  setInviteePayout({ ...config, discountPercent: e.target.value })
                } else {
                  setReferrerPayout({ ...config, discountPercent: e.target.value })
                }
              }}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Discount Duration (months)</Label>
            <Input
              type="number"
              placeholder="3"
              value={config.discountDuration}
              onChange={(e) => {
                if (isInvitee) {
                  setInviteePayout({ ...config, discountDuration: e.target.value })
                } else {
                  setReferrerPayout({ ...config, discountDuration: e.target.value })
                }
              }}
              className="mt-1.5"
            />
          </div>
          {!isInvitee && (
            <div>
              <Label>Discount Limit</Label>
              <Input
                type="number"
                placeholder="5"
                value={config.discountLimit}
                onChange={(e) => {
                  setReferrerPayout({ ...config, discountLimit: e.target.value })
                }}
                className="mt-1.5"
              />
            </div>
          )}
        </div>
      )
    }

    if (config.method === 'paypal' || config.method === 'amazon') {
      return (
        <div className="mt-4 space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label>One-time Payout</Label>
              <Input
                type="number"
                placeholder="75"
                value={config.amount}
                onChange={(e) => {
                  if (isInvitee) {
                    setInviteePayout({ ...config, amount: e.target.value })
                  } else {
                    setReferrerPayout({ ...config, amount: e.target.value })
                  }
                }}
                className="mt-1.5"
              />
            </div>
            <div className="w-24">
              <Label>&nbsp;</Label>
              <Select
                value={config.currency}
                onValueChange={(value) => {
                  if (isInvitee) {
                    setInviteePayout({ ...config, currency: value })
                  } else {
                    setReferrerPayout({ ...config, currency: value })
                  }
                }}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Payout Limit</Label>
            <Input
              type="number"
              placeholder="10"
              value={config.limit}
              onChange={(e) => {
                if (isInvitee) {
                  setInviteePayout({ ...config, limit: e.target.value })
                } else {
                  setReferrerPayout({ ...config, limit: e.target.value })
                }
              }}
              className="mt-1.5"
            />
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <CampaignLayout currentStep="rewards">
      <div className="relative mx-auto max-w-3xl p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Rewards</h1>
            <p className="mt-2 text-gray-600">
              Configure your reward strategy - choose when rewards are triggered and how they're delivered to both referrers and their friends.
            </p>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium">Reward Trigger</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <TriggerButton
                    value="new-user"
                    selected={rewardTrigger === 'new-user'}
                    onClick={() => setRewardTrigger('new-user')}
                  >
                    New User Signup
                  </TriggerButton>
                  <TriggerButton
                    value="subscription"
                    selected={rewardTrigger === 'subscription'}
                    onClick={() => setRewardTrigger('subscription')}
                  >
                    Subscription Signup
                  </TriggerButton>
                  <TriggerButton
                    value="custom"
                    selected={rewardTrigger === 'custom'}
                    onClick={() => setRewardTrigger('custom')}
                  >
                    Custom
                  </TriggerButton>
                </div>
                {rewardTrigger === 'custom' && (
                  <div className="mt-4">
                    <Label>Custom Event Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter custom event name"
                      value={customEventName}
                      onChange={(e) => setCustomEventName(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                )}
              </div>

              <div className="h-px bg-gray-200" />

              <div>
                <h2 className="text-lg font-medium">Referrer Reward</h2>
                <div className="mt-4">
                  <Label className="text-sm text-gray-600">Payout Method</Label>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <TriggerButton
                      value="stripe"
                      selected={referrerPayout.method === 'stripe'}
                      onClick={() => setReferrerPayout({ method: 'stripe' })}
                    >
                      Stripe
                    </TriggerButton>
                    <TriggerButton
                      value="paypal"
                      selected={referrerPayout.method === 'paypal'}
                      onClick={() => setReferrerPayout({ method: 'paypal' })}
                    >
                      PayPal
                    </TriggerButton>
                    <TriggerButton
                      value="amazon"
                      selected={referrerPayout.method === 'amazon'}
                      onClick={() => setReferrerPayout({ method: 'amazon' })}
                    >
                      Amazon Gift Card
                    </TriggerButton>
                    <TriggerButton
                      value="none"
                      selected={referrerPayout.method === 'none'}
                      onClick={() => setReferrerPayout({ method: 'none' })}
                    >
                      None
                    </TriggerButton>
                  </div>
                  {renderPayoutFields(referrerPayout, false)}
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              <div>
                <h2 className="text-lg font-medium">Invitee Reward</h2>
                <div className="mt-4">
                  <Label className="text-sm text-gray-600">Payout Method</Label>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <TriggerButton
                      value="stripe"
                      selected={inviteePayout.method === 'stripe'}
                      onClick={() => setInviteePayout({ method: 'stripe' })}
                    >
                      Stripe
                    </TriggerButton>
                    <TriggerButton
                      value="paypal"
                      selected={inviteePayout.method === 'paypal'}
                      onClick={() => setInviteePayout({ method: 'paypal' })}
                    >
                      PayPal
                    </TriggerButton>
                    <TriggerButton
                      value="amazon"
                      selected={inviteePayout.method === 'amazon'}
                      onClick={() => setInviteePayout({ method: 'amazon' })}
                    >
                      Amazon Gift Card
                    </TriggerButton>
                    <TriggerButton
                      value="none"
                      selected={inviteePayout.method === 'none'}
                      onClick={() => setInviteePayout({ method: 'none' })}
                    >
                      None
                    </TriggerButton>
                  </div>
                  {renderPayoutFields(inviteePayout, true)}
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Link href="/campaign-builder/how-it-looks">
              <Button className="bg-gray-600 hover:bg-gray-700">Next</Button>
            </Link>
          </div>
        </div>
      </div>
    </CampaignLayout>
  )
}