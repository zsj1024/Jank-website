/**
 * 主题切换按钮组件
 *
 * 提供用于切换明暗主题的UI组件
 */
'use client'

import { useTheme } from './themeContext'
import { ThemeToggleProps } from './themeTypes'

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
  const { isDark, setTheme } = useTheme()

  // 计算按钮大小样式
  const sizeClasses = {
    lg: 'h-12 px-4',
    md: 'h-10 px-3',
    sm: 'h-8 px-2'
  }

  // 切换主题
  const toggleTheme = (): void => {
    setTheme(isDark ? 'light' : 'dark')
  }

  // 默认图标
  const defaultLightIcon = (
    <svg
      className='w-5 h-5'
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
      className='w-5 h-5'
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

  return (
    <button
      aria-label={`切换到${isDark ? '亮色' : '暗色'}模式`}
      className={`flex items-center justify-center rounded-md transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${sizeClasses[size]} ${className}`}
      onClick={toggleTheme}
      type='button'
    >
      {isDark ? lightIcon || defaultLightIcon : darkIcon || defaultDarkIcon}

      {showLabel && (
        <span className='ml-2'>{isDark ? '亮色模式' : '暗色模式'}</span>
      )}
    </button>
  )
}
