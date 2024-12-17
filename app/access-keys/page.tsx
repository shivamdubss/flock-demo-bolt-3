'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuSub, 
  SidebarMenuSubItem,
  SidebarProvider 
} from "@/components/ui/sidebar"
import { BarChart2, BookOpen, Copy, Eye, EyeOff, Home, Key, Link2, ListChecks } from "lucide-react"

export default function AccessKeysPage() {
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({
    publicKey: false,
    serviceKey: false,
    webhookSecret: false,
  })

  const keys = [
    {
      id: 'publicKey',
      name: 'Public Key',
      value: 'pk_test_51NXwDBHT6fk...8dE00WVawAkXx',
      description: 'This key is safe to use in your web application to setup your integration with Flock Referral SDK.',
      badge: <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Public Key</Badge>
    },
    {
      id: 'serviceKey',
      name: 'Service Key',
      value: 'sk_test_51NXwDBHT6fk...8dE00MKjpQwWt',
      description: 'This key allows you to access Forward REST API. Never share it publicly!',
      badge: <Badge variant="destructive">secret</Badge>
    },
    {
      id: 'webhookSecret',
      name: 'Webhook Secret',
      value: 'whsec_51NXwDBHT6fk...8dE00LKmpRxYz',
      description: 'Use this secret to verify the webhook payloads coming from Flock. Also never share it publicly!',
      badge: <Badge className="bg-gray-100 text-gray-900 hover:bg-gray-100">Webhook Secret</Badge>
    }
  ]

  const toggleVisibility = (keyId: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

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
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="/analytics">
                  <BarChart2 className="h-4 w-4" />
                  Analytics
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenuSub>
              <SidebarMenuItem className="text-gray-500">Dev Setup</SidebarMenuItem>
              <SidebarMenuSubItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 bg-accent text-black" href="/access-keys">
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
                <h1 className="text-2xl font-semibold">Access Keys</h1>
                <p className="text-muted-foreground">API Keys and Secrets that let you access Flock resources</p>
              </div>
            </div>

            <Card className="shadow-sm rounded-md">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">NAME</TableHead>
                      <TableHead>KEY</TableHead>
                      <TableHead>DESCRIPTION</TableHead>
                      <TableHead className="w-[100px]">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell>
                          {key.badge}
                        </TableCell>
                        <TableCell className="font-mono">
                          {showSecrets[key.id] ? key.value : '•'.repeat(40)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {key.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleVisibility(key.id)}
                            >
                              {showSecrets[key.id] ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyToClipboard(key.value)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
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