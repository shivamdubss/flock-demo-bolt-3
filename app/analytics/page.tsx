'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Download, BarChart2, Home, Key, Link2, ListChecks } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

interface BarChartProps {
  data: number[]
  height?: number
  color?: string
}

function BarChart({ data, height = 150, color = "#10B981" }: BarChartProps) {
  const maxValue = Math.max(...data)
  
  return (
    <div className="flex h-[150px] items-end gap-2">
      {data.map((value, index) => (
        <div
          key={index}
          className="w-full"
          style={{
            height: `${(value / maxValue) * height}px`,
          }}
        >
          <div
            className="w-full rounded-sm transition-all hover:opacity-80"
            style={{ backgroundColor: color, height: '100%' }}
          />
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const chartData = [100, 80, 90, 70, 100, 120, 90, 80, 90, 70]
  
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
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="#">
                  <Key className="h-4 w-4" />
                  Access Keys
                </Link>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="#">
                  <Link2 className="h-4 w-4" />
                  Integrations
                </Link>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
            <SidebarMenuSub>
              <SidebarMenuItem className="text-gray-500">Resources</SidebarMenuItem>
              <SidebarMenuSubItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="#">
                  <ListChecks className="h-4 w-4" />
                  Launch Checklist
                </Link>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Analytics</h2>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Tabs defaultValue="referrer" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="referrer" className="flex-1">Referrer</TabsTrigger>
                    <TabsTrigger value="referee" className="flex-1">Referee</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select defaultValue="campaign1">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campaign1">Campaign #1</SelectItem>
                    <SelectItem value="campaign2">Campaign #2</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex-1" />

                <Select defaultValue="6months">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">Last 6 Months by Week</SelectItem>
                    <SelectItem value="3months">Last 3 Months by Week</SelectItem>
                    <SelectItem value="1month">Last Month by Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Referral Visitors All Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3,500</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="text-emerald-500">+50</span>
                      <span className="ml-1">this week</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Sharers All Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,525</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="text-emerald-500">+20</span>
                      <span className="ml-1">this week</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Monthly Referral Visitors</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Referrers who opened the widget at least once
                    </p>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={chartData} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Monthly Active Sharers</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Users who shared their referral link
                    </p>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={chartData} color="#6366F1" />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Active Referrers</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Referrer ID</TableHead>
                        <TableHead className="text-right">Referee Views</TableHead>
                        <TableHead className="text-right">Sign Ups</TableHead>
                        <TableHead className="text-right">Rewards ($)</TableHead>
                        <TableHead className="text-right">Currency</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-mono">1ba31a98...</TableCell>
                          <TableCell className="text-right">310</TableCell>
                          <TableCell className="text-right">27</TableCell>
                          <TableCell className="text-right">100</TableCell>
                          <TableCell className="text-right">USD</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}