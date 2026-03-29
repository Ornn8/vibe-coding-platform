# Step 10 执行计划 — 工具参考区 + 收尾打磨

---

## 一、工具参考区内容设计

工具参考区不是课程的一部分，而是学习过程中随时查阅的"速查手册"。
路由：`/zh/tools` 和 `/en/tools`

### 1.1 页面结构

```
/tools                          → 工具总览页（所有工具卡片 + 对比表）
/tools/bolt                     → Bolt.new 快速指南
/tools/lovable                  → Lovable 快速指南
/tools/cursor                   → Cursor 快速指南
/tools/windsurf                 → Windsurf 快速指南
/tools/claude-code              → Claude Code 完整指南（重点）
/tools/codex                    → Codex 完整指南（重点）
```

### 1.2 工具总览页（/tools）

页面内容：

**顶部：工具选择指南**
一段简短的导语：根据你当前的学习阶段和需求，选择合适的工具。

**核心对比表格**

| 工具 | 类型 | 适合阶段 | 免费额度 | 学习曲线 | 适合做什么 | 官方文档 |
|------|------|----------|----------|----------|-----------|---------|
| Bolt.new | 浏览器 | M1-M3 | 有限免费 | 极低 | 快速原型、静态页面 | [链接] |
| Lovable | 浏览器 | M1-M3 | 有限免费 | 极低 | UI 优先的原型 | [链接] |
| Replit | 浏览器 | M1-M3 | 免费层 | 低 | 全栈原型、在线协作 | [链接] |
| Cursor | IDE | M3-M6 | 免费试用 | 中 | 多文件项目、代码编辑 | [链接] |
| Windsurf | IDE | M3-M6 | 免费试用 | 中 | 大型代码库、企业级 | [链接] |
| Claude Code | CLI | M4-M8 | 需订阅 | 中高 | 深度推理、项目级开发 | [链接] |
| Codex | CLI | M5-M8 | 需订阅 | 中高 | 异步批量生成、Spec 驱动 | [链接] |

**底部：按场景推荐**

| 你的情况 | 推荐工具 | 理由 |
|----------|----------|------|
| 完全零基础，想体验一下 | Bolt.new | 打开浏览器就能用，3 分钟出结果 |
| 有一点基础，想做完整项目 | Cursor | IDE 体验，多文件操作方便 |
| 想用命令行做大项目 | Claude Code | 深度理解项目上下文，Plan 模式强大 |
| 有明确 spec，想批量生成 | Codex | 异步执行，适合并行开发 |
| 不确定选什么 | 从 Bolt.new 开始 | 零成本试用，不满意再切换 |

---

### 1.3 各工具快速指南的内容模板

每个工具页面统一使用以下结构：

```
## [工具名]

### 一句话定位
[这个工具是什么、最适合做什么]

### 官方资源
- 官网：[链接]
- 文档：[链接]
- 定价：[链接]
- GitHub（如有）：[链接]

### 安装 / 开始使用
[具体步骤，区分操作系统]

### 常用命令 / 操作速查
[表格形式]

### 与课程的对应关系
[在哪些模块会用到这个工具]

### 常见问题
[3-5 个 FAQ]
```

---

### 1.4 Claude Code 完整指南（重点页面）

这是课程中最核心的工具，内容要最详细。

```markdown
## Claude Code

### 一句话定位
终端中运行的 AI 编程助手，能理解你整个项目的上下文，直接修改文件。

### 官方资源
- 官网：https://claude.ai/code
- 文档：https://docs.anthropic.com/en/docs/claude-code
- 定价：包含在 Claude Pro ($20/月) 或 Max ($100/月) 订阅中
- GitHub：https://github.com/anthropics/claude-code

### 安装

#### 前置要求
- Node.js 18+ 已安装（检查：终端输入 `node -v`）
- 有效的 Claude Pro 或 Max 订阅

#### 安装步骤

**macOS / Linux：**
```bash
npm install -g @anthropic-ai/claude-code
```

**Windows：**
```bash
npm install -g @anthropic-ai/claude-code
```

**验证安装：**
```bash
claude --version
```

**首次登录：**
```bash
claude
# 首次运行会打开浏览器进行 OAuth 认证
# 认证完成后终端显示 "Authenticated successfully"
```

### 常用命令速查

| 命令 / 快捷键 | 作用 | 使用场景 |
|---------------|------|----------|
| `claude` | 启动交互模式 | 在项目目录中开始对话 |
| `shift+tab` | 切换到 Plan 模式 | 让 AI 先说方案再执行 |
| `claude "你的指令"` | 单次执行 | 快速完成一个小任务 |
| `/init` | 初始化项目 CLAUDE.md | 新项目的第一步 |
| `/status` | 查看当前状态 | 确认 AI 对项目的理解 |
| `/clear` | 清除对话历史 | 上下文污染时重置 |
| `/cost` | 查看本次消耗 | 监控 API 用量 |
| `/help` | 查看所有命令 | 忘记命令时 |
| `Ctrl+C` | 中断当前操作 | AI 跑偏时停止 |
| `Esc` | 取消当前输入 | 放弃正在写的 prompt |

### 核心工作模式

**普通模式（默认）**
输入指令 → AI 直接执行 → 修改文件

**Plan 模式（shift+tab）**
输入指令 → AI 输出方案但不执行 → 你确认后再执行
推荐场景：复杂功能、不确定 AI 会怎么做、重要修改

**Ask 模式**
在 prompt 中明确说"请先告诉我你的方案，不要写代码"
推荐场景：技术选型讨论、架构决策

### CLAUDE.md 配置

Claude Code 启动时会自动读取项目根目录的 `CLAUDE.md` 文件。
这是你告诉 AI "这个项目的规则"的地方。

```markdown
# CLAUDE.md 最小模板

## 项目简介
[一句话说清做什么]

## 技术栈
[列出框架、语言、主要依赖]

## 代码规范
- [规则 1]
- [规则 2]
- [规则 3]

## 文件结构
[主要目录说明]
```

详细教程见课程 M3 Unit 3.4。

### Skill 安装与使用

#### 什么是 Skill
Skill 是给 Claude Code 的"领域知识手册"。
加载 Skill 后，AI 在处理相关任务时会遵循最佳实践。

#### 安装方法

**方法 1：项目内 Skill（推荐）**
在项目根目录创建 `.claude/skills/` 目录：
```bash
mkdir -p .claude/skills
```

将 SKILL.md 文件放入：
```bash
.claude/skills/
├── postgresql/
│   └── SKILL.md
└── tailwind/
    └── SKILL.md
```

Claude Code 启动时自动加载该目录下的所有 Skill。

**方法 2：全局 Skill**
放在用户目录下，所有项目共享：
```bash
~/.claude/skills/
```

**方法 3：从 vibe-coding-cn 获取现成 Skill**
```bash
# 克隆仓库
git clone https://github.com/2025Emma/vibe-coding-cn.git

# 复制需要的 Skill 到你的项目
cp -r vibe-coding-cn/i18n/zh/skills/postgresql .claude/skills/
```

#### 可用的现成 Skill（来自 vibe-coding-cn）

| Skill | 文件大小 | 用途 |
|-------|---------|------|
| claude-code-guide | 9KB | Claude Code 使用最佳实践 |
| claude-cookbooks | 9KB | Claude API 调用模式 |
| postgresql | 76KB | PostgreSQL 数据库专家知识 |
| telegram-dev | 18KB | Telegram Bot 开发 |
| claude-skills (元技能) | 11KB | 用来生成新 Skill 的 Skill |

完整列表见：https://github.com/2025Emma/vibe-coding-cn/tree/main/i18n/zh/skills

#### 编写自己的 Skill

```markdown
---
name: my-skill
description: "描述这个 Skill 做什么 + 什么时候触发"
---

# My Skill

## 核心规则
- 规则 1
- 规则 2

## 模式（Do & Don't）
✅ 应该这样做...
❌ 不要这样做...

## 示例
[给出具体的代码/prompt 示例]
```

详细教程见课程 M6 Unit 6.3。

### MCP 配置

#### 什么是 MCP
MCP (Model Context Protocol) 让 Claude Code 连接外部工具和数据源。

#### 配置方法
在项目根目录创建 `.claude/mcp.json`：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    }
  }
}
```

#### 常用 MCP 服务器

| 服务器 | 安装命令 | 用途 |
|--------|---------|------|
| filesystem | `npx @modelcontextprotocol/server-filesystem` | 文件系统访问 |
| github | `npx @modelcontextprotocol/server-github` | GitHub 仓库操作 |
| postgres | `npx @modelcontextprotocol/server-postgres` | PostgreSQL 数据库 |
| sqlite | `npx @modelcontextprotocol/server-sqlite` | SQLite 数据库 |
| brave-search | `npx @modelcontextprotocol/server-brave-search` | 网页搜索 |
| fetch | `npx @modelcontextprotocol/server-fetch` | HTTP 请求 |

MCP 注册表：https://github.com/modelcontextprotocol/servers

详细教程见课程 M6 Unit 6.4。

### 常见问题

**Q: 安装报错 "permission denied"**
A: 使用 `sudo npm install -g @anthropic-ai/claude-code`（macOS/Linux）
   或以管理员身份运行终端（Windows）

**Q: 登录后提示"subscription required"**
A: Claude Code 需要 Claude Pro ($20/月) 或 Max ($100/月) 订阅

**Q: AI 修改了不该改的文件**
A: 使用 Git 回退：`git checkout -- 文件名`
   或使用 Claude Code 的 checkpoint 功能回退

**Q: 对话太长 AI 开始"忘事"**
A: 用 `/clear` 清除历史，然后用 memory-bank prompt 恢复上下文
   （见课程 M5 Unit 5.3）

**Q: 如何控制 API 用量**
A: 用 `/cost` 查看当前消耗。Plan 模式比直接执行消耗少（因为先看方案再决定是否执行）

### 与课程的对应关系

| 模块 | 怎么用 Claude Code |
|------|-------------------|
| M4 Unit 4.3 | 首次安装和基本操作 |
| M4 Unit 4.4 | 用 Claude Code 做 CRUD 项目 |
| M5 Unit 5.3 | Memory Bank 工作流 |
| M5 Unit 5.4 | 与 Codex 的协作分工 |
| M6 Unit 6.2-6.4 | Skill 和 MCP 配置 |
| M7 | 多 Agent 工作流 |
```

---

### 1.5 Codex 完整指南（重点页面）

```markdown
## Codex (OpenAI)

### 一句话定位
异步代码生成代理，给它一个 Spec，它在后台完成，你回来看结果。

### 官方资源
- 官网：https://chatgpt.com/codex
- 文档：https://platform.openai.com/docs/codex
- CLI 工具：https://github.com/openai/codex
- 定价：包含在 ChatGPT Pro 订阅中

### 安装

```bash
npm install -g @openai/codex
```

**验证：**
```bash
codex --version
```

**首次登录：**
```bash
codex auth login
# 会打开浏览器进行认证
```

### 常用命令速查

| 命令 | 作用 | 使用场景 |
|------|------|----------|
| `codex` | 启动交互模式 | 在项目中对话式开发 |
| `codex "指令"` | 单次执行 | 快速任务 |
| `codex --model` | 指定模型 | 选择不同能力级别 |
| `codex --approval-mode` | 审批模式 | suggest/auto-edit/full-auto |

### 三种审批模式

| 模式 | 说明 | 推荐场景 |
|------|------|----------|
| suggest | AI 只建议修改，不自动执行 | 学习阶段、重要代码 |
| auto-edit | AI 自动编辑文件，但不执行命令 | 日常开发 |
| full-auto | AI 完全自动执行（包括运行命令） | 明确 spec 的批量任务 |

### AGENTS.md 配置

Codex 读取项目根目录的 `AGENTS.md` 文件（等价于 Claude Code 的 CLAUDE.md）。

```markdown
# AGENTS.md 最小模板

## 项目简介
[一句话说清做什么]

## 技术栈
[列出框架、语言、主要依赖]

## 代码规范
- [规则 1]
- [规则 2]
```

### Claude Code vs Codex 选择指南

| 维度 | Claude Code | Codex |
|------|------------|-------|
| 交互方式 | 实时对话 | 可异步执行 |
| 最佳场景 | 探索性开发、debug、架构讨论 | 明确 spec 的实现、批量任务 |
| 上下文理解 | 深度理解项目结构 | 同样读取项目文件 |
| Plan 模式 | shift+tab | suggest 模式 |
| 配置文件 | CLAUDE.md | AGENTS.md |
| 推理深度 | 更深（适合复杂问题） | 更快（适合明确任务） |

**经验法则：**
- "我不太确定怎么做" → Claude Code（对话探索）
- "我知道要做什么，请帮我实现" → Codex（给 spec 执行）
- "这个 bug 我找不到原因" → Claude Code（深度推理）
- "这 5 个页面都按这个模式生成" → Codex（批量任务）

### 常见问题

**Q: Codex 和 Claude Code 能同时用吗？**
A: 可以。一个项目可以同时有 CLAUDE.md 和 AGENTS.md。
   用 Claude Code 做架构决策和 debug，用 Codex 做批量实现。

**Q: AGENTS.md 和 CLAUDE.md 内容一样吗？**
A: 大部分可以一样（项目简介、技术栈、规范）。
   但可以针对各自工具的特点做微调。

### 与课程的对应关系

| 模块 | 怎么用 Codex |
|------|-------------|
| M5 Unit 5.4 | 首次使用 + 与 Claude Code 的对比 |
| M7 | 多 Agent 工作流中的执行 Agent |
| M8 | 批量功能实现 |
```

---

### 1.6 浏览器工具快速指南（Bolt.new / Lovable / Replit）

这三个工具指南相对简单，每个包含：

- 一句话定位
- 官网链接 + 注册链接
- 30 秒上手步骤（打开 → 注册 → 输入 prompt → 看结果）
- 免费额度说明
- 3 个最适合的使用场景
- 导出代码到本地的方法（为后续切换到 IDE/CLI 做准备）
- 与课程的对应关系（M1-M3）

### 1.7 IDE 工具快速指南（Cursor / Windsurf）

每个包含：

- 一句话定位
- 官网 + 下载链接
- 安装步骤（下载 → 安装 → 首次配置）
- 核心快捷键速查表（5-8 个最常用）
- AI 功能的使用方式（Composer / 内联编辑 / Chat）
- .cursorrules 配置说明（Cursor）
- 与课程的对应关系（M3-M6）

---

## 二、Landing Page 设计

路由：`/zh`（首页）和 `/en`

### 页面结构

**Hero Section**
- 标题：学会 Vibe Coding，用 AI 把想法变成产品
- 副标题：从零基础到 Agentic Engineering，方法论驱动的系统化学习路径
- CTA 按钮：开始学习（→ /modules）| 查看课程大纲（→ #overview）
- 背景：简洁的渐变或几何图形

**课程概览 (#overview)**
- 8 个模块的卡片预览（标题 + 一句话描述 + 预计时长 + Unit 数量）
- M7-M8 标记为"进阶选修"
- 学习路线可视化（M1→M2→...→M8 的流程）

**四大方法论原则**
- 规划驱动 / 上下文固定 / 胶水编程 / 闭环交付
- 每个原则一个卡片：图标 + 一句话 + 简要说明

**数据亮点**
- 8 个模块 | 37 个学习单元 | ~250 个练习 | 8 个递进式项目

**开源声明**
- MIT 协议 | GitHub 链接 | 参考来源致谢

**Footer**
- 知识来源链接（vibe-vibe / vibe-coding-cn / hello-agents）
- GitHub 仓库链接
- 语言切换

---

## 三、全局收尾清单

### 3.1 错误处理

| 文件 | 位置 | 内容 |
|------|------|------|
| `not-found.tsx` | `src/app/[locale]/` | 404 页面（含返回首页链接） |
| `error.tsx` | `src/app/[locale]/` | 全局错误边界（含重试按钮） |
| `error.tsx` | `src/app/[locale]/(learn)/` | 学习端错误边界 |
| `error.tsx` | `src/app/[locale]/(admin)/` | 管理端错误边界 |
| `loading.tsx` | `src/app/[locale]/(learn)/modules/` | 模块列表骨架屏 |
| `loading.tsx` | `src/app/[locale]/(learn)/modules/[moduleSlug]/[unitSlug]/` | Unit 内容骨架屏 |

### 3.2 SEO

| 页面 | title | description |
|------|-------|-------------|
| 首页 | Vibe Coding 学习平台 — 用 AI 把想法变成产品 | 方法论驱动的系统化 Vibe Coding 学习路径，从零基础到 Agentic Engineering |
| 模块列表 | 课程模块 — Vibe Coding 学习平台 | 8 个模块，37 个学习单元，覆盖从入门到进阶的完整学习路径 |
| Unit 页面 | {Unit 标题} — {模块名} | {Unit description} |
| 工具参考 | 工具参考 — Vibe Coding 学习平台 | Claude Code、Codex、Cursor 等 Vibe Coding 工具的安装指南和使用速查 |

每个页面需要 og:title / og:description / og:image。
og:image 可以用一个通用的平台 banner（放在 /public/og-image.png）。

### 3.3 响应式检查清单

- [ ] 首页 Hero 在移动端正常显示
- [ ] 侧边栏在移动端变为抽屉式（Sheet 组件）
- [ ] 模块卡片在移动端单列排列
- [ ] Unit 内容页在移动端阅读体验正常（文字不溢出、表格可横向滚动）
- [ ] 工具参考页的表格在移动端可横向滚动
- [ ] 练习组件在移动端可正常提交
- [ ] 管理后台在平板端可用（不要求手机端完美）

### 3.4 性能优化

- [ ] 所有图片使用 `next/image` 组件
- [ ] MDX 内容使用动态导入（`dynamic(() => import(...))`）
- [ ] Shiki 代码高亮在服务端渲染
- [ ] 工具参考页的长内容使用 Suspense 分段加载
- [ ] Lighthouse Performance ≥ 80

---

## 四、Codex 执行指令

分三步执行：

### 步骤 1：工具参考区页面骨架

```
阅读 CLAUDE.md 了解项目上下文。

创建工具参考区：

1. 创建路由结构：
   src/app/[locale]/(learn)/tools/page.tsx          → 工具总览
   src/app/[locale]/(learn)/tools/[toolSlug]/page.tsx → 各工具详情

2. 工具总览页 (/tools)：
   - 顶部导语
   - 工具对比表格（响应式，移动端可横滚）
   - 按场景推荐表格
   - 每个工具卡片可点击进入详情页

3. 支持的 toolSlug：bolt, lovable, replit, cursor, windsurf, claude-code, codex

4. 各工具详情页用 MDX 渲染。在 src/content/zh/tools/ 和 src/content/en/tools/ 
   下创建对应 MDX 文件。

先创建页面骨架和路由，MDX 内容下一步填充。
```

### 步骤 2：工具参考 MDX 内容

```
阅读 CLAUDE.md。

按照 Step 10 执行计划中 1.4-1.7 节的内容设计，
生成以下 MDX 文件：

src/content/zh/tools/claude-code.mdx   → Claude Code 完整指南（最详细）
src/content/zh/tools/codex.mdx          → Codex 完整指南
src/content/zh/tools/cursor.mdx         → Cursor 快速指南
src/content/zh/tools/windsurf.mdx       → Windsurf 快速指南
src/content/zh/tools/bolt.mdx           → Bolt.new 快速指南
src/content/zh/tools/lovable.mdx        → Lovable 快速指南
src/content/zh/tools/replit.mdx         → Replit 快速指南

每个文件严格按照 Step 10 执行计划中的内容模板编写。
Claude Code 和 Codex 的指南要最完整（含安装步骤、命令速查、
Skill 安装、MCP 配置、FAQ）。
浏览器工具的指南可以简短一些。

所有外部链接必须指向真实的官方文档地址。
```

### 步骤 3：Landing Page + 全局收尾

```
阅读 CLAUDE.md。

1. 创建 Landing Page：src/app/[locale]/page.tsx
   按照 Step 10 执行计划第二节的设计：
   Hero → 课程概览 → 四大方法论 → 数据亮点 → 开源声明 → Footer

2. 全局收尾：
   - 创建 not-found.tsx 和 error.tsx 
   - 各路由组的 loading.tsx 骨架屏
   - 配置 SEO metadata（layout.tsx 中的 generateMetadata）
   - 创建 /public/og-image.png 占位图
   - 响应式检查和修复
```
