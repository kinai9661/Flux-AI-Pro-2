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

// 完整的风格分组（繁体中文）
const styleGroups: StyleGroup[] = [
  {
    id: 'japanese',
    name: '日系风格',
    nameEn: '日系風格',
    styles: [
      { id: 'anime', name: '日式动漫', nameEn: '日式動漫', prompt: 'anime style, cel shading, vibrant colors, manga' },
      { id: 'ghibli', name: '吉卜力风', nameEn: '吉卜力風', prompt: 'studio ghibli style, hand-drawn, fantasy, miyazaki' },
      { id: 'ukiyo-e', name: '浮世绘', nameEn: '浮世繪', prompt: 'ukiyo-e, japanese woodblock print, traditional art' },
      { id: 'kawaii', name: '可爱风', nameEn: '可愛風', prompt: 'kawaii, cute, pastel colors, chibi' },
      { id: 'manga', name: '漫画风', nameEn: '漫畫風', prompt: 'manga style, black and white, screentone, comic' },
    ]
  },
  {
    id: 'lineart',
    name: '线稿风格',
    nameEn: '線稿風格',
    styles: [
      { id: 'sketch', name: '素描', nameEn: '素描', prompt: 'pencil sketch, hand drawn, monochrome, artistic' },
      { id: 'ink', name: '墨线', nameEn: '墨線', prompt: 'ink drawing, fine lines, black ink, traditional' },
      { id: 'lineart', name: '线稿', nameEn: '線稿', prompt: 'clean line art, vector style, outline' },
      { id: 'blueprint', name: '蓝图', nameEn: '藍圖', prompt: 'blueprint, technical drawing, architectural' },
      { id: 'wireframe', name: '线框', nameEn: '線框', prompt: 'wireframe, technical, schematic, diagram' },
    ]
  },
  {
    id: 'monochrome',
    name: '黑白风格',
    nameEn: '黑白風格',
    styles: [
      { id: 'bnw-photo', name: '黑白照片', nameEn: '黑白照片', prompt: 'black and white photography, high contrast, grayscale' },
      { id: 'noir', name: '黑色电影', nameEn: '黑色電影', prompt: 'film noir, dramatic shadows, high contrast, vintage' },
      { id: 'charcoal', name: '炭笔', nameEn: '炭筆', prompt: 'charcoal drawing, textured, grayscale, artistic' },
      { id: 'silhouette', name: '剪影', nameEn: '剪影', prompt: 'silhouette, high contrast, backlit, dramatic' },
      { id: 'etching', name: '蝕刻', nameEn: '蝕刻', prompt: 'etching, engraving, crosshatch, vintage print' },
    ]
  },
  {
    id: 'painting',
    name: '绘画风格',
    nameEn: '繪畫風格',
    styles: [
      { id: 'oil', name: '油画', nameEn: '油畫', prompt: 'oil painting, artistic, brushstrokes, canvas texture' },
      { id: 'watercolor', name: '水彩', nameEn: '水彩', prompt: 'watercolor, soft, flowing colors, paper texture' },
      { id: 'acrylic', name: '丙烯', nameEn: '丙烯', prompt: 'acrylic painting, vibrant, modern, textured' },
      { id: 'impressionist', name: '印象派', nameEn: '印象派', prompt: 'impressionist, soft brushstrokes, light effects, monet style' },
      { id: 'abstract', name: '抽象画', nameEn: '抽象畫', prompt: 'abstract art, non-representational, geometric, modern' },
      { id: 'chinese-painting', name: '国画', nameEn: '國畫', prompt: 'chinese ink painting, traditional, brushwork, sumi-e' },
    ]
  },
  {
    id: 'digital',
    name: '数位艺术',
    nameEn: '數位藝術',
    styles: [
      { id: 'pixel', name: '像素艺术', nameEn: '像素藝術', prompt: 'pixel art, retro, 8bit, pixelated' },
      { id: 'voxel', name: '体素艺术', nameEn: '體素藝術', prompt: 'voxel art, 3d pixels, minecraft style, blocky' },
      { id: 'lowpoly', name: '低多边形', nameEn: '低多邊形', prompt: 'low poly, geometric, 3d render, minimalist' },
      { id: 'vector', name: '矢量', nameEn: '矢量', prompt: 'vector art, flat design, clean lines, illustrator style' },
      { id: 'glitch', name: '故障艺术', nameEn: '故障藝術', prompt: 'glitch art, digital distortion, databending, corrupted' },
      { id: 'vaporwave', name: '蒸汽波', nameEn: '蒸汽波', prompt: 'vaporwave, aesthetic, pastel colors, retro futuristic' },
    ]
  },
  {
    id: 'photography',
    name: '摄影风格',
    nameEn: '攝影風格',
    styles: [
      { id: 'natural', name: '自然光', nameEn: '自然光', prompt: 'natural lighting, realistic, high detail, photorealistic' },
      { id: 'cinematic', name: '电影级', nameEn: '電影級', prompt: 'cinematic lighting, dramatic, film grain, professional photography' },
      { id: 'studio', name: '工作室', nameEn: '工作室', prompt: 'studio lighting, professional, clean, sharp focus' },
      { id: 'macro', name: '微距', nameEn: '微距', prompt: 'macro photography, extreme close-up, detailed, shallow depth' },
      { id: 'long-exposure', name: '长曝光', nameEn: '長曝光', prompt: 'long exposure, motion blur, light trails, smooth' },
      { id: 'hdr', name: 'HDR', nameEn: 'HDR', prompt: 'hdr photography, high dynamic range, vivid, detailed' },
    ]
  },
  {
    id: 'fantasy',
    name: '奇幻风格',
    nameEn: '奇幻風格',
    styles: [
      { id: 'cyberpunk', name: '赛博朋克', nameEn: '賽博龐克', prompt: 'cyberpunk, neon lights, futuristic, sci-fi' },
      { id: 'steampunk', name: '蒸汽朋克', nameEn: '蒸汽龐克', prompt: 'steampunk, victorian, brass gears, industrial' },
      { id: 'gothic', name: '哥特', nameEn: '哥特', prompt: 'gothic, dark, ornate, dramatic, victorian' },
      { id: 'surreal', name: '超现实', nameEn: '超現實', prompt: 'surrealism, dreamlike, impossible, dali style' },
    ]
  },
  {
    id: 'special',
    name: '特殊效果',
    nameEn: '特殊效果',
    styles: [
      { id: 'neon', name: '霉虹灯', nameEn: '霖虹燈', prompt: 'neon lights, glowing, vibrant, electric' },
      { id: 'holographic', name: '全息', nameEn: '全息', prompt: 'holographic, iridescent, rainbow, futuristic' },
      { id: 'paper-cut', name: '剪纸', nameEn: '剪紙', prompt: 'paper cut art, layered, shadow, craft' },
      { id: 'stained-glass', name: '彩绘玻璃', nameEn: '彩繪玻璃', prompt: 'stained glass, colorful, mosaic, religious art' },
      { id: 'origami', name: '折纸', nameEn: '摘紙', prompt: 'origami, paper folding, geometric, japanese art' },
      { id: 'crystal', name: '水晶', nameEn: '水晶', prompt: 'crystal, transparent, refractive, gem-like, sparkling' },
      { id: 'metallic', name: '金属', nameEn: '金屬', prompt: 'metallic, chrome, reflective, shiny, polished metal' },
      { id: 'glow', name: '发光', nameEn: '發光', prompt: 'glowing, luminous, radiant, light emission, aura' },
      { id: 'smoke', name: '烟雾', nameEn: '煙霧', prompt: 'smoke effect, misty, ethereal, atmospheric, fog' },
      { id: 'double-exposure', name: '双重曝光', nameEn: '雙重曝光', prompt: 'double exposure, layered images, blend mode, artistic overlap' },
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