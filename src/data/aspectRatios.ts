export interface AspectRatio {
  id: string
  name: string
  nameEn: string
  ratio: string
  width: number
  height: number
  icon?: string
  popular?: boolean
}

export const aspectRatios: AspectRatio[] = [
  {
    id: 'square',
    name: '正方形',
    nameEn: 'Square',
    ratio: '1:1',
    width: 1024,
    height: 1024,
    icon: '⬛',
    popular: true,
  },
  {
    id: 'landscape',
    name: '橫向 16:9',
    nameEn: 'Landscape 16:9',
    ratio: '16:9',
    width: 1344,
    height: 768,
    icon: '▬',
    popular: true,
  },
  {
    id: 'portrait',
    name: '直向 9:16',
    nameEn: 'Portrait 9:16',
    ratio: '9:16',
    width: 768,
    height: 1344,
    icon: '▮',
    popular: true,
  },
  {
    id: 'widescreen',
    name: '寬螢幕 21:9',
    nameEn: 'Widescreen 21:9',
    ratio: '21:9',
    width: 1536,
    height: 640,
    icon: '━',
  },
  {
    id: 'cinema',
    name: '電影 2.39:1',
    nameEn: 'Cinema 2.39:1',
    ratio: '2.39:1',
    width: 1536,
    height: 640,
    icon: '─',
  },
  {
    id: '4-3',
    name: '標準 4:3',
    nameEn: 'Standard 4:3',
    ratio: '4:3',
    width: 1152,
    height: 896,
    icon: '▭',
  },
  {
    id: '3-4',
    name: '直向 3:4',
    nameEn: 'Portrait 3:4',
    ratio: '3:4',
    width: 896,
    height: 1152,
    icon: '▯',
  },
  {
    id: '3-2',
    name: '經典相機 3:2',
    nameEn: 'Classic Camera 3:2',
    ratio: '3:2',
    width: 1216,
    height: 832,
    icon: '▬',
  },
  {
    id: '2-3',
    name: '直向 2:3',
    nameEn: 'Portrait 2:3',
    ratio: '2:3',
    width: 832,
    height: 1216,
    icon: '▮',
  },
  {
    id: 'instagram-post',
    name: 'Instagram 貼文',
    nameEn: 'Instagram Post',
    ratio: '1:1',
    width: 1080,
    height: 1080,
    icon: '📱',
  },
  {
    id: 'instagram-story',
    name: 'Instagram 限時動態',
    nameEn: 'Instagram Story',
    ratio: '9:16',
    width: 1080,
    height: 1920,
    icon: '📲',
  },
  {
    id: 'youtube-thumbnail',
    name: 'YouTube 縮圖',
    nameEn: 'YouTube Thumbnail',
    ratio: '16:9',
    width: 1280,
    height: 720,
    icon: '🎬',
  },
]

// 获取热门比例
export const getPopularRatios = (): AspectRatio[] => {
  return aspectRatios.filter(ratio => ratio.popular)
}

// 根据 ID 查找比例
export const getRatioById = (id: string): AspectRatio | undefined => {
  return aspectRatios.find(ratio => ratio.id === id)
}