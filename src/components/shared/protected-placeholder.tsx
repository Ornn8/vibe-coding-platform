import type { ReactNode } from "react";

type ProtectedPlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function ProtectedPlaceholder({
  eyebrow,
  title,
  description,
  children
}: ProtectedPlaceholderProps) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-14">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}
