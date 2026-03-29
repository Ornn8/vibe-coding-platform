## Why

`curriculum-v3.md` 将 M1-M4 从“lesson 列表”重排为更低导航压力的 Unit-Step 学习体验，并要求把四大方法论贯穿到每个单元中。当前仓库的 M1-M4 中文内容仍停留在旧版 lesson 粒度与旧主题划分，已经与目标课程设计脱节，因此需要先完成内容与内容契约的重构。

## What Changes

- 将 M1-M4 的中文课程结构按 `curriculum-v3.md` 重排为 Unit 风格页面，并把每个页面改写为包含多个 Step 的长篇 MDX。
- 更新 M1-M4 的课程元数据与 lesson slug，使其与 v3 的单元命名、顺序、时长和模块项目节奏一致。
- 为 MDX 渲染层补充 `Separator` 组件以及更丰富的 `<Exercise>` 属性支持，使 v3 内容模板可直接落地。
- 明确本次变更不做数据库、进度模型和页面路由的 Unit 化迁移，而是在现有 `lessons` 合约下承载新的 Unit 内容。

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `m1-foundation-course-content`: 将 M1 从“历史/概念/工具/Hello World”重组为 v3 的 4 个 Unit，并把核心概念并入单元化叙事。
- `m2-product-thinking-course-content`: 将 M2 扩展为 5 个 Unit，加入翻车案例、需求文档与模块项目引导。
- `m3-prompt-engineering-course-content`: 将 M3 改写为 v3 的上下文、四要素拆分、系统提示词与 Prompt Portfolio 结构。
- `m4-planning-workflow-course-content`: 将 M4 收敛为 5 个 Unit，围绕 PRD/Plan、PEV/Ask-Plan、Claude Code、完整 CRUD 实战与模块回顾组织内容。

## Impact

- Affected content: `src/content/zh/m1/**`, `src/content/zh/m2/**`, `src/content/zh/m3/**`, `src/content/zh/m4/**`
- Affected metadata: `src/content/course-structure.ts`, `src/content/zh/metadata.ts`
- Affected MDX rendering: `src/components/shared/mdx-components.tsx`, `src/components/learn/exercise-block.tsx`
- Verification surface: MDX compilation, lesson navigation, module detail rendering, Chinese curriculum consistency with `curriculum-v3.md`
