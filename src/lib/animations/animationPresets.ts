/**
 * 动画系统预设配置
 *
 * 提供常用动画系统配置预设，方便快速使用
 */
import { AnimationOptions } from './animationTypes'

/**
 * 性能预设配置
 */
export const ANIMATION_PRESETS: Record<string, AnimationOptions> = {
  // 平衡: 均衡性能和效果
  balanced: {
    baseDelayMs: 20,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.05
  },
  // 快速: 轻量级
  fast: {
    baseDelayMs: 10,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.03
  },
  // 极致性能: 最小延迟
  performance: {
    baseDelayMs: 0,
    rootMargin: '0px',
    threshold: 0.01
  },
  // 渐进: 丰富视觉效果
  progressive: {
    baseDelayMs: 30,
    rootMargin: '0px 0px 0% 0px',
    threshold: 0.1
  }
}
