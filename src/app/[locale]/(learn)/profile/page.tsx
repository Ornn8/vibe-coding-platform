import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { getCurrentUserId, getLearnerProfile } from "@/lib/learning";
import { deletePromptTemplate, savePromptTemplate } from "./actions";

type ProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const t = await getTranslations({ locale, namespace: "ProfilePage" });
  const userId = await getCurrentUserId();

  if (!userId) {
    notFound();
  }

  const profile = await getLearnerProfile(locale as Locale, userId);
  const completionRate =
    profile.totalLessons === 0 ? 0 : Math.round((profile.completedLessons / profile.totalLessons) * 100);
  const revalidateTarget = `/${locale}/profile`;

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">{t("eyebrow")}</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <article className="rounded-[1.5rem] border border-border/70 bg-card/85 p-5 shadow-lg shadow-primary/5">
          <p className="text-sm text-muted-foreground">{t("completedModules")}</p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold">
            {profile.completedModules}/{profile.modules.length}
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-border/70 bg-card/85 p-5 shadow-lg shadow-primary/5">
          <p className="text-sm text-muted-foreground">{t("completedLessons")}</p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold">
            {profile.completedLessons}/{profile.totalLessons}
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-border/70 bg-card/85 p-5 shadow-lg shadow-primary/5">
          <p className="text-sm text-muted-foreground">{t("streakDays")}</p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold">
            {profile.streakDays} {t("days")}
          </p>
        </article>
      </div>

      <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{t("completionRate")}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">{completionRate}%</p>
          </div>
          <p className="text-sm text-muted-foreground">{t("recentActivity")}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {profile.recentActivity.slice(0, 10).map((item) => (
            <span
              key={item.id}
              className="rounded-full border border-border/70 bg-background px-3 py-2 text-xs text-muted-foreground"
            >
              {new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(item.date)}
            </span>
          ))}
          {profile.recentActivity.length === 0 ? (
            <span className="rounded-full border border-dashed border-border/70 px-3 py-2 text-xs text-muted-foreground">
              {t("noActivity")}
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">{t("portfolioEyebrow")}</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">{t("portfolioTitle")}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{t("portfolioDescription")}</p>

          <form
            className="mt-6 grid gap-3"
            action={async (formData) => {
              "use server";
              await savePromptTemplate(formData, revalidateTarget);
            }}
          >
            <input
              name="title"
              placeholder={t("titlePlaceholder")}
              className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            />
            <input
              name="category"
              placeholder={t("categoryPlaceholder")}
              className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            />
            <input
              name="tags"
              placeholder={t("tagsPlaceholder")}
              className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            />
            <textarea
              name="content"
              placeholder={t("contentPlaceholder")}
              className="min-h-40 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
            />
            <Button type="submit" className="w-fit rounded-full px-6">
              {t("savePrompt")}
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          {profile.promptTemplates.map((prompt) => (
            <article
              key={prompt.id}
              className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5"
            >
              <form
                className="grid gap-3"
                action={async (formData) => {
                  "use server";
                  await savePromptTemplate(formData, revalidateTarget);
                }}
              >
                <input type="hidden" name="id" value={prompt.id} />
                <input
                  name="title"
                  defaultValue={prompt.title}
                  className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                />
                <input
                  name="category"
                  defaultValue={prompt.category ?? ""}
                  className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                />
                <input
                  name="tags"
                  defaultValue={prompt.tags.join(", ")}
                  className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                />
                <textarea
                  name="content"
                  defaultValue={prompt.content}
                  className="min-h-32 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
                />
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" className="rounded-full px-5">
                    {t("updatePrompt")}
                  </Button>
                  <Button
                    type="submit"
                    formAction={async (formData) => {
                      "use server";
                      await deletePromptTemplate(formData, revalidateTarget);
                    }}
                    variant="outline"
                    className="rounded-full px-5"
                  >
                    {t("deletePrompt")}
                  </Button>
                </div>
              </form>
            </article>
          ))}

          {profile.promptTemplates.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-border/70 bg-card/60 p-6 text-sm text-muted-foreground">
              {t("emptyPortfolio")}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
