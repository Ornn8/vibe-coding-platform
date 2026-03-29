## Context

The project has a well-defined product brief in `CLAUDE.md` and a twelve-step implementation outline in `implementation-plan.md`, but there is no technical design that translates those documents into a coherent MVP delivery model. The MVP spans application bootstrap, localized routing, authentication, content rendering, progress tracking, submissions, and admin tooling, so the change is cross-cutting across the App Router, Prisma data model, MDX content structure, and shared UI.

Constraints are clear:
- Next.js 15 App Router with Server Components by default.
- Prisma is the only supported data access layer for transactional application data.
- Learner-facing strings must go through `next-intl`, while admin UI can remain Chinese-only for MVP.
- Course content is file-based MDX and must remain locale-specific.
- Simple mutations should prefer Server Actions over bespoke API routes.

## Goals / Non-Goals

**Goals:**
- Define an implementation approach that keeps learner, content, and admin concerns aligned with the repo's architecture rules.
- Keep MVP delivery incremental so the platform can be built and verified in the same order as the implementation plan.
- Separate file-based lesson content from relational application state in a way that keeps lesson delivery fast and progress/submission data durable.
- Centralize access control, locale handling, and shared providers so route groups stay predictable.

**Non-Goals:**
- Designing post-MVP community features, notifications, recommendations, or real-time collaboration.
- Solving full production operations beyond an MVP-ready migration and deployment path.
- Building a WYSIWYG MDX authoring pipeline; content editing remains metadata and structured record management for now.

## Decisions

### Decision: Split file-based content from relational learning state
Lesson bodies and locale-specific copy will live in `src/content/<locale>/...` MDX files, while modules, lessons, exercises, projects, submissions, progress, and activity records live in Prisma-managed tables.

Rationale:
- This follows the repository rule that lesson content is MDX-first while allowing user progress and submissions to remain queryable.
- It keeps lesson rendering cheap and version-controlled while preserving normalized relational state for dashboards and review flows.

Alternatives considered:
- Store full lesson bodies in the database. Rejected because it conflicts with the MDX content workflow and increases authoring complexity.
- Store module and lesson metadata only in MDX. Rejected because admin workflows and progress analytics need relational entities and stable IDs.

### Decision: Use localized App Router route groups with a shared provider stack
The root `src/app/layout.tsx` will provide the HTML shell, while `src/app/[locale]/layout.tsx` will initialize locale-aware providers. Learner, auth, and admin route groups will hang under the locale segment and reuse shared layout logic.

Rationale:
- This matches Next.js 15 conventions and the repo's stated structure.
- It avoids repeating locale, theme, and session wiring across pages.

Alternatives considered:
- Put admin routes outside the locale segment. Rejected because the documented structure expects localized routing and shared provider composition.

### Decision: Enforce access control at the route boundary
Authentication and authorization will be checked in server-side route boundaries and middleware-compatible helpers, with student-only and admin-only layouts guarding their respective trees.

Rationale:
- This keeps protected content out of client-side conditional rendering.
- It aligns with the requirement that learn routes require sign-in and admin routes require `ADMIN`.

Alternatives considered:
- Gate access in client components. Rejected because it leaks protected UI structure and breaks the server-first architecture.

### Decision: Implement mutations with Server Actions backed by Prisma
Lesson completion, exercise submissions, project submissions, checklist updates, prompt portfolio CRUD, and most admin mutations will be implemented as Server Actions that call Prisma helpers.

Rationale:
- This follows the architecture rule to avoid unnecessary API routes for simple CRUD.
- It reduces duplication between UI handlers and backend endpoints.

Alternatives considered:
- Use API routes for all mutations. Rejected because the platform is primarily first-party and server-rendered.

### Decision: Seed core curriculum data and derive learner views from it
The baseline eight modules, lessons, exercises, and project scaffolding will be seeded into the database and joined with locale-specific MDX metadata for rendering.

Rationale:
- This supports the planned module listing, admin editing, analytics, and review features from day one.
- It gives the system stable identifiers for progress and submission relationships.

Alternatives considered:
- Hardcode module data in components. Rejected because it would fight admin CRUD and analytics requirements.

### Decision: Keep admin MVP Chinese-first while preserving shared infra
Admin screens will use Chinese copy for MVP, but they will still use the same routing, session, Prisma, and component foundations as the learner side.

Rationale:
- This is explicitly allowed by the project rules.
- It reduces translation overhead without introducing a separate admin architecture.

Alternatives considered:
- Fully localize admin at MVP. Deferred to avoid expanding the MVP surface before the learner experience is complete.

## Risks / Trade-offs

- [Risk] Database lesson records and MDX file metadata can drift apart. -> Mitigation: seed stable slugs/order values, validate metadata shape in load utilities, and treat slugs as the join key between content and relational state.
- [Risk] Admin editing of relational lesson metadata may not automatically update MDX files. -> Mitigation: scope MVP admin editing to structured data and document that lesson body authoring remains file-based.
- [Risk] Progress, submission, and analytics queries can become coupled and expensive. -> Mitigation: keep analytics on aggregated Prisma queries and defer advanced reporting optimizations until usage justifies them.
- [Risk] Auth.js v5, provider setup, and role checks can block large parts of the app if misconfigured. -> Mitigation: establish auth and protected route infrastructure early and validate it before learner/admin feature work.
- [Risk] The MVP scope is broad for a single change. -> Mitigation: keep execution phased using the implementation plan and generate tasks grouped into independently verifiable milestones.

## Migration Plan

1. Initialize the Next.js application shell, theme, locale routing, and Prisma client setup.
2. Align the Prisma schema with user, content, progress, submission, portfolio, and activity entities, then generate and apply the initial dev schema.
3. Seed modules, lessons, exercises, checklist items, and project scaffolding before building learner pages.
4. Implement auth and route protection before exposing protected learner and admin sections.
5. Deliver learner-facing browsing, lesson rendering, completion, and submission flows before admin analytics and review tooling.
6. Validate build, lint, typecheck, and key route behaviors before deploy.

Rollback strategy:
- Revert the application code and Prisma migration together if schema changes invalidate runtime behavior.
- Keep seed logic idempotent enough for development resets.

## Open Questions

- Should MVP include email/password auth immediately, or should the first implementation follow the plan's GitHub and Google OAuth-only path and add credentials later?
- Will admin content editing be limited to relational metadata and exercise structures, or should MVP also define a file-backed MDX editing workflow?
- Should prompt portfolio live under `/profile` only, or also surface inside project submission flows as reusable learner assets?
