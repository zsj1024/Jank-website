'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GetAccount } from '../types/Account'

/**
 * 用户信息接口
 */
export type UserInfo = GetAccount

/**
 * 认证状态接口
 */
interface AuthStoreState {
  // 状态属性
  accessToken: string | null
  refreshToken: string | null
  userInfo: UserInfo | null
  isAuthenticated: boolean

  // 操作方法
  login: (
    accessToken: string,
    refreshToken: string,
    userInfo: UserInfo
  ) => void
  logout: () => void
  updateUserInfo: (userInfo: Partial<UserInfo>) => void
  updateTokens: (accessToken: string, refreshToken: string) => void
}

/**
 * 认证状态存储
 * 使用Zustand管理全局状态
 * 在localStorage中持久化用户会话
 */
export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      userInfo: null,
      isAuthenticated: false,

      login: (accessToken, refreshToken, userInfo) =>
        set({
          accessToken,
          refreshToken,
          userInfo,
          isAuthenticated: true
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          userInfo: null,
          isAuthenticated: false
        }),

      updateUserInfo: (partialUserInfo) =>
        set((state) => ({
          userInfo: state.userInfo
            ? { ...state.userInfo, ...partialUserInfo }
            : null
        })),

      updateTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
    }),
    {
      name: 'auth-storage'
    }
  )
)
