import { GenerateRequest } from '../types'

export interface Preset {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  params: Partial<GenerateRequest>
  category: 'quick' | 'professional' | 'custom'
}

export const defaultPresets: Preset[] = [
  {
    id: 'anime-character',
    name: '動漫人物',
    nameEn: 'Anime Character',
    description: '適合生成動漫風格角色',
    descriptionEn: 'Perfect for anime character generation',
    category: 'quick',
    params: {
      model: 'flux',
      width: 832,
      height: 1216,
      quality_mode: 'standard',
      style: 'anime',
      negative_prompt: 'realistic, photo, western cartoon, ugly',
    },
  },
  {
    id: 'landscape-photo',
    name: '風景照片',
    nameEn: 'Landscape Photo',
    description: '專業風景攝影效果',
    descriptionEn: 'Professional landscape photography',
    category: 'professional',
    params: {
      model: 'flux',
      width: 1344,
      height: 768,
      quality_mode: 'ultra',
      style: 'landscape',
      negative_prompt: 'people, portrait, indoor, blur',
    },
  },
  {
    id: 'manga-page',
    name: '漫畫分鏡',
    nameEn: 'Manga Page',
    description: '日本漫畫風格分鏡',
    descriptionEn: 'Japanese manga style panel',
    category: 'quick',
    params: {
      model: 'flux',
      width: 1024,
      height: 1024,
      quality_mode: 'standard',
      style: 'manga',
      negative_prompt: 'color, realistic, photo',
    },
  },
  {
    id: 'cyberpunk-scene',
    name: '賽博龐克場景',
    nameEn: 'Cyberpunk Scene',
    description: '未來主義霓虹風格',
    descriptionEn: 'Futuristic neon style',
    category: 'professional',
    params: {
      model: 'flux',
      width: 1344,
      height: 768,
      quality_mode: 'ultra',
      style: 'cyberpunk',
      negative_prompt: 'natural, pastoral, historical, daylight',
    },
  },
]

// LocalStorage 鍵
const PRESETS_KEY = 'flux-ai-custom-presets'

// 獲取所有預設（包含自定義）
export const getAllPresets = (): Preset[] => {
  const customPresets = getCustomPresets()
  return [...defaultPresets, ...customPresets]
}

// 獲取自定義預設
export const getCustomPresets = (): Preset[] => {
  const stored = localStorage.getItem(PRESETS_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

// 保存自定義預設
export const saveCustomPreset = (preset: Preset): void => {
  const presets = getCustomPresets()
  presets.push(preset)
  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets))
}

// 刪除自定義預設
export const deleteCustomPreset = (id: string): void => {
  const presets = getCustomPresets().filter(p => p.id !== id)
  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets))
}

// 根據 ID 獲取預設
export const getPresetById = (id: string): Preset | undefined => {
  return getAllPresets().find(p => p.id === id)
}