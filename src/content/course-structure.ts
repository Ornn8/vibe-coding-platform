import type { ModuleDefinition } from "./types";

export const courseStructure: ModuleDefinition[] = [
  {
    slug: "m1",
    order: 1,
    tier: "CORE",
    durationWeeks: 1.5,
    title: {
      zh: "觉醒与认知",
      en: "Awakening to Vibe Coding"
    },
    description: {
      zh: "理解 Vibe Coding 为什么成立、该如何开始上手，并在第一个模块里建立“先想清楚、再动手”的学习节奏。",
      en: "Understand why Vibe Coding matters, how to get started, and how to build a planning-first learning rhythm from day one."
    },
    lessons: [
      {
        slug: "1.1-what-is-vibe-coding",
        order: 1,
        title: { zh: "Vibe Coding 是什么，为什么现在要学", en: "What Vibe Coding Is and Why Now Is the Time to Learn It" },
        description: { zh: "认识 Vibe Coding 的起点、三种协作模式的区别，以及它为什么会在当下成为关键能力。", en: "Understand the origin of Vibe Coding, compare the main collaboration modes, and see why it matters right now." },
        estimatedMins: 35,
        methodologyTag: { zh: "规划驱动", en: "Planning-Driven" },
        exercise: {
          title: { zh: "解释 Vibe Coding", en: "Explain Vibe Coding" },
          description: { zh: "用自己的话说明 Vibe Coding 是什么，并判断一个新场景更适合哪种协作模式。", en: "Explain Vibe Coding in your own words and decide which collaboration mode fits a new scenario." }
        }
      },
      {
        slug: "1.2-tool-landscape",
        order: 2,
        title: { zh: "工具地图：选对你的第一把武器", en: "Tool Map: Choose the Right First Tool" },
        description: { zh: "理解浏览器工具、IDE 工具和 CLI 工具的差异，做出符合当前阶段的起步选择。", en: "Understand the differences between browser tools, IDE tools, and CLI tools so you can choose a sensible starting point." },
        estimatedMins: 30,
        methodologyTag: { zh: "规划驱动", en: "Planning-Driven" },
        exercise: {
          title: { zh: "选择你的起步工具", en: "Choose Your Starting Tool" },
          description: { zh: "比较三类 AI 工具的适用场景，并写出你当前最适合的起步组合与理由。", en: "Compare three categories of AI tools and choose the starting stack that best fits you." }
        }
      },
      {
        slug: "1.3-first-ai-webpage",
        order: 3,
        title: { zh: "动手：你的第一个 AI 生成网页", en: "Hands-On: Your First AI-Generated Web Page" },
        description: { zh: "跟着示例做出一个简单网页，学会用 prompt 驱动迭代，并开始观察 AI 产出的文件结构。", en: "Build a simple page, iterate with prompts, and start reading the structure of what AI generates." },
        estimatedMins: 35,
        methodologyTag: { zh: "规划驱动", en: "Planning-Driven" },
        exercise: {
          title: { zh: "生成并迭代你的第一页", en: "Generate and Iterate on Your First Page" },
          description: { zh: "做出一个个人介绍页，记录至少三轮 prompt 修改，并说明每次修改带来的变化。", en: "Create a simple personal page, document three prompt iterations, and explain what changed each time." }
        }
      },
      {
        slug: "1.4-module-project",
        order: 4,
        title: { zh: "模块项目：做一个完整的静态网站", en: "Module Project: Build a Complete Static Site" },
        description: { zh: "在第一次模块项目里体验“先计划、再执行”的节奏，把一个小而完整的静态网站做出来。", en: "Experience the rhythm of planning before execution by building a small but complete static site." },
        estimatedMins: 40,
        methodologyTag: { zh: "规划驱动", en: "Planning-Driven" },
        exercise: {
          title: { zh: "提交你的模块计划", en: "Submit Your Module Plan" },
          description: { zh: "先写清楚选题、页面结构和风格方向，再开始实现并提交部署链接与 prompt 记录。", en: "Write down your topic, page structure, and style direction before you build and submit the result." }
        }
      }
    ],
    project: {
      title: { zh: "模块项目：完整静态网站", en: "Module Project: Complete Static Site" },
      description: { zh: "围绕一个足够小但完整的问题，做出一个可以展示、可以复盘的静态网站作品。", en: "Build a static site around a small but complete problem that you can demo and review." },
      checklist: [
        { zh: "我先完成了项目计划，再开始生成页面", en: "I completed the project plan before generating pages" },
        { zh: "我记录了核心 prompts 和关键迭代决策", en: "I documented the core prompts and key iteration decisions" },
        { zh: "我提供了可访问的演示链接或完整截图", en: "I provided a live demo link or a complete screenshot set" }
      ]
    }
  },
  {
    slug: "m2",
    order: 2,
    tier: "CORE",
    durationWeeks: 2,
    title: {
      zh: "需求定义与产品思维",
      en: "Requirement Definition and Product Thinking"
    },
    description: {
      zh: "把模糊想法压缩成 AI 能执行的产品定义，并学会用需求文档为后续实现搭桥。",
      en: "Turn fuzzy ideas into actionable product definitions and use requirement docs to bridge into implementation."
    },
    lessons: [
      {
        slug: "2.1-why-vibe-projects-crash",
        order: 1,
        title: { zh: "为什么你的 Vibe Coding 总是翻车", en: "Why Your Vibe Coding Keeps Going Off the Rails" },
        description: { zh: "从真实失败案例里看清楚：很多失控并不是工具不行，而是需求根本没有被定义清楚。", en: "Use failure case studies to see that many AI build failures begin with weak problem definition, not weak tools." },
        estimatedMins: 35,
        methodologyTag: { zh: "规划驱动", en: "Planning-Driven" },
        exercise: {
          title: { zh: "复盘一个翻车案例", en: "Review a Failed Build" },
          description: { zh: "选一个失败的产品想法或 demo，分析它具体是在哪个定义环节开始失控的。", en: "Choose a failed idea or demo and identify the requirement-definition mistakes that caused it to drift." }
        }
      },
      {
        slug: "2.2-soul-questions",
        order: 2,
        title: { zh: "灵魂三问：用户、痛点、方案", en: "The Soul Questions: User, Pain, and Solution" },
        description: { zh: "把“谁在用、为什么痛、为什么选你”说清楚，才能让后续的 prompt 和计划不跑偏。", en: "Clarify user, pain, and differentiation so later prompts and plans stay grounded." },
        estimatedMins: 40,
        methodologyTag: { zh: "规划驱动", en: "Planning-Driven" },
        exercise: {
          title: { zh: "回答你的灵魂三问", en: "Answer Your Soul Questions" },
          description: { zh: "围绕一个具体项目，补全目标用户、核心痛点和差异化方案，并整理成一段需求描述。", en: "Complete the target user, core pain point, and differentiated solution for one project and turn them into a coherent requirement statement." }
        }
      },
      {
        slug: "2.3-mvp-and-prioritization",
        order: 3,
        title: { zh: "MVP 与功能优先级", en: "MVP and Feature Prioritization" },
        description: { zh: "用 MVP 和 P0/P1/P2 框架压住范围，让 AI 先解决最需要被验证的核心问题。", en: "Use MVP and P0/P1/P2 thinking to keep scope under control and focus AI on the core problem first." },
        estimatedMins: 35,
        methodologyTag: { zh: "胶水编程", en: "Glue Coding" },
        exercise: {
          title: { zh: "给功能做优先级分层", en: "Prioritize Your Features" },
          description: { zh: "列出一个产品的功能清单，并按 P0、P1、P2 分级，解释删减背后的判断依据。", en: "List the features of one product, sort them into P0, P1, and P2, and explain the tradeoffs." }
        }
      },
      {
        slug: "2.4-user-journey-and-requirements",
        order: 4,
        title: { zh: "用户旅程地图与需求表达", en: "User Journey Maps and Requirement Expression" },
        description: { zh: "从用户视角组织使用路径，并学会把需求写成 AI 与团队都读得懂的表达。", en: "Map the user journey from the user's perspective and express requirements in a format both AI and teammates can understand." },
        estimatedMins: 35,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "画出你的首条用户旅程", en: "Map Your First User Journey" },
          description: { zh: "用打开、使用、完成三个阶段描述一个产品的旅程，并改写一个模糊需求。", en: "Describe a product journey in three phases and rewrite one vague requirement into a clearer version." }
        }
      },
      {
        slug: "2.5-module-project",
        order: 5,
        title: { zh: "模块项目：需求文档 + MVP 实现", en: "Module Project: Requirement Document and MVP Build" },
        description: { zh: "把前四个单元的产出收束成一份需求文档，并用 GUI 工具先做出可验证的 MVP。", en: "Turn the previous four units into a requirement document and a testable MVP built with a GUI tool." },
        estimatedMins: 45,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "提交你的需求文档", en: "Submit Your Requirement Doc" },
          description: { zh: "完成一份一页式需求文档，并提交 MVP 部署链接、核心 prompt 与复盘说明。", en: "Complete a one-page requirement doc and submit the MVP link, core prompts, and a short retrospective." }
        }
      }
    ],
    project: {
      title: { zh: "模块项目：需求文档与 MVP", en: "Module Project: Requirement Doc and MVP" },
      description: { zh: "把灵魂三问、MVP 边界和用户旅程整理成一份可执行文档，并做出可验证的首版产品。", en: "Turn soul questions, MVP boundaries, and the user journey into an executable brief and a testable first product." },
      checklist: [
        { zh: "我完成了灵魂三问、MVP 边界和用户旅程图", en: "I completed the soul questions, MVP scope, and user journey map" },
        { zh: "我把这些输入整理成了一页式需求文档", en: "I turned those inputs into a one-page requirement document" },
        { zh: "我做出了一个围绕核心假设的 MVP 并记录 prompt 日志", en: "I built an MVP around the core hypothesis and logged the main prompts" }
      ]
    }
  },
  {
    slug: "m3",
    order: 3,
    tier: "CORE",
    durationWeeks: 2,
    title: {
      zh: "提示词工程",
      en: "Prompt Engineering and Context Design"
    },
    description: {
      zh: "学会通过上下文、约束和系统提示词来稳定 AI 输出，并把高质量 prompt 变成可复用资产。",
      en: "Learn how to stabilize AI output with context, constraints, and system prompts, then turn good prompts into reusable assets."
    },
    lessons: [
      {
        slug: "3.1-context-determines-everything",
        order: 1,
        title: { zh: "上下文决定一切", en: "Context Determines Everything" },
        description: { zh: "理解为什么 AI 的输出好坏，本质上取决于你给了它什么任务、背景和边界。", en: "Understand that AI output quality is largely determined by the task, background, and guardrails you provide." },
        estimatedMins: 40,
        methodologyTag: { zh: "上下文固定", en: "Context Stabilization" },
        exercise: {
          title: { zh: "补全一个上下文包", en: "Build a Context Packet" },
          description: { zh: "把一条模糊请求补成角色、任务、背景和约束都清晰的上下文包。", en: "Turn one vague request into a clear packet of role, task, background, and constraints." }
        }
      },
      {
        slug: "3.2-four-elements-role-task",
        order: 2,
        title: { zh: "提示词四要素（上）：角色 + 任务", en: "Four Prompt Elements I: Role and Task" },
        description: { zh: "先把 AI 该以什么身份工作、要完成什么任务说清楚，减少“看起来会做，实际没对齐”的情况。", en: "Clarify the role AI should play and the job it must do so the output actually lines up with your intent." },
        estimatedMins: 40,
        methodologyTag: { zh: "上下文固定", en: "Context Stabilization" },
        exercise: {
          title: { zh: "改写角色与任务", en: "Rewrite Role and Task" },
          description: { zh: "为三个不同任务写出更精确的角色设定与任务描述，并解释为什么更好。", en: "Write more precise role and task definitions for three different jobs and explain why they are better." }
        }
      },
      {
        slug: "3.3-four-elements-constraints-format",
        order: 3,
        title: { zh: "提示词四要素（下）：约束 + 格式", en: "Four Prompt Elements II: Constraints and Format" },
        description: { zh: "给 AI 画清边界、指定输出形式，让 prompt 从“描述意图”升级成“可执行指令”。", en: "Draw clear boundaries and specify output formats so prompts become truly executable instructions." },
        estimatedMins: 40,
        methodologyTag: { zh: "规划驱动", en: "Planning-Driven" },
        exercise: {
          title: { zh: "给 prompt 补上边界", en: "Add Boundaries to a Prompt" },
          description: { zh: "为三个 prompt 补齐技术约束、风格约束和输出格式要求。", en: "Add technical constraints, style boundaries, and output format instructions to three prompts." }
        }
      },
      {
        slug: "3.4-system-prompts-and-claude-md",
        order: 4,
        title: { zh: "系统提示词：CLAUDE.md", en: "System Prompts: CLAUDE.md" },
        description: { zh: "从项目级提示词理解长期协作：什么要固定、什么要约束、什么要显式写出来。", en: "Learn project-level prompting through CLAUDE.md and decide what must be explicit for long-running collaboration." },
        estimatedMins: 40,
        methodologyTag: { zh: "上下文固定", en: "Context Stabilization" },
        exercise: {
          title: { zh: "写一份项目级提示词", en: "Write a Project-Level Prompt" },
          description: { zh: "为一个真实项目写出角色、原则、禁区和交付方式，形成初版 CLAUDE.md。", en: "Write role, principles, guardrails, and delivery expectations for a real project as a first CLAUDE.md draft." }
        }
      },
      {
        slug: "3.5-prompt-anti-patterns-and-portfolio",
        order: 5,
        title: { zh: "Prompt 反模式与个人提示词库", en: "Prompt Anti-Patterns and Your Personal Prompt Library" },
        description: { zh: "识别常见反模式，并把真正有效的 prompt 收束成可以复用和复盘的个人资产。", en: "Spot common prompt anti-patterns and turn working prompts into reusable personal assets." },
        estimatedMins: 35,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "整理你的 Prompt Portfolio", en: "Build Your Prompt Portfolio" },
          description: { zh: "挑选五条最值得保留的 prompt，说明它们解决了什么问题、该在什么场景复用。", en: "Select five prompts worth keeping and explain what each solves and when to reuse it." }
        }
      }
    ],
    project: {
      title: { zh: "模块项目：个人 Prompt Playbook", en: "Module Project: Personal Prompt Playbook" },
      description: { zh: "整理一套自己的系统提示词、任务模板和审查清单，让 prompt 不再只能靠临场发挥。", en: "Assemble a set of system prompts, task templates, and review checklists so your prompting is no longer ad hoc." },
      checklist: [
        { zh: "我整理了至少三类高频提示词模板", en: "I documented at least three recurring prompt templates" },
        { zh: "我写出了一份能复用的项目级提示词", en: "I drafted a reusable project-level system prompt" },
        { zh: "我为常见任务补上了验证与复盘方式", en: "I added verification and review steps for recurring tasks" }
      ]
    }
  },
  {
    slug: "m4",
    order: 4,
    tier: "CORE",
    durationWeeks: 2.5,
    title: {
      zh: "规划驱动与工作流",
      en: "Planning, Breakdown, and Workflow Design"
    },
    description: {
      zh: "把计划、拆解、执行和验证串成完整工作流，让 AI 协作从“会生成”升级到“能交付”。",
      en: "Connect planning, breakdown, execution, and verification into a workflow that turns AI collaboration into delivery."
    },
    lessons: [
      {
        slug: "4.1-prd-and-implementation-plan",
        order: 1,
        title: { zh: "规划就是一切：PRD 与 Implementation Plan", en: "Planning Is Everything: PRDs and Implementation Plans" },
        description: { zh: "理解为什么计划不是额外负担，而是让 AI 协作不翻车的第一层保护。", en: "See why planning is not overhead but the first safeguard against AI-driven chaos." },
        estimatedMins: 45,
        methodologyTag: { zh: "规划驱动", en: "Planning-Driven" },
        exercise: {
          title: { zh: "拆一份项目计划", en: "Break Down a Project Plan" },
          description: { zh: "先写 PRD，再把它拆成 5 到 8 个实现步骤，并列出准备采用的成熟组件或框架。", en: "Write a PRD, break it into 5 to 8 implementation steps, and list the mature components or frameworks you plan to use." }
        }
      },
      {
        slug: "4.2-pev-and-ask-plan",
        order: 2,
        title: { zh: "PEV 循环与 Ask/Plan 模式", en: "The PEV Loop and Ask/Plan Mode" },
        description: { zh: "把 Prompt、Execute、Verify 变成稳定习惯，并学会什么时候该先问、先想、再执行。", en: "Turn Prompt, Execute, Verify into a habit and learn when to ask or plan before acting." },
        estimatedMins: 35,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "为任务选工作模式", en: "Choose a Working Mode" },
          description: { zh: "为三个不同复杂度的任务写出各自的 PEV 节奏，并判断该用 Ask、Plan 还是直接执行。", en: "Write a PEV rhythm for three tasks of different complexity and decide whether each needs Ask, Plan, or direct execution." }
        }
      },
      {
        slug: "4.3-claude-code-getting-started",
        order: 3,
        title: { zh: "Claude Code 上手", en: "Getting Started with Claude Code" },
        description: { zh: "完成安装、进入项目、读上下文、看方案再执行，建立终端代理协作的第一套肌肉记忆。", en: "Install Claude Code, enter a project, read context, inspect a plan, and build your first terminal-agent workflow." },
        estimatedMins: 35,
        methodologyTag: { zh: "上下文固定", en: "Context Stabilization" },
        exercise: {
          title: { zh: "完成一次 Claude Code 首跑", en: "Complete Your First Claude Code Run" },
          description: { zh: "按步骤完成安装与首次使用，并记录一次让 AI 先分析后执行的小任务。", en: "Complete setup and your first run, then document a small task where the agent analyzed before acting." }
        }
      },
      {
        slug: "4.4-crud-with-claude-code",
        order: 4,
        title: { zh: "用 Claude Code 做一个完整的 CRUD 应用", en: "Build a Full CRUD App with Claude Code" },
        description: { zh: "把 PRD、计划、PEV 和进度记录串起来，真正完成一次较完整的工作流演练。", en: "Connect the PRD, plan, PEV loop, and progress tracking in one realistic end-to-end workflow." },
        estimatedMins: 50,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "提交你的 CRUD 工作流记录", en: "Submit Your CRUD Workflow Record" },
          description: { zh: "提交 PRD、计划前几步、关键 verify 结果，以及一份进度记录或 memory-bank 摘要。", en: "Submit the PRD, early plan steps, key verification results, and a progress log or memory-bank summary." }
        }
      },
      {
        slug: "4.5-methodology-review-and-project",
        order: 5,
        title: { zh: "方法论回顾与模块项目", en: "Methodology Review and Module Project" },
        description: { zh: "回看 M1-M4 里你真正练会了什么，再把 PRD、Plan、CLAUDE.md 和 progress.md 一起交付。", en: "Review what you truly learned across M1-M4 and deliver the full set of workflow artifacts together." },
        estimatedMins: 40,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "提交完整交付包", en: "Submit the Full Delivery Pack" },
          description: { zh: "完成并提交代码仓库、PRD、Plan、CLAUDE.md、progress.md 与最终复盘。", en: "Complete and submit the code repo, PRD, plan, CLAUDE.md, progress.md, and final retrospective." }
        }
      }
    ],
    project: {
      title: { zh: "模块项目：项目作战手册", en: "Module Project: Project Operating Manual" },
      description: { zh: "把 PRD、Implementation Plan、CLAUDE.md、progress.md 和关键验证记录整理成一套可复用作战手册。", en: "Combine the PRD, implementation plan, CLAUDE.md, progress.md, and key verification notes into a reusable operating manual." },
      checklist: [
        { zh: "我写出了清晰的 PRD、验收标准和实施计划", en: "I wrote a clear PRD, acceptance criteria, and implementation plan" },
        { zh: "我记录了关键执行步骤、验证结果和进度变化", en: "I documented key execution steps, verification results, and progress updates" },
        { zh: "我交付了完整的协作上下文文件与项目复盘", en: "I delivered the full collaboration-context files and a project retrospective" }
      ]
    }
  },
  {
    slug: "m5",
    order: 5,
    tier: "CORE",
    durationWeeks: 2,
    title: {
      zh: "迭代交付与 Debug",
      en: "Iteration, Delivery, and Debug"
    },
    description: {
      zh: "从一次性做完功能，升级到分步实施、稳定调试、管理上下文，并持续迭代已有项目。",
      en: "Upgrade from one-shot generation to stepwise implementation, verification, and controlled iteration."
    },
    lessons: [
      {
        slug: "5.1-stepwise-implementation",
        order: 1,
        title: { zh: "分步实施：不要一口气把整套功能都做完", en: "Stepwise Implementation: Do Not Ship Everything at Once" },
        description: { zh: "把任务拆成 15 到 30 分钟可验证的小步，而不是一上来就让 AI 做完整系统。", en: "Learn to break work into 15-30 minute verifiable steps instead of asking AI for a whole system at once." },
        estimatedMins: 40,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "拆出前三步", en: "Break Out Your First Three Steps" },
          description: { zh: "把一个真实功能拆成 3 到 5 步，并为每一步写出可验证的完成信号。", en: "Break one real feature into 3-5 verifiable steps and define the done signal for each." }
        }
      },
      {
        slug: "5.2-debug-with-ai",
        order: 2,
        title: { zh: "Debug 方法论：用 AI 修 AI", en: "Debug Methodology: Use AI to Fix AI" },
        description: { zh: "学会把报错、截图和预期差异喂回 AI，形成稳定、可重复的 debug 闭环。", en: "Learn to feed errors, screenshots, and expectation gaps back into AI as a repeatable debug loop." },
        estimatedMins: 45,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "完成一次结构化排错", en: "Run One Structured Debug Session" },
          description: { zh: "选一个真实 bug，提交错误信息、你的假设、AI 的修复建议和最终验证结果。", en: "Choose one real bug and submit the error, your hypothesis, the AI fix, and the final verification result." }
        }
      },
      {
        slug: "5.3-memory-bank-and-context-management",
        order: 3,
        title: { zh: "Memory Bank 与上下文管理", en: "Memory Bank and Context Management" },
        description: { zh: "把项目背景、关键决策和当前进度沉淀到文件里，避免长任务不断丢失上下文。", en: "Persist project background, decisions, and progress in files so long-running work does not lose context." },
        estimatedMins: 40,
        methodologyTag: { zh: "上下文固化", en: "Context Stabilization" },
        exercise: {
          title: { zh: "建立 memory-bank", en: "Set Up Your Memory Bank" },
          description: { zh: "创建 `context.md`、`decisions.md` 和 `progress.md`，并写出第一版项目记录。", en: "Create context.md, decisions.md, and progress.md for your project and draft the first version." }
        }
      },
      {
        slug: "5.4-version-control-and-tool-collaboration",
        order: 4,
        title: { zh: "版本控制与工具协作", en: "Version Control and Tool Collaboration" },
        description: { zh: "通过 commit、checkpoint 和工具分工，让迭代过程可回退、可比较、可协作。", en: "Use commits, checkpoints, and tool specialization so iteration remains recoverable, comparable, and handoff-friendly." },
        estimatedMins: 35,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "设计三个可回退节点", en: "Create Three Reversible Checkpoints" },
          description: { zh: "围绕一个功能建立 3 个 commit 或 checkpoint，并说明每个节点的回退价值。", en: "Create three commits or checkpoints around one feature and explain the rollback value of each." }
        }
      },
      {
        slug: "5.5-module-project",
        order: 5,
        title: { zh: "模块项目：持续迭代你的 CRUD 应用", en: "Module Project: Iteratively Improve Your CRUD App" },
        description: { zh: "在 M4 项目基础上继续做认证、数据变更或关键体验升级，并保留完整迭代记录。", en: "Extend your M4 CRUD project with auth, data changes, or key UX improvements while documenting the full iteration process." },
        estimatedMins: 120,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "提交迭代交付包", en: "Submit the Iteration Delivery Pack" },
          description: { zh: "提交项目仓库、implementation plan、memory-bank、debug 记录和至少 2 个 checkpoint。", en: "Submit the repo, implementation plan, memory-bank, debug log, and at least two checkpoints." }
        }
      }
    ],
    project: {
      title: { zh: "模块项目：迭代交付包", en: "Module Project: Iteration Delivery Pack" },
      description: { zh: "在现有 CRUD 项目上完成一次增量交付，并提交可审查的完整过程证据。", en: "Ship an incremental improvement to an existing CRUD project and submit reviewable evidence of the delivery process." },
      checklist: [
        { zh: "我是在已有项目上继续迭代，而不是从零重做", en: "I iterated on an existing project instead of rebuilding from scratch" },
        { zh: "我提交了 implementation plan、memory-bank 和 debug 记录", en: "I submitted the implementation plan, memory-bank, and debug record" },
        { zh: "我保留了至少 2 个 checkpoint 或 commit 作为回退证据", en: "I preserved at least two checkpoints or commits as rollback evidence" }
      ]
    }
  },
  {
    slug: "m6",
    order: 6,
    tier: "CORE",
    durationWeeks: 2,
    title: {
      zh: "扩展能力：Skill / MCP / 上下文工程",
      en: "Extended Capability: Skills, MCP, and Context Engineering"
    },
    description: {
      zh: "从会用 AI 工具，升级到会配置能力、注入操作手册，并搭建稳定的上下文系统。",
      en: "Move from using AI tools to configuring capabilities, operating guidance, and stable context systems."
    },
    lessons: [
      {
        slug: "6.1-from-prompt-engineering-to-context-engineering",
        order: 1,
        title: { zh: "从提示词工程到上下文工程", en: "From Prompt Engineering to Context Engineering" },
        description: { zh: "理解单次 prompt 的边界，以及系统指令、项目文档和工具如何共同影响 AI 行为。", en: "Understand the limits of single prompts and how system instructions, project docs, and tools shape AI behavior together." },
        estimatedMins: 45,
        methodologyTag: { zh: "上下文固化", en: "Context Stabilization" },
        exercise: {
          title: { zh: "画出你的四层上下文图", en: "Map Your Four Context Layers" },
          description: { zh: "把系统层、项目层、任务层和工具层分别映射到一个真实项目，并说明每层承载什么信息。", en: "Map the system, project, task, and tool layers for one project and explain what each layer holds." }
        }
      },
      {
        slug: "6.2-understanding-skills",
        order: 2,
        title: { zh: "Skill 系统：给 AI 装操作手册", en: "Skills: Give AI an Operating Manual" },
        description: { zh: "理解 Skill 的作用、结构，以及为什么只有能力而没有操作手册仍然不够。", en: "Understand what Skills do, how they are structured, and why capability alone is not enough without operating guidance." },
        estimatedMins: 40,
        methodologyTag: { zh: "胶水编程", en: "Glue Coding" },
        exercise: {
          title: { zh: "拆解一个现成 Skill", en: "Dissect One Skill" },
          description: { zh: "选择一个现成 Skill，标注它的触发条件、约束、模式和示例分别在解决什么问题。", en: "Choose one existing Skill and label the purpose of its triggers, constraints, modes, and examples." }
        }
      },
      {
        slug: "6.3-writing-your-own-skill",
        order: 3,
        title: { zh: "编写你自己的 Skill", en: "Write Your Own Skill" },
        description: { zh: "把已验证有效的做法写成 SKILL.md，让 AI 稳定复用你的经验。", en: "Turn proven practice into a SKILL.md so AI can reuse your experience consistently." },
        estimatedMins: 45,
        methodologyTag: { zh: "胶水编程", en: "Glue Coding" },
        exercise: {
          title: { zh: "写一个项目 Skill 初稿", en: "Draft One Project Skill" },
          description: { zh: "围绕一个重复任务写出最小 SKILL.md，包含触发条件、边界和示例。", en: "Draft a minimal SKILL.md for one recurring task, including triggers, guardrails, and examples." }
        }
      },
      {
        slug: "6.4-understanding-mcp",
        order: 4,
        title: { zh: "MCP 协议：让 AI 连接外部系统", en: "MCP: Connect AI to External Systems" },
        description: { zh: "理解 MCP 提供访问能力，Skill 提供操作方式，以及二者如何在真实工作流里配合。", en: "Understand how MCP provides access while Skills provide operating guidance, and how both combine in real workflows." },
        estimatedMins: 40,
        methodologyTag: { zh: "胶水编程", en: "Glue Coding" },
        exercise: {
          title: { zh: "设计一组 MCP + Skill 组合", en: "Design an MCP + Skill Pair" },
          description: { zh: "围绕一个外部系统设计接入方式，并说明需要什么 Skill 来约束和防止误用。", en: "Design an integration for one external system and explain what Skill is needed to prevent misuse." }
        }
      },
      {
        slug: "6.5-module-project",
        order: 5,
        title: { zh: "模块项目：全栈应用与工具链交付包", en: "Module Project: Full-Stack App and Toolchain Pack" },
        description: { zh: "为一个真实项目配置 CLAUDE.md、自建 Skill、MCP 工作流和 memory-bank，形成完整上下文工程。", en: "Configure CLAUDE.md, at least one self-authored Skill, and one MCP-backed workflow for a real project delivery." },
        estimatedMins: 180,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "提交工具链项目包", en: "Submit the Toolchain Project Pack" },
          description: { zh: "提交代码、CLAUDE.md、至少 2 个自建 Skill、至少 1 个 MCP 集成，以及 memory-bank。", en: "Submit the code, CLAUDE.md, at least two self-authored Skills, at least one MCP integration, and the memory-bank." }
        }
      }
    ],
    project: {
      title: { zh: "模块项目：工具链配置包", en: "Module Project: Toolchain Configuration Pack" },
      description: { zh: "为真实项目交付完整上下文系统、自建 Skill 资产和 MCP 集成方案。", en: "Deliver the context system, Skill assets, and MCP integration plan for a real project." },
      checklist: [
        { zh: "我配置了项目级 CLAUDE.md 和 memory-bank", en: "I configured a project-level CLAUDE.md and memory-bank" },
        { zh: "我提交了至少 2 个自建 Skill", en: "I submitted at least two self-authored Skills" },
        { zh: "我完成了至少 1 个 MCP 集成或等价接入方案", en: "I completed at least one MCP integration or equivalent connection plan" }
      ]
    }
  },
  {
    slug: "m7",
    order: 7,
    tier: "ADVANCED",
    durationWeeks: 1.5,
    title: {
      zh: "Agentic Engineering 与多 Agent 协作",
      en: "Agentic Engineering and Multi-Agent Collaboration"
    },
    description: {
      zh: "从指挥一个 AI，升级到编排多个 Agent 协作，并明确质量守卫和人工审查边界。",
      en: "Move from directing one AI to orchestrating multiple agents with quality guardrails and human review boundaries."
    },
    lessons: [
      {
        slug: "7.1-from-vibe-coding-to-agentic-engineering",
        order: 1,
        title: { zh: "从 Vibe Coding 到 Agentic Engineering", en: "From Vibe Coding to Agentic Engineering" },
        description: { zh: "理解为什么复杂项目需要角色和工作流设计，而不只是请求-响应式协作。", en: "Understand why complex projects require role and workflow design instead of simple request-response prompting." },
        estimatedMins: 35,
        methodologyTag: { zh: "规划驱动", en: "Planning-Driven" },
        exercise: {
          title: { zh: "改写你的角色定位", en: "Rewrite Your Role Positioning" },
          description: { zh: "把一个原本靠单人 vibe coding 推进的任务，改写成带规划、执行和验证角色的 agentic 工作流。", en: "Rewrite one solo vibe-coding task as an agentic workflow with planning, execution, and verification roles." }
        }
      },
      {
        slug: "7.2-multi-agent-workflows",
        order: 2,
        title: { zh: "多 Agent 工作流", en: "Multi-Agent Workflows" },
        description: { zh: "设计规划、编码、测试和审查的角色分工，并理解 sub-agent 团队如何协作。", en: "Design role separation across planning, coding, testing, and review, and understand how sub-agent teams collaborate." },
        estimatedMins: 40,
        methodologyTag: { zh: "规划驱动", en: "Planning-Driven" },
        exercise: {
          title: { zh: "设计一个三 Agent 工作流", en: "Design a Three-Agent Workflow" },
          description: { zh: "为一个真实任务设计至少 3 个 Agent 的职责、交接输入和验证节点。", en: "Design the responsibilities, handoff inputs, and validation points for at least three agents on a real task." }
        }
      },
      {
        slug: "7.3-quality-guardrails-and-cognitive-debt",
        order: 3,
        title: { zh: "质量守卫与认知负债", en: "Quality Guardrails and Cognitive Debt Management" },
        description: { zh: "理解 Agent 会同时放大产出和缺陷，因此需要 lint、测试、安全检查和人工审查。", en: "Understand that agents amplify output and defects together, requiring lint, tests, security checks, and human review." },
        estimatedMins: 40,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "写一张审查清单", en: "Build a Review Checklist" },
          description: { zh: "为一个 agentic 工作流定义哪些内容可自动放行、哪些必须人工确认、哪些绝不能自动合并。", en: "Define what can be machine-approved, what must be human-reviewed, and what must never auto-merge in one agentic workflow." }
        }
      },
      {
        slug: "7.4-module-project",
        order: 4,
        title: { zh: "模块项目：自动化工作流与方法论回顾", en: "Module Project: Automated Workflow and Methodology Review" },
        description: { zh: "在 M6 项目上配置从 Issue 到 PR 的自动化链路，并提交完整方法论回顾。", en: "Configure an Issue-to-PR automation workflow for your M6 project and submit a full methodology review." },
        estimatedMins: 180,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "提交 Agentic 工作流包", en: "Submit the Agentic Workflow Pack" },
          description: { zh: "提交自动化流程、3 个 PR 的证据、质量守卫配置，以及方法论回顾。", en: "Submit the automation flow, evidence for three PRs, quality guardrail configuration, and a methodology retrospective." }
        }
      }
    ],
    project: {
      title: { zh: "模块项目：Agentic 工作流包", en: "Module Project: Agentic Workflow Pack" },
      description: { zh: "交付一个带角色分工、自动化交接、质量守卫和方法论回顾的 agentic 工作流。", en: "Deliver an agentic workflow with role separation, automated handoffs, guardrails, and a methodology review." },
      checklist: [
        { zh: "我配置了至少一条从 Issue 到 PR 的自动化路径", en: "I configured at least one Issue-to-PR automation path" },
        { zh: "我为 Agent 输出加入了 lint、测试或安全守卫", en: "I added lint, test, or security guardrails for agent output" },
        { zh: "我提交了覆盖 M1-M7 的方法论复盘", en: "I submitted a retrospective covering the methodology from M1-M7" }
      ]
    }
  },
  {
    slug: "m8",
    order: 8,
    tier: "ADVANCED",
    durationWeeks: 2,
    title: {
      zh: "部署上线与持续进化",
      en: "Deployment and Continuous Evolution"
    },
    description: {
      zh: "把本地原型带到线上，让它可部署、可审查、可持续迭代，并沉淀为个人长期资产。",
      en: "Move from a local prototype to a deployed, reviewable, and continuously improvable real system."
    },
    lessons: [
      {
        slug: "8.1-deployment-overview",
        order: 1,
        title: { zh: "部署全景：把项目放到互联网上", en: "Deployment Landscape: Put the Project on the Internet" },
        description: { zh: "比较 Vercel、Railway、Netlify 和 Docker/VPS 等方案，并完成一次真实部署。", en: "Compare Vercel, Railway, Netlify, and Docker/VPS choices and complete one real deployment." },
        estimatedMins: 35,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "选择部署目标", en: "Choose the Deployment Target" },
          description: { zh: "根据项目类型、数据依赖和运维复杂度，为你的项目选择最合适的部署目标。", en: "Choose a deployment target for your project based on app type, data dependencies, and operational complexity." }
        }
      },
      {
        slug: "8.2-pre-launch-security-checks",
        order: 2,
        title: { zh: "上线前的安全检查", en: "Pre-Launch Security Checks" },
        description: { zh: "系统检查硬编码密钥、输入校验、认证和错误处理，避免把明显风险带上生产。", en: "Systematically review hardcoded secrets, input validation, auth, and error handling before launch." },
        estimatedMins: 40,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "执行上线检查清单", en: "Run a Launch Checklist" },
          description: { zh: "用安全和配置清单检查项目，并记录发现的问题和修复方案。", en: "Run a security and configuration checklist for your project and document the issues and fixes." }
        }
      },
      {
        slug: "8.3-continuous-iteration-and-personal-knowledge-system",
        order: 3,
        title: { zh: "持续迭代与个人知识体系", en: "Continuous Iteration and Personal Knowledge System" },
        description: { zh: "通过 feature plan、适用边界判断和个人资产整理，让项目持续进化而不失控。", en: "Build feature plans, suitability judgment, and personal asset systems so the project improves without turning chaotic." },
        estimatedMins: 35,
        methodologyTag: { zh: "上下文固化", en: "Context Stabilization" },
        exercise: {
          title: { zh: "整理你的四类资产", en: "Organize Your Four Asset Types" },
          description: { zh: "把 prompt、Skill、模板和复盘整理成可复用的个人知识库。", en: "Organize prompts, Skills, templates, and retrospectives into a reusable personal knowledge base." }
        }
      },
      {
        slug: "8.4-capstone-project",
        order: 4,
        title: { zh: "毕业项目：从零到部署", en: "Capstone Project: From Zero to Deployment" },
        description: { zh: "完成一个从需求、实现、部署到复盘都可审查的毕业项目。", en: "Complete a capstone that is reviewable from requirements to implementation, deployment, and retrospective." },
        estimatedMins: 240,
        methodologyTag: { zh: "闭环交付", en: "Closed-Loop Delivery" },
        exercise: {
          title: { zh: "提交完整毕业项目包", en: "Submit the Full Capstone Package" },
          description: { zh: "提交部署链接、仓库、PRD、Plan、CLAUDE.md、自建 Skill、复盘和演示材料。", en: "Submit the deployment link, repo, PRD, plan, CLAUDE.md, self-authored Skills, retrospective, and demo materials." }
        }
      }
    ],
    project: {
      title: { zh: "模块项目：完整毕业项目包", en: "Module Project: Full Capstone Package" },
      description: { zh: "交付一个可上线、可演示、可审查的毕业项目，以及完整的方法论资产集合。", en: "Deliver a deployed, demoable, reviewable capstone together with the full methodology artifact set." },
      checklist: [
        { zh: "我完成了真实部署，并能解释部署结构", en: "I completed a real deployment and can explain the deployment setup" },
        { zh: "我完成了安全检查并修复了关键风险", en: "I completed the security checklist and fixed the critical risks" },
        { zh: "我提交了完整的毕业项目资产包和复盘", en: "I submitted the full capstone artifact package and retrospective" }
      ]
    }
  }
];
