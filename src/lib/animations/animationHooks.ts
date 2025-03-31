/**
 * 动画系统React Hooks
 *
 * 提供React组件中使用的动画钩子函数
 */
import * as React from 'react'

import {
  animateElement,
  batchProcessAnimations,
  cleanupResources
} from './animationCore'
import { AnimationOptions } from './animationTypes'

/**
 * React动画Hook
 *
 * @param options - 动画系统配置选项
 * @returns 包含animateElement方法的对象，可用于手动触发动画
 */
export function useAnimationSystem(options: AnimationOptions = {}) {
  const animationTimers = React.useRef<
    Map<string, null | ReturnType<typeof setTimeout>>
  >(new Map())
  const resizeObserver = React.useRef<null | ResizeObserver>(null)
  const mutationObserver = React.useRef<MutationObserver | null>(null)
  const elementsBeingObserved = React.useRef<Set<Element>>(new Set())
  const intersectionObserver = React.useRef<IntersectionObserver | null>(null)

  const isDisabled = options.disabled === true

  React.useEffect(() => {
    if (isDisabled) {
      return
    }

    // 设置交叉观察器，用于检测元素进入视口
    intersectionObserver.current = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          // 当元素进入视口时处理动画
          if (e.isIntersecting) {
            animateElement(e.target as HTMLElement, options)
          }
        })
      },
      {
        // 使用配置选项
        rootMargin: options.rootMargin,
        threshold: options.threshold
      }
    )

    // 设置DOM变化观察器，用于检测新添加的元素
    mutationObserver.current = new MutationObserver(mutations => {
      mutations.forEach(() => {
        batchProcessAnimations(options)
      })
    })

    // 开始观察现有的带有data-animate属性的元素
    document.querySelectorAll('[data-animate]').forEach(el => {
      if (
        intersectionObserver.current &&
        !elementsBeingObserved.current.has(el)
      ) {
        intersectionObserver.current.observe(el)
        elementsBeingObserved.current.add(el)
      }
    })

    // 观察DOM变化
    mutationObserver.current.observe(document.body, {
      attributeFilter: ['data-animate'],
      attributes: true,
      childList: true,
      subtree: true
    })

    return () => {
      cleanupResources(
        intersectionObserver.current,
        mutationObserver.current,
        resizeObserver.current,
        animationTimers.current
      )
      elementsBeingObserved.current.clear()
    }
  }, [options, isDisabled])

  return {
    animateElement: (element: HTMLElement) => animateElement(element, options)
  }
}
