import { AdminLayout } from "@/components/console/Layout";

export const metadata = {
  title: "管理后台 - 博客系统",
  description: "博客管理系统后台",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
