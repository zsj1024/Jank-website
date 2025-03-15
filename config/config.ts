// 网站基本配置
export const config = {
  // 网站基本信息
  site: {
    title: 'Jank Blog',
    description: '一个简约而不简单的博客平台',
    url: 'https://fenderisfine.icu',
    author: 'Fender',
    logo: '/favicon.svg',
  },
  
  // API配置
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
  },
  
  // 分页配置
  pagination: {
    defaultPageSize: 5,
  },
  
  // 主题配置
  theme: {
    defaultTheme: 'dark', // 'light', 'dark', 'system'
  }
};