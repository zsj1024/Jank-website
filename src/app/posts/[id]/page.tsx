"use client";

import { useParams } from "next/navigation";
import { fetchOnePost } from "@/api/post";
import { decodeUtils } from "@/utils";
import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";
import { TableOfContents } from "@/components/common/MSection/ArticleSection/TableOfContents";
import { AvatarCard } from "@/components/common/MSection/AsideSection/AvatarCard";
import { theme } from "../../../../config/theme.config";
import { ErrorCard } from "@/components/common/Error/ErrorCard";

export default function ArticleDetail() {
  // 使用 Next.js 内置的 useParams 获取路由参数
  const params = useParams();
  const id = params.id;
  // 非空断言确保 contentRef 类型符合 TableOfContents 组件要求
  const contentRef = useRef<HTMLDivElement>(null!);

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setError(new Error("文章 ID 缺失"));
      return;
    }
    // 模拟 300ms loadingDelay
    const timer = setTimeout(() => setLoading(true), 300);

    async function fetchData() {
      try {
        const response = await fetchOnePost({ id: Number.parseInt(id) });
        if (response && response.data) {
          const postData = response.data;
          const contentHtml = decodeUtils.decodeHtml(
            postData.content_html || "文章内容为空！"
          );
          setPost({ ...postData, contentHtml });
        } else {
          throw new Error("文章未找到");
        }
      } catch (err: any) {
        setError(err);
      } finally {
        clearTimeout(timer);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return null;
  }

  if (error || !post?.contentHtml) {
    return (
      <ErrorCard
        title={error ? "出错了" : "内容为空"}
        message={
          error
            ? error.message
            : "哇，这里好像很安静！也许你可以成为第一个留言的人。"
        }
      />
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* 背景图片区域 */}
      <div className="relative mb-8">
        <div
          className="w-full h-48 md:h-64 lg:h-80 rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${post.image || "/images/home-black.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {post.title}
          </h1>
        </div>
      </div>

      {/* 三栏布局：头像卡片、文章内容、目录 */}
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_250px] gap-6">
        {/* 左侧：头像卡片 */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <AvatarCard {...theme.AvatarCardProps} />
          </div>
        </div>

        {/* 中间：文章内容 */}
        <div>
          <article className="prose dark:prose-dark prose-sm md:prose-base lg:prose-lg max-w-none bg-card rounded-xl p-6 shadow-md">
            <div
              ref={contentRef}
              className="max-w-none prose-img:mx-auto prose-img:rounded-md prose-p:my-2 md:prose-p:my-3 prose-headings:my-3 md:prose-headings:my-4 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-headings:scroll-mt-20 prose-pre:max-w-full prose-pre:overflow-x-auto"
            >
              {parse(post.contentHtml)}
            </div>
          </article>
        </div>

        {/* 右侧：目录 */}
        <div className="hidden lg:block">
          <TableOfContents contentRef={contentRef} />
        </div>
      </div>
    </div>
  );
}
