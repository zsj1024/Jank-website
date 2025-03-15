# Jank Website - 现代化中大型前端项目架构

## 项目概述

Jank Website 是一个基于 Next.js 15 构建的现代化、高性能的博客系统，采用了最新的前端技术栈和架构设计理念。本项目架构设计面向中大型应用，具有低耦合、高扩展性的特点，适合长期维护和团队协作开发。

## 技术栈

- **框架**: Next.js 15 (React 19)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand
- **表单处理**: React Hook Form
- **HTTP 客户端**: Axios
- **包管理**: pnpm

## 架构设计原则

本项目架构遵循以下设计原则：

1. **关注点分离**: 将业务逻辑、UI 展示、状态管理和数据获取清晰分离
2. **模块化**: 通过模块化设计降低系统复杂度，提高代码可维护性
3. **可测试性**: 架构设计便于单元测试和集成测试
4. **可扩展性**: 支持功能扩展和业务增长，无需大规模重构
5. **性能优先**: 从架构层面考虑性能优化，包括代码分割、懒加载等策略

## 目录结构

```
├── config/                # 全局配置
│   ├── config.ts         # 应用配置
│   ├── routes.ts         # 路由配置
│   └── theme.config.ts   # 主题配置
├── public/               # 静态资源
├── src/
│   ├── api/              # API 接口层
│   │   ├── account.ts    # 账户相关 API
│   │   ├── category.ts   # 分类相关 API
│   │   ├── post.ts       # 文章相关 API
│   │   └── verification.ts # 验证相关 API
│   ├── app/              # Next.js App Router 页面
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 首页
│   │   └── [routes]/     # 其他路由页面
│   ├── components/       # 组件
│   │   ├── common/       # 通用业务组件
│   │   │   ├── Auth/     # 认证相关组件
│   │   │   ├── Error/    # 错误处理组件
│   │   │   ├── MSection/ # 页面区块组件
│   │   │   └── Navbar/   # 导航组件
│   │   └── ui/           # UI 组件
│   │       └── shadcn/   # shadcn UI 组件
│   ├── lib/              # 工具库
│   │   ├── axios/        # Axios 配置
│   │   └── utils.ts      # 通用工具函数
│   ├── store/            # 状态管理
│   │   └── auth.ts       # 认证状态
│   ├── types/            # TypeScript 类型定义
│   │   ├── Account.d.ts  # 账户相关类型
│   │   ├── Auth.d.ts     # 认证相关类型
│   │   ├── HttpType.d.ts # HTTP 相关类型
│   │   ├── Post.d.ts     # 文章相关类型
│   │   └── index.ts      # 类型导出
│   └── utils/            # 工具函数
│       ├── decode/       # 解码工具
│       └── index.ts      # 工具函数导出
└── [配置文件]            # 项目配置文件
```

## 架构分层

### 1. 表现层 (Presentation Layer)

- **页面 (Pages)**: 位于 `src/app` 目录，基于 Next.js App Router
- **组件 (Components)**:
  - **业务组件**: `src/components/common` - 包含特定业务逻辑的组件
  - **UI 组件**: `src/components/ui` - 纯展示型组件，无业务逻辑

### 2. 应用层 (Application Layer)

- **状态管理**: `src/store` - 使用 Zustand 管理全局状态
- **API 服务**: `src/api` - 封装后端 API 调用

### 3. 领域层 (Domain Layer)

- **类型定义**: `src/types` - 定义业务实体和数据模型
- **业务逻辑**: 在组件和 hooks 中实现特定业务逻辑

### 4. 基础设施层 (Infrastructure Layer)

- **HTTP 客户端**: `src/lib/axios` - 配置 Axios 实例
- **工具函数**: `src/utils` 和 `src/lib` - 提供通用功能

## 状态管理策略

本项目采用分层状态管理策略：

1. **局部状态**: 使用 React 的 `useState` 和 `useReducer` 管理组件内部状态
2. **全局状态**: 使用 Zustand 管理跨组件共享的状态，如用户认证信息
3. **服务器状态**: 使用 SWR 或 React Query 管理从服务器获取的数据（可选扩展）

### Zustand 状态设计原则

- 按领域划分 store（auth, theme 等）
- 使用 persist 中间件持久化关键状态
- 提供清晰的 actions 修改状态

## 组件设计模式

### 组件分类

1. **页面组件 (Page Components)**: 对应路由的顶层组件，位于 `src/app` 目录
2. **容器组件 (Container Components)**: 处理数据获取和状态管理，不关注 UI 样式
3. **展示组件 (Presentational Components)**: 纯 UI 组件，通过 props 接收数据
4. **布局组件 (Layout Components)**: 处理页面布局，如 `layout.tsx`
5. **HOC (高阶组件)**: 用于复用组件逻辑
6. **自定义 Hooks**: 封装和复用状态逻辑

### 组件设计原则

- **单一职责**: 每个组件只负责一个功能点
- **可组合性**: 小型、可复用的组件优于大型、特定用途的组件
- **Props 接口**: 使用 TypeScript 定义清晰的 props 接口
- **默认值**: 为非必需 props 提供合理的默认值
- **错误处理**: 优雅处理加载状态和错误状态

## API 层设计

- API 调用集中在 `src/api` 目录管理
- 按领域划分 API 文件（account, post 等）
- 使用 TypeScript 类型确保请求和响应的类型安全
- 统一错误处理和响应转换

## 路由设计

- 基于 Next.js App Router 的文件系统路由
- 路由结构清晰，反映业务领域
- 支持动态路由和嵌套布局

## 样式解决方案

- 使用 Tailwind CSS 实现原子化 CSS
- 结合 shadcn/ui 提供一致的组件库
- 支持主题切换（暗/亮模式）

## 性能优化策略

1. **代码分割**: 利用 Next.js 的自动代码分割
2. **图片优化**: 使用 Next.js Image 组件优化图片加载
3. **懒加载**: 对非关键组件使用 `React.lazy` 和 `Suspense`
4. **缓存策略**: 合理使用 SWR 或 React Query 的缓存功能
5. **Bundle 分析**: 定期分析并优化打包体积

## 测试策略

1. **单元测试**: 使用 Jest 和 React Testing Library 测试组件和工具函数
2. **集成测试**: 测试组件组合和页面功能
3. **E2E 测试**: 使用 Cypress 或 Playwright 进行端到端测试

## 扩展性设计

### 微前端架构准备

当应用规模扩大时，可以平滑过渡到微前端架构：

1. **Module Federation**: 使用 Webpack Module Federation 实现模块共享
2. **独立部署**: 各微应用可独立开发、测试和部署
3. **共享依赖**: 核心库和组件可在微应用间共享

### 国际化支持

- 使用 next-intl 或 react-i18next 实现多语言支持
- 提取文本到语言文件，支持动态切换语言

## 开发工作流

### 开发环境设置

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

### Git 工作流

- 使用 Git Flow 或 GitHub Flow
- 主分支: `main` (生产) 和 `develop` (开发)
- 功能分支: `feature/xxx`
- 修复分支: `bugfix/xxx`
- 发布分支: `release/x.x.x`

### CI/CD 流程

1. **代码提交**: 开发者提交代码到功能分支
2. **自动化测试**: CI 运行代码检查和自动化测试
3. **代码审查**: 通过 Pull Request 进行代码审查
4. **预览环境**: 自动部署到预览环境
5. **生产部署**: 合并到主分支后自动部署到生产环境

## 最佳实践

### 代码规范

- 使用 ESLint 和 Prettier 保持代码风格一致
- 遵循 TypeScript 最佳实践，严格类型检查
- 组件命名使用 PascalCase，文件名与组件名一致
- 工具函数使用 camelCase

### 安全最佳实践

- 所有用户输入进行验证和清洗
- 实现 CSRF 保护
- 使用 HTTPS
- 敏感信息不存储在客户端

### 可访问性 (A11y)

- 遵循 WCAG 2.1 指南
- 使用语义化 HTML
- 确保键盘可访问性
- 提供适当的颜色对比度

## 未来扩展

1. **PWA 支持**: 添加 Service Worker 和 Manifest
2. **服务器组件**: 充分利用 Next.js 的服务器组件
3. **实时功能**: 集成 WebSocket 或 Server-Sent Events
4. **分析与监控**: 添加性能监控和用户行为分析

## 结论

本架构设计为中大型前端项目提供了坚实的基础，具有以下优势：

- **可维护性**: 清晰的目录结构和分层设计
- **可扩展性**: 模块化设计支持业务增长
- **开发效率**: 现代化工具链提高开发效率
- **性能**: 内置性能优化策略
- **协作**: 支持团队协作开发

通过遵循本文档中的架构设计和最佳实践，团队可以构建高质量、可维护的前端应用，并随着业务需求的变化灵活扩展。
