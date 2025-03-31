/**
 * API客户端 - 处理所有API请求的基础服务
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com'

/**
 * 基础HTTP请求，支持GET、POST、PUT、DELETE方法
 */
async function fetchAPI<T>(
  endpoint: string,
  method: 'DELETE' | 'GET' | 'POST' | 'PUT' = 'GET',
  data?: any
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json'
      // 可以在这里添加认证头等
    },
    method,
    // 只有在有数据且不是GET请求时才添加body
    ...(data && method !== 'GET' ? { body: JSON.stringify(data) } : {})
  }

  try {
    const response = await fetch(url, options)

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`)
    }

    // 解析JSON响应
    const responseData = await response.json()
    return responseData as T
  } catch (error) {
    console.error('API请求错误:', error)
    throw error
  }
}

/**
 * API客户端对象 - 提供便捷的方法调用
 */
export const apiClient = {
  /**
   * 发送DELETE请求
   */
  delete: <T>(endpoint: string) => fetchAPI<T>(endpoint, 'DELETE'),

  /**
   * 发送GET请求
   */
  get: <T>(endpoint: string) => fetchAPI<T>(endpoint, 'GET'),

  /**
   * 发送POST请求
   */
  post: <T>(endpoint: string, data: any) => fetchAPI<T>(endpoint, 'POST', data),

  /**
   * 发送PUT请求
   */
  put: <T>(endpoint: string, data: any) => fetchAPI<T>(endpoint, 'PUT', data)
}
