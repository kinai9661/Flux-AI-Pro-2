import { Languages } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-background hover:bg-accent transition-colors"
      title={language === 'zh-TW' ? '切換至英文' : 'Switch to Traditional Chinese'}
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'zh-TW' ? '繁中' : 'EN'}
      </span>
    </button>
  )
}