// IndexedDB 图片存储工具

const DB_NAME = 'flux-ai-images'
const STORE_NAME = 'images'
const DB_VERSION = 1

interface StoredImage {
  id: string
  blob: Blob
  timestamp: number
}

// 初始化数据库
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }
  })
}

// 保存图片到 IndexedDB
export async function saveImageToDB(id: string, imageUrl: string): Promise<void> {
  try {
    // 将 blob URL 转换为 Blob
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    
    const data: StoredImage = {
      id,
      blob,
      timestamp: Date.now()
    }
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put(data)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
    
    db.close()
  } catch (error) {
    console.error('Failed to save image to IndexedDB:', error)
    throw error
  }
}

// 从 IndexedDB 读取图片
export async function getImageFromDB(id: string): Promise<string | null> {
  try {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    
    const data = await new Promise<StoredImage | undefined>((resolve, reject) => {
      const request = store.get(id)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
    
    db.close()
    
    if (data?.blob) {
      return URL.createObjectURL(data.blob)
    }
    return null
  } catch (error) {
    console.error('Failed to get image from IndexedDB:', error)
    return null
  }
}

// 删除图片
export async function deleteImageFromDB(id: string): Promise<void> {
  try {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    
    await new Promise<void>((resolve, reject) => {
      const request = store.delete(id)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
    
    db.close()
  } catch (error) {
    console.error('Failed to delete image from IndexedDB:', error)
    throw error
  }
}

// 清空所有图片
export async function clearAllImages(): Promise<void> {
  try {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    
    await new Promise<void>((resolve, reject) => {
      const request = store.clear()
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
    
    db.close()
  } catch (error) {
    console.error('Failed to clear images from IndexedDB:', error)
    throw error
  }
}

// 获取所有图片 ID
export async function getAllImageIds(): Promise<string[]> {
  try {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    
    const ids = await new Promise<string[]>((resolve, reject) => {
      const request = store.getAllKeys()
      request.onsuccess = () => resolve(request.result as string[])
      request.onerror = () => reject(request.error)
    })
    
    db.close()
    return ids
  } catch (error) {
    console.error('Failed to get image IDs from IndexedDB:', error)
    return []
  }
}

// 获取存储使用情况
export async function getStorageInfo(): Promise<{ used: number; quota: number }> {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate()
      return {
        used: estimate.usage || 0,
        quota: estimate.quota || 0
      }
    } catch (error) {
      console.error('Failed to get storage estimate:', error)
    }
  }
  return { used: 0, quota: 0 }
}

// 格式化存储大小
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}