# 第一阶段：构建
FROM node:22.13.1 AS builder
WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN pnpm run build

# 第二阶段：运行
FROM node:22.13.1-slim
WORKDIR /app

# 复制依赖文件和构建产物
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml* ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# 确保静态资源目录权限正确
RUN chmod -R 755 ./.next/static

# 安装生产环境依赖
RUN npm install -g pnpm && \
    pnpm install --prod --no-frozen-lockfile

# 设置环境变量
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

# 暴露端口
EXPOSE 3000

# 启动服务
CMD ["pnpm", "start"]
