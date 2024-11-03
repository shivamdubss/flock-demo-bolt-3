'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronRight, CheckCircle2, X, ImageIcon, Type, MousePointer, Keyboard } from "lucide-react"
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
import { cn } from "@/lib/utils"

interface ComponentType {
  id: string
  name: string
  type: 'nav' | 'text' | 'image' | 'button' | 'container'
  children?: ComponentType[]
  expanded?: boolean
}

const initialComponents: ComponentType[] = [
  {
    id: 'nav',
    name: 'Nav Component',
    type: 'nav',
    expanded: false,
    children: [
      { id: 'header-text-1', name: 'Header Text', type: 'text' },
      { id: 'body-text-1', name: 'Body Text', type: 'text' },
    ]
  },
  {
    id: 'body',
    name: 'Body Component',
    type: 'container',
    expanded: false,
    children: [
      { id: 'header-image', name: 'Header Image', type: 'image' },
      { id: 'header-text-2', name: 'Header Text', type: 'text' },
      { id: 'subheader-text', name: 'Subheader Text', type: 'text' },
    ]
  },
  {
    id: 'referral-code',
    name: 'Referral Code Component',
    type: 'container',
    expanded: false,
  },
  {
    id: 'buttons',
    name: 'Buttons Component',
    type: 'container',
    expanded: false,
    children: [
      { id: 'share-button', name: 'Share Code Button', type: 'button' },
      { id: 'copy-button', name: 'Copy Code Button', type: 'button' },
    ]
  },
]

export default function Customize() {
  const [campaignTitle, setCampaignTitle] = useState("Campaign #1")
  const [components, setComponents] = useState(initialComponents)
  const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>(null)

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
          <span>{component.name}</span>
        </div>
        {component.children && component.expanded && (
          <div className="ml-4">
            {renderComponentTree(component.children)}
          </div>
        )}
      </div>
    ))
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
              Referee journey
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
                src="/placeholder.svg"
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
              <div>
                <Label>Component Type</Label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  <Button variant="outline" className="flex flex-col gap-1 p-3">
                    <ImageIcon className="h-5 w-5" />
                    <span className="text-xs">Image</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col gap-1 p-3">
                    <Type className="h-5 w-5" />
                    <span className="text-xs">Text</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col gap-1 p-3">
                    <MousePointer className="h-5 w-5" />
                    <span className="text-xs">Button</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col gap-1 p-3">
                    <Keyboard className="h-5 w-5" />
                    <span className="text-xs">Input</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Text</Label>
                  <Input className="mt-1.5" placeholder="Copy code" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Font</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="helvetica">Helvetica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Font Color</Label>
                    <Input className="mt-1.5" type="text" defaultValue="#1F1F1F" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Font Size</Label>
                    <Select defaultValue="16">
                      <SelectTrigger className="mt-1.5">
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
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="semibold">Semibold</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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

                <div>
                  <Label>Tap behaviour</Label>
                  <Select defaultValue="share">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="share">Open Share Sheet</SelectItem>
                      <SelectItem value="copy">Copy to Clipboard</SelectItem>
                      <SelectItem value="link">Open Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Link href="/campaign-builder/referrer-journey">
                  <Button className="w-full bg-gray-600 hover:bg-gray-700">
                    Continue
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}