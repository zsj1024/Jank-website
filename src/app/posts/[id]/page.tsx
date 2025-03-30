'use client'

import { useParams } from 'next/navigation'
import { fetchOnePost } from '@/api/post'
import { decodeUtils } from '@/utils'
import { useState, useEffect, useRef } from 'react'
import parse from 'html-react-parser'
import { TableOfContents } from '@/components/common/MSection/ArticleSection/TableOfContents'
import { AvatarCard } from '@/components/common/MSection/AsideSection/AvatarCard'
import { theme } from '../../../../config/theme.config'
import { ErrorCard } from '@/components/common/Error/ErrorCard'

export default function ArticleDetail() {
  const { id } = useParams()
  const contentRef = useRef<HTMLDivElement>(null)
  const [ post, setPost ] = useState<any>(null)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) {
      setError(new Error('文章 ID 缺失'))
      return
    }

    const timer = setTimeout(() => setLoading(true), 300)

    fetchOnePost({ id: Number.parseInt(id as string) })
      .then(response => {
        if (response?.data) {
          const contentHtml = decodeUtils.decodeHtml(
            response.data.content_html || '文章内容为空！'
          )
          setPost({ ...response.data, contentHtml })
        } else {
          throw new Error('文章未找到')
        }
      })
      .catch(err => setError(err))
      .finally(() => {
        clearTimeout(timer)
        setLoading(false)
      })
  }, [ id ])

  if (loading) return null
  if (error || !post?.contentHtml) {
    return (
      <ErrorCard
        title={error ? '出错了' : '内容为空'}
        message={
          error
            ? error.message
            : '哇，这里好像很安静！也许你可以成为第一个留言的人。'
        }
      />
    )
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='relative mb-6'>
        <div
          className='w-full h-64 md:h-80 lg:h-96 overflow-hidden'
          style={{
            backgroundImage: `url(${post.image || '/images/home-black.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '0.5rem 0.5rem 0 0'
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background'></div>
        </div>
        <div className='absolute bottom-0 left-0 right-0 p-6 text-center'>
          <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-foreground drop-shadow-sm'>
            {post.title}
          </h1>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6'>
        <main>
          <article className='rounded-lg shadow-sm overflow-hidden border'>
            <div ref={contentRef} className='article-content p-6'>
              {parse(post.contentHtml)}
            </div>
          </article>
        </main>

        <aside className='hidden lg:block space-y-6'>
          <div className='sticky top-6 space-y-6'>
            <AvatarCard {...theme.AvatarCardProps} />
            <TableOfContents
              contentRef={contentRef as React.RefObject<HTMLElement>}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
