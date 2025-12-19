import { useState, useEffect } from 'react'
import { Save, Trash2, Star } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultPresets, getAllPresets, saveCustomPreset, deleteCustomPreset, type Preset } from '../utils/presets'
import type { GenerateRequest } from '../types'

interface PresetManagerProps {
  currentParams: Partial<GenerateRequest>
  onApplyPreset: (params: Partial<GenerateRequest>) => void
}

export function PresetManager({ currentParams, onApplyPreset }: PresetManagerProps) {
  const { language } = useLanguage()
  const [presets, setPresets] = useState<Preset[]>([])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [newPresetName, setNewPresetName] = useState('')

  useEffect(() => {
    setPresets(getAllPresets())
  }, [])

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return

    const newPreset: Preset = {
      id: `custom-${Date.now()}`,
      name: newPresetName,
      nameEn: newPresetName,
      description: '',
      descriptionEn: '',
      category: 'custom',
      params: currentParams,
    }

    saveCustomPreset(newPreset)
    setPresets(getAllPresets())
    setNewPresetName('')
    setShowSaveDialog(false)
  }

  const handleDeletePreset = (id: string) => {
    if (confirm(language === 'zh-TW' ? '確定要刪除此預設？' : 'Delete this preset?')) {
      deleteCustomPreset(id)
      setPresets(getAllPresets())
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          {language === 'zh-TW' ? '參數預設' : 'Presets'}
        </label>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          <Save className="w-3 h-3 inline mr-1" />
          {language === 'zh-TW' ? '保存當前參數' : 'Save Current'}
        </button>
      </div>

      {/* 预设列表 */}
      <div className="grid grid-cols-2 gap-2">
        {presets.map(preset => (
          <div
            key={preset.id}
            className="border rounded-md p-3 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="font-medium text-sm">
                  {language === 'zh-TW' ? preset.name : preset.nameEn}
                </div>
                {preset.description && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {language === 'zh-TW' ? preset.description : preset.descriptionEn}
                  </div>
                )}
              </div>
              {preset.category === 'custom' && (
                <button
                  onClick={() => handleDeletePreset(preset.id)}
                  className="p-1 text-destructive hover:bg-destructive/10 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
            <button
              onClick={() => onApplyPreset(preset.params)}
              className="w-full px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
            >
              {language === 'zh-TW' ? '套用' : 'Apply'}
            </button>
          </div>
        ))}
      </div>

      {/* 保存对话框 */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {language === 'zh-TW' ? '保存參數預設' : 'Save Preset'}
            </h3>
            <input
              type="text"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              placeholder={language === 'zh-TW' ? '預設名稱' : 'Preset name'}
              className="w-full px-3 py-2 border rounded-md bg-background mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
              >
                {language === 'zh-TW' ? '取消' : 'Cancel'}
              </button>
              <button
                onClick={handleSavePreset}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:opacity-90"
              >
                {language === 'zh-TW' ? '保存' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}