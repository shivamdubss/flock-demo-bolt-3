'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronRight, CheckCircle2, X, ImageIcon, Type, MousePointer, Keyboard, Layers, Plus, Settings, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CampaignHeader } from "@/components/campaign-header"
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
          <SelectTrigger>
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
          <SelectTrigger>
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
          <SelectTrigger>
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
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nowrap">Don't Wrap</SelectItem>
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
  <div className="space-y-4">
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
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-gray-100"
              href="#"
            >
              How it looks
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder/referrer-journey"
            >
              Referrer journey
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder/referee-journey"
            >
              Invitee journey
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

        <div className="grid grid-cols-[300px_1fr_300px] divide-x">
          {/* Layout Tree */}
          <div className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Layout</h2>
            <div className="space-y-1">
              {renderComponentTree(components)}
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center justify-center p-6">
            <div className="relative aspect-[390/844] w-[300px] overflow-hidden rounded-[38px] bg-white shadow-xl">
              <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-2xl bg-black"></div>
              <Image
                src="https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184695%20(1)-DvhLQIiW7FROdvr4vzqdPABShYal7v.svg"
                alt="Template preview"
                width={300}
                height={650}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Component Editor */}
          <div className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Component Editor</h2>
            <div className="space-y-6">
              {renderEditor()}
              <Link href="/campaign-builder/referrer-journey" className="mt-8 block">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-600/90">
                  Continue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}