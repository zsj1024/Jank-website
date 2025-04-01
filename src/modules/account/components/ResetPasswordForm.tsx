'use client'

import { Button } from '@/shared/components/ui/shadcn/button'
import { Form } from '@/shared/components/ui/shadcn/form'
import {
  resetPasswordSchema,
  type ResetPasswordFormValues
} from '../validators/form-validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Mail, Lock } from 'lucide-react'
import { sendVerificationCode } from '@/modules/verification/services/verification'
import { useState, useCallback, useEffect } from 'react'
import { FormInput } from './FormInput'
import { VerificationCodeInput } from '../../verification/components/VerificationCodeInput'

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormValues) => Promise<void>
  onSwitchToLogin: () => void
}

export function ResetPasswordForm({
  onSubmit,
  onSwitchToLogin
}: ResetPasswordFormProps) {
  const [countdown, setCountdown] = useState(0)
  const [emailCodeSending, setEmailCodeSending] = useState(false)

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      new_password: '',
      again_new_password: '',
      email_verification_code: ''
    }
  })

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
            name='email'
            label='邮箱'
            icon={Mail}
          />
          <FormInput
            control={form.control}
            name='new_password'
            label='新密码'
            type='password'
            icon={Lock}
          />
          <FormInput
            control={form.control}
            name='again_new_password'
            label='确认新密码'
            type='password'
            icon={Lock}
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
          重置密码
        </Button>

        <div className='mt-4 text-center text-sm text-muted-foreground'>
          记起密码了？{' '}
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
