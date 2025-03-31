import { Navbar } from '@/components/custom/Navbar'
import { ReactNode } from 'react'

interface FrontendLayoutProps {
  children: ReactNode
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
  return (
    <>
      <Navbar />
      <main className='flex-1 py-8'>{children}</main>
    </>
  )
}
