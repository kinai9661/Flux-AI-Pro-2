export interface StyleCategory {
  id: string
  name: string
  nameEn: string
  styles: Style[]
}

export interface Style {
  id: string
  name: string
  nameEn: string
  prompt: string
  negativePrompt?: string
  preview?: string
  popular?: boolean
}

export const styleCategories: StyleCategory[] = [
  {
    id: 'japanese',
    name: '日系風格',
    nameEn: 'Japanese Styles',
    styles: [
      {
        id: 'manga',
        name: '日本漫畫',
        nameEn: 'Japanese Manga',
        prompt: 'japanese manga style, manga art, comic book style, black and white manga, screentone, dynamic composition',
        negativePrompt: 'realistic, photo, 3d render',
        popular: true,
      },
      {
        id: 'anime',
        name: '動漫風格',
        nameEn: 'Anime Style',
        prompt: 'anime style, anime art, vibrant colors, cel shading, anime character design',
        negativePrompt: 'realistic, photo, western cartoon',
        popular: true,
      },
      {
        id: 'ghibli',
        name: '吉卜力風格',
        nameEn: 'Studio Ghibli',
        prompt: 'Studio Ghibli style, Hayao Miyazaki art style, whimsical, pastoral, hand-painted',
        negativePrompt: 'dark, gritty, realistic photo',
        popular: true,
      },
      {
        id: 'ukiyoe',
        name: '浮世繪',
        nameEn: 'Ukiyo-e',
        prompt: 'ukiyo-e style, japanese woodblock print, edo period art, traditional japanese art',
        negativePrompt: 'modern, digital, realistic',
      },
      {
        id: 'chibi',
        name: 'Q版風格',
        nameEn: 'Chibi Style',
        prompt: 'chibi style, super deformed, cute, kawaii, simplified proportions',
        negativePrompt: 'realistic proportions, detailed',
      },
    ],
  },
  {
    id: 'lineart',
    name: '線稿風格',
    nameEn: 'Line Art Styles',
    styles: [
      {
        id: 'lineart-clean',
        name: '乾淨線稿',
        nameEn: 'Clean Line Art',
        prompt: 'clean line art, black and white, crisp lines, no shading, vector style',
        negativePrompt: 'color, shading, messy lines',
        popular: true,
      },
      {
        id: 'lineart-sketch',
        name: '草稿線條',
        nameEn: 'Sketch Lines',
        prompt: 'sketch style, rough lines, pencil sketch, hand-drawn, loose linework',
        negativePrompt: 'clean, digital, polished',
      },
      {
        id: 'ink-drawing',
        name: '墨線畫',
        nameEn: 'Ink Drawing',
        prompt: 'ink drawing, ink linework, traditional ink art, bold lines, brush strokes',
        negativePrompt: 'pencil, digital, color',
      },
      {
        id: 'contour',
        name: '輪廓線',
        nameEn: 'Contour Drawing',
        prompt: 'contour drawing, outline only, single continuous line, minimalist line art',
        negativePrompt: 'filled, shaded, detailed',
      },
      {
        id: 'technical-drawing',
        name: '技術製圖',
        nameEn: 'Technical Drawing',
        prompt: 'technical drawing, blueprint style, precise lines, architectural drawing, CAD style',
        negativePrompt: 'artistic, organic, hand-drawn',
      },
    ],
  },
  {
    id: 'blackwhite',
    name: '黑白風格',
    nameEn: 'Black & White Styles',
    styles: [
      {
        id: 'bw-photography',
        name: '黑白攝影',
        nameEn: 'B&W Photography',
        prompt: 'black and white photography, monochrome, high contrast, grayscale, dramatic lighting',
        negativePrompt: 'color, vibrant',
        popular: true,
      },
      {
        id: 'noir',
        name: '黑色電影',
        nameEn: 'Film Noir',
        prompt: 'film noir style, high contrast black and white, dramatic shadows, 1940s cinema',
        negativePrompt: 'color, bright, cheerful',
      },
      {
        id: 'charcoal',
        name: '炭筆畫',
        nameEn: 'Charcoal Drawing',
        prompt: 'charcoal drawing, charcoal art, smudged, textured, black and white sketch',
        negativePrompt: 'color, clean lines, digital',
      },
      {
        id: 'silhouette',
        name: '剪影',
        nameEn: 'Silhouette',
        prompt: 'silhouette art, black silhouette, white background, minimalist, high contrast',
        negativePrompt: 'detailed, shaded, color',
      },
      {
        id: 'engraving',
        name: '版畫',
        nameEn: 'Engraving',
        prompt: 'engraving style, crosshatching, woodcut, etching, vintage print',
        negativePrompt: 'smooth, digital, color',
      },
    ],
  },
  {
    id: 'painting',
    name: '繪畫風格',
    nameEn: 'Painting Styles',
    styles: [
      {
        id: 'oil-painting',
        name: '油畫',
        nameEn: 'Oil Painting',
        prompt: 'oil painting, oil on canvas, brushstrokes visible, thick paint texture, classical painting',
        negativePrompt: 'digital, smooth, photo',
        popular: true,
      },
      {
        id: 'watercolor',
        name: '水彩畫',
        nameEn: 'Watercolor',
        prompt: 'watercolor painting, soft colors, transparent layers, paper texture, flowing colors',
        negativePrompt: 'digital, sharp edges, oil painting',
        popular: true,
      },
      {
        id: 'acrylic',
        name: '壓克力畫',
        nameEn: 'Acrylic Painting',
        prompt: 'acrylic painting, vibrant colors, bold strokes, modern art',
        negativePrompt: 'watercolor, oil painting',
      },
      {
        id: 'impressionism',
        name: '印象派',
        nameEn: 'Impressionism',
        prompt: 'impressionist style, loose brushwork, light and color, outdoor scenes, Monet style',
        negativePrompt: 'detailed, photorealistic, sharp',
      },
      {
        id: 'abstract',
        name: '抽象派',
        nameEn: 'Abstract Art',
        prompt: 'abstract art, non-representational, geometric shapes, bold colors, modern abstract',
        negativePrompt: 'realistic, representational, detailed',
      },
      {
        id: 'chinese-painting',
        name: '國畫',
        nameEn: 'Chinese Painting',
        prompt: 'traditional chinese painting, ink wash, sumi-e style, brush painting, oriental art',
        negativePrompt: 'western, digital, realistic',
      },
    ],
  },
  {
    id: 'digital',
    name: '數位藝術',
    nameEn: 'Digital Art',
    styles: [
      {
        id: 'cyberpunk',
        name: '賽博龐克',
        nameEn: 'Cyberpunk',
        prompt: 'cyberpunk style, neon lights, futuristic cityscape, dark atmosphere, sci-fi',
        negativePrompt: 'natural, pastoral, historical',
        popular: true,
      },
      {
        id: 'vaporwave',
        name: '蒸氣波',
        nameEn: 'Vaporwave',
        prompt: 'vaporwave aesthetic, retro futurism, pastel colors, glitch art, 80s nostalgia',
        negativePrompt: 'realistic, natural colors',
      },
      {
        id: 'pixel-art',
        name: '像素藝術',
        nameEn: 'Pixel Art',
        prompt: 'pixel art, 8-bit style, retro gaming, pixelated, low resolution aesthetic',
        negativePrompt: 'high resolution, smooth, realistic',
      },
      {
        id: 'low-poly',
        name: '低多邊形',
        nameEn: 'Low Poly',
        prompt: 'low poly art, geometric, faceted, 3d low poly, minimalist 3d',
        negativePrompt: 'high poly, detailed, realistic',
      },
      {
        id: 'neon',
        name: '霓虹風格',
        nameEn: 'Neon Style',
        prompt: 'neon art, glowing neon lights, vibrant neon colors, night scene, electric',
        negativePrompt: 'matte, dull, daylight',
        popular: true,
      },
      {
        id: 'synthwave',
        name: '合成波',
        nameEn: 'Synthwave',
        prompt: 'synthwave style, retrowave, 80s aesthetic, sunset gradient, grid lines, outrun',
        negativePrompt: 'modern, realistic, natural',
      },
    ],
  },
  {
    id: 'photography',
    name: '攝影風格',
    nameEn: 'Photography Styles',
    styles: [
      {
        id: 'portrait',
        name: '人像攝影',
        nameEn: 'Portrait Photography',
        prompt: 'portrait photography, professional headshot, shallow depth of field, bokeh background',
        negativePrompt: 'landscape, wide shot',
        popular: true,
      },
      {
        id: 'landscape',
        name: '風景攝影',
        nameEn: 'Landscape Photography',
        prompt: 'landscape photography, wide angle, nature scenery, golden hour lighting, scenic vista',
        negativePrompt: 'portrait, close-up, indoor',
      },
      {
        id: 'macro',
        name: '微距攝影',
        nameEn: 'Macro Photography',
        prompt: 'macro photography, extreme close-up, detailed texture, shallow focus',
        negativePrompt: 'wide shot, landscape',
      },
      {
        id: 'hdr',
        name: 'HDR攝影',
        nameEn: 'HDR Photography',
        prompt: 'HDR photography, high dynamic range, vivid colors, detailed shadows and highlights',
        negativePrompt: 'flat, low contrast',
      },
      {
        id: 'long-exposure',
        name: '長曝光',
        nameEn: 'Long Exposure',
        prompt: 'long exposure photography, motion blur, light trails, smooth water, night photography',
        negativePrompt: 'sharp, frozen motion',
      },
      {
        id: 'film-grain',
        name: '底片質感',
        nameEn: 'Film Grain',
        prompt: 'film photography, analog film, film grain, vintage photo, Kodak Portra',
        negativePrompt: 'digital, clean, sharp',
      },
    ],
  },
  {
    id: 'fantasy',
    name: '奇幻風格',
    nameEn: 'Fantasy Styles',
    styles: [
      {
        id: 'fantasy-art',
        name: '奇幻藝術',
        nameEn: 'Fantasy Art',
        prompt: 'fantasy art, magical, mythical creatures, epic fantasy, detailed illustration',
        negativePrompt: 'realistic, modern, mundane',
        popular: true,
      },
      {
        id: 'dark-fantasy',
        name: '黑暗奇幻',
        nameEn: 'Dark Fantasy',
        prompt: 'dark fantasy, gothic, ominous atmosphere, dark magic, horror fantasy',
        negativePrompt: 'bright, cheerful, lighthearted',
      },
      {
        id: 'steampunk',
        name: '蒸汽龐克',
        nameEn: 'Steampunk',
        prompt: 'steampunk style, Victorian era, brass and copper, gears and clockwork, industrial',
        negativePrompt: 'modern, digital, minimalist',
      },
      {
        id: 'dreamlike',
        name: '夢幻效果',
        nameEn: 'Dreamlike',
        prompt: 'dreamlike, surreal, ethereal, soft focus, magical atmosphere, fantasy lighting',
        negativePrompt: 'realistic, sharp, mundane',
      },
    ],
  },
  {
    id: 'special',
    name: '特殊效果',
    nameEn: 'Special Effects',
    styles: [
      {
        id: 'glowing',
        name: '發光效果',
        nameEn: 'Glowing Effect',
        prompt: 'glowing effect, luminous, bioluminescent, light emission, radiant',
        negativePrompt: 'matte, dull',
      },
      {
        id: 'glass',
        name: '玻璃質感',
        nameEn: 'Glass Material',
        prompt: 'glass material, transparent, reflective, crystal clear, refractive',
        negativePrompt: 'opaque, matte',
      },
      {
        id: 'metallic',
        name: '金屬質感',
        nameEn: 'Metallic',
        prompt: 'metallic material, chrome, reflective metal, polished metal surface',
        negativePrompt: 'organic, soft, matte',
      },
      {
        id: 'holographic',
        name: '全息效果',
        nameEn: 'Holographic',
        prompt: 'holographic effect, iridescent, rainbow sheen, color shifting, futuristic',
        negativePrompt: 'matte, single color',
      },
      {
        id: 'x-ray',
        name: 'X光效果',
        nameEn: 'X-Ray Effect',
        prompt: 'x-ray effect, transparent view, skeletal, internal structure visible',
        negativePrompt: 'opaque, solid',
      },
    ],
  },
]

// 获取所有风格的扁平列表
export const getAllStyles = (): Style[] => {
  return styleCategories.flatMap(category => category.styles)
}

// 获取热门风格
export const getPopularStyles = (): Style[] => {
  return getAllStyles().filter(style => style.popular)
}

// 根据 ID 查找风格
export const getStyleById = (id: string): Style | undefined => {
  return getAllStyles().find(style => style.id === id)
}