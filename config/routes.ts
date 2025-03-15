// Next.js App Router 使用基于文件系统的路由，不需要显式定义路由配置
// 但为了保持与原项目的兼容性，我们保留此配置文件供其他组件引用

export const routes = [
    { name: "首页", icon: "", path: "/", component: "app/page.tsx" },
    { name: "文章", path: "/posts", component: "app/posts/page.tsx" },
    { name: "文章", path: "/posts/:id", component: "app/posts/[id]/page.tsx" },
    { name: "关于", path: "/about", component: "app/about/page.tsx" },
    { name: "鸣谢", path: "/sponsor", component: "app/sponsor/page.tsx" }
]