'use client'

import { Icons } from '@/components/ui/Icons'
import { Button } from '@/components/ui/shadcn/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/shadcn/sheet'
import { frontendNavigation } from '@/config/navigation.config'
import { siteConfig } from '@/config/site.config'
import { ThemeToggle } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NavbarProps {
  className?: string
}

// 公共样式
const iconButtonStyles =
  'h-9 w-9 p-0 opacity-70 hover:opacity-100 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-200'
const iconStyles = 'h-5 w-5'
const navLinkStyles = 'transition-colors duration-200'
const linkBaseStyles = 'font-medium'
const linkActiveStyles = 'text-foreground font-semibold'
const linkInactiveStyles =
  'text-foreground/70 hover:text-foreground hover:font-medium'

/**
 * 移动端导航组件
 */
export const MobileNav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button className={iconButtonStyles} size='icon' variant='ghost'>
          <Icons.menu className={iconStyles} />
          <span className='sr-only'>打开菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className='w-[300px] pr-0 border-l border-border'
        side='right'
        style={{
          backdropFilter: 'none !important',
          backgroundColor: mounted
            ? theme === 'dark'
              ? '#09090b'
              : '#ffffff'
            : '#ffffff',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.1) !important',
          opacity: '1 !important',
          WebkitBackdropFilter: 'none !important'
        }}
      >
        <SheetHeader className='mb-6'>
          <SheetTitle className='text-left'>{siteConfig.name}</SheetTitle>
        </SheetHeader>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2 border-b border-border/5 pb-4'>
            <Link
              className={`flex items-center py-2 text-base ${linkBaseStyles} ${linkInactiveStyles}`}
              href='/auth/login'
              onClick={() => setOpen(false)}
            >
              登录
            </Link>
          </div>

          <nav className='flex flex-col gap-2'>
            {frontendNavigation.mainNav.map(item => {
              const isActive = pathname === item.link
              return (
                <Link
                  className={cn(
                    'flex items-center py-2 text-base',
                    linkBaseStyles,
                    navLinkStyles,
                    isActive ? linkActiveStyles : linkInactiveStyles
                  )}
                  href={item.link}
                  key={item.key}
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * 导航栏组件
 */
export const Navbar = ({ className }: NavbarProps) => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-border/5 bg-background/80 backdrop-blur-sm',
        className
      )}
    >
      <div className='md:px-[12.6%]'>
        <div className='flex h-14 items-center justify-between px-4 md:px-6 lg:px-8'>
          {/* 左侧 - Logo和导航 */}
          <div className='flex items-center gap-8'>
            <Link
              className='text-lg font-bold text-foreground hover:text-foreground/90 transition-colors'
              href='/'
            >
              {siteConfig.name}
            </Link>

            <nav className='hidden md:flex gap-8'>
              {frontendNavigation.mainNav.map(item => (
                <Link
                  className={cn(
                    'text-sm',
                    linkBaseStyles,
                    navLinkStyles,
                    pathname === item.link
                      ? linkActiveStyles
                      : linkInactiveStyles
                  )}
                  href={item.link}
                  key={item.key}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* 右侧 - 图标 */}
          <div className='flex items-center gap-4'>
            <div className='hidden md:flex items-center gap-4'>
              <ThemeToggle className={iconButtonStyles} />
              <Link href='/auth/login'>
                <Button
                  className={iconButtonStyles}
                  size='icon'
                  variant='ghost'
                >
                  <Icons.user className={iconStyles} />
                  <span className='sr-only'>登录</span>
                </Button>
              </Link>
            </div>

            <div className='flex md:hidden items-center gap-4'>
              <ThemeToggle className={iconButtonStyles} />
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
