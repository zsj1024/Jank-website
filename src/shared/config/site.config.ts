/**
 * 站点配置
 * 定义网站的基本设置
 */
import { Inter } from 'next/font/google'

// 预配置字体
export const interFont = Inter({
  display: 'swap',
  preload: true,
  subsets: ['latin']
})

export const siteConfig: SiteConfig = {
  // API配置
  api: {
    baseUrl: 'https://api.jank.org.cn',
    caching: true,
    retries: 3,
    timeout: 5000
  },
  // 作者信息
  author: {
    email: 'fenderisfine@outlook.com',
    name: 'Don-0',
    url: 'https://github.com/Don-0'
  },
  // 企业备案信息
  beian: {
    company: '成都XXX科技有限公司',
    copyright: `© ${new Date().getFullYear()} 成都XXX科技有限公司`,
    gongan: {
      number: '川公网安备51010802XXXXXX号',
      province: '四川省'
    },
    icp: '蜀ICP备2024090198号-3',
    license: '91510108XXXXXXXXXXXX'
  },
  // 内容配置
  content: {
    contentSecurity: {
      allowedTags: [
        'h1',
        'h2',
        'h3',
        'p',
        'a',
        'ul',
        'ol',
        'li',
        'code',
        'pre'
      ],
      sanitize: true
    },
    defaultAuthor: 'Don-0',
    excerptLength: 160,
    postsPerPage: 10,
    taxonomies: ['tags', 'categories']
  },
  // 版权与法律信息
  copyright: `© ${new Date().getFullYear()} Jank 博客系统. All rights reserved.`,

  defaultTheme: 'system',

  description:
    '一款极简、低耦合且高扩展的博客系统，基于 Go 语言开发，后端内存占用仅 13 MB。',

  // 功能特性开关
  features: {
    analytics: {
      anonymizeIp: true,
      enabled: true,
      provider: 'google',
      trackingId: process.env.GA_TRACKING_ID || ''
    },
    comments: true,
    darkMode: true,
    newsletter: true,
    search: {
      apiKey: process.env.SEARCH_API_KEY || '',
      enabled: true,
      indexName: 'jank-blog',
      type: 'algolia'
    }
  },

  // 字体配置
  fonts: {
    main: interFont
  },

  language: 'zh-CN',

  // 外部链接集合
  links: {
    discord: 'https://discord.gg/jank',
    docs: 'https://jank.org.cn/docs',
    github: 'https://github.com/Don-0',
    twitter: 'https://twitter.com/jank_blog'
  },

  // 本地化与国际化支持
  localization: {
    defaultLocale: 'zh-CN',
    fallbackLocale: 'en',
    locales: [
      {
        code: 'zh-CN',
        dateFormat: 'YYYY年MM月DD日',
        dir: 'ltr',
        name: '简体中文'
      },
      {
        code: 'en',
        dateFormat: 'MMMM D, YYYY',
        dir: 'ltr',
        name: 'English'
      }
    ]
  },

  // 核心站点标识
  name: 'Jank',

  // 性能优化配置
  performance: {
    cacheStrategy: 'stale-while-revalidate',
    imageOptimization: true,
    lazyLoading: true,
    prefetch: true
  },

  // 安全配置
  security: {
    contentSecurityPolicy: true,
    frameDeny: true,
    xssProtection: true
  },

  // UI/UX配置
  ui: {
    animation: {
      enabled: true,
      reducedMotion: 'auto'
    },
    layout: {
      maxWidth: '1200px',
      navPosition: 'top'
    },
    logo: {
      dark: '/logo-dark.svg',
      light: '/logo-light.svg'
    },
    typography: {
      fontFamily: {
        mono: 'JetBrains Mono, monospace',
        sans: 'Inter, system-ui, sans-serif'
      },
      fontSize: {
        base: '16px'
      }
    }
  },

  url: 'https://jank.org.cn'
}
