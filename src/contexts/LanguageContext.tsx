import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'zh-TW' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // 初始化语言：LocalStorage > 浏览器语言 > 默认繁体
  const getInitialLanguage = (): Language => {
    const stored = localStorage.getItem('flux-ai-language')
    if (stored === 'zh-TW' || stored === 'en') return stored
    
    const browserLang = navigator.language
    if (browserLang.startsWith('zh')) return 'zh-TW'
    return 'en'
  }

  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  // 切换语言并持久化
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('flux-ai-language', lang)
    document.documentElement.lang = lang
  }

  // 初始化时设置 HTML lang 属性
  useEffect(() => {
    document.documentElement.lang = language
  }, [])

  // 翻译函数
  const t = (key: string): string => {
    const translations = language === 'zh-TW' ? zhTW : en
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

// ========== 翻译资源 ==========

const zhTW = {
  header: {
    title: 'Flux AI Pro 2.0',
    subtitle: '基於 shadcn/ui 的現代化 AI 圖像生成',
  },
  nav: {
    generate: '生成',
    history: '歷史',
  },
  params: {
    title: '生成參數',
    model: '模型',
    width: '寬度',
    height: '高度',
    quality: '質量模式',
    seed: 'Seed',
    seedHint: '(-1 = 隨機)',
  },
  models: {
    zimage: 'Z-Image Turbo ⚡',
    flux: 'Flux 標準版',
    turbo: 'Flux Turbo ⚡',
    kontext: 'Kontext 🎨',
  },
  quality: {
    economy: '經濟模式',
    standard: '標準模式',
    ultra: '超高清模式',
  },
  prompt: {
    title: '提示詞',
    positive: '正面提示詞',
    positivePlaceholder: '描述你想要生成的圖片...',
    negative: '負面提示詞',
    negativePlaceholder: 'blurry, low quality, distorted...',
    charCount: '字數',
  },
  button: {
    generate: '生成圖片',
    generating: '生成中...',
    download: '下載',
    retry: '重試',
  },
  result: {
    title: '生成結果',
    placeholder: '生成結果將在這裡顯示',
    generating: '正在生成，請稍候...',
  },
  footer: {
    poweredBy: 'Powered by Cloudflare Workers + React + shadcn/ui',
    copyright: '© 2025 Flux AI Pro. All rights reserved.',
  },
  alert: {
    emptyPrompt: '請輸入提示詞',
    error: '生成失敗',
  },
}

const en = {
  header: {
    title: 'Flux AI Pro 2.0',
    subtitle: 'Modern AI Image Generation with shadcn/ui',
  },
  nav: {
    generate: 'Generate',
    history: 'History',
  },
  params: {
    title: 'Generation Parameters',
    model: 'Model',
    width: 'Width',
    height: 'Height',
    quality: 'Quality Mode',
    seed: 'Seed',
    seedHint: '(-1 = Random)',
  },
  models: {
    zimage: 'Z-Image Turbo ⚡',
    flux: 'Flux Standard',
    turbo: 'Flux Turbo ⚡',
    kontext: 'Kontext 🎨',
  },
  quality: {
    economy: 'Economy',
    standard: 'Standard',
    ultra: 'Ultra HD',
  },
  prompt: {
    title: 'Prompts',
    positive: 'Positive Prompt',
    positivePlaceholder: 'Describe the image you want to generate...',
    negative: 'Negative Prompt',
    negativePlaceholder: 'blurry, low quality, distorted...',
    charCount: 'Characters',
  },
  button: {
    generate: 'Generate Image',
    generating: 'Generating...',
    download: 'Download',
    retry: 'Retry',
  },
  result: {
    title: 'Result',
    placeholder: 'Generated result will appear here',
    generating: 'Generating, please wait...',
  },
  footer: {
    poweredBy: 'Powered by Cloudflare Workers + React + shadcn/ui',
    copyright: '© 2025 Flux AI Pro. All rights reserved.',
  },
  alert: {
    emptyPrompt: 'Please enter a prompt',
    error: 'Generation failed',
  },
}