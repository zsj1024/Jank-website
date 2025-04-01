'use client'

import { useState } from 'react'
import { LoginFormValues, RegisterFormValues, ResetPasswordFormValues } from '../validators/form-validators'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuthStore } from '../store/authStore'
import { loginAction, registerAction, resetPasswordAction } from '../actions/authActions'

/**
 * 身份认证钩子
 * 抽象组件级别的认证状态管理
 */
export function useAuth() {
    const router = useRouter()
    const { login, logout } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    /**
     * 处理登录
     */
    const handleLogin = async (data: LoginFormValues) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await loginAction(data)

            if (result.success && result.data) {
                login(
                    result.data.access_token,
                    result.data.refresh_token,
                    result.data.userInfo
                )
                toast.success(result.msg || '登录成功')
                router.push('/dashboard')
                return true
            } else {
                const errorMsg = result.msg || result.error || '登录失败'
                setError(errorMsg)
                toast.error(errorMsg)
                return false
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : '登录失败，请重试'
            setError(message)
            toast.error(message)
            console.error('登录错误:', error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * 处理注册
     */
    const handleRegister = async (data: RegisterFormValues) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await registerAction(data)

            if (result.success) {
                toast.success(result.msg || '注册成功，请登录')
                router.push('/login')
                return true
            } else {
                const errorMsg = result.msg || result.error || '注册失败'
                setError(errorMsg)
                toast.error(errorMsg)
                return false
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : '注册失败，请重试'
            setError(message)
            toast.error(message)
            console.error('注册错误:', error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * 处理退出登录
     */
    const handleLogout = () => {
        logout()
        toast.success('退出成功')
        router.push('/login')
    }

    /**
     * 处理重置密码
     */
    const handleResetPassword = async (data: ResetPasswordFormValues) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await resetPasswordAction(data)

            if (result.success) {
                toast.success(result.msg || '密码重置成功，请重新登录')
                router.push('/login')
                return true
            } else {
                const errorMsg = result.msg || result.error || '密码重置失败'
                setError(errorMsg)
                toast.error(errorMsg)
                return false
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : '密码重置失败，请重试'
            setError(message)
            toast.error(message)
            console.error('重置密码错误:', error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    return {
        handleLogin,
        handleRegister,
        handleLogout,
        handleResetPassword,
        isLoading,
        error
    }
} 