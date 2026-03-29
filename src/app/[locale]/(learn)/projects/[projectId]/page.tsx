import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { getCurrentUserId, getProjectById } from "@/lib/learning";
import { saveProjectSubmission } from "../actions";

type ProjectDetailPageProps = {
  params: Promise<{ locale: string; projectId: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, projectId } = (await params) ?? { locale: "zh", projectId: "" };
  const t = await getTranslations({ locale, namespace: "ProjectDetailPage" });
  const userId = await getCurrentUserId();
  const projectModule = await getProjectById(locale as Locale, projectId, userId);

  if (!projectModule || !projectModule.project.exerciseId) {
    notFound();
  }

  const submission = projectModule.project.submission;
  const revalidateTarget = `/${locale}/projects/${projectId}`;
  const localizedTier = projectModule.tier === "ADVANCED" ? t("advancedTier") : t("coreTier");
  const localizedStatus = (() => {
    switch (submission?.status ?? "DRAFT") {
      case "SUBMITTED":
        return t("statusSubmitted");
      case "REVIEWED":
        return t("statusReviewed");
      case "COMPLETED":
        return t("statusCompleted");
      default:
        return t("statusDraft");
    }
  })();

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          {projectModule.slug.toUpperCase()} · {localizedTier}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          {projectModule.project.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{projectModule.project.description}</p>
      </div>

      <form
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]"
        action={async (formData) => {
          "use server";
          await saveProjectSubmission(formData, revalidateTarget);
        }}
      >
        <div className="space-y-6 rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
          <input type="hidden" name="exerciseId" value={projectModule.project.exerciseId} />
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-primary">{t("submissionEyebrow")}</p>
            <textarea
              name="text"
              defaultValue={submission?.text ?? ""}
              placeholder={t("textPlaceholder")}
              className="min-h-48 w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            />
            <textarea
              name="links"
              defaultValue={(submission?.links ?? []).join("\n")}
              placeholder={t("linksPlaceholder")}
              className="min-h-28 w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-primary">{t("checklistTitle")}</p>
            <div className="grid gap-3">
              {projectModule.project.checklist.map((item) => (
                <label
                  key={item.id ?? item.label}
                  className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm"
                >
                  <input
                    type="checkbox"
                    name="checklist"
                    value={item.id}
                    defaultChecked={Boolean(item.id && submission?.checkedItemIds.includes(item.id))}
                    className="mt-1 size-4 rounded border-border"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-[1.75rem] border border-border/70 bg-card/80 p-5 shadow-lg shadow-primary/5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t("statusLabel")}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
              {localizedStatus}
            </p>
          </div>

          {submission?.reviewNote ? (
            <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">
              {submission.reviewNote}
            </div>
          ) : null}

          <Button type="submit" name="status" value="DRAFT" variant="outline" className="w-full rounded-full">
            {t("saveDraft")}
          </Button>
          <Button type="submit" name="status" value="SUBMITTED" className="w-full rounded-full">
            {t("submitProject")}
          </Button>
        </aside>
      </form>
    </section>
  );
}
