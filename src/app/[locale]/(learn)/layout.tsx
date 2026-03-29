import { auth } from "@/auth";
import { ProgressBar } from "@/components/learn/progress-bar";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { ensureDailyActivity, getLearningModules } from "@/lib/learning";

type LearnLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LearnLayout({ children, params }: LearnLayoutProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const session = await auth();
  const t = await getTranslations({ locale, namespace: "LearnLayout" });

  if (!session?.user) {
    return redirect(`/${locale}/login`);
  }

  await ensureDailyActivity(session.user.id);

  const modules = await getLearningModules(locale as Locale, session.user.id);
  const totalLessons = modules.reduce((sum, module) => sum + module.lessonCount, 0);
  const completedLessons = modules.reduce((sum, module) => sum + module.completedLessons, 0);
  const progress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 pb-12 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="h-fit rounded-[1.75rem] border border-border/70 bg-card/80 p-5 shadow-lg shadow-primary/5 lg:sticky lg:top-24">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">{t("eyebrow")}</p>
        <div className="mt-4 space-y-2">
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{progress}%</p>
          <p className="text-sm text-muted-foreground">
            {completedLessons}/{totalLessons} {t("completeLabel")}
          </p>
          <ProgressBar value={progress} />
        </div>

        <nav className="mt-6 grid gap-2">
          {modules.map((module) => (
            <Link
              key={module.slug}
              href={`/modules/${module.slug}`}
              locale={locale as Locale}
              className="rounded-2xl border border-border/70 px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{module.title}</span>
                <span className="text-xs text-muted-foreground">
                  {module.completedLessons}/{module.lessonCount}
                </span>
              </div>
            </Link>
          ))}
          <Link
            href="/tools"
            locale={locale as Locale}
            className="rounded-2xl border border-border/70 px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
          >
            <div className="space-y-1">
              <span className="block font-medium">{t("toolsLabel")}</span>
              <span className="block text-xs text-muted-foreground">{t("toolsDescription")}</span>
            </div>
          </Link>
        </nav>
      </aside>

      <div>{children}</div>
    </div>
  );
}
