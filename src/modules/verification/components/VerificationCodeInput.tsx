'use client'

import { Button } from '@/shared/components/ui/shadcn/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/ui/shadcn/form'
import { Input } from '@/shared/components/ui/shadcn/input'
import { Shield, Key } from 'lucide-react'
import Image from 'next/image'
import { Control } from 'react-hook-form'

interface VerificationCodeInputProps {
  control: Control<any>
  name: string
  label: string
  type: 'image' | 'email'
  imgCode?: string
  cooldown?: number
  countdown?: number
  isSending?: boolean
  onFetchCode?: () => void
  onSendCode?: () => void
}

export function VerificationCodeInput({
  control,
  name,
  label,
  type,
  imgCode,
  cooldown = 0,
  countdown = 0,
  isSending = false,
  onFetchCode,
  onSendCode
}: VerificationCodeInputProps) {
  const Icon = type === 'image' ? Shield : Key

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm sm:text-base font-medium'>
            {label}
          </FormLabel>
          <div className='flex gap-1 sm:gap-2'>
            <FormControl>
              <div className='relative flex-1'>
                <Icon className='absolute left-2 sm:left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground/70' />
                <Input
                  placeholder={`请输入${type === 'image' ? '图形' : '邮箱'}验证码`}
                  className='pl-7 sm:pl-10 text-sm sm:text-base h-9 sm:h-11 placeholder:text-muted-foreground/60 placeholder:text-xs sm:placeholder:text-sm'
                  {...field}
                />
              </div>
            </FormControl>
            {type === 'image' ? (
              <div
                className='w-24 sm:w-28 h-9 sm:h-11 overflow-hidden flex-shrink-0 cursor-pointer'
                onClick={onFetchCode}
              >
                {imgCode ? (
                  <Image
                    src={imgCode}
                    alt='验证码'
                    width={112}
                    height={44}
                    className='w-full h-full object-cover'
                    unoptimized
                  />
                ) : (
                  <Button
                    type='button'
                    variant='outline'
                    className='w-full h-full text-xs sm:text-sm text-muted-foreground/80'
                    disabled={cooldown > 0}
                  >
                    {cooldown > 0 ? `${cooldown}s` : '获取验证码'}
                  </Button>
                )}
              </div>
            ) : (
              <Button
                type='button'
                variant='outline'
                className='w-24 sm:w-28 h-9 sm:h-11 flex-shrink-0 text-xs sm:text-sm px-1 sm:px-2 text-muted-foreground/80'
                disabled={isSending || countdown > 0}
                onClick={onSendCode}
              >
                {countdown > 0 ? `${countdown}s` : '发送验证码'}
              </Button>
            )}
          </div>
          <FormMessage className='text-xs sm:text-sm' />
        </FormItem>
      )}
    />
  )
}
