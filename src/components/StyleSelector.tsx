import { useState, useMemo } from 'react'
import { Search, Sparkles, X } from 'lucide-react'
import { styleCategories, getAllStyles, getPopularStyles, type Style } from '../data/styles'
import { useLanguage } from '../contexts/LanguageContext'

interface StyleSelectorProps {
  value?: string
  onChange: (styleId: string | undefined, style?: Style) => void
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isOpen, setIsOpen] = useState(false)

  // 筛选风格
  const filteredStyles = useMemo(() => {
    let styles = selectedCategory === 'all' 
      ? getAllStyles() 
      : styleCategories.find(c => c.id === selectedCategory)?.styles || []

    if (searchQuery) {
      styles = styles.filter(style => 
        style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return styles
  }, [selectedCategory, searchQuery])

  const popularStyles = getPopularStyles()
  const selectedStyle = value ? getAllStyles().find(s => s.id === value) : undefined

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {language === 'zh-TW' ? '藝術風格' : 'Art Style'}
      </label>

      {/* 当前选中的风格 */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border rounded-md bg-background cursor-pointer hover:border-primary transition-colors flex items-center justify-between"
      >
        {selectedStyle ? (
          <span className="text-sm">
            {language === 'zh-TW' ? selectedStyle.name : selectedStyle.nameEn}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">
            {language === 'zh-TW' ? '選擇風格' : 'Select Style'}
          </span>
        )}
        {selectedStyle && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onChange(undefined)
            }}
            className="p-1 hover:bg-accent rounded"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 风格选择器弹窗 */}
      {isOpen && (
        <div className="absolute z-50 w-full max-w-2xl mt-2 p-4 border rounded-lg bg-card shadow-lg">
          {/* 搜索框 */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'zh-TW' ? '搜尋風格...' : 'Search styles...'}
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
            />
          </div>

          {/* 分类标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {language === 'zh-TW' ? '全部' : 'All'}
            </button>
            {styleCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {language === 'zh-TW' ? category.name : category.nameEn}
              </button>
            ))}
          </div>

          {/* 热门风格 */}
          {!searchQuery && selectedCategory === 'all' && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-medium">
                  {language === 'zh-TW' ? '熱門風格' : 'Popular Styles'}
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {popularStyles.map(style => (
                  <button
                    key={style.id}
                    onClick={() => {
                      onChange(style.id, style)
                      setIsOpen(false)
                    }}
                    className="p-3 text-left border rounded-md hover:border-primary hover:bg-accent transition-colors"
                  >
                    <div className="font-medium text-sm">
                      {language === 'zh-TW' ? style.name : style.nameEn}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 所有风格 */}
          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {filteredStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => {
                    onChange(style.id, style)
                    setIsOpen(false)
                  }}
                  className={`p-3 text-left border rounded-md hover:border-primary transition-colors ${
                    value === style.id ? 'border-primary bg-accent' : ''
                  }`}
                >
                  <div className="font-medium text-sm">
                    {language === 'zh-TW' ? style.name : style.nameEn}
                  </div>
                  {style.popular && (
                    <Sparkles className="w-3 h-3 text-primary inline ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 关闭按钮 */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
            >
              {language === 'zh-TW' ? '關閉' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}