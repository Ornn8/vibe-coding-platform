import type { ReactNode } from "react";

type LessonContentProps = {
  children: ReactNode;
};

export function LessonContent({ children }: LessonContentProps) {
  return (
    <article className="prose prose-zinc max-w-none prose-headings:font-[family-name:var(--font-display)] prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-strong:text-foreground prose-pre:rounded-[1.5rem] prose-pre:border prose-pre:border-border/70 prose-pre:bg-card prose-code:text-primary dark:prose-invert">
      {children}
    </article>
  );
}
