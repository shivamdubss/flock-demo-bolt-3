'use client'

import React, { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart2, BookOpen, Download, Home, Key, Link2, ListChecks, Plus } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function ReferralDashboard() {
  const [campaign, setCampaign] = useState('Campaign #1')
  const [timeRange, setTimeRange] = useState('3m')

  const sharesOverTime = [
    { month: 'Jan', shares: 800 },
    { month: 'Feb', shares: 950 },
    { month: 'Mar', shares: 890 },
    { month: 'Apr', shares: 1100 },
    { month: 'May', shares: 1250 },
    { month: 'Jun', shares: 1400 },
    { month: 'Jul', shares: 1300 },
    { month: 'Aug', shares: 1500 },
    { month: 'Sep', shares: 1600 },
    { month: 'Oct', shares: 1450 },
    { month: 'Nov', shares: 1700 },
    { month: 'Dec', shares: 1800 }
  ]

  const referrerPercentage = [
    { month: 'Jan', percentage: 12.5 },
    { month: 'Feb', percentage: 13.2 },
    { month: 'Mar', percentage: 14.1 },
    { month: 'Apr', percentage: 14.8 },
    { month: 'May', percentage: 15.5 },
    { month: 'Jun', percentage: 16.2 },
    { month: 'Jul', percentage: 16.8 },
    { month: 'Aug', percentage: 17.5 },
    { month: 'Sep', percentage: 18.1 },
    { month: 'Oct', percentage: 18.7 },
    { month: 'Nov', percentage: 19.3 },
    { month: 'Dec', percentage: 20.0 }
  ]

  const avgSharesPerUser = [
    { month: 'Jan', average: 2.1 },
    { month: 'Feb', average: 2.3 },
    { month: 'Mar', average: 2.4 },
    { month: 'Apr', average: 2.6 },
    { month: 'May', average: 2.7 },
    { month: 'Jun', average: 2.9 },
    { month: 'Jul', average: 3.0 },
    { month: 'Aug', average: 3.2 },
    { month: 'Sep', average: 3.3 },
    { month: 'Oct', average: 3.4 },
    { month: 'Nov', average: 3.5 },
    { month: 'Dec', average: 3.6 }
  ]

  const successfulShares = [
    { month: 'Jan', successful: 350 },
    { month: 'Feb', successful: 420 },
    { month: 'Mar', successful: 480 },
    { month: 'Apr', successful: 550 },
    { month: 'May', successful: 620 },
    { month: 'Jun', successful: 700 },
    { month: 'Jul', successful: 750 },
    { month: 'Aug', successful: 820 },
    { month: 'Sep', successful: 900 },
    { month: 'Oct', successful: 950 },
    { month: 'Nov', successful: 1000 },
    { month: 'Dec', successful: 1100 }
  ]

  const conversionData = [
    { stage: 'Shares', value: 3500, dropoff: '0%' },
    { stage: 'Link Clicks', value: 2800, dropoff: '-20%' },
    { stage: 'Sign Ups', value: 1800, dropoff: '-36%' },
    { stage: 'Activations', value: 1525, dropoff: '-15%' }
  ]

  const rawData = [
    { timestamp: '3/1/2024, 9:15:00 AM', referrerId: 'USR001', inviteeId: 'INV001', event: 'Share', campaignId: 'CAMP001' },
    { timestamp: '3/1/2024, 9:15:00 AM', referrerId: 'USR001', inviteeId: 'INV002', event: 'Link Click', campaignId: 'CAMP001' },
    { timestamp: '3/1/2024, 9:15:00 AM', referrerId: 'USR002', inviteeId: 'INV003', event: 'Sign Up', campaignId: 'CAMP002' },
  ]

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
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 bg-accent text-black" href="/analytics">
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
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="/integrations">
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
                <h1 className="text-2xl font-semibold">Analytics</h1>
                <p className="text-muted-foreground">Track your referral program performance</p>
              </div>
              <div className="flex space-x-4">
                <Select value={campaign} onValueChange={setCampaign}>
                  <SelectTrigger className="w-48 border rounded-lg">
                    <SelectValue placeholder="Select Campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Campaign #1">Campaign #1</SelectItem>
                    <SelectItem value="Campaign #2">Campaign #2</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-64 border rounded-lg">
                    <SelectValue placeholder="Select Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">Last Month by Day</SelectItem>
                    <SelectItem value="3m">Last 3 Months by Week</SelectItem>
                    <SelectItem value="12m">Last 12 Months by Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-sm rounded-md">
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">Successful Referrals</h3>
                    <div className="flex items-baseline space-x-3">
                      <span className="text-4xl font-bold">1,525</span>
                      <span className="text-emerald-600">+20 this week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm rounded-md">
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">Total Shares</h3>
                    <div className="flex items-baseline space-x-3">
                      <span className="text-4xl font-bold">3,500</span>
                      <span className="text-emerald-600">+50 this week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Sharing</h2>
              <div className="space-y-6">
                <Card className="shadow-sm rounded-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Total Shares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sharesOverTime}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            content={({ active, payload }) => {
                              if (!active || !payload || !payload[0]) return null
                              return (
                                <div className="bg-background border rounded-lg shadow-sm p-2">
                                  <p className="font-medium">{payload[0].payload.shares} shares</p>
                                </div>
                              )
                            }}
                          />
                          <Bar dataKey="shares" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="shadow-sm rounded-md">
                    <CardHeader>
                      <CardTitle className="text-lg">% of Users Who Share</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={referrerPercentage}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip 
                              content={({ active, payload }) => {
                                if (!active || !payload?.length) return null
                                return (
                                  <div className="bg-background border rounded-lg shadow-sm p-2">
                                    <p className="font-medium">{payload[0].value}%</p>
                                  </div>
                                )
                              }}
                            />
                            <Bar dataKey="percentage" fill="#6366f1" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm rounded-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Average Shares per User</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={avgSharesPerUser}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip 
                              content={({ active, payload }) => {
                                if (!active || !payload?.length) return null
                                return (
                                  <div className="bg-background border rounded-lg shadow-sm p-2">
                                    <p className="font-medium">{payload[0].payload.average} shares per user</p>
                                  </div>
                                )
                              }}
                            />
                            <Bar dataKey="average" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Conversions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-sm rounded-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Activation Funnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={conversionData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="stage" width={100} />
                          <Tooltip 
                            content={({ active, payload }) => {
                              if (!active || !payload || !payload[0]) return null
                              const data = payload[0].payload
                              if (!data) return null
                              return (
                                <div className="bg-background p-2 border rounded-lg shadow-sm">
                                  <div className="font-medium">{data.stage}</div>
                                  <div>Count: {data.value}</div>
                                  <div>Drop-off: {data.dropoff}</div>
                                </div>
                              )
                            }}
                          />
                          <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm rounded-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Successful Referrals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={successfulShares}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            content={({ active, payload }) => {
                              if (!active || !payload?.length) return null
                              return (
                                <div className="bg-background border rounded-lg shadow-sm p-2">
                                  <p className="font-medium">{payload[0].payload.successful} referrals</p>
                                </div>
                              )
                            }}
                          />
                          <Bar dataKey="successful" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Customers</h2>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <p className="text-muted-foreground">
                List of all actives users who have been registered with your Referral Program
              </p>
              <Card className="shadow-sm rounded-md">
                <CardContent className="p-0">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="px-6 py-3">Created</th>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Email</th>
                          <th className="px-6 py-3">User ID</th>
                          <th className="px-6 py-3">Referral Code</th>
                          <th className="px-6 py-3">Referred By</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-6 py-8 text-center text-muted-foreground" colSpan={6}>
                            Add customers manually or in your code to get started.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between border-t px-6 py-3">
                    <Button variant="ghost" disabled>
                      Previous
                    </Button>
                    <div>1</div>
                    <Button variant="ghost" disabled>
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}             