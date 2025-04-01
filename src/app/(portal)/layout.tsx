import { Navbar } from '@/shared/components/custom/Navbar'
import { ReactNode } from 'react'

interface PortalLayoutProps {
  children: ReactNode
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <>
      <Navbar />
      <main className='flex-1 py-8'>{children}</main>
    </>
  )
}
