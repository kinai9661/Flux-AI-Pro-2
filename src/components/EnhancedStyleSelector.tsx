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

// 完整的风格分组
const styleGroups: StyleGroup[] = [
  {
    id: 'japanese',
    name: '日系风格',
    nameEn: 'Japanese Style',
    styles: [
      { id: 'anime', name: '日式动漫', nameEn: 'Japanese Anime', prompt: 'anime style, cel shading, vibrant colors, manga' },
      { id: 'ghibli', name: '吉卜力风', nameEn: 'Studio Ghibli', prompt: 'studio ghibli style, hand-drawn, fantasy, miyazaki' },
      { id: 'ukiyo-e', name: '浮世绘', nameEn: 'Ukiyo-e', prompt: 'ukiyo-e, japanese woodblock print, traditional art' },
      { id: 'kawaii', name: '可爱风', nameEn: 'Kawaii', prompt: 'kawaii, cute, pastel colors, chibi' },
      { id: 'manga', name: '漫画风', nameEn: 'Manga', prompt: 'manga style, black and white, screentone, comic' },
    ]
  },
  {
    id: 'lineart',
    name: '线稿风格',
    nameEn: 'Line Art',
    styles: [
      { id: 'sketch', name: '素描', nameEn: 'Sketch', prompt: 'pencil sketch, hand drawn, monochrome, artistic' },
      { id: 'ink', name: '墨线', nameEn: 'Ink Drawing', prompt: 'ink drawing, fine lines, black ink, traditional' },
      { id: 'lineart', name: '线稿', nameEn: 'Line Art', prompt: 'clean line art, vector style, outline' },
      { id: 'blueprint', name: '蓝图', nameEn: 'Blueprint', prompt: 'blueprint, technical drawing, architectural' },
      { id: 'wireframe', name: '线框', nameEn: 'Wireframe', prompt: 'wireframe, technical, schematic, diagram' },
    ]
  },
  {
    id: 'monochrome',
    name: '黑白风格',
    nameEn: 'Monochrome',
    styles: [
      { id: 'bnw-photo', name: '黑白照片', nameEn: 'B&W Photo', prompt: 'black and white photography, high contrast, grayscale' },
      { id: 'noir', name: '黑色电影', nameEn: 'Film Noir', prompt: 'film noir, dramatic shadows, high contrast, vintage' },
      { id: 'charcoal', name: '炭笔', nameEn: 'Charcoal', prompt: 'charcoal drawing, textured, grayscale, artistic' },
      { id: 'silhouette', name: '剪影', nameEn: 'Silhouette', prompt: 'silhouette, high contrast, backlit, dramatic' },
      { id: 'etching', name: '蝕刻', nameEn: 'Etching', prompt: 'etching, engraving, crosshatch, vintage print' },
    ]
  },
  {
    id: 'painting',
    name: '绘画风格',
    nameEn: 'Painting',
    styles: [
      { id: 'oil', name: '油画', nameEn: 'Oil Painting', prompt: 'oil painting, artistic, brushstrokes, canvas texture' },
      { id: 'watercolor', name: '水彩', nameEn: 'Watercolor', prompt: 'watercolor, soft, flowing colors, paper texture' },
      { id: 'acrylic', name: '丙烯', nameEn: 'Acrylic', prompt: 'acrylic painting, vibrant, modern, textured' },
      { id: 'impressionist', name: '印象派', nameEn: 'Impressionist', prompt: 'impressionist, soft brushstrokes, light effects, monet style' },
      { id: 'abstract', name: '抽象画', nameEn: 'Abstract', prompt: 'abstract art, non-representational, geometric, modern' },
      { id: 'chinese-painting', name: '国画', nameEn: 'Chinese Painting', prompt: 'chinese ink painting, traditional, brushwork, sumi-e' },
    ]
  },
  {
    id: 'digital',
    name: '数位艺术',
    nameEn: 'Digital Art',
    styles: [
      { id: 'pixel', name: '像素艺术', nameEn: 'Pixel Art', prompt: 'pixel art, retro, 8bit, pixelated' },
      { id: 'voxel', name: '体素艺术', nameEn: 'Voxel Art', prompt: 'voxel art, 3d pixels, minecraft style, blocky' },
      { id: 'lowpoly', name: '低多边形', nameEn: 'Low Poly', prompt: 'low poly, geometric, 3d render, minimalist' },
      { id: 'vector', name: '矢量', nameEn: 'Vector', prompt: 'vector art, flat design, clean lines, illustrator style' },
      { id: 'glitch', name: '故障艺术', nameEn: 'Glitch Art', prompt: 'glitch art, digital distortion, databending, corrupted' },
      { id: 'vaporwave', name: '蒸汽波', nameEn: 'Vaporwave', prompt: 'vaporwave, aesthetic, pastel colors, retro futuristic' },
    ]
  },
  {
    id: 'photography',
    name: '摄影风格',
    nameEn: 'Photography',
    styles: [
      { id: 'natural', name: '自然光', nameEn: 'Natural Light', prompt: 'natural lighting, realistic, high detail, photorealistic' },
      { id: 'cinematic', name: '电影级', nameEn: 'Cinematic', prompt: 'cinematic lighting, dramatic, film grain, professional photography' },
      { id: 'studio', name: '工作室', nameEn: 'Studio', prompt: 'studio lighting, professional, clean, sharp focus' },
      { id: 'macro', name: '微距', nameEn: 'Macro', prompt: 'macro photography, extreme close-up, detailed, shallow depth' },
      { id: 'long-exposure', name: '长曝光', nameEn: 'Long Exposure', prompt: 'long exposure, motion blur, light trails, smooth' },
      { id: 'hdr', name: 'HDR', nameEn: 'HDR', prompt: 'hdr photography, high dynamic range, vivid, detailed' },
    ]
  },
  {
    id: 'fantasy',
    name: '奇幻风格',
    nameEn: 'Fantasy',
    styles: [
      { id: 'cyberpunk', name: '赛博朋克', nameEn: 'Cyberpunk', prompt: 'cyberpunk, neon lights, futuristic, sci-fi' },
      { id: 'steampunk', name: '蒸汽朋克', nameEn: 'Steampunk', prompt: 'steampunk, victorian, brass gears, industrial' },
      { id: 'gothic', name: '哥特', nameEn: 'Gothic', prompt: 'gothic, dark, ornate, dramatic, victorian' },
      { id: 'surreal', name: '超现实', nameEn: 'Surreal', prompt: 'surrealism, dreamlike, impossible, dali style' },
    ]
  },
  {
    id: 'special',
    name: '特殊效果',
    nameEn: 'Special Effects',
    styles: [
      { id: 'neon', name: '霉虹灯', nameEn: 'Neon', prompt: 'neon lights, glowing, vibrant, electric' },
      { id: 'holographic', name: '全息', nameEn: 'Holographic', prompt: 'holographic, iridescent, rainbow, futuristic' },
      { id: 'paper-cut', name: '剪纸', nameEn: 'Paper Cut', prompt: 'paper cut art, layered, shadow, craft' },
      { id: 'stained-glass', name: '彩绘玻璃', nameEn: 'Stained Glass', prompt: 'stained glass, colorful, mosaic, religious art' },
      { id: 'origami', name: '折纸', nameEn: 'Origami', prompt: 'origami, paper folding, geometric, japanese art' },
    ]
  },
]

export function EnhancedStyleSelector({ value, onChange }: EnhancedStyleSelectorProps) {
  const { language } = useLanguage()
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])

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