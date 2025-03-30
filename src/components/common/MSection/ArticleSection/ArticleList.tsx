'use client'

import React, {
  useMemo,
  useState,
  useEffect,
  useLayoutEffect,
  useRef
} from 'react'
import { Card, CardContent, Skeleton } from '@/components/ui/shadcn'
import { PaginationComponent } from '@/components/common/MSection/PaginationSection/Pagination'
import { useRouter } from 'next/navigation'
import parse from 'html-react-parser'

type ArticleListProps = {
  posts: HttpResponse<Post>[]
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  redirectEnabled?: boolean
}

const ArticleList: React.FC<ArticleListProps> = ({
  posts,
  totalPages,
  currentPage,
  onPageChange,
  redirectEnabled = false
}) => {
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ wrapperStyle, setWrapperStyle ] = useState<React.CSSProperties>({})
  const listWrapperRef = useRef<HTMLDivElement>(null)
  const prevHeightRef = useRef(0)
  const router = useRouter()

  const processText = useMemo(() => {
    return (html: string): string => {
      const cleanText = (text: string): string =>
        text.replace(/�/g, '').replace(/\s+/g, ' ').trim()

      const extractTextFromNode = (node: React.ReactNode): string =>
        typeof node === 'string'
          ? node
          : Array.isArray(node)
            ? node.map(extractTextFromNode).join('')
            : React.isValidElement(node)
              ? extractTextFromNode(
                (node as React.ReactElement<{ children: React.ReactNode }>)
                  .props.children
              )
              : ''

      const text = extractTextFromNode(parse(html))
      return cleanText(text)
    }
  }, [])

  const handleCardClick = (postId: number) => {
    if (redirectEnabled) {
      router.push(`/posts/${postId}`)
    }
  }

  // 未加载时始终显示 5 个项目，加载后显示实际项目数
  const count = isLoaded ? posts.length : 5

  useEffect(() => {
    if (!isLoaded && posts.length > 0 && totalPages > 0) {
      if (listWrapperRef.current) {
        prevHeightRef.current =
          listWrapperRef.current.getBoundingClientRect().height
      }
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [ posts, totalPages, isLoaded ])

  useLayoutEffect(() => {
    if (isLoaded && listWrapperRef.current) {
      const newHeight = listWrapperRef.current.getBoundingClientRect().height
      setWrapperStyle({
        height: prevHeightRef.current + 'px',
        transition: 'height 0.5s ease'
      })
      void listWrapperRef.current.offsetHeight
      setWrapperStyle({
        height: newHeight + 'px',
        transition: 'height 0.5s ease'
      })
      const timer = setTimeout(() => {
        setWrapperStyle({ height: 'auto' })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [ isLoaded, posts ])

  return (
    <div className='transition-all duration-300 ease-in-out'>
      <Card className='w-full'>
        <CardContent className='p-4 w-full'>
          <div ref={listWrapperRef} style={wrapperStyle} className='space-y-4'>
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={posts[index] ? posts[index].data.id : `skeleton-${index}`}
                className='relative md:h-[135px] h-[100px]'
              >
                {/* skeleton 层 */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    isLoaded ? 'opacity-0' : 'opacity-300'
                  }`}
                >
                  <div className='group flex h-full overflow-hidden border hover:shadow-xl cursor-pointer'>
                    <div className='relative w-1/3 overflow-hidden'>
                      <Skeleton className='w-full h-full' />
                    </div>
                    <div className='h-full w-2/3 border-l p-4 space-y-2'>
                      <Skeleton className='h-6 w-3/4' />
                      <Skeleton className='h-4 w-5/6' />
                    </div>
                  </div>
                </div>
                {/* 数据层 */}
                {posts[index] && (
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div
                      className='group flex h-full overflow-hidden rounded-xl border hover:shadow-xl cursor-pointer'
                      onClick={() => handleCardClick(posts[index].data.id)}
                    >
                      <div className='relative w-1/3 overflow-hidden'>
                        <img
                          src={posts[index].data.image}
                          alt={posts[index].data.title}
                          className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                          loading='lazy'
                        />
                      </div>
                      <div className='h-full w-2/3 border-l'>
                        <div className='flex flex-col justify-center space-y-2 p-4 sm:p-5 md:p-6 group-hover:translate-x-3 transition-all duration-500 ease-out'>
                          <h3 className='md:text-xl line-clamp-1'>
                            {posts[index].data.title}
                          </h3>
                          <p className='text-sm text-muted-foreground overflow-hidden overflow-ellipsis line-clamp-2'>
                            {processText(posts[index].data.content_html)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>

        {isLoaded && (
          <>
            <div className='border mx-14'></div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </>
        )}
      </Card>
    </div>
  )
}

export { ArticleList }
