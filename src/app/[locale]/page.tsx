import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const session = await auth();
  const primaryHref = "/modules";
  const secondaryHref = session?.user ? "/tools" : "/modules";
  const featureCards = [
    {
      title: t("featureModulesTitle"),
      body: t("featureModulesBody")
    },
    {
      title: t("featureMdxTitle"),
      body: t("featureMdxBody")
    },
    {
      title: t("featureProjectsTitle"),
      body: t("featureProjectsBody")
    },
    {
      title: t("featureAdminTitle"),
      body: t("featureAdminBody")
    },
    {
      title: locale === "zh" ? "工具参考区" : "Tool Reference",
      body:
        locale === "zh"
          ? "集中查看 Claude Code、Codex、Cursor、Bolt 等工具的对比、安装和使用建议。"
          : "Compare Claude Code, Codex, Cursor, Bolt, and other tools in one place."
    }
  ];

  return (
    <div className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl flex-col justify-center px-6 py-12">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <section className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="size-4 text-primary" />
            {t("eyebrow")}
          </div>

          <div className="space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">{t("localeLabel")}</p>
            <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{t("description")}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href={primaryHref} locale={locale as Locale}>
                {t("primaryCta")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link href={secondaryHref} locale={locale as Locale}>
                {t("secondaryCta")}
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {featureCards.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-border/70 bg-card/80 p-5 shadow-lg shadow-primary/5 backdrop-blur"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                <BookOpen className="size-5" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
