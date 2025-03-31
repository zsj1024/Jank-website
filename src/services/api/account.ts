import { http } from '@/lib/axios'

/** 账号密码登录 */
export const loginAccount = (data: {
  email: string
  img_verification_code: string
  password: string
}): Promise<HttpResponse<any>> => http.post('/v1/account/loginAccount', data)

/** 注册账号 */
export const registerAccount = (data: {
  email: string
  email_verification_code: string
  img_verification_code: string
  nickname: string
  password: string
  phone?: string
}): Promise<HttpResponse<any>> => http.post('/v1/account/registerAccount', data)

/** 获取账号信息 */
export const getAccount = (email: string): Promise<HttpResponse<any>> =>
  http.post('/v1/account/getAccount', { email })

/** 账号退出 */
export const logoutAccount = (): Promise<HttpResponse<null>> =>
  http.post('/v1/account/logoutAccount')

/** 重置密码 */
export const resetPassword = (data: {
  again_new_password: string
  email: string
  email_verification_code: string
  new_password: string
}): Promise<HttpResponse<any>> => http.post('/v1/account/resetPassword', data)
