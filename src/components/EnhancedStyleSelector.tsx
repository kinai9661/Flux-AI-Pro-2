import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import type { Style } from '../types'

interface EnhancedStyleSelectorProps {
  value?: string
  onChange: (styleId: string | undefined, style?: Style) => void
}

interface StyleGroup {
  id: string
  name: string
  nameEn: string
  styles: Style[]
}

// 精简分组的风格
const styleGroups: StyleGroup[] = [
  {
    id: 'realistic',
    name: '写实风格',
    nameEn: 'Realistic',
    styles: [
      { id: 'natural', name: '自然光', nameEn: 'Natural Light', prompt: 'natural lighting, realistic, high detail, photorealistic' },
      { id: 'cinematic', name: '电影级', nameEn: 'Cinematic', prompt: 'cinematic lighting, dramatic, film grain, professional photography' },
      { id: 'studio', name: '工作室', nameEn: 'Studio', prompt: 'studio lighting, professional, clean, sharp focus' },
    ]
  },
  {
    id: 'anime',
    name: '动漫风格',
    nameEn: 'Anime',
    styles: [
      { id: 'anime-jp', name: '日式动漫', nameEn: 'Japanese Anime', prompt: 'anime style, cel shading, vibrant colors, manga' },
      { id: 'anime-us', name: '美式卡通', nameEn: 'Western Cartoon', prompt: 'western animation, cartoon style, bold lines' },
      { id: 'chibi', name: 'Q版', nameEn: 'Chibi', prompt: 'chibi, cute, kawaii, super deformed' },
    ]
  },
  {
    id: 'art',
    name: '艺术风格',
    nameEn: 'Artistic',
    styles: [
      { id: 'oil', name: '油画', nameEn: 'Oil Painting', prompt: 'oil painting, artistic, brushstrokes, canvas texture' },
      { id: 'watercolor', name: '水彩', nameEn: 'Watercolor', prompt: 'watercolor, soft, flowing colors, paper texture' },
      { id: 'sketch', name: '素描', nameEn: 'Sketch', prompt: 'pencil sketch, hand drawn, monochrome, artistic' },
    ]
  },
  {
    id: 'digital',
    name: '数字艺术',
    nameEn: 'Digital Art',
    styles: [
      { id: 'pixel', name: '像素艺术', nameEn: 'Pixel Art', prompt: 'pixel art, retro, 8bit, pixelated' },
      { id: 'cyberpunk', name: '赛博朋克', nameEn: 'Cyberpunk', prompt: 'cyberpunk, neon lights, futuristic, sci-fi' },
      { id: 'vaporwave', name: '蒸汽波', nameEn: 'Vaporwave', prompt: 'vaporwave, aesthetic, pastel colors, retro futuristic' },
    ]
  },
]

// 热门风格 ID
const POPULAR_STYLES = ['natural', 'anime-jp', 'cinematic', 'cyberpunk']

// 获取所有风格的平铺列表
const allStyles = styleGroups.flatMap(group => group.styles)

export function EnhancedStyleSelector({ value, onChange }: EnhancedStyleSelectorProps) {
  const { language } = useLanguage()
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const [recentStyles, setRecentStyles] = useState<string[]>([])

  // 加载最近使用的风格
  useEffect(() => {
    const saved = localStorage.getItem('flux-recent-styles')
    if (saved) {
      try {
        setRecentStyles(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load recent styles:', e)
      }
    }
  }, [])

  // 保存最近使用的风格
  const saveRecentStyle = (styleId: string) => {
    const updated = [styleId, ...recentStyles.filter(id => id !== styleId)].slice(0, 4)
    setRecentStyles(updated)
    localStorage.setItem('flux-recent-styles', JSON.stringify(updated))
  }

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const handleStyleSelect = (style: Style) => {
    if (value === style.id) {
      // 取消选择
      onChange(undefined, undefined)
    } else {
      saveRecentStyle(style.id)
      onChange(style.id, style)
    }
  }

  const handleClear = () => {
    onChange(undefined, undefined)
  }

  // 获取风格对象
  const getStyleById = (id: string) => allStyles.find(s => s.id === id)

  // 热门风格列表
  const popularStyles = POPULAR_STYLES.map(getStyleById).filter(Boolean) as Style[]

  // 最近使用的风格列表
  const recentStylesList = recentStyles.map(getStyleById).filter(Boolean) as Style[]

  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          {language === 'zh-TW' ? '藝術風格' : 'Art Style'}
          {value && (
            <span className="ml-2 text-xs text-primary">
              ({language === 'zh-TW' ? '已選擇' : 'Selected'})
            </span>
          )}
        </label>
        {value && (
          <button
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {language === 'zh-TW' ? '清除' : 'Clear'}
          </button>
        )}
      </div>

      <div className="border rounded-md bg-background">
        {/* 最近使用 - 1 行显示 */}
        {recentStylesList.length > 0 && (
          <div className="border-b p-2">
            <div className="text-xs text-muted-foreground mb-1.5">
              {language === 'zh-TW' ? '🕒 最近使用' : '🕒 Recent'}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {recentStylesList.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleSelect(style)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    value === style.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-accent'
                  }`}
                >
                  {language === 'zh-TW' ? style.name : style.nameEn}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 热门风格 - 显示 4 个 */}
        <div className="border-b p-2">
          <div className="text-xs text-muted-foreground mb-1.5">
            {language === 'zh-TW' ? '⭐ 熱門風格' : '⭐ Popular'}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {popularStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => handleStyleSelect(style)}
                className={`px-2.5 py-1.5 text-xs rounded transition-colors ${
                  value === style.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-accent'
                }`}
              >
                {language === 'zh-TW' ? style.name : style.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* 分组风格 */}
        <div className="max-h-48 overflow-y-auto">
          {styleGroups.map((group) => (
            <div key={group.id} className="border-b last:border-b-0">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full px-3 py-2 flex items-center justify-between hover:bg-accent transition-colors"
              >
                <span className="text-sm font-medium">
                  {language === 'zh-TW' ? group.name : group.nameEn}
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({group.styles.length})
                  </span>
                </span>
                {expandedGroups.includes(group.id) ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedGroups.includes(group.id) && (
                <div className="px-3 pb-2">
                  {group.styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleStyleSelect(style)}
                      className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors ${
                        value === style.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                    >
                      {language === 'zh-TW' ? style.name : style.nameEn}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {!value && (
        <p className="text-xs text-muted-foreground">
          {language === 'zh-TW' 
            ? '💡 選擇風格以增強圖片效果，或留空使用原始提示詞'
            : '💡 Select a style to enhance your image, or leave empty'
          }
        </p>
      )}
    </div>
  )
}