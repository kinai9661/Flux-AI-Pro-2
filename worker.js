// =================================================================================
//  項目: Flux AI Pro - Radix UI Edition
//  版本: 9.7.0-radix-ui (✨ 現代化 Radix UI 界面)
//  作者: Enhanced by AI Assistant  
//  日期: 2025-12-23
//  更新: ✨ Radix UI 組件 | ✅ 45+ 種藝術風格 | ✅ 響應式設計
//  模型: zimage, flux, turbo, kontext (4個模型)
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.7.0-radix-ui",
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
      description: "官方 AI 圖像生成服務（需要 API Key）",
      features: {
        private_mode: true,
        custom_size: true,
        seed_control: true,
        negative_prompt: true,
        enhance: true,
        nologo: true,
        style_presets: true,
        auto_hd: true,
        quality_modes: true,
        auto_translate: true,
        reference_images: true,
        image_to_image: true,
        batch_generation: true,
        api_key_auth: true
      },
      models: [
        { 
          id: "zimage", 
          name: "Z-Image Turbo ⚡", 
          confirmed: true, 
          category: "zimage", 
          description: "快速 6B 參數圖像生成 (Alpha)", 
          max_size: 2048,
          pricing: { image_price: 0.0002, currency: "pollen" },
          input_modalities: ["text"],
          output_modalities: ["image"]
        },
        { 
          id: "flux", 
          name: "Flux 標準版", 
          confirmed: true, 
          category: "flux", 
          description: "快速且高質量的圖像生成", 
          max_size: 2048,
          pricing: { image_price: 0.00012, currency: "pollen" },
          input_modalities: ["text"],
          output_modalities: ["image"]
        },
        { 
          id: "turbo", 
          name: "Flux Turbo ⚡", 
          confirmed: true, 
          category: "flux", 
          description: "超快速圖像生成", 
          max_size: 2048,
          pricing: { image_price: 0.0003, currency: "pollen" },
          input_modalities: ["text"],
          output_modalities: ["image"]
        },
        { 
          id: "kontext", 
          name: "Kontext 🎨", 
          confirmed: true, 
          category: "kontext", 
          description: "上下文感知圖像生成（支持圖生圖）", 
          max_size: 2048,
          pricing: { image_price: 0.04, currency: "pollen" },
          supports_reference_images: true,
          max_reference_images: 1,
          input_modalities: ["text", "image"],
          output_modalities: ["image"]
        }
      ],
      rate_limit: null,
      max_size: { width: 2048, height: 2048 }
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
    silhouette: { name: "剪影", prompt: "silhouette art, stark contrast, black shapes, minimalist, dramatic, shadow play, clean edges", negative: "detailed, realistic, colorful, textured", category: "monochrome", icon: "👤", description: "剪影藝術極簡構圖" },
    charcoal: { name: "炭筆畫", prompt: "charcoal drawing, rough texture, dramatic shading, expressive, smudged, artistic, monochrome", negative: "clean, digital, colorful, precise", category: "monochrome", icon: "🖤", description: "炭筆繪畫粗糙質感" },
    photorealistic: { name: "寫實照片", prompt: "photorealistic, 8k uhd, high quality, detailed, professional photography, sharp focus", negative: "anime, cartoon, illustration, painting, drawing, art", category: "realistic", icon: "📷", description: "攝影級寫實效果" },
    "oil-painting": { name: "油畫", prompt: "oil painting, canvas texture, visible brushstrokes, rich colors, artistic, masterpiece", negative: "photograph, digital art, anime, flat", category: "painting", icon: "🖼️", description: "經典油畫質感" },
    watercolor: { name: "水彩畫", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors", negative: "photograph, digital, sharp edges, 3d", category: "painting", icon: "💧", description: "清新水彩風格" },
    impressionism: { name: "印象派", prompt: "impressionist painting, soft brushstrokes, light and color focus, Monet style, outdoor scene, visible brush marks", negative: "sharp, detailed, photorealistic, dark", category: "art-movement", icon: "🌅", description: "印象派繪畫光影捕捉" },
    abstract: { name: "抽象派", prompt: "abstract art, non-representational, geometric shapes, bold colors, modern art, expressive", negative: "realistic, figurative, detailed, representational", category: "art-movement", icon: "🎭", description: "抽象藝術幾何圖形" },
    cubism: { name: "立體主義", prompt: "cubist style, geometric shapes, multiple perspectives, fragmented, Picasso inspired, angular forms", negative: "realistic, smooth, traditional, single perspective", category: "art-movement", icon: "🔷", description: "立體主義多視角解構" },
    surrealism: { name: "超現實主義", prompt: "surrealist art, dreamlike, bizarre, impossible scenes, Salvador Dali style, imaginative, symbolic", negative: "realistic, mundane, ordinary, logical", category: "art-movement", icon: "🌀", description: "超現實主義夢幻場景" },
    "pop-art": { name: "普普藝術", prompt: "pop art style, bold colors, comic book elements, Andy Warhol inspired, retro, screen print effect", negative: "subtle, muted, traditional, realistic", category: "art-movement", icon: "🎪", description: "普普藝術大膽色彩" },
    neon: { name: "霓虹燈", prompt: "neon lights, glowing, vibrant neon colors, night scene, electric, luminous, dark background", negative: "daylight, muted, natural, dull", category: "visual", icon: "💡", description: "霓虹燈發光效果" },
    vintage: { name: "復古", prompt: "vintage style, retro, aged, nostalgic, warm tones, classic, faded colors, old photograph", negative: "modern, futuristic, clean, vibrant", category: "visual", icon: "📻", description: "復古懷舊褪色效果" },
    steampunk: { name: "蒸汽朋克", prompt: "steampunk style, Victorian era, brass and copper, gears and mechanisms, mechanical, industrial", negative: "modern, minimalist, clean, futuristic", category: "visual", icon: "⚙️", description: "蒸汽朋克機械美學" },
    minimalist: { name: "極簡主義", prompt: "minimalist design, clean, simple, geometric, negative space, modern, uncluttered", negative: "detailed, complex, ornate, busy", category: "visual", icon: "◽", description: "極簡設計留白美學" },
    vaporwave: { name: "蒸氣波", prompt: "vaporwave aesthetic, retro futuristic, pastel colors, glitch art, 80s 90s nostalgia, neon pink and blue", negative: "realistic, natural, muted, traditional", category: "visual", icon: "🌴", description: "蒸氣波復古未來" },
    "pixel-art": { name: "像素藝術", prompt: "pixel art, 8-bit, 16-bit, retro gaming style, pixelated, nostalgic, limited color palette", negative: "high resolution, smooth, realistic, detailed", category: "digital", icon: "🎮", description: "像素藝術復古遊戲" },
    "low-poly": { name: "低多邊形", prompt: "low poly 3d, geometric, faceted, minimalist 3d art, polygonal, angular shapes", negative: "high poly, detailed, realistic, organic", category: "digital", icon: "🔺", description: "低多邊形3D幾何" },
    "3d-render": { name: "3D渲染", prompt: "3d render, cinema 4d, octane render, detailed, professional lighting, ray tracing, photorealistic 3d", negative: "2d, flat, hand drawn, sketchy", category: "digital", icon: "🎬", description: "專業3D渲染寫實光影" },
    gradient: { name: "漸變", prompt: "gradient art, smooth color transitions, modern, vibrant gradients, soft blending, colorful", negative: "solid colors, flat, harsh edges, traditional", category: "digital", icon: "🌈", description: "漸變藝術柔和過渡" },
    glitch: { name: "故障藝術", prompt: "glitch art, digital corruption, RGB shift, distorted, cyberpunk, data moshing, scanlines", negative: "clean, perfect, traditional, smooth", category: "digital", icon: "📺", description: "故障美學數位崩壞" },
    "ukiyo-e": { name: "浮世繪", prompt: "ukiyo-e style, japanese woodblock print, Hokusai inspired, traditional japanese art, flat colors, bold outlines", negative: "modern, western, photographic, 3d", category: "traditional", icon: "🗾", description: "日本浮世繪木刻版畫" },
    "stained-glass": { name: "彩繪玻璃", prompt: "stained glass art, colorful, leaded glass, church window style, luminous, geometric patterns, light through glass", negative: "realistic, photographic, modern, opaque", category: "traditional", icon: "🪟", description: "彩繪玻璃透光效果" },
    "paper-cut": { name: "剪紙藝術", prompt: "paper cut art, layered paper, shadow box effect, intricate patterns, handcrafted, silhouette", negative: "painted, digital, realistic, photographic", category: "traditional", icon: "✂️", description: "剪紙藝術層次堆疊" },
    gothic: { name: "哥特風格", prompt: "gothic style, dark, ornate, Victorian gothic, mysterious, dramatic, baroque elements, elegant darkness", negative: "bright, cheerful, minimalist, modern", category: "aesthetic", icon: "🦇", description: "哥特美學黑暗華麗" },
    "art-nouveau": { name: "新藝術", prompt: "art nouveau style, organic forms, flowing lines, decorative, elegant, floral motifs, Alphonse Mucha inspired", negative: "geometric, minimalist, modern, rigid", category: "aesthetic", icon: "🌺", description: "新藝術流動線條" },
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
    'art-movement': { name: '藝術流派', icon: '🎭', order: 7 },
    'visual': { name: '視覺風格', icon: '✨', order: 8 },
    'digital': { name: '數位風格', icon: '💻', order: 9 },
    'traditional': { name: '傳統藝術', icon: '🏛️', order: 10 },
    'aesthetic': { name: '美學風格', icon: '🌟', order: 11 },
    'scifi': { name: '科幻', icon: '🚀', order: 12 },
    'fantasy': { name: '奇幻', icon: '🐉', order: 13 }
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
      economy: { name: "經濟模式", description: "快速出圖", min_resolution: 1024, max_resolution: 2048, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準模式", description: "平衡質量與速度", min_resolution: 1280, max_resolution: 2048, steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
      ultra: { name: "超高清模式", description: "極致質量", min_resolution: 1536, max_resolution: 2048, steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true }
    },
    HD_PROMPTS: {
      basic: "high quality, detailed, sharp",
      enhanced: "high quality, highly detailed, sharp focus, professional, 8k uhd",
      maximum: "masterpiece, best quality, ultra detailed, 8k uhd, high resolution, professional photography, sharp focus, HDR"
    },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, low resolution, pixelated, artifacts, noise",
    MODEL_QUALITY_PROFILES: {
      "zimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "economy" },
      "flux": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.1, guidance_boost: 1.0, recommended_quality: "standard" },
      "turbo": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.9, guidance_boost: 0.95, recommended_quality: "economy" },
      "kontext": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "ultra" }
    }
  }
};
// =================================================================================
// 工具類：Logger, IP獲取, 翻譯, 優化器
// =================================================================================

class Logger {
  constructor() {
    this.logs = [];
  }
  add(title, data) {
    this.logs.push({ title, data, timestamp: new Date().toISOString() });
  }
  get() {
    return this.logs;
  }
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || 
         request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    if (!hasChinese) return { text: text, translated: false, reason: "No Chinese detected" };
    
    if (!env || !env.AI) {
      console.warn("⚠️ Workers AI not configured");
      return { text: text, translated: false, reason: "AI not configured" };
    }
    
    try {
      const response = await env.AI.run("@cf/meta/m2m100-1.2b", { 
        text: text, 
        source_lang: "chinese", 
        target_lang: "english" 
      });
      
      if (response && response.translated_text) {
        console.log("✅ Translation:", text, "→", response.translated_text);
        return { 
          text: response.translated_text, 
          translated: true, 
          original: text, 
          model: "m2m100-1.2b" 
        };
      }
    } catch (error) {
      console.error("❌ Translation failed:", error.message);
    }
    
    return { text: text, translated: false };
  } catch (error) {
    console.error("❌ translateToEnglish error:", error);
    return { text: text, translated: false, error: error.message };
  }
}

class PromptAnalyzer {
  static analyzeComplexity(prompt) {
    const complexKeywords = [
      'detailed', 'intricate', 'complex', 'elaborate', 
      'realistic', 'photorealistic', 'hyperrealistic',
      'architecture', 'cityscape', 'landscape', 'portrait',
      'face', 'eyes', 'hair', 'texture', 'material',
      'fabric', 'skin', 'lighting', 'shadows', 'reflections',
      'fine details', 'high detail', 'ultra detailed',
      '4k', '8k', 'uhd', 'hdr'
    ];
    
    let score = 0;
    const lowerPrompt = prompt.toLowerCase();
    
    complexKeywords.forEach(keyword => {
      if (lowerPrompt.includes(keyword)) score += 0.1;
    });
    
    if (prompt.length > 100) score += 0.2;
    if (prompt.length > 200) score += 0.3;
    if (prompt.split(',').length > 5) score += 0.15;
    
    return Math.min(score, 1.0);
  }
  
  static recommendQualityMode(prompt, model) {
    const complexity = this.analyzeComplexity(prompt);
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    
    if (profile?.recommended_quality) return profile.recommended_quality;
    
    if (complexity > 0.7) return 'ultra';
    if (complexity > 0.4) return 'standard';
    return 'economy';
  }
}

class HDOptimizer {
  static optimize(prompt, negativePrompt, model, width, height, qualityMode = 'standard', autoHD = true) {
    if (!autoHD || !CONFIG.HD_OPTIMIZATION.enabled) {
      return { 
        prompt: prompt, 
        negativePrompt: negativePrompt, 
        width: width, 
        height: height, 
        optimized: false 
      };
    }
    
    const hdConfig = CONFIG.HD_OPTIMIZATION;
    const modeConfig = hdConfig.QUALITY_MODES[qualityMode] || hdConfig.QUALITY_MODES.standard;
    const profile = hdConfig.MODEL_QUALITY_PROFILES[model];
    const optimizations = [];
    
    const hdLevel = modeConfig.hd_level;
    let enhancedPrompt = prompt;
    
    if (hdConfig.HD_PROMPTS[hdLevel]) {
      const hdBoost = hdConfig.HD_PROMPTS[hdLevel];
      enhancedPrompt = prompt + ", " + hdBoost;
      optimizations.push("HD增強: " + hdLevel);
    }
    
    let enhancedNegative = negativePrompt || "";
    if (qualityMode !== 'economy') {
      enhancedNegative = enhancedNegative 
        ? enhancedNegative + ", " + hdConfig.HD_NEGATIVE 
        : hdConfig.HD_NEGATIVE;
      optimizations.push("負面提示詞: 高清過濾");
    }
    
    let finalWidth = width;
    let finalHeight = height;
    let sizeUpscaled = false;
    
    const maxModelRes = profile?.max_resolution || 2048;
    const minRes = Math.max(modeConfig.min_resolution, profile?.min_resolution || 1024);
    const currentRes = Math.min(width, height);
    
    if (currentRes < minRes || modeConfig.force_upscale) {
      const scale = minRes / currentRes;
      finalWidth = Math.min(Math.round(width * scale / 64) * 64, maxModelRes);
      finalHeight = Math.min(Math.round(height * scale / 64) * 64, maxModelRes);
      sizeUpscaled = true;
      optimizations.push("尺寸優化: " + width + "x" + height + " → " + finalWidth + "x" + finalHeight);
    }
    
    if (finalWidth > maxModelRes || finalHeight > maxModelRes) {
      const scale = maxModelRes / Math.max(finalWidth, finalHeight);
      finalWidth = Math.round(finalWidth * scale / 64) * 64;
      finalHeight = Math.round(finalHeight * scale / 64) * 64;
      optimizations.push("模型限制: 調整至 " + finalWidth + "x" + finalHeight);
    }
    
    return { 
      prompt: enhancedPrompt, 
      negativePrompt: enhancedNegative, 
      width: finalWidth, 
      height: finalHeight, 
      optimized: true, 
      quality_mode: qualityMode, 
      hd_level: hdLevel, 
      optimizations: optimizations, 
      size_upscaled: sizeUpscaled 
    };
  }
}

class ParameterOptimizer {
  static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
    if (userSteps !== null && userSteps !== -1) {
      const suggestion = this.calculateOptimalSteps(model, width, height, style, qualityMode);
      return { 
        steps: userSteps, 
        optimized: false, 
        suggested: suggestion.steps, 
        reasoning: suggestion.reasoning, 
        user_override: true 
      };
    }
    return this.calculateOptimalSteps(model, width, height, style, qualityMode);
  }
  
  static calculateOptimalSteps(model, width, height, style, qualityMode = 'standard') {
    const rules = CONFIG.OPTIMIZATION_RULES;
    const modelRule = rules.MODEL_STEPS[model] || rules.MODEL_STEPS["flux"];
    const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    
    let baseSteps = modelRule.optimal;
    const reasoning = [];
    reasoning.push(model + ": " + baseSteps + "步");
    
    const totalPixels = width * height;
    let sizeMultiplier = 1.0;
    
    if (totalPixels >= rules.SIZE_MULTIPLIER.xlarge.threshold) {
      sizeMultiplier = rules.SIZE_MULTIPLIER.xlarge.multiplier;
      reasoning.push("超大 x" + sizeMultiplier);
    } else if (totalPixels >= rules.SIZE_MULTIPLIER.large.threshold) {
      sizeMultiplier = rules.SIZE_MULTIPLIER.large.multiplier;
      reasoning.push("大尺寸 x" + sizeMultiplier);
    } else if (totalPixels <= rules.SIZE_MULTIPLIER.small.threshold) {
      sizeMultiplier = rules.SIZE_MULTIPLIER.small.multiplier;
    } else {
      sizeMultiplier = rules.SIZE_MULTIPLIER.medium.multiplier;
    }
    
    let styleMultiplier = rules.STYLE_ADJUSTMENT[style] || rules.STYLE_ADJUSTMENT.default;
    let qualityMultiplier = modeConfig?.steps_multiplier || 1.0;
    if (qualityMultiplier !== 1.0) reasoning.push(modeConfig.name + " x" + qualityMultiplier);
    
    let profileBoost = profile?.optimal_steps_boost || 1.0;
    if (profileBoost !== 1.0) reasoning.push("模型配置 x" + profileBoost);
    
    let optimizedSteps = Math.round(baseSteps * sizeMultiplier * styleMultiplier * qualityMultiplier * profileBoost);
    optimizedSteps = Math.max(modelRule.min, Math.min(optimizedSteps, modelRule.max));
    
    reasoning.push("→ " + optimizedSteps + "步");
    
    return { 
      steps: optimizedSteps, 
      optimized: true, 
      base_steps: baseSteps, 
      size_multiplier: sizeMultiplier, 
      style_multiplier: styleMultiplier, 
      quality_multiplier: qualityMultiplier, 
      profile_boost: profileBoost, 
      min_steps: modelRule.min, 
      max_steps: modelRule.max, 
      reasoning: reasoning.join(' ') 
    };
  }
  
  static optimizeGuidance(model, style, qualityMode = 'standard') {
    const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    
    let baseGuidance = 7.5;
    
    if (model.includes('turbo')) {
      baseGuidance = style === 'photorealistic' ? 3.0 : 2.5;
    } else if (style === 'photorealistic') {
      baseGuidance = 8.5;
    } else if (['oil-painting', 'watercolor', 'sketch'].includes(style)) {
      baseGuidance = 6.5;
    } else if (['manga', 'anime', 'chibi'].includes(style)) {
      baseGuidance = 7.0;
    } else if (['pixel-art', 'low-poly'].includes(style)) {
      baseGuidance = 6.0;
    }
    
    let qualityBoost = modeConfig?.guidance_multiplier || 1.0;
    let profileBoost = profile?.guidance_boost || 1.0;
    
    return Math.round(baseGuidance * qualityBoost * profileBoost * 10) / 10;
  }
}

class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    try {
      if (!style || style === 'none' || style === '') {
        return { 
          enhancedPrompt: prompt, 
          enhancedNegative: negativePrompt || "" 
        };
      }
      
      if (!CONFIG.STYLE_PRESETS || typeof CONFIG.STYLE_PRESETS !== 'object') {
        console.warn("⚠️ STYLE_PRESETS not found");
        return { 
          enhancedPrompt: prompt, 
          enhancedNegative: negativePrompt || "" 
        };
      }
      
      const styleConfig = CONFIG.STYLE_PRESETS[style];
      if (!styleConfig) {
        console.warn("⚠️ Style '" + style + "' not found");
        return { 
          enhancedPrompt: prompt, 
          enhancedNegative: negativePrompt || "" 
        };
      }
      
      let enhancedPrompt = prompt;
      if (styleConfig.prompt && styleConfig.prompt.trim()) {
        enhancedPrompt = prompt + ", " + styleConfig.prompt;
      }
      
      let enhancedNegative = negativePrompt || "";
      if (styleConfig.negative && styleConfig.negative.trim()) {
        if (enhancedNegative && enhancedNegative.trim()) {
          enhancedNegative = enhancedNegative + ", " + styleConfig.negative;
        } else {
          enhancedNegative = styleConfig.negative;
        }
      }
      
      console.log("✅ Style applied:", style, "-", styleConfig.name);
      return { 
        enhancedPrompt: enhancedPrompt, 
        enhancedNegative: enhancedNegative 
      };
    } catch (error) {
      console.error("❌ StyleProcessor error:", error.message);
      return { 
        enhancedPrompt: prompt, 
        enhancedNegative: negativePrompt || "" 
      };
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
    if (error.name === 'AbortError') {
      throw new Error("Request timeout after " + timeout + "ms");
    }
    throw error;
  }
}

function corsHeaders(additionalHeaders = {}) {
  return { 
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With', 
    'Access-Control-Max-Age': '86400', 
    ...additionalHeaders 
  };
}
// =================================================================================
// PollinationsProvider：核心圖像生成類
// =================================================================================

class PollinationsProvider {
  constructor(config, env) {
    this.config = config;
    this.name = config.name;
    this.env = env;
  }
  
  async generate(prompt, options, logger) {
    const { 
      model = "zimage", 
      width = 1024, 
      height = 1024, 
      seed = -1, 
      negativePrompt = "", 
      guidance = null, 
      steps = null, 
      enhance = false, 
      nologo = true, 
      privateMode = true, 
      style = "none", 
      autoOptimize = true, 
      autoHD = true, 
      qualityMode = 'standard',
      referenceImages = []
    } = options;
    
    const modelConfig = this.config.models.find(m => m.id === model);
    const supportsRefImages = modelConfig?.supports_reference_images || false;
    const maxRefImages = modelConfig?.max_reference_images || 0;
    
    let validReferenceImages = [];
    if (referenceImages && referenceImages.length > 0) {
      if (!supportsRefImages) {
        logger.add("⚠️ Reference Images", { 
          warning: model + " 不支持參考圖像，已忽略", 
          supported_models: ["kontext"] 
        });
      } else if (referenceImages.length > maxRefImages) {
        logger.add("⚠️ Reference Images", { 
          warning: model + " 最多支持 " + maxRefImages + " 張參考圖", 
          provided: referenceImages.length, 
          using: maxRefImages 
        });
        validReferenceImages = referenceImages.slice(0, maxRefImages);
      } else {
        validReferenceImages = referenceImages;
        logger.add("🖼️ Reference Images", { 
          model: model, 
          count: validReferenceImages.length, 
          max_allowed: maxRefImages,
          mode: "圖生圖"
        });
      }
    }
    
    let hdOptimization = null;
    let finalPrompt = prompt;
    let finalNegativePrompt = negativePrompt;
    let finalWidth = width;
    let finalHeight = height;
    
    const promptComplexity = PromptAnalyzer.analyzeComplexity(prompt);
    const recommendedQuality = PromptAnalyzer.recommendQualityMode(prompt, model);
    logger.add("🧠 Prompt Analysis", { 
      complexity: (promptComplexity * 100).toFixed(1) + '%', 
      recommended_quality: recommendedQuality, 
      selected_quality: qualityMode,
      has_reference_images: validReferenceImages.length > 0
    });
    
    if (autoHD) {
      hdOptimization = HDOptimizer.optimize(
        prompt, 
        negativePrompt, 
        model, 
        width, 
        height, 
        qualityMode, 
        autoHD
      );
      finalPrompt = hdOptimization.prompt;
      finalNegativePrompt = hdOptimization.negativePrompt;
      finalWidth = hdOptimization.width;
      finalHeight = hdOptimization.height;
      
      if (hdOptimization.optimized) {
        logger.add("🎨 HD Optimization", { 
          mode: qualityMode, 
          hd_level: hdOptimization.hd_level, 
          original: width + "x" + height, 
          optimized: finalWidth + "x" + finalHeight, 
          upscaled: hdOptimization.size_upscaled, 
          details: hdOptimization.optimizations 
        });
      }
    }
    
    let finalSteps = steps;
    let finalGuidance = guidance;
    
    if (autoOptimize) {
      const stepsOptimization = ParameterOptimizer.optimizeSteps(
        model, 
        finalWidth, 
        finalHeight, 
        style, 
        qualityMode, 
        steps
      );
      finalSteps = stepsOptimization.steps;
      logger.add("🎯 Steps Optimization", { 
        steps: stepsOptimization.steps, 
        reasoning: stepsOptimization.reasoning 
      });
      
      if (guidance === null) {
        finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
      } else {
        finalGuidance = guidance;
      }
    } else {
      finalSteps = steps || 20;
      finalGuidance = guidance || 7.5;
    }
    
    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(
      finalPrompt, 
      style, 
      finalNegativePrompt
    );
    
    logger.add("🎨 Style Processing", { 
      selected_style: style,
      style_name: CONFIG.STYLE_PRESETS[style]?.name || style,
      style_category: CONFIG.STYLE_PRESETS[style]?.category || 'unknown',
      style_applied: style !== 'none',
      original_prompt_length: finalPrompt.length,
      enhanced_prompt_length: enhancedPrompt.length,
      prompt_added: enhancedPrompt.length - finalPrompt.length
    });
    
    const translation = await translateToEnglish(enhancedPrompt, this.env);
    const finalPromptForAPI = translation.text;
    
    if (translation.translated) {
      logger.add("🌐 Auto Translation", { 
        original_zh: translation.original,
        translated_en: finalPromptForAPI.substring(0, 100) + (finalPromptForAPI.length > 100 ? '...' : ''),
        success: true,
        model: translation.model || "unknown"
      });
    } else {
      logger.add("⚠️ Translation", { 
        status: "skipped",
        reason: translation.reason || "Unknown",
        using_original: true
      });
    }
    
    logger.add("🎨 Generation Config", { 
      provider: this.name, 
      model: model, 
      dimensions: finalWidth + "x" + finalHeight,
      quality_mode: qualityMode, 
      hd_optimized: autoHD && hdOptimization?.optimized, 
      auto_translated: translation.translated,
      style_applied: style !== 'none',
      reference_images: validReferenceImages.length,
      generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖",
      steps: finalSteps, 
      guidance: finalGuidance,
      seed: seed
    });
    
    const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    let fullPrompt = finalPromptForAPI;
    if (enhancedNegative && enhancedNegative.trim()) {
      fullPrompt = finalPromptForAPI + " [negative: " + enhancedNegative + "]";
    }
    
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const pathPrefix = this.config.pathPrefix || "";
    let baseUrl = this.config.endpoint + pathPrefix + "/" + encodedPrompt;
    
    const params = new URLSearchParams();
    params.append('model', model);
    params.append('width', finalWidth.toString());
    params.append('height', finalHeight.toString());
    params.append('seed', currentSeed.toString());
    params.append('nologo', nologo.toString());
    params.append('enhance', enhance.toString());
    params.append('private', privateMode.toString());
    
    if (validReferenceImages && validReferenceImages.length > 0) {
      params.append('image', validReferenceImages.join(','));
      logger.add("🖼️ Reference Images Added", { 
        count: validReferenceImages.length,
        urls: validReferenceImages 
      });
    }
    
    if (finalGuidance !== 7.5) params.append('guidance', finalGuidance.toString());
    if (finalSteps !== 20) params.append('steps', finalSteps.toString());
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'image/*',
      'Referer': 'https://pollinations.ai/'
    };
    
    const authConfig = CONFIG.POLLINATIONS_AUTH;
    if (authConfig.enabled && authConfig.token) {
      headers['Authorization'] = `Bearer ${authConfig.token}`;
      logger.add("🔐 API Authentication", { 
        method: "Bearer Token",
        token_prefix: authConfig.token.substring(0, 8) + "...",
        enabled: true,
        endpoint: this.config.endpoint
      });
    } else {
      logger.add("⚠️ No API Key", { 
        authenticated: false,
        note: "新 API 端點需要 API Key，請設置 POLLINATIONS_API_KEY 環境變量",
        endpoint: this.config.endpoint,
        warning: "未認證的請求可能會失敗"
      });
    }
    
    const url = baseUrl + '?' + params.toString();
    
    logger.add("📡 API Request", { 
      endpoint: this.config.endpoint,
      path: pathPrefix + "/" + encodedPrompt.substring(0, 50) + "...",
      model: model,
      authenticated: authConfig.enabled && !!authConfig.token,
      full_url: url.substring(0, 100) + "..."
    });
    
    for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
      try {
        const response = await fetchWithTimeout(url, { 
          method: 'GET', 
          headers: headers
        }, 120000);
        
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            logger.add("✅ Success", { 
              url: response.url, 
              used_model: model, 
              final_size: finalWidth + "x" + finalHeight,
              quality_mode: qualityMode, 
              style_used: style,
              style_name: CONFIG.STYLE_PRESETS[style]?.name || style,
              hd_optimized: autoHD && hdOptimization?.optimized, 
              auto_translated: translation.translated,
              reference_images_used: validReferenceImages.length,
              generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖",
              authenticated: authConfig.enabled && !!authConfig.token,
              seed: currentSeed 
            });
            
            const imageBlob = await response.blob();
            const imageBuffer = await imageBlob.arrayBuffer();
            
            return { 
              imageData: imageBuffer,
              contentType: contentType,
              url: response.url, 
              provider: this.name, 
              model: model, 
              requested_model: model, 
              seed: currentSeed, 
              style: style, 
              style_name: CONFIG.STYLE_PRESETS[style]?.name || style,
              style_category: CONFIG.STYLE_PRESETS[style]?.category || 'unknown',
              steps: finalSteps, 
              guidance: finalGuidance, 
              width: finalWidth, 
              height: finalHeight,
              quality_mode: qualityMode, 
              prompt_complexity: promptComplexity, 
              hd_optimized: autoHD && hdOptimization?.optimized, 
              hd_details: hdOptimization, 
              auto_translated: translation.translated,
              reference_images: validReferenceImages,
              reference_images_count: validReferenceImages.length,
              generation_mode: validReferenceImages.length > 0 ? "圖生圖" : "文生圖",
              authenticated: authConfig.enabled && !!authConfig.token,
              cost: "FREE", 
              auto_optimized: autoOptimize 
            };
          } else {
            throw new Error("Invalid content type: " + contentType);
          }
        } else if (response.status === 401) {
          throw new Error("Authentication failed: Invalid or missing API key. Please set POLLINATIONS_API_KEY");
        } else if (response.status === 403) {
          throw new Error("Access forbidden: API key may lack required permissions");
        } else {
          throw new Error("HTTP " + response.status + ": " + (await response.text()).substring(0, 200));
        }
      } catch (e) {
        logger.add("❌ Request Failed", { 
          error: e.message, 
          model: model, 
          retry: retry + 1,
          max_retries: CONFIG.MAX_RETRIES,
          endpoint: this.config.endpoint
        });
        
        if (retry < CONFIG.MAX_RETRIES - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
        } else {
          throw new Error("Generation failed: " + e.message);
        }
      }
    }
    throw new Error("Model " + model + " failed after " + CONFIG.MAX_RETRIES + " retries");
  }
}

class MultiProviderRouter {
  constructor(apiKeys = {}, env = null) {
    this.providers = {};
    this.apiKeys = apiKeys;
    this.env = env;
    
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
      if (config.enabled) {
        if (key === 'pollinations') {
          this.providers[key] = new PollinationsProvider(config, env);
        }
      }
    }
  }
  
  getProvider(providerName = null) {
    if (providerName && this.providers[providerName]) {
      return { name: providerName, instance: this.providers[providerName] };
    }
    const defaultName = CONFIG.DEFAULT_PROVIDER;
    if (this.providers[defaultName]) {
      return { name: defaultName, instance: this.providers[defaultName] };
    }
    const firstProvider = Object.keys(this.providers)[0];
    if (firstProvider) {
      return { name: firstProvider, instance: this.providers[firstProvider] };
    }
    throw new Error('No available provider');
  }
  
  async generate(prompt, options, logger) {
    const { provider: requestedProvider = null, numOutputs = 1 } = options;
    const { name: providerName, instance: provider } = this.getProvider(requestedProvider);
    const results = [];
    
    for (let i = 0; i < numOutputs; i++) {
      const currentOptions = { 
        ...options, 
        seed: options.seed === -1 ? -1 : options.seed + i 
      };
      const result = await provider.generate(prompt, currentOptions, logger);
      results.push(result);
    }
    
    return results;
  }
}
// =================================================================================
// 主入口：Worker Fetch Handler
// =================================================================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const startTime = Date.now();
    const clientIP = getClientIP(request);
    
    // 從環境變量讀取 API Key
    if (env.POLLINATIONS_API_KEY) {
      CONFIG.POLLINATIONS_AUTH.enabled = true;
      CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY;
    } else {
      console.warn("⚠️ POLLINATIONS_API_KEY not set - requests may fail on new API endpoint");
      CONFIG.POLLINATIONS_AUTH.enabled = false;
      CONFIG.POLLINATIONS_AUTH.token = "";
    }
    
    console.log("=== Request Info ===");
    console.log("IP:", clientIP);
    console.log("Path:", url.pathname);
    console.log("Method:", request.method);
    console.log("Workers AI:", !!env.AI);
    console.log("API Auth:", CONFIG.POLLINATIONS_AUTH.enabled ? "✅ Enabled" : "❌ Disabled");
    console.log("API Endpoint:", CONFIG.PROVIDERS.pollinations.endpoint);
    console.log("Styles Count:", Object.keys(CONFIG.STYLE_PRESETS).length);
    console.log("===================");
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }
    
    try {
      let response;
      
      if (url.pathname === '/' || url.pathname === '') {
        response = handleUI(request);
      } else if (url.pathname === '/_internal/generate') {
        response = await handleInternalGenerate(request, env, ctx);
      } else if (url.pathname === '/health') {
        response = new Response(JSON.stringify({
          status: 'ok',
          version: CONFIG.PROJECT_VERSION,
          timestamp: new Date().toISOString(),
          workers_ai: !!env.AI,
          styles_count: Object.keys(CONFIG.STYLE_PRESETS).length,
          api_auth: {
            enabled: CONFIG.POLLINATIONS_AUTH.enabled,
            method: CONFIG.POLLINATIONS_AUTH.method,
            has_token: !!CONFIG.POLLINATIONS_AUTH.token,
            endpoint: CONFIG.PROVIDERS.pollinations.endpoint
          },
          models: CONFIG.PROVIDERS.pollinations.models.map(m => ({
            id: m.id,
            name: m.name,
            category: m.category,
            supports_reference_images: m.supports_reference_images || false
          })),
          style_categories: Object.keys(CONFIG.STYLE_CATEGORIES).map(key => ({
            id: key,
            name: CONFIG.STYLE_CATEGORIES[key].name,
            icon: CONFIG.STYLE_CATEGORIES[key].icon,
            count: Object.values(CONFIG.STYLE_PRESETS).filter(s => s.category === key).length
          }))
        }), { 
          headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
      } else {
        response = new Response(JSON.stringify({
          error: 'Not Found',
          message: '此 Worker 僅提供 Web UI 界面',
          available_paths: ['/', '/health', '/_internal/generate']
        }), { 
          status: 404,
          headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
      }
      
      const duration = Date.now() - startTime;
      const headers = new Headers(response.headers);
      headers.set('X-Response-Time', duration + 'ms');
      headers.set('X-Worker-Version', CONFIG.PROJECT_VERSION);
      headers.set('X-API-Endpoint', CONFIG.PROVIDERS.pollinations.endpoint);
      headers.set('X-API-Authenticated', CONFIG.POLLINATIONS_AUTH.enabled ? 'true' : 'false');
      headers.set('X-Styles-Count', Object.keys(CONFIG.STYLE_PRESETS).length.toString());
      
      return new Response(response.body, { 
        status: response.status, 
        headers: headers 
      });
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error('Worker error:', error);
      return new Response(JSON.stringify({
        error: {
          message: error.message,
          type: 'worker_error',
          timestamp: new Date().toISOString(),
          duration_ms: duration
        }
      }), {
        status: 500,
        headers: corsHeaders({ 'Content-Type': 'application/json' })
      });
    }
  }
};

// =================================================================================
// 內部生成處理函數
// =================================================================================

async function handleInternalGenerate(request, env, ctx) {
  const logger = new Logger();
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const prompt = body.prompt;
    if (!prompt || !prompt.trim()) {
      throw new Error("Prompt is required");
    }
    
    if (!CONFIG.POLLINATIONS_AUTH.enabled || !CONFIG.POLLINATIONS_AUTH.token) {
      logger.add("⚠️ API Key Warning", {
        status: "missing",
        message: "POLLINATIONS_API_KEY 未設置，請求可能會失敗",
        endpoint: CONFIG.PROVIDERS.pollinations.endpoint,
        recommendation: "請使用 'wrangler secret put POLLINATIONS_API_KEY' 設置 API Key"
      });
    }
    
    let width = 1024, height = 1024;
    if (body.width) width = body.width;
    if (body.height) height = body.height;
    
    let referenceImages = [];
    if (body.reference_images && Array.isArray(body.reference_images)) {
      referenceImages = body.reference_images.filter(url => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      });
    }
    
    const seedInput = body.seed !== undefined ? body.seed : -1;
    let seedValue = -1;
    if (seedInput !== -1) {
      const parsedSeed = parseInt(seedInput);
      if (!isNaN(parsedSeed) && parsedSeed >= 0 && parsedSeed <= 999999) {
        seedValue = parsedSeed;
      }
    }
    
    const options = { 
      provider: body.provider || null, 
      model: body.model || "zimage", 
      width: Math.min(Math.max(width, 256), 2048), 
      height: Math.min(Math.max(height, 256), 2048), 
      numOutputs: Math.min(Math.max(body.n || 1, 1), 4), 
      seed: seedValue,
      negativePrompt: body.negative_prompt || "", 
      guidance: body.guidance_scale || null, 
      steps: body.steps || null, 
      enhance: body.enhance === true, 
      nologo: body.nologo !== false, 
      privateMode: body.private !== false, 
      style: body.style || "none", 
      autoOptimize: body.auto_optimize !== false, 
      autoHD: body.auto_hd !== false, 
      qualityMode: body.quality_mode || 'standard',
      referenceImages: referenceImages
    };
    
    const router = new MultiProviderRouter({}, env);
    const results = await router.generate(prompt, options, logger);
    
    const duration = Date.now() - startTime;
    
    // 單張圖片：直接返回圖片字節
    if (results.length === 1 && results[0].imageData) {
      const result = results[0];
      
      return new Response(result.imageData, {
        headers: {
          'Content-Type': result.contentType || 'image/png',
          'Content-Disposition': `inline; filename="flux-ai-${result.seed}.png"`,
          'X-Model': result.model,
          'X-Model-Name': result.style_name || result.model,
          'X-Seed': result.seed.toString(),
          'X-Width': result.width.toString(),
          'X-Height': result.height.toString(),
          'X-Generation-Time': duration + 'ms',
          'X-Quality-Mode': result.quality_mode,
          'X-Style': result.style,
          'X-Style-Name': result.style_name || result.style,
          'X-Style-Category': result.style_category || 'unknown',
          'X-Generation-Mode': result.generation_mode || '文生圖',
          'X-Authenticated': result.authenticated ? 'true' : 'false',
          'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint,
          ...corsHeaders()
        }
      });
    }
    
    // 多張圖片：返回 JSON（包含 base64）
    const imagesData = await Promise.all(results.map(async (r) => {
      if (r.imageData) {
        const uint8Array = new Uint8Array(r.imageData);
        let binary = '';
        const len = uint8Array.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(uint8Array[i]);
        }
        const base64 = btoa(binary);
        
        return {
          image: `data:${r.contentType};base64,${base64}`,
          model: r.model,
          seed: r.seed,
          width: r.width,
          height: r.height,
          quality_mode: r.quality_mode,
          style: r.style,
          style_name: r.style_name || r.style,
          style_category: r.style_category || 'unknown',
          generation_mode: r.generation_mode,
          authenticated: r.authenticated
        };
      }
      return null;
    }));
    
    return new Response(JSON.stringify({ 
      created: Math.floor(Date.now() / 1000), 
      data: imagesData.filter(d => d !== null),
      generation_time_ms: duration,
      api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint,
      authenticated: CONFIG.POLLINATIONS_AUTH.enabled,
      styles_available: Object.keys(CONFIG.STYLE_PRESETS).length
    }), { 
      headers: corsHeaders({ 
        'Content-Type': 'application/json',
        'X-Generation-Time': duration + 'ms',
        'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint,
        'X-Styles-Count': Object.keys(CONFIG.STYLE_PRESETS).length.toString()
      }) 
    });
    
  } catch (e) {
    logger.add("❌ Error", e.message);
    return new Response(JSON.stringify({ 
      error: { 
        message: e.message, 
        debug_logs: logger.get(),
        api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint,
        authenticated: CONFIG.POLLINATIONS_AUTH.enabled
      } 
    }), { 
      status: 400, 
      headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    });
  }
}
// =================================================================================
// Web UI 界面處理函數（使用 Radix UI）
// =================================================================================

function handleUI() {
  const authStatus = CONFIG.POLLINATIONS_AUTH.enabled ? 
    '<span style="color:#22c55e;font-weight:600">🔐 已認證</span>' : 
    '<span style="color:#f59e0b;font-weight:600">⚠️ 需要 API Key</span>';
    
  const apiEndpoint = CONFIG.PROVIDERS.pollinations.endpoint;
  const stylesCount = Object.keys(CONFIG.STYLE_PRESETS).length;
  
  // 生成風格選項
  const styleCategories = CONFIG.STYLE_CATEGORIES;
  const stylePresets = CONFIG.STYLE_PRESETS;
  
  let styleOptionsHTML = '';
  const sortedCategories = Object.entries(styleCategories)
    .sort((a, b) => a[1].order - b[1].order);
  
  for (const [categoryKey, categoryInfo] of sortedCategories) {
    const stylesInCategory = Object.entries(stylePresets)
      .filter(([key, style]) => style.category === categoryKey);
    
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
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION} - Radix UI Edition</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">

<!-- Radix UI 和依賴 -->
<script src="https://unpkg.com/@radix-ui/react-dialog@1.0.5/dist/index.umd.js"></script>
<script src="https://unpkg.com/@radix-ui/react-tabs@1.0.4/dist/index.umd.js"></script>
<script src="https://unpkg.com/@radix-ui/react-select@2.0.0/dist/index.umd.js"></script>
<script src="https://unpkg.com/@radix-ui/react-switch@1.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@radix-ui/react-tooltip@1.0.7/dist/index.umd.js"></script>
<script src="https://unpkg.com/@radix-ui/react-alert-dialog@1.0.5/dist/index.umd.js"></script>
<script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>

<style>
/* ===== 基礎重置 ===== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

/* ===== CSS 變量 - 現代深色主題 ===== */
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a2e;
  --bg-tertiary: rgba(255, 255, 255, 0.03);
  --bg-card: rgba(255, 255, 255, 0.05);
  --bg-hover: rgba(255, 255, 255, 0.08);
  
  --text-primary: #ffffff;
  --text-secondary: #e5e7eb;
  --text-tertiary: #9ca3af;
  --text-muted: #6b7280;
  
  --accent-primary: #f59e0b;
  --accent-secondary: #d97706;
  --accent-hover: #fbbf24;
  
  --success: #10b981;
  --success-bg: rgba(16, 185, 129, 0.1);
  --warning: #f59e0b;
  --warning-bg: rgba(245, 158, 11, 0.1);
  --error: #ef4444;
  --error-bg: rgba(239, 68, 68, 0.1);
  --info: #8b5cf6;
  --info-bg: rgba(139, 92, 246, 0.1);
  
  --border-primary: rgba(255, 255, 255, 0.1);
  --border-secondary: rgba(255, 255, 255, 0.2);
  
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-accent: 0 4px 20px rgba(245, 158, 11, 0.3);
  
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== 基礎樣式 ===== */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ===== Radix UI Tabs 樣式 ===== */
[data-radix-tabs-root] {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

[data-radix-tabs-list] {
  display: flex;
  gap: 8px;
  padding: 0;
  background: var(--bg-tertiary);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-primary);
}

[data-radix-tabs-trigger] {
  all: unset;
  padding: 16px 24px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-tertiary);
  border-bottom: 2px solid transparent;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 8px;
}

[data-radix-tabs-trigger]:hover {
  color: var(--text-secondary);
  background: var(--bg-hover);
}

[data-radix-tabs-trigger][data-state="active"] {
  color: var(--accent-primary);
  border-bottom-color: var(--accent-primary);
  background: var(--bg-card);
}

[data-radix-tabs-content] {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== Radix UI Dialog (Modal) 樣式 ===== */
[data-radix-dialog-overlay] {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  animation: overlayShow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes overlayShow {
  from { opacity: 0; }
  to { opacity: 1; }
}

[data-radix-dialog-content] {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  max-height: 90vh;
  z-index: 1001;
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  box-shadow: var(--shadow-lg);
  animation: contentShow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
}

@keyframes contentShow {
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

[data-radix-dialog-close] {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--bg-hover);
  border: 1px solid var(--border-primary);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  font-size: 24px;
}

[data-radix-dialog-close]:hover {
  background: var(--bg-card);
  transform: rotate(90deg);
}

/* ===== Radix UI Select 樣式 ===== */
[data-radix-select-trigger] {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

[data-radix-select-trigger]:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--warning-bg);
}

[data-radix-select-trigger]:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--warning-bg);
}

[data-radix-select-content] {
  overflow: hidden;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 100;
}

[data-radix-select-viewport] {
  padding: 8px;
}

[data-radix-select-item] {
  all: unset;
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

[data-radix-select-item]:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

[data-radix-select-item][data-highlighted] {
  background: var(--bg-hover);
  color: var(--text-primary);
}

[data-radix-select-item][data-state="checked"] {
  background: var(--warning-bg);
  color: var(--accent-primary);
  font-weight: 600;
}

/* ===== Radix UI Switch 樣式 ===== */
[data-radix-switch-root] {
  all: unset;
  width: 44px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  position: relative;
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid var(--border-primary);
}

[data-radix-switch-root]:hover {
  background: rgba(255, 255, 255, 0.15);
}

[data-radix-switch-root][data-state="checked"] {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
}

[data-radix-switch-thumb] {
  display: block;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: var(--radius-full);
  transition: transform 0.2s;
  transform: translateX(2px);
  will-change: transform;
}

[data-radix-switch-root][data-state="checked"] [data-radix-switch-thumb] {
  transform: translateX(22px);
}

/* ===== Radix UI Tooltip 樣式 ===== */
[data-radix-tooltip-content] {
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  border: 1px solid var(--border-primary);
  box-shadow: var(--shadow-md);
  z-index: 1000;
  animation: tooltipShow 0.2s ease-out;
}

@keyframes tooltipShow {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* ===== 容器布局 ===== */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-header {
  background: var(--bg-tertiary);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-primary);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 800;
  color: var(--accent-primary);
  text-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
}

.badge {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
  display: inline-block;
}

.badge-version {
  background: linear-gradient(135deg, var(--success) 0%, #059669 100%);
  color: white;
}

.badge-new {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
  color: white;
}

.badge-styles {
  background: linear-gradient(135deg, var(--info) 0%, #7c3aed 100%);
  color: white;
}

.api-status {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.api-status-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.api-endpoint {
  font-size: 11px;
  color: var(--text-muted);
}

/* ===== 主內容區 ===== */
.content-wrapper {
  flex: 1;
  overflow: hidden;
}

.generate-layout {
  display: grid;
  grid-template-columns: 320px 1fr 380px;
  gap: 0;
  height: 100%;
}

.panel {
  overflow-y: auto;
  padding: 24px;
  border-right: 1px solid var(--border-primary);
}

.panel:last-child {
  border-right: none;
}

.panel-left {
  background: var(--bg-tertiary);
}

.panel-center {
  background: transparent;
}

.panel-right {
  background: var(--bg-tertiary);
}

/* ===== 響應式設計 ===== */
@media (max-width: 1400px) {
  .generate-layout {
    grid-template-columns: 280px 1fr 320px;
  }
}

@media (max-width: 1024px) {
  .generate-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
  }
  
  .panel {
    border-right: none;
    border-bottom: 1px solid var(--border-primary);
  }
  
  .panel:last-child {
    border-bottom: none;
  }
}

/* ===== 表單組件 ===== */
.section-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-family: inherit;
  transition: var(--transition);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--warning-bg);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
  line-height: 1.6;
}

.form-hint {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.form-hint.success {
  color: var(--success);
}

.form-hint.warning {
  color: var(--warning);
}

.form-hint.info {
  color: var(--info);
}

/* ===== 按鈕組件 ===== */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  color: white;
  box-shadow: var(--shadow-accent);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(245, 158, 11, 0.4);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-secondary);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--bg-hover);
  border-color: var(--border-primary);
}

.btn-danger {
  background: linear-gradient(135deg, var(--error) 0%, #dc2626 100%);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(239, 68, 68, 0.4);
}

/* ===== 圖片畫廊 ===== */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.gallery-item {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-accent);
}

.gallery-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}

.gallery-info {
  padding: 16px;
}

.gallery-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.meta-badge {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 600;
}

.meta-badge.model {
  background: var(--warning-bg);
  color: var(--warning);
}

.meta-badge.seed {
  background: var(--success-bg);
  color: var(--success);
}

.meta-badge.style {
  background: var(--info-bg);
  color: var(--info);
}

.gallery-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 8px 12px;
  background: var(--bg-hover);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.action-btn:hover {
  background: var(--bg-card);
  border-color: var(--accent-primary);
  color: var(--text-primary);
}

.action-btn.delete {
  border-color: rgba(239, 68, 68, 0.5);
}

.action-btn.delete:hover {
  background: var(--error-bg);
  border-color: var(--error);
  color: var(--error);
}

/* ===== 狀態組件 ===== */
.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-tertiary);
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--bg-hover);
  border-top-color: var(--accent-primary);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-tertiary);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

/* ===== Alert 組件 ===== */
.alert {
  padding: 14px 16px;
  border-radius: var(--radius-md);
  border-left: 4px solid;
  font-size: 13px;
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.alert-success {
  background: var(--success-bg);
  border-color: var(--success);
  color: var(--success);
}

.alert-warning {
  background: var(--warning-bg);
  border-color: var(--warning);
  color: var(--warning);
}

.alert-error {
  background: var(--error-bg);
  border-color: var(--error);
  color: var(--error);
}

.alert-info {
  background: var(--info-bg);
  border-color: var(--info);
  color: var(--info);
}

/* ===== 滾動條樣式 ===== */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
}

::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.3);
  border-radius: var(--radius-sm);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 158, 11, 0.5);
}

/* ===== 動畫 ===== */
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
</head>
<body>
<div id="root"></div>

<script>
// ===== 全局配置 =====
const APP_CONFIG = {
  version: '${CONFIG.PROJECT_VERSION}',
  apiEndpoint: '${apiEndpoint}',
  authenticated: ${CONFIG.POLLINATIONS_AUTH.enabled},
  stylesCount: ${stylesCount}
};

const PRESET_SIZES = ${JSON.stringify(CONFIG.PRESET_SIZES)};
const STYLE_PRESETS = ${JSON.stringify(CONFIG.STYLE_PRESETS)};
const STYLE_CATEGORIES = ${JSON.stringify(CONFIG.STYLE_CATEGORIES)};
</script>
`;

  return new Response(html + getUIScriptPart(), {
    headers: corsHeaders({ 'Content-Type': 'text/html; charset=utf-8' })
  });
}
function getUIScriptPart() {
  return `
<script>
// ===== 狀態管理 =====
let generatedImages = JSON.parse(localStorage.getItem('flux_ai_history') || '[]');
let isGenerating = false;

// ===== DOM 元素初始化 =====
function initializeApp() {
  updateHistoryCount();
  renderHistoryPage();
  setupEventListeners();
  updatePreview();
}

// ===== 事件監聽器 =====
function setupEventListeners() {
  // 表單提交
  const generateForm = document.getElementById('generateForm');
  if (generateForm) {
    generateForm.addEventListener('submit', handleGenerate);
  }
  
  // 參數變化時更新預覽
  ['model', 'size', 'style', 'qualityMode'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', updatePreview);
    }
  });
  
  // 風格變化時更新提示
  const styleSelect = document.getElementById('style');
  if (styleSelect) {
    styleSelect.addEventListener('change', updateStyleInfo);
  }
  
  // 清空歷史按鈕
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', handleClearHistory);
  }
  
  // 導出按鈕
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', handleExportHistory);
  }
  
  // 進階選項切換
  const advancedToggle = document.getElementById('advancedToggle');
  const advancedSection = document.getElementById('advancedSection');
  if (advancedToggle && advancedSection) {
    advancedToggle.addEventListener('click', () => {
      advancedSection.classList.toggle('show');
      advancedToggle.textContent = advancedSection.classList.contains('show') 
        ? '▲ 收起進階選項' 
        : '▼ 展開進階選項';
    });
  }
}

// ===== 生成圖像主函數 =====
async function handleGenerate(e) {
  e.preventDefault();
  
  if (isGenerating) return;
  
  const prompt = document.getElementById('prompt').value.trim();
  if (!prompt) {
    showAlert('error', '請輸入提示詞');
    return;
  }
  
  isGenerating = true;
  const generateBtn = document.getElementById('generateBtn');
  const originalText = generateBtn.innerHTML;
  generateBtn.innerHTML = '<span>🎨</span> 生成中...';
  generateBtn.disabled = true;
  
  // 顯示加載狀態
  showLoadingState();
  
  try {
    // 獲取表單參數
    const model = document.getElementById('model').value;
    const size = document.getElementById('size').value;
    const sizeConfig = PRESET_SIZES[size];
    const style = document.getElementById('style').value;
    const qualityMode = document.getElementById('qualityMode').value;
    const negativePrompt = document.getElementById('negativePrompt').value.trim();
    const seed = parseInt(document.getElementById('seed').value) || -1;
    const numOutputs = parseInt(document.getElementById('numOutputs').value) || 1;
    const autoOptimize = document.getElementById('autoOptimize').checked;
    const autoHD = document.getElementById('autoHD').checked;
    
    // 參考圖像處理
    const referenceImagesInput = document.getElementById('referenceImages').value.trim();
    const referenceImages = referenceImagesInput 
      ? referenceImagesInput.split(',').map(url => url.trim()).filter(url => url)
      : [];
    
    // 構建請求體
    const requestBody = {
      prompt: prompt,
      model: model,
      width: sizeConfig.width,
      height: sizeConfig.height,
      style: style,
      quality_mode: qualityMode,
      negative_prompt: negativePrompt,
      seed: seed,
      n: numOutputs,
      auto_optimize: autoOptimize,
      auto_hd: autoHD,
      reference_images: referenceImages
    };
    
    console.log('🚀 Generation request:', requestBody);
    
    // 發送請求
    const response = await fetch('/_internal/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Generation failed');
    }
    
    // 檢查返回類型
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('image/')) {
      // 單張圖片返回
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      const imageData = {
        id: Date.now(),
        url: imageUrl,
        prompt: prompt,
        model: response.headers.get('X-Model') || model,
        seed: parseInt(response.headers.get('X-Seed')) || seed,
        width: parseInt(response.headers.get('X-Width')) || sizeConfig.width,
        height: parseInt(response.headers.get('X-Height')) || sizeConfig.height,
        style: style,
        style_name: response.headers.get('X-Style-Name') || STYLE_PRESETS[style]?.name || style,
        quality_mode: qualityMode,
        timestamp: new Date().toISOString(),
        generation_time: response.headers.get('X-Generation-Time') || 'N/A',
        authenticated: response.headers.get('X-Authenticated') === 'true'
      };
      
      generatedImages.unshift(imageData);
      saveHistory();
      renderResults([imageData]);
      showAlert('success', '✅ 圖像生成成功！');
      
    } else {
      // JSON 返回（多張圖片）
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        const images = data.data.map((img, index) => ({
          id: Date.now() + index,
          url: img.image,
          prompt: prompt,
          model: img.model,
          seed: img.seed,
          width: img.width,
          height: img.height,
          style: style,
          style_name: img.style_name || STYLE_PRESETS[style]?.name || style,
          quality_mode: qualityMode,
          timestamp: new Date().toISOString(),
          generation_time: data.generation_time_ms ? data.generation_time_ms + 'ms' : 'N/A',
          authenticated: img.authenticated
        }));
        
        generatedImages.unshift(...images);
        saveHistory();
        renderResults(images);
        showAlert('success', \`✅ 成功生成 \${images.length} 張圖像！\`);
      } else {
        throw new Error('No images returned');
      }
    }
    
    updateHistoryCount();
    
  } catch (error) {
    console.error('❌ Generation error:', error);
    showAlert('error', '❌ 生成失敗: ' + error.message);
    showEmptyState();
  } finally {
    isGenerating = false;
    generateBtn.innerHTML = originalText;
    generateBtn.disabled = false;
  }
}

// ===== 渲染結果 =====
function renderResults(images) {
  const resultsDiv = document.getElementById('results');
  if (!resultsDiv) return;
  
  resultsDiv.innerHTML = '';
  
  const gallery = document.createElement('div');
  gallery.className = 'gallery fade-in';
  
  images.forEach(img => {
    const item = createGalleryItem(img);
    gallery.appendChild(item);
  });
  
  resultsDiv.appendChild(gallery);
}

// ===== 創建畫廊項目 =====
function createGalleryItem(img) {
  const item = document.createElement('div');
  item.className = 'gallery-item slide-up';
  
  item.innerHTML = \`
    <img src="\${img.url}" alt="Generated image" class="gallery-image" onclick="openImageModal('\${img.url}')">
    <div class="gallery-info">
      <div class="gallery-meta">
        <span class="meta-badge model">📦 \${img.model}</span>
        <span class="meta-badge seed">🎲 \${img.seed}</span>
        <span class="meta-badge style">🎨 \${img.style_name}</span>
      </div>
      <div class="gallery-meta">
        <span class="meta-badge">📐 \${img.width}x\${img.height}</span>
        <span class="meta-badge">⏱️ \${img.generation_time}</span>
        \${img.authenticated ? '<span class="meta-badge" style="background:var(--success-bg);color:var(--success)">🔐 已認證</span>' : ''}
      </div>
      <div class="gallery-actions">
        <button class="action-btn" onclick="downloadImage('\${img.url}', '\${img.seed}')">
          <span>💾</span> 下載
        </button>
        <button class="action-btn" onclick="copyPrompt('\${escapeHtml(img.prompt)}')">
          <span>📋</span> 複製提示詞
        </button>
        <button class="action-btn delete" onclick="deleteImage(\${img.id})">
          <span>🗑️</span> 刪除
        </button>
      </div>
    </div>
  \`;
  
  return item;
}

// ===== 圖片模態框 =====
function openImageModal(imageUrl) {
  const modal = document.createElement('div');
  modal.className = 'modal show';
  modal.innerHTML = \`
    <div class="modal-overlay" onclick="closeImageModal()"></div>
    <div class="modal-content">
      <button class="modal-close" onclick="closeImageModal()">✕</button>
      <img src="\${imageUrl}" alt="Full size image" style="max-width:100%;max-height:90vh;border-radius:12px;">
    </div>
  \`;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

// ===== 下載圖片 =====
async function downloadImage(url, seed) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = \`flux-ai-\${seed}-\${Date.now()}.png\`;
    link.click();
    showAlert('success', '✅ 圖片下載中...');
  } catch (error) {
    console.error('Download error:', error);
    showAlert('error', '❌ 下載失敗');
  }
}

// ===== 複製提示詞 =====
function copyPrompt(prompt) {
  const textarea = document.createElement('textarea');
  textarea.value = prompt;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  showAlert('success', '✅ 提示詞已複製到剪貼板');
}

// ===== 刪除圖片 =====
function deleteImage(id) {
  if (!confirm('確定要刪除這張圖片嗎？')) return;
  
  generatedImages = generatedImages.filter(img => img.id !== id);
  saveHistory();
  updateHistoryCount();
  renderHistoryPage();
  
  // 如果當前頁面是生成頁面，重新渲染
  const resultsDiv = document.getElementById('results');
  if (resultsDiv) {
    const currentImages = generatedImages.slice(0, 4);
    if (currentImages.length > 0) {
      renderResults(currentImages);
    } else {
      showEmptyState();
    }
  }
  
  showAlert('success', '✅ 圖片已刪除');
}

// ===== 清空歷史 =====
function handleClearHistory() {
  if (!confirm('確定要清空所有歷史記錄嗎？此操作無法撤銷。')) return;
  
  generatedImages = [];
  saveHistory();
  updateHistoryCount();
  renderHistoryPage();
  showAlert('success', '✅ 歷史記錄已清空');
}

// ===== 導出歷史 =====
function handleExportHistory() {
  const data = {
    version: APP_CONFIG.version,
    exported_at: new Date().toISOString(),
    images: generatedImages.map(img => ({
      prompt: img.prompt,
      model: img.model,
      seed: img.seed,
      width: img.width,
      height: img.height,
      style: img.style,
      style_name: img.style_name,
      quality_mode: img.quality_mode,
      timestamp: img.timestamp
    }))
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = \`flux-ai-history-\${Date.now()}.json\`;
  link.click();
  showAlert('success', '✅ 歷史記錄已導出');
}

// ===== 渲染歷史頁面 =====
function renderHistoryPage() {
  const historyList = document.getElementById('historyList');
  if (!historyList) return;
  
  if (generatedImages.length === 0) {
    historyList.innerHTML = \`
      <div class="empty-state">
        <div class="empty-icon">📚</div>
        <p style="font-size:16px;margin-bottom:10px">暫無歷史記錄</p>
        <p style="font-size:14px">生成的圖像將自動保存在這裡</p>
      </div>
    \`;
    return;
  }
  
  const gallery = document.createElement('div');
  gallery.className = 'gallery';
  
  generatedImages.forEach(img => {
    const item = createGalleryItem(img);
    gallery.appendChild(item);
  });
  
  historyList.innerHTML = '';
  historyList.appendChild(gallery);
  
  // 更新統計信息
  updateHistoryStats();
}

// ===== 更新歷史統計 =====
function updateHistoryStats() {
  const totalEl = document.getElementById('historyTotal');
  const sizeEl = document.getElementById('storageSize');
  const styleEl = document.getElementById('recentStyle');
  
  if (totalEl) totalEl.textContent = generatedImages.length;
  
  if (sizeEl) {
    const size = new Blob([JSON.stringify(generatedImages)]).size;
    const sizeKB = (size / 1024).toFixed(2);
    sizeEl.textContent = sizeKB + ' KB';
  }
  
  if (styleEl && generatedImages.length > 0) {
    styleEl.textContent = generatedImages[0].style_name || '-';
  }
}

// ===== 更新歷史計數 =====
function updateHistoryCount() {
  const countEl = document.getElementById('historyCount');
  if (countEl) {
    countEl.textContent = generatedImages.length;
  }
}

// ===== 保存歷史到 localStorage =====
function saveHistory() {
  try {
    // 只保存必要信息，不保存 base64 圖片數據
    const historyToSave = generatedImages.map(img => ({
      ...img,
      url: img.url.startsWith('blob:') ? '' : img.url // 清除 blob URLs
    }));
    localStorage.setItem('flux_ai_history', JSON.stringify(historyToSave));
  } catch (error) {
    console.error('Save history error:', error);
  }
}

// ===== 更新預覽 =====
function updatePreview() {
  const model = document.getElementById('model')?.value || 'zimage';
  const size = document.getElementById('size')?.value || 'square-1k';
  const style = document.getElementById('style')?.value || 'none';
  
  const sizeConfig = PRESET_SIZES[size];
  const modelName = document.getElementById('model')?.selectedOptions[0]?.text || model;
  const styleName = STYLE_PRESETS[style]?.name || '無風格';
  
  const previewModel = document.getElementById('previewModel');
  const previewSize = document.getElementById('previewSize');
  const previewStyle = document.getElementById('previewStyle');
  
  if (previewModel) previewModel.textContent = modelName;
  if (previewSize) previewSize.textContent = \`\${sizeConfig.width}x\${sizeConfig.height} (\${sizeConfig.name})\`;
  if (previewStyle) previewStyle.textContent = styleName;
}

// ===== 更新風格信息 =====
function updateStyleInfo() {
  const style = document.getElementById('style')?.value || 'none';
  const styleConfig = STYLE_PRESETS[style];
  
  const currentStyleName = document.getElementById('currentStyleName');
  const styleDescription = document.getElementById('styleDescription');
  
  if (currentStyleName && styleConfig) {
    currentStyleName.textContent = styleConfig.icon + ' ' + styleConfig.name;
  }
  
  if (styleDescription && styleConfig) {
    styleDescription.textContent = styleConfig.description || '使用原始提示詞';
  }
}

// ===== 顯示加載狀態 =====
function showLoadingState() {
  const resultsDiv = document.getElementById('results');
  if (!resultsDiv) return;
  
  resultsDiv.innerHTML = \`
    <div class="loading-state">
      <div class="spinner"></div>
      <p style="font-size:16px;margin-bottom:8px">🎨 AI 正在創作中...</p>
      <p style="font-size:14px">這可能需要幾秒到幾十秒</p>
    </div>
  \`;
}

// ===== 顯示空狀態 =====
function showEmptyState() {
  const resultsDiv = document.getElementById('results');
  if (!resultsDiv) return;
  
  resultsDiv.innerHTML = \`
    <div class="empty-state">
      <div class="empty-icon">🖼️</div>
      <p style="font-size:16px;margin-bottom:10px">尚未生成任何圖像</p>
      <p style="font-size:14px">填寫左側參數並輸入提示詞後點擊生成</p>
    </div>
  \`;
}

// ===== 顯示提示信息 =====
function showAlert(type, message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = \`alert alert-\${type} fade-in\`;
  alertDiv.style.cssText = 'position:fixed;top:80px;right:24px;z-index:1000;min-width:300px;max-width:500px;';
  
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  alertDiv.innerHTML = \`<span>\${icons[type] || ''}</span><span>\${message}</span>\`;
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.style.opacity = '0';
    setTimeout(() => alertDiv.remove(), 300);
  }, 3000);
}

// ===== HTML 轉義 =====
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== 頁面初始化 =====
document.addEventListener('DOMContentLoaded', initializeApp);
</script>
`;
}
function getUIScriptPart() {
  return `
<script>
// ===== 前面的 JavaScript 代碼（已在第六部分）=====
// ... (這裡包含所有之前的 JavaScript 函數)

// ===== 狀態管理 =====
let generatedImages = JSON.parse(localStorage.getItem('flux_ai_history') || '[]');
let isGenerating = false;

// ===== DOM 元素初始化 =====
function initializeApp() {
  updateHistoryCount();
  renderHistoryPage();
  setupEventListeners();
  updatePreview();
  updateStyleInfo();
}

// ===== 事件監聽器 =====
function setupEventListeners() {
  const generateForm = document.getElementById('generateForm');
  if (generateForm) {
    generateForm.addEventListener('submit', handleGenerate);
  }
  
  ['model', 'size', 'style', 'qualityMode'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', updatePreview);
    }
  });
  
  const styleSelect = document.getElementById('style');
  if (styleSelect) {
    styleSelect.addEventListener('change', updateStyleInfo);
  }
  
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', handleClearHistory);
  }
  
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', handleExportHistory);
  }
  
  const advancedToggle = document.getElementById('advancedToggle');
  const advancedSection = document.getElementById('advancedSection');
  if (advancedToggle && advancedSection) {
    advancedToggle.addEventListener('click', () => {
      advancedSection.classList.toggle('show');
      advancedToggle.textContent = advancedSection.classList.contains('show') 
        ? '▲ 收起進階選項' 
        : '▼ 展開進階選項';
    });
  }
  
  // Tab 切換
  const tabButtons = document.querySelectorAll('[data-tab]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
    });
  });
}

// ===== Tab 切換函數 =====
function switchTab(tabName) {
  // 更新按鈕狀態
  document.querySelectorAll('[data-tab]').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // 更新頁面顯示
  document.querySelectorAll('.tab-content').forEach(content => {
    if (content.id === tabName + 'Page') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  });
  
  // 如果切換到歷史頁面，刷新顯示
  if (tabName === 'history') {
    renderHistoryPage();
  }
}

// ===== 生成圖像主函數 =====
async function handleGenerate(e) {
  e.preventDefault();
  
  if (isGenerating) return;
  
  const prompt = document.getElementById('prompt').value.trim();
  if (!prompt) {
    showAlert('error', '❌ 請輸入提示詞');
    return;
  }
  
  isGenerating = true;
  const generateBtn = document.getElementById('generateBtn');
  const originalText = generateBtn.innerHTML;
  generateBtn.innerHTML = '<span>⏳</span> 生成中...';
  generateBtn.disabled = true;
  
  showLoadingState();
  
  try {
    const model = document.getElementById('model').value;
    const size = document.getElementById('size').value;
    const sizeConfig = PRESET_SIZES[size];
    const style = document.getElementById('style').value;
    const qualityMode = document.getElementById('qualityMode').value;
    const negativePrompt = document.getElementById('negativePrompt').value.trim();
    const seed = parseInt(document.getElementById('seed').value) || -1;
    const numOutputs = parseInt(document.getElementById('numOutputs').value) || 1;
    const autoOptimize = document.getElementById('autoOptimize').checked;
    const autoHD = document.getElementById('autoHD').checked;
    
    const referenceImagesInput = document.getElementById('referenceImages').value.trim();
    const referenceImages = referenceImagesInput 
      ? referenceImagesInput.split(',').map(url => url.trim()).filter(url => url)
      : [];
    
    const requestBody = {
      prompt: prompt,
      model: model,
      width: sizeConfig.width,
      height: sizeConfig.height,
      style: style,
      quality_mode: qualityMode,
      negative_prompt: negativePrompt,
      seed: seed,
      n: numOutputs,
      auto_optimize: autoOptimize,
      auto_hd: autoHD,
      reference_images: referenceImages
    };
    
    console.log('🚀 Generation request:', requestBody);
    
    const response = await fetch('/_internal/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Generation failed');
    }
    
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('image/')) {
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      const imageData = {
        id: Date.now(),
        url: imageUrl,
        prompt: prompt,
        model: response.headers.get('X-Model') || model,
        seed: parseInt(response.headers.get('X-Seed')) || seed,
        width: parseInt(response.headers.get('X-Width')) || sizeConfig.width,
        height: parseInt(response.headers.get('X-Height')) || sizeConfig.height,
        style: style,
        style_name: response.headers.get('X-Style-Name') || STYLE_PRESETS[style]?.name || style,
        quality_mode: qualityMode,
        timestamp: new Date().toISOString(),
        generation_time: response.headers.get('X-Generation-Time') || 'N/A',
        authenticated: response.headers.get('X-Authenticated') === 'true'
      };
      
      generatedImages.unshift(imageData);
      saveHistory();
      renderResults([imageData]);
      showAlert('success', '✅ 圖像生成成功！');
      
    } else {
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        const images = data.data.map((img, index) => ({
          id: Date.now() + index,
          url: img.image,
          prompt: prompt,
          model: img.model,
          seed: img.seed,
          width: img.width,
          height: img.height,
          style: style,
          style_name: img.style_name || STYLE_PRESETS[style]?.name || style,
          quality_mode: qualityMode,
          timestamp: new Date().toISOString(),
          generation_time: data.generation_time_ms ? data.generation_time_ms + 'ms' : 'N/A',
          authenticated: img.authenticated
        }));
        
        generatedImages.unshift(...images);
        saveHistory();
        renderResults(images);
        showAlert('success', \`✅ 成功生成 \${images.length} 張圖像！\`);
      } else {
        throw new Error('No images returned');
      }
    }
    
    updateHistoryCount();
    
  } catch (error) {
    console.error('❌ Generation error:', error);
    showAlert('error', '❌ 生成失敗: ' + error.message);
    showEmptyState();
  } finally {
    isGenerating = false;
    generateBtn.innerHTML = originalText;
    generateBtn.disabled = false;
  }
}

// ===== 渲染結果 =====
function renderResults(images) {
  const resultsDiv = document.getElementById('results');
  if (!resultsDiv) return;
  
  resultsDiv.innerHTML = '';
  const gallery = document.createElement('div');
  gallery.className = 'gallery fade-in';
  
  images.forEach(img => {
    const item = createGalleryItem(img);
    gallery.appendChild(item);
  });
  
  resultsDiv.appendChild(gallery);
}

// ===== 創建畫廊項目 =====
function createGalleryItem(img) {
  const item = document.createElement('div');
  item.className = 'gallery-item slide-up';
  
  item.innerHTML = \`
    <img src="\${img.url}" alt="Generated image" class="gallery-image" onclick="openImageModal('\${img.url}')">
    <div class="gallery-info">
      <div class="gallery-meta">
        <span class="meta-badge model">📦 \${img.model}</span>
        <span class="meta-badge seed">🎲 \${img.seed}</span>
        <span class="meta-badge style">🎨 \${img.style_name}</span>
      </div>
      <div class="gallery-meta">
        <span class="meta-badge">📐 \${img.width}x\${img.height}</span>
        <span class="meta-badge">⏱️ \${img.generation_time}</span>
        \${img.authenticated ? '<span class="meta-badge" style="background:var(--success-bg);color:var(--success)">🔐 已認證</span>' : ''}
      </div>
      <div class="gallery-actions">
        <button class="action-btn" onclick="downloadImage('\${img.url}', '\${img.seed}')">
          <span>💾</span> 下載
        </button>
        <button class="action-btn" onclick="copyPrompt('\${escapeHtml(img.prompt)}')">
          <span>📋</span> 複製
        </button>
        <button class="action-btn delete" onclick="deleteImage(\${img.id})">
          <span>🗑️</span> 刪除
        </button>
      </div>
    </div>
  \`;
  
  return item;
}

// ===== 工具函數 =====
function openImageModal(imageUrl) {
  const modal = document.createElement('div');
  modal.id = 'imageModal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:1000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s';
  modal.innerHTML = \`
    <button onclick="closeImageModal()" style="position:absolute;top:20px;right:20px;width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;font-size:24px;cursor:pointer;backdrop-filter:blur(10px);transition:all 0.3s" onmouseover="this.style.transform='rotate(90deg)'" onmouseout="this.style.transform='rotate(0deg)'">✕</button>
    <img src="\${imageUrl}" style="max-width:90%;max-height:90vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5)">
  \`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

async function downloadImage(url, seed) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = \`flux-ai-\${seed}-\${Date.now()}.png\`;
    link.click();
    showAlert('success', '✅ 圖片下載中...');
  } catch (error) {
    showAlert('error', '❌ 下載失敗');
  }
}

function copyPrompt(prompt) {
  navigator.clipboard.writeText(prompt).then(() => {
    showAlert('success', '✅ 提示詞已複製');
  }).catch(() => {
    showAlert('error', '❌ 複製失敗');
  });
}

function deleteImage(id) {
  if (!confirm('確定要刪除這張圖片嗎？')) return;
  
  generatedImages = generatedImages.filter(img => img.id !== id);
  saveHistory();
  updateHistoryCount();
  renderHistoryPage();
  
  const resultsDiv = document.getElementById('results');
  if (resultsDiv) {
    const currentImages = generatedImages.slice(0, 4);
    if (currentImages.length > 0) {
      renderResults(currentImages);
    } else {
      showEmptyState();
    }
  }
  
  showAlert('success', '✅ 圖片已刪除');
}

function handleClearHistory() {
  if (!confirm('確定要清空所有歷史記錄嗎？')) return;
  
  generatedImages = [];
  saveHistory();
  updateHistoryCount();
  renderHistoryPage();
  showAlert('success', '✅ 歷史記錄已清空');
}

function handleExportHistory() {
  const data = {
    version: APP_CONFIG.version,
    exported_at: new Date().toISOString(),
    images: generatedImages.map(img => ({
      prompt: img.prompt,
      model: img.model,
      seed: img.seed,
      width: img.width,
      height: img.height,
      style: img.style,
      style_name: img.style_name,
      quality_mode: img.quality_mode,
      timestamp: img.timestamp
    }))
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = \`flux-ai-history-\${Date.now()}.json\`;
  link.click();
  showAlert('success', '✅ 歷史記錄已導出');
}

function renderHistoryPage() {
  const historyList = document.getElementById('historyList');
  if (!historyList) return;
  
  if (generatedImages.length === 0) {
    historyList.innerHTML = \`
      <div class="empty-state">
        <div class="empty-icon">📚</div>
        <p style="font-size:16px;margin-bottom:10px">暫無歷史記錄</p>
        <p style="font-size:14px">生成的圖像將自動保存在這裡</p>
      </div>
    \`;
    return;
  }
  
  const gallery = document.createElement('div');
  gallery.className = 'gallery';
  
  generatedImages.forEach(img => {
    gallery.appendChild(createGalleryItem(img));
  });
  
  historyList.innerHTML = '';
  historyList.appendChild(gallery);
  updateHistoryStats();
}

function updateHistoryStats() {
  const totalEl = document.getElementById('historyTotal');
  const sizeEl = document.getElementById('storageSize');
  const styleEl = document.getElementById('recentStyle');
  
  if (totalEl) totalEl.textContent = generatedImages.length;
  
  if (sizeEl) {
    const size = new Blob([JSON.stringify(generatedImages)]).size;
    sizeEl.textContent = (size / 1024).toFixed(2) + ' KB';
  }
  
  if (styleEl && generatedImages.length > 0) {
    styleEl.textContent = generatedImages[0].style_name || '-';
  }
}

function updateHistoryCount() {
  const countEl = document.getElementById('historyCount');
  if (countEl) {
    countEl.textContent = generatedImages.length;
  }
}

function saveHistory() {
  try {
    const historyToSave = generatedImages.map(img => ({
      ...img,
      url: img.url.startsWith('blob:') ? '' : img.url
    }));
    localStorage.setItem('flux_ai_history', JSON.stringify(historyToSave));
  } catch (error) {
    console.error('Save error:', error);
  }
}

function updatePreview() {
  const model = document.getElementById('model')?.value || 'zimage';
  const size = document.getElementById('size')?.value || 'square-1k';
  const style = document.getElementById('style')?.value || 'none';
  
  const sizeConfig = PRESET_SIZES[size];
  const modelName = document.getElementById('model')?.selectedOptions[0]?.text || model;
  const styleName = STYLE_PRESETS[style]?.name || '無風格';
  
  const previewModel = document.getElementById('previewModel');
  const previewSize = document.getElementById('previewSize');
  const previewStyle = document.getElementById('previewStyle');
  
  if (previewModel) previewModel.textContent = modelName;
  if (previewSize) previewSize.textContent = \`\${sizeConfig.width}x\${sizeConfig.height} (\${sizeConfig.name})\`;
  if (previewStyle) previewStyle.textContent = styleName;
}

function updateStyleInfo() {
  const style = document.getElementById('style')?.value || 'none';
  const styleConfig = STYLE_PRESETS[style];
  
  const currentStyleName = document.getElementById('currentStyleName');
  const styleDescription = document.getElementById('styleDescription');
  
  if (currentStyleName && styleConfig) {
    currentStyleName.textContent = styleConfig.icon + ' ' + styleConfig.name;
  }
  
  if (styleDescription && styleConfig) {
    styleDescription.textContent = styleConfig.description || '使用原始提示詞';
  }
  
  updatePreview();
}

function showLoadingState() {
  const resultsDiv = document.getElementById('results');
  if (!resultsDiv) return;
  
  resultsDiv.innerHTML = \`
    <div class="loading-state">
      <div class="spinner"></div>
      <p style="font-size:16px;margin-bottom:8px">🎨 AI 正在創作中...</p>
      <p style="font-size:14px">這可能需要幾秒到幾十秒</p>
    </div>
  \`;
}

function showEmptyState() {
  const resultsDiv = document.getElementById('results');
  if (!resultsDiv) return;
  
  resultsDiv.innerHTML = \`
    <div class="empty-state">
      <div class="empty-icon">🖼️</div>
      <p style="font-size:16px;margin-bottom:10px">尚未生成任何圖像</p>
      <p style="font-size:14px">填寫參數並輸入提示詞後點擊生成</p>
    </div>
  \`;
}

function showAlert(type, message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = \`alert alert-\${type} fade-in\`;
  alertDiv.style.cssText = 'position:fixed;top:80px;right:24px;z-index:1000;min-width:300px;max-width:500px;box-shadow:var(--shadow-lg)';
  
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  alertDiv.innerHTML = \`<span>\${icons[type]}</span><span>\${message}</span>\`;
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.style.opacity = '0';
    setTimeout(() => alertDiv.remove(), 300);
  }, 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', initializeApp);
</script>

<!-- HTML 主體結構 -->
<div class="app-container">
  <!-- 頂部導航 -->
  <div class="top-header">
    <div class="header-left">
      <div class="logo">
        🎨 Flux AI Pro
        <span class="badge badge-version">v${CONFIG.PROJECT_VERSION}</span>
        <span class="badge badge-new">Radix UI</span>
        <span class="badge badge-styles">${stylesCount} 風格</span>
      </div>
      <div class="api-status">
        <div class="api-status-line">${authStatus}</div>
        <div class="api-endpoint">📡 ${apiEndpoint}</div>
      </div>
    </div>
  </div>

  <!-- Tab 導航 -->
  <div style="display:flex;background:var(--bg-tertiary);border-bottom:1px solid var(--border-primary)">
    <button data-tab="generate" class="active" style="all:unset;padding:16px 24px;cursor:pointer;font-size:14px;font-weight:600;color:var(--text-tertiary);border-bottom:2px solid transparent;transition:var(--transition);display:flex;align-items:center;gap:8px">
      <span>🎨</span> 生成圖像
    </button>
    <button data-tab="history" style="all:unset;padding:16px 24px;cursor:pointer;font-size:14px;font-weight:600;color:var(--text-tertiary);border-bottom:2px solid transparent;transition:var(--transition);display:flex;align-items:center;gap:8px">
      <span>📚</span> 歷史記錄 <span id="historyCount" style="background:var(--warning-bg);color:var(--warning);padding:2px 8px;border-radius:10px;font-size:11px">0</span>
    </button>
  </div>

  <!-- 內容區域 -->
  <div class="content-wrapper">
    <!-- 生成頁面 -->
    <div id="generatePage" class="tab-content">
      <div class="generate-layout">
        <!-- 左側面板 -->
        <div class="panel panel-left">
          <div class="section-title">⚙️ 生成參數</div>
          <form id="generateForm">
            <div class="form-group">
              <label class="form-label">模型選擇</label>
              <select id="model" class="form-select">
                <optgroup label="⚡ Z-Image 系列">
                  <option value="zimage" selected>Z-Image Turbo ⚡</option>
                </optgroup>
                <optgroup label="🎨 Flux 系列">
                  <option value="flux">Flux 標準版</option>
                  <option value="turbo">Flux Turbo ⚡</option>
                </optgroup>
                <optgroup label="🖼️ Kontext 系列">
                  <option value="kontext">Kontext 🎨 (圖生圖)</option>
                </optgroup>
              </select>
              <div class="form-hint">💰 價格: Z-Image (0.0002) | Flux (0.00012) | Turbo (0.0003) | Kontext (0.04)</div>
            </div>

            <div class="form-group">
              <label class="form-label">尺寸預設</label>
              <select id="size" class="form-select">
                <option value="square-1k" selected>方形 1024x1024</option>
                <option value="square-1.5k">方形 1536x1536</option>
                <option value="square-2k">方形 2048x2048</option>
                <option value="portrait-9-16-hd">豎屏 1080x1920</option>
                <option value="landscape-16-9-hd">橫屏 1920x1080</option>
                <option value="instagram-square">Instagram 方形</option>
                <option value="wallpaper-fhd">桌布 Full HD</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">藝術風格 🎨</label>
              <select id="style" class="form-select">
                ${styleOptionsHTML}
              </select>
              <div class="form-hint info">✨ ${stylesCount} 種風格可選</div>
            </div>

            <div class="form-group">
              <label class="form-label">質量模式</label>
              <select id="qualityMode" class="form-select">
                <option value="economy">經濟模式 (快速)</option>
                <option value="standard" selected>標準模式 (平衡)</option>
                <option value="ultra">超高清模式 (極致)</option>
              </select>
            </div>

            <div style="margin:20px 0">
              <a id="advancedToggle" style="color:var(--info);font-size:13px;cursor:pointer;text-decoration:underline">▼ 展開進階選項</a>
            </div>

            <div id="advancedSection" class="advanced-section">
              <div class="form-group">
                <label class="form-label">Seed (-1 = 隨機)</label>
                <input type="number" id="seed" class="form-input" value="-1" min="-1" max="999999">
              </div>
              <div class="form-group">
                <label class="form-label">生成數量 (1-4)</label>
                <input type="number" id="numOutputs" class="form-input" value="1" min="1" max="4">
              </div>
              <div class="form-group">
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
                  <input type="checkbox" id="autoOptimize" checked> 
                  <span class="form-label" style="margin:0">自動優化參數</span>
                </label>
              </div>
              <div class="form-group">
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
                  <input type="checkbox" id="autoHD" checked> 
                  <span class="form-label" style="margin:0">自動HD增強</span>
                </label>
              </div>
            </div>

            <button type="submit" class="btn btn-primary" id="generateBtn">
              <span>🎨</span> 開始生成
            </button>
          </form>
        </div>

        <!-- 中間面板 -->
        <div class="panel panel-center">
          <div class="section-title">🖼️ 生成結果</div>
          <div id="results">
            <div class="empty-state">
              <div class="empty-icon">🖼️</div>
              <p style="font-size:16px;margin-bottom:10px">尚未生成任何圖像</p>
              <p style="font-size:14px">填寫參數並輸入提示詞後點擊生成</p>
            </div>
          </div>
        </div>

        <!-- 右側面板 -->
        <div class="panel panel-right">
          <div class="section-title">💬 提示詞</div>
          
          <div class="form-group">
            <label class="form-label">正面提示詞</label>
            <textarea id="prompt" class="form-textarea" placeholder="描述你想生成的圖像...

例如：
• A beautiful sunset over mountains
• 一隻可愛的貓咪在花園裡玩耍
• Cyberpunk city at night" required></textarea>
            <div class="form-hint success">✅ 支持中文自動翻譯</div>
          </div>

          <div class="form-group">
            <label class="form-label">負面提示詞 (可選)</label>
            <textarea id="negativePrompt" class="form-textarea" rows="4" placeholder="描述不想要的內容...

例如：
• blurry, low quality
• ugly, deformed"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">參考圖像 URL (可選)</label>
            <textarea id="referenceImages" class="form-textarea" rows="3" placeholder="多張圖片用逗號分隔

https://example.com/image1.jpg"></textarea>
            <div class="form-hint info">📌 僅 Kontext 模型支持</div>
          </div>

          <div class="alert alert-info">
            <span>🎨</span>
            <div>
              <strong>當前風格</strong><br>
              <span id="currentStyleName">無風格</span><br>
              <span id="styleDescription" style="font-size:11px;opacity:0.8">使用原始提示詞</span>
            </div>
          </div>

          <div class="section-title" style="margin-top:25px">📋 配置預覽</div>
          <div style="background:var(--bg-card);border:1px solid var(--border-primary);border-radius:var(--radius-md);padding:12px;margin-bottom:12px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">模型</div>
            <div id="previewModel" style="color:var(--text-secondary);font-size:13px">Z-Image Turbo</div>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border-primary);border-radius:var(--radius-md);padding:12px;margin-bottom:12px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">尺寸</div>
            <div id="previewSize" style="color:var(--text-secondary);font-size:13px">1024x1024</div>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border-primary);border-radius:var(--radius-md);padding:12px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">風格</div>
            <div id="previewStyle" style="color:var(--text-secondary);font-size:13px">無風格</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 歷史頁面 -->
    <div id="historyPage" class="tab-content" style="display:none;padding:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding:20px;background:var(--bg-tertiary);border-radius:var(--radius-lg)">
        <div style="display:flex;gap:30px">
          <div>
            <div style="font-size:12px;color:var(--text-muted)">📊 總記錄數</div>
            <div id="historyTotal" style="font-size:24px;font-weight:700;color:var(--accent-primary)">0</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--text-muted)">💾 存儲空間</div>
            <div id="storageSize" style="font-size:24px;font-weight:700;color:var(--accent-primary)">0 KB</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--text-muted)">🎨 最近風格</div>
            <div id="recentStyle" style="font-size:16px;font-weight:700;color:var(--accent-primary)">-</div>
          </div>
        </div>
        <div style="display:flex;gap:12px">
          <button id="exportBtn" class="btn btn-secondary" style="width:auto;padding:10px 20px">📥 導出</button>
          <button id="clearBtn" class="btn btn-danger" style="width:auto;padding:10px 20px">🗑️ 清空</button>
        </div>
      </div>
      <div id="historyList"></div>
    </div>
  </div>
</div>

</body>
</html>`;
}
