'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/shadcn/card'
import { LoginForm } from '@/modules/account/components/LoginForm'
import { RegisterForm } from '@/modules/account/components/RegisterForm'
import { useAuth } from '@/modules/account/hooks/useAuth'
import { useState } from 'react'

export default function LoginPage() {
  const { handleLogin, handleRegister } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-muted/30 p-4 sm:p-6 md:p-10'>
      <div className='w-full max-w-sm sm:max-w-md'>
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              {isLogin ? '欢迎回来' : '创建账号'}
            </CardTitle>
            <CardDescription className='text-sm text-muted-foreground'>
              {isLogin
                ? '请输入您的账号信息以登录'
                : '请填写以下信息创建您的账号'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <LoginForm
                onSubmit={handleLogin}
                onSwitchToRegister={() => setIsLogin(false)}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                onSwitchToLogin={() => setIsLogin(true)}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
