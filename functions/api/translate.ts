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

    // 檢查 AI 繫定是否存在
    if (!context.env.AI) {
      console.error('Workers AI not bound. Please add AI binding in Cloudflare Dashboard.')
      return new Response(JSON.stringify({ 
        translated: text,
        error: 'Workers AI not configured'
      }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 使用 Cloudflare Workers AI 翻譯
    const ai = context.env.AI
    
    const response = await ai.run('@cf/meta/m2m100-1.2b', {
      text: text,
      source_lang: 'zh',
      target_lang: 'en'
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