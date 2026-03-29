# Vibe Coding Learning Platform

Online learning is available at: [https://vibe-coding-platform-livid-psi.vercel.app](https://vibe-coding-platform-livid-psi.vercel.app)

**A methodology-driven, systematic learning path for Vibe Coding — from beginner to Agentic Engineering**

[中文版](README-ZH.md)

---

A free, open-source learning platform for systematic Vibe Coding education. Rather than just teaching tool operations, this platform is built around four core methodology principles — Planning-Driven, Context Anchoring, Glue Programming, and Closed-Loop Delivery — covering the complete journey from Vibe Coding basics to Agentic Engineering.

## Why This Platform Exists

Vibe Coding has evolved from Andrej Karpathy's single tweet into a mainstream development workflow. But most practitioners don't struggle with "how to use the tools" — they struggle with:

- No systematic learning path — unclear what to learn first vs. later
- Vague requirements, context confusion, unstable outputs, and excessive rework during vibe coding
- Hearing about Skills, MCP, CLAUDE.md but not understanding how they improve vibe coding quality
- No stage goals or practice feedback, making it hard to gauge real progress

This platform aims to solve these problems systematically.

## Curriculum

8 modules, 37 learning units, ~250 progressive exercises, 8 hands-on projects.

### Foundation

| Module | Content | Duration |
|--------|---------|----------|
| M1 Awareness | What is Vibe Coding, three modes compared, tool landscape, first AI webpage | ~1 week |
| M2 Requirements & Product Thinking | Three soul questions, MVP thinking, P0/P1/P2 prioritization, user journey maps | ~1.5 weeks |
| M3 Prompt Engineering | Context principles, four-element framework, CLAUDE.md writing, anti-pattern identification | ~2 weeks |

### Intermediate

| Module | Content | Duration |
|--------|---------|----------|
| M4 Planning-Driven Workflows | PRD writing, implementation plans, PEV loop, Claude Code hands-on | ~2 weeks |
| M5 Iterative Delivery & Debug | Step-by-step implementation, AI-assisted debugging, Memory Bank, version control, Codex intro | ~2 weeks |
| M6 Extended Capabilities | Context engineering, Skill system, meta-skills, MCP protocol, full-stack project | ~2 weeks |

### Advanced (Elective)

| Module | Content | Duration |
|--------|---------|----------|
| M7 Agentic Engineering | Multi-agent workflows, sub-agents, automation integration, quality guardrails | ~2 weeks |
| M8 Deployment & Evolution | Deployment options, security checks, continuous iteration, personal knowledge system, capstone project | ~1.5 weeks |

### Four Methodology Principles

The intellectual backbone running through every module, derived from [2025Emma/vibe-coding-cn](https://github.com/2025Emma/vibe-coding-cn):

- **Planning-Driven** — Planning is everything. Letting AI code without a plan turns your codebase into unmanageable chaos
- **Context Anchoring** — Crystallize project memory through CLAUDE.md and Memory Bank so AI stays consistent across sessions
- **Glue Programming** — Don't let AI generate code from scratch (hallucination source); let it connect proven, mature modules instead
- **Closed-Loop Delivery** — Requirements → context docs → implementation plan → step-by-step execution → self-test → progress log — fully traceable and transferable

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | Auth.js v5 (GitHub / Google OAuth) |
| Content | MDX + next-mdx-remote + Shiki |
| i18n | next-intl (Chinese / English) |
| Deployment | Vercel |

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL (local or Docker)
- GitHub OAuth App and/or Google OAuth credentials

### Local Development

```bash
# Clone the repository
git clone https://github.com/Ornn8/vibe-coding-platform.git
cd vibe-coding-platform

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and OAuth credentials

# Initialize database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

Visit `http://localhost:3000/en` for English, `http://localhost:3000/zh` for Chinese.

### Docker Development Environment

```bash
# Start PostgreSQL
docker run --name vibe-pg \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=vibe \
  -p 5432:5432 -d postgres:16

# Set in .env.local:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vibe"
```

### Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Lint check
npx tsc --noEmit     # Type check
npx prisma studio    # Database GUI
npx prisma db seed   # Seed course data
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # i18n routing (zh / en)
│   │   ├── (learn)/           # Student-facing (modules, units, projects, profile, tools)
│   │   ├── (admin)/           # Admin (dashboard, content, users, reviews)
│   │   └── page.tsx           # Landing page
│   └── api/                   # API routes
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   ├── learn/                 # Learning components
│   ├── admin/                 # Admin components
│   └── shared/                # Shared (MDX rendering, navigation)
├── content/
│   ├── zh/                    # Chinese MDX course files
│   │   ├── m1/ ... m8/        # Organized by module
│   │   └── tools/             # Tool reference guides
│   └── en/                    # English MDX course files
├── lib/                       # Database, auth, MDX utilities
└── i18n/                      # i18n strings
```

## Features

### Learning

- Course browsing and reading (MDX rendering + syntax highlighting)
- Progressive exercises within learning units
- Module projects with self-assessment checklists
- Personal center (progress tracking, study stats, streak counter)
- Prompt Portfolio management
- Tool reference area (installation guides and command cheat sheets for Claude Code, Codex, Cursor, Bolt.new, etc.)

### Admin

- Data dashboard (user stats, module funnel, activity trends)
- Course content management (module / unit CRUD)
- User management (role switching, learning trajectory)
- Project review queue

## Knowledge Sources & Credits

Course content is originally written based on methodologies and conceptual frameworks from these open-source projects — no content is directly copied:

| Project | License | What We Referenced |
|---------|---------|-------------------|
| [datawhalechina/vibe-vibe](https://github.com/datawhalechina/vibe-vibe) | CC BY-NC-SA 4.0 | Learning path structure, curriculum design, product thinking pedagogy |
| [2025Emma/vibe-coding-cn](https://github.com/2025Emma/vibe-coding-cn) | MIT | Four methodology principles, Ask/Plan workflow, CLAUDE.md design, Skill system, prompt library |
| [datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) | CC BY-NC-SA 4.0 | Context engineering, MCP protocol, Agent Skills concepts |

Also informed by Andrej Karpathy's public writings on Vibe Coding and Agentic Engineering, and industry practices including the PEV loop and glue programming patterns.

## Roadmap

- [x] Platform architecture and core features
- [x] M1-M8 complete course content (Chinese & English)
- [x] Tool reference area (installation guides, command cheat sheets, Skill/MCP configuration)
- [x] Admin panel
- [ ] Production deployment
- [ ] Community: project gallery
- [ ] Community: Prompt / Skill sharing library
- [ ] Community: study groups
- [ ] Community: periodic challenges
- [ ] Admin WYSIWYG content editor

## Contributing

Contributions are welcome! You can help by:

- Suggesting course content improvements (Issues)
- Fixing bugs or improving features (PRs)
- Adding tool guides or tutorials
- Translating content to other languages
- Sharing your learning experience and feedback

## License

Platform code is released under the [MIT License](LICENSE).

Course content references open-source projects under CC BY-NC-SA 4.0. All course material in this platform is originally written based on the referenced methodologies, with sources credited in relevant lessons.
