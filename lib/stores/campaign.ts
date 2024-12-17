'use client'

import { create } from 'zustand'

interface CampaignStore {
  campaignName: string
  setCampaignName: (name: string) => void
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaignName: 'Campaign #1',
  setCampaignName: (name: string) => set({ campaignName: name }),
})) 