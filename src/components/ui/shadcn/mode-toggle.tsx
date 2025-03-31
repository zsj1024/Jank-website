'use client'

import { Button } from '@/components/ui/shadcn/button'
import { useTheme } from '@/components/ui/shadcn/theme-provider'
import { Moon, Sun } from 'lucide-react'

function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      className='shadow-none rounded-full h-9 w-9 text-foreground/80 hover:text-foreground transition-colors hover:bg-transparent'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      size='icon'
      variant='ghost'
    >
      <Moon
        className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${
          theme === 'dark' ? 'hidden' : ''
        }`}
      />
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          theme === 'dark' ? '' : 'hidden'
        }`}
      />
      <span className='sr-only'>切换主题</span>
    </Button>
  )
}

export { ModeToggle }
