/**
 * 主题系统类型定义
 */
import React from 'react'

/**
 * 主题上下文接口
 */
export interface ThemeContextType {
  /** 是否为暗色模式 */
  isDark: boolean
  /** 是否为亮色模式 */
  isLight: boolean
  /** 设置主题的函数 */
  setTheme: (theme: ThemeMode) => void
  /** 当前主题模式 */

  theme: ThemeMode
}

/**
 * 主题类型
 * 支持亮色、暗色和系统默认三种模式
 */
export type ThemeMode = 'dark' | 'light' | 'system'

/**
 * 主题提供者属性
 */
export interface ThemeProviderProps {
  /** 子元素 */
  children: React.ReactNode
  /** 默认主题模式 */
  defaultTheme?: ThemeMode
  /** 本地存储键名 */
  storageKey?: string
}

/**
 * 主题切换按钮属性
 */
export interface ThemeToggleProps {
  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义暗色模式图标
   */
  darkIcon?: React.ReactNode

  /**
   * 自定义亮色模式图标
   */
  lightIcon?: React.ReactNode

  /**
   * 是否显示文字标签
   */
  showLabel?: boolean

  /**
   * 按钮大小
   */
  size?: 'lg' | 'md' | 'sm'
}
