/**
 * 主题系统工具函数
 */
import { ThemeMode } from './themeTypes'

/**
 * 应用主题模式到文档
 *
 * @param theme 主题模式
 */
export const applyTheme = (theme: ThemeMode): void => {
  const root = window.document.documentElement
  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  // 移除所有主题类
  root.classList.remove('light', 'dark')

  // 应用对应主题类
  root.classList.add(isDarkMode ? 'dark' : 'light')

  // 更新主题颜色元标签
  const metaThemeColor = document.querySelector('meta[name="theme-color"]')
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDarkMode ? '#09090b' : '#ffffff')
  }
}
