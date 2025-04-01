/**
 * 主题切换按钮组件
 *
 * 提供用于切换明暗主题的UI组件
 */
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { ThemeToggleProps } from './themeTypes'

// 基本样式
const baseButtonStyles =
  'flex items-center justify-center transition-colors hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0'
const iconWrapperStyles = 'h-5 w-5'

/**
 * 主题切换按钮组件
 */
export function ThemeToggle({
  className = '',
  darkIcon,
  lightIcon,
  showLabel = false,
  size = 'md'
}: ThemeToggleProps) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // 计算按钮大小样式
  const sizeClasses = {
    lg: 'h-12 px-4',
    md: 'h-9 w-9 p-0',
    sm: 'h-8 px-2'
  }

  // 默认图标
  const defaultLightIcon = (
    <svg
      className={iconWrapperStyles}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z' />
    </svg>
  )

  const defaultDarkIcon = (
    <svg
      className={iconWrapperStyles}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
    </svg>
  )

  if (!mounted) {
    return (
      <button
        aria-label='切换主题'
        className={`${baseButtonStyles} ${sizeClasses[size]} ${className}`}
        type='button'
      >
        <div className={`${iconWrapperStyles} bg-transparent`} />
        {showLabel && <span className='ml-2 opacity-0'>加载中</span>}
      </button>
    )
  }

  return (
    <button
      aria-label='切换主题'
      className={`${baseButtonStyles} ${sizeClasses[size]} ${className}`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      suppressHydrationWarning
      type='button'
    >
      <div className={iconWrapperStyles}>
        {theme === 'dark'
          ? lightIcon || defaultLightIcon
          : darkIcon || defaultDarkIcon}
      </div>

      {showLabel && (
        <span className='ml-2' suppressHydrationWarning>
          {theme === 'dark' ? '亮色模式' : '暗色模式'}
        </span>
      )}
    </button>
  )
}
