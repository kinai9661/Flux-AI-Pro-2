import { useState, useEffect, useRef } from 'react'
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Copy, ChevronLeft, ChevronRight, Maximize2, Info } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import type { HistoryItem } from '../types'

interface ImageViewerProps {
  image: string
  onClose: () => void
  historyItems?: HistoryItem[]
  currentIndex?: number
  onNavigate?: (index: number) => void
  metadata?: {
    prompt: string
    model: string
    width: number
    height: number
    seed?: number
    style?: string
  }
}

export function ImageViewer({ image, onClose, historyItems, currentIndex, onNavigate, metadata }: ImageViewerProps) {
  const { language } = useLanguage()
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showInfo, setShowInfo] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
        case '0':
          handleReset()
          break
        case 'ArrowLeft':
          if (currentIndex !== undefined && currentIndex > 0 && onNavigate) {
            onNavigate(currentIndex - 1)
          }
          break
        case 'ArrowRight':
          if (currentIndex !== undefined && historyItems && currentIndex < historyItems.length - 1 && onNavigate) {
            onNavigate(currentIndex + 1)
          }
          break
        case 'i':
        case 'I':
          setShowInfo(!showInfo)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scale, currentIndex, historyItems, showInfo, onClose, onNavigate])

  // 滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newScale = Math.max(0.5, Math.min(4, scale + delta))
    setScale(newScale)
  }

  // 缩放控制
  const handleZoomIn = () => setScale(Math.min(4, scale + 0.25))
  const handleZoomOut = () => setScale(Math.max(0.5, scale - 0.25))
  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // 拖拽开始
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  // 拖拽移动
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  // 拖拽结束
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 双击重置
  const handleDoubleClick = () => {
    handleReset()
  }

  // 下载图片
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = image
    a.download = `flux-ai-${Date.now()}.png`
    a.click()
  }

  // 复制图片
  const handleCopyImage = async () => {
    try {
      const response = await fetch(image)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ])
      alert(language === 'zh-TW' ? '圖片已複製' : 'Image copied')
    } catch (err) {
      console.error('Failed to copy image', err)
    }
  }

  // 全屏切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      imageRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm border-b border-primary/20">
        <div className="flex items-center gap-4">
          {/* 缩放控制 */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg bg-card/50 hover:bg-card transition-colors text-primary"
              title={language === 'zh-TW' ? '縮小' : 'Zoom Out'}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-primary font-mono text-sm min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg bg-card/50 hover:bg-card transition-colors text-primary"
              title={language === 'zh-TW' ? '放大' : 'Zoom In'}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-card/50 hover:bg-card transition-colors text-primary"
              title={language === 'zh-TW' ? '重置' : 'Reset'}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-card/50 hover:bg-card transition-colors text-primary"
              title={language === 'zh-TW' ? '下載' : 'Download'}
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleCopyImage}
              className="p-2 rounded-lg bg-card/50 hover:bg-card transition-colors text-primary"
              title={language === 'zh-TW' ? '複製圖片' : 'Copy Image'}
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-lg bg-card/50 hover:bg-card transition-colors text-primary"
              title={language === 'zh-TW' ? '顯示信息' : 'Show Info'}
            >
              <Info className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-card/50 hover:bg-card transition-colors text-primary"
              title={language === 'zh-TW' ? '全螢幕' : 'Fullscreen'}
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-card/50 hover:bg-destructive transition-colors text-primary hover:text-destructive-foreground"
          title={language === 'zh-TW' ? '關閉' : 'Close'}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* 图片展示区 */}
      <div
        ref={imageRef}
        className="flex-1 overflow-hidden flex items-center justify-center relative"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={image}
          alt="Generated"
          className="max-w-full max-h-full object-contain transition-transform"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            cursor: isDragging ? 'grabbing' : scale > 1 ? 'grab' : 'default',
          }}
          draggable={false}
        />

        {/* 导航箭头 */}
        {historyItems && currentIndex !== undefined && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={() => onNavigate?.(currentIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-primary"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}
            {currentIndex < historyItems.length - 1 && (
              <button
                onClick={() => onNavigate?.(currentIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-primary"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}
          </>
        )}

        {/* 信息面板 */}
        {showInfo && metadata && (
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-sm rounded-lg border border-primary/20">
            <h3 className="text-primary font-semibold mb-2">
              {language === 'zh-TW' ? '生成信息' : 'Generation Info'}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-primary/80">
                <span className="text-primary/60">{language === 'zh-TW' ? '提示詞' : 'Prompt'}:</span>
                <p className="text-primary/90 mt-1">{metadata.prompt}</p>
              </div>
              <div className="space-y-1 text-primary/80">
                <p><span className="text-primary/60">{language === 'zh-TW' ? '模型' : 'Model'}:</span> {metadata.model}</p>
                <p><span className="text-primary/60">{language === 'zh-TW' ? '尺寸' : 'Size'}:</span> {metadata.width} × {metadata.height}</p>
                {metadata.seed && <p><span className="text-primary/60">Seed:</span> {metadata.seed}</p>}
                {metadata.style && <p><span className="text-primary/60">{language === 'zh-TW' ? '風格' : 'Style'}:</span> {metadata.style}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部缩略图导航 */}
      {historyItems && historyItems.length > 1 && currentIndex !== undefined && (
        <div className="p-4 bg-black/50 backdrop-blur-sm border-t border-primary/20">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {historyItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onNavigate?.(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-primary shadow-lg shadow-primary/50'
                    : 'border-transparent hover:border-primary/50'
                }`}
              >
                {item.result_image && (
                  <img
                    src={item.result_image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 快捷键提示 */}
      <div className="absolute bottom-20 right-4 p-3 bg-black/60 backdrop-blur-sm rounded-lg border border-primary/20 text-xs text-primary/70">
        <p className="font-semibold text-primary mb-1">{language === 'zh-TW' ? '快捷鍵' : 'Shortcuts'}:</p>
        <p>ESC: {language === 'zh-TW' ? '關閉' : 'Close'}</p>
        <p>+/-: {language === 'zh-TW' ? '縮放' : 'Zoom'}</p>
        <p>0: {language === 'zh-TW' ? '重置' : 'Reset'}</p>
        <p>←/→: {language === 'zh-TW' ? '切換' : 'Navigate'}</p>
        <p>I: {language === 'zh-TW' ? '信息' : 'Info'}</p>
      </div>
    </div>
  )
}