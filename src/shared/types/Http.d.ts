/** 统一响应类型 */
declare interface HttpResponse<T> {
    code?: number
    data: T
    msg?: string
    requestId: string
    timeStamp: number
}