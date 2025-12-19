import { useLanguage } from '../contexts/LanguageContext'

interface AspectRatioSelectorProps {
  value: string
  onChange: (ratioId: string, width: number, height: number) => void
  model?: 'zimage' | 'flux' | 'turbo' | 'kontext'
}

interface Ratio {
  id: string
  label: string
  labelEn: string
  width: number
  height: number
  isHD?: boolean
}

// ZIMAGE 专属高清比例
const zimageRatios: Ratio[] = [
  { id: 'square-1k', label: '1K 方形', labelEn: '1K Square', width: 1024, height: 1024 },
  { id: 'square-2k', label: '2K 方形', labelEn: '2K Square', width: 2048, height: 2048, isHD: true },
  { id: 'square-4k', label: '4K 方形', labelEn: '4K Square', width: 4096, height: 4096, isHD: true },
  { id: 'portrait-1k', label: '1K 竖屏', labelEn: '1K Portrait', width: 1024, height: 1536 },
  { id: 'portrait-2k', label: '2K 竖屏', labelEn: '2K Portrait', width: 1536, height: 2048, isHD: true },
  { id: 'portrait-4k', label: '4K 竖屏', labelEn: '4K Portrait', width: 3072, height: 4096, isHD: true },
  { id: 'landscape-1k', label: '1K 横屏', labelEn: '1K Landscape', width: 1536, height: 1024 },
  { id: 'landscape-2k', label: '2K 横屏', labelEn: '2K Landscape', width: 2048, height: 1536, isHD: true },
  { id: 'landscape-4k', label: '4K 横屏', labelEn: '4K Landscape', width: 4096, height: 3072, isHD: true },
]

// 其他模型标准比例
const standardRatios: Ratio[] = [
  { id: 'square', label: '方形 1:1', labelEn: 'Square 1:1', width: 1024, height: 1024 },
  { id: 'portrait', label: '竖屏 2:3', labelEn: 'Portrait 2:3', width: 1024, height: 1536 },
  { id: 'landscape', label: '横屏 3:2', labelEn: 'Landscape 3:2', width: 1536, height: 1024 },
  { id: 'portrait-tall', label: '竖屏 9:16', labelEn: 'Portrait 9:16', width: 768, height: 1344 },
  { id: 'landscape-wide', label: '横屏 16:9', labelEn: 'Landscape 16:9', width: 1344, height: 768 },
]

export function AspectRatioSelector({ value, onChange, model = 'flux' }: AspectRatioSelectorProps) {
  const { language } = useLanguage()
  
  // 根据模型选择比例列表
  const ratios = model === 'zimage' ? zimageRatios : standardRatios
  
  // 如果当前值不在新列表中，选择第一个
  const currentRatio = ratios.find(r => r.id === value)
  if (!currentRatio && ratios.length > 0) {
    onChange(ratios[0].id, ratios[0].width, ratios[0].height)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ratio = ratios.find(r => r.id === e.target.value)
    if (ratio) {
      onChange(ratio.id, ratio.width, ratio.height)
    }
  }

  return (
    <div className="space-y-2 mb-4">
      <label className="text-sm font-medium">
        {language === 'zh-TW' ? '圖片比例' : 'Aspect Ratio'}
        {model === 'zimage' && (
          <span className="ml-2 text-xs text-primary/60">
            {language === 'zh-TW' ? '⚡ 支持高清' : '⚡ HD Support'}
          </span>
        )}
      </label>
      <select
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md bg-background"
      >
        {ratios.map((ratio) => (
          <option key={ratio.id} value={ratio.id}>
            {language === 'zh-TW' ? ratio.label : ratio.labelEn}
            {ratio.isHD ? ' ⚡' : ''}
            {` (${ratio.width}×${ratio.height})`}
          </option>
        ))}
      </select>
      {model === 'zimage' && (
        <p className="text-xs text-muted-foreground">
          {language === 'zh-TW' 
            ? '💡 2K/4K 選項提供超高清畫質'
            : '💡 2K/4K options provide ultra-high quality'
          }
        </p>
      )}
    </div>
  )
}