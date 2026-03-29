## 1. Platform Foundation

- [x] 1.1 Initialize the Next.js 15 app shell, shared root layouts, Tailwind/shadcn baseline, and theme support.
- [x] 1.2 Configure `next-intl` locale routing, locale message files, and localized root entry behavior for `zh` and `en`.
- [x] 1.3 Set up Prisma client wiring, environment configuration, and the initial application provider stack.
- [x] 1.4 Add baseline loading, error, and not-found route states for the main localized route groups.

## 2. Data Model and Seed Data

- [x] 2.1 Align the Prisma schema with users, roles, modules, lessons, exercises, projects, submissions, checklist state, progress, prompt portfolio, and daily activity records.
- [x] 2.2 Generate and apply the initial Prisma migration or development schema update, then regenerate the Prisma client.
- [x] 2.3 Implement seed data for the eight modules, lesson structure, exercise scaffolding, checklist items, and module projects.
- [x] 2.4 Add locale-specific content metadata files that map seeded module and lesson records to MDX content slugs.

## 3. Authentication and Access Control

- [x] 3.1 Configure Auth.js v5 with Prisma-backed session persistence and the planned OAuth providers.
- [x] 3.2 Build the localized login flow and session-aware shared navigation UI.
- [x] 3.3 Enforce learner-route authentication and admin-route role checks in server-side route boundaries or middleware helpers.
- [x] 3.4 Validate sign-in, sign-out, anonymous redirects, and admin access-denied behavior.

## 4. Learner Content Experience

- [x] 4.1 Implement MDX loading utilities with Shiki highlighting and shared MDX component mappings.
- [x] 4.2 Create learner layouts, module listing pages, and module detail pages backed by Prisma data plus localized metadata.
- [x] 4.3 Build lesson pages that render MDX content, previous/next navigation, and embedded exercise surfaces.
- [x] 4.4 Implement persisted lesson completion actions and module progress derivation.

## 5. Learner Progress and Portfolio

- [x] 5.1 Build the learner profile page with completion totals, progress summaries, and recent activity views.
- [x] 5.2 Implement daily activity logging and streak-related progress calculations.
- [x] 5.3 Add prompt portfolio CRUD flows under the learner profile area.
- [x] 5.4 Surface learner progress summaries in shared navigation and sidebar components.

## 6. Submissions and Project Workflow

- [x] 6.1 Implement lesson exercise submission actions for text and link-based responses.
- [x] 6.2 Build the module project submission page with draft/save behavior, submission states, and validation.
- [x] 6.3 Implement checklist persistence and final-submission gating for module projects.
- [x] 6.4 Build the learner projects index showing project status across all modules.

## 7. Admin Operations

- [x] 7.1 Build the Chinese-first admin layout and navigation shell.
- [x] 7.2 Implement admin content management for modules, lessons, exercises, and checklist items.
- [x] 7.3 Implement admin user management with search, filtering, and role updates.
- [x] 7.4 Implement the admin analytics dashboard with aggregated counts, activity trends, and module funnel data.

## 8. Review Workflow and Finish

- [x] 8.1 Implement the admin project review queue with submission details, review notes, and status transitions.
- [x] 8.2 Add landing page and tools reference page experiences consistent with the MVP scope.
- [x] 8.3 Fill the initial M1 lesson MDX content and placeholders needed to validate the end-to-end learner flow.
- [x] 8.4 Run lint, typecheck, build, and route-level verification to confirm the MVP is ready for implementation follow-through and deployment preparation.
