"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { fetchOnePost, updateOnePost } from "@/api/post";
import { getCategoryTree } from "@/api/category";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    contentMarkdown: "",
    visibility: "public",
    category_ids: [] as number[],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 获取文章详情
        const postResponse = await fetchOnePost({ id: parseInt(params.id) });
        if (postResponse.code === 0 && postResponse.data) {
          setPost(postResponse.data);
          setFormData({
            title: postResponse.data.title,
            contentMarkdown: postResponse.data.content_html, // 假设API返回的是HTML内容，实际使用时可能需要调整
            visibility: postResponse.data.visibility,
            category_ids: postResponse.data.category_ids || [],
          });
        } else {
          console.error("获取文章详情失败:", postResponse.msg);
        }

        // 获取分类列表
        const categoryResponse = await getCategoryTree();
        if (categoryResponse.code === 0 && categoryResponse.data) {
          setCategories(categoryResponse.data || []);
        } else {
          console.error("获取分类列表失败:", categoryResponse.msg);
        }
      } catch (error) {
        console.error("加载数据出错:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (categoryId: number) => {
    setFormData((prev) => {
      const newCategoryIds = prev.category_ids.includes(categoryId)
        ? prev.category_ids.filter((id) => id !== categoryId)
        : [...prev.category_ids, categoryId];
      return {
        ...prev,
        category_ids: newCategoryIds,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await updateOnePost({
        id: parseInt(params.id),
        ...formData,
      });
      if (response.code === 0) {
        router.push("/console/posts");
      } else {
        console.error("更新文章失败:", response.msg);
        alert(`更新失败: ${response.msg}`);
      }
    } catch (error) {
      console.error("更新文章出错:", error);
      alert("更新出错，请稍后重试");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">加载中...</div>;
  }

  if (!post) {
    return <div className="text-center py-10">未找到文章</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">编辑文章</h1>
        <Button variant="outline" onClick={() => router.push("/console/posts")}>
          返回列表
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>文章信息</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">标题</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contentMarkdown">内容</Label>
              <textarea
                id="contentMarkdown"
                name="contentMarkdown"
                value={formData.contentMarkdown}
                onChange={handleInputChange}
                rows={15}
                className="w-full min-h-[200px] p-2 border rounded-md bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility">可见性</Label>
              <select
                id="visibility"
                name="visibility"
                value={formData.visibility}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="public">公开</option>
                <option value="private">私密</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>分类</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={formData.category_ids.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor={`category-${category.id}`}>
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/console/posts")}
              >
                取消
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
