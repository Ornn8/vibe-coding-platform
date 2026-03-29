import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getLocalizedScenarioRecommendations, getLocalizedToolGuides } from "@/lib/tool-guides";

type ToolsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const currentLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "ToolsPage" });
  const tools = getLocalizedToolGuides(currentLocale);
  const recommendations = getLocalizedScenarioRecommendations(currentLocale);

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">{t("eyebrow")}</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{t("description")}</p>
      </div>

      <section className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-primary">
              {currentLocale === "zh" ? "工具选择指南" : "Tool selection guide"}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
              {currentLocale === "zh"
                ? "先按阶段选工具，再按任务复杂度升级"
                : "Choose by stage first, then level up by task complexity"}
            </h2>
          </div>
          <div className="max-w-xl text-sm leading-7 text-muted-foreground">
            {currentLocale === "zh"
              ? "浏览器工具适合低门槛起步，IDE 适合进入真实代码库，CLI 工具适合项目级上下文、计划和验证。"
              : "Browser tools fit low-friction starts, IDEs fit real codebases, and CLI tools fit project-level context, planning, and verification."}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-[1.25rem] border border-border/70 bg-background">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-muted/50">
              <tr>
                {[
                  currentLocale === "zh" ? "工具" : "Tool",
                  currentLocale === "zh" ? "类型" : "Type",
                  currentLocale === "zh" ? "适合阶段" : "Best stage",
                  currentLocale === "zh" ? "免费额度" : "Free tier",
                  currentLocale === "zh" ? "学习曲线" : "Learning curve",
                  currentLocale === "zh" ? "适合做什么" : "Best for",
                  currentLocale === "zh" ? "官方资源" : "Official links"
                ].map((label) => (
                  <th key={label} className="px-4 py-3 text-left font-semibold text-foreground">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.slug} className="border-t border-border/70 align-top">
                  <td className="px-4 py-3 font-medium text-foreground">{tool.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{tool.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{tool.stage}</td>
                  <td className="px-4 py-3 text-muted-foreground">{tool.freeTier}</td>
                  <td className="px-4 py-3 text-muted-foreground">{tool.learningCurve}</td>
                  <td className="px-4 py-3 text-muted-foreground">{tool.bestFor}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button asChild variant="outline" size="sm" className="rounded-full">
                        <Link href={`/tools/${tool.slug}`} locale={currentLocale}>
                          {currentLocale === "zh" ? "打开指南" : "Open guide"}
                        </Link>
                      </Button>
                      <a
                        href={tool.resources[0]?.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-border px-3 py-2 text-xs text-muted-foreground transition hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                      >
                        {currentLocale === "zh" ? "官网" : "Site"}
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        {tools.map((tool) => (
          <article
            key={tool.slug}
            className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-primary">{tool.stage}</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">{tool.name}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{tool.oneLiner}</p>
            <div className="mt-4 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">
              {tool.overviewReason}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-5">
                <Link href={`/tools/${tool.slug}`} locale={currentLocale}>
                  {currentLocale === "zh" ? "查看完整指南" : "View full guide"}
                </Link>
              </Button>
              <a
                href={tool.resources[0]?.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm transition hover:border-primary/40 hover:bg-primary/5"
              >
                {currentLocale === "zh" ? "官网" : "Official site"}
              </a>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">
          {currentLocale === "zh" ? "按场景推荐" : "Recommendations by situation"}
        </p>
        <div className="mt-5 overflow-x-auto rounded-[1.25rem] border border-border/70 bg-background">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  {currentLocale === "zh" ? "你的情况" : "Your situation"}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  {currentLocale === "zh" ? "推荐工具" : "Recommended tool"}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  {currentLocale === "zh" ? "理由" : "Why"}
                </th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((item) => (
                <tr key={item.situation} className="border-t border-border/70 align-top">
                  <td className="px-4 py-3 text-muted-foreground">{item.situation}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{item.recommendedTool}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
