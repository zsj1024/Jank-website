'use server'

import { LoginFormValues, RegisterFormValues, ResetPasswordFormValues } from '../validators/form-validators'
import * as authService from '../services/authService'

/**
 * 认证相关的服务端操作
 * 处理表单提交和服务端逻辑
 */

/**
 * 登录操作
 */
export async function loginAction(data: LoginFormValues) {
    try {
        const response = await authService.loginUser(data)
        return {
            success: true,
            data: response.data,
            code: response.code,
            msg: response.msg || '登录成功'
        }
    } catch (error) {
        console.error('登录操作错误:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : '登录失败',
            msg: '登录失败',
            code: 500
        }
    }
}

/**
 * 注册操作
 */
export async function registerAction(data: RegisterFormValues) {
    try {
        const response = await authService.registerUser(data)

        return {
            success: true,
            data: response.data,
            code: response.code,
            msg: response.msg || '注册成功'
        }
    } catch (error) {
        console.error('注册操作错误:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : '注册失败',
            msg: '注册失败',
            code: 500
        }
    }
}

/**
 * 重置密码操作
 */
export async function resetPasswordAction(data: ResetPasswordFormValues) {
    try {
        const response = await authService.resetUserPassword(data)
        return {
            success: true,
            data: response.data,
            code: response.code,
            msg: response.msg || '密码重置成功'
        }
    } catch (error) {
        console.error('重置密码操作错误:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : '密码重置失败',
            msg: '密码重置失败',
            code: 500
        }
    }
} 