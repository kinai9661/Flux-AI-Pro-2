// worker.js 修改版：在 fetch handler 中新增 /api/translate 路由

// 在 export default 的 fetch 函數中，在 handleInternalGenerate 之前增加：

      else if (url.pathname === '/api/translate') {
        response = await handleTranslateAPI(request, env);
      }

// 然後在文件末尾新增 handleTranslateAPI 函數：

async function handleTranslateAPI(request, env) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
  try {
    const { text } = await request.json();
    
    if (!text || !text.trim()) {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }
    
    // 檢測是否包含中文
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    if (!hasChinese) {
      return new Response(JSON.stringify({ translated: text }), {
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }
    
    // 使用現有的 translateToEnglish 函數
    const result = await translateToEnglish(text, env);
    
    return new Response(JSON.stringify({ 
      translated: result.text,
      success: result.translated || false
    }), {
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
    
  } catch (error) {
    console.error('Translation API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Translation failed',
      translated: text
    }), {
      status: 500,
      headers: corsHeaders({ 'Content-Type': 'application/json' })
    });
  }
}