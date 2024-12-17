'use client'

import { useState } from 'react'
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Mail, AlertCircle, Webhook } from 'lucide-react'
import { CampaignLayout } from "@/components/campaign-layout"

export default function CommunicationsPage() {
  const [campaignTitle, setCampaignTitle] = useState("Campaign #1")
  const [activeTab, setActiveTab] = useState<'referrer' | 'invitee'>('referrer')
  
  const [referrerRewardEmail, setReferrerRewardEmail] = useState({
    enabled: true,
    subject: "You've earned a reward!",
    body: "Hey {name},\n\nYou've received $10 for referring a friend to Acme Co!\n\nTo redeem your reward, simply log into your account and visit the 'Rewards' section.\n\nThank you for being an amazing part of our community!\n\nBest regards,\nThe Acme Co. Team"
  })

  const [inviteeRewardEmail, setInviteeRewardEmail] = useState({
    enabled: true,
    subject: "Welcome to Acme Co - Here's your reward!",
    body: "Hey {name},\n\nWelcome to Acme Co! As a thank you for joining through our referral program, you've received a $5 credit!\n\nTo use your reward, just log into your new account and you'll see the credit applied automatically.\n\nWe're excited to have you on board!\n\nBest regards,\nThe Acme Co. Team"
  })

  const [invitationMessage, setInvitationMessage] = useState(
    "Hey! I've been using Acme Co and I think you'd love it. They're offering a special $5 credit for new users who sign up with my link. Check it out: {referral_link}\nLet me know if you have any questions!"
  )

  const sendTestEmail = (emailType: string) => {
    // Implement email sending logic here
    console.log(`Sending test email for ${emailType}`)
  }

  const EmailEditor = ({ email, setEmail, type }: { 
    email: typeof referrerRewardEmail, 
    setEmail: (email: typeof referrerRewardEmail) => void,
    type: string 
  }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor={`${type}-enable`} className="text-base font-medium">Enable Email</Label>
        <Switch
          id={`${type}-enable`}
          checked={email.enabled}
          onCheckedChange={(checked) => setEmail({ ...email, enabled: checked })}
        />
      </div>
      {email.enabled ? (
        <>
          <div className="space-y-2">
            <Label htmlFor={`${type}-subject`}>Subject</Label>
            <Input
              id={`${type}-subject`}
              value={email.subject}
              onChange={(e) => setEmail({ ...email, subject: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${type}-body`}>Body</Label>
            <Textarea
              id={`${type}-body`}
              value={email.body}
              onChange={(e) => setEmail({ ...email, body: e.target.value })}
              rows={10}
            />
          </div>
        </>
      ) : (
        <div className="bg-muted p-4 rounded-md">
          <div className="flex items-center space-x-2">
            <Webhook className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Email disabled. Webhook will be triggered instead.</span>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <CampaignLayout currentStep="communications">
      <div className="flex-1">

        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Communications</h1>
              <p className="text-muted-foreground">Configure the communication flows for your referral campaign.</p>
            </div>
            <Link href="/campaign-builder/summary">
              <Button className="bg-emerald-600 hover:bg-emerald-600/90">
                Continue
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="referrer" className="space-y-6" onValueChange={(value) => setActiveTab(value as 'referrer' | 'invitee')}>
            <TabsList>
              <TabsTrigger value="referrer">Referrer Journey</TabsTrigger>
              <TabsTrigger value="invitee">Invitee Journey</TabsTrigger>
            </TabsList>

            <TabsContent value="referrer" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reward Earned Email</CardTitle>
                  <CardDescription>Sent when a referrer earns a reward</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            {referrerRewardEmail.enabled ? 'Edit email content' : 'Configure webhook'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Edit Reward Earned Email</DialogTitle>
                          </DialogHeader>
                          <EmailEditor 
                            email={referrerRewardEmail} 
                            setEmail={setReferrerRewardEmail}
                            type="referrer"
                          />
                          {referrerRewardEmail.enabled && (
                            <div className="flex justify-between items-center mt-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Test email will be sent to your account email
                              </div>
                              <Button onClick={() => sendTestEmail('referrerReward')}>
                                Send Test Email
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invitee" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invitation Message</CardTitle>
                  <CardDescription>Sent when someone is invited to join</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            Edit invitation message
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Edit Invitation Message</DialogTitle>
                          </DialogHeader>
                          <Textarea
                            value={invitationMessage}
                            onChange={(e) => setInvitationMessage(e.target.value)}
                            rows={5}
                          />
                          <p className="text-sm text-muted-foreground mt-2">
                            Use {'{referral_link}'} to insert the user's unique referral link.
                          </p>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reward Earned Email</CardTitle>
                  <CardDescription>Sent when an invitee receives their reward</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            {inviteeRewardEmail.enabled ? 'Edit email content' : 'Configure webhook'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Edit Reward Earned Email</DialogTitle>
                          </DialogHeader>
                          <EmailEditor 
                            email={inviteeRewardEmail} 
                            setEmail={setInviteeRewardEmail}
                            type="invitee"
                          />
                          {inviteeRewardEmail.enabled && (
                            <div className="flex justify-between items-center mt-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Test email will be sent to your account email
                              </div>
                              <Button onClick={() => sendTestEmail('inviteeReward')}>
                                Send Test Email
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CampaignLayout>
  )
} 