/**
 * 文章API服务 - 处理所有文章相关的API请求
 */

import { apiClient } from './client'

export interface Post {
  author?: {
    avatar?: string
    name: string
  }
  content: string
  coverImage?: string
  excerpt?: string
  id: string
  publishedAt: string
  slug: string
  tags?: string[]
  title: string
}

/**
 * 文章API - 提供文章相关的数据访问方法
 */
export const postsService = {
  /**
   * 获取所有文章列表
   */
  getAllPosts: async (): Promise<Post[]> => {
    return apiClient.get<Post[]>('/posts')
  },

  /**
   * 通过slug获取单篇文章
   */
  getPostBySlug: async (slug: string): Promise<Post> => {
    return apiClient.get<Post>(`/posts/${slug}`)
  },

  /**
   * 根据标签获取文章
   */
  getPostsByTag: async (tag: string): Promise<Post[]> => {
    return apiClient.get<Post[]>(`/posts/tag/${tag}`)
  },

  /**
   * 获取最新的文章列表
   */
  getRecentPosts: async (limit: number = 5): Promise<Post[]> => {
    return apiClient.get<Post[]>(`/posts/recent?limit=${limit}`)
  },

  /**
   * 搜索文章
   */
  searchPosts: async (query: string): Promise<Post[]> => {
    return apiClient.get<Post[]>(`/posts/search?q=${encodeURIComponent(query)}`)
  }
}
