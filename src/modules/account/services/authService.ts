import { http } from '@/shared/lib/api'

import type { UserInfo } from '../store/authStore'

import {
  LoginFormValues,
  RegisterFormValues,
  ResetPasswordFormValues
} from '../validators/form-validators'

/**
 * 账户认证服务
 * 负责所有直接的API通信
 */

/**
 * 邮箱密码登录
 */
export const loginUser = (
  data: LoginFormValues
): Promise<
  HttpResponse<{
    access_token: string
    refresh_token: string
    userInfo: UserInfo
  }>
> => {
  return http.post('/v1/account/loginAccount', data)
}

/**
 * 注册新账户
 */
export const registerUser = (
  data: RegisterFormValues
): Promise<
  HttpResponse<{
    email: string
    nickname: string
  }>
> => {
  return http.post('/v1/account/registerAccount', data)
}

/**
 * 获取账户信息
 */
export const getAccountInfo = (
  email: string
): Promise<
  HttpResponse<{
    avatar: string
    email: string
    nickname: string
    phone: string
  }>
> => {
  return http.post('/v1/account/getAccount', { email })
}

/**
 * 退出登录
 */
export const logoutUser = (): Promise<HttpResponse<null>> => {
  return http.post('/v1/account/logoutAccount')
}

/**
 * 重置用户密码
 */
export const resetUserPassword = (
  data: ResetPasswordFormValues
): Promise<
  HttpResponse<{
    success: boolean
  }>
> => {
  return http.post('/v1/account/resetPassword', data)
}
