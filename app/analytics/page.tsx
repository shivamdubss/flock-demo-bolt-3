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
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts'

const BarChart = ({ 
  data,
  index,
  categories,
  colors,
  yAxisWidth = 48,
  height = 300,
  valueFormatter,
  showGridLines = true,
  showLegend = false,
  className
}) => {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          {showGridLines && (
            <CartesianGrid 
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
          )}
          <XAxis 
            dataKey={index}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="#6B7280"
          />
          <YAxis
            width={yAxisWidth}
            axisLine={false}
            tickLine={false}
            tickFormatter={valueFormatter}
            fontSize={12}
            stroke="#6B7280"
          />
          <Tooltip
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-md">
                  <div className="font-medium">{label}</div>
                  {payload.map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      {valueFormatter ? valueFormatter(item.value) : item.value}
                    </div>
                  ))}
                </div>
              );
            }}
          />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[index]}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function AnalyticsPage() {
  const [view, setView] = React.useState<'referrer' | 'invitee'>('referrer')

  const referrerData = {
    visitors: {
      total: 3500,
      weekly: 50,
      label: "Referral Visitors All Time"
    },
    sharers: {
      total: 1525,
      weekly: 20,
      label: "Sharers All Time"
    },
    monthlyChart: {
      title: "Monthly Referral Visitors",
      description: "Referrers who opened the widget at least once",
      data: [
        { name: 'Jan', value: 100 },
        { name: 'Feb', value: 80 },
        { name: 'Mar', value: 90 },
        { name: 'Apr', value: 70 },
        { name: 'May', value: 100 },
        { name: 'Jun', value: 120 },
        { name: 'Jul', value: 90 },
        { name: 'Aug', value: 80 },
        { name: 'Sep', value: 90 },
        { name: 'Oct', value: 70 },
        { name: 'Nov', value: 100 },
        { name: 'Dec', value: 110 },
      ]
    },
    activeChart: {
      title: "Monthly Active Sharers",
      description: "Users who shared their referral link",
      data: [
        { name: 'Jan', value: 80 },
        { name: 'Feb', value: 90 },
        { name: 'Mar', value: 100 },
        { name: 'Apr', value: 110 },
        { name: 'May', value: 90 },
        { name: 'Jun', value: 100 },
        { name: 'Jul', value: 120 },
        { name: 'Aug', value: 100 },
        { name: 'Sep', value: 110 },
        { name: 'Oct', value: 90 },
        { name: 'Nov', value: 95 },
        { name: 'Dec', value: 105 },
      ]
    },
    tableTitle: "Active Referrers",
    tableHeaders: ["Referrer ID", "Referee Views", "Sign Ups", "Rewards ($)", "Currency"]
  }

  const inviteeData = {
    visitors: {
      total: 2800,
      weekly: 40,
      label: "Invitee Visits All Time"
    },
    sharers: {
      total: 980,
      weekly: 15,
      label: "Converted Invitees All Time"
    },
    monthlyChart: {
      title: "Monthly Invitee Visits",
      description: "Invitees who clicked on a referral link",
      data: [
        { name: 'Jan', value: 85 },
        { name: 'Feb', value: 95 },
        { name: 'Mar', value: 110 },
        { name: 'Apr', value: 95 },
        { name: 'May', value: 120 },
        { name: 'Jun', value: 140 },
        { name: 'Jul', value: 125 },
        { name: 'Aug', value: 115 },
        { name: 'Sep', value: 130 },
        { name: 'Oct', value: 110 },
        { name: 'Nov', value: 125 },
        { name: 'Dec', value: 135 },
      ]
    },
    activeChart: {
      title: "Monthly Converted Invitees",
      description: "Invitees who signed up through a referral",
      data: [
        { name: 'Jan', value: 65 },
        { name: 'Feb', value: 75 },
        { name: 'Mar', value: 85 },
        { name: 'Apr', value: 95 },
        { name: 'May', value: 75 },
        { name: 'Jun', value: 85 },
        { name: 'Jul', value: 105 },
        { name: 'Aug', value: 85 },
        { name: 'Sep', value: 95 },
        { name: 'Oct', value: 75 },
        { name: 'Nov', value: 80 },
        { name: 'Dec', value: 90 },
      ]
    },
    tableTitle: "Recent Invitees",
    tableHeaders: ["Invitee ID", "Referrer", "Sign Up Date", "Reward Claimed", "Currency"]
  }

  const currentData = view === 'referrer' ? referrerData : inviteeData

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
            {/* Analytics Header */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Analytics</h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Tabs value={view} onValueChange={(value) => setView(value as 'referrer' | 'invitee')} className="w-[400px]">
                    <TabsList>
                      <TabsTrigger value="referrer" className="flex-1">Referrer</TabsTrigger>
                      <TabsTrigger value="invitee" className="flex-1">Invitee</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex items-center gap-4">
                  <Select defaultValue="campaign1">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="campaign1">Campaign #1</SelectItem>
                      <SelectItem value="campaign2">Campaign #2</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="6months">
                    <SelectTrigger className="w-[240px]">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6months">Last 6 Months by Week</SelectItem>
                      <SelectItem value="3months">Last 3 Months by Week</SelectItem>
                      <SelectItem value="1month">Last Month by Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {currentData.visitors.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentData.visitors.total.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="text-emerald-500">+{currentData.visitors.weekly}</span>
                    <span className="ml-1">this week</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {currentData.sharers.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentData.sharers.total.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="text-emerald-500">+{currentData.sharers.weekly}</span>
                    <span className="ml-1">this week</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">{currentData.monthlyChart.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {currentData.monthlyChart.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={currentData.monthlyChart.data}
                    index="name"
                    categories={["value"]}
                    colors={["#10B981"]}
                    height={300}
                    valueFormatter={(value) => `${value}`}
                    showGridLines={true}
                    className="h-[300px]"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">{currentData.activeChart.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {currentData.activeChart.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={currentData.activeChart.data}
                    index="name"
                    categories={["value"]}
                    colors={["#6366F1"]}
                    height={300}
                    valueFormatter={(value) => `${value}`}
                    showGridLines={true}
                    className="h-[300px]"
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">{currentData.tableTitle}</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {currentData.tableHeaders.map((header, index) => (
                        <TableHead key={index} className={index > 0 ? "text-right" : ""}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-mono">{view === 'referrer' ? '1ba31a98...' : '2cb42b87...'}</TableCell>
                        <TableCell className="text-right">{view === 'referrer' ? '310' : 'John Doe'}</TableCell>
                        <TableCell className="text-right">{view === 'referrer' ? '27' : '2023-11-15'}</TableCell>
                        <TableCell className="text-right">100</TableCell>
                        <TableCell className="text-right">USD</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}             