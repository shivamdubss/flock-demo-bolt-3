'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronRight, CheckCircle2, Smartphone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CampaignLayout } from "@/components/campaign-layout"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Template {
  id: string
  name: string
  description?: string
  image: string
  previewImage: string
}

const templates: Template[] = [
  {
    id: "gifts",
    name: "Gifts",
    description: "Oct 2, 2024",
    image: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184695%20(1)-DvhLQIiW7FROdvr4vzqdPABShYal7v.svg",
    previewImage: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184695%20(1)-DvhLQIiW7FROdvr4vzqdPABShYal7v.svg",
  },
  {
    id: "wallet",
    name: "Wallet",
    description: "Oct 2, 2024",
    image: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184696%20(1)-kiAROEwHH21PSFl4mlpMM1x14JklIk.svg",
    previewImage: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184696%20(1)-kiAROEwHH21PSFl4mlpMM1x14JklIk.svg",
  },
  {
    id: "simple",
    name: "Simple",
    description: "Oct 2, 2024",
    image: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184713%20(1)-yl93MKTReDFukQGVJjenQAl4t5aqqA.svg",
    previewImage: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184713%20(1)-yl93MKTReDFukQGVJjenQAl4t5aqqA.svg",
  }
]

export default function HowItLooks() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsModalOpen(true)
  }

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      localStorage.setItem('selectedTemplate', selectedTemplate.id)
      router.push('/campaign-builder/how-it-looks/customize')
    }
  }

  const handleFromScratch = () => {
    localStorage.setItem('selectedTemplate', 'scratch')
    router.push('/campaign-builder/how-it-looks/customize')
  }

  return (
    <CampaignLayout currentStep="how-it-looks">
      <div className="flex-1">

        <div className="overflow-auto">
          <div className="mx-auto max-w-5xl p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Choose a template</h1>
                <p className="mt-2 text-gray-600">
                  Choose a template for your Referral Homepage.
                </p>
              </div>

              <Card className="flex cursor-pointer items-center justify-between p-6 transition-colors hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Request a Template</h3>
                    <p className="text-sm text-gray-600">We'll build any design within ~1 week.</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Card>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {templates.map((template) => (
                  <div key={template.id} className="space-y-2">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.description}</p>
                    <Card 
                      className="cursor-pointer overflow-hidden transition-transform hover:scale-[1.02]"
                      onClick={() => handleTemplateClick(template)}
                    >
                      <div className="aspect-[390/844]">
                        <Image
                          src={template.image}
                          alt={`${template.name} template preview`}
                          width={390}
                          height={844}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </Card>
                  </div>
                ))}

                <div className="space-y-2">
                  <h3 className="font-medium">From Scratch</h3>
                  <p className="text-sm text-gray-500">New</p>
                  <Card 
                    onClick={handleFromScratch}
                    className="flex aspect-[390/844] cursor-pointer items-center justify-center border-2 border-dashed transition-colors hover:bg-gray-50"
                  >
                    <div className="text-center">
                      <p className="text-sm font-medium">Start fresh</p>
                      <p className="mt-1 text-sm text-gray-500">Create your own design</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Preview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[320px] w-[calc(100%-2rem)] sm:w-full bg-gray-900/95 border-0 p-6">
          <div className="bg-white rounded-xl overflow-hidden flex flex-col">
            <DialogHeader className="p-4 space-y-1">
              <DialogTitle className="text-base font-semibold">
                {selectedTemplate?.name}
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                Preview template
              </p>
            </DialogHeader>

            {/* Template Preview */}
            <div className="relative overflow-hidden bg-background border-2 border-gray-200 m-4 rounded-xl">
              <div className="aspect-[390/844] w-full">
                {selectedTemplate && (
                  <Image
                    src={selectedTemplate.previewImage}
                    alt={`${selectedTemplate.name} preview`}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4">
              <Button 
                onClick={handleUseTemplate}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Use Template →
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </CampaignLayout>
  )
}