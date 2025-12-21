// =================================================================================
//  項目: Flux AI Pro - Extended Styles Edition
//  版本: 9.6.1-extended-styles-fixed (✅ 圖片顯示修復)
//  作者: Enhanced by AI Assistant  
//  日期: 2025-12-22
//  更新: ✅ 修復圖片顯示問題 | ✅ 添加緩存控制頭
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.6.1-extended-styles-fixed",
  API_MASTER_KEY: "1",
  FETCH_TIMEOUT: 120000,
  MAX_RETRIES: 3,
  
  POLLINATIONS_AUTH: {
    enabled: true,
    token: "",  // 將從 env.POLLINATIONS_API_KEY 讀取
    method: "header"
  },
  
  PRESET_SIZES: {
    "square-1k": { name: "方形 1024x1024", width: 1024, height: 1024 },
    "square-1.5k": { name: "方形 1536x1536", width: 1536, height: 1536 },
    "square-2k": { name: "方形 2048x2048", width: 2048, height: 2048 },
    "portrait-9-16-hd": { name: "豎屏 9:16 HD", width: 1080, height: 1920 },
    "landscape-16-9-hd": { name: "橫屏 16:9 HD", width: 1920, height: 1080 },
    "instagram-square": { name: "Instagram 方形", width: 1080, height: 1080 },
    "wallpaper-fhd": { name: "桌布 Full HD", width: 1920, height: 1080 }
  },
  
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://gen.pollinations.ai",
      pathPrefix: "/image",
      type: "direct",
      auth_mode: "required",
      requires_key: true,
      enabled: true,
      default: true,
      models: [
        { id: "zimage", name: "Z-Image Turbo ⚡", confirmed: true, category: "zimage", max_size: 2048 },
        { id: "flux", name: "Flux 標準版", confirmed: true, category: "flux", max_size: 2048 },
        { id: "turbo", name: "Flux Turbo ⚡", confirmed: true, category: "flux", max_size: 2048 },
        { id: "kontext", name: "Kontext 🎨", confirmed: true, category: "kontext", max_size: 2048, supports_reference_images: true, max_reference_images: 1 }
      ]
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_PRESETS: {
    none: { name: "無風格", prompt: "", negative: "", category: "basic", icon: "⚡", description: "使用原始提示詞" },
    anime: { name: "動漫風格", prompt: "anime style, anime art, vibrant colors, cel shading, detailed anime", negative: "realistic, photograph, 3d, ugly", category: "illustration", icon: "🎭", description: "日系動漫風格" },
    ghibli: { name: "吉卜力", prompt: "Studio Ghibli style, Hayao Miyazaki, anime, soft colors, whimsical, detailed background, hand-drawn", negative: "realistic, dark, 3D, western animation", category: "illustration", icon: "🍃", description: "宮崎駿動畫風格" },
    manga: { name: "日本漫畫", prompt: "manga style, japanese comic art, black and white, screentones, halftone patterns, dynamic poses, detailed linework", negative: "color, colorful, realistic, photo, western comic", category: "manga", icon: "📖", description: "經典日本漫畫黑白網點" },
    "manga-color": { name: "彩色日漫", prompt: "colored manga style, japanese comic art, vibrant colors, cel shading, clean linework, digital coloring", negative: "realistic, photo, western style, messy", category: "manga", icon: "🎨", description: "彩色日本漫畫風格" },
    "american-comic": { name: "美式漫畫", prompt: "american comic book style, bold lines, vibrant colors, superhero art, dynamic action, dramatic shading", negative: "anime, manga, realistic photo, soft", category: "manga", icon: "💥", description: "美國超級英雄漫畫" },
    "korean-webtoon": { name: "韓國網漫", prompt: "korean webtoon style, manhwa art, detailed linework, soft colors, romantic, vertical scroll format", negative: "american comic, rough sketch, dark", category: "manga", icon: "📱", description: "韓國網路漫畫風格" },
    chibi: { name: "Q版漫畫", prompt: "chibi style, super deformed, cute, kawaii, big head small body, simple features, adorable", negative: "realistic proportions, serious, dark", category: "manga", icon: "🥰", description: "Q版可愛漫畫風格" },
    "black-white": { name: "黑白", prompt: "black and white, monochrome, high contrast, dramatic lighting, grayscale", negative: "color, colorful, vibrant, saturated", category: "monochrome", icon: "⚫⚪", description: "純黑白高對比效果" },
    sketch: { name: "素描", prompt: "pencil sketch, hand drawn, graphite drawing, detailed shading, artistic sketch, loose lines", negative: "color, digital, polished, photo", category: "monochrome", icon: "✏️", description: "鉛筆素描手繪質感" },
    "ink-drawing": { name: "水墨畫", prompt: "traditional chinese ink painting, sumi-e, brush strokes, minimalist, zen aesthetic, black ink on white paper", negative: "color, western style, detailed, cluttered", category: "monochrome", icon: "🖌️", description: "中國傳統水墨畫" },
    photorealistic: { name: "寫實照片", prompt: "photorealistic, 8k uhd, high quality, detailed, professional photography, sharp focus", negative: "anime, cartoon, illustration, painting, drawing, art", category: "realistic", icon: "📷", description: "攝影級寫實效果" },
    "oil-painting": { name: "油畫", prompt: "oil painting, canvas texture, visible brushstrokes, rich colors, artistic, masterpiece", negative: "photograph, digital art, anime, flat", category: "painting", icon: "🖼️", description: "經典油畫質感" },
    watercolor: { name: "水彩畫", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors", negative: "photograph, digital, sharp edges, 3d", category: "painting", icon: "💧", description: "清新水彩風格" },
    "pixel-art": { name: "像素藝術", prompt: "pixel art, 8-bit, 16-bit, retro gaming style, pixelated, nostalgic, limited color palette", negative: "high resolution, smooth, realistic, detailed", category: "digital", icon: "🎮", description: "像素藝術復古遊戲" },
    "3d-render": { name: "3D渲染", prompt: "3d render, cinema 4d, octane render, detailed, professional lighting, ray tracing, photorealistic 3d", negative: "2d, flat, hand drawn, sketchy", category: "digital", icon: "🎬", description: "專業3D渲染寫實光影" },
    cyberpunk: { name: "賽博朋克", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style", negative: "natural, rustic, medieval, fantasy", category: "scifi", icon: "🌃", description: "賽博朋克未來科幻" },
    fantasy: { name: "奇幻風格", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration, mystical, enchanted", negative: "modern, realistic, mundane, contemporary", category: "fantasy", icon: "🐉", description: "奇幻魔法世界" }
  },
  
  STYLE_CATEGORIES: {
    'basic': { name: '基礎', icon: '⚡', order: 1 },
    'illustration': { name: '插畫動畫', icon: '🎨', order: 2 },
    'manga': { name: '漫畫風格', icon: '📖', order: 3 },
    'monochrome': { name: '黑白單色', icon: '⚫', order: 4 },
    'realistic': { name: '寫實照片', icon: '📷', order: 5 },
    'painting': { name: '繪畫風格', icon: '🖼️', order: 6 },
    'digital': { name: '數位風格', icon: '💻', order: 7 },
    'scifi': { name: '科幻', icon: '🚀', order: 8 },
    'fantasy': { name: '奇幻', icon: '🐉', order: 9 }
  },
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: {
      "zimage": { min: 8, optimal: 15, max: 25 },
      "flux": { min: 15, optimal: 20, max: 30 },
      "turbo": { min: 4, optimal: 8, max: 12 },
      "kontext": { min: 18, optimal: 25, max: 35 }
    },
    SIZE_MULTIPLIER: {
      small: { threshold: 512 * 512, multiplier: 0.8 },
      medium: { threshold: 1024 * 1024, multiplier: 1.0 },
      large: { threshold: 1536 * 1536, multiplier: 1.15 },
      xlarge: { threshold: 2048 * 2048, multiplier: 1.3 }
    },
    STYLE_ADJUSTMENT: {
      "photorealistic": 1.1,
      "oil-painting": 1.05,
      "watercolor": 0.95,
      "sketch": 0.9,
      "manga": 1.0,
      "pixel-art": 0.85,
      "3d-render": 1.15,
      "default": 1.0
    }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: { name: "經濟模式", min_resolution: 1024, max_resolution: 2048, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準模式", min_resolution: 1280, max_resolution: 2048, steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
      ultra: { name: "超高清模式", min_resolution: 1536, max_resolution: 2048, steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true }
    },
    HD_PROMPTS: {
      basic: "high quality, detailed, sharp",
      enhanced: "high quality, highly detailed, sharp focus, professional, 8k uhd",
      maximum: "masterpiece, best quality, ultra detailed, 8k uhd, high resolution, professional photography, sharp focus, HDR"
    },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, low resolution, pixelated, artifacts, noise"
  }
};

class Logger {
  constructor() { this.logs = []; }
  add(title, data) { this.logs.push({ title, data, timestamp: new Date().toISOString() }); }
  get() { return this.logs; }
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
}

async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    if (!hasChinese) return { text: text, translated: false, reason: "No Chinese detected" };
    if (!env || !env.AI) return { text: text, translated: false, reason: "AI not configured" };
    try {
      const response = await env.AI.run("@cf/meta/m2m100-1.2b", { text: text, source_lang: "zh", target_lang: "en" });
      if (response && response.translated_text) {
        return { text: response.translated_text, translated: true, original: text, model: "m2m100-1.2b" };
      }
    } catch (error) { console.error("Translation failed:", error.message); }
    return { text: text, translated: false };
  } catch (error) {
    return { text: text, translated: false, error: error.message };
  }
}

class HDOptimizer {
  static optimize(prompt, negativePrompt, model, width, height, qualityMode = 'standard', autoHD = true) {
    if (!autoHD || !CONFIG.HD_OPTIMIZATION.enabled) return { prompt, negativePrompt, width, height, optimized: false };
    const hdConfig = CONFIG.HD_OPTIMIZATION;
    const modeConfig = hdConfig.QUALITY_MODES[qualityMode] || hdConfig.QUALITY_MODES.standard;
    let enhancedPrompt = prompt;
    if (hdConfig.HD_PROMPTS[modeConfig.hd_level]) enhancedPrompt = prompt + ", " + hdConfig.HD_PROMPTS[modeConfig.hd_level];
    let enhancedNegative = negativePrompt || "";
    if (qualityMode !== 'economy') enhancedNegative = enhancedNegative ? enhancedNegative + ", " + hdConfig.HD_NEGATIVE : hdConfig.HD_NEGATIVE;
    return { prompt: enhancedPrompt, negativePrompt: enhancedNegative, width, height, optimized: true, quality_mode: qualityMode, hd_level: modeConfig.hd_level };
  }
}

class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    try {
      if (!style || style === 'none' || style === '') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      const styleConfig = CONFIG.STYLE_PRESETS[style];
      if (!styleConfig) return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      let enhancedPrompt = prompt;
      if (styleConfig.prompt && styleConfig.prompt.trim()) enhancedPrompt = prompt + ", " + styleConfig.prompt;
      let enhancedNegative = negativePrompt || "";
      if (styleConfig.negative && styleConfig.negative.trim()) enhancedNegative = enhancedNegative ? enhancedNegative + ", " + styleConfig.negative : styleConfig.negative;
      return { enhancedPrompt, enhancedNegative };
    } catch (error) {
      return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
    }
  }
}

async function fetchWithTimeout(url, options = {}, timeout = CONFIG.FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') throw new Error("Request timeout after " + timeout + "ms");
    throw error;
  }
}

function corsHeaders(additionalHeaders = {}) {
  return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With', 'Access-Control-Max-Age': '86400', ...additionalHeaders };
}

class PollinationsProvider {
  constructor(config, env) {
    this.config = config;
    this.name = config.name;
    this.env = env;
  }
  
  async generate(prompt, options, logger) {
    const { model = "zimage", width = 1024, height = 1024, seed = -1, negativePrompt = "", guidance = 7.5, steps = 20, style = "none", autoOptimize = true, autoHD = true, qualityMode = 'standard', referenceImages = [] } = options;
    const hdOptimization = HDOptimizer.optimize(prompt, negativePrompt, model, width, height, qualityMode, autoHD);
    const finalPrompt = hdOptimization.prompt;
    const finalNegativePrompt = hdOptimization.negativePrompt;
    const finalWidth = hdOptimization.width;
    const finalHeight = hdOptimization.height;
    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(finalPrompt, style, finalNegativePrompt);
    logger.add("🎨 Style Processing", { selected_style: style, style_name: CONFIG.STYLE_PRESETS[style]?.name || style, style_applied: style !== 'none' });
    const translation = await translateToEnglish(enhancedPrompt, this.env);
    const finalPromptForAPI = translation.text;
    if (translation.translated) logger.add("🌐 Auto Translation", { original_zh: translation.original, translated_en: finalPromptForAPI.substring(0, 100), success: true });
    logger.add("🎨 Generation Config", { provider: this.name, model, dimensions: finalWidth + "x" + finalHeight, quality_mode: qualityMode, style_applied: style !== 'none', auto_translated: translation.translated });
    const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    let fullPrompt = finalPromptForAPI;
    if (enhancedNegative && enhancedNegative.trim()) fullPrompt = finalPromptForAPI + " [negative: " + enhancedNegative + "]";
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const pathPrefix = this.config.pathPrefix || "";
    let baseUrl = this.config.endpoint + pathPrefix + "/" + encodedPrompt;
    const params = new URLSearchParams();
    params.append('model', model);
    params.append('width', finalWidth.toString());
    params.append('height', finalHeight.toString());
    params.append('seed', currentSeed.toString());
    params.append('nologo', 'true');
    params.append('enhance', 'false');
    params.append('private', 'true');
    if (referenceImages && referenceImages.length > 0) params.append('image', referenceImages.join(','));
    if (guidance !== 7.5) params.append('guidance', guidance.toString());
    if (steps !== 20) params.append('steps', steps.toString());
    const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Accept': 'image/*', 'Referer': 'https://pollinations.ai/' };
    const authConfig = CONFIG.POLLINATIONS_AUTH;
    if (authConfig.enabled && authConfig.token) {
      headers['Authorization'] = `Bearer ${authConfig.token}`;
      logger.add("🔐 API Authentication", { method: "Bearer Token", enabled: true });
    } else {
      logger.add("⚠️ No API Key", { authenticated: false, warning: "未認證的請求可能會失敗" });
    }
    const url = baseUrl + '?' + params.toString();
    for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
      try {
        const response = await fetchWithTimeout(url, { method: 'GET', headers }, 120000);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            logger.add("✅ Success", { url: response.url, model, size: finalWidth + "x" + finalHeight, style, authenticated: authConfig.enabled && !!authConfig.token });
            const imageBlob = await response.blob();
            const imageBuffer = await imageBlob.arrayBuffer();
            return { imageData: imageBuffer, contentType, url: response.url, model, seed: currentSeed, style, style_name: CONFIG.STYLE_PRESETS[style]?.name || style, width: finalWidth, height: finalHeight, quality_mode: qualityMode, auto_translated: translation.translated, authenticated: authConfig.enabled && !!authConfig.token };
          }
        } else if (response.status === 401) {
          throw new Error("Authentication failed: Invalid or missing API key");
        } else if (response.status === 403) {
          throw new Error("Access forbidden: API key may lack required permissions");
        } else {
          throw new Error("HTTP " + response.status);
        }
      } catch (e) {
        logger.add("❌ Request Failed", { error: e.message, retry: retry + 1 });
        if (retry < CONFIG.MAX_RETRIES - 1) await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
        else throw new Error("Generation failed: " + e.message);
      }
    }
    throw new Error("Failed after " + CONFIG.MAX_RETRIES + " retries");
  }
}

class MultiProviderRouter {
  constructor(apiKeys = {}, env = null) {
    this.providers = {};
    this.apiKeys = apiKeys;
    this.env = env;
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
      if (config.enabled && key === 'pollinations') this.providers[key] = new PollinationsProvider(config, env);
    }
  }
  getProvider(providerName = null) {
    if (providerName && this.providers[providerName]) return { name: providerName, instance: this.providers[providerName] };
    const defaultName = CONFIG.DEFAULT_PROVIDER;
    if (this.providers[defaultName]) return { name: defaultName, instance: this.providers[defaultName] };
    const firstProvider = Object.keys(this.providers)[0];
    if (firstProvider) return { name: firstProvider, instance: this.providers[firstProvider] };
    throw new Error('No available provider');
  }
  async generate(prompt, options, logger) {
    const { provider: requestedProvider = null, numOutputs = 1 } = options;
    const { name: providerName, instance: provider } = this.getProvider(requestedProvider);
    const results = [];
    for (let i = 0; i < numOutputs; i++) {
      const currentOptions = { ...options, seed: options.seed === -1 ? -1 : options.seed + i };
      const result = await provider.generate(prompt, currentOptions, logger);
      results.push(result);
    }
    return results;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const startTime = Date.now();
    const clientIP = getClientIP(request);
    if (env.POLLINATIONS_API_KEY) {
      CONFIG.POLLINATIONS_AUTH.enabled = true;
      CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY;
    } else {
      CONFIG.POLLINATIONS_AUTH.enabled = false;
      CONFIG.POLLINATIONS_AUTH.token = "";
    }
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders() });
    try {
      let response;
      if (url.pathname === '/' || url.pathname === '') {
        response = handleUI(request);
      } else if (url.pathname === '/_internal/generate') {
        response = await handleInternalGenerate(request, env, ctx);
      } else if (url.pathname === '/api/translate') {
        response = await handleTranslateAPI(request, env);
      } else if (url.pathname === '/health') {
        response = new Response(JSON.stringify({ status: 'ok', version: CONFIG.PROJECT_VERSION, timestamp: new Date().toISOString(), workers_ai: !!env.AI, styles_count: Object.keys(CONFIG.STYLE_PRESETS).length, api_auth: { enabled: CONFIG.POLLINATIONS_AUTH.enabled, has_token: !!CONFIG.POLLINATIONS_AUTH.token } }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      } else {
        response = new Response(JSON.stringify({ error: 'Not Found', message: '此 Worker 僅提供 Web UI 界面', available_paths: ['/', '/health', '/_internal/generate', '/api/translate'] }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      const duration = Date.now() - startTime;
      const headers = new Headers(response.headers);
      headers.set('X-Response-Time', duration + 'ms');
      headers.set('X-Worker-Version', CONFIG.PROJECT_VERSION);
      return new Response(response.body, { status: response.status, headers });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: { message: error.message, type: 'worker_error' } }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
  }
};

async function handleTranslateAPI(request, env) {
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  try {
    const { text } = await request.json();
    if (!text || !text.trim()) return new Response(JSON.stringify({ error: 'Text is required' }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    if (!hasChinese) return new Response(JSON.stringify({ translated: text }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    const result = await translateToEnglish(text, env);
    return new Response(JSON.stringify({ translated: result.text, success: result.translated || false }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (error) {
    try {
      const { text } = await request.json();
      return new Response(JSON.stringify({ error: 'Translation failed', translated: text }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
  }
}

async function handleInternalGenerate(request, env, ctx) {
  const logger = new Logger();
  const startTime = Date.now();
  try {
    const body = await request.json();
    const prompt = body.prompt;
    if (!prompt || !prompt.trim()) throw new Error("Prompt is required");
    let width = 1024, height = 1024;
    if (body.width) width = body.width;
    if (body.height) height = body.height;
    let referenceImages = [];
    if (body.reference_images && Array.isArray(body.reference_images)) {
      referenceImages = body.reference_images.filter(url => { try { new URL(url); return true; } catch { return false; } });
    }
    const seedInput = body.seed !== undefined ? body.seed : -1;
    let seedValue = -1;
    if (seedInput !== -1) {
      const parsedSeed = parseInt(seedInput);
      if (!isNaN(parsedSeed) && parsedSeed >= 0 && parsedSeed <= 999999) seedValue = parsedSeed;
    }
    const options = { provider: body.provider || null, model: body.model || "zimage", width: Math.min(Math.max(width, 256), 2048), height: Math.min(Math.max(height, 256), 2048), numOutputs: Math.min(Math.max(body.n || 1, 1), 4), seed: seedValue, negativePrompt: body.negative_prompt || "", guidance: body.guidance_scale || 7.5, steps: body.steps || 20, style: body.style || "none", autoOptimize: body.auto_optimize !== false, autoHD: body.auto_hd !== false, qualityMode: body.quality_mode || 'standard', referenceImages };
    const router = new MultiProviderRouter({}, env);
    const results = await router.generate(prompt, options, logger);
    const duration = Date.now() - startTime;
    if (results.length === 1 && results[0].imageData) {
      const result = results[0];
      return new Response(result.imageData, {
        headers: {
          'Content-Type': result.contentType || 'image/png',
          'Content-Disposition': `inline; filename="flux-ai-${result.seed}.png"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Model': result.model,
          'X-Seed': result.seed.toString(),
          'X-Width': result.width.toString(),
          'X-Height': result.height.toString(),
          'X-Generation-Time': duration + 'ms',
          'X-Quality-Mode': result.quality_mode,
          'X-Style': result.style,
          'X-Style-Name': result.style_name || result.style,
          ...corsHeaders()
        }
      });
    }
    const imagesData = await Promise.all(results.map(async (r) => {
      if (r.imageData) {
        const uint8Array = new Uint8Array(r.imageData);
        let binary = '';
        const len = uint8Array.byteLength;
        for (let i = 0; i < len; i++) binary += String.fromCharCode(uint8Array[i]);
        const base64 = btoa(binary);
        return { image: `data:${r.contentType};base64,${base64}`, model: r.model, seed: r.seed, width: r.width, height: r.height, quality_mode: r.quality_mode, style: r.style, style_name: r.style_name || r.style };
      }
      return null;
    }));
    return new Response(JSON.stringify({ created: Math.floor(Date.now() / 1000), data: imagesData.filter(d => d !== null), generation_time_ms: duration }), { headers: corsHeaders({ 'Content-Type': 'application/json', 'X-Generation-Time': duration + 'ms' }) });
  } catch (e) {
    logger.add("❌ Error", e.message);
    return new Response(JSON.stringify({ error: { message: e.message, debug_logs: logger.get() } }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

function handleUI() {
  const authStatus = CONFIG.POLLINATIONS_AUTH.enabled ? '<span style="color:#22c55e;font-weight:600;font-size:12px">🔐 已認證</span>' : '<span style="color:#f59e0b;font-weight:600;font-size:12px">⚠️ 需要 API Key</span>';
  const apiEndpoint = CONFIG.PROVIDERS.pollinations.endpoint;
  const stylesCount = Object.keys(CONFIG.STYLE_PRESETS).length;
  const styleCategories = CONFIG.STYLE_CATEGORIES;
  const stylePresets = CONFIG.STYLE_PRESETS;
  let styleOptionsHTML = '';
  const sortedCategories = Object.entries(styleCategories).sort((a, b) => a[1].order - b[1].order);
  for (const [categoryKey, categoryInfo] of sortedCategories) {
    const stylesInCategory = Object.entries(stylePresets).filter(([key, style]) => style.category === categoryKey);
    if (stylesInCategory.length > 0) {
      styleOptionsHTML += `<optgroup label="${categoryInfo.icon} ${categoryInfo.name}">`;
      for (const [styleKey, styleConfig] of stylesInCategory) {
        const selected = styleKey === 'none' ? ' selected' : '';
        styleOptionsHTML += `<option value="${styleKey}"${selected}>${styleConfig.icon} ${styleConfig.name}</option>`;
      }
      styleOptionsHTML += '</optgroup>';
    }
  }
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:#0a0a0a;color:#fff;min-height:100vh;padding:20px}
.container{max-width:1400px;margin:0 auto}
.header{text-align:center;margin-bottom:40px}
.logo{font-size:32px;font-weight:800;color:#f59e0b;margin-bottom:10px}
.status{display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.1);border-radius:8px;margin:10px}
form{background:rgba(255,255,255,0.05);padding:30px;border-radius:12px;margin-bottom:20px}
.form-group{margin-bottom:20px}
label{display:block;margin-bottom:8px;font-weight:600;color:#e5e7eb}
input,select,textarea{width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:14px}
textarea{min-height:100px;font-family:inherit;resize:vertical}
.btn{width:100%;padding:14px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border:none;border-radius:8px;color:#fff;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.3s}
.btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(245,158,11,0.4)}
.btn:disabled{opacity:0.5;cursor:not-allowed;transform:none}
#results{margin-top:20px}
.result-item{background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;margin-bottom:20px}
.result-item img{max-width:100%;border-radius:8px;margin-top:10px;display:block}
.loading{text-align:center;padding:40px;color:#9ca3af}
.spinner{border:3px solid rgba(255,255,255,0.1);border-top:3px solid #f59e0b;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 15px}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.error{background:rgba(239,68,68,0.1);border:1px solid #ef4444;color:#ef4444;padding:15px;border-radius:8px;margin:20px 0}
.success{background:rgba(16,185,129,0.1);border:1px solid #10b981;color:#10b981;padding:15px;border-radius:8px;margin:20px 0}
.hint{font-size:12px;color:#6b7280;margin-top:5px}
</style>
</head>
<body>
<div class="container">
<div class="header">
<div class="logo">🎨 Flux AI Pro</div>
<div class="status">版本: ${CONFIG.PROJECT_VERSION}</div>
<div class="status">${authStatus}</div>
<div class="status">📡 ${apiEndpoint}</div>
<div class="status">🎨 ${stylesCount} 種風格</div>
</div>
<form id="generateForm">
<div class="form-group">
<label>提示詞 (支持中文自動翻譯)</label>
<textarea id="prompt" placeholder="描述你想生成的圖像..." required></textarea>
<div class="hint">✅ 支持中文，會自動翻譯成英文</div>
</div>
<div class="form-group">
<label>負面提示詞 (可選)</label>
<textarea id="negativePrompt" placeholder="描述不想要的內容..." rows="3"></textarea>
</div>
<div class="form-group">
<label>模型選擇</label>
<select id="model">
<option value="zimage" selected>Z-Image Turbo ⚡</option>
<option value="flux">Flux 標準版</option>
<option value="turbo">Flux Turbo ⚡</option>
<option value="kontext">Kontext 🎨</option>
</select>
</div>
<div class="form-group">
<label>藝術風格</label>
<select id="style">
${styleOptionsHTML}
</select>
<div class="hint">✨ ${stylesCount} 種風格可選</div>
</div>
<div class="form-group">
<label>質量模式</label>
<select id="qualityMode">
<option value="economy">經濟模式 (快速)</option>
<option value="standard" selected>標準模式 (平衡)</option>
<option value="ultra">超高清模式 (極致)</option>
</select>
</div>
<div class="form-group">
<label>圖片尺寸</label>
<select id="size">
<option value="1024x1024" selected>方形 1024x1024</option>
<option value="1536x1536">方形 1536x1536</option>
<option value="2048x2048">方形 2048x2048</option>
<option value="1080x1920">豎屏 1080x1920</option>
<option value="1920x1080">橫屏 1920x1080</option>
</select>
</div>
<div class="form-group">
<label>Seed (-1 = 隨機)</label>
<input type="number" id="seed" value="-1" min="-1" max="999999">
</div>
<button type="submit" class="btn" id="generateBtn">🎨 開始生成</button>
</form>
<div id="results"></div>
</div>
<script>
let currentBlobUrl = null;
const form = document.getElementById('generateForm');
const resultsDiv = document.getElementById('results');
const generateBtn = document.getElementById('generateBtn');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value;
  if (!prompt.trim()) { alert('請輸入提示詞'); return; }
  const model = document.getElementById('model').value;
  const style = document.getElementById('style').value;
  const qualityMode = document.getElementById('qualityMode').value;
  const size = document.getElementById('size').value;
  const [width, height] = size.split('x').map(Number);
  const seed = parseInt(document.getElementById('seed').value);
  const negativePrompt = document.getElementById('negativePrompt').value;
  generateBtn.disabled = true;
  generateBtn.innerHTML = '<div class="spinner"></div>生成中...';
  resultsDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p>正在生成圖像，請稍候...</p></div>';
  try {
    const response = await fetch('/_internal/generate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt, model, width, height, style, quality_mode: qualityMode, seed, n: 1, negative_prompt: negativePrompt, auto_optimize: true, auto_hd: true })
    });
    const contentType = response.headers.get('content-type');
    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = '生成失敗';
      try { const errorJson = JSON.parse(errorText); errorMsg = errorJson.error?.message || errorMsg; } catch (e) { errorMsg = errorText.substring(0, 200); }
      resultsDiv.innerHTML = '<div class="error"><strong>錯誤:</strong> ' + errorMsg + '</div>';
      return;
    }
    if (contentType && contentType.startsWith('image/')) {
      if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      currentBlobUrl = imageUrl;
      const timestamp = Date.now();
      const modelUsed = response.headers.get('X-Model') || model;
      const seedUsed = response.headers.get('X-Seed') || seed;
      const styleUsed = response.headers.get('X-Style-Name') || style;
      resultsDiv.innerHTML = `<div class="success">✅ 生成成功！</div><div class="result-item"><div><strong>模型:</strong> ${modelUsed}</div><div><strong>風格:</strong> ${styleUsed}</div><div><strong>Seed:</strong> ${seedUsed}</div><div><strong>尺寸:</strong> ${width}x${height}</div><img src="${imageUrl}?t=${timestamp}" alt="Generated" key="${timestamp}"><div style="margin-top:10px"><a href="${imageUrl}" download="flux-ai-${seedUsed}.png" class="btn">💾 下載圖片</a></div></div>`;
    } else if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (data.error) {
        resultsDiv.innerHTML = '<div class="error"><strong>錯誤:</strong> ' + data.error.message + '</div>';
      } else {
        let html = '<div class="success">✅ 生成成功！</div>';
        data.data.forEach((item, index) => {
          const ts = Date.now() + index;
          html += `<div class="result-item"><div><strong>模型:</strong> ${item.model}</div><div><strong>風格:</strong> ${item.style_name || item.style}</div><div><strong>Seed:</strong> ${item.seed}</div><div><strong>尺寸:</strong> ${item.width}x${item.height}</div><img src="${item.image}?t=${ts}" alt="Generated ${index + 1}" key="${ts}"><div style="margin-top:10px"><a href="${item.image}" download="flux-ai-${item.seed}.png" class="btn">💾 下載圖片</a></div></div>`;
        });
        resultsDiv.innerHTML = html;
      }
    }
  } catch (error) {
    resultsDiv.innerHTML = '<div class="error"><strong>錯誤:</strong> ' + error.message + '</div>';
  } finally {
    generateBtn.disabled = false;
    generateBtn.innerHTML = '🎨 開始生成';
  }
});
</script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}