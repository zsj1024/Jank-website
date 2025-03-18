"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchPostList, deleteOnePost } from "@/api/post";
import type { Post } from "@/types/Post";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/shadcn/pagination";

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await fetchPostList({ page: currentPage, pageSize });
      if (response.code === 0 && response.data) {
        setPosts(response.data.posts || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        console.error("获取文章列表失败:", response.msg);
      }
    } catch (error) {
      console.error("获取文章列表出错:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  const handleEdit = (id: number) => {
    router.push(`/console/posts/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("确定要删除这篇文章吗？")) {
      try {
        const response = await deleteOnePost({ id });
        if (response.code === 0) {
          loadPosts(); // 重新加载文章列表
        } else {
          console.error("删除文章失败:", response.msg);
        }
      } catch (error) {
        console.error("删除文章出错:", error);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">文章管理</h1>
        <Button
          onClick={() => router.push("/console/posts/new")}
          size="sm"
          className="h-9 px-3 gap-1"
          variant="default"
        >
          <Plus className="h-4 w-4" /> 新建文章
        </Button>
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64 transition-opacity duration-300 ease-in-out">
            <div className="animate-pulse w-8 h-8 rounded-full bg-foreground/20"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            暂无文章，点击"新建文章"按钮创建第一篇文章
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    标题
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    可见性
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-border/20 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4">{post.title}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          post.visibility === "public"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {post.visibility === "public" ? "公开" : "私密"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 mr-1"
                        onClick={() => handleEdit(post.id)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">编辑</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">删除</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }} 
                />
              </PaginationItem>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }} 
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
