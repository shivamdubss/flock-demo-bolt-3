'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronRight, CheckCircle2, X, ImageIcon, Type, MousePointer, Keyboard, Layers, Plus, Settings, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CampaignHeader } from "@/components/campaign-header"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { CampaignLayout } from "@/components/campaign-layout"
import { PreviewPanel } from "@/components/preview-panel"

interface ComponentType {
  id: string
  name: string
  type: 'nav' | 'text' | 'image' | 'button' | 'stack'
  children?: ComponentType[]
  expanded?: boolean
}

const initialComponents: ComponentType[] = [
  {
    id: 'nav',
    name: 'Nav',
    type: 'stack',
    expanded: true,
    children: [
      { id: 'exit-button', name: 'Exit button', type: 'button' }
    ]
  },
  {
    id: 'body',
    name: 'Body',
    type: 'stack',
    expanded: true,
    children: [
      { id: 'header', name: 'Header', type: 'text' },
      { id: 'subheader', name: 'Subheader', type: 'text' },
      { id: 'main-image', name: 'Image', type: 'image' }
    ]
  },
  {
    id: 'buttons',
    name: 'Buttons',
    type: 'stack',
    expanded: true,
    children: [
      { id: 'referral-code', name: 'Referral code', type: 'button' },
      { id: 'sharing-options', name: 'Sharing options', type: 'button' }
    ]
  }
]

const StackEditor = () => (
  <div className="space-y-6">
    <div className="space-y-4">
      <div>
        <Label>Axis</Label>
        <Select defaultValue="horizontal">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="horizontal">Horizontal</SelectItem>
            <SelectItem value="vertical">Vertical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Vertical</Label>
        <Select defaultValue="center">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="bottom">Bottom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Horizontal</Label>
        <Select defaultValue="left">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Spacing</Label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Slider
              defaultValue={[8]}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>
          <div className="flex w-24 items-center gap-1">
            <Input type="number" defaultValue="8" className="h-8" />
            <span className="text-sm text-gray-500">px</span>
          </div>
        </div>
      </div>

      <div>
        <Label>Wrap</Label>
        <Select defaultValue="nowrap">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nowrap">No wrap</SelectItem>
            <SelectItem value="wrap">Wrap</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Scroll</Label>
        <Select defaultValue="none">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Scroll</SelectItem>
            <SelectItem value="scroll">Scroll</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
)

const TextEditor = () => (
  <div className="space-y-6">
    {/* Text Properties */}
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4" />
          <h3 className="font-medium">Text Properties</h3>
        </div>
      </div>
      
      <div>
        <Label>Text Content</Label>
        <Input type="text" placeholder="Enter text..." className="mt-1.5" />
      </div>

      <div>
        <Label>Font</Label>
        <Select defaultValue="inter">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="roboto">Roboto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Font Size</Label>
        <Select defaultValue="16">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">12px</SelectItem>
            <SelectItem value="14">14px</SelectItem>
            <SelectItem value="16">16px</SelectItem>
            <SelectItem value="18">18px</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Font Weight</Label>
        <Select defaultValue="regular">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Font Color</Label>
        <Input type="text" defaultValue="#1F1F1F" />
      </div>
    </div>

    {/* Container Properties */}
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <h3 className="font-medium">Container Properties</h3>
        </div>
      </div>
      
      <div>
        <Label>Margins</Label>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">Top</Label>
            <div className="flex items-center gap-1">
              <Input type="number" defaultValue="40" />
              <Select defaultValue="px">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="rem">rem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Right</Label>
            <div className="flex items-center gap-1">
              <Input type="number" defaultValue="0" />
              <Select defaultValue="px">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="rem">rem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Bottom</Label>
            <div className="flex items-center gap-1">
              <Input type="number" defaultValue="0" />
              <Select defaultValue="px">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="rem">rem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Left</Label>
            <div className="flex items-center gap-1">
              <Input type="number" defaultValue="0" />
              <Select defaultValue="px">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="rem">rem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label>Paddings</Label>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">Top</Label>
            <div className="flex items-center gap-1">
              <Input type="number" defaultValue="0" />
              <Select defaultValue="px">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="rem">rem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Right</Label>
            <div className="flex items-center gap-1">
              <Input type="number" defaultValue="0" />
              <Select defaultValue="px">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="rem">rem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Bottom</Label>
            <div className="flex items-center gap-1">
              <Input type="number" defaultValue="0" />
              <Select defaultValue="px">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="rem">rem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Left</Label>
            <div className="flex items-center gap-1">
              <Input type="number" defaultValue="0" />
              <Select defaultValue="px">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="rem">rem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label>Borders</Label>
        <div className="mt-1.5 space-y-2">
          <div className="flex items-center gap-2">
            <Input type="number" defaultValue="1" className="w-20" />
            <span className="text-sm text-muted-foreground">px</span>
          </div>
          <Input type="text" defaultValue="#E5E7EB" placeholder="Border color" />
        </div>
      </div>
    </div>
  </div>
)

const ButtonEditor = () => (
  <div className="space-y-4">
    <div>
      <Label>Tap Behaviour</Label>
      <Select defaultValue="copy">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="copy">Copy Code</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="instagram">Instagram</SelectItem>
          <SelectItem value="twitter">Twitter</SelectItem>
          <SelectItem value="tiktok">TikTok</SelectItem>
          <SelectItem value="whatsapp">WhatsApp</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label>Button Margins</Label>
      <div className="mt-1.5 grid grid-cols-4 gap-2">
        <div>
          <Input defaultValue="0" />
          <Select defaultValue="px">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="px">Px</SelectItem>
              <SelectItem value="rem">Rem</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input defaultValue="0" />
          <Select defaultValue="px">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="px">Px</SelectItem>
              <SelectItem value="rem">Rem</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input defaultValue="0" />
          <Select defaultValue="px">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="px">Px</SelectItem>
              <SelectItem value="rem">Rem</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input defaultValue="0" />
          <Select defaultValue="px">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="px">Px</SelectItem>
              <SelectItem value="rem">Rem</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Border Width</Label>
        <div className="mt-1.5 flex items-center gap-2">
          <Input defaultValue="1" />
          <span className="text-sm text-gray-500">Px</span>
        </div>
      </div>
      <div>
        <Label>Border Radius</Label>
        <div className="mt-1.5 flex items-center gap-2">
          <Input defaultValue="8" />
          <span className="text-sm text-gray-500">Px</span>
        </div>
      </div>
    </div>
  </div>
)

const ImageEditor = () => (
  <div className="space-y-4">
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Label>Image Source</Label>
        <span className="text-sm text-muted-foreground">96px × 96px</span>
      </div>
      <div className="relative">
        <Input 
          type="url" 
          placeholder="https://user-content.example.com/image.jpg" 
          className="pr-20"
        />
        <div className="absolute right-1 top-1 flex gap-1">
          <Button variant="secondary" size="icon" className="h-6 w-6">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-6 w-6">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>

    <div>
      <Label>Alt Text</Label>
      <Input type="text" placeholder="Describe this image..." className="mt-1.5" />
    </div>

    <div>
      <Label>Variables</Label>
      <Button 
        variant="outline" 
        className="mt-1.5 w-full justify-start text-muted-foreground"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Variable
      </Button>
    </div>

    <div className="space-y-4">
      <Label>Size</Label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-xs text-muted-foreground">Width</Label>
          <div className="flex items-center gap-1">
            <Input type="number" defaultValue="96" />
            <span className="text-sm text-muted-foreground">px</span>
          </div>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Height</Label>
          <div className="flex items-center gap-1">
            <Input type="number" defaultValue="96" />
            <span className="text-sm text-muted-foreground">px</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <Label>Object Fit</Label>
      <Select defaultValue="cover">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cover">Cover</SelectItem>
          <SelectItem value="contain">Contain</SelectItem>
          <SelectItem value="fill">Fill</SelectItem>
          <SelectItem value="none">None</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
)

export default function Customize() {
  const [campaignTitle, setCampaignTitle] = useState("Campaign #1")
  const [components, setComponents] = useState(initialComponents)
  const [selectedComponent, setSelectedComponent] = useState(initialComponents[0])
  const [selectedView, setSelectedView] = useState("referrer")
  const [showAddContainer, setShowAddContainer] = useState(false)

  // Mock image URLs for different views
  const viewImages = {
    referrer: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184695%20(1)-DvhLQIiW7FROdvr4vzqdPABShYal7v.svg",
    invitee: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184696%20(1)-kiAROEwHH21PSFl4mlpMM1x14JklIk.svg",
    inviteeSuccess: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184713%20(1)-yl93MKTReDFukQGVJjenQAl4t5aqqA.svg"
  }

  const toggleComponent = (id: string) => {
    setComponents(prev => {
      return prev.map(component => {
        if (component.id === id) {
          return { ...component, expanded: !component.expanded }
        }
        if (component.children) {
          return {
            ...component,
            children: component.children.map(child => {
              if (child.id === id) {
                return { ...child, expanded: !child.expanded }
              }
              return child
            })
          }
        }
        return component
      })
    })
  }

  const renderComponentTree = (components: ComponentType[]) => {
    return components.map(component => (
      <div key={component.id} className="space-y-1">
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer",
            selectedComponent?.id === component.id ? "bg-gray-100" : ""
          )}
          onClick={() => setSelectedComponent(component)}
        >
          {component.children && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleComponent(component.id)
              }}
              className="p-0.5"
            >
              {component.expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          {component.type === 'stack' && <Layers className="h-4 w-4" />}
          {component.type === 'text' && <Type className="h-4 w-4" />}
          {component.type === 'image' && <ImageIcon className="h-4 w-4" />}
          {component.type === 'button' && <MousePointer className="h-4 w-4" />}
          <span className="font-medium">{component.name}</span>
        </div>
        {component.children && component.expanded && (
          <div className="ml-6 space-y-1 border-l border-gray-200  pl-2">
            {renderComponentTree(component.children)}
          </div>
        )}
      </div>
    ))
  }

  const renderEditor = () => {
    if (!selectedComponent) return null

    switch (selectedComponent.type) {
      case 'stack':
        return <StackEditor />
      case 'text':
        return <TextEditor />
      case 'button':
        return <ButtonEditor />
      case 'image':
        return <ImageEditor />
      default:
        return <div className="text-sm text-gray-500">Select a component to edit</div>
    }
  }

  return (
    <CampaignLayout currentStep="how-it-looks">
      <div className="grid grid-cols-[363px_1fr_363px] h-[calc(100vh-60px)]">
        {/* Layout Tree */}
        <div className="overflow-y-auto border-r">
          <div className="p-6">
            <div className="mb-6">
              <ToggleGroup
                type="single"
                value={selectedView}
                onValueChange={(value) => {
                  if (value) setSelectedView(value)
                }}
                className="w-full border rounded-lg p-1 bg-gray-50"
              >
                <ToggleGroupItem
                  value="referrer"
                  className="flex-1 rounded-md px-3 py-1.5 text-sm font-medium"
                >
                  Home
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="invitee"
                  className="flex-1 rounded-md px-3 py-1.5 text-sm font-medium"
                >
                  Code Input
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="inviteeSuccess"
                  className="flex-1 rounded-md px-3 py-1.5 text-sm font-medium"
                >
                  Success
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <h2 className="mb-4 text-lg font-semibold">Layout</h2>
            <div className="space-y-1">
              {renderComponentTree(components)}
            </div>
            <Button 
              variant="outline" 
              className="mt-6 w-full justify-center gap-2"
              onClick={() => setShowAddContainer(true)}
            >
              <Plus className="h-4 w-4" />
              Add Container
            </Button>
          </div>
        </div>

        {/* Preview Panel */}
        <PreviewPanel 
          previewImage={viewImages[selectedView as keyof typeof viewImages]}
        />

        {/* Component Editor */}
        <div className="overflow-y-auto border-l">
          <div className="p-6 sticky top-0 bg-white z-10">
            <Link href="/campaign-builder/communications">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-600/90">
                Continue
              </Button>
            </Link>
          </div>
          <div className="px-6 pb-6">
            {renderEditor()}
          </div>
        </div>
      </div>
    </CampaignLayout>
  )
}
