import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ProgressBar } from "@/components/learn/progress-bar";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCurrentUserId, getModuleBySlug } from "@/lib/learning";

type ModuleDetailPageProps = {
  params: Promise<{ locale: string; moduleSlug: string }>;
};

export default async function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const { locale, moduleSlug } = (await params) ?? { locale: "zh", moduleSlug: "" };
  const t = await getTranslations({ locale, namespace: "ModuleDetailPage" });
  const userId = await getCurrentUserId();
  const learningModule = await getModuleBySlug(locale as Locale, moduleSlug, userId);

  if (!learningModule) {
    notFound();
  }

  const progress =
    learningModule.lessonCount === 0
      ? 0
      : Math.round((learningModule.completedLessons / learningModule.lessonCount) * 100);
  const localizedTier = learningModule.tier === "ADVANCED" ? t("advancedTier") : t("coreTier");

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          {learningModule.slug.toUpperCase()} · {localizedTier}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          {learningModule.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{learningModule.description}</p>
      </div>

      <div className="rounded-[1.75rem] border border-border/70 bg-card/85 p-6 shadow-lg shadow-primary/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{t("progressLabel")}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">{progress}%</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {learningModule.completedLessons}/{learningModule.lessonCount} {t("lessonsComplete")}
          </div>
        </div>
        <ProgressBar value={progress} className="mt-4" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          {learningModule.lessons.map((lesson) => (
            <article
              key={lesson.slug}
              className="rounded-[1.5rem] border border-border/70 bg-card/80 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    {t("lessonLabel")} {lesson.order}
                  </p>
                  <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">{lesson.title}</h2>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {lesson.completed ? t("completed") : t("inProgress")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{lesson.description}</p>
              <Button asChild className="mt-5 rounded-full px-5">
                <Link href={`/modules/${learningModule.slug}/${lesson.slug}`} locale={locale as Locale}>
                  {t("openLesson")}
                </Link>
              </Button>
            </article>
          ))}
        </div>

        <aside className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">{t("projectEyebrow")}</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">
            {learningModule.project.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{learningModule.project.description}</p>
          <Button asChild className="mt-5 rounded-full px-5">
            <Link href={`/projects/${learningModule.project.id ?? learningModule.slug}`} locale={locale as Locale}>
              {t("openProject")}
            </Link>
          </Button>
        </aside>
      </div>
    </section>
  );
}
