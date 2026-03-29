import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getLocalizedToolGuide, getToolGuideBySlug, toolGuides } from "@/lib/tool-guides";

type ToolDetailPageProps = {
  params: Promise<{ locale: string; toolSlug: string }>;
};

export function generateStaticParams() {
  return toolGuides.flatMap((tool) => [{ locale: "zh", toolSlug: tool.slug }, { locale: "en", toolSlug: tool.slug }]);
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { locale, toolSlug } = (await params) ?? { locale: "zh", toolSlug: "" };
  const currentLocale = locale as Locale;
  const tool = getToolGuideBySlug(toolSlug);

  if (!tool) {
    notFound();
  }

  const guide = getLocalizedToolGuide(tool, currentLocale);

  return (
    <section className="flex w-full flex-col gap-8 py-12">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          {guide.category} · {guide.stage}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">{guide.name}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{guide.oneLiner}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-full px-5">
            <Link href="/tools" locale={currentLocale}>
              {currentLocale === "zh" ? "返回工具总览" : "Back to tools"}
            </Link>
          </Button>
          {guide.resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm transition hover:border-primary/40 hover:bg-primary/5"
            >
              {resource.label}
            </a>
          ))}
        </div>
      </div>

      <section className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">
          {currentLocale === "zh" ? "一句话定位" : "One-line positioning"}
        </p>
        <p className="mt-4 text-base leading-8 text-muted-foreground">{guide.overviewReason}</p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">{guide.installTitle}</p>
          <div className="mt-5 grid gap-3">
            {guide.installSteps.map((step) => (
              <div
                key={step}
                className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm leading-7 text-muted-foreground"
              >
                {step}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">
            {currentLocale === "zh" ? "与课程的对应关系" : "How it maps to the curriculum"}
          </p>
          <div className="mt-5 grid gap-3">
            {guide.courseRelations.map((relation) => (
              <div key={relation.module} className="rounded-2xl border border-border/70 bg-background px-4 py-3">
                <p className="text-sm font-medium text-foreground">{relation.module}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{relation.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">{guide.commandsTitle}</p>
        <div className="mt-5 overflow-x-auto rounded-[1.25rem] border border-border/70 bg-background">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  {currentLocale === "zh" ? "命令 / 操作" : "Command / action"}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  {currentLocale === "zh" ? "作用" : "Purpose"}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  {currentLocale === "zh" ? "使用场景" : "When to use it"}
                </th>
              </tr>
            </thead>
            <tbody>
              {guide.commands.map((command) => (
                <tr key={command.command} className="border-t border-border/70 align-top">
                  <td className="px-4 py-3 font-mono text-foreground">{command.command}</td>
                  <td className="px-4 py-3 text-muted-foreground">{command.purpose}</td>
                  <td className="px-4 py-3 text-muted-foreground">{command.scenario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {guide.extraSections.map((section) => (
        <section
          key={section.title}
          className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-primary">{section.title}</p>
          <div className="mt-5 grid gap-3">
            {section.body.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm leading-7 text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-lg shadow-primary/5">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">
          {currentLocale === "zh" ? "常见问题" : "Frequently asked questions"}
        </p>
        <div className="mt-5 grid gap-3">
          {guide.faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-border/70 bg-background px-4 py-4">
              <p className="text-sm font-medium text-foreground">{faq.question}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
