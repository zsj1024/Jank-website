/**
 * 工具函数集合
 */

import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并className的工具函数
 * 结合clsx和tailwind-merge，处理类名冲突
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
