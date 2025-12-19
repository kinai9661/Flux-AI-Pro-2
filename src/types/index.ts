export interface GenerateRequest {
  prompt: string
  model: 'zimage' | 'flux' | 'turbo' | 'kontext'
  width: number
  height: number
  seed?: number
  negative_prompt?: string
  style?: string
  quality_mode?: 'economy' | 'standard' | 'ultra'
  n?: number
  auto_optimize?: boolean
  auto_hd?: boolean
  reference_images?: string[]
}

export interface GenerateResponse {
  created: number
  data: Array<{
    image: string
    model: string
    seed: number
    width: number
    height: number
    quality_mode: string
  }>
  generation_time_ms: number
}

export interface HistoryItem extends GenerateRequest {
  id: string
  timestamp: number
  result_image?: string
  generation_time?: number
}

export interface Style {
  id: string
  name: string
  nameEn: string
  prompt: string
  negativePrompt?: string
  preview?: string
  popular?: boolean
}