'use client'

import { Animate } from '@/lib/animations'
import React from 'react'

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <div className='container px-4 py-12'>
      <article>
        <Animate>
          <header className='mb-8'>
            <h1 className='text-3xl font-bold mb-4'>文章：{params.slug}</h1>
            <div className='text-muted-foreground'>
              发布日期: 2023-06-15 · 阅读时间: 5 分钟
            </div>
          </header>
        </Animate>

        <div className='prose prose-lg max-w-none dark:prose-invert'>
          <Animate delay={50}>
            <p>
              这是一个示例文章页面，展示如何在文章内容中应用滚动动画效果。
              您可以根据实际需求修改此页面，添加真实的文章内容、分类、标签等。
            </p>
          </Animate>

          <Animate delay={100}>
            <h2>第一部分标题</h2>
          </Animate>

          <Animate delay={150}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              euismod, nisi vel consectetur interdum, nisl nisi consectetur
              purus, eget egestas nisl nisl sit amet nisl. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas.
            </p>
          </Animate>

          <Animate delay={100}>
            <h2>第二部分标题</h2>
          </Animate>

          <Animate delay={150}>
            <p>
              Suspendisse potenti. Cras elementum ultrices diam. Maecenas ligula
              massa, varius a, semper congue, euismod non, mi. Proin porttitor,
              orci nec nonummy molestie, enim est eleifend mi, non fermentum
              diam nisl sit amet erat.
            </p>
          </Animate>

          <Animate delay={200}>
            <blockquote>
              这是一个引用，展示如何为不同类型的内容添加动画效果。
            </blockquote>
          </Animate>

          <Animate delay={100}>
            <h2>总结</h2>
          </Animate>

          <Animate delay={150}>
            <p>
              动画效果能够增强用户体验，使页面更加生动。合理使用动画可以引导用户注意力，
              突出重要内容，并提供更流畅的阅读体验。
            </p>
          </Animate>
        </div>
      </article>
    </div>
  )
}
