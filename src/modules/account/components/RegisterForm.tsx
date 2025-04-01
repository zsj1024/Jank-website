'use client'

import { Button } from '@/shared/components/ui/shadcn/button'
import { Form } from '@/shared/components/ui/shadcn/form'
import {
  registerSchema,
  type RegisterFormValues
} from '../validators/form-validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Mail, Lock, User } from 'lucide-react'
import {
  fetchVerificationCode,
  sendVerificationCode
} from '@/modules/verification/services/verification'
import { useState, useCallback, useEffect } from 'react'
import { FormInput } from './FormInput'
import { VerificationCodeInput } from '../../verification/components/VerificationCodeInput'

interface RegisterFormProps {
  onSubmit: (data: RegisterFormValues) => Promise<void>
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSubmit, onSwitchToLogin }: RegisterFormProps) {
  const [imgVerificationCode, setImgVerificationCode] = useState('')
  const [verificationCooldown, setVerificationCooldown] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [emailCodeSending, setEmailCodeSending] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      again_password: '',
      nickname: '',
      email_verification_code: '',
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

  // 发送邮箱验证码
  const handleSendEmailCode = useCallback(
    async (email: string) => {
      if (!email || emailCodeSending || countdown > 0) return

      setEmailCodeSending(true)
      try {
        await sendVerificationCode(email)
        setCountdown(60)
        alert('验证码已发送，请查收邮箱')
      } catch (error) {
        console.error('发送邮箱验证码失败', error)
        alert('发送验证码失败，请稍后重试')
      } finally {
        setEmailCodeSending(false)
      }
    },
    [emailCodeSending, countdown]
  )

  // 倒计时处理
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (verificationCooldown > 0) {
      timer = setTimeout(() => setVerificationCooldown(prev => prev - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [verificationCooldown])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid gap-4'>
          <FormInput
            control={form.control}
            name='nickname'
            label='昵称'
            icon={User}
          />
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
          <FormInput
            control={form.control}
            name='again_password'
            label='确认密码'
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
          <VerificationCodeInput
            control={form.control}
            name='email_verification_code'
            label='邮箱验证码'
            type='email'
            countdown={countdown}
            isSending={emailCodeSending}
            onSendCode={() => handleSendEmailCode(form.getValues('email'))}
          />
        </div>

        <Button type='submit' className='w-full'>
          注册
        </Button>

        <div className='mt-4 text-center text-sm text-muted-foreground'>
          已有账号？{' '}
          <Button
            type='button'
            variant='link'
            className='h-auto p-0 text-sm font-medium'
            onClick={onSwitchToLogin}
          >
            立即登录
          </Button>
        </div>
      </form>
    </Form>
  )
}
