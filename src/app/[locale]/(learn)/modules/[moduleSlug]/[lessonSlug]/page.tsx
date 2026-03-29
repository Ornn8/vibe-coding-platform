import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CompleteLessonButton } from "@/components/learn/complete-lesson-button";
import { LessonContent } from "@/components/learn/lesson-content";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCanonicalLessonSlug, getCurrentUserId, getLessonBySlug } from "@/lib/learning";
import { loadLessonMdx } from "@/lib/mdx";
import { markLessonComplete } from "../../../actions";

type LessonPageProps = {
  params: Promise<{ locale: string; moduleSlug: string; lessonSlug: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { locale, moduleSlug, lessonSlug } = (await params) ?? {
    locale: "zh",
    moduleSlug: "",
    lessonSlug: ""
  };
  const t = await getTranslations({ locale, namespace: "LessonPage" });
  const userId = await getCurrentUserId();
  const canonicalLessonSlug = getCanonicalLessonSlug(moduleSlug, lessonSlug);

  if (canonicalLessonSlug !== lessonSlug) {
    redirect(`/${locale}/modules/${moduleSlug}/${canonicalLessonSlug}`);
  }

  const lessonData = await getLessonBySlug(locale as Locale, moduleSlug, lessonSlug, userId);

  if (!lessonData) {
    notFound();
  }

  let content;
  let frontmatter;

  try {
    const lessonMdx = await loadLessonMdx(locale, moduleSlug, lessonSlug);
    content = lessonMdx.content;
    frontmatter = lessonMdx.frontmatter;
  } catch (error) {
    console.error("Failed to load lesson MDX", {
      locale,
      moduleSlug,
      lessonSlug,
      error
    });
    notFound();
  }

  const revalidateTarget = `/${locale}/modules/${moduleSlug}/${lessonSlug}`;

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-3">
        <Link href={`/modules/${moduleSlug}`} locale={locale as Locale} className="text-sm text-primary hover:underline">
          {t("backToModule")}
        </Link>
        <p className="text-sm uppercase tracking-[0.28em] text-primary">
          {lessonData.module.slug.toUpperCase()} · {t("lessonLabel")} {lessonData.lesson.order}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          {frontmatter.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{frontmatter.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-8">
          <LessonContent>{content}</LessonContent>
        </div>

        <aside className="space-y-4 rounded-[1.75rem] border border-border/70 bg-card/80 p-5 shadow-lg shadow-primary/5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t("statusLabel")}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
              {lessonData.lesson.completed ? t("completed") : t("ready")}
            </p>
          </div>

          {lessonData.lesson.id ? (
            <form
              action={async () => {
                "use server";
                await markLessonComplete(lessonData.lesson.id!, revalidateTarget);
              }}
            >
              <CompleteLessonButton
                completed={lessonData.lesson.completed}
                idleLabel={t("markComplete")}
                pendingLabel={t("saving")}
                completedLabel={t("completed")}
              />
            </form>
          ) : null}

          <div className="grid gap-3">
            {lessonData.previousLesson ? (
              <Button asChild variant="outline" className="justify-start rounded-2xl">
                <Link href={`/modules/${moduleSlug}/${lessonData.previousLesson.slug}`} locale={locale as Locale}>
                  {t("previousLesson")}
                </Link>
              </Button>
            ) : null}

            {lessonData.nextLesson ? (
              <Button asChild variant="outline" className="justify-start rounded-2xl">
                <Link href={`/modules/${moduleSlug}/${lessonData.nextLesson.slug}`} locale={locale as Locale}>
                  {t("nextLesson")}
                </Link>
              </Button>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}
