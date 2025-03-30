import { ThemeProvider } from '@/components/ui/shadcn/theme-provider'
import { Navbar } from '@/components/common/Navbar/Navbar'
import { theme } from '../../config/theme.config'
import './globals.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme='dark' storageKey='jank-ui-theme'>
          <div className='md:px-[12.6%]'>
            <Navbar {...theme.NavbarProps} />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
