'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  BarChart2,
  BookOpen,
  Home,
  Key,
  Link2,
  ListChecks,
  Loader2,
} from "lucide-react"
import { useCampaignStore } from "@/lib/campaign-store"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function HomePage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const { campaigns, addCampaign, setCampaignName } = useCampaignStore()

  useEffect(() => {
    setIsReady(true)
  }, [])

  const handleCreateCampaign = async () => {
    setIsCreating(true)
    setIsReady(false)
    const defaultName = `Campaign #${campaigns.length + 1}`
    setCampaignName(defaultName)
    addCampaign(defaultName)
    router.push('/campaign-builder')
  }

  if (isCreating) {
    return <LoadingSpinner isLoading={true} />
  }

  if (!isReady) {
    return null
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
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 bg-accent text-black" href="/">
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
            {campaigns.length === 0 ? (
              <div className="flex min-h-[600px] flex-col items-center justify-center gap-2 p-4 md:gap-0 md:p-6">
                <Image
                  src="https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184716%20(2)-Lj4iJzVzQS8U8dm0jlT368f48hY1az.svg"
                  width={500}
                  height={500}
                  alt="Flock media icons"
                  className="mb-4"
                />
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-600/90"
                  onClick={handleCreateCampaign}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create a campaign'
                  )}
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-semibold">Campaigns</h1>
                    <p className="text-muted-foreground">Manage your referral campaigns</p>
                  </div>
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-600/90"
                    onClick={handleCreateCampaign}
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'New'
                    )}
                  </Button>
                </div>

                <div className="space-y-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NAME</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>CREATED</TableHead>
                        <TableHead className="text-right">REFERRALS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaigns.map((campaign) => (
                        <TableRow 
                          key={campaign.id} 
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => router.push(`/campaign-builder/${campaign.id}`)}
                        >
                          <TableCell>{campaign.name}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={campaign.status === 'live' ? 'success' : 'secondary'}
                              className="capitalize"
                            >
                              {campaign.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(campaign.created).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">{campaign.referrals}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}