'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserInfo {
  avatar: string
  email: string
  id: string
  nickname: string
  role: string
  username: string
}

interface AuthState {
  accessToken: null | string
  isAuthenticated: boolean
  login: (accessToken: string, refreshToken: string, userInfo: UserInfo) => void
  logout: () => void
  refreshToken: null | string
  updateUserInfo: (userInfo: Partial<UserInfo>) => void
  userInfo: null | UserInfo
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      isAuthenticated: false,
      login: (accessToken, refreshToken, userInfo) =>
        set({ accessToken, isAuthenticated: true, refreshToken, userInfo }),
      logout: () =>
        set({
          accessToken: null,
          isAuthenticated: false,
          refreshToken: null,
          userInfo: null
        }),
      refreshToken: null,
      updateUserInfo: partialUserInfo =>
        set(state => ({
          userInfo: state.userInfo
            ? { ...state.userInfo, ...partialUserInfo }
            : null
        })),
      userInfo: null
    }),
    {
      name: 'auth-storage'
    }
  )
)
