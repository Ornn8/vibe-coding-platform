# Implementation Plan — Vibe Coding 学习平台

> 使用 Codex 开发。每一步有明确的验证标准，验证通过后才进入下一步。

---

## Step 1: 项目初始化与基础设施

### 任务
- 用 `create-next-app` 初始化 Next.js 15 项目（App Router, TypeScript, Tailwind, ESLint）
- 安装依赖：prisma, @prisma/client, next-auth(@auth/core), next-intl, next-mdx-remote, next-themes, shiki
- 安装 shadcn/ui（`npx shadcn@latest init`），添加基础组件：Button, Card, Input, Table, Dialog, Badge, Tabs, Dropdown, Avatar, Separator, Sheet
- 配置 Prisma：复制 schema.prisma，配置 DATABASE_URL，运行 `prisma db push`
- 创建 `src/lib/db.ts`（Prisma client singleton）
- 配置 next-intl：middleware.ts 路由配置，i18n/zh.json 和 en.json 骨架文件
- 配置 next-themes（暗色模式支持）
- 创建基础 layout：`src/app/layout.tsx`（HTML root），`src/app/[locale]/layout.tsx`（locale provider + font）
- 确保 `npm run dev` 可启动，访问 `/zh` 和 `/en` 显示不同语言的 hello world

### 验证标准
- [ ] `npm run dev` 启动无报错
- [ ] 访问 `localhost:3000/zh` 显示中文文本
- [ ] 访问 `localhost:3000/en` 显示英文文本
- [ ] `npx prisma studio` 可打开并显示所有表
- [ ] `npx tsc --noEmit` 无类型错误
- [ ] 暗色模式切换正常

---

## Step 2: 认证系统

### 任务
- 配置 Auth.js v5：`src/lib/auth.ts`，Prisma adapter
- 配置 OAuth providers：GitHub + Google（使用环境变量）
- 创建登录页面：`src/app/[locale]/(auth)/login/page.tsx`
- 实现登录/登出按钮组件
- 在 locale layout 中添加 session provider
- 创建 middleware 保护路由：`(learn)` 路由组需要登录，`(admin)` 路由组需要 ADMIN 角色
- 创建一个简单的 Navbar 组件：logo + 用户头像/登录按钮 + 语言切换

### 验证标准
- [ ] 可通过 GitHub OAuth 登录
- [ ] 登录后用户记录保存到数据库 users 表
- [ ] 未登录访问 `/zh/modules` 重定向到登录页
- [ ] 非 ADMIN 用户访问 `/zh/dashboard` 返回 403
- [ ] 登出后 session 清除
- [ ] Navbar 显示用户头像，点击可登出

---

## Step 3: 课程数据种子 + 模块列表页

### 任务
- 创建 `prisma/seed.ts`：插入 8 个 Module（含中英文 title/description）、每个 Module 的 Lesson 记录（按产品设计文档的课节清单）、ModuleProject 记录、Exercise + ChecklistItem 示例数据
- 配置 `package.json` 的 prisma seed 命令
- 创建课程内容元数据文件：`src/content/zh/metadata.ts`（模块和课节的 slug/title/order 映射）
- 创建 `(learn)/layout.tsx`：侧边栏导航（模块列表 + 进度百分比）
- 创建 `(learn)/modules/page.tsx`：模块卡片列表页，展示 8 个模块，CORE/ADVANCED 标记，进度条
- 创建 `ModuleCard` 组件：模块标题 + 描述 + 周期 + 进度 + 课节数量

### 验证标准
- [ ] `npx prisma db seed` 成功插入 8 个模块和对应的课节
- [ ] 模块列表页正确展示 8 个模块卡片
- [ ] M7/M8 显示"进阶"标记
- [ ] 侧边栏导航可折叠/展开
- [ ] 响应式：移动端侧边栏变为抽屉式

---

## Step 4: 课节学习页（MDX 渲染）

### 任务
- 创建 MDX 加载工具：`src/lib/mdx.ts`（基于 next-mdx-remote，集成 Shiki 代码高亮）
- 创建自定义 MDX 组件：`src/components/shared/mdx-components.tsx`
  - `<Exercise>` 组件：展示课堂练习，含提交入口
  - `<Callout>` 组件：提示/警告/信息框
  - `<ToolCard>` 组件：工具参考卡片
  - `<CodeComparison>` 组件：before/after 代码对比
- 创建 M1 的 4 个 MDX 占位文件（每个文件 30-50 行占位内容，包含各类 MDX 组件的示例用法）
- 创建课节详情页：`(learn)/modules/[moduleSlug]/[lessonSlug]/page.tsx`
  - 顶部：课节标题 + 面包屑导航
  - 中间：MDX 内容渲染（宽度限制 max-w-3xl）
  - 底部："标记为已完成"按钮 + 上一课/下一课导航
- 创建 `(learn)/modules/[moduleSlug]/page.tsx`：模块详情页，展示课节列表 + 模块项目入口
- 实现 LessonProgress 写入：点击"标记已完成"时在数据库创建/更新记录

### 验证标准
- [ ] 访问 `/zh/modules/m1/1.1-vibe-coding-history` 正确渲染 MDX 内容
- [ ] 代码块有语法高亮
- [ ] `<Exercise>` 组件渲染正确，可展开/折叠
- [ ] "标记已完成"按钮点击后状态持久化（刷新后仍为已完成）
- [ ] 上一课/下一课导航正确
- [ ] 侧边栏中已完成课节显示勾选标记

---

## Step 5: 练习提交 + 项目提交

### 任务
- 实现课堂练习提交（Server Action）：
  - 文本提交（textarea）
  - 链接提交（URL input）
  - 提交后保存到 Submission 表
- 实现模块项目提交页：`(learn)/projects/[projectId]/page.tsx`
  - 展示项目描述和要求
  - 提交表单：文本区域 + 链接输入（多个）+ 文件上传入口
  - 自评清单：从 ChecklistItem 加载，用户勾选保存到 SubmissionCheckStatus
  - 提交状态显示（DRAFT → SUBMITTED → COMPLETED）
- 创建"我的项目"列表页：`(learn)/projects/page.tsx`——展示所有模块项目和提交状态
- 实现 Prompt Portfolio 管理：
  - `(learn)/profile/prompts/page.tsx`：列表 + 创建/编辑
  - 简单的 CRUD：title, content, category, tags

### 验证标准
- [ ] 课堂练习可提交文本和链接，提交后显示"已提交"
- [ ] 模块项目提交页表单完整，必填项有校验
- [ ] 自评清单可勾选，状态保存到数据库
- [ ] "我的项目"页面展示所有 8 个模块项目的状态
- [ ] Prompt Portfolio 可 CRUD

---

## Step 6: 个人中心 + 进度追踪

### 任务
- 创建个人中心页：`(learn)/profile/page.tsx`
  - 学习进度总览：已完成模块数/8，已完成课节数/总课节数
  - 进度可视化：8 个模块的环形进度图或进度条
  - 学习数据统计：连续学习天数、总学习时长（基于 DailyActiveLog）
  - 最近活动时间线
- 实现学习活跃记录：在页面访问时记录 DailyActiveLog（防重复）
- 实现连续学习天数计算逻辑
- 在侧边栏底部添加用户进度摘要（完成百分比）

### 验证标准
- [ ] 个人中心正确显示进度统计
- [ ] 完成课节后进度数据实时更新
- [ ] 连续学习天数逻辑正确（跳过一天后重置）
- [ ] DailyActiveLog 每天只记录一条

---

## Step 7: 管理后台 — 内容管理

### 任务
- 创建 Admin layout：`(admin)/layout.tsx`——左侧管理菜单 + 顶部标题栏
- 内容管理页面：`(admin)/content/page.tsx`
  - 模块列表表格（可编辑 title, description, duration, order, tier）
  - 点击模块进入课节管理
- 课节管理页面：`(admin)/content/[moduleSlug]/page.tsx`
  - 课节列表表格（可编辑 title, description, order）
  - 练习管理：每个课节的 Exercise 列表 CRUD
  - ChecklistItem 管理：每个 Exercise 的检查项 CRUD
- 模块项目管理：编辑项目描述和自评清单
- 所有编辑使用 Dialog/Sheet 弹出表单，不跳转页面

### 验证标准
- [ ] 可编辑模块的中英文标题和描述
- [ ] 可添加/编辑/删除/排序课节
- [ ] 可管理练习和检查项
- [ ] 保存后数据库正确更新
- [ ] 非 ADMIN 用户无法访问

---

## Step 8: 管理后台 — 用户管理 + 数据看板

### 任务
- 用户管理页面：`(admin)/users/page.tsx`
  - 用户列表表格：头像、名称、邮箱、注册时间、最后活跃、学习进度（完成模块数）、角色
  - 搜索和筛选（按角色、按活跃状态）
  - 角色切换（STUDENT ↔ ADMIN）
  - 点击用户名展开详情：学习轨迹、提交记录
- 数据看板页面：`(admin)/dashboard/page.tsx`
  - 总览卡片：总注册用户数、本月活跃用户、平均完课率、总提交数
  - 模块漏斗图：每个模块的开始人数 → 完成人数（用 recharts 或简单的 bar chart）
  - 用户活跃趋势（最近 30 天日活折线图）

### 验证标准
- [ ] 用户列表加载正确，支持分页
- [ ] 可搜索用户（按名称/邮箱）
- [ ] 角色切换功能正常
- [ ] 看板数据从数据库聚合查询，数据准确
- [ ] 图表渲染正常

---

## Step 9: 管理后台 — 项目审阅

### 任务
- 项目审阅页面：`(admin)/reviews/page.tsx`
  - 待审阅队列：按提交时间排序，显示用户名 + 模块 + 提交时间
  - 审阅面板：查看提交内容（文本/链接/文件）、查看自评清单完成情况
  - 审阅操作：添加评语 + 标记为 REVIEWED/COMPLETED
  - 优秀项目标记（为二期展示墙做准备）
- 筛选器：按模块、按状态（SUBMITTED/REVIEWED/COMPLETED）

### 验证标准
- [ ] 审阅队列正确展示待审阅提交
- [ ] 可查看完整提交内容
- [ ] 评语保存到 Submission.reviewNote
- [ ] 状态变更后在学生端可见

---

## Step 10: 工具参考区 + 收尾打磨

### 任务
- 工具参考页面：`(learn)/tools/page.tsx`
  - 工具安装指南卡片（Bolt.new, Cursor, Claude Code, Codex, Windsurf）
  - 工具对比表（适用场景、优缺点、定价）
  - 常用命令/快捷键速查
- Landing page：`src/app/[locale]/page.tsx`
  - Hero section：平台介绍
  - 课程概览：8 模块卡片预览
  - CTA：注册/开始学习
- 全局收尾：
  - 404 页面
  - Loading 骨架屏（全局和页面级）
  - SEO meta tags（title, description, og:image）
  - 响应式全面检查
  - 性能优化：图片优化（next/image）、适当的 dynamic import

### 验证标准
- [ ] 工具参考页内容完整
- [ ] Landing page 设计完成
- [ ] 所有路由的 404/loading/error boundary 完备
- [ ] Lighthouse Performance ≥ 80
- [ ] 移动端所有页面可正常使用

---

## Step 11: 课程内容填充（持续）

### 任务
- 按模块逐步编写 MDX 课程文件
- 优先级：M1 → M2 → M3 → M4（MVP 阶段完成这 4 个）
- 每个 MDX 文件包含：
  - 知识点讲解（图文）
  - 嵌入的 `<Exercise>` 课堂练习
  - 延伸阅读链接（指向原始仓库）
  - 参考来源声明
- 同步英文翻译（可后续批量处理）

### 验证标准
- [ ] M1 的 4 节课 MDX 内容完整，每节包含至少 1 个 Exercise
- [ ] M2 的 4 节课 MDX 内容完整
- [ ] M3 的 5 节课 MDX 内容完整
- [ ] M4 的 6 节课 MDX 内容完整
- [ ] 所有参考来源已注明

---

## Step 12: 部署上线

### 任务
- Vercel 项目配置：环境变量（DATABASE_URL, AUTH 相关, etc.）
- 生产数据库配置（Vercel Postgres 或 Supabase）
- 运行 `prisma migrate deploy`
- 运行 `prisma db seed`（初始化课程数据）
- 域名配置（如有）
- 验证生产环境所有功能

### 验证标准
- [ ] 生产环境可正常访问
- [ ] 登录/登出流程正常
- [ ] 课程学习/提交功能正常
- [ ] 管理后台可正常访问和操作
- [ ] 中英文切换正常
