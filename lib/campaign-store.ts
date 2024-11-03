import { create } from 'zustand'

interface Campaign {
  id: string
  name: string
  status: 'draft' | 'live'
  created: string
  referrals: number
}

interface CampaignStore {
  campaigns: Campaign[]
  campaignName: string
  addCampaign: (name: string) => void
  setCampaignName: (name: string) => void
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [],
  campaignName: '',
  addCampaign: (name) => 
    set((state) => ({
      campaigns: [
        ...state.campaigns,
        {
          id: String(state.campaigns.length + 1),
          name,
          status: 'draft',
          created: new Date().toISOString(),
          referrals: 0
        }
      ],
      campaignName: name
    })),
  setCampaignName: (name) =>
    set(() => ({
      campaignName: name
    }))
}))