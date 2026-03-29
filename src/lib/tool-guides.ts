import type { Locale } from "@/i18n/routing";

type LocalizedText = {
  zh: string;
  en: string;
};

type ResourceLink = {
  label: LocalizedText;
  href: string;
};

type ToolCommand = {
  command: LocalizedText;
  purpose: LocalizedText;
  scenario: LocalizedText;
};

type FAQItem = {
  question: LocalizedText;
  answer: LocalizedText;
};

type CourseRelation = {
  module: string;
  detail: LocalizedText;
};

type ToolGuide = {
  slug: string;
  name: string;
  category: LocalizedText;
  stage: LocalizedText;
  freeTier: LocalizedText;
  learningCurve: LocalizedText;
  bestFor: LocalizedText;
  oneLiner: LocalizedText;
  overviewReason: LocalizedText;
  resources: ResourceLink[];
  installTitle: LocalizedText;
  installSteps: LocalizedText[];
  commandsTitle: LocalizedText;
  commands: ToolCommand[];
  extraSections?: Array<{
    title: LocalizedText;
    body: LocalizedText[];
  }>;
  courseRelations: CourseRelation[];
  faqs: FAQItem[];
};

type ToolScenarioRecommendation = {
  situation: LocalizedText;
  recommendedTool: string;
  reason: LocalizedText;
};

const text = (zh: string, en: string): LocalizedText => ({ zh, en });

export const toolGuides: ToolGuide[] = [
  {
    slug: "bolt",
    name: "Bolt.new",
    category: text("浏览器", "Browser"),
    stage: text("M1-M3", "M1-M3"),
    freeTier: text("有限免费", "Limited free tier"),
    learningCurve: text("极低", "Very low"),
    bestFor: text("快速原型、静态页面", "Rapid prototypes and static pages"),
    oneLiner: text("打开浏览器就能开始生成页面的原型工具。", "A browser-first prototyping tool that gets you to a first page quickly."),
    overviewReason: text("适合零门槛开始，把想法迅速变成可见页面。", "Great for low-friction starts and fast visible output."),
    resources: [
      { label: text("官网", "Website"), href: "https://bolt.new" },
      { label: text("文档", "Docs"), href: "https://support.bolt.new" },
      { label: text("定价", "Pricing"), href: "https://bolt.new" }
    ],
    installTitle: text("开始使用", "Getting started"),
    installSteps: [
      text("打开 Bolt.new，使用浏览器登录。", "Open Bolt.new and sign in from the browser."),
      text("先用一句话描述你要做的页面，再让它生成第一版。", "Describe the page you want in one sentence and generate the first draft."),
      text("每次迭代只改一个方向，例如颜色、布局或内容层级。", "Iterate one dimension at a time, such as color, layout, or content hierarchy.")
    ],
    commandsTitle: text("常用操作速查", "Quick actions"),
    commands: [
      {
        command: text("自然语言描述页面", "Describe a page in natural language"),
        purpose: text("生成第一个原型", "Generate a first prototype"),
        scenario: text("刚开始验证想法时", "When validating an idea")
      },
      {
        command: text("继续对话微调", "Continue refining through chat"),
        purpose: text("迭代样式与文案", "Iterate copy and style"),
        scenario: text("对首版做小范围修改", "When refining the first draft")
      },
      {
        command: text("导出 / 部署", "Export / deploy"),
        purpose: text("分享结果", "Share the result"),
        scenario: text("需要快速给别人看", "When you need a quick demo")
      }
    ],
    courseRelations: [
      { module: "M1 Unit 1.2", detail: text("用来理解浏览器工具适合什么阶段。", "Used to understand when browser tools fit best.") },
      { module: "M1 Unit 1.3", detail: text("适合做第一个 AI 生成网页。", "Fits the first AI-generated page exercise.") },
      { module: "M2 Unit 2.5", detail: text("适合在需求明确后快速实现 MVP。", "Useful for quickly turning a defined MVP into something demoable.") }
    ],
    faqs: [
      {
        question: text("我完全不会代码，能直接上手吗？", "Can I use it with zero coding experience?"),
        answer: text("可以。它最适合的就是低门槛体验阶段，但复杂项目迟早还是要进入 IDE 或 CLI。", "Yes. It is ideal for low-barrier experimentation, but complex projects eventually need IDE or CLI workflows.")
      },
      {
        question: text("什么时候不该继续用 Bolt.new？", "When should I stop relying on Bolt.new?"),
        answer: text("当你需要稳定管理多文件、验证流程或严格控制项目结构时，就该升级工具。", "Once you need file-level control, stronger verification, or stable project structure, it is time to level up.")
      }
    ]
  },
  {
    slug: "lovable",
    name: "Lovable",
    category: text("浏览器", "Browser"),
    stage: text("M1-M3", "M1-M3"),
    freeTier: text("有限免费", "Limited free tier"),
    learningCurve: text("极低", "Very low"),
    bestFor: text("UI 优先的原型", "UI-first prototypes"),
    oneLiner: text("偏产品与界面表达的浏览器原型工具。", "A browser tool that shines when visual polish and product feel matter early."),
    overviewReason: text("适合做着陆页、产品感更强的前端原型。", "Great for landing pages and frontends where product feel matters."),
    resources: [
      { label: text("官网", "Website"), href: "https://lovable.dev" },
      { label: text("文档", "Docs"), href: "https://docs.lovable.dev" },
      { label: text("定价", "Pricing"), href: "https://lovable.dev/pricing" }
    ],
    installTitle: text("开始使用", "Getting started"),
    installSteps: [
      text("打开官网并创建工作区。", "Open the website and create a workspace."),
      text("先描述页面目标、核心区块和视觉方向。", "Describe the page goal, main sections, and visual direction first."),
      text("每轮只改一个视觉目标，避免一次提太多要求。", "Change one visual target per round to avoid muddy iterations.")
    ],
    commandsTitle: text("常用操作速查", "Quick actions"),
    commands: [
      {
        command: text("描述页面结构", "Describe page structure"),
        purpose: text("生成首版 UI", "Generate an initial UI"),
        scenario: text("做 landing page 或营销页", "When making a landing page")
      },
      {
        command: text("局部改样式", "Refine visual details"),
        purpose: text("调整颜色、排版、层次", "Adjust color, type, and hierarchy"),
        scenario: text("做视觉迭代时", "When refining design")
      },
      {
        command: text("分享预览", "Share preview"),
        purpose: text("快速收集反馈", "Collect feedback quickly"),
        scenario: text("需要给团队或同学看", "When you need to show a preview")
      }
    ],
    courseRelations: [
      { module: "M1 Unit 1.2", detail: text("帮助你理解浏览器工具的产品化优势。", "Helps compare product-oriented browser tools.") },
      { module: "M1 Unit 1.4", detail: text("适合做第一次静态网站模块项目。", "Fits the first module project for static sites.") }
    ],
    faqs: [
      {
        question: text("Lovable 和 Bolt.new 怎么选？", "How do I choose between Lovable and Bolt.new?"),
        answer: text("如果你更在意页面观感和产品表达，优先试 Lovable；如果更在意快速出一个可运行起点，Bolt.new 往往更直接。", "If visual feel matters more, start with Lovable; if speed to a runnable first draft matters more, Bolt.new is often more direct.")
      },
      {
        question: text("它适合做后端复杂逻辑吗？", "Is it good for complex backend logic?"),
        answer: text("不太适合。它更强的是前端表达和快速原型，复杂逻辑建议转到 IDE 或 CLI。", "Not really. It is strongest for frontend expression and prototyping; move to IDE or CLI for heavier logic.")
      }
    ]
  },
  {
    slug: "replit",
    name: "Replit",
    category: text("浏览器", "Browser"),
    stage: text("M1-M3", "M1-M3"),
    freeTier: text("免费层", "Free tier"),
    learningCurve: text("低", "Low"),
    bestFor: text("全栈原型、在线协作", "Full-stack prototypes and online collaboration"),
    oneLiner: text("浏览器里就能跑代码的在线开发环境。", "An in-browser development environment where you can run code immediately."),
    overviewReason: text("适合做在线可运行 demo 和轻量协作。", "Useful for runnable demos and lightweight collaboration."),
    resources: [
      { label: text("官网", "Website"), href: "https://replit.com" },
      { label: text("文档", "Docs"), href: "https://docs.replit.com" },
      { label: text("定价", "Pricing"), href: "https://replit.com/pricing" }
    ],
    installTitle: text("开始使用", "Getting started"),
    installSteps: [
      text("注册 Replit 账号并新建一个 Repl。", "Create a Replit account and open a new Repl."),
      text("选择合适的语言或模板。", "Choose the right language or project template."),
      text("用 AI 生成功能后，立即运行并观察控制台结果。", "Generate with AI, then run immediately and inspect the console output.")
    ],
    commandsTitle: text("常用操作速查", "Quick actions"),
    commands: [
      {
        command: text("创建 Repl", "Create a Repl"),
        purpose: text("快速起一个在线项目", "Start an online project"),
        scenario: text("想马上试运行", "When you want an instant runnable workspace")
      },
      {
        command: text("运行 Run", "Run"),
        purpose: text("执行项目", "Run the project"),
        scenario: text("检查功能是否可用", "When checking whether features work")
      },
      {
        command: text("共享 Share", "Share"),
        purpose: text("共享预览", "Share a preview"),
        scenario: text("做课堂演示或合作", "For demos or collaboration")
      }
    ],
    courseRelations: [
      { module: "M1 Unit 1.2", detail: text("适合理解“浏览器里也能做 demo”的起步路径。", "Useful for understanding browser-based runnable demos.") },
      { module: "M1 Unit 1.3", detail: text("能帮助你快速看到 AI 代码的运行结果。", "Helps you see AI-generated code run quickly.") }
    ],
    faqs: [
      {
        question: text("Replit 和本地 IDE 的最大区别是什么？", "What is the biggest difference between Replit and a local IDE?"),
        answer: text("Replit 的优势是在线即开即用，本地 IDE 的优势是仓库控制力和更完整的工程体验。", "Replit wins on instant setup, while local IDEs win on repository control and fuller engineering workflows.")
      },
      {
        question: text("什么时候该从 Replit 迁出去？", "When should I move beyond Replit?"),
        answer: text("当项目需要更严格的版本管理、调试链路和本地依赖控制时。", "When the project needs stricter versioning, debugging, and local dependency control.")
      }
    ]
  },
  {
    slug: "cursor",
    name: "Cursor",
    category: text("IDE", "IDE"),
    stage: text("M3-M6", "M3-M6"),
    freeTier: text("免费试用", "Free trial"),
    learningCurve: text("中", "Medium"),
    bestFor: text("多文件项目、代码编辑", "Multi-file projects and code editing"),
    oneLiner: text("更适合真实代码库编辑与日常开发的 AI IDE。", "An AI IDE well suited to editing real codebases and daily development."),
    overviewReason: text("适合从原型阶段进入多文件代码协作。", "A natural step up when prototypes become real codebases."),
    resources: [
      { label: text("官网", "Website"), href: "https://cursor.com" },
      { label: text("文档", "Docs"), href: "https://cursor.com/docs" },
      { label: text("定价", "Pricing"), href: "https://cursor.com/pricing" }
    ],
    installTitle: text("安装 / 开始使用", "Install / get started"),
    installSteps: [
      text("下载并安装 Cursor。", "Download and install Cursor."),
      text("打开现有项目或克隆一个仓库。", "Open an existing project or clone a repository."),
      text("先让 AI 解释项目结构，再做一个可验证的小修改。", "Ask AI to explain the codebase first, then make one small verifiable edit.")
    ],
    commandsTitle: text("常用操作速查", "Quick actions"),
    commands: [
      {
        command: text("Chat / Composer", "Chat / Composer"),
        purpose: text("对话式编辑与解释", "Conversational edits and explanations"),
        scenario: text("理解项目或改小功能", "When understanding or editing")
      },
      {
        command: text("Codebase context", "Codebase context"),
        purpose: text("引用整个仓库上下文", "Reference the codebase"),
        scenario: text("做跨文件修改", "For cross-file changes")
      },
      {
        command: text("Inline edit", "Inline edit"),
        purpose: text("局部改写代码", "Edit in place"),
        scenario: text("只动一个函数或组件", "When changing one function or component")
      }
    ],
    courseRelations: [
      { module: "M3", detail: text("适合练习上下文和 prompt 四要素。", "Useful for practicing context and prompt design.") },
      { module: "M4", detail: text("可作为进入工程化工具前的 IDE 过渡层。", "Acts as a bridge before moving fully into CLI workflows.") },
      { module: "M5-M6", detail: text("适合和 Claude Code / Codex 分工协作。", "Works well alongside Claude Code or Codex.") }
    ],
    faqs: [
      {
        question: text("Cursor 能替代 CLI 工具吗？", "Can Cursor replace CLI tools?"),
        answer: text("在很多日常编辑任务里可以，但当你需要更强的计划、验证和终端驱动流程时，CLI 工具会更稳。", "For many daily edits, yes, but CLI tools are stronger when you need planning, verification, and terminal-driven workflows.")
      },
      {
        question: text("最适合什么阶段？", "When does Cursor fit best?"),
        answer: text("当你已经进入真实仓库，但还想保留 IDE 的可视化体验时。", "When you are inside a real repository but still want the comfort of an IDE.")
      }
    ]
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    category: text("IDE", "IDE"),
    stage: text("M3-M6", "M3-M6"),
    freeTier: text("免费试用", "Free trial"),
    learningCurve: text("中", "Medium"),
    bestFor: text("大型代码库、企业级协作", "Large codebases and team-oriented work"),
    oneLiner: text("偏大型仓库和持续开发体验的 AI IDE。", "An AI IDE oriented toward larger codebases and ongoing development."),
    overviewReason: text("适合需要更稳定浏览、导航和团队协作的大项目。", "A good fit for larger projects that need strong navigation and stability."),
    resources: [
      { label: text("官网", "Website"), href: "https://windsurf.com" },
      { label: text("文档", "Docs"), href: "https://docs.windsurf.com" },
      { label: text("定价", "Pricing"), href: "https://windsurf.com/pricing" }
    ],
    installTitle: text("安装 / 开始使用", "Install / get started"),
    installSteps: [
      text("安装 Windsurf 并导入你的代码库。", "Install Windsurf and open your codebase."),
      text("先建立项目规则和常用上下文，再开始批量修改。", "Set project rules and common context before making larger edits."),
      text("把它当成长期项目工具，而不是一次性原型工具。", "Treat it as a long-running project tool rather than a one-off prototype tool.")
    ],
    commandsTitle: text("常用操作速查", "Quick actions"),
    commands: [
      {
        command: text("项目级聊天", "Project-level chat"),
        purpose: text("解释大仓库结构", "Explain large codebases"),
        scenario: text("上手已有项目", "When onboarding to an existing repo")
      },
      {
        command: text("多文件修改", "Multi-file edits"),
        purpose: text("批量改动", "Batch edits"),
        scenario: text("处理模块化重构", "For multi-file refactors")
      },
      {
        command: text("规则约束", "Rule constraints"),
        purpose: text("减少 AI 跑偏", "Reduce drift"),
        scenario: text("长期协作项目", "For long-lived collaboration")
      }
    ],
    courseRelations: [
      { module: "M3-M4", detail: text("适合理解上下文和项目级规则的作用。", "Useful when practicing project-level context and rules.") },
      { module: "M5-M6", detail: text("适合作为大型仓库里的 IDE 协作层。", "Works as an IDE layer for larger repositories.") }
    ],
    faqs: [
      {
        question: text("它和 Cursor 的区别大吗？", "Is it very different from Cursor?"),
        answer: text("两者都属于 AI IDE，但你可以把 Windsurf 理解成更偏长期、较大代码库的工作台。", "Both are AI IDEs, but Windsurf is easier to think of as a workstation for larger, longer-running repositories.")
      },
      {
        question: text("零基础适合直接用吗？", "Is it a good first tool for beginners?"),
        answer: text("通常不建议。更适合作为浏览器工具之后的升级。", "Usually no. It is better as a step up after browser-first tools.")
      }
    ]
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    category: text("CLI", "CLI"),
    stage: text("M4-M8", "M4-M8"),
    freeTier: text("需订阅", "Subscription required"),
    learningCurve: text("中高", "Medium to high"),
    bestFor: text("深度推理、项目级开发", "Deep reasoning and project-level development"),
    oneLiner: text("终端中的 AI 编程助手，擅长在真实仓库里做计划、实现和验证。", "A terminal-native AI coding assistant that excels at planning, implementing, and verifying work inside real repositories."),
    overviewReason: text("最适合需要项目上下文、Plan 模式和多步验证的工作。", "Best when you need project context, planning, and multi-step verification."),
    resources: [
      { label: text("官网", "Website"), href: "https://claude.ai/code" },
      { label: text("文档", "Docs"), href: "https://docs.anthropic.com/en/docs/claude-code" },
      { label: text("定价", "Pricing"), href: "https://www.anthropic.com/pricing" },
      { label: text("GitHub", "GitHub"), href: "https://github.com/anthropics/claude-code" }
    ],
    installTitle: text("安装 / 开始使用", "Install / get started"),
    installSteps: [
      text("前置要求：Node.js 18+，以及有效的 Claude 订阅。", "Prerequisites: Node.js 18+ and an active Claude subscription."),
      text("执行 `npm install -g @anthropic-ai/claude-code`。", "Run `npm install -g @anthropic-ai/claude-code`."),
      text("用 `claude --version` 验证安装，然后执行 `claude` 完成首次认证。", "Verify with `claude --version`, then run `claude` to complete first-time authentication.")
    ],
    commandsTitle: text("常用命令速查", "Command quick reference"),
    commands: [
      { command: text("claude", "claude"), purpose: text("启动交互模式", "Start interactive mode"), scenario: text("在项目目录中开始协作", "Begin collaboration inside a repo") },
      { command: text("shift+tab", "shift+tab"), purpose: text("切换到 Plan 模式", "Switch to Plan mode"), scenario: text("复杂任务先看方案", "Preview the plan before execution") },
      { command: text("/init", "/init"), purpose: text("初始化项目规则", "Initialize project rules"), scenario: text("新项目起步", "At the start of a project") },
      { command: text("/status", "/status"), purpose: text("查看当前状态", "Inspect current state"), scenario: text("确认 AI 理解", "Check understanding") },
      { command: text("/clear", "/clear"), purpose: text("清空对话上下文", "Clear conversation context"), scenario: text("上下文污染时重置", "Reset when context degrades") },
      { command: text("/cost", "/cost"), purpose: text("查看消耗", "Check usage"), scenario: text("成本监控", "Monitor usage") }
    ],
    extraSections: [
      {
        title: text("核心工作模式", "Core working modes"),
        body: [
          text("普通模式：输入指令后直接执行，适合小任务和明确修改。", "Default mode executes directly and fits small, clear tasks."),
          text("Plan 模式：先给方案再执行，适合复杂功能、重要改动和你不确定 AI 会怎么做的时候。", "Plan mode previews the approach before execution and fits larger, riskier changes."),
          text("Ask 模式：在 prompt 中明确要求“先告诉我方案，不要写代码”，适合讨论技术选型和架构决策。", "Ask mode is a prompt pattern where you request the plan only, which fits architecture or tool-choice discussions.")
        ]
      },
      {
        title: text("CLAUDE.md 配置", "CLAUDE.md configuration"),
        body: [
          text("Claude Code 会自动读取项目根目录的 `CLAUDE.md`。这里应该写清项目简介、技术栈、代码规范和文件结构。", "Claude Code reads `CLAUDE.md` from the project root. Use it to encode project purpose, stack, code rules, and file structure."),
          text("把它当成项目级工作手册，而不是随手记一段说明。", "Treat it like a project handbook, not a casual note.")
        ]
      },
      {
        title: text("Skill 与 MCP", "Skill and MCP"),
        body: [
          text("Skill 是给 Claude Code 的领域操作手册，适合沉淀最佳实践。", "Skills act like domain-specific operating manuals for Claude Code."),
          text("MCP 让 Claude Code 连接外部世界，比如文件系统、GitHub、数据库和搜索。", "MCP lets Claude Code connect to external systems such as files, GitHub, databases, and search.")
        ]
      }
    ],
    courseRelations: [
      { module: "M4 Unit 4.3", detail: text("首次安装与基本操作。", "Initial installation and basic operation.") },
      { module: "M4 Unit 4.4", detail: text("用 Claude Code 做完整 CRUD 项目。", "Use Claude Code on a full CRUD project.") },
      { module: "M5 Unit 5.3", detail: text("配合 memory-bank 做跨会话恢复。", "Combine it with memory-bank workflows across sessions.") },
      { module: "M6 Unit 6.2-6.4", detail: text("学习 Skill 和 MCP。", "Learn Skills and MCP.") },
      { module: "M7", detail: text("扩展到多 Agent 工作流。", "Extend into multi-agent workflows.") }
    ],
    faqs: [
      {
        question: text("安装时报权限错误怎么办？", "What if installation says permission denied?"),
        answer: text("先确认 Node/npm 安装正常，再考虑管理员权限或全局 npm 目录配置问题。", "First verify your Node/npm setup, then check admin permissions or global npm directory configuration.")
      },
      {
        question: text("AI 改了不该改的文件怎么办？", "What if it changes files I did not want touched?"),
        answer: text("先中断，然后通过 Git、checkpoint 或更严格的 Plan/Ask 模式回到安全边界。", "Interrupt early, then use Git, checkpoints, or stricter Plan/Ask flows to restore a safe boundary.")
      },
      {
        question: text("为什么对话变长后开始忘事？", "Why does it start forgetting after long conversations?"),
        answer: text("这通常是上下文退化。用 `/clear` 配合 memory-bank 恢复关键上下文会更稳。", "That is usually context degradation. `/clear` plus memory-bank restoration is often more reliable.")
      }
    ]
  },
  {
    slug: "codex",
    name: "Codex",
    category: text("CLI", "CLI"),
    stage: text("M5-M8", "M5-M8"),
    freeTier: text("需订阅", "Subscription required"),
    learningCurve: text("中高", "Medium to high"),
    bestFor: text("异步批量生成、Spec 驱动", "Async batch work and spec-driven execution"),
    oneLiner: text("适合把明确 spec 交给代理后台跑完，再回来审查结果。", "Best when you want to hand a clear spec to an agent, let it run in the background, and review the result later."),
    overviewReason: text("特别适合规格明确、可并行、可审查的任务。", "Especially strong for scoped tasks that can run in parallel and be reviewed afterward."),
    resources: [
      { label: text("官网", "Website"), href: "https://chatgpt.com/codex" },
      { label: text("文档", "Docs"), href: "https://platform.openai.com/docs/codex" },
      { label: text("CLI 仓库", "CLI repo"), href: "https://github.com/openai/codex" },
      { label: text("定价", "Pricing"), href: "https://chatgpt.com/pricing" }
    ],
    installTitle: text("安装 / 开始使用", "Install / get started"),
    installSteps: [
      text("执行 `npm install -g @openai/codex`。", "Run `npm install -g @openai/codex`."),
      text("用 `codex --version` 检查安装。", "Verify installation with `codex --version`."),
      text("执行 `codex auth login` 完成首次认证。", "Run `codex auth login` to complete first-time authentication.")
    ],
    commandsTitle: text("常用命令速查", "Command quick reference"),
    commands: [
      { command: text("codex", "codex"), purpose: text("启动交互模式", "Start interactive mode"), scenario: text("在项目里对话式协作", "Collaborative work inside a repo") },
      { command: text("codex \"指令\"", "codex \"prompt\""), purpose: text("单次执行", "Run a one-off task"), scenario: text("快速任务", "Quick tasks") },
      { command: text("--model", "--model"), purpose: text("指定模型", "Choose a model"), scenario: text("按任务调整能力和成本", "Tune for capability and cost") },
      { command: text("--approval-mode", "--approval-mode"), purpose: text("切换审批模式", "Set approval mode"), scenario: text("控制自动化强度", "Control autonomy") }
    ],
    extraSections: [
      {
        title: text("三种审批模式", "Three approval modes"),
        body: [
          text("suggest：只建议修改，不自动执行，适合学习阶段和关键代码。", "suggest only proposes changes and fits learning phases or critical code."),
          text("auto-edit：自动改文件但不执行命令，适合日常开发。", "auto-edit changes files automatically but does not run commands, which fits daily development."),
          text("full-auto：包含命令执行，适合明确 spec 的批量任务。", "full-auto also runs commands and fits well-scoped batch work with a strong spec.")
        ]
      },
      {
        title: text("AGENTS.md 配置", "AGENTS.md configuration"),
        body: [
          text("Codex 读取项目根目录的 `AGENTS.md`，这里应写清项目说明、技术栈、代码规范与协作规则。", "Codex reads `AGENTS.md` from the project root, where you should define project purpose, tech stack, code rules, and collaboration constraints."),
          text("如果 spec 足够清楚，Codex 在异步执行上的优势会非常明显。", "When the spec is clear, Codex becomes especially strong at async execution.")
        ]
      },
      {
        title: text("Claude Code vs Codex", "Claude Code vs Codex"),
        body: [
          text("Claude Code 更适合强交互、边讨论边收敛；Codex 更适合规格明确、希望并行执行和后台产出的任务。", "Claude Code is stronger for interactive convergence, while Codex is stronger for clearly scoped async execution."),
          text("如果你还在探索方案，先用 Claude Code；如果你已经有 spec 并且想批量推进，优先 Codex。", "If you are still exploring, start with Claude Code; if the spec is ready and you want scale, prefer Codex.")
        ]
      }
    ],
    courseRelations: [
      { module: "M5 Unit 5.4", detail: text("与 Claude Code 做工具协作分工。", "Compare and split work with Claude Code.") },
      { module: "M6-M7", detail: text("适合 spec 驱动、可审查、可并行的工作流。", "Fits spec-driven, reviewable, parallel workflows.") },
      { module: "M8", detail: text("适合持续迭代时批量推进明确任务。", "Useful for pushing clearly defined tasks during continuous iteration.") }
    ],
    faqs: [
      {
        question: text("Codex 最适合什么任务？", "What kinds of tasks fit Codex best?"),
        answer: text("当任务边界清楚、可并行、可审查时，它的优势最明显。", "It works best when tasks are well-bounded, parallelizable, and reviewable.")
      },
      {
        question: text("什么时候不该用 full-auto？", "When should I avoid full-auto?"),
        answer: text("当你还没想清楚 spec，或者修改涉及高风险逻辑、权限、支付、安全边界时。", "Avoid it when the spec is still fuzzy or the changes touch high-risk logic, auth, payment, or security boundaries.")
      }
    ]
  }
];

export const toolScenarioRecommendations: ToolScenarioRecommendation[] = [
  {
    situation: text("完全零基础，想体验一下", "You are brand new and just want to try AI building"),
    recommendedTool: "Bolt.new",
    reason: text("打开浏览器就能用，几分钟内就能看到结果。", "It runs in the browser and gives visible output in minutes.")
  },
  {
    situation: text("有一点基础，想做完整项目", "You have some basics and want to build a fuller project"),
    recommendedTool: "Cursor",
    reason: text("IDE 体验更适合多文件协作和持续编辑。", "An IDE experience works better for multi-file work and ongoing edits.")
  },
  {
    situation: text("想用命令行做大项目", "You want to build a larger project from the terminal"),
    recommendedTool: "Claude Code",
    reason: text("项目级上下文、Plan 模式和验证链路都更强。", "It gives you stronger project context, planning, and verification loops.")
  },
  {
    situation: text("有明确 spec，想批量生成", "You already have a clear spec and want to batch execution"),
    recommendedTool: "Codex",
    reason: text("异步执行和并行推进是它的核心优势。", "Async execution and parallel progress are its biggest strengths.")
  },
  {
    situation: text("不确定选什么", "You are not sure what to pick"),
    recommendedTool: "Bolt.new",
    reason: text("先用最低门槛的工具起步，再根据任务复杂度升级。", "Start with the lowest-friction tool, then upgrade as the task becomes more complex.")
  }
];

export function getToolGuideBySlug(toolSlug: string) {
  return toolGuides.find((tool) => tool.slug === toolSlug) ?? null;
}

export function getLocalizedToolGuide(tool: ToolGuide, locale: Locale) {
  return {
    ...tool,
    category: tool.category[locale],
    stage: tool.stage[locale],
    freeTier: tool.freeTier[locale],
    learningCurve: tool.learningCurve[locale],
    bestFor: tool.bestFor[locale],
    oneLiner: tool.oneLiner[locale],
    overviewReason: tool.overviewReason[locale],
    installTitle: tool.installTitle[locale],
    installSteps: tool.installSteps.map((item) => item[locale]),
    commandsTitle: tool.commandsTitle[locale],
    resources: tool.resources.map((resource) => ({
      label: resource.label[locale],
      href: resource.href
    })),
    commands: tool.commands.map((command) => ({
      command: command.command[locale],
      purpose: command.purpose[locale],
      scenario: command.scenario[locale]
    })),
    extraSections:
      tool.extraSections?.map((section) => ({
        title: section.title[locale],
        body: section.body.map((item) => item[locale])
      })) ?? [],
    courseRelations: tool.courseRelations.map((item) => ({
      module: item.module,
      detail: item.detail[locale]
    })),
    faqs: tool.faqs.map((item) => ({
      question: item.question[locale],
      answer: item.answer[locale]
    }))
  };
}

export function getLocalizedToolGuides(locale: Locale) {
  return toolGuides.map((tool) => getLocalizedToolGuide(tool, locale));
}

export function getLocalizedScenarioRecommendations(locale: Locale) {
  return toolScenarioRecommendations.map((item) => ({
    situation: item.situation[locale],
    recommendedTool: item.recommendedTool,
    reason: item.reason[locale]
  }));
}
