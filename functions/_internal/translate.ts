// Cloudflare Workers AI 翻譯 API
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { text } = await context.request.json() as { text: string }

    if (!text || !text.trim()) {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 檢測是否包含中文
    const hasChinese = /[\u4e00-\u9fa5]/.test(text)
    if (!hasChinese) {
      // 如果沒有中文，直接返回原文
      return new Response(JSON.stringify({ translated: text }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 使用 Cloudflare Workers AI 翻譯
    const ai = context.env.AI
    
    const response = await ai.run('@cf/meta/m2m100-1.2b', {
      text: text,
      source_lang: 'zh',  // 修正：使用 'zh' 代替 'chinese'
      target_lang: 'en'   // 修正：使用 'en' 代替 'english'
    })

    const translated = response.translated_text || text

    return new Response(JSON.stringify({ translated }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Translation error:', error)
    
    // 翻譯失敗時返回原文
    try {
      const { text } = await context.request.json() as { text: string }
      return new Response(JSON.stringify({ 
        translated: text,
        error: 'Translation failed, using original text'
      }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch {
      return new Response(JSON.stringify({ 
        error: 'Invalid request'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }
}

interface Env {
  AI: any
}