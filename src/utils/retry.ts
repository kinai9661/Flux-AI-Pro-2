// 延迟函数
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 指数退避重试
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number
    initialDelay?: number
    onRetry?: (attempt: number, delay: number) => void
  } = {}
): Promise<T> {
  const { maxRetries = 3, initialDelay = 2000, onRetry } = options
  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      // 如果不是 429 错误或已经是最后一次尝试，直接抛出
      if (!error || typeof error !== 'object' || !('status' in error) || (error as any).status !== 429) {
        throw error
      }
      
      if (attempt === maxRetries) {
        throw error
      }

      // 计算延迟时间（指数退避）
      const waitTime = initialDelay * Math.pow(2, attempt)
      
      if (onRetry) {
        onRetry(attempt + 1, waitTime)
      }

      await delay(waitTime)
    }
  }

  throw lastError!
}