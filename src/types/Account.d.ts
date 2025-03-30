/** 登录表单数据 */
declare interface LoginFormData {
  email: string;
  password: string;
  img_verification_code: string;
}

/** 注册表单数据 */
declare interface RegisterFormData {
  email: string;
  nickname: string;
  password: string;
  phone?: string;
  email_verification_code: string;
  img_verification_code: string;
}

/** 获取账户数据 */
declare interface GetAccount {
  nickname: string;
  email: string;
  phone: string;
  avatar: string;
}

/** 登陆账号响应field */
declare interface LoginAccountResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
  requestId: string;
  timeStamp: number;
}
