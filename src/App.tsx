import { useState } from 'react'
import { Sparkles, Settings, History, Moon, Sun } from 'lucide-react'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate')
  
  // 生成参数状态
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [model, setModel] = useState<'zimage' | 'flux' | 'turbo' | 'kontext'>('flux')
  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(1024)
  const [seed, setSeed] = useState(-1)
  const [qualityMode, setQualityMode] = useState<'economy' | 'standard' | 'ultra'>('standard')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  // 切换主题
  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  // 生成图片
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('请输入提示词')
      return
    }

    setIsGenerating(true)
    setGeneratedImage(null)

    try {
      const response = await fetch('/_internal/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          negative_prompt: negativePrompt,
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

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error?.message || '生成失败')
      }

      // 单图直接返回 blob
      const contentType = response.headers.get('content-type')
      if (contentType?.startsWith('image/')) {
        const blob = await response.blob()
        const imageUrl = URL.createObjectURL(blob)
        setGeneratedImage(imageUrl)
      } else {
        const data = await response.json()
        if (data.data?.[0]?.image) {
          setGeneratedImage(data.data[0].image)
        }
      }
    } catch (error) {
      console.error('生成错误:', error)
      alert(error instanceof Error ? error.message : '生成失败')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background">
        {/* 头部 */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Flux AI Pro 2.0</h1>
                <p className="text-sm text-muted-foreground">基于 shadcn/ui 的现代化 AI 图像生成</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border bg-background hover:bg-accent"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* 主内容 */}
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：参数面板 */}
            <div className="lg:col-span-1 space-y-4">
              <div className="border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5" />
                  <h2 className="font-semibold">生成参数</h2>
                </div>

                {/* 模型选择 */}
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium">模型</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="zimage">Z-Image Turbo ⚡</option>
                    <option value="flux">Flux 标准版</option>
                    <option value="turbo">Flux Turbo ⚡</option>
                    <option value="kontext">Kontext 🎨</option>
                  </select>
                </div>

                {/* 尺寸 */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <label className="text-sm font-medium">宽度</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      min={256}
                      max={2048}
                      step={64}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">高度</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      min={256}
                      max={2048}
                      step={64}
                    />
                  </div>
                </div>

                {/* 质量模式 */}
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium">质量模式</label>
                  <select
                    value={qualityMode}
                    onChange={(e) => setQualityMode(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="economy">经济模式</option>
                    <option value="standard">标准模式</option>
                    <option value="ultra">超高清模式</option>
                  </select>
                </div>

                {/* Seed */}
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium">Seed (-1 = 随机)</label>
                  <input
                    type="number"
                    value={seed}
                    onChange={(e) => setSeed(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    min={-1}
                    max={999999}
                  />
                </div>

                {/* 生成按钮 */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      生成图片
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 中间：结果展示 */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-4 bg-card min-h-[400px] flex items-center justify-center">
                {generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="max-w-full h-auto rounded-lg"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>生成结果将在这里显示</p>
                  </div>
                )}
              </div>
            </div>

            {/* 右侧：提示词 */}
            <div className="lg:col-span-1 space-y-4">
              <div className="border rounded-lg p-4 bg-card">
                <h2 className="font-semibold mb-4">提示词</h2>

                {/* 正面提示词 */}
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium">正面提示词</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="描述你想要生成的图片..."
                    className="w-full px-3 py-2 border rounded-md bg-background resize-none"
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">{prompt.length}/1000</p>
                </div>

                {/* 负面提示词 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">负面提示词</label>
                  <textarea
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="blurry, low quality, distorted..."
                    className="w-full px-3 py-2 border rounded-md bg-background resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* 底部 */}
        <footer className="border-t mt-8 py-6 bg-card">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>Flux AI Pro 2.0 - Powered by Cloudflare Workers + React + shadcn/ui</p>
            <p className="mt-2">© 2025 Flux AI Pro. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App