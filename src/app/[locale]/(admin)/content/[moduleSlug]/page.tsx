import { Button } from "@/components/ui/button";
import { getAdminModuleDetail } from "@/lib/admin";
import { notFound } from "next/navigation";
import {
  createLesson,
  removeLesson,
  saveChecklistItemMetadata,
  saveExerciseMetadata,
  saveLessonMetadata
} from "../../actions";

type AdminModuleDetailPageProps = {
  params: Promise<{ locale: string; moduleSlug: string }>;
};

export default async function AdminModuleDetailPage({ params }: AdminModuleDetailPageProps) {
  const { locale, moduleSlug } = (await params) ?? { locale: "zh", moduleSlug: "" };
  const detail = await getAdminModuleDetail(moduleSlug);

  if (!detail) {
    notFound();
  }

  const revalidateTarget = `/${locale}/content/${moduleSlug}`;
  const listRevalidateTarget = `/${locale}/content`;

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          {detail.module.slug.toUpperCase()} · 单元 / 课时管理
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          {detail.module.titleZh}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{detail.module.descriptionZh}</p>
      </div>

      <section className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">新增单元</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">为当前模块添加新的课程单元</h2>
        <form
          className="mt-5 grid gap-3"
          action={async (formData) => {
            "use server";
            await createLesson(formData, revalidateTarget, listRevalidateTarget);
          }}
        >
          <input type="hidden" name="moduleId" value={detail.module.id ?? ""} />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              name="slug"
              placeholder="slug，例如 1.5-new-unit"
              className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            />
            <input
              name="order"
              type="number"
              placeholder="排序"
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
          <Button type="submit" className="w-fit rounded-full px-5" disabled={!detail.module.id}>
            新建单元
          </Button>
        </form>
      </section>

      <div className="grid gap-5">
        {detail.lessons.map((lesson) => (
          <article
            key={lesson.slug}
            className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5"
          >
            <form
              className="grid gap-3"
              action={async (formData) => {
                "use server";
                await saveLessonMetadata(formData, revalidateTarget);
              }}
            >
              <input type="hidden" name="lessonId" value={lesson.id ?? ""} />
              <div className="grid gap-3 md:grid-cols-[8rem_minmax(0,1fr)]">
                <input
                  name="order"
                  type="number"
                  defaultValue={lesson.order}
                  className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                />
                <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">
                  {lesson.slug}
                </div>
              </div>

              <input
                name="titleZh"
                defaultValue={lesson.titleZh}
                placeholder="中文标题"
                className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
              />
              <input
                name="titleEn"
                defaultValue={lesson.titleEn}
                placeholder="English title"
                className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
              />
              <textarea
                name="descriptionZh"
                defaultValue={lesson.descriptionZh}
                placeholder="中文描述"
                className="min-h-24 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
              />
              <textarea
                name="descriptionEn"
                defaultValue={lesson.descriptionEn}
                placeholder="English description"
                className="min-h-24 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
              />

              <div className="flex flex-wrap gap-3">
                <Button type="submit" className="w-fit rounded-full px-5" disabled={!lesson.id}>
                  保存课时
                </Button>
              </div>
            </form>

            <form
              className="mt-4"
              action={async (formData) => {
                "use server";
                await removeLesson(formData, revalidateTarget, listRevalidateTarget);
              }}
            >
              <input type="hidden" name="lessonId" value={lesson.id ?? ""} />
              <Button type="submit" variant="ghost" className="rounded-full px-5 text-destructive" disabled={!lesson.id}>
                删除课时
              </Button>
            </form>

            <div className="mt-6 grid gap-4">
              {lesson.exercises.map((exercise, index) => (
                <form
                  key={exercise.id ?? `${lesson.slug}-exercise-${index}`}
                  className="grid gap-3 rounded-2xl border border-border/70 bg-background px-4 py-4"
                  action={async (formData) => {
                    "use server";
                    await saveExerciseMetadata(formData, revalidateTarget);
                  }}
                >
                  <input type="hidden" name="exerciseId" value={exercise.id ?? ""} />
                  <p className="text-sm font-medium text-foreground">课堂练习</p>
                  <input
                    name="titleZh"
                    defaultValue={exercise.titleZh}
                    placeholder="练习中文标题"
                    className="rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm outline-none"
                  />
                  <input
                    name="titleEn"
                    defaultValue={exercise.titleEn}
                    placeholder="Exercise English title"
                    className="rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm outline-none"
                  />
                  <textarea
                    name="descriptionZh"
                    defaultValue={exercise.descriptionZh}
                    placeholder="练习中文描述"
                    className="min-h-24 rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm outline-none"
                  />
                  <textarea
                    name="descriptionEn"
                    defaultValue={exercise.descriptionEn}
                    placeholder="Exercise English description"
                    className="min-h-24 rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm outline-none"
                  />
                  <Button type="submit" className="w-fit rounded-full px-5" disabled={!exercise.id}>
                    保存练习
                  </Button>
                </form>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">模块项目自检清单</p>
        <div className="mt-5 grid gap-4">
          {detail.projectChecklist.map((item, index) => (
            <form
              key={item.id ?? `${detail.module.slug}-check-${index}`}
              className="grid gap-3 rounded-2xl border border-border/70 bg-background px-4 py-4"
              action={async (formData) => {
                "use server";
                await saveChecklistItemMetadata(formData, revalidateTarget);
              }}
            >
              <input type="hidden" name="checklistItemId" value={item.id ?? ""} />
              <input
                name="labelZh"
                defaultValue={item.labelZh}
                placeholder="中文检查项"
                className="rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm outline-none"
              />
              <input
                name="labelEn"
                defaultValue={item.labelEn}
                placeholder="English checklist item"
                className="rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm outline-none"
              />
              <Button type="submit" className="w-fit rounded-full px-5" disabled={!item.id}>
                保存检查项
              </Button>
            </form>
          ))}
        </div>
      </section>
    </section>
  );
}
