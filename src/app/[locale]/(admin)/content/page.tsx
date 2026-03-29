import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getAdminModules } from "@/lib/admin";
import { createModule, removeModule, saveModuleMetadata } from "../actions";

type AdminContentPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminContentPage({ params }: AdminContentPageProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const modules = await getAdminModules();
  const revalidateTarget = `/${locale}/content`;
  const coreModules = modules.filter((module) => module.tier === "CORE");
  const advancedModules = modules.filter((module) => module.tier === "ADVANCED");

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">内容管理</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">编辑模块元数据</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          这里可以按核心 / 进阶分类管理模块，并进入模块页继续维护单元（课时）。slug 仍然锁定，避免把现有内容路由改坏。
        </p>
      </div>

      <section className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">新建模块</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">新增一个内容分类 / 模块</h2>
          </div>
          <div className="flex gap-3 text-sm text-muted-foreground">
            <span>核心模块 {coreModules.length}</span>
            <span>进阶模块 {advancedModules.length}</span>
            <span>总计 {modules.length}</span>
          </div>
        </div>

        <form
          className="mt-6 grid gap-3"
          action={async (formData) => {
            "use server";
            await createModule(formData, revalidateTarget);
          }}
        >
          <div className="grid gap-3 md:grid-cols-4">
            <input
              name="slug"
              placeholder="slug，例如 m9"
              className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            />
            <input
              name="order"
              type="number"
              placeholder="排序"
              className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            />
            <select
              name="tier"
              defaultValue="CORE"
              className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            >
              <option value="CORE">CORE</option>
              <option value="ADVANCED">ADVANCED</option>
            </select>
            <input
              name="durationWeeks"
              type="number"
              step="0.5"
              placeholder="周期（周）"
              className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            />
          </div>

          <input
            name="titleZh"
            placeholder="中文标题"
            className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
          />
          <input
            name="titleEn"
            placeholder="English title"
            className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
          />
          <textarea
            name="descriptionZh"
            placeholder="中文描述"
            className="min-h-24 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
          />
          <textarea
            name="descriptionEn"
            placeholder="English description"
            className="min-h-24 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
          />

          <Button type="submit" className="w-fit rounded-full px-5">
            新建模块
          </Button>
        </form>
      </section>

      {([["核心模块", coreModules], ["进阶模块", advancedModules]] as const).map(([label, groupedModules]) => (
        <section key={label} className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">{label}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">{groupedModules.length} 个模块</h2>
            </div>
          </div>

          <div className="grid gap-5">
            {groupedModules.map((module) => (
              <article
                key={module.slug}
                className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5"
              >
                <form
                  className="grid gap-3"
                  action={async (formData) => {
                    "use server";
                    await saveModuleMetadata(formData, revalidateTarget);
                  }}
                >
                  <input type="hidden" name="moduleId" value={module.id ?? ""} />

                  <div className="grid gap-3 md:grid-cols-4">
                    <input
                      name="order"
                      type="number"
                      defaultValue={module.order}
                      className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                    />
                    <select
                      name="tier"
                      defaultValue={module.tier}
                      className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                    >
                      <option value="CORE">CORE</option>
                      <option value="ADVANCED">ADVANCED</option>
                    </select>
                    <input
                      name="durationWeeks"
                      type="number"
                      step="0.5"
                      defaultValue={module.durationWeeks}
                      className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                    />
                    <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">
                      {module.lessonCount} 个单元
                    </div>
                  </div>

                  <div className="rounded-2xl border border-dashed border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">
                    slug：{module.slug}
                  </div>

                  <input
                    name="titleZh"
                    defaultValue={module.titleZh}
                    placeholder="中文标题"
                    className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                  />
                  <input
                    name="titleEn"
                    defaultValue={module.titleEn}
                    placeholder="English title"
                    className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                  />
                  <textarea
                    name="descriptionZh"
                    defaultValue={module.descriptionZh}
                    placeholder="中文描述"
                    className="min-h-24 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                  />
                  <textarea
                    name="descriptionEn"
                    defaultValue={module.descriptionEn}
                    placeholder="English description"
                    className="min-h-24 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                  />

                  <div className="flex flex-wrap gap-3">
                    <Button type="submit" className="rounded-full px-5" disabled={!module.id}>
                      保存模块
                    </Button>
                    <Button asChild type="button" variant="outline" className="rounded-full px-5">
                      <Link href={`/content/${module.slug}`} locale={locale as Locale}>
                        管理单元
                      </Link>
                    </Button>
                  </div>
                </form>

                <form
                  className="mt-4"
                  action={async (formData) => {
                    "use server";
                    await removeModule(formData, revalidateTarget);
                  }}
                >
                  <input type="hidden" name="moduleId" value={module.id ?? ""} />
                  <Button type="submit" variant="ghost" className="rounded-full px-5 text-destructive" disabled={!module.id}>
                    删除模块
                  </Button>
                </form>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
