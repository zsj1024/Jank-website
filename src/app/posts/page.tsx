'use client'

import { useState, useCallback, useEffect } from 'react'
import { ArticleList } from '@/components/common/MSection/ArticleSection/ArticleList'
import { fetchPostList } from '@/api/post'
import { decodeUtils } from '@/utils'

const ITEMS_PER_PAGE = 5

interface FetchPostsParams {
  page: number
  pageSize: number
}

async function fetchAndProcessPosts({ page, pageSize }: FetchPostsParams) {
  const response = await fetchPostList({ page, pageSize })
  if (!response || !response.data || !Array.isArray(response.data.posts)) {
    throw new Error('响应格式不符合预期')
  }

  return {
    posts: response.data.posts.map((post: Post) => ({
      data: {
        id: post.id,
        title: post.title,
        image: post.image,
        visibility: post.visibility,
        content_html: decodeUtils.decodeHtml(
          post.content_html ||
            '哇，这里好像很安静！也许你可以成为第一个留言的人。'
        ),
        categoryIds: post.category_ids || []
      }
    })),
    totalPages: response.data.totalPages
  }
}

export default function Home() {
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ data, setData ] = useState<{ posts: any[]; totalPages: number } | null>(
    null
  )
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<Error | null>(null)
  const [ isTransitioning, setIsTransitioning ] = useState<boolean>(false)

  const fetchData = useCallback(async (page: number) => {
    setError(null)
    setIsTransitioning(true)

    setTimeout(() => {
      setLoading(true)

      fetchAndProcessPosts({
        page,
        pageSize: ITEMS_PER_PAGE
      })
        .then(result => {
          setData(result)
          setError(null)
        })
        .catch(err => {
          setError(err as Error)
          setData(null)
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
            setIsTransitioning(false)
          }, 50)
        })
    }, 50)
  }, [])

  useEffect(() => {
    fetchData(currentPage)
  }, [ currentPage, fetchData ])

  const handlePageChange = useCallback((page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(page)
  }, [])

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className='grid grid-cols-1 md:grid-cols-[1fr,4fr] gap-2 px-4 mt-4 md:px-0 md:mt-4'>
        <div className='flex-1'>
          {loading ? (
            <div className='flex justify-center items-center h-64 transition-opacity duration-300 ease-in-out'>
              <div className='animate-pulse w-8 h-8 rounded-full bg-foreground/20'></div>
            </div>
          ) : error ? (
            <div className='text-red-500 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 transition-all duration-300 ease-in-out'>
              哎呀，好像出错了: {error.message}
            </div>
          ) : (
            <div className='transition-all duration-300 ease-in-out transform translate-y-0 hover:translate-y-0'>
              <ArticleList
                posts={data?.posts || []}
                totalPages={data?.totalPages || 1}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                redirectEnabled={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
