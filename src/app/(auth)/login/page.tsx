'use client'

import { LoginForm } from '@/modules/account/components/LoginForm'
import { RegisterForm } from '@/modules/account/components/RegisterForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/shadcn/card'
import { useState } from 'react'

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false)

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-muted/30 p-4 sm:p-6 md:p-10'>
      <div className='w-full max-w-sm sm:max-w-md'>
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              {isRegistering ? '注册账号' : '登录账号'}
            </CardTitle>
            <CardDescription className='text-sm text-muted-foreground'>
              {isRegistering
                ? '创建一个新账号以开始使用'
                : '输入您的邮箱和密码登录'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isRegistering ? (
              <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
            ) : (
              <LoginForm onSwitchToRegister={() => setIsRegistering(true)} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
