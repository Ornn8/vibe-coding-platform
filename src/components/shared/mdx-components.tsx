import type { MDXComponents } from "mdx/types";
import { ExerciseBlock } from "@/components/learn/exercise-block";

type CalloutProps = {
  title?: string;
  tone?: "info" | "warning" | "success";
  type?: "methodology";
  children: React.ReactNode;
};

function Callout({ title, tone = "info", type, children }: CalloutProps) {
  const tones = {
    info: "border-primary/30 bg-primary/5",
    warning: "border-amber-500/30 bg-amber-500/5",
    success: "border-emerald-500/30 bg-emerald-500/5"
  };
  const effectiveTone = type === "methodology" ? "success" : tone;
  const effectiveTitle = title ?? (type === "methodology" ? "方法论要点" : "提示");

  return (
    <div className={`my-6 rounded-[1.5rem] border p-5 ${tones[effectiveTone]}`}>
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">{effectiveTitle}</p>
      <div className="mt-3 text-sm leading-7 text-foreground/90">{children}</div>
    </div>
  );
}

type ToolCardProps = {
  name: string;
  useCase: string;
  tip: string;
};

function ToolCard({ name, useCase, tip }: ToolCardProps) {
  return (
    <div className="my-6 rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-sm">
      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">{name}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{useCase}</p>
      <p className="mt-3 text-sm font-medium text-foreground/90">{tip}</p>
    </div>
  );
}

type CodeComparisonProps = {
  before: string;
  after: string;
};

function CodeComparison({ before, after }: CodeComparisonProps) {
  return (
    <div className="my-6 grid gap-4 md:grid-cols-2">
      <div className="rounded-[1.5rem] border border-border/70 bg-card p-4">
        <pre className="overflow-x-auto text-sm">
          <code>{before}</code>
        </pre>
      </div>
      <div className="rounded-[1.5rem] border border-border/70 bg-card p-4">
        <pre className="overflow-x-auto text-sm">
          <code>{after}</code>
        </pre>
      </div>
    </div>
  );
}

function Separator() {
  return <hr className="my-8 border-dashed border-border/70" />;
}

function Table({ children }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 overflow-x-auto rounded-[1.25rem] border border-border/70 bg-card">
      <table className="min-w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

function THead({ children }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-muted/50">{children}</thead>;
}

function TBody({ children }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody>{children}</tbody>;
}

function TR({ children }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="border-t border-border/70">{children}</tr>;
}

function TH({ children }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className="px-4 py-3 text-left font-semibold text-foreground">{children}</th>;
}

function TD({ children }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-4 py-3 align-top text-muted-foreground">{children}</td>;
}

export const mdxComponents: MDXComponents = {
  Exercise: ExerciseBlock,
  Callout,
  ToolCard,
  CodeComparison,
  Separator,
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: TR,
  th: TH,
  td: TD
};
