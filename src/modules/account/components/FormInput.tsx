'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/ui/shadcn/form'
import { Input } from '@/shared/components/ui/shadcn/input'
import { LucideIcon } from 'lucide-react'
import { Control } from 'react-hook-form'

interface FormInputProps {
  control: Control<any>
  name: string
  label: string
  type?: string
  placeholder?: string
  icon: LucideIcon
  optional?: boolean
}

export function FormInput({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  optional = false
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm sm:text-base font-medium'>
            {label}
            {optional && (
              <span className='ml-1 text-muted-foreground/70 text-xs sm:text-sm'>
                (选填)
              </span>
            )}
          </FormLabel>
          <FormControl>
            <div className='relative'>
              <Icon className='absolute left-2 sm:left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground/70' />
              <Input
                type={type}
                placeholder={placeholder || `请输入${label}`}
                className='pl-7 sm:pl-10 text-sm sm:text-base h-9 sm:h-11 placeholder:text-muted-foreground/60 placeholder:text-xs sm:placeholder:text-sm'
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage className='text-xs sm:text-sm' />
        </FormItem>
      )}
    />
  )
}
