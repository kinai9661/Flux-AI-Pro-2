import { useState } from 'react'
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

export function EnhancedStyleSelector({ value, onChange }: EnhancedStyleSelectorProps) {
  const { language } = useLanguage()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['realistic'])

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

      <div className="border rounded-md bg-background max-h-64 overflow-y-auto">
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