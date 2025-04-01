'use client'

import { Button } from '@/shared/components/ui/shadcn/button'
import { Form } from '@/shared/components/ui/shadcn/form'
import {
  loginSchema,
  type LoginFormValues
} from '../validators/form-validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Mail, Lock } from 'lucide-react'
import { fetchVerificationCode } from '@/modules/verification/services/verification'
import { useState, useCallback, useEffect } from 'react'
import { FormInput } from './FormInput'
import { VerificationCodeInput } from '../../verification/components/VerificationCodeInput'

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => Promise<void>
  onSwitchToRegister: () => void
}

export function LoginForm({ onSubmit, onSwitchToRegister }: LoginFormProps) {
  const [imgVerificationCode, setImgVerificationCode] = useState('')
  const [verificationCooldown, setVerificationCooldown] = useState(0)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      img_verification_code: ''
    }
  })

  // 获取图形验证码
  const fetchImgVerificationCode = useCallback(
    async (email: string) => {
      if (!email || verificationCooldown > 0) return

      try {
        const response = await fetchVerificationCode(email)
        setImgVerificationCode(response.data.imgBase64)
        setVerificationCooldown(3)
      } catch (error) {
        console.error('获取图形验证码失败', error)
      }
    },
    [verificationCooldown]
  )

  // 倒计时处理
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (verificationCooldown > 0) {
      timer = setTimeout(() => setVerificationCooldown(prev => prev - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [verificationCooldown])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid gap-4'>
          <FormInput
            control={form.control}
            name='email'
            label='邮箱'
            icon={Mail}
          />
          <FormInput
            control={form.control}
            name='password'
            label='密码'
            type='password'
            icon={Lock}
          />
          <VerificationCodeInput
            control={form.control}
            name='img_verification_code'
            label='图形验证码'
            type='image'
            imgCode={imgVerificationCode}
            cooldown={verificationCooldown}
            onFetchCode={() => {
              const email = form.getValues('email')
              if (email) fetchImgVerificationCode(email)
            }}
          />
        </div>

        <Button type='submit' className='w-full'>
          登录
        </Button>

        <div className='mt-4 text-center text-sm text-muted-foreground'>
          没有账号？{' '}
          <Button
            type='button'
            variant='link'
            className='h-auto p-0 text-sm font-medium'
            onClick={onSwitchToRegister}
          >
            立即注册
          </Button>
        </div>
      </form>
    </Form>
  )
}
