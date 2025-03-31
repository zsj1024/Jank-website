import { seoConfig } from '@/config/seo.config'
import { siteConfig } from '@/config/site.config'

/**
 * 格式化页面标题，确保一致的格式
 * @param title 页面标题
 * @param config SEO配置
 * @returns 格式化后的完整标题
 */
export const formatTitle = (title?: string, config = seoConfig): string =>
  !title
    ? config.titleTemplate.replace('%s', config.title)
    : config.titleTemplate.replace('%s', title)

/**
 * 构建规范URL，确保URL格式正确
 * @param path 页面路径
 * @param config SEO配置
 * @returns 完整的规范URL
 */
export const buildUrl = (path?: string, config = seoConfig): string => {
  if (!path) return config.canonicalUrlPrefix || ''
  return `${config.canonicalUrlPrefix || ''}${
    path.startsWith('/') ? path : `/${path}`
  }`
}

/**
 * 获取Open Graph图片URL
 * @param ogImage 自定义图片URL
 * @returns 最终使用的图片URL
 */
export const getOgImage = (ogImage?: string): string =>
  ogImage ||
  seoConfig.openGraph?.images?.[0]?.url ||
  `${siteConfig.url}/og-image.png`

/**
 * 创建keywords字符串
 * @param keywords 关键词数组
 * @returns 逗号分隔的关键词字符串
 */
export const formatKeywords = (
  keywords: string[] = seoConfig.keywords
): string => keywords.join(', ')
