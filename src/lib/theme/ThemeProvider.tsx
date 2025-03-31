/**
 * 主题提供者组件
 *
 * 管理应用的主题状态并确保在不同页面间保持一致
 */
'use client'

import { siteConfig } from '@/config/site.config'
import { useEffect, useState } from 'react'

import { ThemeContext } from './themeContext'
import { ThemeContextType, ThemeMode, ThemeProviderProps } from './themeTypes'
import { applyTheme } from './themeUtils'

/**
 * 主题提供者组件
 * 管理应用的主题状态并确保在不同页面间保持一致
 */
export function ThemeProvider({
  children,
  defaultTheme = (siteConfig.defaultTheme as ThemeMode) || 'system',
  storageKey = 'ui-theme'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme)
  const [mounted, setMounted] = useState<boolean>(false)

  // 初始化主题
  useEffect(() => {
    // 从本地存储获取保存的主题
    const savedTheme = localStorage.getItem(storageKey) as null | ThemeMode
    const initialTheme = savedTheme || defaultTheme

    setThemeState(initialTheme)
    applyTheme(initialTheme)
    setMounted(true)
  }, [defaultTheme, storageKey])

  // 设置主题并保存到本地存储
  const setTheme = (newTheme: ThemeMode): void => {
    localStorage.setItem(storageKey, newTheme)
    setThemeState(newTheme)
    applyTheme(newTheme)
  }

  // 监听系统主题变化
  useEffect(() => {
    if (!mounted) return

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (): void => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [theme, mounted])

  // 计算实际的主题状态
  const isSystemDark =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  const isDark = theme === 'dark' || (theme === 'system' && isSystemDark)
  const isLight = !isDark

  // 创建上下文值
  const contextValue: ThemeContextType = {
    isDark,
    isLight,
    setTheme,
    theme
  }

  // 避免客户端渲染时的闪烁
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
