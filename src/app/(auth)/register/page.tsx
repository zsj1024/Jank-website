'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/shadcn/card'
import { RegisterForm } from '@/modules/account/components/RegisterForm'
import { useAuth } from '@/modules/account/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const { handleRegister } = useAuth()
  const router = useRouter()

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-muted/30 p-4 sm:p-6 md:p-10'>
      <div className='w-full max-w-sm sm:max-w-md'>
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>创建账号</CardTitle>
            <CardDescription className='text-sm text-muted-foreground'>
              请填写以下信息完成注册
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm
              onSubmit={handleRegister}
              onSwitchToLogin={() => router.push('/login')}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
