import http from "@/lib/axios";

/** 获取图形验证码 */
export const fetchVerificationCode = (
  email: string
): Promise<VerificationImgCodeResponse> =>
  http.get(`/v1/verification/sendImgVerificationCode?email=${email}`);

/** 发送邮箱验证码 */
export const sendVerificationCode = (
  email: string
): Promise<VerificationEmailCodeResponse> =>
  http.get(`/v1/verification/sendEmailVerificationCode?email=${email}`);
