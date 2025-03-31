import { siteConfig } from '@/config/site.config'

/**
 * SEO配置
 * 定义网站的SEO相关设置
 */
export const seoConfig: SEOConfig = {
  additionalMetaTags: [
    { content: '#ffffff', name: 'theme-color' },
    { content: 'yes', name: 'apple-mobile-web-app-capable' },
    { content: 'default', name: 'apple-mobile-web-app-status-bar-style' },
    { content: 'telephone=no', name: 'format-detection' },
    { content: siteConfig.name, name: 'application-name' },
    {
      content: 'index, follow, max-image-preview:large, max-snippet:-1',
      name: 'robots'
    }
  ],
  // 区域设置
  alternateLocales: [
    { href: 'https://jank.org.cn/', hrefLang: 'zh-CN' },
    { href: 'https://jank.org.cn/en', hrefLang: 'en' }
  ],
  author: siteConfig.author.name || 'Don-0',
  canonicalUrlPrefix: 'https://jank.org.cn',
  defaultTitle: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    'Jank博客系统',
    'Next.js',
    'React',
    'TypeScript',
    '内容管理系统',
    '高性能'
  ],
  language: 'zh-CN',

  // 开放图谱协议
  openGraph: {
    description: siteConfig.description,
    images: [
      {
        alt: siteConfig.name,
        height: 630,
        url: 'https://jank.org.cn/og-image.png',
        width: 1200
      },
      {
        alt: `${siteConfig.name} Logo`,
        height: 800,
        url: 'https://jank.org.cn/og-image-square.png',
        width: 800
      }
    ],
    locale: 'zh-CN',
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: 'website',
    url: 'https://jank.org.cn'
  },

  // 性能优化配置
  performance: {
    dnsPreconnect: ['https://jank.org.cn'],
    preconnectOrigins: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ],
    preloadFonts: true
  },

  // 结构化数据
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      logo: 'https://jank.org.cn/logo.png',
      name: siteConfig.name,
      sameAs: ['https://github.com/Don-0'],
      url: 'https://jank.org.cn'
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      description: siteConfig.description,
      name: siteConfig.name,
      potentialAction: {
        '@type': 'SearchAction',
        'query-input': 'required name=search_term_string',
        target: 'https://jank.org.cn/search?q={search_term_string}'
      },
      url: 'https://jank.org.cn'
    }
  },

  // 基础SEO元数据
  title: siteConfig.name,

  titleTemplate: `%s | ${siteConfig.name}`,

  // Twitter卡片
  twitter: {
    cardType: 'summary_large_image',
    description: siteConfig.description,
    site: '@jank_site',
    title: siteConfig.name
  }
}
