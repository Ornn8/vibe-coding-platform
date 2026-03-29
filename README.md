# Vibe Coding 学习平台

一个面向中文优先、支持中英双语的免费开源学习平台，用来系统化教授 Vibe Coding，从基础概念一路覆盖到 Agentic Engineering。项目基于 Next.js 15、Prisma、Auth.js v5 和 MDX 构建。

## 当前状态

- OpenSpec change: `build-vibe-coding-platform-mvp`
- 实现进度: `30/32` 个任务完成
- 已完成: 平台骨架、i18n、Prisma schema、seed、学习区、项目提交流、Prompt Portfolio、管理后台、评审流、基础验证
- 待外部环境完成:
  - `2.2` 真实数据库 migration / schema apply
  - `3.4` GitHub / Google OAuth 登录联调与权限验收

## 本地开发

1. 安装依赖

```bash
npm install
```

2. 复制环境变量

```bash
cp .env.example .env.local
```

3. 填入至少以下变量

```env
DATABASE_URL=
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

也可以先自动生成一个本地开发用 `AUTH_SECRET`:

```bash
npm run setup:env
```

4. 初始化数据库

```bash
npx prisma migrate dev
npx prisma generate
npm run prisma:seed
```

5. 启动开发环境

```bash
npm run dev
```

## 可用脚本

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run setup:env
npm run verify:env
npm run verify:routes
npm run prisma:migrate
npm run prisma:generate
npm run prisma:seed
```

## 已完成的本地验证

以下验证已经在当前代码状态下通过:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run verify:routes`

以下验证当前会失败，属于预期行为，因为还没有外部环境:

- `npm run verify:env`

## 最后两项如何完成

### 完成 2.2

需要一个可访问的 PostgreSQL `DATABASE_URL`，然后执行:

```bash
npx prisma migrate dev
npx prisma generate
npm run prisma:seed
```

### 完成 3.4

需要配置:

- `AUTH_SECRET`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`

然后启动应用并验证:

- 未登录访问 `/{locale}/modules` 会跳转到 `/{locale}/login`
- 未登录访问 `/{locale}/dashboard` 会跳转到 `/{locale}/login`
- GitHub 登录可成功建立会话
- Google 登录可成功建立会话
- 非管理员账号访问 `/{locale}/dashboard` 会被重定向到 `/{locale}/modules`
- 管理员账号可进入 `/{locale}/dashboard`

更细的检查步骤见 [docs/verification-checklist.md](D:\VibeCodingPlaform\docs\verification-checklist.md)。
