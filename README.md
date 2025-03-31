<p style="text-align: center;">
  <a><img src="https://s2.loli.net/2025/03/14/BnchjpPLeIaoO75.png" alt="Jank"></a>
</p>
<p style="text-align: center;">
  <em>Jank，一个轻量级的博客系统，基于 Go 语言和 Echo 框架开发，强调极简、低耦合和高扩展</em>
</p>
<p style="text-align: center;">
  <a href="https://img.shields.io/github/stars/Done-0/Jank?style=social" target="_blank">
    <img src="https://img.shields.io/github/stars/Done-0/Jank?style=social" alt="Stars">
  </a> &nbsp;
  <a href="https://img.shields.io/github/forks/Done-0/Jank?style=social" target="_blank">
    <img src="https://img.shields.io/github/forks/Done-0/Jank?style=social" alt="Forks">
  </a> &nbsp;
  <a href="https://img.shields.io/github/contributors/Done-0/Jank" target="_blank">
    <img src="https://img.shields.io/github/contributors/Done-0/Jank" alt="Contributors">
  </a> &nbsp;
  <a href="https://img.shields.io/github/issues/Done-0/Jank" target="_blank">
    <img src="https://img.shields.io/github/issues/Done-0/Jank" alt="Issues">
  </a> &nbsp;
  <a href="https://img.shields.io/github/issues-pr/Done-0/Jank" target="_blank">
    <img src="https://img.shields.io/github/issues-pr/Done-0/Jank" alt="Pull Requests">
  </a> &nbsp;
  <a href="https://img.shields.io/github/license/Done-0/Jank" target="_blank">
    <img src="https://img.shields.io/github/license/Done-0/Jank" alt="License">
  </a>
</p>
<p align="center">
  <span style="text-decoration: underline; color: grey;">简体中文</span> | <a href="README_en.md" style="text-decoration: none;">English</a>
</p>

---

Jank 是一个轻量级的博客系统，基于 Go 语言和 Echo 框架开发，设计理念强调极简、低耦合和高扩展，旨在为用户提供功能丰富、界面简洁、操作简单且安全可靠的博客体验。

> 注：本项目当前缺少前端部分，在此诚邀有志于前端开发的开发者加入，共同参与开发工作，期待您的宝贵意见和贡献！

## 速览

👉 演示站｜ Demo：[https://jank.org.cn](https://jank.org.cn)

👉[【Jank 博客系统】全新技术栈与 UI】](https://www.bilibili.com/video/BV1bjQ8YNEEo/?share_source=copy_web&vd_source=6fd45877cd498bfb9c2b449d1197363c)

👉 后端仓库：[https://github.com/Done-0/Jank](https://github.com/Done-0/Jank)

![home-page.png](https://s2.loli.net/2025/03/18/CVYwRJOaXtH4nb8.png)
![posts-page.png](https://s2.loli.net/2025/03/18/s6WH3BVmlbyarRS.png)
![post2-page.png](https://s2.loli.net/2025/03/18/TS1j9Zr7UpnVPOY.png)

> 注：因为还在推出阶段，部分配置文件可能需要根据实际情况更改，具体请使用下面的联系方式联系作者，或者进入开发者社区交流。

## 技术栈

- **前端**：react + nextjs + shadcn/ui + tailwindcss。

## 项目结构

```bash
src/
├── app/                    # Next.js App Router 路由
│   ├── (frontend)/         # 前台页面路由组
│   │   ├── page.tsx        # 首页
│   │   └── posts/          # 文章页面
│   └── console/            # 后台管理路由组
├── components/             # 组件目录
│   ├── layout/             # 布局组件
│   └── ui/                 # UI 组件
│       └── shadcn/         # Shadcn UI 组件
├── config/                 # 全局配置
│   ├── site.config.ts      # 站点配置
│   ├── seo.config.ts       # SEO 配置
│   └── navigation.config.ts # 导航配置
├── lib/                    # 功能模块库
│   ├── animations/         # 动画系统
│   ├── axios/              # HTTP客户端
│   ├── seo/                # SEO工具
│   ├── theme/              # 主题系统
│   └── utils/              # 实用工具
├── services/               # 服务层
│   └── api/                # API服务
│       ├── account.ts      # 账户相关API
│       ├── post.ts         # 文章相关API
│       └── category.ts     # 分类相关API
├── store/                  # 状态管理
│   └── auth.ts             # 认证状态
├── styles/                 # 样式文件
├── providers/              # 全局提供器
└── types/                  # TypeScript类型定义
```

## 本地开发

1. **安装依赖**：

   ```bash
   pnpm install
   ```

2. **修改配置**：  
    修改 `.env` 或 `.env.development` 文件中的数据库配置和邮箱配置，示例如下：

   ```yaml
   NEXT_PUBLIC_SITE_URL=http://127.0.0.1:9010
   ```

3. **启动服务**：  
   使用以下命令启动应用：

   ```bash
   pnpm dev
   ```

4. **访问首页**：  
   本地启动应用后，浏览器访问 [http://localhost:3000](http://localhost:3000)

## roadmap（船新推出）

![image.png](https://s2.loli.net/2025/03/09/qJrtOeFvD95PV4Y.png)

> 注：黑色为已完成部分，白色色为待完成部分。

## 官方社区

如果有任何疑问或建议，欢迎加入官方社区交流。

<img src="https://s2.loli.net/2025/03/31/GA3jRfYrglL8ItJ.jpg" alt="官方社区" width="300" />

## 特别鸣谢

感谢各位对开源社区的支持，在此诚挚地对每一位赞助者表示感谢！

<p>
  <a href="https://github.com/vxincode">
    <img src="https://github.com/vxincode.png" width="80" height="80" style="border-radius: 50%;" />
  </a>
  <a href="https://github.com/WowDoers">
    <img src="https://github.com/WowDoers.png" width="80" height="80" style="border-radius: 50%;" />
  </a>
</p>

## 联系合作

- **QQ**: 927171598
- **微信**: l927171598
- **邮箱**：<EMAIL>fenderisfine@outlook.com

## 贡献者名单

<a href="https://github.com/Done-0/Jank/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Done-0/Jank" alt="贡献者名单" />
</a>

## 代码统计

<p align="left">
  <img src="https://img.shields.io/github/languages/top/Done-0/Jank?label=主要语言&color=00ADD8" alt="主要语言" />
  <img src="https://img.shields.io/github/languages/code-size/Done-0/Jank?label=代码体积&color=success" alt="代码体积" />
  <img src="https://img.shields.io/github/last-commit/Done-0/Jank?label=最后提交&color=blue" alt="最后提交" />
  <img src="https://img.shields.io/github/commit-activity/m/Done-0/Jank?label=月提交&color=orange" alt="提交频率" />
</p>

### 详细统计

|    语言    | 文件数 | 代码行数 | 注释行数 | 空白行数 |   占比   |
| :--------: | :----: | :------: | :------: | :------: | :------: |
| TypeScript |   55   |   4723   |   141    |   466    |  88.8%   |
| JavaScript |   3    |    55    |    11    |    12    |   1.0%   |
|    CSS     |   1    |   289    |    12    |    44    |   5.4%   |
|  配置文件  |   3    |   226    |    1     |    8     |   4.2%   |
|  Markdown  |   0    |    0     |    0     |    0     |   0.0%   |
|    其他    |   2    |    25    |    11    |    9     |   0.5%   |
|  **总计**  | **64** | **5318** | **176**  | **539**  | **100%** |

_注：统计数据由 GitHub Actions 自动更新，最后更新于 2025-03-31_
_排除了 node_modules、.next、public 目录和 package-lock.json、pnpm-lock.yaml、components.json、LICENSE、.gitignore、.dockerignore、README.md、README_en.md 文件_

## 许可证

本项目遵循 [MIT 协议](https://opensource.org/licenses/MIT)。

## 增长趋势

<img src="https://api.star-history.com/svg?repos=Done-0/Jank&type=timeline" width="100%" height="65%" alt="GitHub Stats">
