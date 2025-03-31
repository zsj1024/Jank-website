/**
 * 动画系统Provider组件
 *
 * 在React应用的顶层提供动画配置和初始化
 */
'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import { initAnimationSystem } from './animationCore'
import { ANIMATION_PRESETS } from './animationPresets'
import { AnimationOptions } from './animationTypes'

// 定义Provider接受的参数
export interface AnimationProviderProps {
  children: React.ReactNode
  disabled?: boolean
  mode?: 'balanced' | 'fast' | 'performance' | 'progressive' | 'quality'
  options?: AnimationOptions
}

// 创建上下文
type AnimationContextType = {
  options: AnimationOptions
}

const AnimationContext = createContext<AnimationContextType>({
  options: ANIMATION_PRESETS.balanced
})

/**
 * 使用动画上下文的hook
 *
 * @returns 动画系统配置选项
 */
export const useAnimationContext = () => useContext(AnimationContext)

/**
 * 动画系统Provider组件
 * 在应用顶层提供动画配置，并初始化动画系统
 *
 * @param props - Provider组件参数
 * @returns Provider包装的React节点
 */
export function AnimationProvider({
  children,
  disabled = false,
  mode = 'balanced',
  options = {}
}: AnimationProviderProps) {
  const initializedRef = useRef(false)
  const [mounted, setMounted] = useState(false)

  // 合并预设和自定义选项
  const presetOptions = ANIMATION_PRESETS[mode] || ANIMATION_PRESETS.balanced
  const mergedOptions = {
    ...presetOptions,
    ...options,
    disabled
  }

  // 动画控制函数
  const disableAnimations = () => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('reduce-motion')
    }
  }

  const enableAnimations = () => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('reduce-motion')
    }
  }

  // 初始化动画系统
  useEffect(() => {
    if (mounted) {
      const cleanup = initAnimationSystem(mergedOptions)

      // 清理函数
      return () => {
        cleanup()
      }
    }
  }, [mergedOptions, mounted])

  // 检测用户偏好和设备性能
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (initializedRef.current) return

    initializedRef.current = true
    setMounted(true)

    // 检测减少动画偏好和低端设备
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const isLowEndDevice =
      !window.matchMedia('(min-width: 768px)').matches ||
      navigator.hardwareConcurrency <= 4 ||
      !!navigator.userAgent.match(/android|mobile/i)

    // 根据检测结果禁用动画
    if (prefersReducedMotion || isLowEndDevice || disabled) {
      disableAnimations()
    }

    // 处理偏好变化
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        disableAnimations()
      } else if (!disabled && !isLowEndDevice) {
        enableAnimations()
      }
    }

    // 兼容不同浏览器的事件API
    if (typeof reducedMotionQuery.addEventListener === 'function') {
      reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
    } else {
      // @ts-ignore - 兼容旧版浏览器
      reducedMotionQuery.addListener(handleReducedMotionChange)
    }

    return () => {
      if (typeof reducedMotionQuery.removeEventListener === 'function') {
        reducedMotionQuery.removeEventListener(
          'change',
          handleReducedMotionChange
        )
      } else {
        // @ts-ignore - 兼容旧版浏览器
        reducedMotionQuery.removeListener(handleReducedMotionChange)
      }

      // 清理动画资源
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('animation-cleanup'))
      }
    }
  }, [disabled])

  // 响应禁用状态变化
  useEffect(() => {
    if (disabled) {
      disableAnimations()
    } else if (initializedRef.current) {
      enableAnimations()
    }
  }, [disabled])

  // 避免客户端渲染时的闪烁
  if (!mounted) {
    return <>{children}</>
  }

  // 提供上下文值
  return (
    <AnimationContext.Provider value={{ options: mergedOptions }}>
      {children}
    </AnimationContext.Provider>
  )
}
