## Why

The repository already has a clear product direction, architecture constraints, and a phased implementation plan, but it does not yet have an OpenSpec change that turns those inputs into an executable MVP contract. We need a single proposal that defines the platform's initial user-facing and admin-facing capabilities so implementation can proceed in a spec-driven, reviewable way.

## What Changes

- Define the MVP scope for a bilingual Vibe Coding learning platform built on Next.js 15, Prisma, Auth.js, MDX, and next-intl.
- Introduce requirements for student authentication, locale-aware routing, and role-based access to learning and admin surfaces.
- Introduce requirements for course browsing, MDX lesson rendering, lesson completion tracking, and module-level progress.
- Introduce requirements for exercise submission, module project submission, and learner-owned prompt portfolio management.
- Introduce requirements for Chinese-first admin workflows covering content operations, learner management, analytics, and review queues.
- Establish the implementation design needed to align Prisma models, server actions, routing, and content loading with the MVP business rules in `CLAUDE.md` and `implementation-plan.md`.

## Capabilities

### New Capabilities
- `user-auth-and-access`: Authentication, localized routing, session handling, and role-based protection for student and admin areas.
- `learning-content-and-progress`: Module discovery, lesson delivery from MDX, lesson completion, and learner progress visibility.
- `submissions-and-portfolio`: Lesson exercise submissions, module project submissions, checklist state, and prompt portfolio CRUD.
- `admin-operations-and-review`: Admin dashboard, content management, user management, and project review workflows.
- `platform-foundation-and-localization`: Application bootstrap requirements, shared layouts, i18n infrastructure, theme support, and baseline UX states.

### Modified Capabilities

None.

## Impact

- Affects the Next.js App Router structure under `src/app/[locale]`, including learn, auth, and admin route groups.
- Affects shared UI components, MDX rendering utilities, authentication setup, locale configuration, and theme/provider wiring.
- Requires Prisma schema alignment for users, modules, lessons, exercises, submissions, progress, portfolio items, and daily activity data.
- Adds or updates localized message files, MDX content metadata, seed data, and server actions for progress and submissions.
- Establishes the MVP contract that subsequent implementation work will follow in `openspec/changes/build-vibe-coding-platform-mvp/`.
