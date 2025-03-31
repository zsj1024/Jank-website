/**
 * 全局类型定义
 */

// 组件通用类型
export interface BaseProps {
  children?: React.ReactNode
  className?: string
}

// SEO相关类型
export interface SeoConfig {
  description?: string
  keywords?: string[]
  ogImage?: string
  title: string
  // 其他SEO配置
}

// 站点配置类型
export interface SiteConfig {
  description: string
  keywords?: string[]
  name: string
  ogImage?: string
  url: string
  // 其他站点配置
}

// 主题类型
export interface ThemeConfig {
  defaultTheme: 'dark' | 'light' | 'system'
  // 其他主题配置
}

// 其他类型可能会从原有类型文件导入或扩展
