import { seoConfig } from '@/shared/config/seo.config'
import { siteConfig } from '@/shared/config/site.config'
import {
  buildUrl,
  createMetadata,
  formatKeywords,
  formatTitle,
  getOgImage,
  OptimizedResources,
  SeoProps
} from '@/shared/lib/seo'
import Head from 'next/head'
import React from 'react'

/**
 * Pages Router SEO组件
 */
export const PageSeoHead = React.memo((props: SeoProps) => {
  const config =
    props.overrideConfig && Object.keys(props.overrideConfig).length > 0
      ? { ...seoConfig, ...props.overrideConfig }
      : seoConfig

  const title = formatTitle(props.title, config)
  const description = props.description || config.description
  const url = props.canonicalUrl
    ? buildUrl(props.canonicalUrl, config)
    : config.canonicalUrlPrefix || ''
  const image = getOgImage(props.ogImage)
  const keywords = props.keywords || seoConfig.keywords

  return (
    <Head>
      <title>{title}</title>
      <meta content={description} name='description' />
      <meta content={formatKeywords(keywords)} name='keywords' />
      <link href={url} rel='canonical' />
      {props.noIndex && <meta content='noindex, nofollow' name='robots' />}

      <meta content={siteConfig.name} name='application-name' />
      <meta content={config.author} name='author' />
      <meta content='#ffffff' name='theme-color' />

      <meta content={title} property='og:title' />
      <meta content={description} property='og:description' />
      <meta content={url} property='og:url' />
      <meta content={image} property='og:image' />
      <meta content='website' property='og:type' />
      <meta content={siteConfig.name} property='og:site_name' />

      <meta content='summary_large_image' name='twitter:card' />
      <meta content={title} name='twitter:title' />
      <meta content={description} name='twitter:description' />
      <meta content={image} name='twitter:image' />
    </Head>
  )
})

PageSeoHead.displayName = 'PageSeoHead'

// 导出别名以保持向后兼容
export type PageSeoProps = SeoProps
export const SEOHeader = PageSeoHead
export const generateMetadata = createMetadata
export const ResourceHints = OptimizedResources
