/** 邮箱验证码响应 */
declare interface VerificationEmailCodeResponse {
  data: string
  requestId: string
  timeStamp: number
}

/** 图形验证码响应 */
declare interface VerificationImgCodeResponse {
  data: {
    imgBase64: string
  }
  requestId: string
  timeStamp: number
}