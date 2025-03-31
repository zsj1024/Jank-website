'use client'

import { siteConfig } from '@/config/site.config'
import { AnimationProvider } from '@/lib/animations'
import { ThemeMode, ThemeProvider } from '@/lib/theme'
import React from 'react'

/**
 * 全局提供器组件 - 集中管理应用的上下文提供器
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme={siteConfig.defaultTheme as ThemeMode}>
      <AnimationProvider mode='performance'>{children}</AnimationProvider>
    </ThemeProvider>
  )
}
