# Jank Website - 企业级前端应用架构

## 项目概述

Jank Website 是一个基于 Next.js 15 构建的现代化、高性能的博客系统，采用领域驱动设计(DDD)思想，结合微前端架构准备，实现低耦合高扩展性的企业级前端应用架构。

## 技术栈

- **框架**: Next.js 15 (React 19)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand
- **表单处理**: React Hook Form
- **HTTP 客户端**: Axios
- **包管理**: pnpm

## 架构设计理念

本项目架构遵循以下设计理念：

1. **领域驱动设计(DDD)**: 以业务领域为核心组织代码结构
2. **洋葱架构**: 清晰的分层设计，内层不依赖外层
3. **微前端准备**: 为未来可能的微前端架构做好准备
4. **可测试性优先**: 架构设计便于单元测试和集成测试
5. **性能与体验并重**: 从架构层面考虑性能优化和用户体验

## 目录结构

```
├── config/                # 全局配置
│   ├── api.config.ts     # API配置
│   ├── app.config.ts     # 应用配置
│   ├── routes.config.ts  # 路由配置
│   └── theme.config.ts   # 主题配置
├── public/               # 静态资源
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 首页
│   │   └── [routes]/     # 其他路由页面
│   ├── domain/           # 领域层
│   │   ├── account/      # 账户领域
│   │   │   ├── api/      # 领域API
│   │   │   ├── hooks/    # 领域Hooks
│   │   │   ├── models/   # 领域模型
│   │   │   └── utils/    # 领域工具
│   │   ├── post/         # 文章领域
│   │   │   ├── api/      # 领域API
│   │   │   ├── hooks/    # 领域Hooks
│   │   │   ├── models/   # 领域模型
│   │   │   └── utils/    # 领域工具
│   │   └── [其他领域]/    # 其他业务领域
│   ├── components/       # 组件
│   │   ├── business/     # 业务组件
│   │   │   ├── Auth/     # 认证相关组件
│   │   │   ├── Post/     # 文章相关组件
│   │   │   └── [其他]/   # 其他业务组件
│   │   ├── layout/       # 布局组件
│   │   │   ├── Footer/   # 页脚组件
│   │   │   ├── Header/   # 页头组件
│   │   │   └── Sidebar/  # 侧边栏组件
│   │   └── ui/           # UI组件
│   │       ├── shadcn/   # shadcn UI组件
│   │       ├── feedback/ # 反馈类组件
│   │       ├── form/     # 表单类组件
│   │       └── display/  # 展示类组件
│   ├── hooks/            # 全局Hooks
│   │   ├── useAuth.ts    # 认证Hook
│   │   ├── useTheme.ts   # 主题Hook
│   │   └── useToast.ts   # 提示Hook
│   ├── infrastructure/   # 基础设施层
│   │   ├── api/          # API基础设施
│   │   │   ├── client.ts # API客户端
│   │   │   ├── types.ts  # API类型
│   │   │   └── utils.ts  # API工具
│   │   ├── storage/      # 存储基础设施
│   │   │   ├── local.ts  # 本地存储
│   │   │   └── session.ts# 会话存储
│   │   └── logger/       # 日志基础设施
│   │       └── index.ts  # 日志工具
│   ├── store/            # 状态管理
│   │   ├── auth/         # 认证状态
│   │   │   ├── index.ts  # 状态导出
│   │   │   ├── slice.ts  # 状态切片
│   │   │   └── types.ts  # 状态类型
│   │   ├── theme/        # 主题状态
│   │   └── [其他状态]/    # 其他状态
│   ├── types/            # 全局类型定义
│   │   ├── common.ts     # 通用类型
│   │   ├── api.ts        # API类型
│   │   └── index.ts      # 类型导出
│   └── utils/            # 全局工具函数
│       ├── format/       # 格式化工具
│       ├── validation/   # 验证工具
│       └── index.ts      # 工具导出
└── [配置文件]            # 项目配置文件
```

## 架构分层

### 1. 表现层 (Presentation Layer)

- **页面 (Pages)**: 位于 `src/app` 目录，基于 Next.js App Router
- **组件 (Components)**:
  - **业务组件**: `src/components/business` - 包含特定业务逻辑的组件
  - **布局组件**: `src/components/layout` - 处理页面布局的组件
  - **UI 组件**: `src/components/ui` - 纯展示型组件，无业务逻辑

### 2. 领域层 (Domain Layer)

- **领域模型**: `src/domain/*/models` - 定义业务实体和值对象
- **领域 API**: `src/domain/*/api` - 领域相关的 API 调用
- **领域 Hooks**: `src/domain/*/hooks` - 领域相关的业务逻辑封装

### 3. 应用层 (Application Layer)

- **全局 Hooks**: `src/hooks` - 跨领域的应用逻辑
- **状态管理**: `src/store` - 使用 Zustand 管理全局状态

### 4. 基础设施层 (Infrastructure Layer)

- **API 基础设施**: `src/infrastructure/api` - HTTP 客户端封装
- **存储基础设施**: `src/infrastructure/storage` - 本地存储封装
- **日志基础设施**: `src/infrastructure/logger` - 日志工具

## 领域驱动设计实践

### 领域划分

按业务领域划分代码，每个领域包含：

1. **模型 (Models)**: 定义领域实体和值对象
2. **API**: 领域相关的后端 API 调用
3. **Hooks**: 封装领域业务逻辑
4. **工具 (Utils)**: 领域特定的工具函数

### 领域间通信

- 使用事件总线或状态管理进行领域间通信
- 避免领域间直接依赖，保持松耦合

## 状态管理策略

### 分层状态管理

1. **组件状态**: 使用 React 的`useState`和`useReducer`管理组件内部状态
2. **领域状态**: 使用 Zustand 管理特定领域的状态
3. **全局状态**: 使用 Zustand 管理跨领域的全局状态
4. **服务器状态**: 使用 SWR 或 React Query 管理从服务器获取的数据

### Zustand 状态设计

- 按领域划分 store
- 使用 slice 模式组织复杂状态
- 使用 persist 中间件持久化关键状态

## 组件设计模式

### 组件分类

1. **页面组件**: 对应路由的顶层组件
2. **业务组件**: 包含特定业务逻辑的组件
3. **布局组件**: 处理页面布局的组件
4. **UI 组件**: 纯展示型组件，无业务逻辑

### 组件设计原则

- **单一职责**: 每个组件只负责一个功能点
- **组合优于继承**: 使用组合模式构建复杂 UI
- **状态下移**: 将状态尽可能下移到需要的组件
- **Props 接口**: 使用 TypeScript 定义清晰的 props 接口

### 组件通信模式

1. **Props 传递**: 父组件向子组件传递数据
2. **Context API**: 跨多层组件传递数据
3. **状态管理**: 使用 Zustand 管理跨组件状态
4. **自定义事件**: 使用自定义事件进行组件间通信

## API 层设计

### 分层 API 设计

1. **基础设施层**: `src/infrastructure/api` - 封装 HTTP 客户端
2. **领域层**: `src/domain/*/api` - 封装领域特定的 API 调用

### API 设计原则

- **类型安全**: 使用 TypeScript 定义请求和响应类型
- **错误处理**: 统一处理 API 错误
- **缓存策略**: 实现合理的缓存策略
- **拦截器**: 使用拦截器处理认证、日志等横切关注点

## 路由设计

- 基于 Next.js App Router 的文件系统路由
- 路由结构反映业务领域
- 支持动态路由和嵌套布局

## 微前端架构准备

为未来可能的微前端架构做好准备：

1. **模块化设计**: 按领域划分的模块化设计便于拆分为微应用
2. **共享依赖**: 核心库和组件可在微应用间共享
3. **独立部署**: 各微应用可独立开发、测试和部署

## 性能优化策略

1. **代码分割**: 利用 Next.js 的自动代码分割
2. **懒加载**: 对非关键组件使用`React.lazy`和`Suspense`
3. **缓存策略**: 合理使用 SWR 或 React Query 的缓存功能
4. **图片优化**: 使用 Next.js Image 组件优化图片加载
5. **Bundle 分析**: 定期分析并优化打包体积

## 测试策略

### 测试分层

1. **单元测试**: 测试独立的函数和组件
2. **集成测试**: 测试组件组合和页面功能
3. **E2E 测试**: 测试完整的用户流程

### 测试工具

- **Jest**: 单元测试框架
- **React Testing Library**: 组件测试
- **Cypress/Playwright**: E2E 测试

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
- 主分支: `main`(生产)和`develop`(开发)
- 功能分支: `feature/xxx`
- 修复分支: `bugfix/xxx`
- 发布分支: `release/x.x.x`

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

### 可访问性(A11y)

- 遵循 WCAG 2.1 指南
- 使用语义化 HTML
- 确保键盘可访问性
- 提供适当的颜色对比度

## 结论

本架构设计为企业级前端应用提供了坚实的基础，具有以下优势：

- **可维护性**: 清晰的分层和领域划分
- **可扩展性**: 模块化设计支持业务增长
- **可测试性**: 架构设计便于测试
- **性能**: 内置性能优化策略
- **协作**: 支持团队
