/** 统一响应类型 */
declare interface HttpResponse<T> {
  data: T;
  code?: number;
  msg?: string;
  requestId: string;
  timeStamp: number;
}
