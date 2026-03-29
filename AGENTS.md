# AGENTS.md — Vibe Coding 学习平台

## Project Overview

A free, open-source learning platform for systematic Vibe Coding education. Covers the full journey from "Vibe Coding basics" to "Agentic Engineering". Built with Next.js 15, deployed on Vercel.

Repository: MIT License
Languages: Chinese (primary), English (i18n)

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components by default)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: PostgreSQL (via Vercel Postgres or Supabase in dev)
- **ORM**: Prisma (latest)
- **Auth**: Auth.js v5 (NextAuth) — GitHub OAuth + Google OAuth + email/password
- **Content**: MDX via next-mdx-remote — course articles stored as .mdx files in /src/content/
- **i18n**: next-intl — route-based locale switching (/zh/... and /en/...)
- **Code Highlighting**: Shiki
- **File Storage**: Vercel Blob (user uploads: screenshots, project files)
- **Deployment**: Vercel

## Architecture Rules

### File Structure

```
src/
├── app/
│   ├── [locale]/                    # i18n dynamic segment
│   │   ├── (learn)/                 # Student-facing pages (shared layout with nav)
│   │   │   ├── page.tsx             # Learning dashboard / home
│   │   │   ├── modules/
│   │   │   │   ├── page.tsx         # Module list
│   │   │   │   └── [moduleSlug]/
│   │   │   │       ├── page.tsx     # Module detail + lessons list
│   │   │   │       └── [lessonSlug]/
│   │   │   │           └── page.tsx # Lesson content page
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx         # My projects list
│   │   │   │   └── [projectId]/
│   │   │   │       └── page.tsx     # Project submission page
│   │   │   ├── profile/
│   │   │   │   └── page.tsx         # Personal center + progress
│   │   │   ├── tools/
│   │   │   │   └── page.tsx         # Tool reference cards
│   │   │   └── layout.tsx           # Learn layout (sidebar nav)
│   │   ├── (admin)/                 # Admin pages (protected, shared admin layout)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx         # Data dashboard
│   │   │   ├── content/
│   │   │   │   ├── page.tsx         # Content management list
│   │   │   │   └── [moduleSlug]/
│   │   │   │       └── page.tsx     # Edit module/lessons
│   │   │   ├── users/
│   │   │   │   └── page.tsx         # User management
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx         # Project review queue
│   │   │   └── layout.tsx           # Admin layout (admin sidebar)
│   │   ├── layout.tsx               # Root locale layout (providers, fonts)
│   │   └── page.tsx                 # Landing page
│   ├── api/                         # API Routes (no locale prefix)
│   │   ├── auth/[...nextauth]/
│   │   ├── modules/
│   │   ├── lessons/
│   │   ├── exercises/
│   │   ├── submissions/
│   │   ├── progress/
│   │   └── admin/
│   └── layout.tsx                   # HTML root
├── components/
│   ├── ui/                          # shadcn/ui primitives
│   ├── learn/                       # Learning page components
│   │   ├── module-card.tsx
│   │   ├── lesson-content.tsx
│   │   ├── exercise-block.tsx
│   │   ├── checklist.tsx
│   │   ├── progress-bar.tsx
│   │   └── submission-form.tsx
│   ├── admin/                       # Admin page components
│   │   ├── content-editor.tsx
│   │   ├── user-table.tsx
│   │   ├── stats-card.tsx
│   │   └── review-panel.tsx
│   └── shared/                      # Shared components
│       ├── navbar.tsx
│       ├── locale-switcher.tsx
│       └── mdx-components.tsx
├── content/
│   ├── zh/                          # Chinese MDX course files
│   │   ├── m1/                      # Module 1
│   │   │   ├── 1.1-vibe-coding-history.mdx
│   │   │   ├── 1.2-core-concepts.mdx
│   │   │   ├── 1.3-tool-landscape.mdx
│   │   │   └── 1.4-hello-world.mdx
│   │   ├── m2/ ... m8/
│   │   └── metadata.ts              # Module/lesson metadata (titles, slugs, order)
│   └── en/                          # English MDX (same structure)
├── lib/
│   ├── db.ts                        # Prisma client singleton
│   ├── auth.ts                      # Auth.js config
│   ├── mdx.ts                       # MDX loading utilities
│   ├── i18n.ts                      # next-intl config
│   └── utils.ts                     # Shared helpers
├── i18n/
│   ├── zh.json                      # Chinese UI strings
│   └── en.json                      # English UI strings
└── middleware.ts                     # next-intl middleware for locale routing
```

### Coding Conventions

1. **Server Components by default**. Only add "use client" when the component needs interactivity (onClick, useState, etc.).
2. **Server Actions** for form mutations (exercise submissions, project submissions). No separate API routes for simple CRUD — use API routes only when needed by external clients.
3. **Prisma queries live in lib/ or directly in Server Components**. Never call Prisma from client components.
4. **No barrel exports** (index.ts re-exports). Import directly from the file.
5. **Component naming**: PascalCase files (e.g., `module-card.tsx` exports `ModuleCard`). Use kebab-case for file names.
6. **Type definitions**: Co-locate types with the code that uses them. Shared types go in `src/types/`.
7. **Error handling**: Use Next.js `error.tsx` boundary files. API routes return `{ error: string }` with appropriate HTTP status.
8. **No `any` type**. Use `unknown` and narrow.

### Styling Rules

- Use Tailwind utility classes. No custom CSS files except for MDX content styling.
- Use shadcn/ui components for all UI elements (Button, Card, Table, Dialog, etc.).
- Follow shadcn/ui's color system. No hardcoded colors.
- Responsive: mobile-first, breakpoints at `sm`, `md`, `lg`.
- Dark mode support via Tailwind `dark:` variants (use next-themes).

### i18n Rules

- All user-facing strings go through next-intl's `useTranslations()` or `getTranslations()`.
- MDX content files are separate per locale (`/content/zh/` and `/content/en/`).
- URL structure: `/{locale}/modules/m1/1.1-vibe-coding-history`
- Default locale: `zh`. Fallback locale: `zh`.
- Admin UI is Chinese-only for MVP. English admin is not a priority.

### Database Rules

- All tables use `id` as UUID primary key (use `@default(cuid())`).
- All tables have `createdAt` and `updatedAt` timestamps.
- Use Prisma's relation fields. Never raw SQL unless for analytics queries.
- Soft delete where appropriate (use `deletedAt` nullable DateTime).

### Content (MDX) Rules

- Each lesson is one .mdx file.
- Frontmatter includes: `title`, `description`, `order`, `module` (slug).
- Exercises are embedded in MDX using a custom `<Exercise>` component.
- Code blocks use Shiki for syntax highlighting. Specify language always.
- Images stored in `/public/content/` with path relative to module.

### Git Conventions

- Branch naming: `feat/description`, `fix/description`, `chore/description`
- Commit messages: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- One feature per PR. Keep PRs small and reviewable.

## Key Business Logic

### Learning Progress Tracking

- Progress is tracked at the **lesson** level (completed / not completed).
- A lesson is "completed" when the user explicitly marks it as done (button click).
- Module completion = all lessons in that module are completed.
- Exercise submissions are optional but tracked.
- Project submissions require at least the checklist to be filled.

### User Roles

- `STUDENT` (default): Can learn, submit exercises/projects, view own progress.
- `ADMIN`: Full access to admin panel, content management, user management, data dashboard.

### Module Structure

- 8 modules total. M1-M6 are "core". M7-M8 are "advanced" (tagged differently in UI).
- Each module has: title, description, duration, order, lessons[], project.
- Each lesson has: title, content (MDX), order, exercises[].
- Each exercise has: type (LESSON_EXERCISE | MODULE_PROJECT), description, checklist items.

## Commands

```bash
# Development
npm run dev                    # Start dev server
npx prisma studio             # Database GUI
npx prisma db push             # Push schema changes (dev)
npx prisma migrate dev         # Create migration (before deploy)
npx prisma generate            # Regenerate client after schema change

# Build
npm run build                  # Production build
npm run lint                   # ESLint check
npx tsc --noEmit               # Type check
```
