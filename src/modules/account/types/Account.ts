/** 获取账户数据 */
export interface GetAccount {
    avatar: string
    email: string
    nickname: string
    phone: string
}

/** 登陆账号响应 */
export interface LoginAccountResponse {
    data: {
        access_token: string
        refresh_token: string
    }
    requestId: string
    timeStamp: number
}

/** 登录表单数据 */
export interface LoginFormData {
    email: string
    img_verification_code: string
    password: string
}

/** 注册账号响应 */
export interface RegisterAccountResponse {
    data: {
        email: string
        nickname: string
    }
    requestId: string
    timeStamp: number
}

/** 注册表单数据 */
export interface RegisterFormData {
    email: string
    email_verification_code: string
    img_verification_code: string
    nickname: string
    password: string
    phone?: string
}