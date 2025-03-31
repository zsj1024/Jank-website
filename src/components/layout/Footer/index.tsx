import { siteConfig } from '@/config/site.config'
import Link from 'next/link'
import React from 'react'

/**
 * 页脚属性接口
 */
export interface FooterProps {
  /** 自定义类名 */
  className?: string
}

/**
 * 页脚组件
 */
export const MainFooter = React.memo(({ className = '' }: FooterProps) => {
  const currentYear = new Date().getFullYear()
  const beianIcp = siteConfig.beian?.icp

  return (
    <footer className={`py-6 border-t border-border/5 ${className}`}>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col sm:flex-row sm:justify-between items-center'>
          {/* 版权信息 */}
          <p className='text-xs text-muted-foreground/80 mb-2 sm:mb-0'>
            © {currentYear} {siteConfig.name}. 保留所有权利。
          </p>

          {/* 企业备案信息 - 只在有备案号时渲染 */}
          {beianIcp && (
            <Link
              className='text-xs text-muted-foreground/60 hover:text-muted-foreground'
              href='https://beian.miit.gov.cn/'
              rel='noopener noreferrer'
              target='_blank'
            >
              {beianIcp}
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
})

MainFooter.displayName = 'MainFooter'

// 导出别名以保持向后兼容
export const MinimalFooter = MainFooter
export const Footer = MainFooter
export const SimpleFooter = MainFooter
