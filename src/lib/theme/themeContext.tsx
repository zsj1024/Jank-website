/**
 * 主题上下文
 *
 * 定义和导出主题上下文及相关钩子
 */
'use client'

import { createContext, useContext } from 'react'

import { ThemeContextType } from './themeTypes'

/**
 * 主题上下文
 * 默认值会在提供者中被覆盖
 */
const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  isLight: true,
  setTheme: () => null,
  theme: 'system'
})

/**
 * 使用主题钩子
 * 在组件中访问和控制主题
 */
export const useTheme = () => useContext(ThemeContext)

export { ThemeContext }
