"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, FolderPlus, Home, Settings } from "lucide-react";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  active: boolean;
}

const SidebarItem = ({ href, icon, title, active }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"
      }`}
    >
      <span className="text-sidebar-primary">{icon}</span>
      <span>{title}</span>
    </Link>
  );
};

export function AdminSidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/console",
      icon: <Home size={18} />,
      title: "仪表盘",
    },
    {
      href: "/console/posts",
      icon: <FileText size={18} />,
      title: "文章管理",
    },
    {
      href: "/console/posts/new",
      icon: <FolderPlus size={18} />,
      title: "新建文章",
    },
    {
      href: "/console/settings",
      icon: <Settings size={18} />,
      title: "设置",
    },
  ];

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border p-4 fixed left-0 top-0">
      <div className="mb-8 px-3">
        <h1 className="text-xl font-bold text-sidebar-foreground">
          博客管理系统
        </h1>
      </div>
      <nav className="space-y-1">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            href={route.href}
            icon={route.icon}
            title={route.title}
            active={pathname === route.href}
          />
        ))}
      </nav>
    </div>
  );
}
