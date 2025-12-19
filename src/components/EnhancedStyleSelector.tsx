import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Star, Clock } from 'lucide-react'
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

// 热门风格 (4个)
const popularStyles: Style[] = [
  { id: 'natural', name: '自然光', nameEn: 'Natural Light', prompt: 'natural lighting, realistic, high detail, photorealistic' },
  { id: 'anime-jp', name: '日式动漫', nameEn: 'Japanese Anime', prompt: 'anime style, cel shading, vibrant colors, manga' },
  { id: 'cinematic', name: '电影级', nameEn: 'Cinematic', prompt: 'cinematic lighting, dramatic, film grain, professional photography' },
  { id: 'cyberpunk', name: '赛博朋克', nameEn: 'Cyberpunk', prompt: 'cyberpunk, neon lights, futuristic, sci-fi' },
]

// 获取所有风格的 Map
const getAllStylesMap = (): Map<string, Style> => {
  const map = new Map<string, Style>()
  styleGroups.forEach(group => {
    group.styles.forEach(style => {
      map.set(style.id, style)
    })
  })
  return map
}

export function EnhancedStyleSelector({ value, onChange }: EnhancedStyleSelectorProps) {
  const { language } = useLanguage()
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const [recentStyles, setRecentStyles] = useState<Style[]>([])

  // 加载最近使用的风格
  useEffect(() => {
    const stored = localStorage.getItem('recent-styles')
    if (stored) {
      try {
        const ids = JSON.parse(stored) as string[]
        const stylesMap = getAllStylesMap()
        const styles = ids.map(id => stylesMap.get(id)).filter(Boolean) as Style[]
        setRecentStyles(styles.slice(0, 4)) // 最多显示 4 个
      } catch (e) {
        console.error('Failed to load recent styles:', e)
      }
    }
  }, [])

  // 保存最近使用
  const saveRecentStyle = (styleId: string) => {
    try {
      const stored = localStorage.getItem('recent-styles')
      let ids = stored ? JSON.parse(stored) : []
      
      // 移除旧的，添加到最前面
      ids = ids.filter((id: string) => id !== styleId)
      ids.unshift(styleId)
      ids = ids.slice(0, 4) // 保持最多 4 个
      
      localStorage.setItem('recent-styles', JSON.stringify(ids))
      
      // 更新状态
      const stylesMap = getAllStylesMap()
      const styles = ids.map((id: string) => stylesMap.get(id)).filter(Boolean) as Style[]
      setRecentStyles(styles)
    } catch (e) {
      console.error('Failed to save recent style:', e)
    }
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
      onChange(style.id, style)
      saveRecentStyle(style.id)
    }
  }

  const handleClear = () => {
    onChange(undefined, undefined)
  }

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
        {/* 最近使用 - 一行显示 */}
        {recentStyles.length > 0 && (
          <div className="border-b p-2">
            <div className="flex items-center gap-1 mb-1.5">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {language === 'zh-TW' ? '最近使用' : 'Recent'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {recentStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleSelect(style)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    value === style.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent hover:bg-accent/80'
                  }`}
                >
                  {language === 'zh-TW' ? style.name : style.nameEn}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 热门风格 - 4个 */}
        <div className="border-b p-2">
          <div className="flex items-center gap-1 mb-1.5">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-xs text-muted-foreground">
              {language === 'zh-TW' ? '熱門風格' : 'Popular'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {popularStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => handleStyleSelect(style)}
                className={`px-2 py-1.5 text-xs rounded transition-colors text-left ${
                  value === style.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent hover:bg-accent/80'
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