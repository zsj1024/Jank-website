/** 认证状态 */
declare interface AuthState {
    /** 权限令牌：过期时间 2h */
    accessToken: string
    /** 刷新令牌: 过期时间 48h */
    refreshToken: string
    setAuth: (auth: { accessToken: string; refreshToken: string }) => void;
    setUserInfo: (userInfo: Partial<User>) => void;
}