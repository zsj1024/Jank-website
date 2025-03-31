'use client'

import { AnimationProvider } from '@/providers/AnimationProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import React from 'react'

/**
 * 全局提供器组件 - 集中管理应用的上下文提供器
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AnimationProvider>{children}</AnimationProvider>
    </ThemeProvider>
  )
}
