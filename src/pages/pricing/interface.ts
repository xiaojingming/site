import type { VNode } from 'vue'

export interface Feature {
  text: string
  available: boolean
}

export interface PricingPlan {
  title: string
  price: number
  originalPrice?: number
  description: string
  buttonText: string
  buttonType: 'download' | 'purchase'
  showTrafficLabel?: boolean
  features: Feature[]
  clickEvent: () => void
}

export interface GuideStep {
  title: string | (() => VNode)
  content?: string | (() => VNode)
  tips?: string | (() => VNode)
  imageTextPairs?: ImageTextPair[]
}

export interface ImageTextPair {
  imgUrl?: string | (() => VNode)
  text?: string | (() => VNode)
}
