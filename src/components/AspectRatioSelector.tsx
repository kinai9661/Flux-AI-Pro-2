import { aspectRatios, getPopularRatios, type AspectRatio } from '../data/aspectRatios'
import { useLanguage } from '../contexts/LanguageContext'

interface AspectRatioSelectorProps {
  value?: string
  onChange: (ratioId: string, width: number, height: number) => void
}

export function AspectRatioSelector({ value, onChange }: AspectRatioSelectorProps) {
  const { language } = useLanguage()
  const popularRatios = getPopularRatios()

  const handleRatioChange = (ratio: AspectRatio) => {
    onChange(ratio.id, ratio.width, ratio.height)
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">
        {language === 'zh-TW' ? '圖片比例' : 'Aspect Ratio'}
      </label>

      {/* 热门比例 - 大按钮 */}
      <div className="grid grid-cols-3 gap-2">
        {popularRatios.map(ratio => (
          <button
            key={ratio.id}
            onClick={() => handleRatioChange(ratio)}
            className={`p-3 border rounded-md transition-colors ${
              value === ratio.id
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="text-2xl mb-1">{ratio.icon}</div>
            <div className="text-xs font-medium">
              {language === 'zh-TW' ? ratio.name : ratio.nameEn}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {ratio.width} × {ratio.height}
            </div>
          </button>
        ))}
      </div>

      {/* 所有比例 - 下拉选择 */}
      <details className="group">
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
          {language === 'zh-TW' ? '更多比例選項 ▼' : 'More Ratios ▼'}
        </summary>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {aspectRatios.filter(r => !r.popular).map(ratio => (
            <button
              key={ratio.id}
              onClick={() => handleRatioChange(ratio)}
              className={`p-2 text-left border rounded-md text-xs transition-colors ${
                value === ratio.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium">
                {ratio.icon} {language === 'zh-TW' ? ratio.name : ratio.nameEn}
              </div>
              <div className="text-muted-foreground">
                {ratio.width} × {ratio.height}
              </div>
            </button>
          ))}
        </div>
      </details>
    </div>
  )
}