import { Clock3, Layers3 } from "lucide-react";
import { ProgressBar } from "@/components/learn/progress-bar";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type ModuleCardProps = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  tier: "CORE" | "ADVANCED";
  durationWeeks: number;
  lessonCount: number;
  completedLessons: number;
  weeksLabel: string;
  lessonsLabel: string;
  completeLabel: string;
  openLabel: string;
  coreTierLabel: string;
  advancedTierLabel: string;
};

export function ModuleCard({
  locale,
  slug,
  title,
  description,
  tier,
  durationWeeks,
  lessonCount,
  completedLessons,
  weeksLabel,
  lessonsLabel,
  completeLabel,
  openLabel,
  coreTierLabel,
  advancedTierLabel
}: ModuleCardProps) {
  const progress = lessonCount === 0 ? 0 : Math.round((completedLessons / lessonCount) * 100);
  const localizedTier = tier === "ADVANCED" ? advancedTierLabel : coreTierLabel;

  return (
    <article className="rounded-[1.75rem] border border-border/70 bg-card/85 p-6 shadow-lg shadow-primary/5 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-primary">{localizedTier}</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">{title}</h2>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {progress}%
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="inline-flex items-center gap-2">
          <Clock3 className="size-4" />
          {durationWeeks} {weeksLabel}
        </div>
        <div className="inline-flex items-center gap-2">
          <Layers3 className="size-4" />
          {lessonCount} {lessonsLabel}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {completedLessons}/{lessonCount} {completeLabel}
          </span>
          <span>{progress}%</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <Button asChild className="mt-6 rounded-full px-6">
        <Link href={`/modules/${slug}`} locale={locale}>
          {openLabel}
        </Link>
      </Button>
    </article>
  );
}
