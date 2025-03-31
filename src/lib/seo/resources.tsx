import { seoConfig } from '@/config/seo.config'
import React from 'react'

/**
 * 资源预加载组件
 * 用于优化关键资源加载速度
 */
export const OptimizedResources = React.memo(() => (
  <>
    {/* DNS预解析和预连接 */}
    {seoConfig.performance?.dnsPreconnect?.map((domain, i) => (
      <link href={domain} key={`dns-${i}`} rel='dns-prefetch' />
    ))}
    {seoConfig.performance?.preconnectOrigins?.map((domain, i) => (
      <link
        crossOrigin='anonymous'
        href={domain}
        key={`preconnect-${i}`}
        rel='preconnect'
      />
    ))}

    {/* 预加载其他资源 */}
    {seoConfig.performance?.preloadAssets?.map((asset, i) => (
      <link
        as={asset.as}
        crossOrigin='anonymous'
        href={asset.href}
        key={`preload-${i}`}
        rel='preload'
        type={asset.type}
      />
    ))}
  </>
))

OptimizedResources.displayName = 'OptimizedResources'
