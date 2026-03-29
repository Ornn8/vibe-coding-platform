## Context

仓库现有学习体验、进度统计、后台列表和 MDX 加载逻辑都围绕 `module.lessons[]` 展开，且大量代码直接依赖 `lesson.slug`。`curriculum-v3.md` 虽然提出了 Unit / Step / UnitProgress 的完整重构方案，但用户当前请求聚焦于“先读取 v3 并修改 M1-M4 课程内容”，因此需要在不打断现有产品功能的前提下，把内容先迁移到 v3。

## Goals / Non-Goals

**Goals:**
- 用现有 lesson 路由承载 v3 的 Unit 页面，使 M1-M4 的中文课程结构、标题、练习节奏和方法论标签与 `curriculum-v3.md` 一致。
- 更新课程元数据，让学习页、管理页和详情页看到的标题、顺序与新课程一致。
- 补齐内容组件能力，让 MDX 可以表达 Step 分隔和分级练习。
- 保持当前学习流程、进度统计和页面结构可继续运行。

**Non-Goals:**
- 本次不引入 `Unit` / `UnitProgress` Prisma 模型。
- 本次不重写学习页导航、模块页信息架构或后台统计口径。
- 本次不编写英文版对应内容。
- 本次不实现 `curriculum-v3.md` 中所有数据模型改造。

## Decisions

### 保留 `lessons` 数据模型，把每个 lesson 升级为一个 Unit 页面

Why:
- `src/lib/learning.ts`、`src/lib/admin.ts` 和多处页面代码直接依赖 `module.lessons`，立即改成 `units` 会把内容改写升级为跨层架构迁移。
- 用户请求核心是更新课程内容，先完成内容迁移能最快落地 v3 体验。

Alternative considered:
- 同步改数据库、lib、页面与 MDX 目录到 `units`。拒绝，因为范围过大且不利于当前迭代闭环。

### 用 slug 与标题重排来表达 v3 结构，而不是保留旧 lesson 命名

Why:
- v3 的学习路径与旧 lesson 命名差异很大，只改正文而不改 slug/标题会导致导航信息与内容不一致。
- 现有内容都在本地文件中，直接重命名和新增文件的成本可控。

Alternative considered:
- 保留旧 slug，仅在正文中说明“本页视为 Unit”。拒绝，因为元数据、导航和 admin 视图仍会暴露旧结构。

### 扩展 MDX 组件而不是在正文里退回到最旧语法

Why:
- v3 的内容模板明确依赖 Step 分隔与更细粒度练习标签。
- 只做轻量组件扩展即可兼容新内容，不需要调整页面布局或渲染管线。

Alternative considered:
- 完全不用 `Separator` 和练习级别属性。拒绝，因为会削弱 v3 内容模板的一致性。

## Risks / Trade-offs

- [课程结构已更接近 Unit，但底层仍叫 lesson] → 在 OpenSpec 和代码中明确这是过渡层，后续再做 schema/UI Unit 化迁移。
- [slug 变更可能影响已有直达链接] → 仅变更 M1-M4 中文内容文件与课程结构；验证模块详情和 lesson 页面能正常解析新 slug。
- [大批量 MDX 改写容易引入语法错误] → 采用统一模板，补充组件兼容后运行 `npm run lint` 和 `npx tsc --noEmit`。
- [部分 v3 设计未在 UI 中显式展示，例如 methodology tag/estimated mins] → 先把信息写入内容正文和 metadata 标题/描述，显示层改造留到后续 change。

## Migration Plan

1. 创建 OpenSpec proposal / specs / tasks，明确这是内容迁移而非完整架构迁移。
2. 更新 M1-M4 的课程结构定义与相关中文 MDX 文件。
3. 为 MDX 添加必要组件兼容。
4. 运行类型检查与 lint，确认现有路由和内容编译不被破坏。

Rollback:
- 回滚 `src/content/course-structure.ts`、M1-M4 的 MDX 文件以及新增的 MDX 组件扩展即可；无数据库迁移需要回滚。

## Open Questions

- 后续是否要单独立项，把 `curriculum-v3.md` 中的 `Unit` / `UnitProgress` 模型真正迁移到应用和数据库层。
- 是否需要在学习页 UI 中新增 methodology tag、estimated mins 与 Step 进度显示。
