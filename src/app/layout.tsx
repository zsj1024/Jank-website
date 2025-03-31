import '@/styles/globals.css'
import { MainFooter } from '@/components/layout/Footer'
import { siteConfig } from '@/config/site.config'
import { createMetadata, OptimizedResources } from '@/lib/seo'
import { Providers } from '@/providers'

export const metadata = createMetadata({
  description: siteConfig.description
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={siteConfig.language} suppressHydrationWarning>
      <head>
        <OptimizedResources />
      </head>
      <body className={`antialiased ${siteConfig.fonts?.main.className || ''}`}>
        <Providers>
          <div className='flex flex-col min-h-screen md:px-[12.6%]'>
            <main className='flex-1'>{children}</main>
            <MainFooter />
          </div>
        </Providers>
      </body>
    </html>
  )
}
