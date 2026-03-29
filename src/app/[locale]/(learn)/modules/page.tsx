import { getTranslations } from "next-intl/server";
import { ModuleCard } from "@/components/learn/module-card";
import { getCurrentUserId, getLearningModules } from "@/lib/learning";
import type { Locale } from "@/i18n/routing";

type ModulesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ModulesPage({ params }: ModulesPageProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const t = await getTranslations({ locale, namespace: "ModulesPage" });
  const userId = await getCurrentUserId();
  const modules = await getLearningModules(locale as Locale, userId);
  const totalLessons = modules.reduce((sum, module) => sum + module.lessonCount, 0);
  const completedLessons = modules.reduce((sum, module) => sum + module.completedLessons, 0);

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">{t("eyebrow")}</p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
              {t("title")}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{t("description")}</p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-card/85 px-5 py-4 shadow-lg shadow-primary/5">
            <p className="text-sm text-muted-foreground">
              {completedLessons}/{totalLessons} {t("lessonsComplete")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {modules.map((module) => (
          <ModuleCard
            key={module.slug}
            locale={locale as Locale}
            slug={module.slug}
            title={module.title}
            description={module.description}
            tier={module.tier}
            durationWeeks={module.durationWeeks}
            lessonCount={module.lessonCount}
            completedLessons={module.completedLessons}
            weeksLabel={t("weeksLabel")}
            lessonsLabel={t("lessonsLabel")}
            completeLabel={t("completeLabel")}
            openLabel={t("openLabel")}
            coreTierLabel={t("coreTier")}
            advancedTierLabel={t("advancedTier")}
          />
        ))}
      </div>
    </section>
  );
}
