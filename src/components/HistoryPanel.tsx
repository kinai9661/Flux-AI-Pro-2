import { useState, useEffect } from 'react'
import { Trash2, Download, RotateCcw, Database } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { ImageViewer } from './ImageViewer'
import { getImageFromDB, deleteImageFromDB, getStorageInfo, formatBytes } from '../utils/imageStorage'
import type { HistoryItem } from '../types'

interface HistoryPanelProps {
  onLoadParams?: (item: HistoryItem) => void
}

export function HistoryPanel({ onLoadParams }: HistoryPanelProps) {
  const { language } = useLanguage()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedImage, setSelectedImage] = useState<{ image: string; index: number } | null>(null)
  const [storageInfo, setStorageInfo] = useState<{ used: number; quota: number }>({ used: 0, quota: 0 })

  useEffect(() => {
    const loadHistory = async () => {
      const stored = localStorage.getItem('flux-ai-history')
      if (stored) {
        const historyData = JSON.parse(stored) as HistoryItem[]
        
        // 从 IndexedDB 加载图片
        const historyWithImages = await Promise.all(
          historyData.map(async (item) => {
            if (!item.result_image || !item.result_image.startsWith('blob:')) {
              const imageUrl = await getImageFromDB(item.id)
              if (imageUrl) {
                return { ...item, result_image: imageUrl }
              }
            }
            return item
          })
        )
        
        setHistory(historyWithImages)
      }
      
      // 获取存储信息
      const info = await getStorageInfo()
      setStorageInfo(info)
    }
    
    loadHistory()
    window.addEventListener('storage', loadHistory)
    return () => window.removeEventListener('storage', loadHistory)
  }, [])

  const handleDelete = async (id: string) => {
    try {
      // 从 IndexedDB 删除
      await deleteImageFromDB(id)
      
      // 从 localStorage 删除
      const newHistory = history.filter(item => item.id !== id)
      setHistory(newHistory)
      localStorage.setItem('flux-ai-history', JSON.stringify(newHistory))
      
      // 更新存储信息
      const info = await getStorageInfo()
      setStorageInfo(info)
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const handleClearAll = async () => {
    if (confirm(language === 'zh-TW' ? '確定要清空所有歷史記錄嗎？' : 'Clear all history?')) {
      try {
        // 删除所有图片
        for (const item of history) {
          await deleteImageFromDB(item.id)
        }
        
        setHistory([])
        localStorage.removeItem('flux-ai-history')
        
        // 更新存储信息
        const info = await getStorageInfo()
        setStorageInfo(info)
      } catch (error) {
        console.error('Failed to clear all:', error)
      }
    }
  }

  const handleDownload = (item: HistoryItem) => {
    if (item.result_image) {
      const a = document.createElement('a')
      a.href = item.result_image
      a.download = `flux-ai-${item.id}.png`
      a.click()
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString(language === 'zh-TW' ? 'zh-TW' : 'en-US')
  }

  const handleNavigate = (index: number) => {
    if (history[index]?.result_image) {
      setSelectedImage({ image: history[index].result_image!, index })
    }
  }

  if (history.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <p className="text-lg mb-2">
            {language === 'zh-TW' ? '暫無歷史記錄' : 'No history yet'}
          </p>
          <p className="text-sm">
            {language === 'zh-TW' ? '生成的圖片將在這裡顯示' : 'Generated images will appear here'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-primary">
            {language === 'zh-TW' ? '歷史記錄' : 'History'} ({history.length})
          </h2>
          {storageInfo.quota > 0 && (
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <Database className="w-3 h-3" />
              <span>
                {language === 'zh-TW' ? '本地儲存' : 'Local Storage'}: {formatBytes(storageInfo.used)} / {formatBytes(storageInfo.quota)}
                ({((storageInfo.used / storageInfo.quota) * 100).toFixed(1)}%)
              </span>
            </div>
          )}
        </div>
        <button
          onClick={handleClearAll}
          className="px-3 py-1.5 text-sm bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          {language === 'zh-TW' ? '清空全部' : 'Clear All'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-20rem)]">
        {history.map((item, index) => (
          <div
            key={item.id}
            className="border rounded-lg p-3 bg-card hover:border-primary/50 transition-colors"
          >
            {item.result_image && (
              <div 
                className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage({ image: item.result_image!, index })}
              >
                <img
                  src={item.result_image}
                  alt="Generated"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-primary/80 line-clamp-2">
                {item.prompt}
              </p>
              <div className="flex items-center justify-between text-xs text-primary/60">
                <span>{item.model.toUpperCase()}</span>
                <span>{item.width}×{item.height}</span>
              </div>
              {item.generation_time && (
                <p className="text-xs text-primary/60">
                  {language === 'zh-TW' ? '耗時' : 'Time'}: {(item.generation_time / 1000).toFixed(1)}s
                </p>
              )}
              <p className="text-xs text-primary/50">
                {formatTime(item.timestamp)}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <button
                  onClick={() => onLoadParams?.(item)}
                  className="px-2 py-1.5 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                  title={language === 'zh-TW' ? '重用參數' : 'Reuse'}
                >
                  <RotateCcw className="w-3 h-3" />
                  {language === 'zh-TW' ? '重用' : 'Reuse'}
                </button>
                <button
                  onClick={() => handleDownload(item)}
                  className="px-2 py-1.5 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                  title={language === 'zh-TW' ? '下載' : 'Download'}
                >
                  <Download className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-2 py-1.5 text-xs bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors flex items-center justify-center gap-1"
                  title={language === 'zh-TW' ? '刪除' : 'Delete'}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageViewer
          image={selectedImage.image}
          onClose={() => setSelectedImage(null)}
          historyItems={history}
          currentIndex={selectedImage.index}
          onNavigate={handleNavigate}
          metadata={{
            prompt: history[selectedImage.index].prompt,
            model: history[selectedImage.index].model,
            width: history[selectedImage.index].width,
            height: history[selectedImage.index].height,
            seed: history[selectedImage.index].seed,
            style: history[selectedImage.index].style,
          }}
        />
      )}
    </div>
  )
}