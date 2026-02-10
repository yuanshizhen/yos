# YOS（阶段一）

## 目录
- `frontend/`：Vite + React + pnpm + TailwindCSS
- `backend/`：Go API（登录 + 头像上传）
- `docs/PRD.md`：完整产品规划与开发约束

## 本机镜像前置检查
请确认你本机已存在以下镜像（按需求，不额外下载）：
- `timescale/timescaledb:latest-pg16`
- `nginx:alpine`
- `node:24-alpine`
- `minio/minio:latest`
- `redis:7-alpine`

检查命令：
```bash
docker images
```

## 一键部署
```bash
make up
```

访问地址：
- 前端：<http://localhost>
- 后端健康检查：<http://localhost:8080/healthz>
- MinIO：<http://localhost:9001>

## 本阶段功能
1. 主页弹出式登录框（非独立登录页）
2. 登录后头像上传（直接存储到 MinIO）
3. Apple 风格组件与动效
4. 顶部导航和占位路由
5. 全局滚动条重设计


## 默认超级管理员
- 用户名：`superadmin`
- 密码：`Admin@123456`
- 前端登录弹窗已默认填入，无需手动输入。
