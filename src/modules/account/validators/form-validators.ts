import { z } from 'zod'

/**
 * 登录表单验证模式
 */
export const loginValidator = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  img_verification_code: z.string().min(4, '验证码至少4位'),
  password: z.string().min(6, '密码至少6位')
})

/**
 * 注册表单验证模式
 */
export const registerValidator = z
  .object({
    again_password: z.string().min(6, '密码至少6位'),
    email: z.string().email('请输入有效的邮箱地址'),
    email_verification_code: z.string().min(4, '验证码至少4位'),
    img_verification_code: z.string().min(4, '验证码至少4位'),
    nickname: z.string().min(2, '昵称至少2位'),
    password: z.string().min(6, '密码至少6位')
  })
  .refine(data => data.password === data.again_password, {
    message: '两次输入的密码不一致',
    path: ['again_password']
  })

/**
 * 重置密码表单验证模式
 */
export const resetPasswordValidator = z
  .object({
    again_new_password: z.string().min(6, '密码至少6位'),
    email: z.string().email('请输入有效的邮箱地址'),
    email_verification_code: z.string().min(4, '验证码至少4位'),
    new_password: z.string().min(6, '密码至少6位')
  })
  .refine(data => data.new_password === data.again_new_password, {
    message: '两次输入的密码不一致',
    path: ['again_new_password']
  })

/**
 * 类型声明: 由验证模式推导
 */
export type LoginFormValues = z.infer<typeof loginValidator>
export type RegisterFormValues = z.infer<typeof registerValidator>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordValidator>
