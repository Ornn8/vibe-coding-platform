import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCurrentUserId, getProjectsOverview } from "@/lib/learning";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });
  const userId = await getCurrentUserId();
  const projects = await getProjectsOverview(locale as Locale, userId);
  const formatTier = (tier: "CORE" | "ADVANCED") => (tier === "ADVANCED" ? t("advancedTier") : t("coreTier"));
  const formatStatus = (status: "DRAFT" | "SUBMITTED" | "REVIEWED" | "COMPLETED") => {
    switch (status) {
      case "SUBMITTED":
        return t("statusSubmitted");
      case "REVIEWED":
        return t("statusReviewed");
      case "COMPLETED":
        return t("statusCompleted");
      default:
        return t("statusDraft");
    }
  };

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">{t("eyebrow")}</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-5">
        {projects.map((project) => (
          <article
            key={project.projectId}
            className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary">
                  {project.moduleSlug.toUpperCase()} · {formatTier(project.tier)}
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {project.projectTitle}
                </h2>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {formatStatus(project.status)}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.projectDescription}</p>

            <div className="mt-5 text-sm text-muted-foreground">
              {project.checkedCount}/{project.checklistCount} {t("checklistItems")}
            </div>

            <Button asChild className="mt-5 rounded-full px-5">
              <Link href={`/projects/${project.projectId}`} locale={locale as Locale}>
                {t("openProject")}
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
