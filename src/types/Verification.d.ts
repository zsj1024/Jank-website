declare interface VerificationEmailCodeResponse {
  data: string
  requestId: string
  timeStamp: number
}

declare interface VerificationImgCodeResponse {
  data: {
    imgBase64: string
  }
  requestId: string
  timeStamp: number
}