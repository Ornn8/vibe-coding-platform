## Why

`curriculum-m5-m8.md` defines the second half of the platform's curriculum in the same Unit-Step format already used for M1-M4, but the repository still exposes older, flatter M5-M8 lesson metadata and placeholder-level learning arcs. We need a content-authoring change now so the advanced half of the program becomes coherent, seedable, and teachable on the current platform.

## What Changes

- Author curriculum-v3-style M5-M8 learning content using Unit-Step MDX pages while preserving the current `lessons` route contract.
- Rebuild M5-M8 module metadata, lesson sequencing, project outcomes, and tier usage in `courseStructure` so they match `curriculum-m5-m8.md`, including the 18 Unit-style lessons defined for M5-M8.
- Extend seeded learning data for M5-M8 to match the new lesson counts, including M5-M6 core modules and M7-M8 advanced elective modules.
- Add editorial and rendering review checkpoints so content generation and content QA happen together during authoring.

## Capabilities

### New Capabilities
- `m5-iterative-delivery-debug-course-content`: Covers M5 Unit-Step content for iterative delivery, debugging workflows, memory-bank usage, tool collaboration, and CRUD iteration.
- `m6-context-engineering-tooling-course-content`: Covers M6 Unit-Step content for context engineering, skills, MCP, and full-stack toolchain configuration.
- `m7-agentic-engineering-course-content`: Covers M7 Unit-Step content for Agentic Engineering, multi-agent workflows, quality guardrails, and automated delivery.
- `m8-deployment-evolution-course-content`: Covers M8 Unit-Step content for deployment, safety checks, feature iteration, personal knowledge systems, and the capstone.

### Modified Capabilities
- None.

## Impact

- Affected content: `src/content/zh/m5/**`, `src/content/zh/m6/**`, `src/content/zh/m7/**`, `src/content/zh/m8/**`
- Affected metadata and seeded lesson data: `src/content/course-structure.ts`, `prisma/seed.ts`, locale metadata projections
- Affected learning experience: module lesson counts, advanced-tier labeling for M7-M8, and project checklist surfaces fed from seeded content
- Curriculum shape after the change: M5 has 5 Units / 17 Steps, M6 has 5 Units / 16 Steps, M7 has 4 Units / 11 Steps, and M8 has 4 Units / 12 Steps
- Verification surface: MDX rendering, seeded lesson availability, M5-M8 navigation flow, lesson slug consistency, and consistency with `curriculum-m5-m8.md`
