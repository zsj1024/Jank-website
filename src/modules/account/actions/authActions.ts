'use server'

import * as authService from '../services/authService'
import {
  ActionResponse,
  GetAccount,
  LoginAccountResponse,
  RegisterAccountResponse
} from '../types/Account'
import {
  LoginFormValues,
  RegisterFormValues,
  ResetPasswordFormValues
} from '../validators/form-validators'

/**
 * 认证相关的服务端操作
 * 处理表单提交和服务端逻辑
 */

/**
 * 获取账户信息操作
 */
export async function getAccountInfoAction(
  email: string
): Promise<ActionResponse<GetAccount>> {
  try {
    const response = await authService.getAccountInfo(email)
    return handleActionSuccess(response, '获取账户信息成功')
  } catch (error) {
    return handleActionError(error, '获取账户信息失败')
  }
}

/**
 * 登录操作
 */
export async function loginAction(
  data: LoginFormValues
): Promise<ActionResponse<LoginAccountResponse['data']>> {
  try {
    const response = await authService.loginUser(data)
    return handleActionSuccess(response, '登录成功')
  } catch (error) {
    return handleActionError(error, '登录失败')
  }
}

/**
 * 注册操作
 */
export async function registerAction(
  data: RegisterFormValues
): Promise<ActionResponse<RegisterAccountResponse['data']>> {
  try {
    const response = await authService.registerUser(data)
    return handleActionSuccess(response, '注册成功')
  } catch (error) {
    return handleActionError(error, '注册失败')
  }
}

/**
 * 重置密码操作
 */
export async function resetPasswordAction(
  data: ResetPasswordFormValues
): Promise<ActionResponse<{ success: boolean }>> {
  try {
    const response = await authService.resetUserPassword(data)
    return handleActionSuccess(response, '密码重置成功')
  } catch (error) {
    return handleActionError(error, '密码重置失败')
  }
}

/**
 * 通用错误处理函数
 */
function handleActionError(
  error: unknown,
  defaultMessage: string
): ActionResponse {
  console.error(`${defaultMessage}操作错误:`, error)
  return {
    code: 500,
    error: error instanceof Error ? error.message : defaultMessage,
    msg: defaultMessage,
    success: false
  }
}

/**
 * 通用成功响应处理函数
 */
function handleActionSuccess<T>(
  response: HttpResponse<T>,
  defaultMessage: string
): ActionResponse<T> {
  return {
    code: response.code ?? 0,
    data: response.data,
    msg: response.msg || defaultMessage,
    success: true
  }
}
