/**
 * Tailwind CSS配置文件
 *
 * 定义项目中Tailwind CSS的自定义设置、主题和插件
 * 包括颜色方案、字体、动画和组件样式等
 */
import type { Config } from 'tailwindcss'

// 引入插件
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  darkMode: 'class',

  plugins: [typography, animate],

  // 主题配置
  theme: {
    extend: {
      /**
       * 自定义动画定义
       * 可在className中直接使用，如：animate-fadeIn
       */
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out', // 淡入动画
        slideIn: 'slideIn 0.4s ease-out' // 滑入动画
      },

      /**
       * 圆角半径变量
       * 使用CSS变量实现主题一致性
       */
      borderRadius: {
        lg: 'var(--radius, 0.5rem)', // 大圆角
        md: 'calc(var(--radius, 0.5rem) - 2px)', // 中等圆角
        sm: 'calc(var(--radius, 0.5rem) - 4px)', // 小圆角
        xl: 'calc(var(--radius, 0.5rem) + 4px)' // 特大圆角
      },

      /**
       * 颜色系统
       * 基于CSS变量实现，支持主题切换
       */
      colors: {
        // 强调色
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        // 背景色
        background: 'var(--background)',
        // 边框色
        border: 'var(--border)',
        // 卡片组件色
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        // 危险操作色
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        // 前景色（文本）
        foreground: 'var(--foreground)',
        // 信息提示色
        info: {
          DEFAULT: 'var(--info)',
          foreground: 'var(--info-foreground)'
        },
        // 输入框色
        input: 'var(--input)',
        // 静音/次要色
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        // 弹出层色
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        // 主要色
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        // 环/轮廓色
        ring: 'var(--ring)',
        // 次要色
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        // 成功提示色
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)'
        },
        // 警告提示色
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)'
        }
      },

      /**
       * 字体系列
       * 使用CSS变量定义，支持主题自定义
       */
      fontFamily: {
        // 等宽字体，适用于代码展示
        mono: [
          'var(--font-family-mono, ui-monospace, SFMono-Regular, monospace)'
        ],
        // 无衬线字体，用于界面元素
        sans: ['var(--font-family-sans, ui-sans-serif, system-ui, sans-serif)'],
        // 衬线字体，用于特殊排版
        serif: ['var(--font-family-serif, ui-serif, Georgia, serif)']
      },

      /**
       * 关键帧动画定义
       * 配合animation使用
       */
      keyframes: {
        // 淡入动画关键帧
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        // 滑入动画关键帧
        slideIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  }
}

export default config
