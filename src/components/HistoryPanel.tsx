import { useState, useEffect } from 'react'
import { Download, Trash2, Copy, Search, Filter } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import type { HistoryItem } from '../types'

export function HistoryPanel() {
  const { language, t } = useLanguage()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModel, setFilterModel] = useState<string>('all')

  // 加载历史记录
  useEffect(() => {
    const stored = localStorage.getItem('flux-ai-history')
    if (stored) {
      try {
        setHistory(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to load history', e)
      }
    }
  }, [])

  // 筛选历史
  const filteredHistory = history.filter(item => {
    const matchesSearch = item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModel = filterModel === 'all' || item.model === filterModel
    return matchesSearch && matchesModel
  })

  // 删除单条记录
  const deleteItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id)
    setHistory(newHistory)
    localStorage.setItem('flux-ai-history', JSON.stringify(newHistory))
  }

  // 清空所有记录
  const clearAll = () => {
    if (confirm(language === 'zh-TW' ? '確定要清空所有歷史記錄嗎？' : 'Clear all history?')) {
      setHistory([])
      localStorage.removeItem('flux-ai-history')
    }
  }

  // 下载图片
  const downloadImage = (item: HistoryItem) => {
    if (!item.result_image) return
    const a = document.createElement('a')
    a.href = item.result_image
    a.download = `flux-ai-${item.id}.png`
    a.click()
  }

  // 复制参数
  const copyParams = (item: HistoryItem) => {
    // 这里需要触发父组件的参数应用
    // 暂时只复制提示词
    navigator.clipboard.writeText(item.prompt)
    alert(language === 'zh-TW' ? '參數已複製' : 'Parameters copied')
  }

  return (
    <div className="flex flex-col h-full">
      {/* 顶部工具栏 */}
      <div className="border-b p-4 bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {language === 'zh-TW' ? '生成歷史' : 'Generation History'}
          </h2>
          <button
            onClick={clearAll}
            className="px-3 py-1 text-sm text-destructive hover:bg-destructive/10 rounded-md"
          >
            {language === 'zh-TW' ? '清空全部' : 'Clear All'}
          </button>
        </div>

        {/* 搜索和筛选 */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'zh-TW' ? '搜尋提示詞...' : 'Search prompts...'}
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
            />
          </div>
          <select
            value={filterModel}
            onChange={(e) => setFilterModel(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">{language === 'zh-TW' ? '全部模型' : 'All Models'}</option>
            <option value="zimage">Z-Image Turbo</option>
            <option value="flux">Flux</option>
            <option value="turbo">Flux Turbo</option>
            <option value="kontext">Kontext</option>
          </select>
        </div>
      </div>

      {/* 历史记录列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            {language === 'zh-TW' ? '暫無歷史記錄' : 'No history yet'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHistory.map(item => (
              <div key={item.id} className="border rounded-lg overflow-hidden bg-card hover:border-primary transition-colors">
                {/* 图片预览 */}
                {item.result_image && (
                  <div className="aspect-square bg-muted">
                    <img
                      src={item.result_image}
                      alt="Generated"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* 信息 */}
                <div className="p-3 space-y-2">
                  <p className="text-sm line-clamp-2">{item.prompt}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 bg-primary/20 text-primary rounded">
                      {item.model}
                    </span>
                    <span>{item.width}×{item.height}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => downloadImage(item)}
                      className="flex-1 px-2 py-1 text-xs bg-primary text-primary-foreground rounded hover:opacity-90"
                      title={language === 'zh-TW' ? '下載' : 'Download'}
                    >
                      <Download className="w-3 h-3 inline mr-1" />
                    </button>
                    <button
                      onClick={() => copyParams(item)}
                      className="flex-1 px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
                      title={language === 'zh-TW' ? '複製參數' : 'Copy Params'}
                    >
                      <Copy className="w-3 h-3 inline mr-1" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="px-2 py-1 text-xs text-destructive hover:bg-destructive/10 rounded"
                      title={language === 'zh-TW' ? '刪除' : 'Delete'}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}