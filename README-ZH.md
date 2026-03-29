# Vibe Coding 学习平台

在线学习地址：[https://vibe-coding-platform-livid-psi.vercel.app](https://vibe-coding-platform-livid-psi.vercel.app)

**方法论驱动的系统化 Vibe Coding 学习路径 — 从零基础到 Agentic Engineering**

[English](README.md)

---

一个免费、开源的 Vibe Coding 学习平台。不只是教工具操作，而是围绕四大方法论原则（规划驱动、上下文固定、胶水编程、闭环交付），构建了从 Vibe Coding 入门到 Agentic Engineering 进阶的完整成长路径。

## 为什么做这个平台

Vibe Coding 已经从 Andrej Karpathy 的一条推文变成了全球开发者的日常工作方式。但大多数人在实践中遇到的问题不是"不会用工具"，而是：

- 缺乏系统化的学习路径，不知道先学什么后学什么
- Vibe coding 过程中需求模糊、上下文混乱、产出不稳定、返工严重
- 对 Skill、MCP、CLAUDE.md 等概念有所耳闻，但不知道它们如何提升 vibe coding 质量
- 缺少阶段目标和练习反馈，难以判断自己是否真正进步

本平台试图系统性地解决这些问题。

## 课程体系

8 个模块，37 个学习单元，约 250 个递进式练习，8 个实战项目。

### 基础阶段

| 模块 | 内容 | 时长 |
|------|------|------|
| M1 觉醒与认知 | Vibe Coding 是什么、三种模式对比、工具全景、第一个 AI 网页 | ~1 周 |
| M2 需求定义与产品思维 | 灵魂三问、MVP 思维、P0/P1/P2 功能分级、用户旅程地图 | ~1.5 周 |
| M3 提示词工程 | 上下文原则、四要素框架、CLAUDE.md 编写、反模式识别 | ~2 周 |

### 进阶阶段

| 模块 | 内容 | 时长 |
|------|------|------|
| M4 规划驱动与工作流 | PRD 编写、Implementation Plan、PEV 循环、Claude Code 上手 | ~2 周 |
| M5 迭代交付与 Debug | 分步实施、AI 辅助 debug、Memory Bank、版本控制、Codex 入门 | ~2 周 |
| M6 扩展能力 | 上下文工程、Skill 系统、元技能、MCP 协议、全栈项目实战 | ~2 周 |

### 高级阶段（进阶选修）

| 模块 | 内容 | 时长 |
|------|------|------|
| M7 Agentic Engineering | 多 Agent 工作流、Sub-agents、自动化集成、质量守卫 | ~2 周 |
| M8 部署与持续进化 | 部署方案、安全检查、持续迭代、个人知识体系建设、毕业项目 | ~1.5 周 |

### 四大方法论原则

贯穿全部课程的思想主线，来自 [2025Emma/vibe-coding-cn](https://github.com/2025Emma/vibe-coding-cn)：

- **规划驱动** — 规划就是一切。不写 Plan 就让 AI 开干，代码库会变成无法管理的混乱
- **上下文固定** — 通过 CLAUDE.md、Memory Bank 把项目记忆固化，AI 才能在长期协作中保持一致
- **胶水编程** — 不让 AI 从零生成代码（幻觉根源），而是让 AI 把成熟模块连接起来
- **闭环交付** — 需求 → 上下文文档 → 实施计划 → 分步实现 → 自测 → 进度记录，全程可复盘

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + shadcn/ui |
| 数据库 | PostgreSQL |
| ORM | Prisma |
| 认证 | Auth.js v5 (GitHub / Google OAuth) |
| 内容 | MDX + next-mdx-remote + Shiki |
| 国际化 | next-intl（中文 / 英文） |
| 部署 | Vercel |

## 快速开始

### 前置要求

- Node.js 18+
- PostgreSQL（本地或 Docker）
- GitHub OAuth App 和/或 Google OAuth 凭据

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/Ornn8/vibe-coding-platform.git
cd vibe-coding-platform

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入数据库连接和 OAuth 凭据

# 初始化数据库
npx prisma migrate dev
npx prisma db seed

# 启动开发服务器
npm run dev
```

访问 `http://localhost:3000/zh` 查看中文版，`http://localhost:3000/en` 查看英文版。

### Docker 开发环境

```bash
# 启动 PostgreSQL
docker run --name vibe-pg \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=vibe \
  -p 5432:5432 -d postgres:16

# .env.local 中设置
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vibe"
```

### 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run lint         # 代码检查
npx tsc --noEmit     # 类型检查
npx prisma studio    # 数据库 GUI
npx prisma db seed   # 初始化课程数据
```

## 项目结构

```
src/
├── app/
│   ├── [locale]/              # 国际化路由 (zh / en)
│   │   ├── (learn)/           # 学习端（模块列表、课时页、项目提交、个人中心、工具参考）
│   │   ├── (admin)/           # 管理端（仪表盘、内容管理、用户管理、项目审阅）
│   │   └── page.tsx           # 首页
│   └── api/                   # API 路由
├── components/
│   ├── ui/                    # shadcn/ui 组件
│   ├── learn/                 # 学习端组件
│   ├── admin/                 # 管理端组件
│   └── shared/                # 共享组件（MDX 渲染、导航等）
├── content/
│   ├── zh/                    # 中文课程 MDX 文件
│   │   ├── m1/ ... m8/        # 按模块组织
│   │   └── tools/             # 工具参考指南
│   └── en/                    # 英文课程 MDX 文件
├── lib/                       # 数据库、认证、MDX 加载等工具
└── i18n/                      # 国际化字符串
```

## 平台功能

### 学习端

- 课程浏览与学习（MDX 渲染 + 代码高亮）
- 学习单元内的递进式练习
- 模块项目与自评清单
- 个人中心（进度追踪、学习统计、连续学习天数）
- Prompt Portfolio 管理
- 工具参考区（Claude Code / Codex / Cursor / Bolt.new 等安装指南和命令速查）

### 管理端

- 数据看板（用户统计、模块漏斗、活跃趋势）
- 课程内容管理（模块 / 单元 CRUD）
- 用户管理（角色切换、学习轨迹查看）
- 项目审阅队列

## 知识来源与致谢

本平台的课程内容基于以下开源项目的方法论和概念框架重新编写，不直接搬运原文：

| 项目 | 协议 | 引用内容 |
|------|------|----------|
| [datawhalechina/vibe-vibe](https://github.com/datawhalechina/vibe-vibe) | CC BY-NC-SA 4.0 | 学习路线、课程编排、产品思维教学 |
| [2025Emma/vibe-coding-cn](https://github.com/2025Emma/vibe-coding-cn) | MIT | 四大方法论原则、Ask/Plan 工作流、CLAUDE.md 设计、Skill 体系、提示词库 |
| [datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) | CC BY-NC-SA 4.0 | 上下文工程、MCP 协议、Agent Skills 概念 |

同时参考了 Andrej Karpathy 关于 Vibe Coding 和 Agentic Engineering 的公开论述，以及行业内 PEV 循环、胶水编程等实践方法。

## 路线图

- [x] 平台架构与核心功能
- [x] M1-M8 完整课程内容（中英文）
- [x] 工具参考区（安装指南、命令速查、Skill/MCP 配置）
- [x] 管理后台
- [ ] 生产部署
- [ ] 社区功能：作品展示墙
- [ ] 社区功能：Prompt / Skill 共享库
- [ ] 社区功能：组队学习 / 学习小组
- [ ] 社区功能：周期性挑战赛
- [ ] 后台内容所见即所得编辑器

## 贡献

欢迎贡献！你可以通过以下方式参与：

- 提交课程内容的改进建议（Issue）
- 修复 bug 或改进功能（PR）
- 补充工具指南或教程
- 翻译内容到其他语言
- 分享你的学习体验和反馈

## 协议

本项目代码采用 [MIT License](LICENSE) 开源。

课程内容参考的部分开源项目使用 CC BY-NC-SA 4.0 协议，本平台课程内容为基于原始方法论重新编写的原创内容，并在相关课节中注明参考来源。
