import { useState, useEffect } from 'react'
import { Sparkles, Settings, Moon, Sun, Image as ImageIcon, History, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { useLanguage } from './contexts/LanguageContext'
import { LanguageSwitch } from './components/LanguageSwitch'
import { EnhancedStyleSelector } from './components/EnhancedStyleSelector'
import { AspectRatioSelector } from './components/AspectRatioSelector'
import { HistoryPanel } from './components/HistoryPanel'
import { PresetManager } from './components/PresetManager'
import { ImageViewer } from './components/ImageViewer'
import { delay } from './utils/retry'
import type { GenerateRequest, HistoryItem, Style } from './types'

function App() {
  const { t, language } = useLanguage()
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate')
  
  // 生成参数状态
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [model, setModel] = useState<'zimage' | 'flux' | 'turbo' | 'kontext'>('flux')
  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(1024)
  const [selectedRatio, setSelectedRatio] = useState('square')
  const [seed, setSeed] = useState(-1)
  const [selectedStyle, setSelectedStyle] = useState<string | undefined>(undefined)
  const [currentStyle, setCurrentStyle] = useState<Style | undefined>(undefined)
  const [qualityMode, setQualityMode] = useState<'economy' | 'standard' | 'ultra'>('standard')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [retryInfo, setRetryInfo] = useState<{ attempt: number; maxAttempts: number; waitTime: number } | null>(null)
  
  // UI 状态
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showImageViewer, setShowImageViewer] = useState(false)

  // 初始化时应用暗黑模式
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  // 切换主题
  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  // 处理风格选择
  const handleStyleChange = (styleId: string | undefined, style?: Style) => {
    setSelectedStyle(styleId)
    setCurrentStyle(style)
  }

  // 处理比例选择
  const handleRatioChange = (ratioId: string, w: number, h: number) => {
    setSelectedRatio(ratioId)
    setWidth(w)
    setHeight(h)
  }

  // 应用预设
  const handleApplyPreset = (params: Partial<GenerateRequest>) => {
    if (params.model) setModel(params.model)
    if (params.width) setWidth(params.width)
    if (params.height) setHeight(params.height)
    if (params.quality_mode) setQualityMode(params.quality_mode)
    if (params.style) setSelectedStyle(params.style)
    if (params.negative_prompt) setNegativePrompt(params.negative_prompt)
    if (params.seed !== undefined) setSeed(params.seed)
  }

  // 生成图片（带重试）
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert(t('alert.emptyPrompt'))
      return
    }

    setIsGenerating(true)
    setGeneratedImage(null)
    setRetryInfo(null)
    const startTime = Date.now()
    const maxRetries = 3

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        // 构建请求
        let finalPrompt = prompt
        let finalNegativePrompt = negativePrompt

        // 如果选了风格，添加风格提示词
        if (currentStyle) {
          finalPrompt = `${prompt}, ${currentStyle.prompt}`
          if (currentStyle.negativePrompt) {
            finalNegativePrompt = finalNegativePrompt 
              ? `${finalNegativePrompt}, ${currentStyle.negativePrompt}`
              : currentStyle.negativePrompt
          }
        }

        const response = await fetch('/_internal/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: finalPrompt,
            negative_prompt: finalNegativePrompt,
            model,
            width,
            height,
            seed: seed === -1 ? -1 : seed,
            quality_mode: qualityMode,
            n: 1,
            auto_optimize: true,
            auto_hd: true,
          }),
        })

        // 处理 429 错误
        if (response.status === 429) {
          if (attempt < maxRetries) {
            const waitTime = Math.pow(2, attempt + 1) * 1000 // 2s, 4s, 8s
            setRetryInfo({ attempt: attempt + 1, maxAttempts: maxRetries, waitTime })
            await delay(waitTime)
            continue
          } else {
            throw new Error(
              language === 'zh-TW'
                ? 'API 請求頻率過高，請稍後再試（建議等待 1-2 分鐘）'
                : 'API rate limit exceeded, please try again later (wait 1-2 minutes)'
            )
          }
        }

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error?.message || t('alert.error'))
        }

        // 单图直接返回 blob
        const contentType = response.headers.get('content-type')
        let imageUrl: string
        
        if (contentType?.startsWith('image/')) {
          const blob = await response.blob()
          imageUrl = URL.createObjectURL(blob)
        } else {
          const data = await response.json()
          if (data.data?.[0]?.image) {
            imageUrl = data.data[0].image
          } else {
            throw new Error('No image in response')
          }
        }

        setGeneratedImage(imageUrl)
        setRetryInfo(null)

        // 保存到历史
        const historyItem: HistoryItem = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          prompt,
          negative_prompt: negativePrompt,
          model,
          width,
          height,
          seed,
          style: selectedStyle,
          quality_mode: qualityMode,
          result_image: imageUrl,
          generation_time: Date.now() - startTime,
        }

        const history = JSON.parse(localStorage.getItem('flux-ai-history') || '[]')
        history.unshift(historyItem)
        if (history.length > 100) history.pop()
        localStorage.setItem('flux-ai-history', JSON.stringify(history))

        break // 成功，退出循环

      } catch (error) {
        console.error('Generation error:', error)
        if (attempt === maxRetries) {
          setRetryInfo(null)
          alert(
            language === 'zh-TW'
              ? `生成失敗：${error instanceof Error ? error.message : t('alert.error')}`
              : `Generation failed: ${error instanceof Error ? error.message : t('alert.error')}`
          )
        }
      }
    }

    setIsGenerating(false)
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background">
        {/* 头部 */}
        <header className="border-b bg-card sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t('header.title')}</h1>
                  <p className="text-sm text-muted-foreground">{t('header.subtitle')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitch />
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg border bg-background hover:bg-accent transition-colors"
                  title={darkMode ? (language === 'zh-TW' ? '淺色模式' : 'Light Mode') : (language === 'zh-TW' ? '深色模式' : 'Dark Mode')}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Tabs 切换 */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setActiveTab('generate')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'generate'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                {language === 'zh-TW' ? '生成圖片' : 'Generate'}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'history'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <History className="w-4 h-4" />
                {language === 'zh-TW' ? '歷史記錄' : 'History'}
              </button>
            </div>
          </div>
        </header>

        {/* 主内容 */}
        <main className="container mx-auto px-4 py-6">
          {activeTab === 'generate' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧：提示词 + 预设 */}
              <div className="lg:col-span-1 space-y-4">
                {/* 提示词面板 */}
                <div className="border rounded-lg p-4 bg-card">
                  <h2 className="font-semibold mb-4">{t('prompt.title')}</h2>

                  {/* 正面提示词 */}
                  <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium">{t('prompt.positive')}</label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={t('prompt.positivePlaceholder')}
                      className="w-full px-3 py-2 border rounded-md bg-background resize-none"
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      {prompt.length}/1000 {t('prompt.charCount')}
                    </p>
                  </div>

                  {/* 负面提示词 */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('prompt.negative')}</label>
                    <textarea
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder={t('prompt.negativePlaceholder')}
                      className="w-full px-3 py-2 border rounded-md bg-background resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                {/* 预设管理 */}
                <div className="border rounded-lg p-4 bg-card">
                  <PresetManager
                    currentParams={{
                      prompt,
                      negative_prompt: negativePrompt,
                      model,
                      width,
                      height,
                      quality_mode: qualityMode,
                      style: selectedStyle,
                      seed,
                    }}
                    onApplyPreset={handleApplyPreset}
                  />
                </div>
              </div>

              {/* 中间：生成结果 */}
              <div className="lg:col-span-1">
                <div className="border rounded-lg p-4 bg-card sticky top-24">
                  <div 
                    className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => generatedImage && setShowImageViewer(true)}
                  >
                    {generatedImage ? (
                      <img
                        src={generatedImage}
                        alt="Generated"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>{t('result.placeholder')}</p>
                      </div>
                    )}
                  </div>
                  {generatedImage && (
                    <p className="text-xs text-center text-primary/60 mt-2">
                      {language === 'zh-TW' ? '點擊放大查看' : 'Click to enlarge'}
                    </p>
                  )}
                  
                  {/* 生成按钮 */}
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full mt-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                  >
                    {isGenerating ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        {retryInfo 
                          ? (language === 'zh-TW' ? `重試中 (${retryInfo.attempt}/${retryInfo.maxAttempts})` : `Retrying (${retryInfo.attempt}/${retryInfo.maxAttempts})`)
                          : t('button.generating')
                        }
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        {t('button.generate')}
                      </>
                    )}
                  </button>
                  
                  {/* 重试提示 */}
                  {retryInfo && isGenerating && (
                    <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-md flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-600 dark:text-amber-400">
                        <p className="font-medium">
                          {language === 'zh-TW' ? 'API 請求頻率過高' : 'API Rate Limit'}
                        </p>
                        <p className="mt-1">
                          {language === 'zh-TW' 
                            ? `${retryInfo.waitTime / 1000} 秒後重試...`
                            : `Retrying in ${retryInfo.waitTime / 1000}s...`
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 右侧：参数面板 */}
              <div className="lg:col-span-1 space-y-4">
                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="w-5 h-5" />
                    <h2 className="font-semibold">{t('params.title')}</h2>
                  </div>

                  {/* 模型选择 */}
                  <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium">{t('params.model')}</label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value as any)}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="zimage">{t('models.zimage')}</option>
                      <option value="flux">{t('models.flux')}</option>
                      <option value="turbo">{t('models.turbo')}</option>
                      <option value="kontext">{t('models.kontext')}</option>
                    </select>
                  </div>

                  {/* 比例选择 */}
                  <AspectRatioSelector
                    value={selectedRatio}
                    onChange={handleRatioChange}
                  />

                  {/* 质量模式 */}
                  <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium">{t('params.quality')}</label>
                    <select
                      value={qualityMode}
                      onChange={(e) => setQualityMode(e.target.value as any)}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="economy">{t('quality.economy')}</option>
                      <option value="standard">{t('quality.standard')}</option>
                      <option value="ultra">{t('quality.ultra')}</option>
                    </select>
                  </div>

                  {/* 风格选择 */}
                  <EnhancedStyleSelector
                    value={selectedStyle}
                    onChange={handleStyleChange}
                  />

                  {/* 高级参数（折叠） */}
                  <div className="mt-4">
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full"
                    >
                      {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {language === 'zh-TW' ? '進階參數' : 'Advanced'}
                    </button>
                    {showAdvanced && (
                      <div className="mt-3 space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            {t('params.seed')} {t('params.seedHint')}
                          </label>
                          <input
                            type="number"
                            value={seed}
                            onChange={(e) => setSeed(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            min={-1}
                            max={999999}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">{language === 'zh-TW' ? '寬度' : 'Width'}:</span> {width}px
                          </div>
                          <div>
                            <span className="font-medium">{language === 'zh-TW' ? '高度' : 'Height'}:</span> {height}px
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 历史记录页面 */
            <div className="h-[calc(100vh-16rem)]">
              <HistoryPanel />
            </div>
          )}
        </main>

        {/* 底部 */}
        <footer className="border-t mt-8 py-6 bg-card">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>{t('footer.poweredBy')}</p>
            <p className="mt-2">{t('footer.copyright')}</p>
          </div>
        </footer>

        {/* 高级图片查看器 */}
        {showImageViewer && generatedImage && (
          <ImageViewer
            image={generatedImage}
            onClose={() => setShowImageViewer(false)}
            metadata={{
              prompt,
              model,
              width,
              height,
              seed: seed !== -1 ? seed : undefined,
              style: selectedStyle,
            }}
          />
        )}
      </div>
    </div>
  )
}

export default App