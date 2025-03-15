/**
 * API 配置文件
 * 集中管理 API 相关配置
 */

export const apiConfig = {
    // API 基础 URL
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:9010/api',

    // API 超时时间 (毫秒)
    timeout: 10000,

    // API 版本
    version: 'v1',

    // 请求头配置
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

    // 重试配置
    retry: {
        maxRetries: 3,
        retryDelay: 1000,
        retryStatusCodes: [408, 429, 500, 502, 503, 504],
    },

    // 缓存配置
    cache: {
        // 缓存时间 (秒)
        ttl: 60,
        // 是否启用缓存
        enabled: true,
    },
};