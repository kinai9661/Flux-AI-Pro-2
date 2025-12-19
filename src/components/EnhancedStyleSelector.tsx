import { useState, useMemo } from 'react'
import { Search, Sparkles, Star, Clock, X, ChevronDown, ChevronRight } from 'lucide-react'
import { styleCategories, getAllStyles, getPopularStyles, type Style } from '../data/styles'
import { useLanguage } from '../contexts/LanguageContext'

interface EnhancedStyleSelectorProps {
  value?: string
  onChange: (styleId: string | undefined, style?: Style) => void
}

export function EnhancedStyleSelector({ value, onChange }: EnhancedStyleSelectorProps) {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['all']))
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('flux-ai-favorite-styles')
    return new Set(stored ? JSON.parse(stored) : [])
  })
  const [recentStyles, setRecentStyles] = useState<string[]>(() => {
    const stored = localStorage.getItem('flux-ai-recent-styles')
    return stored ? JSON.parse(stored) : []
  })

  const popularStyles = getPopularStyles()
  const selectedStyle = value ? getAllStyles().find(s => s.id === value) : undefined

  // 切换收藏
  const toggleFavorite = (styleId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(styleId)) {
      newFavorites.delete(styleId)
    } else {
      newFavorites.add(styleId)
    }
    setFavorites(newFavorites)
    localStorage.setItem('flux-ai-favorite-styles', JSON.stringify([...newFavorites]))
  }

  // 选择风格
  const handleSelectStyle = (style: Style) => {
    onChange(style.id, style)
    
    // 更新最近使用
    const newRecent = [style.id, ...recentStyles.filter(id => id !== style.id)].slice(0, 5)
    setRecentStyles(newRecent)
    localStorage.setItem('flux-ai-recent-styles', JSON.stringify(newRecent))
  }

  // 切换分类展开
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const recentStyleObjects = recentStyles
    .map(id => getAllStyles().find(s => s.id === id))
    .filter(Boolean) as Style[]

  const favoriteStyleObjects = [...favorites]
    .map(id => getAllStyles().find(s => s.id === id))
    .filter(Boolean) as Style[]

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-primary">
        {language === 'zh-TW' ? '藝術風格' : 'Art Style'}
      </label>

      {/* 当前选中显示 */}
      <div className="relative">
        <div className="w-full px-3 py-2 border border-primary/30 rounded-md bg-background/50 flex items-center justify-between hover:border-primary/50 transition-colors">
          {selectedStyle ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-primary/90">
                {language === 'zh-TW' ? selectedStyle.name : selectedStyle.nameEn}
              </span>
              <button
                onClick={() => onChange(undefined)}
                className="p-0.5 hover:bg-destructive/10 rounded text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">
              {language === 'zh-TW' ? '選擇風格' : 'Select Style'}
            </span>
          )}
        </div>
      </div>

      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === 'zh-TW' ? '搜尋風格...' : 'Search styles...'}
          className="w-full pl-10 pr-4 py-2 border border-primary/30 rounded-md bg-background/50 text-primary placeholder:text-primary/40"
        />
      </div>

      {/* 最近使用 */}
      {recentStyleObjects.length > 0 && !searchQuery && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-medium text-primary">
              {language === 'zh-TW' ? '最近使用' : 'Recent'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentStyleObjects.map(style => (
              <button
                key={style.id}
                onClick={() => handleSelectStyle(style)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                  value === style.id
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-primary/30 bg-background/50 text-primary/80 hover:border-primary/50'
                }`}
              >
                {language === 'zh-TW' ? style.name : style.nameEn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 收藏 */}
      {favoriteStyleObjects.length > 0 && !searchQuery && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="font-medium text-primary">
              {language === 'zh-TW' ? '我的收藏' : 'Favorites'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {favoriteStyleObjects.map(style => (
              <button
                key={style.id}
                onClick={() => handleSelectStyle(style)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                  value === style.id
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-primary/30 bg-background/50 text-primary/80 hover:border-primary/50'
                }`}
              >
                {language === 'zh-TW' ? style.name : style.nameEn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 热门风格 */}
      {!searchQuery && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-medium text-primary">
              {language === 'zh-TW' ? '熱門風格' : 'Popular Styles'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {popularStyles.map(style => (
              <button
                key={style.id}
                onClick={() => handleSelectStyle(style)}
                className={`p-3 text-left border rounded-lg transition-all group ${
                  value === style.id
                    ? 'border-primary bg-primary/10'
                    : 'border-primary/20 bg-background/30 hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-primary group-hover:text-primary">
                      {language === 'zh-TW' ? style.name : style.nameEn}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(style.id)
                    }}
                    className="p-1 hover:bg-primary/10 rounded transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        favorites.has(style.id)
                          ? 'text-primary fill-primary'
                          : 'text-primary/40'
                      }`}
                    />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 所有分类 */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {styleCategories.map(category => {
          const categoryStyles = category.styles.filter(style => 
            !searchQuery || 
            style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            style.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
          )

          if (searchQuery && categoryStyles.length === 0) return null

          const isExpanded = expandedCategories.has(category.id)

          return (
            <div key={category.id} className="border border-primary/20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-3 py-2 bg-card/50 hover:bg-card/70 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-primary" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-primary" />
                  )}
                  <span className="font-medium text-sm text-primary">
                    {language === 'zh-TW' ? category.name : category.nameEn}
                  </span>
                  <span className="text-xs text-primary/60">({categoryStyles.length})</span>
                </div>
              </button>

              {isExpanded && (
                <div className="p-2 space-y-1">
                  {categoryStyles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => handleSelectStyle(style)}
                      className={`w-full px-3 py-2 text-left rounded-md transition-all flex items-center justify-between group ${
                        value === style.id
                          ? 'bg-primary/20 text-primary'
                          : 'hover:bg-primary/10 text-primary/80'
                      }`}
                    >
                      <span className="text-sm">
                        {language === 'zh-TW' ? style.name : style.nameEn}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(style.id)
                        }}
                        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-primary/10 rounded transition-all"
                      >
                        <Star
                          className={`w-3 h-3 ${
                            favorites.has(style.id)
                              ? 'text-primary fill-primary'
                              : 'text-primary/40'
                          }`}
                        />
                      </button>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}