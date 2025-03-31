/**
 * 前台导航配置
 */
export const frontendNavigation = {
  footerNav: [
    { icon: 'book-open', key: 'docs', link: '/docs', title: '文档' },
    {
      external: true,
      icon: 'github',
      key: 'github',
      link: 'https://github.com/Done-0',
      title: 'GitHub'
    },
    { icon: 'info', key: 'about', link: '/about', title: '关于' },
    { icon: 'mail', key: 'contact', link: '/contact', title: '联系' },
    { icon: 'shield', key: 'privacy', link: '/privacy', title: '隐私政策' },
    { icon: 'file', key: 'terms', link: '/terms', title: '使用条款' }
  ] as MenuItem[],

  mainNav: [
    {
      icon: 'home',
      key: 'home',
      link: '/',
      title: '首页'
    },
    {
      icon: 'file-text',
      key: 'blog',
      link: '/blog',
      title: '文章'
    },
    {
      icon: 'info',
      key: 'about',
      link: '/about',
      title: '关于'
    },
    {
      icon: 'sponsor',
      key: 'sponsor',
      link: '/docs',
      title: '赞助'
    }
  ] as MenuItem[]
}

/**
 * 后台导航配置
 */
export const consoleNavigation = {
  mainNav: [
    {
      icon: 'layout-dashboard',
      key: 'dashboard',
      link: '/console',
      title: '仪表盘'
    },
    {
      icon: 'file-text',
      key: 'articles',
      link: '/console/articles',
      title: '文章管理'
    },
    {
      icon: 'folder',
      key: 'categories',
      link: '/console/categories',
      title: '分类管理'
    },
    {
      icon: 'tag',
      key: 'tags',
      link: '/console/tags',
      title: '标签管理'
    },
    {
      icon: 'image',
      key: 'media',
      link: '/console/media',
      title: '媒体管理'
    },
    {
      icon: 'message-square',
      key: 'comments',
      link: '/console/comments',
      title: '评论管理'
    },
    {
      icon: 'users',
      key: 'users',
      link: '/console/users',
      title: '用户管理'
    },
    {
      icon: 'settings',
      key: 'settings',
      link: '/console/settings',
      title: '系统设置'
    }
  ] as MenuItem[]
}
